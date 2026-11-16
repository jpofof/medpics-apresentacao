// Disponibilidades, agendamentos (consultas) e avisos ao paciente.
import { VALIDACOES_ATIVAS } from '../config'
import type { Agendamento, Aviso, Disponibilidade } from '../types'
import { gravarTexto, lerTexto, proximoId } from './armazenamento'
import { agoraTexto, diaDaSemana, formatarData, hojeTexto, horaParaMinutos, horasAte, minutosParaHora, somarDias } from './datas'
import { apenasNumeros, buscarProfissional, buscarUsuario, nomeDoUsuario, profissionaisAtivos } from './usuarios'
import type { Erros } from './usuarios'

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

// ---------- Agendar e cancelar (Quadros 8 e 9) ----------

// Cria a consulta com status Agendada. Devolve '' se deu certo, ou "Horário indisponível, escolha outro"
// se o profissional já tem consulta nesse horário (regra checada só com VALIDACOES_ATIVAS = true).
export function agendarConsulta(idPaciente: number, idProfissional: number, data: string, hora: string, idQuemAgenda: number): string {
  const lista = lerAgendamentos()
  const ocupado = lista.some((a) => a.idProfissional === idProfissional && a.data === data && a.hora === hora && a.status === 'Agendada')
  if (VALIDACOES_ATIVAS && ocupado) return 'Horário indisponível, escolha outro'

  lista.push({
    id: proximoId(lista.map((a) => a.id)),
    idPaciente,
    idProfissional,
    data,
    hora,
    status: 'Agendada',
    agendadoPor: idQuemAgenda,
    canceladoPor: 0,
    dataCancelamento: '',
  })
  gravarAgendamentos(lista)
  return ''
}

// Paciente só cancela até 24 horas antes; o administrador cancela a qualquer momento.
// Devolve '' se pode cancelar, ou a mensagem de erro. Só vale com VALIDACOES_ATIVAS = true.
export function verificarCancelamento(agendamento: Agendamento, idQuemCancela: number): string {
  if (!VALIDACOES_ATIVAS) return ''
  const ehOPaciente = idQuemCancela === agendamento.idPaciente
  if (ehOPaciente && horasAte(agendamento.data, agendamento.hora) < 24) {
    return 'Cancelamento permitido somente até 24 horas antes da consulta'
  }
  return ''
}

// ---------- Disponibilidade (Quadro 11: cadastrar e alterar) ----------

// Blocos de disponibilidade do profissional, por dia da semana e horário
export function disponibilidadesDoProfissional(idProfissional: number): Disponibilidade[] {
  return lerDisponibilidades()
    .filter((d) => d.idProfissional === idProfissional)
    .sort((x, y) => x.diaSemana - y.diaSemana || x.horaInicio.localeCompare(y.horaInicio))
}

// Valida um bloco: campos preenchidos, término maior que início e sem sobreposição com outro bloco do mesmo dia.
// "idIgnorar" é o bloco que está sendo editado (0 se for novo). Com VALIDACOES_ATIVAS = false não bloqueia nada.
export function validarDisponibilidade(idProfissional: number, idIgnorar: number, diaSemana: number, horaInicio: string, horaFim: string): Erros {
  const erros: Erros = {}
  if (!VALIDACOES_ATIVAS) return erros

  if (diaSemana < 0) erros.dia = 'Campo obrigatório'
  if (horaInicio === '') erros.horaInicio = 'Campo obrigatório'
  if (horaFim === '') erros.horaFim = 'Campo obrigatório'
  if (horaInicio === '' || horaFim === '' || diaSemana < 0) return erros

  if (horaFim <= horaInicio) {
    erros.horaFim = 'O horário de término deve ser maior que o de início'
    return erros
  }
  const sobrepoe = disponibilidadesDoProfissional(idProfissional).some(
    (d) => d.id !== idIgnorar && d.diaSemana === diaSemana && horaInicio < d.horaFim && horaFim > d.horaInicio,
  )
  if (sobrepoe) erros.geral = 'Este horário se sobrepõe a outra disponibilidade sua no mesmo dia'
  return erros
}

// Quantas consultas futuras estavam dentro do bloco antigo e agora ficaram fora de qualquer bloco Ativo.
// Elas são mantidas (não são canceladas); a tela só avisa o profissional.
function consultasForaDaDisponibilidade(idProfissional: number, antigo: Disponibilidade): number {
  const blocosAtivos = disponibilidadesDoProfissional(idProfissional).filter((d) => d.status === 'Ativa')
  return consultasFuturasDoProfissional(idProfissional).filter((c) => {
    const dentroDoAntigo = diaDaSemana(c.data) === antigo.diaSemana && c.hora >= antigo.horaInicio && c.hora < antigo.horaFim
    const coberta = blocosAtivos.some((d) => d.diaSemana === diaDaSemana(c.data) && c.hora >= d.horaInicio && c.hora < d.horaFim)
    return dentroDoAntigo && !coberta
  }).length
}

