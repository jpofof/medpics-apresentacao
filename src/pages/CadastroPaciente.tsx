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
import { anamneseVazia, semErrosAnamnese, validarAnamnese } from '../data/anamnese'
import { contaVazia, criarPaciente, origensDoPaciente, semErros, validarConta, validarOrigemETermos } from '../data/usuarios'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

// Cadastro do paciente em duas etapas: 1) dados e termos  2) anamnese.
// Ao concluir, a conta já fica Ativa e a pessoa vai para o login.
function CadastroPaciente() {
  const [etapa, setEtapa] = useState(1)
  const [conta, setConta] = useState(contaVazia())
  const [origem, setOrigem] = useState('')
  const [termos, setTermos] = useState(false)
  const [anamnese, setAnamnese] = useState(anamneseVazia())
  const [erros, setErros] = useState(semErros())
  const [errosAnamnese, setErrosAnamnese] = useState(semErrosAnamnese())
  const navigate = useNavigate()

  function mudarConta(campo: string, valor: string) {
    setConta({ ...conta, [campo]: valor })
  }

  // Etapa 1: confere os dados e os termos antes de abrir a anamnese
  function irParaAnamnese() {
    const novosErros = { ...validarConta(conta), ...validarOrigemETermos(origem, termos, true) }
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setEtapa(2)
    window.scrollTo({ top: 0 })
  }

  // Etapa 2: confere a anamnese e cria a conta
  function concluir() {
    const novosErrosAnamnese = validarAnamnese(anamnese)
    setErrosAnamnese(novosErrosAnamnese)
    if (Object.keys(novosErrosAnamnese).length > 0) return

    // Confere de novo e-mail e CPF (podem ter sido usados enquanto a pessoa preenchia a anamnese)
    const novosErros = validarConta(conta)
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      setEtapa(1)
      window.scrollTo({ top: 0 })
      return
    }

    criarPaciente(conta, origem, termos, anamnese, 0)
    navigate('/login?cadastro=paciente')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[1fr_3fr]">
          <PainelLateral
            corFundo="bg-texto"
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
              <Link to="/cadastro" className="mb-4 inline-block text-sm text-marrom hover:text-primary hover:underline">
                ← Escolher outro perfil
              </Link>
              <h2 className="mb-2 font-titulo text-[40px] leading-tight text-primary">Criar conta</h2>
              <p className="mb-2 text-sm text-marrom">
                Etapa {etapa} de 2: {etapa === 1 ? 'seus dados' : 'anamnese'}
              </p>
              <div className="mb-8 flex gap-2" aria-hidden="true">
                <span className="h-1.5 flex-1 rounded-full bg-primary" />
                <span className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${etapa === 2 ? 'bg-primary' : 'bg-fundo-2'}`} />
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
                  {erros.geral && (
                    <div role="alert" className="mb-5 rounded-xl border border-erro/40 bg-erro/10 px-4 py-3 text-sm text-erro">
                      {erros.geral}
                    </div>
                  )}

                  <CamposDadosPessoais dados={conta} aoMudar={mudarConta} erros={erros} />
                  <CampoSelect id="origem" rotulo="Como chegou até a clínica?" opcoes={origensDoPaciente} valor={origem} aoMudar={setOrigem} erro={erros.origem} />
                  <CamposAcesso dados={conta} aoMudar={mudarConta} erros={erros} />
                  <CampoTermos aceito={termos} aoMudar={setTermos} erro={erros.termos} />

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
                  <FormularioAnamnese estado={anamnese} aoMudar={setAnamnese} erros={errosAnamnese} />

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

              <p className="mt-6 text-center text-sm text-marrom">
                Já tenho conta.{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
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
