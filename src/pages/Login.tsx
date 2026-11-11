import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import Footer from '../components/Footer'
import PainelLateral from '../components/PainelLateral'
import { VALIDACOES_ATIVAS } from '../config'
import { entrarSemValidar, salvarSessao, telaInicialDo, tentarLogin, usuarioLogado } from '../data/usuarios'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

// Contas de demonstração do "Acesso rápido" (aparece só no modo teste, VALIDACOES_ATIVAS = false)
const acessoRapido = [
  { texto: 'Paciente', email: 'paciente@medpics.com' },
  { texto: 'Médico', email: 'medico@medpics.com' },
  { texto: 'Dentista', email: 'dentista@medpics.com' },
  { texto: 'Terapeuta', email: 'terapeuta@medpics.com' },
  { texto: 'Admin (médico + administrador)', email: 'admin@medpics.com' },
  { texto: 'Aguardando', email: 'aguardando@medpics.com' },
  { texto: 'Recusado', email: 'recusado@medpics.com' },
  { texto: 'Inativo', email: 'inativo@medpics.com' },
]

// Tela de login única (e-mail + senha). O perfil é descoberto pelos dados da conta.
// Com VALIDACOES_ATIVAS = false o login é livre: "Entrar" sempre entra (veja tentarLogin em data/usuarios.ts).
function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()
  const { search } = useLocation() // ex: "?cadastro=paciente", vindo do fim do cadastro

  // Quem já está logado vai direto para a própria tela
  const logado = usuarioLogado()
  if (logado !== null) return <Navigate to={telaInicialDo(logado)} replace />

  let aviso = ''
  if (search === '?cadastro=paciente') aviso = 'Cadastro efetuado com sucesso. Entre com seu e-mail e senha.'
  if (search === '?cadastro=profissional') aviso = 'Cadastro enviado para aprovação. Você poderá entrar depois que o administrador aprovar.'

  function entrar() {
    const resultado = tentarLogin(email, senha)
    if (resultado.usuario === null) {
      setErro(resultado.erro)
      return
    }
    salvarSessao(resultado.usuario.id)
    navigate(telaInicialDo(resultado.usuario))
  }

  function entrarComConta(emailDaConta: string) {
    const resultado = entrarSemValidar(emailDaConta)
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

              {aviso && (
                <div role="status" className="mb-5 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
                  {aviso}
                </div>
              )}

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

              {/* Só no modo teste: entra direto numa conta de demonstração */}
              {!VALIDACOES_ATIVAS && (
                <div className="mt-8 rounded-2xl border border-dashed border-marrom-claro bg-fundo-2/40 p-4">
                  <p className="mb-1 text-sm font-semibold text-texto">Acesso rápido (modo teste)</p>
                  <p className="mb-3 text-xs text-marrom">Clique para entrar direto numa conta de demonstração.</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {acessoRapido.map((conta) => (
                      <button
                        key={conta.email}
                        type="button"
                        onClick={() => entrarComConta(conta.email)}
                        className="min-h-11 rounded-xl border border-borda bg-white px-2 py-2 text-xs font-medium text-marrom transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-fundo-2"
                      >
                        {conta.texto}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
