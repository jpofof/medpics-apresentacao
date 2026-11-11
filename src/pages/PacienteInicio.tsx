import { useState } from 'react'
import BotaoLink from '../components/BotaoLink'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import PainelLayout from '../components/PainelLayout'
import { agendamentosDoPaciente } from '../data/agenda'
import { formatarData } from '../data/datas'
import { especialidadeDoProfissional, nomeDoUsuario, usuarioLogado } from '../data/usuarios'
import folhaIcone from '../assets/icones/icon-folha.svg'
import agendamentosIcone from '../assets/icones/icon-agendamentos.svg'
import consultasIcone from '../assets/icones/icon-consultas.svg'
import atividadesIcone from '../assets/icones/icon-atividades.svg'

interface Consulta {
  profissional: string
  especialidade: string
  data: string // dd/mm/aaaa
  hora: string
  status: string // "Agendada", "Realizada", "Cancelada" ou "Faltou"
}

const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']
const mesesCurtos = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

// Cores da barrinha lateral de cada atividade
const coresDasAtividades = ['bg-marrom-claro', 'bg-marrom', 'bg-primary', 'bg-marrom-claro', 'bg-marrom']

// Painel do paciente: próxima consulta, agenda da semana, números e próximas atividades
function PacienteInicio() {
  // Quantos dias a agenda andou para frente (ou para trás) a partir de hoje
  const [deslocamento, setDeslocamento] = useState(0)

  const usuario = usuarioLogado()
  const primeiroNome = usuario === null ? '' : usuario.nome.split(' ')[0]

  // Consultas reais do paciente (da mais recente para a mais antiga)
  const consultas: Consulta[] = []
  if (usuario !== null) {
    for (const agendamento of agendamentosDoPaciente(usuario.id)) {
      consultas.push({
        profissional: nomeDoUsuario(agendamento.idProfissional),
        especialidade: especialidadeDoProfissional(agendamento.idProfissional),
        data: formatarData(agendamento.data),
        hora: agendamento.hora,
        status: agendamento.status,
      })
    }
  }

  const hoje = new Date()
  const proximas = consultas.filter((c) => c.status === 'Agendada').reverse() // a mais próxima primeiro
  const proxima = proximas[0]

  const numeros = [
    { numero: proximas.length, texto: 'Consultas agendadas' },
    { numero: consultas.filter((c) => c.status === 'Realizada').length, texto: 'Consultas realizadas' },
    { numero: consultas.filter((c) => c.status === 'Cancelada').length, texto: 'Consultas canceladas' },
  ]

  // Os 7 dias mostrados na agenda
  const dias: Date[] = []
  for (let i = 0; i < 7; i++) {
    const dia = new Date()
    dia.setDate(hoje.getDate() + deslocamento + i)
    dias.push(dia)
  }
  const mesDaAgenda = meses[dias[3].getMonth()] + ' ' + dias[3].getFullYear()

  const classeDoBotaoSeta =
    'h-8 w-8 rounded-full border border-black/10 text-lg text-marrom transition-colors duration-200 hover:bg-fundo-2 focus-visible:outline-2 focus-visible:outline-primary active:bg-fundo-2'

  return (
    <PainelLayout>
      <CabecalhoPagina
        titulo={'Olá, ' + primeiroNome + '!'}
        icone={folhaIcone}
        subtitulo={hoje.toLocaleDateString('pt-BR', { weekday: 'long' }) + ', ' + hoje.toLocaleDateString('pt-BR')}
        acao={<BotaoLink para="/paciente/agendar">+ Agendar Consulta</BotaoLink>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col justify-center gap-3 rounded-2xl bg-primary p-6 text-white lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-verde-suave">Próxima consulta</p>
          {proxima ? (
            <>
              <h3 className="font-titulo text-[24px] font-semibold leading-tight">{proxima.profissional}</h3>
              <p className="text-[13px] opacity-90">{proxima.especialidade}</p>
              <p className="text-[14px]">
                {proxima.data} · {proxima.hora}
              </p>
            </>
          ) : (
            <p className="text-[15px] opacity-90">Você não tem consultas agendadas.</p>
          )}
        </section>

        <Cartao>
          <div className="mb-4 flex items-center gap-3">
            <img src={agendamentosIcone} alt="" className="h-7 w-7" />
            <span className="font-titulo text-[20px] text-texto">{mesDaAgenda}</span>
            <div className="ml-auto flex gap-2">
              <button type="button" aria-label="Voltar 7 dias" onClick={() => setDeslocamento(deslocamento - 7)} className={classeDoBotaoSeta}>
                ‹
              </button>
              <button type="button" aria-label="Avançar 7 dias" onClick={() => setDeslocamento(deslocamento + 7)} className={classeDoBotaoSeta}>
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {dias.map((dia) => {
              const data = dia.toLocaleDateString('pt-BR')
              const temConsulta = proximas.some((c) => c.data === data)
              const ehHoje = data === hoje.toLocaleDateString('pt-BR')
              return (
                <div key={data} className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-marrom-claro">{diasDaSemana[dia.getDay()]}</span>
                  <div
                    className={`flex aspect-square w-full max-w-14 items-center justify-center rounded-full border-[1.5px] text-[18px] font-medium ${
                      temConsulta
                        ? 'border-primary bg-primary text-white'
                        : ehHoje
                          ? 'border-marrom-claro bg-fundo text-texto'
                          : 'border-black/10 bg-fundo text-texto'
                    }`}
                  >
                    {dia.getDate()}
                  </div>
                  <span className="text-[10px] font-medium uppercase text-marrom opacity-75">{mesesCurtos[dia.getMonth()]}</span>
                </div>
              )
            })}
          </div>
        </Cartao>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-6">
        {numeros.map((item) => (
          <Cartao key={item.texto}>
            <img src={consultasIcone} alt="" className="mb-2 h-7 w-7" />
            <p className="font-titulo text-[32px] font-semibold leading-none text-texto sm:text-[40px]">{item.numero}</p>
            <p className="mt-1 text-[12px] leading-tight text-marrom sm:text-[13px]">{item.texto}</p>
          </Cartao>
        ))}
      </div>

      <Cartao titulo="Próximas Atividades" icone={atividadesIcone}>
        {proximas.length === 0 ? (
          <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">
            Nenhuma atividade por enquanto. Agende uma consulta para ela aparecer aqui.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {proximas.map((consulta, indice) => (
              <li
                key={consulta.data + consulta.hora}
                className="relative flex items-center gap-4 overflow-hidden rounded-[18px] border border-black/10 bg-[#f7f5f0] p-5"
              >
                <span className={`absolute left-0 top-[10%] h-4/5 w-1 rounded ${coresDasAtividades[indice % coresDasAtividades.length]}`} />
                <div className="min-w-14 text-center text-[13px] font-semibold text-texto">{consulta.data.slice(0, 5)}</div>
                <div>
                  <strong className="block text-[14px] text-texto">{consulta.especialidade}</strong>
                  <small className="text-[12px] text-marrom">
                    {consulta.profissional} · {consulta.hora}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Cartao>
    </PainelLayout>
  )
}

export default PacienteInicio
