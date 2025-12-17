'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nombre
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-3 border border-foreground/20 rounded focus:outline-none focus:ring-2 focus:ring-brand-violet"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-3 border border-foreground/20 rounded focus:outline-none focus:ring-2 focus:ring-brand-violet"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Mensaje
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          className="w-full px-4 py-3 border border-foreground/20 rounded focus:outline-none focus:ring-2 focus:ring-brand-violet"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-brand-violet text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 text-green-800 rounded">
          ¡Mensaje enviado con éxito! Te responderemos pronto.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 text-red-800 rounded">
          Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
        </div>
      )}
    </form>
  )
}
