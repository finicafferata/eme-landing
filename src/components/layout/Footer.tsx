import Link from 'next/link'
import type { SiteSettings } from '@/types/sanity'

interface FooterProps {
  settings: SiteSettings
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="w-full bg-black min-h-screen flex flex-col items-center justify-center relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20 text-center">
        {/* CTA Section - Centered */}
        <div className="max-w-2xl mx-auto mb-12">
          {settings.footerCTA && (
            <p className="text-base md:text-lg mb-8 text-white/80 tracking-wide">
              {settings.footerCTA}
            </p>
          )}
          <Link
            href="/contact"
            className="inline-block px-12 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-150 text-sm uppercase tracking-[0.2em]"
          >
            Contactanos
          </Link>
        </div>
      </div>

      {/* Bottom Bar with Address and Links - Absolute positioned at bottom of footer */}
      <div className="absolute bottom-0 left-0 right-0 w-full border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-white/50">
            {/* Address - Left */}
            <div>
              {settings.contactInfo?.address && (
                <p className="whitespace-nowrap">
                  {settings.contactInfo.address.replace(/\n/g, ', ')}
                </p>
              )}
            </div>

            {/* Links - Right */}
            <div className="flex gap-4 uppercase tracking-wider">
              <span className="hover:text-white transition-colors cursor-pointer">Instructions</span>
              <span className="hover:text-white transition-colors cursor-pointer">Style Guide</span>
              <span className="hover:text-white transition-colors cursor-pointer">Licenses</span>
              <span className="hover:text-white transition-colors cursor-pointer">Changelog</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
