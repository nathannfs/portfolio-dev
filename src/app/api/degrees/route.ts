import { type NextRequest, NextResponse } from "next/server"

import { degrees } from "@/db/schema"
import { db } from "@/lib/db"

export async function GET() {
  const result = await db.select().from(degrees).orderBy(degrees.createdAt)

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, institution, period, status, description } = body

    if (!(title && institution && period && status)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const result = await db.insert(degrees).values({
      title,
      institution,
      period,
      status,
      description,
    })

    return NextResponse.json(result, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
