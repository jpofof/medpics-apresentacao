import type { ReactNode } from 'react'

interface CabecalhoPaginaProps {
  titulo: string
  subtitulo?: string
  icone?: string
  acao?: ReactNode // botão da direita (ex: "+ Agendar consulta")
}

function CabecalhoPagina({ titulo, subtitulo, icone, acao }: CabecalhoPaginaProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-3 text-[28px] font-semibold text-escuro lg:text-[32px]">
          {titulo}
          {icone && <img src={icone} alt="" className="h-7 w-7" />}
        </h1>
        {subtitulo && <p className="mt-1 text-[13px] text-marrom">{subtitulo}</p>}
      </div>
      {acao}
    </div>
  )
}

export default CabecalhoPagina
