import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { aboutMe } from '@/db/schema'
import { db } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'About Me ID is required' },
        { status: 400 },
      )
    }

    const [deleted] = await db
      .delete(aboutMe)
      .where(eq(aboutMe.id, id))
      .returning()

    if (!deleted) {
      return NextResponse.json(
        { error: 'About Me não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao deletar about-me: ', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { content } = body

    if (!id) {
      return NextResponse.json(
        { error: 'About Me ID is required' },
        { status: 400 },
      )
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const [updated] = await db
      .update(aboutMe)
      .set({
        content,
        updatedAt: new Date(),
      })
      .where(eq(aboutMe.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: 'About Me não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao atualizar about-me: ', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
