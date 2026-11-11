import { useState } from 'react'
import { agendarConsulta, horariosLivres, profissionaisComHorarioLivre } from '../data/agenda'
import { diaDaSemana, formatarData, nomesDiasSemana } from '../data/datas'
import { usuarioLogado } from '../data/usuarios'
import Botao from './Botao'
import CampoSelect from './CampoSelect'
import Mensagem from './Mensagem'

interface FormularioAgendarProps {
  idPaciente: number
  aoAgendar?: () => void
}

// Agendamento (Quadro 8): escolher o profissional, a data e um horário livre (calculados em data/agenda.ts) e confirmar.
// Serve para o paciente (para si) e para o administrador (em nome do paciente escolhido antes).
function FormularioAgendar({ idPaciente, aoAgendar }: FormularioAgendarProps) {
  const [idProfissional, setIdProfissional] = useState(0)
  const [rotuloDaData, setRotuloDaData] = useState('') // ex: "Segunda-feira, 16/11/2026"
  const [hora, setHora] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [erro, setErro] = useState('')

  const usuario = usuarioLogado()
  if (usuario === null) return null

  const profissionais = profissionaisComHorarioLivre()

  // Horários do profissional escolhido, e as datas que têm pelo menos um horário
  const livres = idProfissional === 0 ? [] : horariosLivres(idProfissional)
  const datas: string[] = []
  for (const livre of livres) {
    if (!datas.includes(livre.data)) datas.push(livre.data)
  }
  const rotulos = datas.map((data) => nomesDiasSemana[diaDaSemana(data)] + ', ' + formatarData(data))
  const dataEscolhida = datas[rotulos.indexOf(rotuloDaData)] ?? ''
  const horas = livres.filter((l) => l.data === dataEscolhida).map((l) => l.hora)

  function escolherProfissional(id: number) {
    setIdProfissional(id)
    setRotuloDaData('')
    setHora('')
    setSucesso('')
    setErro('')
  }

  function confirmar() {
    if (usuario === null) return
    const resultado = agendarConsulta(idPaciente, idProfissional, dataEscolhida, hora, usuario.id)
    setHora('')
    if (resultado !== '') {
      setErro(resultado) // a lista de horários é recalculada e o horário ocupado some
      setSucesso('')
      return
    }
    setErro('')
    setSucesso('Consulta agendada com sucesso')
    setRotuloDaData('')
    if (aoAgendar) aoAgendar()
  }

  if (profissionais.length === 0 && sucesso === '') {
    return (
      <div className="rounded-xl bg-fundo-2 px-4 py-4 text-sm text-marrom">
        <p className="mb-1 font-medium text-texto">Nenhum profissional com horários livres no momento.</p>
        <p>Os horários aparecem até 30 dias à frente. Tente novamente mais tarde ou fale com a clínica.</p>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault()
        confirmar()
      }}
    >
      {sucesso && (
        <div className="mb-5">
          <Mensagem>{sucesso}</Mensagem>
        </div>
      )}
      {erro && (
        <div className="mb-5">
          <Mensagem tipo="erro">{erro}</Mensagem>
        </div>
      )}

      <p id="rotulo-profissional" className="mb-2 text-sm font-medium text-marrom">
        Profissional
      </p>
      <div role="radiogroup" aria-labelledby="rotulo-profissional" className="mb-5 grid gap-3 sm:grid-cols-2">
        {profissionais.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={idProfissional === p.id}
            onClick={() => escolherProfissional(p.id)}
            className={`min-h-11 rounded-2xl border-[1.5px] p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              idProfissional === p.id ? 'border-primary bg-primary/10' : 'border-borda bg-white hover:border-primary active:bg-fundo-2'
            }`}
          >
            <strong className="block break-words text-[15px] text-texto">{p.nome}</strong>
            <span className="text-[13px] text-marrom">
              {p.cargo} · {p.especialidade}
            </span>
          </button>
        ))}
      </div>

      {idProfissional !== 0 && (
        <CampoSelect
          id="data"
          rotulo="Data"
          opcoes={rotulos}
          valor={rotuloDaData}
          aoMudar={(valor) => {
            setRotuloDaData(valor)
            setHora('')
            setSucesso('')
            setErro('')
          }}
        />
      )}

      <p className="mb-2 text-sm font-medium text-marrom">Horário</p>
      {dataEscolhida !== '' ? (
        <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {horas.map((h) => (
            <button
              key={h}
              type="button"
              aria-pressed={hora === h}
              onClick={() => setHora(h)}
              className={`min-h-11 rounded-xl border px-3 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                hora === h ? 'border-primary bg-primary text-white' : 'border-borda bg-white text-texto hover:border-primary active:bg-fundo-2'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      ) : (
        <p className="mb-6 rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">Escolha o profissional e a data para ver os horários livres.</p>
      )}

      <Botao enviar desabilitado={hora === ''}>
        Confirmar agendamento
      </Botao>
    </form>
  )
}

export default FormularioAgendar
