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
    
    def extract_skills_with_llm(self, text: str, context: str, max_retries: int = 3) -> List[SkillItem]:
        """Use Groq LLM for comprehensive skill extraction with retry logic"""
        print(f"[INFO] Starting skill extraction with {len(text)} characters of text")
        
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
                response = self.llm.invoke(prompt.format_messages())
                raw_response = response.content.strip()
                print(f"[INFO] Raw LLM response (attempt {attempt + 1}): {raw_response[:200]}...")
                
                # Parse JSON response
                try:
                    skills_data = json.loads(raw_response)
                    print(f"[INFO] Parsed JSON successfully, got {len(skills_data) if isinstance(skills_data, list) else 1} items")
                    
                    # Normalize response format
                    normalized_skills = self._normalize_skill_response(skills_data)
                    print(f"[INFO] Normalized to {len(normalized_skills)} valid skills")
                    return normalized_skills
                    
                except json.JSONDecodeError:
                    # Fallback: try to extract JSON from response
                    import re
                    json_match = re.search(r'\[.*\]', raw_response, re.DOTALL)
                    if json_match:
                        skills_data = json.loads(json_match.group())
                        print(f"[INFO] Extracted JSON from markdown, got {len(skills_data) if isinstance(skills_data, list) else 1} items")
                        normalized_skills = self._normalize_skill_response(skills_data)
                        print(f"[INFO] Normalized to {len(normalized_skills)} valid skills")
                        return normalized_skills
                    else:
                        raise ValueError("Could not parse JSON from LLM response")
                        
            except Exception as e:
                print(f"  [WARNING] Attempt {attempt + 1}/{max_retries} failed: {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    print(f"[ERROR] Failed after {max_retries} attempts. Error: {str(e)}")
                    raise Exception(f"Failed after {max_retries} attempts. Error: {str(e)}")
        
        return []
    
    def _normalize_skill_response(self, response) -> List[Dict]:
        """Normalize various LLM response formats into consistent schema."""
        normalized = []
        
        # Handle string array: ["Python", "SQL", "FastAPI"]
        if isinstance(response, list) and len(response) > 0:
            if isinstance(response[0], str):
                for skill_name in response:
                    normalized.append({
                        "name": skill_name.strip(),
                        "proficiency": 5.0,  # Default proficiency
                        "category": "unknown"
                    })
                return normalized
        
        # Handle array of objects
        if isinstance(response, list):
            for item in response:
                if isinstance(item, dict):
                    # Try multiple possible keys for skill name
                    skill_name = (
                        item.get('name') or 
                        item.get('skill') or 
                        item.get('title') or 
                        item.get('technology') or
                        str(item.get('value', ''))
                    )
                    
                    if skill_name and isinstance(skill_name, str) and skill_name.strip():
                        normalized.append({
                            "name": skill_name.strip(),
                            "proficiency": float(item.get('proficiency', item.get('level', 5.0))),
                            "category": item.get('category', item.get('type', 'unknown'))
                        })
        
        # Handle single object
        elif isinstance(response, dict):
            skill_name = (
                response.get('name') or 
                response.get('skill') or 
                response.get('title')
            )
            if skill_name and isinstance(skill_name, str) and skill_name.strip():
                normalized.append({
                    "name": skill_name.strip(),
                    "proficiency": float(response.get('proficiency', 5.0)),
                    "category": response.get('category', 'unknown')
                })
        
        return normalized
    
    def __call__(self, state: AgentState) -> AgentState:
        """
        Main agent execution
        Extracts skills from both resume and job description
        """
        print("\n[SEARCH] AGENT 1: Skill Extractor - Starting...")
        
        try:
            # Validate API key
            if not self.groq_api_key:
                print("[ERROR] GROQ_API_KEY is not set")
                state["extraction_status"] = "failed"
                state["errors"] = ["SkillExtractor: GROQ_API_KEY not configured"]
                return state
            
            # Validate input text
            if not state.get("resume_text") or len(state["resume_text"].strip()) < 50:
                print("[ERROR] Resume text is too short or empty")
                state["extraction_status"] = "failed"
                state["errors"] = ["SkillExtractor: Resume text is too short or empty"]
                return state
                
            if not state.get("job_description") or len(state["job_description"].strip()) < 50:
                print("[ERROR] Job description is too short or empty")
                state["extraction_status"] = "failed"
                state["errors"] = ["SkillExtractor: Job description is too short or empty"]
                return state
            
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
            
            # Validate results
            if not candidate_skills:
                print("[WARNING] No candidate skills extracted")
            if not required_skills:
                print("[WARNING] No required skills extracted")
            
            # Update state
            state["candidate_skills"] = candidate_skills
            state["required_skills"] = required_skills
            state["extraction_status"] = "completed"
            
            # Print sample results
            if candidate_skills:
                print(f"  [SAMPLE] Sample candidate skills: {[s.get('name', 'unknown') for s in candidate_skills[:5]]}")
            if required_skills:
                print(f"  [SAMPLE] Sample required skills: {[s.get('name', 'unknown') for s in required_skills[:5]]}")
            
        except ValueError as ve:
            print(f"  [ERROR] Configuration Error: {str(ve)}")
            state["extraction_status"] = "failed"
            state["errors"] = [f"SkillExtractor: Configuration error - {str(ve)}"]
            
        except Exception as e:
            error_msg = str(e)
            if "Connection" in error_msg or "API" in error_msg:
                print(f"  [ERROR] API Connection Error: {error_msg}")
                state["errors"] = ["SkillExtractor: API connection failed. Please check your GROQ_API_KEY and internet connection."]
            else:
                print(f"  [ERROR] Error in Skill Extractor: {error_msg}")
                state["errors"] = [f"SkillExtractor: {error_msg}"]
            
            state["extraction_status"] = "failed"
        
        return state