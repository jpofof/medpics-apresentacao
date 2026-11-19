import { Link } from 'react-router-dom'

interface BotaoLinkProps {
  para: string
  children: string
}

// Link do React Router com a aparência de botão
function BotaoLink({ para, children }: BotaoLinkProps) {
  return (
    <Link
      to={para}
      className="inline-flex min-h-14 items-center rounded-xl px-5 py-3 text-botao font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta bg-verde-cta text-white hover:bg-escuro hover:text-fundo active:bg-escuro"
    >
      {children}
    </Link>
  )
}

export default BotaoLink
