
import { client, mutationClient } from "@/sanity/lib/client"
import { NextResponse } from "next/server"


const viewCountPath = '/viewCount.ts'
export async function POST(req: Request) {
    try {
        const { startupId } = await req.json()

        await mutationClient.patch(startupId)
        .setIfMissing({viewCount: 0})
        .inc({viewCount: 1})
        .commit()

        return NextResponse.json({message: 'viewcount updated'}, {status: 200})
    }catch (error) {
        console.error("Unable to fetch viewcount:", error)
    }
}