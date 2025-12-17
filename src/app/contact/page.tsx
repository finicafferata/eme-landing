import ContactForm from '@/components/forms/ContactForm'
import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'
import type { SiteSettings } from '@/types/sanity'

export const metadata = {
  title: 'Contacto | EME Estudio',
  description: 'Contactá con EME Estudio',
}

export default async function ContactPage() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Contacto</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Envianos un mensaje</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
            <div className="space-y-4">
              {settings?.contactInfo?.address && (
                <div>
                  <h3 className="font-medium mb-2">Dirección</h3>
                  <p className="text-foreground/80 whitespace-pre-line">
                    {settings.contactInfo.address}
                  </p>
                </div>
              )}

              {settings?.contactInfo?.email && (
                <div>
                  <h3 className="font-medium mb-2">Email</h3>
                  <a
                    href={`mailto:${settings.contactInfo.email}`}
                    className="text-brand-violet hover:underline"
                  >
                    {settings.contactInfo.email}
                  </a>
                </div>
              )}

              {settings?.contactInfo?.phone && (
                <div>
                  <h3 className="font-medium mb-2">Teléfono</h3>
                  <a
                    href={`tel:${settings.contactInfo.phone}`}
                    className="text-brand-violet hover:underline"
                  >
                    {settings.contactInfo.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
