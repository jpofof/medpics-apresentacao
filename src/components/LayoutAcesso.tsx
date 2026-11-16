import type { ReactNode } from 'react'
import Footer from './Footer'
import PainelLateral from './PainelLateral'
import checkIcone from '../assets/check-cadastro.svg'
import cadeadoIcone from '../assets/cadeado.svg'
import celularIcone from '../assets/celular.svg'

interface LayoutAcessoProps {
  titulo: string
  subtitulo: string
  children: ReactNode
}

// Moldura das telas de acesso simples (esqueci minha senha, redefinir senha): painel lateral + conteúdo
function LayoutAcesso({ titulo, subtitulo, children }: LayoutAcessoProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[1fr_3fr]">
          <PainelLateral
            corFundo="bg-marrom"
            titulo="Recupere seu acesso"
            texto="Informe o e-mail da sua conta e crie uma nova senha."
            beneficios={[
              { icone: checkIcone, texto: 'Processo rápido e simples' },
              { icone: cadeadoIcone, texto: 'Seus dados protegidos e sigilosos' },
              { icone: celularIcone, texto: 'Acesso de qualquer dispositivo' },
            ]}
            rodape="A medicina humanizada e a tecnologia a favor do bem-estar."
          />
          <section className="flex items-center bg-fundo">
            <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-12 lg:py-16">
              <h2 className="mb-2 font-titulo text-[40px] leading-tight text-primary">{titulo}</h2>
              <p className="mb-8 text-sm text-marrom">{subtitulo}</p>
              {children}
            </div>
          </section>
        </div>
      </main>
      <Footer compacto />
    </div>
  )
}

export default LayoutAcesso
