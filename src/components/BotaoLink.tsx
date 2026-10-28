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
      className="inline-block rounded-xl px-5 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary bg-primary text-white hover:bg-texto active:bg-black"
    >
      {children}
    </Link>
  )
}

export default BotaoLink