// Cadastra (idExistente = 0) ou altera um bloco. "status" é Ativa ou Inativa; Férias e Licença só mudam pelo registro de período.
// Devolve quantas consultas ficaram fora da nova disponibilidade (só na alteração).
export function salvarDisponibilidade(
  idProfissional: number,
  idExistente: number,
  diaSemana: number,
  horaInicio: string,
  horaFim: string,
  status: string,
): number {
  const lista = lerDisponibilidades()
  const novoStatus = status === 'Inativa' ? 'Inativa' : 'Ativa'

  if (idExistente === 0) {
    // Bloco novo (Ativo) criado enquanto há férias/licença em vigor herda o mesmo status e período
    const periodo = novoStatus === 'Ativa' ? periodoEmVigor(idProfissional) : null
    lista.push({
      id: proximoId(lista.map((d) => d.id)),
      idProfissional,
      diaSemana,
      horaInicio,
      horaFim,
      status: periodo === null ? novoStatus : periodo.tipo,
      inicioBloqueio: periodo === null ? '' : periodo.inicio,
      fimBloqueio: periodo === null ? '' : periodo.fim,
    })
    gravarDisponibilidades(lista)
    return 0
  }

  const bloco = lista.find((d) => d.id === idExistente)
  if (!bloco) return 0
  const antigo = { ...bloco }
  bloco.diaSemana = diaSemana
  bloco.horaInicio = horaInicio
  bloco.horaFim = horaFim
  if (bloco.status === 'Ativa' || bloco.status === 'Inativa') bloco.status = novoStatus
  gravarDisponibilidades(lista)
  return consultasForaDaDisponibilidade(idProfissional, antigo)
}

// ---------- Horários livres (função única usada pelo agendamento) ----------

export interface HorarioLivre {
  data: string // AAAA-MM-DD
  hora: string // HH:mm
}

const DIAS_A_FRENTE = 30

// Horários livres do profissional nos próximos 30 dias. Divide cada bloco (não Inativo) pela duração da consulta,
// descarta a sobra que não completa uma consulta, tira horários já agendados e já passados e os dias de Férias/Licença.
export function horariosLivres(idProfissional: number): HorarioLivre[] {
  const profissional = buscarProfissional(idProfissional)
  if (profissional === null || !(profissional.duracaoConsulta > 0)) return []

  const duracao = profissional.duracaoConsulta
  const blocos = disponibilidadesDoProfissional(idProfissional).filter((d) => d.status !== 'Inativa')
  const ocupados = agendamentosDoProfissional(idProfissional)
    .filter((a) => a.status === 'Agendada')
    .map((a) => a.data + 'T' + a.hora)
  const agora = agoraTexto()
  const hoje = hojeTexto()
  const lista: HorarioLivre[] = []

  for (let i = 0; i <= DIAS_A_FRENTE; i++) {
    const data = somarDias(hoje, i)
    const diaDaData = diaDaSemana(data)
    for (const bloco of blocos) {
      if (bloco.diaSemana !== diaDaData) continue
      // Dentro do período de Férias ou Licença nenhum horário aparece
      const emPeriodo = (bloco.status === 'Férias' || bloco.status === 'Licença') && data >= bloco.inicioBloqueio && data <= bloco.fimBloqueio
      if (emPeriodo) continue

      let inicio = horaParaMinutos(bloco.horaInicio)
      const fim = horaParaMinutos(bloco.horaFim)
      while (inicio + duracao <= fim) {
        const hora = minutosParaHora(inicio)
        const momento = data + 'T' + hora
        if (momento > agora && !ocupados.includes(momento)) lista.push({ data, hora })
        inicio += duracao
      }
    }
  }
  return lista.sort((x, y) => (x.data + x.hora).localeCompare(y.data + y.hora))
}

// Profissionais com conta Ativa que têm pelo menos um horário livre nos próximos 30 dias
export function profissionaisComHorarioLivre() {
  return profissionaisAtivos().filter((p) => horariosLivres(p.id).length > 0)
}

// ---------- Férias e licença (Quadro 11: registrar, prorrogar e encerrar) ----------

