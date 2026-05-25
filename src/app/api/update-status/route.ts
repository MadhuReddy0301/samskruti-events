import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  await prisma.registration.update({
    where: { id },
    data: { status },
  });

  return NextResponse.redirect("http://localhost:3000/admin");
}