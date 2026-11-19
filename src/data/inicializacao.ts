// Prepara o localStorage quando o app abre: limpa dados de versões antigas e cria as contas de demonstração.
import type { Agendamento, Anamnese, Cargo, Disponibilidade, Paciente, Profissional, StatusConta, Terapeuta, Usuario } from '../types'
import { gravarAgendamentos, gravarDisponibilidades } from './agenda'
import { gravarAnamneses } from './anamnese'
import { apagarTudo, gravarTexto, lerTexto } from './armazenamento'
import { agoraTexto, diaDaSemana, hojeTexto, somarDias } from './datas'
import { gravarPacientes, gravarProfissionais, gravarTerapeutas, gravarUsuarios, lerUsuarios } from './usuarios'

// Mude este número sempre que o formato dos dados mudar: os dados antigos são apagados.
const VERSAO_DO_ESQUEMA = '3'

const SENHA_DEMONSTRACAO = 'medpics123'

export function inicializarDados() {
  if (lerTexto('versao') !== VERSAO_DO_ESQUEMA) {
    apagarTudo()
    gravarTexto('versao', VERSAO_DO_ESQUEMA)
  }
  if (lerUsuarios().length === 0) {
    criarContasDeDemonstracao()
  }
}

function novoUsuario(id: number, nome: string, cpf: string, email: string, status: StatusConta, ultimoLogin: string): Usuario {
  return {
    id,
    nome,
    cpf,
    email,
    senha: SENHA_DEMONSTRACAO,
    telefone: '(15) 99999-000' + id,
    nascimento: '1985-0' + id + '-15',
    endereco: 'Rua das Flores, ' + id + '00, Votorantim - SP',
    cadastro: agoraTexto(),
    ultimoLogin,
    statusConta: status,
  }
}

function novoProfissional(id: number, cargo: Cargo, registro: string, especialidade: string, duracao: number, admin: boolean): Profissional {
  return { idUsuario: id, cargo, numeroRegistro: registro, especialidade, duracaoConsulta: duracao, ehAdministrador: admin }
}

// Cria um bloco de disponibilidade por dia da semana (1 = segunda ... 5 = sexta)
function blocosDaSemana(lista: Disponibilidade[], idProfissional: number, dias: number[], inicio: string, fim: string) {
  for (const dia of dias) {
    lista.push({
      id: lista.length + 1,
      idProfissional,
      diaSemana: dia,
      horaInicio: inicio,
      horaFim: fim,
      status: 'Ativa',
      inicioBloqueio: '',
      fimBloqueio: '',
    })
  }
}

// Procura o primeiro dia útil (segunda a sexta), andando para frente (passo 1) ou para trás (passo -1)
function diaUtil(data: string, passo: number): string {
  let dia = data
  while (diaDaSemana(dia) === 0 || diaDaSemana(dia) === 6) {
    dia = somarDias(dia, passo)
  }
  return dia
}

