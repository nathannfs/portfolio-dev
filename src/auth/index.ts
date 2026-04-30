import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { authenticate } from "@/http/auth/authenticate"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Senha",
        },
      },
      async authorize(credentials) {
        if (!(credentials?.email && credentials?.password)) {
          return null
        }

        const user = await authenticate({
          email: credentials.email as string,
          password: credentials.password as string,
        })

        if (!user) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
})
