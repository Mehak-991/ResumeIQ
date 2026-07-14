import { type NextRequest, NextResponse } from "next/server"

const INTERVIEW_API_URL = process.env.INTERVIEW_API_URL || "http://localhost:8082"

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ session_id: string }> }
) {
    try {
        const { session_id } = await params

        if (!session_id) {
            console.error("[interview/report] Error: Missing session_id")
            return NextResponse.json({ success: false, error: "Session ID is required." }, { status: 400 })
        }

        console.log(`[interview/report] Requesting report from backend for session ${session_id}`)
        const response = await fetch(
            `${INTERVIEW_API_URL}/api/interview/report/${session_id}`,
            { method: "GET" }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error("[interview/report] Python API error:", errorText)
            return NextResponse.json(
                { success: false, error: `Failed to retrieve report: ${errorText}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("[interview/report] Exception stack trace:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        )
    }
}
