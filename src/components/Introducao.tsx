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
    'absolute top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-xl text-white transition-colors duration-200 hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-white active:bg-black/60'

  return (
    <section id="introducao" className="scroll-mt-20 bg-fundo py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-marrom">
            Saúde Integrativa · Online · Humanizada
          </p>
          <h1 className="font-titulo text-[34px] font-medium leading-[1.18] text-black md:text-[48px]">
            Transforme sua
            <br />
            relação com a <span className="italic text-primary">saúde</span>
          </h1>
          <p className="text-[17px] font-light leading-relaxed text-marrom">
            Cannabis Medicinal e Práticas Integrativas — atendimento 100% online, com médicos certificados em
            Canabinologia e terapeutas especializados em PICS, onde você estiver.
          </p>
          <div>
            <a
              href="#comece-hoje"
              className="inline-flex h-[52px] items-center rounded-full bg-primary px-8 text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-texto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-0"
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
                className="group flex h-11 w-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-white"
              >
                <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${indice === slideAtual ? 'bg-white' : 'bg-white/50 group-hover:bg-white/80'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introducao
