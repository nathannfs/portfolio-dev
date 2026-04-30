import { eq } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"

import { projects } from "@/db/schema"
import { db } from "@/lib/db"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const data = await request.json()
  const [project] = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id))
    .returning()
  return NextResponse.json(project)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await db.delete(projects).where(eq(projects.id, id))
  return NextResponse.json({ success: true })
}
