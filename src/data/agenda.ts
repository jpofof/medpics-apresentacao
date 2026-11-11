// Disponibilidades, agendamentos (consultas) e avisos ao paciente.
import type { Agendamento, Aviso, Disponibilidade } from '../types'
import { agoraTexto } from './datas'
import { gravarTexto, lerTexto } from './armazenamento'

// ---------- Leitura e gravação ----------

export function lerDisponibilidades(): Disponibilidade[] {
  const texto = lerTexto('disponibilidades')
  return texto === '' ? [] : JSON.parse(texto)
}

export function gravarDisponibilidades(lista: Disponibilidade[]) {
  gravarTexto('disponibilidades', JSON.stringify(lista))
}

export function lerAgendamentos(): Agendamento[] {
  const texto = lerTexto('agendamentos')
  return texto === '' ? [] : JSON.parse(texto)
}

export function gravarAgendamentos(lista: Agendamento[]) {
  gravarTexto('agendamentos', JSON.stringify(lista))
}

export function lerAvisos(): Aviso[] {
  const texto = lerTexto('avisos')
  return texto === '' ? [] : JSON.parse(texto)
}

export function gravarAvisos(lista: Aviso[]) {
  gravarTexto('avisos', JSON.stringify(lista))
}

// ---------- Buscas ----------

// Consultas do paciente, da mais recente para a mais antiga
export function agendamentosDoPaciente(idPaciente: number): Agendamento[] {
  return lerAgendamentos()
    .filter((a) => a.idPaciente === idPaciente)
    .sort((a, b) => (b.data + b.hora).localeCompare(a.data + a.hora))
}

// Consultas do profissional, da mais antiga para a mais recente
export function agendamentosDoProfissional(idProfissional: number): Agendamento[] {
  return lerAgendamentos()
    .filter((a) => a.idProfissional === idProfissional)
    .sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora))
}

export function avisosDoPaciente(idPaciente: number): Aviso[] {
  return lerAvisos().filter((a) => a.idPaciente === idPaciente)
}

// ---------- Alterações ----------

// Cancela uma consulta e registra quem cancelou e quando.
// As regras (24h para o paciente, confirmação, aviso) são checadas nas telas, na Fase 7.
export function cancelarAgendamento(idAgendamento: number, idQuemCancelou: number) {
  const lista = lerAgendamentos()
  const agendamento = lista.find((a) => a.id === idAgendamento)
  if (!agendamento) return
  agendamento.status = 'Cancelada'
  agendamento.canceladoPor = idQuemCancelou
  agendamento.dataCancelamento = agoraTexto()
  gravarAgendamentos(lista)
}
