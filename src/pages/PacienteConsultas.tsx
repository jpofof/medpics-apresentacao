import { useState } from 'react'
import Botao from '../components/Botao'
import BotaoLink from '../components/BotaoLink'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import PainelLayout from '../components/PainelLayout'
import { agendamentosDoPaciente, cancelarAgendamento } from '../data/agenda'
import { formatarData } from '../data/datas'
import { especialidadeDoProfissional, nomeDoUsuario, usuarioLogado } from '../data/usuarios'
import agendamentosIcone from '../assets/icones/icon-agendamentos.svg'

interface Consulta {
  id: number
  profissional: string
  especialidade: string
  data: string // dd/mm/aaaa
  hora: string
  status: string // "Agendada", "Realizada", "Cancelada" ou "Faltou"
}

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

// Lê do armazenamento as consultas do paciente logado (da mais recente para a mais antiga)
function carregarConsultas(): Consulta[] {
  const usuario = usuarioLogado()
  const consultas: Consulta[] = []
  if (usuario === null) return consultas
  for (const a of agendamentosDoPaciente(usuario.id)) {
    consultas.push({
      id: a.id,
      profissional: nomeDoUsuario(a.idProfissional),
      especialidade: especialidadeDoProfissional(a.idProfissional),
      data: formatarData(a.data),
      hora: a.hora,
      status: a.status,
    })
  }
  return consultas
}

const classeDoBotaoSeta =
  'h-8 w-8 rounded-full border border-black/10 text-lg text-marrom transition-colors duration-200 hover:bg-fundo-2 focus-visible:outline-2 focus-visible:outline-primary active:bg-fundo-2'

// Tela "Minhas consultas": próximas consultas (com cancelamento), histórico e calendário.
// Cancelar grava no armazenamento. As regras (24h, confirmação, avisos) entram na Fase 7.
function PacienteConsultas() {
  const [consultas, setConsultas] = useState(carregarConsultas)
  // O calendário abre no mês atual
  const [mes, setMes] = useState(new Date().getMonth())
  const [ano, setAno] = useState(new Date().getFullYear())

  const proximas = consultas.filter((c) => c.status === 'Agendada').reverse() // a mais próxima primeiro
  const historico = consultas.filter((c) => c.status !== 'Agendada')

  function cancelar(id: number) {
    const usuario = usuarioLogado()
    if (usuario === null) return
    cancelarAgendamento(id, usuario.id, '')
    setConsultas(carregarConsultas())
  }

  function mudarMes(passo: number) {
    const novoMes = new Date(ano, mes + passo, 1)
    setMes(novoMes.getMonth())
    setAno(novoMes.getFullYear())
  }

  // Células do calendário: 0 = espaço vazio antes do dia 1, depois os dias do mês
  const celulas: number[] = []
  for (let i = 0; i < new Date(ano, mes, 1).getDay(); i++) {
    celulas.push(0)
  }
  for (let dia = 1; dia <= new Date(ano, mes + 1, 0).getDate(); dia++) {
    celulas.push(dia)
  }

  // Diz se o dia tem consulta agendada (compara com o texto dd/mm/aaaa)
  function diaTemConsulta(dia: number): boolean {
    const texto = String(dia).padStart(2, '0') + '/' + String(mes + 1).padStart(2, '0') + '/' + ano
    return proximas.some((c) => c.data === texto)
  }

  return (
    <PainelLayout>
      <CabecalhoPagina
        titulo="Minhas consultas"
        subtitulo="Gerencie suas consultas agendadas"
        acao={<BotaoLink para="/paciente/agendar">+ Agendar consulta</BotaoLink>}
      />

      <div className="grid gap-6 lg:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-6">
          <Cartao titulo="Próximas Consultas">
            {proximas.length === 0 ? (
              <div className="py-8 text-center">
                <p className="mb-1 font-titulo text-2xl text-texto">Nenhuma consulta agendada</p>
                <p className="text-sm text-marrom">Clique em “Agendar consulta” para marcar a próxima.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {proximas.map((consulta) => (
                  <li
                    key={consulta.id}
                    className="flex flex-wrap items-center gap-4 rounded-[18px] border border-black/5 bg-[#f7f5f0] px-5 py-4"
                  >
                    <img src={agendamentosIcone} alt="" className="h-8 w-8" />
                    <div className="min-w-44 flex-1">
                      <strong className="block text-[15px] text-texto">{consulta.profissional}</strong>
                      <span className="text-[13px] text-marrom opacity-80">{consulta.especialidade}</span>
                    </div>
                    <div className="text-[13px] text-marrom">
                      <p className="font-medium">{consulta.data}</p>
                      <p className="opacity-75">{consulta.hora}</p>
                    </div>
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">Agendada</span>
                    <Botao variante="perigo" aoClicar={() => cancelar(consulta.id)}>
                      Cancelar
                    </Botao>
                  </li>
                ))}
              </ul>
            )}
          </Cartao>

          <Cartao titulo="Histórico Recente">
            {historico.length === 0 ? (
              <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">Seu histórico ainda está vazio.</p>
            ) : (
              <ul>
                {historico.map((consulta) => (
                  <li key={consulta.id} className="flex items-center justify-between gap-3 border-b border-fundo-2 py-4 last:border-0">
                    <div>
                      <strong className="block text-[15px] text-texto">{consulta.profissional}</strong>
                      <span className="text-[13px] text-marrom opacity-80">{consulta.especialidade}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] text-marrom">{consulta.data}</p>
                      <span className={`text-xs font-medium ${consulta.status === 'Cancelada' ? 'text-erro' : 'text-primary'}`}>
                        {consulta.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Cartao>
        </div>

        <Cartao>
          <div className="mb-4 flex items-center justify-between">
            <h5 className="font-titulo text-[17px] text-texto">
              {meses[mes]} {ano}
            </h5>
            <div className="flex gap-2">
              <button type="button" aria-label="Mês anterior" onClick={() => mudarMes(-1)} className={classeDoBotaoSeta}>
                ‹
              </button>
              <button type="button" aria-label="Próximo mês" onClick={() => mudarMes(1)} className={classeDoBotaoSeta}>
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-[12px]">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((letra, indice) => (
              <span key={indice} className="py-1 font-semibold text-marrom-claro">
                {letra}
              </span>
            ))}
            {celulas.map((dia, indice) => (
              <span key={indice} className="flex justify-center py-0.5">
                {dia > 0 && (
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      diaTemConsulta(dia) ? 'bg-primary font-semibold text-white' : 'text-texto'
                    }`}
                  >
                    {dia}
                  </span>
                )}
              </span>
            ))}
          </div>

          <hr className="my-4 border-fundo-2" />
          <p className="flex items-center gap-2 text-[12px] text-marrom">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Consulta agendada
          </p>
        </Cartao>
      </div>
    </PainelLayout>
  )
}

export default PacienteConsultas
