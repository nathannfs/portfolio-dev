import { desc } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"

import { db } from "@/db"
import { certifications } from "@/db/schema"

export async function GET() {
  const result = await db
    .select()
    .from(certifications)
    .orderBy(
      desc(certifications.status),
      certifications.title,
      desc(certifications.createdAt)
    )

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!(data.title && data.institution && data.hours && data.status)) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando" },
        { status: 400 }
      )
    }

    await db.insert(certifications).values(data)

    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.error("Erro ao criar certificação:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
