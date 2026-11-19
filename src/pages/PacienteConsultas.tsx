import { useState } from 'react'
import BotaoLink from '../components/BotaoLink'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import ConsultasAgendadas from '../components/ConsultasAgendadas'
import MiniCalendario from '../components/MiniCalendario'
import PainelLayout from '../components/PainelLayout'
import { agendamentosDoPaciente } from '../data/agenda'
import { usuarioLogado } from '../data/usuarios'
import { Link } from 'react-router-dom'

// "Minhas consultas" (Quadro 9): consultas agendadas, com cancelamento, e o calendário.
// O histórico completo fica em "Meu histórico".
function PacienteConsultas() {
  const [, setCancelamentos] = useState(0) // só serve para redesenhar o calendário depois de cancelar
  const usuario = usuarioLogado()
  if (usuario === null) return null

  const dias = agendamentosDoPaciente(usuario.id)
    .filter((a) => a.status === 'Agendada')
    .map((a) => a.data)

  return (
    <PainelLayout>
      <CabecalhoPagina
        titulo="Minhas consultas"
        subtitulo="Gerencie suas consultas agendadas"
        acao={<BotaoLink para="/paciente/agendar">+ Agendar consulta</BotaoLink>}
      />

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Cartao titulo="Próximas consultas">
          <ConsultasAgendadas idPaciente={usuario.id} aoMudar={() => setCancelamentos((n) => n + 1)} />
        </Cartao>
        <div className="flex flex-col gap-4">
          <MiniCalendario diasMarcados={dias} legenda="Consulta agendada" />
          <Link to="/paciente/historico" className="inline-flex min-h-11 items-center text-pequeno font-semibold text-verde-cta hover:underline">
            Ver meu histórico completo
          </Link>
        </div>
      </div>
    </PainelLayout>
  )
}

export default PacienteConsultas
