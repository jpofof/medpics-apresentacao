import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import Footer from '../components/Footer'
import PainelLateral from '../components/PainelLateral'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

interface OpcaoPerfil {
  rota: string
  titulo: string
  descricao: string
}

const opcoes: OpcaoPerfil[] = [
  { rota: '/cadastro/paciente', titulo: 'Paciente', descricao: 'Agende e acompanhe suas consultas' },
  { rota: '/cadastro/medico', titulo: 'Médico', descricao: 'CRM, especialidade e duração da consulta' },
  { rota: '/cadastro/dentista', titulo: 'Dentista', descricao: 'CRO, especialidade e duração da consulta' },
  { rota: '/cadastro/terapeuta', titulo: 'Terapeuta', descricao: 'Conselho, graduação e área de atuação' },
]

// Primeira tela do cadastro: a pessoa escolhe o perfil e segue para o formulário dele
function NovoCadastro() {
  const [rotaEscolhida, setRotaEscolhida] = useState('')
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[1fr_3fr]">
          <PainelLateral
            corFundo="bg-escuro"
            titulo="Comece sua jornada de cuidado"
            texto="Escolha o seu perfil e preencha o formulário na próxima etapa."
            beneficios={[
              { icone: checkIcone, texto: 'Agendamento online rápido e fácil' },
              { icone: cadeadoIcone, texto: 'Seus dados protegidos e sigilosos' },
              { icone: celularIcone, texto: 'Acesso de qualquer dispositivo' },
            ]}
            rodape="A medicina humanizada e a tecnologia a favor do bem-estar."
          />

          <section className="flex items-center bg-fundo">
            <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-12 lg:py-16">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-verde-cta">Cadastro</p>
              <h2 className="mb-2 text-[40px] leading-tight text-verde-cta">Como deseja se cadastrar?</h2>
              <p className="mb-8 text-sm text-marrom">Selecione seu perfil — o formulário abrirá na próxima etapa</p>

              <div role="radiogroup" className="mb-8 grid gap-4 sm:grid-cols-2">
                {opcoes.map((opcao) => (
                  <button
                    key={opcao.rota}
                    type="button"
                    role="radio"
                    aria-checked={rotaEscolhida === opcao.rota}
                    onClick={() => setRotaEscolhida(opcao.rota)}
                    className={`rounded-2xl border-[1.5px] p-5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta ${
                      rotaEscolhida === opcao.rota
                        ? 'border-verde-cta bg-verde-cta/10'
                        : 'border-marrom-claro bg-fundo hover:border-verde-cta active:bg-bege'
                    }`}
                  >
                    <p className="mb-1 text-xl text-escuro">{opcao.titulo}</p>
                    <p className="text-sm text-marrom">{opcao.descricao}</p>
                  </button>
                ))}
              </div>

              <Botao desabilitado={rotaEscolhida === ''} larguraTotal aoClicar={() => navigate(rotaEscolhida)}>
                Continuar
              </Botao>

              <p className="mt-6 text-center text-sm text-marrom">
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

export default NovoCadastro
