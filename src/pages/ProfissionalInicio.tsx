import AtalhoRapido from '../components/AtalhoRapido'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import CartaoIndicador from '../components/CartaoIndicador'
import ListaConsultas from '../components/ListaConsultas'
import Mensagem from '../components/Mensagem'
import MiniCalendario from '../components/MiniCalendario'
import PainelLayout from '../components/PainelLayout'
import { agendamentosDoProfissional, resumoParaProfissional, temDisponibilidade } from '../data/agenda'
import { agoraTexto, fimDaSemana, formatarData, hojeTexto, inicioDaSemana, mesDeHoje } from '../data/datas'
import { buscarProfissional, usuarioLogado } from '../data/usuarios'
import folhaIcone from '../assets/icones/icon-folha.svg'
import agendamentosIcone from '../assets/icones/icon-agendamentos.svg'
import consultasIcone from '../assets/icones/icon-consultas.svg'
import atividadesIcone from '../assets/icones/icon-atividades.svg'

// Início do profissional (Médico, Dentista ou Terapeuta): indicadores, agenda de hoje, calendário e atalhos.
// Só mostra dados de agendamento. Os atalhos de telas que ainda não existem aparecem como "em breve".
function ProfissionalInicio() {
  const usuario = usuarioLogado()
  const profissional = usuario === null ? null : buscarProfissional(usuario.id)
  if (usuario === null || profissional === null) return null

  const hoje = hojeTexto()
  const agora = agoraTexto()
  const todas = agendamentosDoProfissional(usuario.id) // da mais antiga para a mais recente
  const agendadas = todas.filter((c) => c.status === 'Agendada')

  const deHoje = agendadas.filter((c) => c.data === hoje)
  const naSemana = agendadas.filter((c) => c.data >= inicioDaSemana() && c.data <= fimDaSemana())
  const aguardandoRegistro = agendadas.filter((c) => c.data + 'T' + c.hora < agora) // já passaram e não foram registradas
  const faltasNoMes = todas.filter((c) => c.status === 'Faltou' && c.data.slice(0, 7) === mesDeHoje())

  return (
    <PainelLayout>
      <CabecalhoPagina
        titulo={'Olá, ' + usuario.nome + '!'}
        icone={folhaIcone}
        subtitulo={profissional.cargo + ' · ' + profissional.especialidade + ' · ' + formatarData(hoje)}
      />

      {!temDisponibilidade(usuario.id) && <Mensagem tipo="erro">Cadastre sua disponibilidade para receber agendamentos.</Mensagem>}

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        <CartaoIndicador numero={deHoje.length} texto="Consultas hoje" icone={agendamentosIcone} />
        <CartaoIndicador numero={naSemana.length} texto="Consultas na semana" icone={consultasIcone} />
        <CartaoIndicador numero={aguardandoRegistro.length} texto="Aguardando registro de atendimento" icone={atividadesIcone} />
        <CartaoIndicador numero={faltasNoMes.length} texto="Faltas no mês" icone={folhaIcone} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Cartao titulo="Agenda de hoje" icone={agendamentosIcone}>
          <ListaConsultas consultas={deHoje.map(resumoParaProfissional)} mensagemVazia="Nenhuma consulta agendada para hoje." />
        </Cartao>
        <MiniCalendario diasMarcados={agendadas.map((c) => c.data)} legenda="Dia com consulta" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <AtalhoRapido texto="Minha agenda" descricao="Consultas por dia e semana" para="/profissional/agenda" icone="agenda" />
        <AtalhoRapido texto="Disponibilidade" descricao="Seus horários de atendimento" para="/profissional/disponibilidade" icone="disponibilidade" />
        <AtalhoRapido texto="Histórico" descricao="Consultas por paciente" para="/profissional/historico" icone="historico" />
        <AtalhoRapido texto="Relatórios" descricao="Consultas, faltas e cancelamentos" para="/profissional/relatorios" icone="relatorios" />
      </div>
    </PainelLayout>
  )
}

export default ProfissionalInicio