export interface PeriodoBloqueio {
  tipo: 'Férias' | 'Licença'
  inicio: string // AAAA-MM-DD
  fim: string
}

// Período de férias ou licença registrado (ainda não terminou), ou null. Todos os blocos do período têm os mesmos dados.
export function periodoEmVigor(idProfissional: number): PeriodoBloqueio | null {
  const bloco = disponibilidadesDoProfissional(idProfissional).find(
    (d) => (d.status === 'Férias' || d.status === 'Licença') && d.fimBloqueio >= hojeTexto(),
  )
  if (!bloco || (bloco.status !== 'Férias' && bloco.status !== 'Licença')) return null
  return { tipo: bloco.status, inicio: bloco.inicioBloqueio, fim: bloco.fimBloqueio }
}

// O registro de período exige pelo menos uma disponibilidade Ativa
export function temDisponibilidadeAtiva(idProfissional: number): boolean {
  return disponibilidadesDoProfissional(idProfissional).some((d) => d.status === 'Ativa')
}

// Consultas Agendadas, que ainda não aconteceram, entre duas datas (inclusive)
export function consultasNoPeriodo(idProfissional: number, inicio: string, fim: string): Agendamento[] {
  return consultasFuturasDoProfissional(idProfissional).filter((c) => c.data >= inicio && c.data <= fim)
}

// Cancela as consultas do trecho, em nome de quem registrou, e avisa cada paciente
function cancelarConsultasDoPeriodo(idProfissional: number, tipo: string, inicio: string, fim: string, idResponsavel: number) {
  const motivo = 'porque o profissional estará de ' + tipo.toLowerCase() + ' no período'
  for (const consulta of consultasNoPeriodo(idProfissional, inicio, fim)) {
    cancelarAgendamento(consulta.id, idResponsavel, motivo)
  }
}

// Valida as datas do período (término não pode ser anterior ao início) e a exigência de disponibilidade Ativa.
// A exigência de disponibilidade vale sempre; a das datas só com VALIDACOES_ATIVAS = true.
export function validarPeriodo(idProfissional: number, inicio: string, fim: string): string {
  if (!temDisponibilidadeAtiva(idProfissional)) return 'Cadastre uma disponibilidade antes de registrar férias ou licença'
  if (VALIDACOES_ATIVAS && (inicio === '' || fim === '')) return 'Informe a data de início e a data de término'
  if (VALIDACOES_ATIVAS && fim < inicio) return 'A data de término não pode ser anterior à data de início'
  return ''
}

// Valida a nova data de término na prorrogação (não pode ser anterior ao início). Só vale com VALIDACOES_ATIVAS = true.
export function validarNovoFim(inicio: string, novoFim: string): string {
  if (VALIDACOES_ATIVAS && novoFim < inicio) return 'A data de término não pode ser anterior à data de início'
  return ''
}

// Aplica Férias ou Licença a TODAS as disponibilidades Ativas e cancela as consultas do período.
// "idResponsavel" é quem registrou (o profissional ou o administrador em nome dele).
export function registrarPeriodo(idProfissional: number, tipo: 'Férias' | 'Licença', inicio: string, fim: string, idResponsavel: number) {
  const lista = lerDisponibilidades()
  for (const bloco of lista) {
    if (bloco.idProfissional === idProfissional && bloco.status === 'Ativa') {
      bloco.status = tipo
      bloco.inicioBloqueio = inicio
      bloco.fimBloqueio = fim
    }
  }
  gravarDisponibilidades(lista)
  cancelarConsultasDoPeriodo(idProfissional, tipo, inicio, fim, idResponsavel)
}

// Consultas que serão canceladas se o período for prorrogado até "novoFim" (só o trecho novo)
export function consultasDoTrechoNovo(idProfissional: number, novoFim: string): Agendamento[] {
  const periodo = periodoEmVigor(idProfissional)
  if (periodo === null || novoFim <= periodo.fim) return []
  return consultasNoPeriodo(idProfissional, somarDias(periodo.fim, 1), novoFim)
}

// Muda a data de término. Se for adiada, cancela as consultas do trecho novo e avisa os pacientes.
export function prorrogarPeriodo(idProfissional: number, novoFim: string, idResponsavel: number) {
  const periodo = periodoEmVigor(idProfissional)
  if (periodo === null) return
  cancelarConsultasDoPeriodo(idProfissional, periodo.tipo, somarDias(periodo.fim, 1), novoFim, idResponsavel)

  const lista = lerDisponibilidades()
  for (const bloco of lista) {
    if (bloco.idProfissional === idProfissional && (bloco.status === 'Férias' || bloco.status === 'Licença')) {
      bloco.fimBloqueio = novoFim
    }
  }
  gravarDisponibilidades(lista)
}

