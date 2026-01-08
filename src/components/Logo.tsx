import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="relative block">
      <Image
        src="/logo.png"
        alt="EME Estudio"
        width={120}
        height={40}
        className="h-10 md:h-12 w-auto"
        priority
        unoptimized
      />
    </Link>
  )
}
