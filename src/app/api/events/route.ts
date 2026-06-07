import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import fs from "fs"
import path from "path"

// GET EVENTS
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(events || [])
  } catch (error) {
    console.error(error)
    return NextResponse.json([], { status: 200 })
  }
}

// CREATE EVENT WITH IMAGE
export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const branch = formData.get("branch") as string
    const price = Number(formData.get("price"))
    const date = new Date(formData.get("date") as string)
    const maxParticipants = Number(formData.get("maxParticipants"))
    const videoUrl = formData.get("videoUrl") as string

    const file = formData.get("poster") as File

    let posterUrl = ""

    if (file) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const fileName = Date.now() + "-" + file.name
      const uploadPath = path.join(process.cwd(), "public/uploads", fileName)

      fs.writeFileSync(uploadPath, buffer)

      posterUrl = `/uploads/${fileName}`
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        branch,
        price,
        date,
        maxParticipants,
        posterUrl,
        videoUrl,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error("UPLOAD ERROR:", error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}