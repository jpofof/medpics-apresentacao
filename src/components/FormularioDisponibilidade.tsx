import { useState } from 'react'
import { salvarDisponibilidade, validarDisponibilidade } from '../data/agenda'
import { nomesDiasSemana } from '../data/datas'
import { semErros } from '../data/usuarios'
import type { Disponibilidade } from '../types'
import Botao from './Botao'
import Campo from './Campo'
import CampoSelect from './CampoSelect'
import Mensagem from './Mensagem'

interface FormularioDisponibilidadeProps {
  idProfissional: number
  disponibilidade: Disponibilidade | null // null = nova
  aoConcluir: (mensagem: string) => void
  aoCancelar: () => void
}

const statusEscolhiveis = ['Ativa', 'Inativa']

// Status inicial do campo (texto simples)
function textoDoStatus(disponibilidade: Disponibilidade | null): string {
  return disponibilidade === null ? 'Ativa' : disponibilidade.status
}

// Formulário de disponibilidade (Quadro 11): dia da semana, início, término e status (Ativa ou Inativa).
// Férias e Licença não são escolhidas aqui: só pelo registro de período.
function FormularioDisponibilidade({ idProfissional, disponibilidade, aoConcluir, aoCancelar }: FormularioDisponibilidadeProps) {
  const [dia, setDia] = useState(disponibilidade === null ? '' : nomesDiasSemana[disponibilidade.diaSemana])
  const [inicio, setInicio] = useState(disponibilidade === null ? '' : disponibilidade.horaInicio)
  const [fim, setFim] = useState(disponibilidade === null ? '' : disponibilidade.horaFim)
  const [status, setStatus] = useState(textoDoStatus(disponibilidade))
  const [erros, setErros] = useState(semErros())

  // Bloco em Férias ou Licença: o status só muda pelo registro de período
  const emPeriodo = disponibilidade !== null && (disponibilidade.status === 'Férias' || disponibilidade.status === 'Licença')

  function salvar() {
    const diaSemana = nomesDiasSemana.indexOf(dia)
    const novosErros = validarDisponibilidade(idProfissional, disponibilidade === null ? 0 : disponibilidade.id, diaSemana, inicio, fim)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    const foraDaDisponibilidade = salvarDisponibilidade(idProfissional, disponibilidade === null ? 0 : disponibilidade.id, diaSemana, inicio, fim, status)
    let mensagem = disponibilidade === null ? 'Disponibilidade cadastrada com sucesso' : 'Alteração efetuada com sucesso'
    if (foraDaDisponibilidade > 0) {
      mensagem +=
        '. Atenção: ' + foraDaDisponibilidade +
        (foraDaDisponibilidade === 1
          ? ' consulta já agendada ficou fora da sua disponibilidade. Ela foi mantida;'
          : ' consultas já agendadas ficaram fora da sua disponibilidade. Elas foram mantidas;') +
        ' avise os pacientes se precisar remarcar.'
    }
    aoConcluir(mensagem)
  }

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault()
        salvar()
      }}
    >
      {erros.geral && (
        <div className="mb-5">
          <Mensagem tipo="erro">{erros.geral}</Mensagem>
        </div>
      )}

      <CampoSelect id="dia" rotulo="Dia da semana" opcoes={nomesDiasSemana} valor={dia} aoMudar={setDia} erro={erros.dia} />
      <div className="grid gap-x-5 sm:grid-cols-2">
        <Campo id="horaInicio" rotulo="Horário de início" tipo="time" valor={inicio} aoMudar={setInicio} erro={erros.horaInicio} />
        <Campo id="horaFim" rotulo="Horário de término" tipo="time" valor={fim} aoMudar={setFim} erro={erros.horaFim} />
      </div>

      {emPeriodo ? (
        <p className="mb-5 rounded-xl bg-bege px-4 py-3 text-sm text-marrom">
          Status atual: {disponibilidade.status}. Para mudar, prorrogue ou encerre o período de férias/licença.
        </p>
      ) : (
        <CampoSelect id="status" rotulo="Status" opcoes={statusEscolhiveis} valor={status} aoMudar={setStatus} />
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Botao variante="secundario" aoClicar={aoCancelar}>
          Cancelar
        </Botao>
        <div className="sm:flex-1">
          <Botao enviar larguraTotal>
            Salvar
          </Botao>
        </div>
      </div>
    </form>
  )
}

export default FormularioDisponibilidade
