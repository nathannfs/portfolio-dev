import { NextRequest, NextResponse } from 'next/server'

import { aboutMe } from '@/db/schema'
import { db } from '@/lib/db'

export async function GET() {
  const result = await db.select().from(aboutMe).orderBy(aboutMe.updatedAt)

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const result = await db.insert(aboutMe).values({
      content,
    })

    return NextResponse.json(result, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
