import IconeSimbolo from './IconeSimbolo'

interface EtiquetaStatusProps {
  texto: string
}

// Etiqueta de status: texto + ícone + estilo (a cor nunca é a única pista)
function EtiquetaStatus({ texto }: EtiquetaStatusProps) {
  let estilo = 'border-2 border-verde-medio bg-bege text-escuro' // Agendada, Aguardando aprovação, Férias, Licença
  let icone = 'relogio'
  if (texto === 'Aguardando aprovação') icone = 'pausa'
  if (texto === 'Férias' || texto === 'Licença') icone = 'info'
  if (texto === 'Realizada' || texto === 'Ativa') {
    estilo = 'border-2 border-verde-leve bg-verde-leve text-escuro'
    icone = 'check'
  }
  if (texto === 'Cancelada' || texto === 'Faltou' || texto === 'Recusado' || texto === 'Inativa') {
    estilo = 'border-2 border-erro bg-fundo font-bold text-erro'
    icone = texto === 'Inativa' ? 'pausa' : 'x'
    if (texto === 'Faltou') icone = 'alerta'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-pequeno font-semibold ${estilo}`}>
      <IconeSimbolo nome={icone} className="h-4 w-4" />
      {texto}
    </span>
  )
}

export default EtiquetaStatus
