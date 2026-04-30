import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db'
import { certifications } from '@/db/schema'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const [deleted] = await db
      .delete(certifications)
      .where(eq(certifications.id, id))
      .returning()

    if (!deleted) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao deletar certificação: ', error)
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
    const data = await request.json()

    const [updated] = await db
      .update(certifications)
      .set(data)
      .where(eq(certifications.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.error('Erro ao atualizar certificação: ', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
