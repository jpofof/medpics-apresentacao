import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import CampoSelect from '../components/CampoSelect'
import CampoTermos from '../components/CampoTermos'
import CamposAcesso from '../components/CamposAcesso'
import CamposDadosPessoais from '../components/CamposDadosPessoais'
import Footer from '../components/Footer'
import FormularioAnamnese from '../components/FormularioAnamnese'
import PainelLateral from '../components/PainelLateral'
import { anamneseVazia } from '../data/anamnese'
import { contaVazia, criarPaciente, origensDoPaciente, semErros } from '../data/usuarios'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

// Cadastro do paciente em duas etapas: 1) dados e termos  2) anamnese.
// Cadastro livre: nenhum campo é obrigatório e nada é conferido. Ao concluir, a conta fica Ativa e a pessoa vai para o login.
function CadastroPaciente() {
  const [etapa, setEtapa] = useState(1)
  const [conta, setConta] = useState(contaVazia())
  const [origem, setOrigem] = useState('')
  const [termos, setTermos] = useState(false)
  const [anamnese, setAnamnese] = useState(anamneseVazia())
  const navigate = useNavigate()

  function mudarConta(campo: string, valor: string) {
    setConta({ ...conta, [campo]: valor })
  }

  function irParaAnamnese() {
    setEtapa(2)
    window.scrollTo({ top: 0 })
  }

  function concluir() {
    criarPaciente(conta, origem, termos, anamnese, 0)
    navigate('/login?cadastro=paciente')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[1fr_3fr]">
          <PainelLateral
            corFundo="bg-escuro"
            titulo="Comece sua jornada de cuidado"
            texto="Crie sua conta para acessar todos os nossos serviços e acompanhar suas consultas."
            beneficios={[
              { icone: checkIcone, texto: 'Agendamento online rápido e fácil' },
              { icone: cadeadoIcone, texto: 'Seus dados protegidos e sigilosos' },
              { icone: celularIcone, texto: 'Acesso de qualquer dispositivo' },
            ]}
            rodape="Cadastro gratuito — Sem mensalidade"
          />

          <section className="flex items-start bg-fundo lg:items-center">
            <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-12 lg:py-16">
              <Link to="/cadastro" className="mb-4 inline-flex min-h-11 items-center text-botao text-marrom hover:text-verde-cta hover:underline">
                ← Escolher outro perfil
              </Link>
              <h2 className="mb-2 text-[40px] leading-tight text-verde-cta">Criar conta</h2>
              <p className="mb-2 text-botao text-marrom">
                Etapa {etapa} de 2: {etapa === 1 ? 'seus dados' : 'anamnese'}
              </p>
              <div className="mb-8 flex gap-2" aria-hidden="true">
                <span className="h-1.5 flex-1 rounded-full bg-verde-cta" />
                <span className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${etapa === 2 ? 'bg-verde-cta' : 'bg-bege'}`} />
              </div>

              {/* Etapa 1: dados pessoais */}
              {etapa === 1 && (
                <form
                  noValidate
                  onSubmit={(evento) => {
                    evento.preventDefault()
                    irParaAnamnese()
                  }}
                >
                  <CamposDadosPessoais dados={conta} aoMudar={mudarConta} erros={semErros()} />
                  <CampoSelect id="origem" rotulo="Como chegou até a clínica?" opcoes={origensDoPaciente} valor={origem} aoMudar={setOrigem} />
                  <CamposAcesso dados={conta} aoMudar={mudarConta} erros={semErros()} />
                  <CampoTermos aceito={termos} aoMudar={setTermos} />

                  <Botao enviar larguraTotal>
                    Continuar para a anamnese
                  </Botao>
                </form>
              )}

              {/* Etapa 2: anamnese */}
              {etapa === 2 && (
                <form
                  noValidate
                  onSubmit={(evento) => {
                    evento.preventDefault()
                    concluir()
                  }}
                >
                  <FormularioAnamnese estado={anamnese} aoMudar={setAnamnese} />

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Botao variante="secundario" aoClicar={() => setEtapa(1)}>
                      Voltar
                    </Botao>
                    <div className="sm:flex-1">
                      <Botao enviar larguraTotal>
                        Concluir cadastro
                      </Botao>
                    </div>
                  </div>
                </form>
              )}

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

export default CadastroPaciente
