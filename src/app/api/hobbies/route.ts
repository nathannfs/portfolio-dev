import { NextRequest, NextResponse } from 'next/server'

import { hobbies } from '@/db/schema'
import { db } from '@/lib/db'

export async function GET() {
  const result = await db.select().from(hobbies).orderBy(hobbies.createdAt)

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const result = await db.insert(hobbies).values({
      title,
    })

    return NextResponse.json(result, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
