import BotaoLink from '../components/BotaoLink'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Página 404: aparece quando o endereço não existe
function NaoEncontrada() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
          <p className="mb-2 text-[72px] leading-none text-verde-cta">404</p>
          <h1 className="mb-3 text-3xl text-escuro">Página não encontrada</h1>
          <p className="mb-8 text-pequeno text-marrom">O endereço que você tentou abrir não existe ou foi movido.</p>
          <BotaoLink para="/">Voltar ao início</BotaoLink>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default NaoEncontrada
