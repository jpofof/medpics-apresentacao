// Usuários, pacientes, profissionais, terapeutas, login e sessão.
import type { Paciente, Profissional, Terapeuta, Usuario } from '../types'
import { agoraTexto } from './datas'
import { gravarTexto, lerTexto } from './armazenamento'

// ---------- Leitura e gravação ----------

export function lerUsuarios(): Usuario[] {
  const texto = lerTexto('usuarios')
  return texto === '' ? [] : JSON.parse(texto)
}

export function gravarUsuarios(lista: Usuario[]) {
  gravarTexto('usuarios', JSON.stringify(lista))
}

export function lerPacientes(): Paciente[] {
  const texto = lerTexto('pacientes')
  return texto === '' ? [] : JSON.parse(texto)
}

export function gravarPacientes(lista: Paciente[]) {
  gravarTexto('pacientes', JSON.stringify(lista))
}

export function lerProfissionais(): Profissional[] {
  const texto = lerTexto('profissionais')
  return texto === '' ? [] : JSON.parse(texto)
}

export function gravarProfissionais(lista: Profissional[]) {
  gravarTexto('profissionais', JSON.stringify(lista))
}

export function lerTerapeutas(): Terapeuta[] {
  const texto = lerTexto('terapeutas')
  return texto === '' ? [] : JSON.parse(texto)
}

export function gravarTerapeutas(lista: Terapeuta[]) {
  gravarTexto('terapeutas', JSON.stringify(lista))
}

// ---------- Buscas ----------

interface ProfissionalComNome {
  id: number
  nome: string
  especialidade: string
  cargo: string
}

export function buscarUsuario(id: number): Usuario | null {
  return lerUsuarios().find((u) => u.id === id) ?? null
}

export function buscarPaciente(id: number): Paciente | null {
  return lerPacientes().find((p) => p.idUsuario === id) ?? null
}

export function buscarProfissional(id: number): Profissional | null {
  return lerProfissionais().find((p) => p.idUsuario === id) ?? null
}

// ---------- Perfil (calculado, não é guardado) ----------

// Quem tem registro de Paciente é "Paciente"; senão é o cargo do Profissional (Médico, Dentista ou Terapeuta).
export function perfilDe(id: number): string {
  if (buscarPaciente(id) !== null) return 'Paciente'
  const profissional = buscarProfissional(id)
  return profissional === null ? '' : profissional.cargo
}

// Administrador não é perfil: é a permissão de um Profissional
export function ehAdministrador(id: number): boolean {
  const profissional = buscarProfissional(id)
  return profissional !== null && profissional.ehAdministrador
}

// Nome de qualquer usuário. Nos profissionais o nome já guarda o título (ex.: "Dr. Rafael Moura")
export function nomeDoUsuario(id: number): string {
  const usuario = buscarUsuario(id)
  return usuario === null ? '' : usuario.nome
}

// Profissionais com conta Ativa, já com o nome e a especialidade (para listas)
export function profissionaisAtivos(): ProfissionalComNome[] {
  const lista: ProfissionalComNome[] = []
  for (const profissional of lerProfissionais()) {
    const usuario = buscarUsuario(profissional.idUsuario)
    if (usuario !== null && usuario.statusConta === 'Ativa') {
      lista.push({ id: usuario.id, nome: usuario.nome, especialidade: profissional.especialidade, cargo: profissional.cargo })
    }
  }
  return lista
}

export function especialidadeDoProfissional(id: number): string {
  const profissional = buscarProfissional(id)
  return profissional === null ? '' : profissional.especialidade
}

// ---------- Login e sessão ----------

const CHAVE_SESSAO = 'medpics:sessao'

interface ResultadoLogin {
  erro: string // '' = deu certo
  usuario: Usuario | null
}

// Confere e-mail e senha e o status da conta (Quadro 1). Só conta "Ativa" entra.
// Esta regra funciona sempre, independente de VALIDACOES_ATIVAS.
export function tentarLogin(email: string, senha: string): ResultadoLogin {
  const emailLimpo = email.trim().toLowerCase()
  const usuarios = lerUsuarios()
  const usuario = usuarios.find((u) => u.email.toLowerCase() === emailLimpo && u.senha === senha)

  if (!usuario) return { erro: 'E-mail ou senha inválidos', usuario: null }
  if (usuario.statusConta === 'Inativa') return { erro: 'Conta inativa. Entre em contato com a clínica', usuario: null }
  if (usuario.statusConta === 'Aguardando aprovação') return { erro: 'Cadastro aguardando aprovação do administrador', usuario: null }
  if (usuario.statusConta === 'Recusada') return { erro: 'Cadastro recusado. Entre em contato com a clínica', usuario: null }

  // Conta ativa: grava data e hora do acesso
  usuario.ultimoLogin = agoraTexto()
  gravarUsuarios(usuarios)
  return { erro: '', usuario }
}

// A sessão fica só na aba do navegador (sessionStorage): fechou a aba, saiu.
export function salvarSessao(id: number) {
  sessionStorage.setItem(CHAVE_SESSAO, String(id))
}

export function encerrarSessao() {
  sessionStorage.removeItem(CHAVE_SESSAO)
}

// Usuário logado, ou null (sem sessão, ou conta que deixou de estar Ativa)
export function usuarioLogado(): Usuario | null {
  const texto = sessionStorage.getItem(CHAVE_SESSAO)
  if (texto === null) return null
  const usuario = buscarUsuario(Number(texto))
  if (usuario === null || usuario.statusConta !== 'Ativa') return null
  return usuario
}

// ---------- Rotas por perfil ----------

// Primeira tela de cada pessoa. Profissional que também é administrador começa em /profissional
// e tem as duas seções no menu.
export function telaInicialDo(usuario: Usuario): string {
  return buscarPaciente(usuario.id) !== null ? '/paciente' : '/profissional'
}

// "area" é o início da rota: 'paciente', 'profissional' ou 'admin'
export function podeAcessar(usuario: Usuario, area: string): boolean {
  if (area === 'paciente') return buscarPaciente(usuario.id) !== null
  if (area === 'profissional') return buscarProfissional(usuario.id) !== null
  if (area === 'admin') return ehAdministrador(usuario.id)
  return false
}
