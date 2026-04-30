import { type NextRequest, NextResponse } from "next/server"

import { projects } from "@/db/schema"
import { db } from "@/lib/db"

export async function GET() {
  const result = await db.select().from(projects)

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const [project] = await db.insert(projects).values(data).returning()
  return NextResponse.json(project)
}
