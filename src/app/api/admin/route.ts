import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.registration.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}