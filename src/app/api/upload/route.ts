import { writeFile } from "node:fs/promises"
import path from "node:path"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file = data.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`
  const filePath = path.join(process.cwd(), "public/projects", fileName)

  await writeFile(filePath, buffer)

  return NextResponse.json({ path: `/projects/${fileName}` })
}
