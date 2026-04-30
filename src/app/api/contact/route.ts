import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!(name && email && message)) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["nathann.santoss2@gmail.com"],
      subject: `New message from ${name} - Portfolio`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #0ea5e9;">New message from your portfolio</h2>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h3 style="color: #334155; margin-top: 0;">Message details:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            This message was sent through the contact form of your portfolio.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json(
        { error: "Error sending email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
