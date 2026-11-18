interface EtiquetaStatusProps {
  texto: string
}

// Etiqueta colorida de status (conta, consulta ou disponibilidade)
function EtiquetaStatus({ texto }: EtiquetaStatusProps) {
  let cores = 'bg-verde-cta/15 text-verde-cta' // Ativa, Agendada, Realizada
  if (texto === 'Aguardando aprovação' || texto === 'Férias' || texto === 'Licença') cores = 'bg-marrom-claro/25 text-marrom'
  if (texto === 'Cancelada' || texto === 'Recusado' || texto === 'Faltou') cores = 'bg-marrom/10 text-marrom'
  if (texto === 'Inativa') cores = 'bg-escuro/10 text-escuro'

  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${cores}`}>{texto}</span>
}

export default EtiquetaStatus
