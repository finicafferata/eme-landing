import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Página no encontrada</h2>
        <p className="text-lg text-foreground/80 mb-8">
          Lo sentimos, la página que buscás no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-brand-violet text-white rounded hover:opacity-90 transition-opacity"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
