import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import Campo from '../components/Campo'
import Footer from '../components/Footer'
import PainelLateral from '../components/PainelLateral'
import TituloDaSecao from '../components/TituloDaSecao'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

interface CadastroProfissionalProps {
  perfil: string // "Médico", "Dentista" ou "Terapeuta" (vem da rota)
}

// Cadastro de médico, dentista ou terapeuta. Versão de apresentação: nada é salvo; ao enviar, vai para o login.
function CadastroProfissional({ perfil }: CadastroProfissionalProps) {
  const navigate = useNavigate()

  // O nome do registro muda conforme o perfil
  let rotuloDoRegistro = 'Número de registro no conselho'
  if (perfil === 'Médico') rotuloDoRegistro = 'CRM'
  if (perfil === 'Dentista') rotuloDoRegistro = 'CRO'

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[1fr_3fr]">
          <PainelLateral
            corFundo="bg-texto"
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
              <Link to="/cadastro" className="mb-4 inline-block text-sm text-marrom hover:text-primary hover:underline">
                ← Escolher outro perfil
              </Link>
              <h2 className="mb-2 font-titulo text-[40px] leading-tight text-primary">Cadastro: {perfil}</h2>
              <p className="mb-8 text-sm text-marrom">
                Preencha seus dados. O cadastro fica aguardando a aprovação do administrador.
              </p>

              <form
                noValidate
                onSubmit={(evento) => {
                  evento.preventDefault()
                  navigate('/login')
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

                <TituloDaSecao comEspacoAcima>Dados profissionais</TituloDaSecao>
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Campo id="registro" rotulo={rotuloDoRegistro} placeholder="Ex: 123456" />
                  <Campo id="especialidade" rotulo="Especialidade" placeholder="Ex: Neurologia" />
                  <Campo id="duracao" rotulo="Duração de cada consulta (minutos)" tipo="number" placeholder="Ex: 30" />
                </div>

                {/* Dados extras só do terapeuta */}
                {perfil === 'Terapeuta' && (
                  <>
                    <div className="grid gap-x-5 sm:grid-cols-2">
                      <Campo id="conselho" rotulo="Conselho profissional" placeholder="Ex: CRP, CREFITO" />
                      <Campo id="graduacao" rotulo="Graduação" placeholder="Ex: Psicologia" />
                      <Campo id="areaAtuacao" rotulo="Área de atuação" placeholder="Ex: Ansiedade e Depressão" />
                      <Campo id="posGraduacao" rotulo="Pós-graduação (se houver)" />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="formacoes" className="mb-2 block text-sm font-medium text-marrom">
                        Formações complementares (se houver)
                      </label>
                      <textarea
                        id="formacoes"
                        rows={4}
                        className="w-full rounded-xl border-[1.5px] border-borda bg-fundo px-4 py-3 text-sm text-texto transition-colors duration-200 placeholder:text-[#b8b0a4] hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-suave/60"
                      />
                    </div>
                  </>
                )}

                <TituloDaSecao comEspacoAcima>Acesso ao sistema</TituloDaSecao>
                <Campo id="email" rotulo="Email" placeholder="seu@email.com" />
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Campo id="senha" rotulo="Senha" tipo="password" placeholder="Mínimo 8 caracteres" />
                  <Campo id="confirmarSenha" rotulo="Confirmar senha" tipo="password" placeholder="Repita a senha" />
                </div>

                <Botao enviar larguraTotal>
                  Enviar cadastro
                </Botao>
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

export default CadastroProfissional
