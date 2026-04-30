import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { hobbies } from '@/db/schema'
import { db } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Hobby ID is required' },
        { status: 400 },
      )
    }

    const [deleted] = await db
      .delete(hobbies)
      .where(eq(hobbies.id, id))
      .returning()

    if (!deleted) {
      return NextResponse.json(
        { error: 'Hobby not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao deletar hobbies: ', error)
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
    const { title } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Hobby ID is required' },
        { status: 400 },
      )
    }

    if (!title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const [updated] = await db
      .update(hobbies)
      .set({
        title,
      })
      .where(eq(hobbies.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: 'Hobby not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao atualizar hobbies: ', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
