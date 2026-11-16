// Operações do administrador: aprovar/recusar cadastros, editar usuários e ativar/inativar contas.
import type { StatusConta, Usuario } from '../types'
import { cancelarAgendamento, consultasFuturasDoProfissional } from './agenda'
import { diasDesde } from './datas'
import {
  buscarPaciente,
  buscarProfissional,
  buscarTerapeuta,
  buscarUsuario,
  contarAdministradoresAtivos,
  ehAdministrador,
  gravarPacientes,
  gravarProfissionais,
  gravarTerapeutas,
  gravarUsuarios,
  lerPacientes,
  lerProfissionais,
  lerTerapeutas,
  lerUsuarios,
  profissionalVazio,
} from './usuarios'
import type { DadosDaConta, DadosProfissional } from './usuarios'

// ---------- Cadastros pendentes (Quadro 6) ----------

// Médicos, Dentistas e Terapeutas com cadastro "Aguardando aprovação"
export function cadastrosPendentes(): Usuario[] {
  return lerUsuarios().filter((u) => u.statusConta === 'Aguardando aprovação' && buscarProfissional(u.id) !== null)
}

export function aprovarCadastro(idUsuario: number) {
  mudarStatus(idUsuario, 'Ativa')
}

export function recusarCadastro(idUsuario: number) {
  mudarStatus(idUsuario, 'Recusado')
}

function mudarStatus(idUsuario: number, status: StatusConta) {
  const usuarios = lerUsuarios()
  const usuario = usuarios.find((u) => u.id === idUsuario)
  if (!usuario) return
  usuario.statusConta = status
  gravarUsuarios(usuarios)
}

// ---------- Ativar e inativar contas (Quadro 7) ----------

// Quantas consultas futuras serão canceladas se este usuário for inativado (só profissional tem)
export function consultasQueSeraoCanceladas(idUsuario: number): number {
  return buscarProfissional(idUsuario) === null ? 0 : consultasFuturasDoProfissional(idUsuario).length
}

// Se reativar este paciente exigirá nova anamnese (conta inativa há mais de 365 dias sem login)
export function reativacaoExigeNovaAnamnese(idUsuario: number): boolean {
  const usuario = buscarUsuario(idUsuario)
  if (usuario === null || buscarPaciente(idUsuario) === null || usuario.statusConta !== 'Inativa') return false
  const referencia = usuario.ultimoLogin !== '' ? usuario.ultimoLogin : usuario.cadastro
  return diasDesde(referencia) > 365
}

// Ativa ou inativa uma conta. Devolve '' se deu certo, ou a mensagem de erro.
// Estas regras funcionam sempre, mesmo com VALIDACOES_ATIVAS = false (protegem os dados e o acesso do administrador).
export function alterarStatusConta(idUsuario: number, idAdministrador: number, novoStatus: StatusConta): string {
  const usuarios = lerUsuarios()
  const usuario = usuarios.find((u) => u.id === idUsuario)
  if (!usuario) return 'Usuário não encontrado'

  if (novoStatus === 'Inativa') {
    if (idUsuario === idAdministrador) return 'Você não pode inativar a própria conta'
    if (ehAdministrador(idUsuario) && usuario.statusConta === 'Ativa' && contarAdministradoresAtivos() <= 1) {
      return 'Não é possível inativar o último administrador ativo'
    }
  }

  // Reativação de paciente após inatividade longa: nova anamnese no próximo acesso
  if (novoStatus === 'Ativa' && reativacaoExigeNovaAnamnese(idUsuario)) {
    const pacientes = lerPacientes()
    const paciente = pacientes.find((p) => p.idUsuario === idUsuario)
    if (paciente) {
      paciente.exigeNovaAnamnese = true
      gravarPacientes(pacientes)
    }
  }

  usuario.statusConta = novoStatus
  gravarUsuarios(usuarios)

  // Inativar profissional: cancela as consultas futuras dele e avisa cada paciente
  if (novoStatus === 'Inativa' && buscarProfissional(idUsuario) !== null) {
    for (const consulta of consultasFuturasDoProfissional(idUsuario)) {
      cancelarAgendamento(consulta.id, idAdministrador, 'porque o profissional deixou de atender na clínica')
    }
  }
  return ''
}

