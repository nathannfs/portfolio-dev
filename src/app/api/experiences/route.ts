import { NextRequest, NextResponse } from 'next/server'

import { experiences } from '@/db/schema'
import { db } from '@/lib/db'

export async function GET() {
  const result = await db.select().from(experiences).orderBy(experiences.createdAt)

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company, position, period, description, responsibilities } = body

    if (!company || !position || !period || !description || !responsibilities) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await db.insert(experiences).values({
      company,
      position,
      period,
      description,
      responsibilities,
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar experiência:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
