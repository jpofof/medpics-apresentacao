import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import CampoSelect from '../components/CampoSelect'
import Footer from '../components/Footer'
import PainelLateral from '../components/PainelLateral'
import TituloDaSecao from '../components/TituloDaSecao'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

interface Categoria {
  nome: string
  itens: string[]
}

const origens = ['Instagram', 'Indicação', 'Google', 'Anúncio', 'Outro']

// Hábitos: o paciente responde Sim ou Não e, se for Sim, informa a frequência
const habitos = ['Tabagismo', 'Álcool', 'Drogas', 'Remédios/opioides', 'Atividade física']

// Itens da anamnese (as listas de "Saúde mental e emocional" e "Sintomas físicos" são provisórias)
const categorias: Categoria[] = [
  { nome: 'Hábitos e vícios', itens: ['Alimentação'] }, // os hábitos acima aparecem antes dos itens
  { nome: 'Saúde mental e emocional', itens: ['Estresse', 'Alterações de humor', 'Dificuldade de concentração', 'Tristeza persistente', 'Irritabilidade'] },
  { nome: 'Sintomas físicos', itens: ['Dor de cabeça', 'Dores musculares', 'Dor nas articulações', 'Fadiga', 'Tontura', 'Náuseas'] },
  {
    nome: 'Condições neurológicas',
    itens: ['Epilepsia refratária', 'Parkinson', 'Alzheimer', 'Esclerose múltipla', 'Enxaqueca', 'Neuralgias', 'Distúrbios do sono', 'Espasticidade', 'Tremores', 'Dor neuropática'],
  },
  {
    nome: 'Condições de neurodesenvolvimento e psicoemocionais',
    itens: ['Autismo (TEA)', 'TDAH', 'Ansiedade', 'Depressão', 'TEPT', 'Síndrome do pânico', 'Burnout', 'Insônia', 'Transtornos alimentares', 'Dependência química'],
  },
  {
    nome: 'Doenças crônicas, inflamatórias e autoimunes',
    itens: [
      'Dor crônica', 'Fibromialgia', 'Artrite reumatoide', 'Lúpus', 'Psoríase', 'Endometriose', 'Doença de Crohn',
      'Retocolite ulcerativa', 'Síndrome do intestino irritável', 'Inflamações crônicas', 'Cuidados paliativos oncológicos',
    ],
  },
  {
    nome: 'Condições metabólicas e funcionais',
    itens: [
      'Diabetes', 'Obesidade', 'Hipertensão', 'Distúrbios hormonais', 'TPM e menopausa', 'Disfunções gastrointestinais',
      'Bruxismo', 'Dermatites', 'Long COVID', 'Fadiga crônica', 'Alterações de apetite e metabolismo',
    ],
  },
]

// Lista vazia de textos, usada como valor inicial dos useState abaixo
const listaVazia: string[] = []

const classeDoCampoPequeno =
  'h-11 w-full rounded-xl border-[1.5px] border-borda bg-fundo px-3 text-sm text-texto transition-colors duration-200 placeholder:text-[#b8b0a4] hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-suave/60'

