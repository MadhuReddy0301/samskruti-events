import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createClient } from "@supabase/supabase-js"

// SUPABASE CLIENT
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET EVENTS
export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(events)
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
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error } = await supabase.storage
        .from("event-posters")
        .upload(fileName, file)

      if (error) throw error

      const { data } = supabase.storage
        .from("event-posters")
        .getPublicUrl(fileName)

      posterUrl = data.publicUrl
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
    console.log(error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}