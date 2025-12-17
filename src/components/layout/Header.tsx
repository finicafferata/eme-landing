import Link from 'next/link'
import type { SiteSettings } from '@/types/sanity'
import MobileMenu from './MobileMenu'
import Logo from '@/components/Logo'

interface HeaderProps {
  settings: SiteSettings
}

export default function Header({ settings }: HeaderProps) {
  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center text-sm lg:text-base text-white uppercase tracking-[0.15em]">
            <Link
              href="/"
              className="hover:underline underline-offset-4 transition-all duration-200"
            >
              Trabajos
            </Link>
            <span>,&nbsp;</span>
            <Link
              href="/about"
              className="hover:underline underline-offset-4 transition-all duration-200"
            >
              Sobre nosotras
            </Link>
            <span>,&nbsp;</span>
            <Link
              href="/archive"
              className="hover:underline underline-offset-4 transition-all duration-200"
            >
              Taller
            </Link>
            <span>,&nbsp;</span>
            <Link
              href="/contact"
              className="hover:underline underline-offset-4 transition-all duration-200"
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
