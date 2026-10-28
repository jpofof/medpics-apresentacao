import { Link } from 'react-router-dom'
import BotaoLink from '../components/BotaoLink'
import logo from '../assets/medpics-logo.png'
import folha from '../assets/icones/icon-folha.svg'

// Tela de médico, dentista, terapeuta e administrador nesta versão de apresentação
function PainelEmDesenvolvimento() {
  return (
    <div className="flex min-h-screen flex-col bg-fundo-2">
      <header className="border-b-2 border-borda-nav bg-fundo">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <img src={logo} alt="MedPics" className="max-h-[48px]" />
          <Link
            to="/login"
            className="rounded-xl border border-black/10 bg-white px-5 py-3 text-base font-medium text-primary transition-colors duration-200 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-texto"
          >
            Sair
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <section className="w-full max-w-xl rounded-2xl border border-black/10 bg-fundo p-8 text-center sm:p-12">
          <img src={folha} alt="" className="mx-auto mb-4 h-10 w-10" />
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-verde-medio">Profissional</p>
          <h1 className="mb-3 font-titulo text-[32px] leading-tight text-texto sm:text-[40px]">Olá, Dra. Helena</h1>
          <h2 className="mb-4 font-titulo text-2xl text-primary">Painel em desenvolvimento</h2>
          <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-marrom">
            Estamos finalizando as ferramentas para a sua rotina: agenda, disponibilidade, histórico e relatórios. Em
            breve você terá tudo por aqui.
          </p>

          <BotaoLink para="/">Voltar ao site</BotaoLink>
        </section>
      </main>
    </div>
  )
}

export default PainelEmDesenvolvimento
