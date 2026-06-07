import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// ✅ GET EVENTS
export async function GET() {
  try {
    const events = await prisma.event.findMany()
    return NextResponse.json(events || [])
  } catch (error) {
    console.error("GET ERROR:", error)
    return NextResponse.json([], { status: 200 })
  }
}

// ✅ CREATE EVENT
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const event = await prisma.event.create({
      data: {
        title: String(body.title),
        description: String(body.description),
        branch: String(body.branch),
        price: Number(body.price),
        date: body.date ? new Date(body.date) : new Date(),
        maxParticipants: Number(body.maxParticipants || 0),
        posterUrl: body.posterUrl || "",
        videoUrl: body.videoUrl || null,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error("POST ERROR:", error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}