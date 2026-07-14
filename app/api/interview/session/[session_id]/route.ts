import { type NextRequest, NextResponse } from "next/server"

const INTERVIEW_API_URL = process.env.INTERVIEW_API_URL || "http://localhost:8082"

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ session_id: string }> }
) {
    try {
        const { session_id } = await params

        if (!session_id) {
            console.error("[interview/session] Error: Missing session_id")
            return NextResponse.json({ success: false, error: "Session ID is required." }, { status: 400 })
        }

        console.log(`[interview/session] Requesting session cleanup for ${session_id}`)
        const response = await fetch(
            `${INTERVIEW_API_URL}/api/interview/session/${session_id}`,
            { method: "DELETE" }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error("[interview/session] Python API error:", errorText)
            return NextResponse.json(
                { success: false, error: `Failed to end session: ${errorText}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("[interview/session] Exception stack trace:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        )
    }
}
