import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import Footer from '../components/Footer'
import PainelLateral from '../components/PainelLateral'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

const perfis = ['Paciente', 'Médico', 'Dentista', 'Terapeuta', 'Administrador']

// Tela de login. Versão de apresentação: o botão Entrar sempre entra, no perfil escolhido
// (e-mail e senha são ignorados). Paciente vai para o painel do paciente; os outros para o painel em desenvolvimento.
function Login() {
  const [perfil, setPerfil] = useState('Paciente')
  const navigate = useNavigate()

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
              <p className="mb-8 text-sm text-marrom">Escolha o seu perfil e clique em Entrar</p>

              <form
                noValidate
                onSubmit={(evento) => {
                  evento.preventDefault()
                  navigate(perfil === 'Paciente' ? '/paciente' : '/profissional')
                }}
              >
                <p id="rotulo-perfil" className="mb-2 text-sm font-medium text-marrom">
                  Entrar como
                </p>
                <div role="radiogroup" aria-labelledby="rotulo-perfil" className="mb-6 flex flex-wrap gap-2">
                  {perfis.map((opcao) => (
                    <button
                      key={opcao}
                      type="button"
                      role="radio"
                      aria-checked={perfil === opcao}
                      onClick={() => setPerfil(opcao)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        perfil === opcao
                          ? 'border-primary bg-primary text-white'
                          : 'border-borda bg-white text-marrom hover:border-primary hover:text-primary active:bg-fundo-2'
                      }`}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>

                <Campo id="email" rotulo="Email" placeholder="seu@email.com" />
                <Campo id="senha" rotulo="Senha" tipo="password" placeholder="••••••••" />

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
