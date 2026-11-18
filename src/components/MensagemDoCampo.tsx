import IconeSimbolo from './IconeSimbolo'

interface MensagemDoCampoProps {
  texto: string
}

// Texto de erro logo abaixo de um campo inválido
function MensagemDoCampo({ texto }: MensagemDoCampoProps) {
  return (
    <p role="alert" className="mt-2 flex items-start gap-2 text-sm font-bold text-erro">
      <IconeSimbolo nome="alerta" className="mt-0.5 h-4 w-4" />
      <span>{texto}</span>
    </p>
  )
}

export default MensagemDoCampo
