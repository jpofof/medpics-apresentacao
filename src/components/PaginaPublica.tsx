import type { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface PaginaPublicaProps {
  children: ReactNode
}

// Moldura das páginas públicas: menu do topo, conteúdo e rodapé (igual à página inicial)
function PaginaPublica({ children }: PaginaPublicaProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  )
}

export default PaginaPublica
