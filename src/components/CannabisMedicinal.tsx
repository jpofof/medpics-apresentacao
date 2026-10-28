import ansiedade from '../assets/landing/ansiedade.svg'
import insonia from '../assets/landing/insonia.svg'
import dorCronica from '../assets/landing/dor_cronica.svg'
import fibromialgia from '../assets/landing/fibromialgia.svg'
import tdah from '../assets/landing/TDAH.svg'
import autismo from '../assets/landing/autismo.svg'
import depressao from '../assets/landing/depressao.svg'
import enxaqueca from '../assets/landing/enxaqueca.svg'

interface Condicao {
  nome: string
  icone: string
}

const condicoes: Condicao[] = [
  { nome: 'Ansiedade e Estresse', icone: ansiedade },
  { nome: 'Insônia e Sono', icone: insonia },
  { nome: 'Dor Crônica', icone: dorCronica },
  { nome: 'Fibromialgia', icone: fibromialgia },
  { nome: 'TDAH e TOC', icone: tdah },
  { nome: 'Autismo (TEA)', icone: autismo },
  { nome: 'Depressão', icone: depressao },
  { nome: 'Enxaqueca', icone: enxaqueca },
]

function CannabisMedicinal() {
  return (
    <section id="cannabis" className="scroll-mt-20 bg-fundo-2 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-verde-medio">Cannabis Medicinal</p>
          <h2 className="mb-7 font-titulo text-[34px] font-normal leading-[1.15] text-texto md:text-[48px]">
            Uma nova
            <br />
            perspectiva para
            <br />
            <span className="italic text-primary">sua saúde</span>
          </h2>
          <p className="mb-5 text-base font-light leading-[1.75] text-texto">
            A cannabis medicinal é uma abordagem terapêutica reconhecida pela ciência e regulamentada pela ANVISA. Seus
            compostos naturais interagem com o sistema endocanabinoide do organismo, ajudando a restaurar o equilíbrio e o
            bem-estar.
          </p>
          <p className="mb-5 text-base font-light leading-[1.75] text-texto">
            Na MedPics, o tratamento é sempre individualizado, conduzido por médicos especializados em Canabinologia, com
            acompanhamento seguro e ajuste contínuo de dosagem.
          </p>
          <blockquote className="mt-6 border-l-2 border-verde-medio pl-5">
            <p className="text-base italic leading-[1.75] text-marrom">
              "O sistema canabinoide regula funções essenciais como sono, humor, dor e resposta imune — a cannabis
              medicinal atua diretamente nesse sistema para restaurar o equilíbrio."
            </p>
          </blockquote>
        </div>

        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-verde-medio">Condições Tratadas</p>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {condicoes.map((condicao) => (
              <div
                key={condicao.nome}
                className="flex items-center gap-3.5 rounded-3xl border border-transparent bg-fundo px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-texto"
              >
                <img src={condicao.icone} alt="" className="h-10 w-10 shrink-0" />
                <p className="text-[15px] text-texto">{condicao.nome}</p>
              </div>
            ))}
          </div>
          <a
            href="#programa"
            className="inline-flex h-[50px] items-center rounded-full border border-verde-medio px-8 text-[15px] text-texto transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-texto"
          >
            Ver todos os tratamentos
          </a>
        </div>
      </div>
    </section>
  )
}

export default CannabisMedicinal
