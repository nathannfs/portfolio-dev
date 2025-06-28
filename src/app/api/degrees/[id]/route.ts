import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { degrees } from '@/db/schema'
import { db } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Degree ID is required' },
        { status: 400 },
      )
    }

    const [deleted] = await db
      .delete(degrees)
      .where(eq(degrees.id, id))
      .returning()

    if (!deleted) {
      return NextResponse.json(
        { error: 'Degree não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao deletar degrees: ', error)
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
    const { title, institution, period, status, description } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Degree ID is required' },
        { status: 400 },
      )
    }

    if (!title || !institution || !period || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const [updated] = await db
      .update(degrees)
      .set({
        title,
        institution,
        period,
        status,
        description,
      })
      .where(eq(degrees.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: 'Degree não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao atualizar degrees: ', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
