import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import CamposAcesso from '../components/CamposAcesso'
import CamposDadosPessoais from '../components/CamposDadosPessoais'
import CamposProfissionais from '../components/CamposProfissionais'
import Footer from '../components/Footer'
import PainelLateral from '../components/PainelLateral'
import { contaVazia, criarProfissional, profissionalVazio, semErros } from '../data/usuarios'
import type { Cargo } from '../types'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

interface CadastroProfissionalProps {
  perfil: Cargo // "Médico", "Dentista" ou "Terapeuta" (vem da rota)
}

// Cadastro de médico, dentista ou terapeuta. A conta fica "Aguardando aprovação" até o administrador aprovar.
// Cadastro livre: nenhum campo é obrigatório e nada é conferido. Ao enviar, vai para o login.
function CadastroProfissional({ perfil }: CadastroProfissionalProps) {
  const [conta, setConta] = useState(contaVazia())
  const [dados, setDados] = useState(profissionalVazio())
  const navigate = useNavigate()

  function mudarConta(campo: string, valor: string) {
    setConta({ ...conta, [campo]: valor })
  }

  function mudarDados(campo: string, valor: string) {
    setDados({ ...dados, [campo]: valor })
  }

  function enviar() {
    criarProfissional(perfil, conta, dados, 'Aguardando aprovação', false)
    navigate('/login?cadastro=profissional')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[1fr_3fr]">
          <PainelLateral
            corFundo="bg-escuro"
            titulo="Faça parte da equipe MedPics"
            texto="Junte-se à nossa rede de profissionais dedicados à cannabis medicinal e práticas integrativas."
            beneficios={[
              { icone: checkIcone, texto: 'Agenda e consultas em um só lugar' },
              { icone: cadeadoIcone, texto: 'Dados protegidos e sigilosos' },
              { icone: celularIcone, texto: 'Acesso de qualquer dispositivo' },
            ]}
            rodape="A medicina humanizada e a tecnologia a favor do bem-estar."
          />

          <section className="flex items-start bg-fundo lg:items-center">
            <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-12 lg:py-16">
              <Link to="/cadastro" className="mb-4 inline-flex min-h-11 items-center text-botao text-marrom hover:text-verde-cta hover:underline">
                ← Escolher outro perfil
              </Link>
              <h2 className="mb-2 text-[40px] leading-tight text-verde-cta">Cadastro: {perfil}</h2>
              <p className="mb-8 text-botao text-marrom">
                Preencha seus dados. O cadastro fica aguardando a aprovação do administrador.
              </p>

              <form
                noValidate
                onSubmit={(evento) => {
                  evento.preventDefault()
                  enviar()
                }}
              >
                <CamposDadosPessoais dados={conta} aoMudar={mudarConta} erros={semErros()} />
                <CamposProfissionais cargo={perfil} dados={dados} aoMudar={mudarDados} erros={semErros()} />
                <CamposAcesso dados={conta} aoMudar={mudarConta} erros={semErros()} />

                <Botao enviar larguraTotal>
                  Enviar cadastro
                </Botao>
              </form>

              <p className="mt-6 text-center text-botao text-marrom">
                Já tenho conta.{' '}
                <Link to="/login" className="inline-flex min-h-11 items-center font-semibold text-verde-cta hover:underline">
                  Fazer login
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

export default CadastroProfissional
