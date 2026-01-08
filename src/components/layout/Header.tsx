'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { SiteSettings } from '@/types/sanity'
import MobileMenu from './MobileMenu'
import Logo from '@/components/Logo'

interface HeaderProps {
  settings: SiteSettings
}

export default function Header({ settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center text-sm lg:text-base uppercase tracking-[0.15em] transition-colors duration-300 ${
              isScrolled ? 'text-[#beb03c]' : 'text-[#fdf2e8]'
            }`}
          >
            <Link
              href="/"
              className="hover:underline underline-offset-4 transition-all duration-200"
            >
              Trabajos
            </Link>
            <span className="mx-3">/</span>
            <Link
              href="/about"
              className="hover:underline underline-offset-4 transition-all duration-200"
            >
              Sobre nosotras
            </Link>
            <span className="mx-3">/</span>
            <Link
              href="/archive"
              className="hover:underline underline-offset-4 transition-all duration-200"
            >
              Taller
            </Link>
            <span className="mx-3">/</span>
            <Link
              href="/contact"
              className="hover:underline underline-offset-4 transition-all duration-200"
            >
              Contacto
            </Link>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  )
}
