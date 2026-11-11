// Usuários, pacientes, profissionais, terapeutas, login, sessão e cadastros.
import { VALIDACOES_ATIVAS } from '../config'
import type { Cargo, Paciente, Profissional, StatusConta, Terapeuta, Usuario } from '../types'
import { anamneseAtual, salvarAnamnese } from './anamnese'
import type { EstadoAnamnese } from './anamnese'
import { gravarTexto, lerTexto, proximoId } from './armazenamento'
import { agoraTexto } from './datas'

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

export function buscarTerapeuta(id: number): Terapeuta | null {
  return lerTerapeutas().find((t) => t.idUsuario === id) ?? null
}

// Pacientes cujo nome ou CPF contém o texto (para o administrador pesquisar). Texto vazio devolve todos.
export function pesquisarPacientes(texto: string, somenteAtivos: boolean): Usuario[] {
  const nomeBusca = texto.trim().toLowerCase()
  const cpfBusca = apenasNumeros(texto)
  return lerUsuarios()
    .filter((u) => buscarPaciente(u.id) !== null)
    .filter((u) => !somenteAtivos || u.statusConta === 'Ativa')
    .filter((u) => nomeBusca === '' || u.nome.toLowerCase().includes(nomeBusca) || (cpfBusca !== '' && apenasNumeros(u.cpf).includes(cpfBusca)))
    .sort((x, y) => x.nome.localeCompare(y.nome))
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

// Texto do perfil para telas e listas: "Paciente", "Médico", "Médico · Administrador"...
export function descricaoDoPerfil(id: number): string {
  const perfil = perfilDe(id)
  return ehAdministrador(id) ? perfil + ' · Administrador' : perfil
}

// Quantos administradores com conta Ativa existem
export function contarAdministradoresAtivos(): number {
  return lerProfissionais().filter((p) => p.ehAdministrador && buscarUsuario(p.idUsuario)?.statusConta === 'Ativa').length
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
const EMAIL_PADRAO_DO_MODO_TESTE = 'paciente@medpics.com'

interface ResultadoLogin {
  erro: string // '' = deu certo
  usuario: Usuario | null
}

// Grava a data e hora do acesso
function registrarAcesso(usuarios: Usuario[], usuario: Usuario) {
  usuario.ultimoLogin = agoraTexto()
  gravarUsuarios(usuarios)
}

// MODO TESTE (VALIDACOES_ATIVAS = false): entra sempre, sem conferir senha nem status.
// Entra na conta do e-mail informado; se o e-mail estiver vazio ou não existir, entra como paciente@medpics.com.
export function entrarSemValidar(email: string): ResultadoLogin {
  const emailLimpo = email.trim().toLowerCase()
  const usuarios = lerUsuarios()
  let usuario = usuarios.find((u) => u.email.toLowerCase() === emailLimpo)
  if (!usuario) usuario = usuarios.find((u) => u.email === EMAIL_PADRAO_DO_MODO_TESTE)
  if (!usuario) return { erro: 'Nenhuma conta de demonstração encontrada', usuario: null }

  registrarAcesso(usuarios, usuario)
  return { erro: '', usuario }
}

// Login. Com VALIDACOES_ATIVAS = true segue o Quadro 1: confere e-mail e senha e o status da conta.
// Só conta "Ativa" entra. Com false, o login é livre (veja entrarSemValidar).
export function tentarLogin(email: string, senha: string): ResultadoLogin {
  if (!VALIDACOES_ATIVAS) return entrarSemValidar(email)

  const emailLimpo = email.trim().toLowerCase()
  const usuarios = lerUsuarios()
  const usuario = usuarios.find((u) => u.email.toLowerCase() === emailLimpo && u.senha === senha)

  if (!usuario) return { erro: 'E-mail ou senha inválidos', usuario: null }
  if (usuario.statusConta === 'Inativa') return { erro: 'Conta inativa. Entre em contato com a clínica', usuario: null }
  if (usuario.statusConta === 'Aguardando aprovação') return { erro: 'Cadastro aguardando aprovação do administrador', usuario: null }
  if (usuario.statusConta === 'Recusado') return { erro: 'Cadastro recusado. Entre em contato com a clínica', usuario: null }

  registrarAcesso(usuarios, usuario)
  return { erro: '', usuario }
}

// A sessão fica só na aba do navegador (sessionStorage): fechou a aba, saiu.
export function salvarSessao(id: number) {
  sessionStorage.setItem(CHAVE_SESSAO, String(id))
}

export function encerrarSessao() {
  sessionStorage.removeItem(CHAVE_SESSAO)
}

// Usuário logado, ou null (sem sessão). Com as validações ativas, conta que deixou de estar Ativa também sai.
export function usuarioLogado(): Usuario | null {
  const texto = sessionStorage.getItem(CHAVE_SESSAO)
  if (texto === null) return null
  const usuario = buscarUsuario(Number(texto))
  if (usuario === null) return null
  if (VALIDACOES_ATIVAS && usuario.statusConta !== 'Ativa') return null
  return usuario
}

// ---------- Rotas por perfil ----------

// Paciente cadastrado pelo administrador (termos ou anamnese pendentes) ou reativado após 365 dias
// precisa passar pelo primeiro acesso antes de usar o sistema.
export function primeiroAcessoPendente(idUsuario: number): boolean {
  const paciente = buscarPaciente(idUsuario)
  if (paciente === null) return false
  return paciente.dataAceiteTermos === '' || paciente.exigeNovaAnamnese || anamneseAtual(idUsuario) === null
}

// Primeira tela de cada pessoa. Profissional que também é administrador começa em /profissional
// e tem as duas seções no menu.
export function telaInicialDo(usuario: Usuario): string {
  if (buscarPaciente(usuario.id) === null) return '/profissional'
  return primeiroAcessoPendente(usuario.id) ? '/primeiro-acesso' : '/paciente'
}

// "area" é o início da rota: 'paciente', 'primeiro-acesso', 'profissional' ou 'admin'
export function podeAcessar(usuario: Usuario, area: string): boolean {
  if (area === 'paciente') return buscarPaciente(usuario.id) !== null
  if (area === 'primeiro-acesso') return primeiroAcessoPendente(usuario.id)
  if (area === 'profissional') return buscarProfissional(usuario.id) !== null
  if (area === 'admin') return ehAdministrador(usuario.id)
  return false
}

// ---------- Cadastros ----------

// O que os formulários digitam (tudo texto)
export interface DadosDaConta {
  nome: string
  cpf: string
  nascimento: string // AAAA-MM-DD
  telefone: string
  endereco: string
  email: string
  senha: string
  confirmarSenha: string
}

export interface DadosProfissional {
  registro: string
  especialidade: string
  duracao: string // minutos, em texto
  conselho: string // só terapeuta
  graduacao: string // só terapeuta
  areaAtuacao: string // só terapeuta
  posGraduacao: string // só terapeuta (opcional)
  formacoes: string // só terapeuta (opcional)
}

// Mensagens de erro por campo, ex.: erros.nome. A chave "geral" é a mensagem do formulário todo.
export interface Erros {
  [campo: string]: string
}

export function semErros(): Erros {
  return {}
}

export function contaVazia(): DadosDaConta {
  return { nome: '', cpf: '', nascimento: '', telefone: '', endereco: '', email: '', senha: '', confirmarSenha: '' }
}

export function profissionalVazio(): DadosProfissional {
  return { registro: '', especialidade: '', duracao: '', conselho: '', graduacao: '', areaAtuacao: '', posGraduacao: '', formacoes: '' }
}

export function apenasNumeros(texto: string): string {
  return texto.replace(/\D/g, '')
}

// Diz se já existe outra conta com este e-mail ou CPF (inclusive recusada ou inativa: nenhuma conta é excluída)
export function emailOuCpfJaExiste(email: string, cpf: string, ignorarId: number): boolean {
  const emailLimpo = email.trim().toLowerCase()
  const cpfLimpo = apenasNumeros(cpf)
  return lerUsuarios().some(
    (u) => u.id !== ignorarId && ((emailLimpo !== '' && u.email.toLowerCase() === emailLimpo) || (cpfLimpo !== '' && apenasNumeros(u.cpf) === cpfLimpo)),
  )
}

// Valida os dados da conta (campos obrigatórios, senhas iguais, e-mail/CPF repetido).
// "ignorarId" = conta que está sendo editada (0 em cadastro novo). Na edição a senha é opcional.
// Com VALIDACOES_ATIVAS = false não bloqueia nada.
export function validarConta(dados: DadosDaConta, ignorarId = 0, exigeSenha = true): Erros {
  const erros: Erros = {}
  if (!VALIDACOES_ATIVAS) return erros

  const obrigatorio = 'Campo obrigatório'
  if (dados.nome.trim() === '') erros.nome = obrigatorio
  if (dados.cpf.trim() === '') erros.cpf = obrigatorio
  if (dados.nascimento === '') erros.nascimento = obrigatorio
  if (dados.telefone.trim() === '') erros.telefone = obrigatorio
  if (dados.endereco.trim() === '') erros.endereco = obrigatorio
  if (dados.email.trim() === '') erros.email = obrigatorio
  if (exigeSenha && dados.senha === '') erros.senha = obrigatorio
  if (exigeSenha && dados.confirmarSenha === '') erros.confirmarSenha = obrigatorio
  if (dados.senha !== dados.confirmarSenha) {
    erros.confirmarSenha = 'As senhas não coincidem'
  }
  if (emailOuCpfJaExiste(dados.email, dados.cpf, ignorarId)) {
    erros.geral = 'Já existe uma conta com este e-mail ou CPF'
  }
  return erros
}

export const origensDoPaciente = ['Instagram', 'Indicação', 'Google', 'Anúncio', 'Outro']

// Valida a origem do paciente e o aceite dos termos (quando exigido)
export function validarOrigemETermos(origem: string, termosAceitos: boolean, exigeTermos: boolean): Erros {
  const erros: Erros = {}
  if (!VALIDACOES_ATIVAS) return erros
  if (origem === '') erros.origem = 'Campo obrigatório'
  if (exigeTermos && !termosAceitos) erros.termos = 'É preciso aceitar os termos de uso para continuar'
  return erros
}

// Só o aceite dos termos (primeiro acesso)
export function validarTermos(termosAceitos: boolean): Erros {
  const erros: Erros = {}
  if (VALIDACOES_ATIVAS && !termosAceitos) erros.termos = 'É preciso aceitar os termos de uso para continuar'
  return erros
}

// Valida os dados profissionais: obrigatórios, duração de 15 a 120 minutos e, no terapeuta, os dados extras
export function validarProfissional(cargo: Cargo, dados: DadosProfissional): Erros {
  const erros: Erros = {}
  if (!VALIDACOES_ATIVAS) return erros

  const obrigatorio = 'Campo obrigatório'
  if (dados.registro.trim() === '') erros.registro = obrigatorio
  if (dados.especialidade.trim() === '') erros.especialidade = obrigatorio
  const duracao = Number(dados.duracao)
  if (dados.duracao.trim() === '') {
    erros.duracao = obrigatorio
  } else if (!Number.isInteger(duracao) || duracao < 15 || duracao > 120) {
    erros.duracao = 'A duração deve ser de 15 a 120 minutos'
  }
  if (cargo === 'Terapeuta') {
    if (dados.conselho.trim() === '') erros.conselho = obrigatorio
    if (dados.graduacao.trim() === '') erros.graduacao = obrigatorio
    if (dados.areaAtuacao.trim() === '') erros.areaAtuacao = obrigatorio
  }
  return erros
}

function montarUsuario(id: number, dados: DadosDaConta, status: StatusConta): Usuario {
  return {
    id,
    nome: dados.nome.trim(),
    cpf: dados.cpf.trim(),
    email: dados.email.trim(),
    senha: dados.senha, // texto puro só porque é protótipo; num sistema real a senha vai para o back-end com hash
    telefone: dados.telefone.trim(),
    nascimento: dados.nascimento,
    endereco: dados.endereco.trim(),
    cadastro: agoraTexto(),
    ultimoLogin: '',
    statusConta: status,
  }
}

// Cria um paciente com a conta Ativa (sem aprovação).
// "anamnese" = null deixa a anamnese pendente para o primeiro acesso. "idPreenchedor" = 0 quando foi o próprio paciente.
export function criarPaciente(
  dados: DadosDaConta,
  origem: string,
  termosAceitos: boolean,
  anamnese: EstadoAnamnese | null,
  idPreenchedor: number,
): number {
  const usuarios = lerUsuarios()
  const id = proximoId(usuarios.map((u) => u.id))
  usuarios.push(montarUsuario(id, dados, 'Ativa'))
  gravarUsuarios(usuarios)

  const pacientes = lerPacientes()
  pacientes.push({ idUsuario: id, dataAceiteTermos: termosAceitos ? agoraTexto() : '', origem, exigeNovaAnamnese: false })
  gravarPacientes(pacientes)

  if (anamnese !== null) {
    salvarAnamnese(id, anamnese, idPreenchedor === 0 ? id : idPreenchedor)
  }
  return id
}

// Cria um Médico, Dentista ou Terapeuta. No cadastro feito pela própria pessoa o status é "Aguardando aprovação".
export function criarProfissional(cargo: Cargo, dados: DadosDaConta, extras: DadosProfissional, status: StatusConta, ehAdmin: boolean): number {
  const usuarios = lerUsuarios()
  const id = proximoId(usuarios.map((u) => u.id))
  usuarios.push(montarUsuario(id, dados, status))
  gravarUsuarios(usuarios)

  const profissionais = lerProfissionais()
  profissionais.push({
    idUsuario: id,
    cargo,
    numeroRegistro: extras.registro.trim(),
    especialidade: extras.especialidade.trim(),
    duracaoConsulta: Number(extras.duracao),
    ehAdministrador: ehAdmin,
  })
  gravarProfissionais(profissionais)

  // Só o Terapeuta tem registro próprio com os dados extras
  if (cargo === 'Terapeuta') {
    const terapeutas = lerTerapeutas()
    terapeutas.push({
      idUsuario: id,
      conselho: extras.conselho.trim(),
      graduacao: extras.graduacao.trim(),
      posGraduacao: extras.posGraduacao.trim(),
      formacoesComplementares: extras.formacoes.trim(),
      areaAtuacao: extras.areaAtuacao.trim(),
    })
    gravarTerapeutas(terapeutas)
  }
  return id
}

// Conclui o primeiro acesso do paciente: registra o aceite dos termos (se estava pendente)
// e guarda a nova anamnese (se estava pendente ou foi exigida de novo após reativação).
export function concluirPrimeiroAcesso(idPaciente: number, termosPendentes: boolean, anamnese: EstadoAnamnese | null) {
  const pacientes = lerPacientes()
  const paciente = pacientes.find((p) => p.idUsuario === idPaciente)
  if (!paciente) return

  if (termosPendentes) paciente.dataAceiteTermos = agoraTexto()
  if (anamnese !== null) {
    salvarAnamnese(idPaciente, anamnese, idPaciente)
    paciente.exigeNovaAnamnese = false
  }
  gravarPacientes(pacientes)
}
