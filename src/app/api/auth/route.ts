import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"

import { users } from "@/db/schema"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!(email && password)) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    )
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  const foundUser = user[0]

  if (!foundUser) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    )
  }

  const isValid = await bcrypt.compare(password, foundUser.password)

  if (!isValid) {
    return NextResponse.json({ error: "Senha inválida" }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = foundUser

  return NextResponse.json(userWithoutPassword)
}
