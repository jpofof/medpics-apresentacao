import { Link } from 'react-router-dom'

interface BotoesDaPaginaProps {
  extraTexto?: string // botão a mais (opcional)
  extraPara?: string
}

const classeSecundario =
  'inline-flex min-h-14 items-center justify-center rounded-full border-2 border-verde-cta px-8 text-botao font-semibold text-escuro transition-colors duration-200 hover:bg-verde-cta hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta'

// Botões do fim das páginas públicas: voltar ao início e criar conta
function BotoesDaPagina({ extraTexto, extraPara }: BotoesDaPaginaProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      {extraTexto && extraPara && (
        <Link to={extraPara} className={classeSecundario}>
          {extraTexto}
        </Link>
      )}
      <Link to="/" className={classeSecundario}>
        Voltar ao início
      </Link>
      <Link
        to="/cadastro"
        className="inline-flex min-h-14 items-center justify-center rounded-full bg-verde-cta px-8 text-botao font-semibold text-white transition-colors duration-200 hover:bg-escuro hover:text-fundo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta"
      >
        Criar conta grátis
      </Link>
    </div>
  )
}

export default BotoesDaPagina
