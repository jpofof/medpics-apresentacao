import type { ReactNode } from 'react'

interface CartaoProps {
  titulo?: string
  icone?: string
  children: ReactNode
}

// Card padrão do design system: fundo bege claro, borda fina e cantos arredondados
function Cartao({ titulo, icone, children }: CartaoProps) {
  return (
    <section className={`rounded-2xl border border-black/10 bg-fundo p-5 sm:p-6`}>
      {titulo && (
        <h2 className="mb-5 flex items-center gap-3 text-[22px] font-normal tracking-tight text-texto">
          {icone && <img src={icone} alt="" className="h-6 w-6" />}
          {titulo}
        </h2>
      )}
      {children}
    </section>
  )
}

export default Cartao
