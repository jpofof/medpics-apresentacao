import { useState } from 'react'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import Mensagem from '../components/Mensagem'
import PainelLayout from '../components/PainelLayout'
import { formatarData } from '../data/datas'
import { dadosDoPerfilLogado, salvarPerfil } from '../data/senha'
import { descricaoDoPerfil, semErros, usuarioLogado } from '../data/usuarios'

// "Meu perfil" (Quadro 5), igual para todos os perfis: Nome, Telefone, E-mail, Endereço e Senha (com confirmação).
// CPF, data de nascimento e cargo aparecem só para consulta.
function MeuPerfil() {
  const usuario = usuarioLogado()
  const [dados, setDados] = useState(dadosDoPerfilLogado())
  const [erros, setErros] = useState(semErros())
  const [salvo, setSalvo] = useState(false)

  if (usuario === null) return null
  const idDoUsuario = usuario.id

  function mudar(campo: string, valor: string) {
    setDados({ ...dados, [campo]: valor })
    setSalvo(false)
  }

  function salvar() {
    const novosErros = salvarPerfil(idDoUsuario, dados)
    setErros(novosErros)
    const deuCerto = Object.keys(novosErros).length === 0
    setSalvo(deuCerto)
    if (deuCerto) setDados({ ...dados, senha: '', confirmarSenha: '' })
  }

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Meu perfil" subtitulo={descricaoDoPerfil(usuario.id)} />

      {salvo && <Mensagem>Alteração efetuada com sucesso</Mensagem>}
      {erros.geral && <Mensagem tipo="erro">{erros.geral}</Mensagem>}

      <Cartao>
        <p className="mb-5 text-pequeno text-marrom">
          CPF: {usuario.cpf === '' ? 'não informado' : usuario.cpf} · Nascimento: {usuario.nascimento === '' ? 'não informado' : formatarData(usuario.nascimento)}
        </p>
        <form
          noValidate
          onSubmit={(evento) => {
            evento.preventDefault()
            salvar()
          }}
        >
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Campo id="nome" rotulo="Nome" valor={dados.nome} aoMudar={(v) => mudar('nome', v)} erro={erros.nome} />
            <Campo id="telefone" rotulo="Telefone" tipo="tel" valor={dados.telefone} aoMudar={(v) => mudar('telefone', v)} erro={erros.telefone} />
            <Campo id="email" rotulo="Email" tipo="email" valor={dados.email} aoMudar={(v) => mudar('email', v)} erro={erros.email} autoComplete="off" />
            <Campo id="endereco" rotulo="Endereço" valor={dados.endereco} aoMudar={(v) => mudar('endereco', v)} erro={erros.endereco} />
            <Campo id="senha" rotulo="Nova senha (opcional)" tipo="password" placeholder="Deixe em branco para manter" valor={dados.senha} aoMudar={(v) => mudar('senha', v)} autoComplete="new-password" />
            <Campo id="confirmarSenha" rotulo="Confirmar nova senha" tipo="password" valor={dados.confirmarSenha} aoMudar={(v) => mudar('confirmarSenha', v)} erro={erros.confirmarSenha} autoComplete="new-password" />
          </div>
          <Botao enviar>Salvar alterações</Botao>
        </form>
      </Cartao>
    </PainelLayout>
  )
}

export default MeuPerfil
