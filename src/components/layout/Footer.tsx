import Link from 'next/link'
import type { SiteSettings } from '@/types/sanity'

interface FooterProps {
  settings: SiteSettings
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="w-full bg-background min-h-screen flex flex-col items-center justify-center relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20 text-center">
        {/* CTA Section - Centered */}
        <div className="max-w-2xl mx-auto mb-12">
          {settings.footerCTA && (
            <p className="text-base md:text-lg mb-8 text-text-gold/80 tracking-wide">
              {settings.footerCTA}
            </p>
          )}
          <Link
            href="/contact"
            className="inline-block px-12 py-4 border-2 border-text-gold text-text-gold rounded-full hover:bg-text-gold hover:text-black transition-all duration-150 text-sm uppercase tracking-[0.2em]"
          >
            Contactanos
          </Link>
        </div>
      </div>

      {/* Bottom Bar with Address and Links - Absolute positioned at bottom of footer */}
      <div className="absolute bottom-0 left-0 right-0 w-full border-t border-text-gold/10 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-text-gold/50">
            {/* Address - Left */}
            <div>
              {settings.contactInfo?.address && (
                <p className="whitespace-nowrap">
                  {settings.contactInfo.address.replace(/\n/g, ', ')}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
