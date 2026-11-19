// Redefinir senha (Quadro 4) e editar perfil (Quadro 5).
// Não há e-mail de verdade: o "link" é mostrado na própria tela (simulação), com validade de 15 minutos.
import { VALIDACOES_ATIVAS } from '../config'
import { gravarTexto, lerTexto } from './armazenamento'
import { agoraTexto } from './datas'
import type { Erros } from './usuarios'
import { gravarUsuarios, lerUsuarios, usuarioLogado } from './usuarios'

const VALIDADE_EM_MINUTOS = 15

interface Redefinicao {
  codigo: string
  idUsuario: number
  expiraEm: string // AAAA-MM-DDTHH:mm
}

function lerRedefinicoes(): Redefinicao[] {
  const texto = lerTexto('redefinicoes')
  return texto === '' ? [] : JSON.parse(texto)
}

function gravarRedefinicoes(lista: Redefinicao[]) {
  gravarTexto('redefinicoes', JSON.stringify(lista))
}

// Daqui a alguns minutos, no mesmo formato de agoraTexto()
function momentoDaquiA(minutos: number): string {
  const data = new Date(Date.now() + minutos * 60 * 1000)
  const dois = (n: number) => String(n).padStart(2, '0')
  return data.getFullYear() + '-' + dois(data.getMonth() + 1) + '-' + dois(data.getDate()) + 'T' + dois(data.getHours()) + ':' + dois(data.getMinutes())
}

// Passo 4 do Quadro 4. Se o e-mail existe, cria um código novo e o devolve (a tela mostra o "link" simulado).
// Se não existe, devolve '' e a tela mostra a mesma mensagem, para não revelar quais e-mails estão cadastrados.
export function solicitarRedefinicao(email: string): string {
  const emailLimpo = email.trim().toLowerCase()
  const usuario = lerUsuarios().find((u) => emailLimpo !== '' && u.email.toLowerCase() === emailLimpo)
  if (!usuario) return ''

  const codigo = Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  const lista = lerRedefinicoes().filter((r) => r.idUsuario !== usuario.id) // vale só o pedido mais recente
  lista.push({ codigo, idUsuario: usuario.id, expiraEm: momentoDaquiA(VALIDADE_EM_MINUTOS) })
  gravarRedefinicoes(lista)
  return codigo
}

// O link ainda vale? ('' = vale; senão, a mensagem do link expirado ou inválido)
export function conferirCodigo(codigo: string): string {
  const pedido = lerRedefinicoes().find((r) => r.codigo === codigo)
  if (!pedido || pedido.expiraEm < agoraTexto()) return 'O link expirou ou é inválido. Faça uma nova solicitação de redefinição de senha.'
  return ''
}

// Passo 8 do Quadro 4. Devolve '' se deu certo, ou a mensagem de erro.
export function redefinirSenha(codigo: string, novaSenha: string, confirmacao: string): string {
  const erroDoLink = conferirCodigo(codigo)
  if (erroDoLink !== '') return erroDoLink
  if (VALIDACOES_ATIVAS && novaSenha !== confirmacao) return 'As senhas não coincidem'

  const pedido = lerRedefinicoes().find((r) => r.codigo === codigo)
  const usuarios = lerUsuarios()
  const usuario = usuarios.find((u) => pedido !== undefined && u.id === pedido.idUsuario)
  if (!usuario) return 'Conta não encontrada'

  usuario.senha = novaSenha // texto puro só porque é protótipo; num sistema real a senha vai para o back-end com hash
  gravarUsuarios(usuarios)
  gravarRedefinicoes(lerRedefinicoes().filter((r) => r.codigo !== codigo)) // o link só serve uma vez
  return ''
}

// O que a tela "Meu perfil" edita (tudo texto)
export interface DadosDoPerfil {
  nome: string
  telefone: string
  email: string
  endereco: string
  senha: string // em branco = mantém a atual
  confirmarSenha: string
}

// Dados atuais de quem está logado, para preencher o formulário do perfil
export function dadosDoPerfilLogado(): DadosDoPerfil {
  const usuario = usuarioLogado()
  if (usuario === null) return { nome: '', telefone: '', email: '', endereco: '', senha: '', confirmarSenha: '' }
  return { nome: usuario.nome, telefone: usuario.telefone, email: usuario.email, endereco: usuario.endereco, senha: '', confirmarSenha: '' }
}

// Guarda a edição do perfil (Quadro 5). Devolve um objeto de erros por campo; vazio = deu certo e salvou.
export function salvarPerfil(idUsuario: number, dados: DadosDoPerfil): Erros {
  const erros: Erros = {}
  const usuarios = lerUsuarios()
  const usuario = usuarios.find((u) => u.id === idUsuario)
  if (!usuario) return { geral: 'Usuário não encontrado' }

  if (VALIDACOES_ATIVAS) {
    if (dados.nome.trim() === '') erros.nome = 'Campo obrigatório'
    if (dados.email.trim() === '') erros.email = 'Campo obrigatório'
    if (dados.senha !== dados.confirmarSenha) erros.confirmarSenha = 'As senhas não coincidem'
    const emailLimpo = dados.email.trim().toLowerCase()
    if (emailLimpo !== '' && usuarios.some((u) => u.id !== idUsuario && u.email.toLowerCase() === emailLimpo)) erros.email = 'E-mail já cadastrado'
    if (Object.keys(erros).length > 0) return erros
  }

  usuario.nome = dados.nome.trim()
  usuario.telefone = dados.telefone.trim()
  usuario.email = dados.email.trim()
  usuario.endereco = dados.endereco.trim()
  if (dados.senha !== '') usuario.senha = dados.senha
  gravarUsuarios(usuarios)
  return erros
}
