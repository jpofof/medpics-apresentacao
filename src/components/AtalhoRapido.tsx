import { Link } from 'react-router-dom'
import IconeMenu from './IconeMenu'

interface AtalhoRapidoProps {
  texto: string
  descricao: string
  para: string
  icone: string // nome do ícone (veja IconeMenu)
}

const classeBase = 'flex min-h-11 items-center gap-3 rounded-2xl border p-4'

// Atalho para uma tela, com ícone, título e descrição.
function AtalhoRapido({ texto, descricao, para, icone }: AtalhoRapidoProps) {
  const conteudo = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bege text-verde-cta">
        <IconeMenu nome={icone} />
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block break-words text-[14px] text-escuro">{texto}</strong>
        <span className="block break-words text-[12px] text-marrom">{descricao}</span>
      </span>
    </>
  )

  return (
    <Link
      to={para}
      className={`${classeBase} border-escuro/10 bg-fundo transition-colors duration-200 hover:border-verde-cta hover:bg-fundo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta active:bg-bege`}
    >
      {conteudo}
    </Link>
  )
}

export default AtalhoRapido
