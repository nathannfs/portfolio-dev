import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // Enviar email usando Resend
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Você pode mudar isso depois
      to: ['nathann.santoss2@gmail.com'],
      subject: `Nova mensagem de ${name} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Nova mensagem do seu portfolio</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Detalhes da mensagem:</h3>
            
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0ea5e9;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            Esta mensagem foi enviada através do formulário de contato do seu portfolio.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Erro do Resend:', error)
      return NextResponse.json(
        { error: 'Erro ao enviar email' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Mensagem enviada com sucesso!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
