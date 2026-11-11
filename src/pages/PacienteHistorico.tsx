import { useState } from 'react'
import Campo from '../components/Campo'
import CampoSelect from '../components/CampoSelect'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import ListaConsultas from '../components/ListaConsultas'
import PainelLayout from '../components/PainelLayout'
import { agendamentosDoPaciente, resumoParaPaciente } from '../data/agenda'
import { usuarioLogado } from '../data/usuarios'

const statusPossiveis = ['Agendada', 'Realizada', 'Cancelada', 'Faltou']

// "Meu histórico" (Quadro 10): todas as consultas do paciente (data, horário, profissional e status),
// da mais recente para a mais antiga, com filtro por período e por status.
function PacienteHistorico() {
  const [de, setDe] = useState('')
  const [ate, setAte] = useState('')
  const [status, setStatus] = useState('')

  const usuario = usuarioLogado()
  if (usuario === null) return null

  const consultas = agendamentosDoPaciente(usuario.id) // já vem da mais recente para a mais antiga
    .filter((a) => de === '' || a.data >= de)
    .filter((a) => ate === '' || a.data <= ate)
    .filter((a) => status === '' || a.status === status)
    .map(resumoParaPaciente)

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Meu histórico" subtitulo="Todas as suas consultas, da mais recente para a mais antiga" />

      <Cartao>
        <div className="grid gap-x-5 sm:grid-cols-3">
          <Campo id="de" rotulo="De" tipo="date" valor={de} aoMudar={setDe} />
          <Campo id="ate" rotulo="Até" tipo="date" valor={ate} aoMudar={setAte} />
          <CampoSelect id="status" rotulo="Status" opcoes={statusPossiveis} valor={status} aoMudar={setStatus} />
        </div>
        <ListaConsultas consultas={consultas} mensagemVazia="Nenhuma consulta encontrada para este filtro." />
      </Cartao>
    </PainelLayout>
  )
}

export default PacienteHistorico
