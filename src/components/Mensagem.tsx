import type { ReactNode } from 'react'
import IconeSimbolo from './IconeSimbolo'

interface MensagemProps {
  tipo?: string // "sucesso" (padrão), "erro" ou "aviso"
  children: ReactNode
}

// Caixa de mensagem: sempre com ícone e texto (a cor nunca é a única pista)
function Mensagem({ tipo = 'sucesso', children }: MensagemProps) {
  let cores = 'border-verde-cta bg-verde-leve'
  let corIcone = 'text-verde-cta'
  let icone = 'check'
  if (tipo === 'erro') {
    cores = 'border-erro bg-fundo'
    corIcone = 'text-erro'
    icone = 'alerta'
  }
  if (tipo === 'aviso') {
    cores = 'border-verde-medio bg-bege'
    corIcone = 'text-escuro'
    icone = 'info'
  }

  return (
    <div role={tipo === 'erro' ? 'alert' : 'status'} className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3 text-pequeno font-bold text-escuro ${cores}`}>
      <span className={`mt-0.5 ${corIcone}`}>
        <IconeSimbolo nome={icone} />
      </span>
      <div>{children}</div>
    </div>
  )
}

export default Mensagem
