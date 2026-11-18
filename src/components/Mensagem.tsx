import type { ReactNode } from 'react'

interface MensagemProps {
  tipo?: string // "sucesso" (padrão) ou "erro"
  children: ReactNode
}

// Faixa de aviso: verde para sucesso, marrom para erro
function Mensagem({ tipo = 'sucesso', children }: MensagemProps) {
  const ehErro = tipo === 'erro'
  return (
    <div
      role={ehErro ? 'alert' : 'status'}
      className={`rounded-xl border px-4 py-3 text-sm ${ehErro ? 'border-marrom/40 bg-marrom/10 text-marrom' : 'border-verde-cta/40 bg-verde-cta/10 text-verde-cta'}`}
    >
      {children}
    </div>
  )
}

export default Mensagem
