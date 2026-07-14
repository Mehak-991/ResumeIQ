"""
Agent 1: Skill Extractor
Uses Groq LLM to extract skills from resume and job description
"""

import os
from typing import List, Dict
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from state import AgentState, SkillItem
import json
import time


class SkillExtractorAgent:
    """
    Extracts technical skills from resume and job description
    Uses Groq for enhanced extraction
    """
    
    def __init__(self):
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        
        if not self.groq_api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables. Please add it to .env file")
        
        self.llm = ChatGroq(
            api_key=self.groq_api_key,
            model="llama-3.3-70b-versatile",
            temperature=0.1,
            max_retries=3
        )
    
    def normalize_skill_response(self, raw_response: str) -> List[Dict]:
        """
        Normalize LLM response to consistent skill format.
        Supports:
        - String arrays: ["Python", "SQL", "FastAPI"]
        - Dict arrays with 'name': [{"name": "Python"}]
        - Dict arrays with 'skill': [{"skill": "Python"}]
        - Dict arrays with 'title': [{"title": "Python"}]
        """
        print(f"  [RAW LLM RESPONSE] {raw_response[:500]}...")
        
        try:
            # Try direct JSON parse
            data = json.loads(raw_response)
        except json.JSONDecodeError:
            # Try to extract JSON from markdown code blocks or text
            import re
            json_match = re.search(r'\[.*\]', raw_response, re.DOTALL)
            if json_match:
                try:
                    data = json.loads(json_match.group())
                except json.JSONDecodeError:
                    print(f"  [ERROR] Could not parse JSON from response")
                    return []
            else:
                print(f"  [ERROR] No JSON array found in response")
                return []
        
        if not isinstance(data, list):
            print(f"  [ERROR] Response is not a list, got: {type(data)}")
            return []
        
        normalized_skills = []
        
        for item in data:
            try:
                # Handle string format
                if isinstance(item, str):
                    normalized_skills.append({
                        "name": item.strip(),
                        "proficiency": 5.0,  # Default proficiency
                        "category": "general"
                    })
                # Handle dict format
                elif isinstance(item, dict):
                    # Try multiple possible keys for skill name
                    skill_name = (
                        item.get('name') or 
                        item.get('skill') or 
                        item.get('title') or 
                        item.get('technology') or 
                        item.get('tool') or 
                        ""
                    )
                    
                    if not skill_name:
                        print(f"  [WARNING] Skipping item with no skill name: {item}")
                        continue
                    
                    # Get proficiency with fallback
                    proficiency = item.get('proficiency', item.get('level', 5.0))
                    if isinstance(proficiency, str):
                        # Try to parse string proficiency
                        try:
                            proficiency = float(proficiency)
                        except:
                            proficiency = 5.0
                    proficiency = min(max(float(proficiency), 0), 10)  # Clamp to 0-10
                    
                    # Get category with fallback
                    category = item.get('category', item.get('type', 'general'))
                    
                    normalized_skills.append({
                        "name": skill_name.strip(),
                        "proficiency": proficiency,
                        "category": category
                    })
                else:
                    print(f"  [WARNING] Skipping non-string/dict item: {type(item)}")
            except Exception as e:
                print(f"  [WARNING] Error normalizing item {item}: {str(e)}")
                continue
        
        print(f"  [NORMALIZATION] Normalized {len(normalized_skills)} skills from {len(data)} raw items")
        return normalized_skills
    
    def extract_skills_with_llm(self, text: str, context: str, max_retries: int = 3) -> List[Dict]:
        """Use Groq LLM for comprehensive skill extraction with retry logic"""
        
        print(f"  [INPUT] Text length: {len(text)} characters")
        print(f"  [INPUT] Context: {context}")
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert technical recruiter and skill analyzer.
Extract ALL technical skills from the provided text and rate them on a 0-10 proficiency scale.

For each skill, provide:
1. Skill name (standardized, e.g., "Python" not "python programming")
2. Proficiency score (0-10, based on context clues like years of experience, project complexity)
3. Category (programming, cloud, database, devops, frontend, backend, ml, etc.)

