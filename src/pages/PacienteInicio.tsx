import AtalhoRapido from '../components/AtalhoRapido'
import AvisosDoPaciente from '../components/AvisosDoPaciente'
import BotaoLink from '../components/BotaoLink'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import CartaoIndicador from '../components/CartaoIndicador'
import CartaoProximaConsulta from '../components/CartaoProximaConsulta'
import ListaConsultas from '../components/ListaConsultas'
import MiniCalendario from '../components/MiniCalendario'
import PainelLayout from '../components/PainelLayout'
import { agendamentosDoPaciente, resumoParaPaciente } from '../data/agenda'
import { agoraTexto, formatarData, hojeTexto } from '../data/datas'
import { usuarioLogado } from '../data/usuarios'
import folhaIcone from '../assets/icones/icon-folha.svg'
import agendamentosIcone from '../assets/icones/icon-agendamentos.svg'
import consultasIcone from '../assets/icones/icon-consultas.svg'
import atividadesIcone from '../assets/icones/icon-atividades.svg'

const diasDaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']

// Painel do paciente: próxima consulta, indicadores, calendário, atalhos, avisos e últimas consultas (tudo dos dados reais)
function PacienteInicio() {
  const usuario = usuarioLogado()
  if (usuario === null) return null

  const consultas = agendamentosDoPaciente(usuario.id) // da mais recente para a mais antiga
  const agora = agoraTexto()
  const agendadas = consultas.filter((c) => c.status === 'Agendada')
  // A próxima é a Agendada mais perto de agora (as agendadas ficam em ordem decrescente, então pegamos a última futura)
  const futuras = agendadas.filter((c) => c.data + 'T' + c.hora >= agora)
  const proxima = futuras.length > 0 ? resumoParaPaciente(futuras[futuras.length - 1]) : null

  const hoje = hojeTexto()
  const subtitulo = diasDaSemana[new Date().getDay()] + ', ' + formatarData(hoje)

  return (
    <PainelLayout>
      <CabecalhoPagina
        titulo={'Olá, ' + usuario.nome.split(' ')[0] + '!'}
        icone={folhaIcone}
        subtitulo={subtitulo}
        acao={<BotaoLink para="/paciente/agendar">+ Agendar Consulta</BotaoLink>}
      />

      <AvisosDoPaciente idPaciente={usuario.id} />

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <CartaoProximaConsulta
          consulta={proxima}
          rotuloBotao="Ver consultas"
          destinoBotao="/paciente/consultas"
          mensagemVazia="Você não tem consultas agendadas."
          rotuloVazio="Agendar consulta"
          destinoVazio="/paciente/agendar"
        />
        <MiniCalendario diasMarcados={agendadas.map((c) => c.data)} legenda="Consulta agendada" />
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-6">
        <CartaoIndicador numero={agendadas.length} texto="Consultas agendadas" icone={agendamentosIcone} />
        <CartaoIndicador numero={consultas.filter((c) => c.status === 'Realizada').length} texto="Consultas realizadas" icone={consultasIcone} />
        <CartaoIndicador numero={consultas.filter((c) => c.status === 'Cancelada').length} texto="Consultas canceladas" icone={atividadesIcone} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <AtalhoRapido texto="Agendar consulta" descricao="Escolha profissional e horário" para="/paciente/agendar" icone="agendar" />
        <AtalhoRapido texto="Minhas consultas" descricao="Veja e cancele consultas" para="/paciente/consultas" icone="consultas" />
        <AtalhoRapido texto="Meu histórico" descricao="Todas as consultas já marcadas" para="/paciente/historico" icone="historico" />
      </div>

      <Cartao titulo="Últimas consultas" icone={atividadesIcone}>
        <ListaConsultas
          consultas={consultas.slice(0, 5).map(resumoParaPaciente)}
          mensagemVazia="Nenhuma consulta por enquanto. Agende uma consulta para ela aparecer aqui."
        />
      </Cartao>
    </PainelLayout>
  )
}

export default PacienteInicio