// Encerra o período antes do fim: os blocos voltam a Ativa e os horários são liberados
export function encerrarPeriodo(idProfissional: number) {
  const lista = lerDisponibilidades()
  for (const bloco of lista) {
    if (bloco.idProfissional === idProfissional && (bloco.status === 'Férias' || bloco.status === 'Licença')) {
      bloco.status = 'Ativa'
      bloco.inicioBloqueio = ''
      bloco.fimBloqueio = ''
    }
  }
  gravarDisponibilidades(lista)
}

// Passou a data de término: o status volta a Ativa. É chamada pelo useEffect único do App.tsx.
export function voltarAtivasAposTermino() {
  const lista = lerDisponibilidades()
  let mudou = false
  for (const bloco of lista) {
    if ((bloco.status === 'Férias' || bloco.status === 'Licença') && bloco.fimBloqueio < hojeTexto()) {
      bloco.status = 'Ativa'
      bloco.inicioBloqueio = ''
      bloco.fimBloqueio = ''
      mudou = true
    }
  }
  if (mudou) gravarDisponibilidades(lista)
}

// ---------- Agenda e atendimento do profissional (Quadros 10, 12 e 13) ----------

// Consultas do profissional entre duas datas (inclusive), da mais antiga para a mais recente
export function consultasDoPeriodo(idProfissional: number, de: string, ate: string): Agendamento[] {
  return agendamentosDoProfissional(idProfissional).filter((a) => a.data >= de && a.data <= ate)
}

// A consulta já passou do horário? (consulta Agendada nesse caso espera o registro do atendimento)
export function horarioJaChegou(agendamento: Agendamento): boolean {
  return agendamento.data + 'T' + agendamento.hora <= agoraTexto()
}

// Registrar atendimento só é permitido a partir do horário da consulta (regra do Quadro 12).
export function podeRegistrarAtendimento(agendamento: Agendamento): boolean {
  if (agendamento.status !== 'Agendada') return false
  return !VALIDACOES_ATIVAS || horarioJaChegou(agendamento)
}

// Marca a consulta como Realizada ou Faltou. Não guarda nenhum dado clínico. Devolve '' se deu certo, ou a mensagem de erro.
export function registrarAtendimento(idAgendamento: number, idProfissional: number, novoStatus: string): string {
  const lista = lerAgendamentos()
  const agendamento = lista.find((a) => a.id === idAgendamento)
  if (!agendamento || agendamento.idProfissional !== idProfissional) return 'Consulta não encontrada'
  if (novoStatus !== 'Realizada' && novoStatus !== 'Faltou') return 'Escolha Realizada ou Paciente faltou'
  if (!podeRegistrarAtendimento(agendamento)) return 'O atendimento só pode ser registrado a partir do horário da consulta'
  agendamento.status = novoStatus
  gravarAgendamentos(lista)
  return ''
}

// Pacientes que já tiveram consulta com o profissional (qualquer status), filtrados por nome ou CPF.
// Texto vazio devolve todos. Quem nunca teve consulta com ele não aparece (privacidade).
export function pacientesDoProfissional(idProfissional: number, texto: string): { id: number; nome: string; cpf: string }[] {
  const nomeBusca = texto.trim().toLowerCase()
  const cpfBusca = apenasNumeros(texto)
  const ids: number[] = []
  for (const consulta of agendamentosDoProfissional(idProfissional)) {
    if (!ids.includes(consulta.idPaciente)) ids.push(consulta.idPaciente)
  }

  const pacientes: { id: number; nome: string; cpf: string }[] = []
  for (const id of ids) {
    const usuario = buscarUsuario(id)
    if (usuario === null) continue
    const achou = nomeBusca === '' || usuario.nome.toLowerCase().includes(nomeBusca) || (cpfBusca !== '' && apenasNumeros(usuario.cpf).includes(cpfBusca))
    if (achou) pacientes.push({ id: usuario.id, nome: usuario.nome, cpf: usuario.cpf })
  }
  return pacientes.sort((x, y) => x.nome.localeCompare(y.nome))
}

// Todas as consultas do profissional com um paciente, da mais recente para a mais antiga
export function historicoComPaciente(idProfissional: number, idPaciente: number): Agendamento[] {
  return agendamentosDoProfissional(idProfissional)
    .filter((a) => a.idPaciente === idPaciente)
    .reverse()
}
