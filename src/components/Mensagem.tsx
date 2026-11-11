import type { ReactNode } from 'react'

interface MensagemProps {
  tipo?: string // "sucesso" (padrão) ou "erro"
  children: ReactNode
}

// Faixa de aviso: verde para sucesso, vermelha para erro
function Mensagem({ tipo = 'sucesso', children }: MensagemProps) {
  const ehErro = tipo === 'erro'
  return (
    <div
      role={ehErro ? 'alert' : 'status'}
      className={`rounded-xl border px-4 py-3 text-sm ${ehErro ? 'border-erro/40 bg-erro/10 text-erro' : 'border-primary/40 bg-primary/10 text-primary'}`}
    >
      {children}
    </div>
  )
}

export default Mensagem