// ---------- Edição de usuário ----------

// Dados da conta para preencher o formulário de edição (senha em branco = manter a atual)
export function contaDoUsuario(usuario: Usuario): DadosDaConta {
  return {
    nome: usuario.nome,
    cpf: usuario.cpf,
    nascimento: usuario.nascimento,
    telefone: usuario.telefone,
    endereco: usuario.endereco,
    email: usuario.email,
    senha: '',
    confirmarSenha: '',
  }
}

// Dados profissionais (e de terapeuta) para preencher o formulário de edição
export function extrasDoProfissional(idUsuario: number): DadosProfissional {
  const extras = profissionalVazio()
  const profissional = buscarProfissional(idUsuario)
  if (profissional === null) return extras
  extras.registro = profissional.numeroRegistro
  extras.especialidade = profissional.especialidade
  extras.duracao = String(profissional.duracaoConsulta)

  const terapeuta = buscarTerapeuta(idUsuario)
  if (terapeuta !== null) {
    extras.conselho = terapeuta.conselho
    extras.graduacao = terapeuta.graduacao
    extras.areaAtuacao = terapeuta.areaAtuacao
    extras.posGraduacao = terapeuta.posGraduacao
    extras.formacoes = terapeuta.formacoesComplementares
  }
  return extras
}

// Grava a edição feita pelo administrador. O cargo não muda. Devolve '' se deu certo, ou a mensagem de erro.
// A duração da consulta só vale para novos agendamentos: as consultas já marcadas mantêm o horário.
export function salvarEdicao(idUsuario: number, conta: DadosDaConta, origem: string, extras: DadosProfissional, ehAdmin: boolean): string {
  const usuarios = lerUsuarios()
  const usuario = usuarios.find((u) => u.id === idUsuario)
  if (!usuario) return 'Usuário não encontrado'

  const profissionais = lerProfissionais()
  const profissional = profissionais.find((p) => p.idUsuario === idUsuario)

  // Não deixa tirar a permissão do último administrador ativo
  if (profissional && profissional.ehAdministrador && !ehAdmin && usuario.statusConta === 'Ativa' && contarAdministradoresAtivos() <= 1) {
    return 'Não é possível remover a permissão do último administrador ativo'
  }

  usuario.nome = conta.nome.trim()
  usuario.cpf = conta.cpf.trim()
  usuario.nascimento = conta.nascimento
  usuario.telefone = conta.telefone.trim()
  usuario.endereco = conta.endereco.trim()
  usuario.email = conta.email.trim()
  if (conta.senha !== '') usuario.senha = conta.senha
  gravarUsuarios(usuarios)

  const pacientes = lerPacientes()
  const paciente = pacientes.find((p) => p.idUsuario === idUsuario)
  if (paciente) {
    paciente.origem = origem
    gravarPacientes(pacientes)
  }

  if (profissional) {
    profissional.numeroRegistro = extras.registro.trim()
    profissional.especialidade = extras.especialidade.trim()
    profissional.duracaoConsulta = Number(extras.duracao)
    profissional.ehAdministrador = ehAdmin
    gravarProfissionais(profissionais)

    const terapeutas = lerTerapeutas()
    const terapeuta = terapeutas.find((t) => t.idUsuario === idUsuario)
    if (terapeuta) {
      terapeuta.conselho = extras.conselho.trim()
      terapeuta.graduacao = extras.graduacao.trim()
      terapeuta.areaAtuacao = extras.areaAtuacao.trim()
      terapeuta.posGraduacao = extras.posGraduacao.trim()
      terapeuta.formacoesComplementares = extras.formacoes.trim()
      gravarTerapeutas(terapeutas)
    }
  }
  return ''
}
