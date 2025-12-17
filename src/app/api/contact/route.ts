import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    // TODO: Implement email sending with Resend
    // For now, just log the message
    console.log('Contact form submission:', data)

    // If you have Resend API key, uncomment this:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'contacto@eme-estudio.com',
      to: 'info@eme-estudio.com',
      subject: `Nuevo mensaje de ${data.name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
      `,
    })
    */

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
