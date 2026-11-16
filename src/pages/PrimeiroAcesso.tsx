import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import CampoTermos from '../components/CampoTermos'
import Footer from '../components/Footer'
import FormularioAnamnese from '../components/FormularioAnamnese'
import PainelLateral from '../components/PainelLateral'
import { anamneseAtual, anamneseVazia } from '../data/anamnese'
import { buscarPaciente, concluirPrimeiroAcesso, encerrarSessao, usuarioLogado } from '../data/usuarios'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

// Primeiro acesso do paciente: aceite dos termos e/ou anamnese pendentes.
// Acontece quando o administrador cadastrou o paciente sem preencher tudo, ou quando a conta foi reativada
// depois de 365 dias sem login (nova anamnese). Só depois disso o paciente usa o sistema.
function PrimeiroAcesso() {
  const [termos, setTermos] = useState(false)
  const [anamnese, setAnamnese] = useState(anamneseVazia())
  const navigate = useNavigate()

  const usuario = usuarioLogado()
  const paciente = usuario === null ? null : buscarPaciente(usuario.id)
  if (usuario === null || paciente === null) return null

  const termosPendentes = paciente.dataAceiteTermos === ''
  const anamnesePendente = paciente.exigeNovaAnamnese || anamneseAtual(usuario.id) === null

  function concluir() {
    if (usuario === null) return
    // Sem validação: o aceite dos termos e a anamnese são gravados como estiverem (cadastro livre)
    concluirPrimeiroAcesso(usuario.id, termosPendentes, anamnesePendente ? anamnese : null)
    navigate('/paciente')
  }

  function sair() {
    encerrarSessao()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[1fr_3fr]">
          <PainelLateral
            corFundo="bg-texto"
            titulo="Primeiro acesso"
            texto="Falta pouco para você usar o sistema: confirme as informações abaixo."
            beneficios={[
              { icone: checkIcone, texto: 'Agendamento online rápido e fácil' },
              { icone: cadeadoIcone, texto: 'Seus dados protegidos e sigilosos' },
              { icone: celularIcone, texto: 'Acesso de qualquer dispositivo' },
            ]}
            rodape="A medicina humanizada e a tecnologia a favor do bem-estar."
          />

          <section className="flex items-start bg-fundo lg:items-center">
            <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-12 lg:py-16">
              <h2 className="mb-2 font-titulo text-[40px] leading-tight text-primary">Olá, {usuario.nome.split(' ')[0]}</h2>
              <p className="mb-8 text-sm text-marrom">
                {termosPendentes && 'Aceite os termos de uso. '}
                {anamnesePendente && (paciente.exigeNovaAnamnese ? 'Sua conta foi reativada: preencha uma nova anamnese.' : 'Preencha a sua anamnese.')}
              </p>

              <form
                noValidate
                onSubmit={(evento) => {
                  evento.preventDefault()
                  concluir()
                }}
              >
                {termosPendentes && <CampoTermos aceito={termos} aoMudar={setTermos} />}
                {anamnesePendente && <FormularioAnamnese estado={anamnese} aoMudar={setAnamnese} />}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Botao variante="secundario" aoClicar={sair}>
                    Sair
                  </Botao>
                  <div className="sm:flex-1">
                    <Botao enviar larguraTotal>
                      Concluir e entrar
                    </Botao>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
      <Footer compacto />
    </div>
  )
}

export default PrimeiroAcesso
