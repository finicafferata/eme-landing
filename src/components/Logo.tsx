'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  const [isDarkBg, setIsDarkBg] = useState(true)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const detectBackground = () => {
      if (!logoRef.current) return

      const rect = logoRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Get element at logo position (excluding the entire header since it's fixed)
      const header = logoRef.current.closest('header')
      if (header) {
        header.style.pointerEvents = 'none'
      }
      let elementBelow = document.elementFromPoint(centerX, centerY)
      if (header) {
        header.style.pointerEvents = 'auto'
      }

      // Traverse up to find element with actual background color (skip transparent elements)
      let bgColor = 'rgba(0, 0, 0, 0)'
      let checkedElements: string[] = []

      while (elementBelow) {
        const computedStyle = window.getComputedStyle(elementBelow)
        const bg = computedStyle.backgroundColor

        checkedElements.push(`${elementBelow.tagName}.${elementBelow.className} -> ${bg}`)

        // Check if background is not transparent
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          bgColor = bg
          console.log('Found background on:', elementBelow.tagName, elementBelow.className, 'Color:', bg)
          break
        }

        // Stop at body (inclusive)
        if (elementBelow === document.body) {
          break
        }

        elementBelow = elementBelow.parentElement
      }

      console.log('Checked elements:', checkedElements)

      // Parse RGB values
      const rgb = bgColor.match(/\d+/g)?.map(Number)

      if (rgb && rgb.length >= 3) {
        // Calculate brightness (perceived luminance)
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

        // Debug logging
        console.log('Logo background detection:', {
          bgColor,
          rgb,
          brightness,
          isDarkBg: brightness < 128
        })

        // If background is dark (brightness < 128), keep original colors (magenta)
        // If background is light, change to green
        setIsDarkBg(brightness < 128)
      } else {
        console.log('No valid RGB found, bgColor:', bgColor)
      }
    }

    let scrollTimeout: NodeJS.Timeout
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(detectBackground, 10)
    }

    // Initial detection
    detectBackground()

    window.addEventListener('scroll', debouncedScroll, { passive: true })
    window.addEventListener('resize', detectBackground)

    return () => {
      window.removeEventListener('scroll', debouncedScroll)
      window.removeEventListener('resize', detectBackground)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <Link href="/" className="relative block">
      <div
        ref={logoRef}
        className="relative"
        style={{
          filter: isDarkBg ? 'none' : 'hue-rotate(200deg) saturate(1.2)',
          transition: 'filter 300ms ease-out'
        }}
      >
        <Image
          src="/logo.png"
          alt="EME Estudio"
          width={120}
          height={40}
          className="h-10 md:h-12 w-auto"
          priority
          unoptimized
        />
      </div>
    </Link>
  )
}
