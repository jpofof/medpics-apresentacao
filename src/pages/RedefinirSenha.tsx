import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import LayoutAcesso from '../components/LayoutAcesso'
import Mensagem from '../components/Mensagem'
import { conferirCodigo, redefinirSenha } from '../data/senha'

// Abre pelo link simulado (/redefinir-senha?codigo=...). Quadro 4, passos 5 a 8 e fluxos alternativos.
function RedefinirSenha() {
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [erro, setErro] = useState('')
  const [pronto, setPronto] = useState(false)
  const { search } = useLocation()

  const codigo = new URLSearchParams(search).get('codigo') ?? ''
  const erroDoLink = pronto ? '' : conferirCodigo(codigo)

  function salvar() {
    const resultado = redefinirSenha(codigo, senha, confirmar)
    setErro(resultado)
    setPronto(resultado === '')
  }

  return (
    <LayoutAcesso titulo="Nova senha" subtitulo="Crie uma nova senha para a sua conta">
      {pronto && (
        <div className="flex flex-col gap-4">
          <Mensagem>Senha redefinida com sucesso</Mensagem>
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Ir para o login
          </Link>
        </div>
      )}

      {!pronto && erroDoLink !== '' && (
        <div className="flex flex-col gap-4">
          <Mensagem tipo="erro">{erroDoLink}</Mensagem>
          <Link to="/esqueci-senha" className="font-semibold text-primary hover:underline">
            Solicitar um novo link
          </Link>
        </div>
      )}

      {!pronto && erroDoLink === '' && (
        <form
          noValidate
          onSubmit={(evento) => {
            evento.preventDefault()
            salvar()
          }}
        >
          {erro && (
            <div className="mb-5">
              <Mensagem tipo="erro">{erro}</Mensagem>
            </div>
          )}
          <Campo id="senha" rotulo="Nova senha" tipo="password" placeholder="Crie uma senha" valor={senha} aoMudar={setSenha} autoComplete="new-password" />
          <Campo id="confirmar" rotulo="Confirmar nova senha" tipo="password" placeholder="Repita a senha" valor={confirmar} aoMudar={setConfirmar} autoComplete="new-password" />
          <Botao enviar larguraTotal>
            Salvar nova senha
          </Botao>
        </form>
      )}
    </LayoutAcesso>
  )
}

export default RedefinirSenha
