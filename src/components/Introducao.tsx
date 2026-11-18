import { useState } from 'react'
import imagem from '../assets/landing/veacos.png'

// No projeto antigo as 3 imagens do carrossel eram a mesma foto
const slides: string[] = [imagem, imagem, imagem]

function Introducao() {
  const [slideAtual, setSlideAtual] = useState(0)

  function anterior() {
    setSlideAtual(slideAtual === 0 ? slides.length - 1 : slideAtual - 1)
  }

  function proximo() {
    setSlideAtual(slideAtual === slides.length - 1 ? 0 : slideAtual + 1)
  }

  const botaoSeta =
    'absolute top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-escuro/30 px-3 py-2 text-xl text-fundo transition-colors duration-200 hover:bg-escuro hover:text-fundo/50 focus-visible:outline-2 focus-visible:outline-fundo active:bg-escuro/60'

  return (
    <section id="introducao" className="scroll-mt-20 bg-fundo py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="text-pequeno font-bold uppercase tracking-[0.12em] text-marrom">
            Saúde Integrativa · Online · Humanizada
          </p>
          <h1 className="text-titulo font-semibold leading-[1.18] text-escuro md:text-titulo-grande">
            Transforme sua
            <br />
            relação com a <span className="italic text-verde-cta">saúde</span>
          </h1>
          <p className="max-w-[60ch] text-corpo font-normal text-marrom">
            Cannabis medicinal e práticas integrativas, com atendimento 100% online, onde você estiver.
          </p>
          <div>
            <a
              href="#comece-hoje"
              className="inline-flex min-h-14 items-center rounded-full bg-verde-cta px-8 text-botao font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-escuro hover:text-fundo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta active:translate-y-0"
            >
              Conhecer Tratamentos
            </a>
          </div>
        </div>

        <div className="relative h-[360px] overflow-hidden rounded-3xl md:h-[460px]">
          <img src={slides[slideAtual]} alt="" className="h-full w-full object-cover" />

          <button type="button" aria-label="Imagem anterior" onClick={anterior} className={`${botaoSeta} left-3`}>
            ‹
          </button>
          <button type="button" aria-label="Próxima imagem" onClick={proximo} className={`${botaoSeta} right-3`}>
            ›
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, indice) => (
              <button
                key={indice}
                type="button"
                aria-label={`Ir para a imagem ${indice + 1}`}
                onClick={() => setSlideAtual(indice)}
                className="group flex h-11 w-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-fundo"
              >
                <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${indice === slideAtual ? 'bg-fundo' : 'bg-fundo/50 group-hover:bg-fundo/80'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introducao