function criarContasDeDemonstracao() {
  const usuarios: Usuario[] = []
  const pacientes: Paciente[] = []
  const profissionais: Profissional[] = []
  const terapeutas: Terapeuta[] = []

  // Profissionais ativos (ids 1 a 4)
  usuarios.push(novoUsuario(1, 'Dra. Helena Duarte', '111.111.111-11', 'admin@medpics.com', 'Ativa', ''))
  profissionais.push(novoProfissional(1, 'Médico', 'CRM 10001', 'Endocanabinologia', 30, true))

  usuarios.push(novoUsuario(2, 'Dr. Rafael Moura', '222.222.222-22', 'medico@medpics.com', 'Ativa', ''))
  profissionais.push(novoProfissional(2, 'Médico', 'CRM 10002', 'Neurologia', 30, false))

  usuarios.push(novoUsuario(3, 'Dra. Camila Torres', '333.333.333-33', 'dentista@medpics.com', 'Ativa', ''))
  profissionais.push(novoProfissional(3, 'Dentista', 'CRO 20003', 'Ortodontia', 30, false))

  usuarios.push(novoUsuario(4, 'Júlia Souza', '444.444.444-44', 'terapeuta@medpics.com', 'Ativa', ''))
  profissionais.push(novoProfissional(4, 'Terapeuta', 'CRP 06/30004', 'Psicologia Clínica', 50, false))
  terapeutas.push({
    idUsuario: 4,
    conselho: 'CRP',
    graduacao: 'Psicologia',
    posGraduacao: 'Terapia Cognitivo-Comportamental',
    formacoesComplementares: 'Curso de Mindfulness; Curso de Manejo da Ansiedade',
    areaAtuacao: 'Ansiedade e Depressão',
  })

  // Paciente com anamnese e 3 consultas (id 5)
  usuarios.push(novoUsuario(5, 'Maria Oliveira', '555.555.555-55', 'paciente@medpics.com', 'Ativa', ''))
  pacientes.push({ idUsuario: 5, dataAceiteTermos: agoraTexto(), origem: 'Instagram', exigeNovaAnamnese: false })

  // Contas que não entram (ids 6 a 8)
  usuarios.push(novoUsuario(6, 'Ana Beatriz Lima', '666.666.666-66', 'aguardando@medpics.com', 'Aguardando aprovação', ''))
  profissionais.push(novoProfissional(6, 'Terapeuta', 'CREFITO 40006', 'Fisioterapia Neurológica', 40, false))
  terapeutas.push({
    idUsuario: 6,
    conselho: 'CREFITO',
    graduacao: 'Fisioterapia',
    posGraduacao: '',
    formacoesComplementares: '',
    areaAtuacao: 'Reabilitação neurológica',
  })

  usuarios.push(novoUsuario(7, 'Dr. Carlos Nogueira', '777.777.777-77', 'recusado@medpics.com', 'Recusado', ''))
  profissionais.push(novoProfissional(7, 'Dentista', 'CRO 20007', 'Endodontia', 30, false))

  // Paciente inativo, com último acesso há mais de um ano (serve para testar a nova anamnese na reativação)
  const haDoisAnos = somarDias(hojeTexto(), -730) + 'T10:00'
  usuarios.push(novoUsuario(8, 'Pedro Santos', '888.888.888-88', 'inativo@medpics.com', 'Inativa', haDoisAnos))
  pacientes.push({ idUsuario: 8, dataAceiteTermos: haDoisAnos, origem: 'Indicação', exigeNovaAnamnese: false })

  // Disponibilidades (segunda a sexta)
  const disponibilidades: Disponibilidade[] = []
  const diasUteis = [1, 2, 3, 4, 5]
  blocosDaSemana(disponibilidades, 1, diasUteis, '09:00', '12:00')
  blocosDaSemana(disponibilidades, 2, diasUteis, '09:00', '12:00')
  blocosDaSemana(disponibilidades, 3, diasUteis, '14:00', '18:00')
  blocosDaSemana(disponibilidades, 4, diasUteis, '08:00', '12:00')

  // Anamnese da paciente
  const anamneses: Anamnese[] = [
    {
      id: 1,
      idPaciente: 5,
      dataPreenchimento: agoraTexto(),
      preenchidaPor: 5,
      itens: [
        { item: 'Atividade física', frequencia: '3x por semana', observacao: 'Caminhada' },
        { item: 'Enxaqueca', frequencia: '', observacao: 'Duas crises por mês' },
        { item: 'Ansiedade', frequencia: '', observacao: '' },
      ],
    },
    {
      // Anamnese antiga do paciente inativo (será guardada como histórico quando ele refizer)
      id: 2,
      idPaciente: 8,
      dataPreenchimento: haDoisAnos,
      preenchidaPor: 8,
      itens: [{ item: 'Tabagismo', frequencia: '5 cigarros por dia', observacao: '' }],
    },
  ]

  // Consultas da paciente: uma futura, uma realizada e uma cancelada (sempre em dias úteis)
  const futura = diaUtil(somarDias(hojeTexto(), 4), 1)
  const realizada = diaUtil(somarDias(hojeTexto(), -14), -1)
  const cancelada = diaUtil(somarDias(hojeTexto(), -20), -1)
  const agendamentos: Agendamento[] = [
    { id: 1, idPaciente: 5, idProfissional: 2, data: futura, hora: '10:00', status: 'Agendada', agendadoPor: 5, canceladoPor: 0, dataCancelamento: '' },
    { id: 2, idPaciente: 5, idProfissional: 3, data: realizada, hora: '14:00', status: 'Realizada', agendadoPor: 5, canceladoPor: 0, dataCancelamento: '' },
    {
      id: 3,
      idPaciente: 5,
      idProfissional: 4,
      data: cancelada,
      hora: '08:50',
      status: 'Cancelada',
      agendadoPor: 5,
      canceladoPor: 5,
      dataCancelamento: somarDias(cancelada, -3) + 'T09:00',
    },
  ]

  gravarUsuarios(usuarios)
  gravarPacientes(pacientes)
  gravarProfissionais(profissionais)
  gravarTerapeutas(terapeutas)
  gravarDisponibilidades(disponibilidades)
  gravarAnamneses(anamneses)
  gravarAgendamentos(agendamentos)
}
