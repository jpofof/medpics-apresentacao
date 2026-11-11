interface EtiquetaStatusProps {
  texto: string
}

// Etiqueta colorida de status (conta, consulta ou disponibilidade)
function EtiquetaStatus({ texto }: EtiquetaStatusProps) {
  let cores = 'bg-primary/15 text-primary' // Ativa, Agendada, Realizada
  if (texto === 'Aguardando aprovação' || texto === 'Férias' || texto === 'Licença') cores = 'bg-marrom-claro/25 text-marrom'
  if (texto === 'Cancelada' || texto === 'Recusado' || texto === 'Faltou') cores = 'bg-erro/10 text-erro'
  if (texto === 'Inativa') cores = 'bg-black/10 text-texto'

  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${cores}`}>{texto}</span>
}

export default EtiquetaStatus