// Cadastro do paciente em duas etapas: 1) dados e termos  2) anamnese.
// Versão de apresentação: nada é salvo; ao concluir, vai para o login.
function CadastroPaciente() {
  const [etapa, setEtapa] = useState(1)
  const [habitosComSim, setHabitosComSim] = useState(listaVazia) // para mostrar o campo "Frequência"
  const [itensMarcados, setItensMarcados] = useState(listaVazia) // para mostrar o campo "Observação"
  const navigate = useNavigate()

  function responderHabito(habito: string, respondeuSim: boolean) {
    const semEste = habitosComSim.filter((h) => h !== habito)
    setHabitosComSim(respondeuSim ? [...semEste, habito] : semEste)
  }

  function marcarItem(item: string, marcado: boolean) {
    const semEste = itensMarcados.filter((i) => i !== item)
    setItensMarcados(marcado ? [...semEste, item] : semEste)
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

              {/* Etapa 1: dados pessoais (o formulário fica escondido, e não removido, para não perder o que foi digitado) */}
              <form
                noValidate
                className={etapa === 1 ? '' : 'hidden'}
                onSubmit={(evento) => {
                  evento.preventDefault()
                  setEtapa(2)
                  window.scrollTo({ top: 0 })
                }}
              >
                <TituloDaSecao>Dados pessoais</TituloDaSecao>
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Campo id="nome" rotulo="Nome" placeholder="Nome completo" />
                  <Campo id="cpf" rotulo="CPF" placeholder="000.000.000-00" />
                  <Campo id="nascimento" rotulo="Data de nascimento" placeholder="dd/mm/aaaa" />
                  <Campo id="telefone" rotulo="Telefone" tipo="tel" placeholder="(11) 99999-9999" />
                </div>
                <Campo id="endereco" rotulo="Endereço" placeholder="Rua, número, bairro e cidade" />
                <CampoSelect id="origem" rotulo="Como chegou até a clínica?" opcoes={origens} />

                <TituloDaSecao comEspacoAcima>Acesso ao sistema</TituloDaSecao>
                <Campo id="email" rotulo="Email" placeholder="seu@email.com" />
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Campo id="senha" rotulo="Senha" tipo="password" placeholder="Mínimo 8 caracteres" />
                  <Campo id="confirmarSenha" rotulo="Confirmar senha" tipo="password" placeholder="Repita a senha" />
                </div>

                <div className="mb-6">
                  <label htmlFor="termos" className="flex cursor-pointer items-start gap-3 text-sm text-marrom">
                    <input
                      id="termos"
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                    <span>Aceito os Termos de Uso e a Política de Privacidade (LGPD) da Clínica MedPics</span>
                  </label>
                </div>

                <Botao enviar larguraTotal>
                  Continuar para a anamnese
                </Botao>
              </form>

              {/* Etapa 2: anamnese */}
              <form
                noValidate
                className={etapa === 2 ? '' : 'hidden'}
                onSubmit={(evento) => {
                  evento.preventDefault()
                  navigate('/login')
                }}
              >
                <p className="mb-6 text-sm text-marrom">
                  Marque os itens que se aplicam a você. Em tabagismo, álcool, drogas, remédios/opioides e atividade
                  física, responda Sim ou Não e, se for Sim, informe a frequência.
                </p>

                {categorias.map((categoria, indice) => (
                  <fieldset key={categoria.nome} className="mb-6 rounded-2xl border border-black/10 bg-fundo-2/40 p-5">
                    <legend className="px-2 font-titulo text-lg text-texto">{categoria.nome}</legend>

                    {/* Hábitos com Sim/Não (só na primeira categoria) */}
                    {indice === 0 && (
                      <div className="mb-3 flex flex-col gap-3">
                        {habitos.map((habito) => (
                          <div key={habito} className="rounded-xl border border-black/10 bg-fundo p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <p id={`habito-${habito}`} className="text-[15px] font-medium text-texto">
                                {habito}
                              </p>
                              <div role="radiogroup" aria-labelledby={`habito-${habito}`} className="flex gap-5">
                                <label className="flex cursor-pointer items-center gap-2 text-sm text-texto">
                                  <input
                                    type="radio"
                                    name={`habito-${habito}`}
                                    onChange={() => responderHabito(habito, true)}
                                    className="h-4 w-4 cursor-pointer accent-primary"
                                  />
                                  Sim
                                </label>
                                <label className="flex cursor-pointer items-center gap-2 text-sm text-texto">
                                  <input
                                    type="radio"
                                    name={`habito-${habito}`}
                                    onChange={() => responderHabito(habito, false)}
                                    className="h-4 w-4 cursor-pointer accent-primary"
                                  />
                                  Não
                                </label>
                              </div>
                            </div>

                            {habitosComSim.includes(habito) && (
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <div>
                                  <label htmlFor={`freq-${habito}`} className="mb-1 block text-xs font-medium text-marrom">
                                    Frequência
                                  </label>
                                  <input id={`freq-${habito}`} type="text" placeholder="Ex: 3x por semana" className={classeDoCampoPequeno} />
                                </div>
                                <div>
                                  <label htmlFor={`obs-${habito}`} className="mb-1 block text-xs font-medium text-marrom">
                                    Observação (opcional)
                                  </label>
                                  <input id={`obs-${habito}`} type="text" className={classeDoCampoPequeno} />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Itens para marcar */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {categoria.itens.map((item) => (
                        <div
                          key={item}
                          className={`rounded-xl border bg-fundo px-4 py-3 transition-colors duration-200 ${
                            itensMarcados.includes(item) ? 'border-primary/60' : 'border-black/10 hover:border-primary/40'
                          }`}
                        >
                          <label className="flex cursor-pointer items-center gap-3 text-sm text-texto">
                            <input
                              type="checkbox"
                              onChange={(e) => marcarItem(item, e.target.checked)}
                              className="h-5 w-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            />
                            {item}
                          </label>
                          {itensMarcados.includes(item) && (
                            <input
                              type="text"
                              aria-label={`Observação sobre ${item} (opcional)`}
                              placeholder="Observação (opcional)"
                              className={`${classeDoCampoPequeno} mt-3`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </fieldset>
                ))}

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
