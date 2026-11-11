// Disponibilidades, agendamentos (consultas) e avisos ao paciente.
import type { Agendamento, Aviso, Disponibilidade } from '../types'
import { gravarTexto, lerTexto, proximoId } from './armazenamento'
import { agoraTexto, formatarData } from './datas'
import { buscarProfissional, nomeDoUsuario } from './usuarios'

// Consulta já com os textos prontos para mostrar em listas e cartões
export interface ConsultaResumo {
  id: number
  titulo: string // nome do profissional (visão do paciente) ou do paciente (visão do profissional)
  detalhe: string // ex.: "Médico · Neurologia" (só na visão do paciente)
  data: string // AAAA-MM-DD
  hora: string
  status: string
}

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

// Resumo para o paciente: mostra o profissional, com cargo e especialidade
export function resumoParaPaciente(agendamento: Agendamento): ConsultaResumo {
  const profissional = buscarProfissional(agendamento.idProfissional)
  return {
    id: agendamento.id,
    titulo: nomeDoUsuario(agendamento.idProfissional),
    detalhe: profissional === null ? '' : profissional.cargo + ' · ' + profissional.especialidade,
    data: agendamento.data,
    hora: agendamento.hora,
    status: agendamento.status,
  }
}

// Resumo para o profissional: mostra o paciente
export function resumoParaProfissional(agendamento: Agendamento): ConsultaResumo {
  return {
    id: agendamento.id,
    titulo: nomeDoUsuario(agendamento.idPaciente),
    detalhe: '',
    data: agendamento.data,
    hora: agendamento.hora,
    status: agendamento.status,
  }
}

// Diz se o profissional tem pelo menos uma disponibilidade cadastrada (qualquer status)
export function temDisponibilidade(idProfissional: number): boolean {
  return lerDisponibilidades().some((d) => d.idProfissional === idProfissional)
}

// Consultas Agendadas do profissional que ainda não aconteceram
export function consultasFuturasDoProfissional(idProfissional: number): Agendamento[] {
  const agora = agoraTexto()
  return agendamentosDoProfissional(idProfissional).filter((a) => a.status === 'Agendada' && a.data + 'T' + a.hora >= agora)
}

// ---------- Alterações ----------

// Cria um aviso no painel do paciente (some quando ele dispensa)
export function criarAviso(idPaciente: number, texto: string) {
  const lista = lerAvisos()
  lista.push({ id: proximoId(lista.map((a) => a.id)), idPaciente, texto, criadoEm: agoraTexto() })
  gravarAvisos(lista)
}

export function dispensarAviso(idAviso: number) {
  gravarAvisos(lerAvisos().filter((a) => a.id !== idAviso))
}

// Cancela uma consulta e registra quem cancelou e quando. As regras (24h para o paciente, confirmação)
// são checadas nas telas. Se quem cancelou não foi o próprio paciente, ele recebe um aviso para reagendar.
// "motivo" completa a frase do aviso: "foi cancelada " + motivo.
export function cancelarAgendamento(idAgendamento: number, idQuemCancelou: number, motivo: string) {
  const lista = lerAgendamentos()
  const agendamento = lista.find((a) => a.id === idAgendamento)
  if (!agendamento) return
  agendamento.status = 'Cancelada'
  agendamento.canceladoPor = idQuemCancelou
  agendamento.dataCancelamento = agoraTexto()
  gravarAgendamentos(lista)

  if (idQuemCancelou !== agendamento.idPaciente) {
    criarAviso(
      agendamento.idPaciente,
      'Sua consulta com ' + nomeDoUsuario(agendamento.idProfissional) + ' em ' + formatarData(agendamento.data) + ' às ' + agendamento.hora +
        ' foi cancelada ' + motivo + '. Escolha outro horário em "Agendar consulta".',
    )
  }
}
