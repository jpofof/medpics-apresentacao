import { useState } from 'react'
import { Link } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import LayoutAcesso from '../components/LayoutAcesso'
import Mensagem from '../components/Mensagem'
import { solicitarRedefinicao } from '../data/senha'

// "Esqueci minha senha" (Quadro 4, passos 1 a 4). Não envia e-mail de verdade: o link aparece na tela como simulação.
function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [codigo, setCodigo] = useState('')

  function pedir() {
    setCodigo(solicitarRedefinicao(email))
    setEnviado(true)
  }

  return (
    <LayoutAcesso titulo="Esqueci minha senha" subtitulo="Informe o e-mail da sua conta para receber um link de redefinição">
      <form
        noValidate
        onSubmit={(evento) => {
          evento.preventDefault()
          pedir()
        }}
      >
        <Campo id="email" rotulo="Email" tipo="email" placeholder="seu@email.com" valor={email} aoMudar={setEmail} autoComplete="email" />
        <Botao enviar larguraTotal>
          Enviar link
        </Botao>
      </form>

      {enviado && (
        <div className="mt-6 flex flex-col gap-4">
          <Mensagem tipo="aviso">Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha</Mensagem>
          {codigo !== '' && (
            <div className="rounded-xl border border-dashed border-marrom-claro bg-bege/40 p-4 text-sm text-marrom">
              <p className="mb-1 font-semibold text-escuro">E-mail simulado (só na demonstração)</p>
              <p className="mb-2">O link abaixo vale por 15 minutos:</p>
              <Link to={'/redefinir-senha?codigo=' + codigo} className="break-all font-semibold text-verde-cta hover:underline">
                Redefinir minha senha
              </Link>
            </div>
          )}
        </div>
      )}

      <p className="mt-8 border-t border-marrom-claro pt-6 text-center text-sm text-marrom">
        <Link to="/login" className="inline-flex min-h-11 items-center font-semibold text-verde-cta hover:underline">
          ← Voltar para o login
        </Link>
      </p>
    </LayoutAcesso>
  )
}

export default EsqueciSenha