Return ONLY valid JSON array format:
[
  {"name": "Python", "proficiency": 8.5, "category": "programming"},
  {"name": "Kubernetes", "proficiency": 6.0, "category": "devops"}
]

Alternative formats also accepted:
- Simple array: ["Python", "SQL", "FastAPI"]
- Different keys: [{"skill": "Python"}, {"title": "SQL"}]

Be comprehensive but accurate. Include:
- Programming languages
- Frameworks and libraries
- Cloud platforms
- Databases
- DevOps tools
- Soft skills (leadership, communication, etc.)
- Domain knowledge
"""),
            ("user", f"Context: {context}\n\nText to analyze:\n{text}")
        ])
        
        for attempt in range(max_retries):
            try:
                print(f"  [LLM CALL] Attempt {attempt + 1}/{max_retries}")
                response = self.llm.invoke(prompt.format_messages())
                
                # Normalize the response
                normalized_skills = self.normalize_skill_response(response.content)
                
                if normalized_skills:
                    print(f"  [SUCCESS] Extracted {len(normalized_skills)} skills")
                    return normalized_skills
                else:
                    print(f"  [WARNING] No skills extracted from response")
                    if attempt < max_retries - 1:
                        time.sleep(2 ** attempt)
                    else:
                        return []
                        
            except Exception as e:
                print(f"  [ERROR] Attempt {attempt + 1}/{max_retries} failed: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    print(f"  [ERROR] All {max_retries} attempts failed")
                    return []
        
        return []
    
    def __call__(self, state: AgentState) -> AgentState:
        """
        Main agent execution
        Extracts skills from both resume and job description
        """
        print("\n[SEARCH] AGENT 1: Skill Extractor - Starting...")
        
        try:
            # Validate API key
            if not self.groq_api_key:
                raise ValueError("GROQ_API_KEY is not set")
            
            # Extract from resume
            print("  [EXTRACTING] Extracting candidate skills from resume...")
            candidate_skills = self.extract_skills_with_llm(
                state["resume_text"],
                "This is a candidate's resume. Extract their demonstrated skills."
            )
            
            # Extract from job description
            print("  [EXTRACTING] Extracting required skills from job description...")
            required_skills = self.extract_skills_with_llm(
                state["job_description"],
                "This is a job description. Extract required skills and qualifications."
            )
            
            print(f"  [SUCCESS] Found {len(candidate_skills)} candidate skills")
            print(f"  [SUCCESS] Found {len(required_skills)} required skills")
            
            # Validate that skills were extracted
            if not candidate_skills and not required_skills:
                print(f"  [ERROR] No skills extracted from resume or job description")
                state["extraction_status"] = "failed"
                state["errors"] = ["SkillExtractor: No skills extracted from resume. Please ensure the resume contains technical skills."]
                return state
            
            # Update state
            state["candidate_skills"] = candidate_skills
            state["required_skills"] = required_skills
            state["extraction_status"] = "completed"
            
            # Print sample results
            if candidate_skills:
                print(f"  [SAMPLE] Sample candidate skills: {[s.get('name', s.get('skill', s.get('title', 'unknown'))) for s in candidate_skills[:5]]}")
            if required_skills:
                print(f"  [SAMPLE] Sample required skills: {[s.get('name', s.get('skill', s.get('title', 'unknown'))) for s in required_skills[:5]]}")
            
        except ValueError as ve:
            print(f"  [ERROR] Configuration Error: {str(ve)}")
            state["extraction_status"] = "failed"
            state["errors"] = [f"SkillExtractor: Configuration error - {str(ve)}"]
            
        except Exception as e:
            error_msg = str(e)
            if "Connection" in error_msg or "API" in error_msg:
                print(f"  [ERROR] API Connection Error: {error_msg}")
                state["errors"] = [f"SkillExtractor: API connection failed. Please check your GROQ_API_KEY and internet connection."]
            else:
                print(f"  [ERROR] Error in Skill Extractor: {error_msg}")
                state["errors"] = [f"SkillExtractor: {error_msg}"]
            
            state["extraction_status"] = "failed"
        
        return state