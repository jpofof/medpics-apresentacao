import { useState } from 'react'
import { Link } from 'react-router-dom'
import Botao from '../components/Botao'
import CabecalhoPagina from '../components/CabecalhoPagina'
import CampoSelect from '../components/CampoSelect'
import PainelLayout from '../components/PainelLayout'

interface Profissional {
  nome: string
  especialidade: string
}

const profissionais: Profissional[] = [
  { nome: 'Dra. Helena Duarte', especialidade: 'Endocanabinologia' },
  { nome: 'Dr. Rafael Moura', especialidade: 'Neurologia' },
  { nome: 'Dra. Camila Torres', especialidade: 'Ortodontia' },
  { nome: 'Júlia Souza', especialidade: 'Psicologia Clínica' },
]

const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

// Os próximos 14 dias para escolher a data, ex: "sábado, 31/10/2026"
const datas: string[] = []
for (let i = 1; i <= 14; i++) {
  const dia = new Date()
  dia.setDate(dia.getDate() + i)
  datas.push(dia.toLocaleDateString('pt-BR', { weekday: 'long' }) + ', ' + dia.toLocaleDateString('pt-BR'))
}

// Tela de agendar consulta. Nesta versão a consulta não é salva: só aparece a mensagem de sucesso.
function AgendarConsulta() {
  const [profissional, setProfissional] = useState('') // "Nome — Especialidade"
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [mensagem, setMensagem] = useState('')

  // Textos da lista de profissionais: "Dr. Rafael Moura — Neurologia"
  const opcoesDeProfissionais = profissionais.map((p) => p.nome + ' — ' + p.especialidade)

  function agendar() {
    const nome = profissional.split(' — ')[0]
    const dia = data.split(', ')[1]
    setMensagem('Consulta agendada com sucesso: ' + nome + ', ' + dia + ', às ' + horario + '.')
    setHorario('')
  }

  return (
    <PainelLayout nome="Maria">
      <CabecalhoPagina titulo="Agendar consulta" subtitulo="Escolha o profissional, a data e um horário livre" />

      <div className="max-w-3xl rounded-2xl border border-black/10 bg-fundo p-6 sm:p-8">
        {mensagem && (
          <div>
            <div role="status" className="mb-5 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
              {mensagem}
            </div>
            <p className="mb-5 text-sm text-marrom">
              Veja suas consultas em{' '}
              <Link to="/paciente/consultas" className="font-semibold text-primary hover:underline">
                Minhas consultas
              </Link>
              .
            </p>
          </div>
        )}

        <form
          noValidate
          onSubmit={(evento) => {
            evento.preventDefault()
            agendar()
          }}
        >
          <CampoSelect
            id="profissional"
            rotulo="Profissional"
            opcoes={opcoesDeProfissionais}
            valor={profissional}
            aoMudar={(valor) => {
              setProfissional(valor)
              setHorario('')
              setMensagem('')
            }}
          />
          <CampoSelect
            id="data"
            rotulo="Data"
            opcoes={datas}
            valor={data}
            aoMudar={(valor) => {
              setData(valor)
              setHorario('')
              setMensagem('')
            }}
          />

          <p className="mb-2 text-sm font-medium text-marrom">Horário</p>
          {profissional && data ? (
            <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {horarios.map((hora) => (
                <button
                  key={hora}
                  type="button"
                  aria-pressed={horario === hora}
                  onClick={() => setHorario(hora)}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    horario === hora
                      ? 'border-primary bg-primary text-white'
                      : 'border-borda bg-white text-texto hover:border-primary active:bg-fundo-2'
                  }`}
                >
                  {hora}
                </button>
              ))}
            </div>
          ) : (
            <p className="mb-6 rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">
              Escolha o profissional e a data para ver os horários livres.
            </p>
          )}

          <Botao enviar desabilitado={horario === ''}>
            Confirmar agendamento
          </Botao>
        </form>
      </div>
    </PainelLayout>
  )
}

export default AgendarConsulta
