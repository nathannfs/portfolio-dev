import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { experiences } from '@/db/schema'
import { db } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()

    const [updated] = await db
      .update(experiences)
      .set(body)
      .where(eq(experiences.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json({ error: 'Experiência não encontrada' }, { status: 404 })
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao atualizar experiência:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const [deleted] = await db
      .delete(experiences)
      .where(eq(experiences.id, id))
      .returning()

    if (!deleted) {
      return NextResponse.json({ error: 'Experiência não encontrada' }, { status: 404 })
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao deletar experiência:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
