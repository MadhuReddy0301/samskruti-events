import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data });
}