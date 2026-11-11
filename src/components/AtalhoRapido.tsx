import { Link } from 'react-router-dom'
import { telaPronta } from '../telas'
import IconeMenu from './IconeMenu'

interface AtalhoRapidoProps {
  texto: string
  descricao: string
  para: string
  icone: string // nome do ícone (veja IconeMenu)
}

const classeBase = 'flex min-h-11 items-center gap-3 rounded-2xl border p-4'

// Atalho para uma tela. Se a tela ainda não existe, aparece desabilitado com a etiqueta "em breve" (sem link).
function AtalhoRapido({ texto, descricao, para, icone }: AtalhoRapidoProps) {
  const conteudo = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fundo-2 text-primary">
        <IconeMenu nome={icone} />
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block break-words text-[14px] text-texto">{texto}</strong>
        <span className="block break-words text-[12px] text-marrom">{descricao}</span>
      </span>
    </>
  )

  if (!telaPronta(para)) {
    return (
      <div aria-disabled="true" className={`${classeBase} cursor-not-allowed border-black/5 bg-fundo opacity-60`}>
        {conteudo}
        <span className="shrink-0 whitespace-nowrap rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-medium text-marrom">em breve</span>
      </div>
    )
  }

  return (
    <Link
      to={para}
      className={`${classeBase} border-black/10 bg-fundo transition-colors duration-200 hover:border-primary hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-fundo-2`}
    >
      {conteudo}
    </Link>
  )
}

export default AtalhoRapido
