import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import Footer from '../components/Footer'
import PainelLateral from '../components/PainelLateral'
import { salvarSessao, telaInicialDo, tentarLogin, usuarioLogado } from '../data/usuarios'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

// Tela de login única (e-mail + senha). O perfil é descoberto pelos dados da conta.
function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  // Quem já está logado vai direto para a própria tela
  const logado = usuarioLogado()
  if (logado !== null) return <Navigate to={telaInicialDo(logado)} replace />

  function entrar() {
    const resultado = tentarLogin(email, senha)
    if (resultado.usuario === null) {
      setErro(resultado.erro)
      return
    }
    salvarSessao(resultado.usuario.id)
    navigate(telaInicialDo(resultado.usuario))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[1fr_3fr]">
          <PainelLateral
            corFundo="bg-marrom"
            titulo="Bem-vindo de volta"
            texto="Acesse sua conta para gerenciar agendamentos, consultas e muito mais."
            beneficios={[
              { icone: checkIcone, texto: 'Visualize e gerencie seus agendamentos' },
              { icone: cadeadoIcone, texto: 'Seus dados protegidos e sigilosos' },
              { icone: celularIcone, texto: 'Acesso de qualquer dispositivo' },
            ]}
            rodape="A medicina humanizada e a tecnologia a favor do bem-estar."
          />

          <section className="flex items-center bg-fundo">
            <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-12 lg:py-16">
              <h2 className="mb-2 font-titulo text-[40px] leading-tight text-primary">Entre na conta</h2>
              <p className="mb-8 text-sm text-marrom">Informe seu e-mail e sua senha para continuar</p>

              <form
                noValidate
                onSubmit={(evento) => {
                  evento.preventDefault()
                  entrar()
                }}
              >
                {erro && (
                  <div role="alert" className="mb-5 rounded-xl border border-erro/40 bg-erro/10 px-4 py-3 text-sm text-erro">
                    {erro}
                  </div>
                )}

                <Campo id="email" rotulo="Email" tipo="email" placeholder="seu@email.com" valor={email} aoMudar={setEmail} autoComplete="email" />
                <Campo id="senha" rotulo="Senha" tipo="password" placeholder="••••••••" valor={senha} aoMudar={setSenha} autoComplete="current-password" />

                <Botao enviar larguraTotal>
                  Entrar
                </Botao>
              </form>

              <p className="mt-8 border-t border-borda pt-6 text-center text-sm text-marrom">
                Ainda não tem conta?{' '}
                <Link to="/cadastro" className="font-semibold text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer compacto />
    </div>
  )
}

export default Login
