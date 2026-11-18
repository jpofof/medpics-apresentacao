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
    <section id="cannabis" className="scroll-mt-20 bg-bege py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <p className="mb-4 text-pequeno font-bold uppercase tracking-[0.2em] text-verde-cta">Cannabis Medicinal</p>
          <h2 className="mb-7 text-titulo font-normal leading-[1.15] text-escuro md:text-titulo-grande">
            Uma nova
            <br />
            perspectiva para
            <br />
            <span className="italic text-verde-cta">sua saúde</span>
          </h2>
          <p className="mb-5 max-w-[60ch] text-corpo font-normal text-escuro">
            A cannabis medicinal é regulamentada pela ANVISA. Seus compostos atuam no sistema endocanabinoide, que ajuda a
            manter o equilíbrio do corpo.
          </p>
          <p className="mb-5 max-w-[60ch] text-corpo font-normal text-escuro">
            Na MedPics, o tratamento é individualizado, com médicos especializados em Canabinologia e acompanhamento seguro.
          </p>
          <blockquote className="mt-6 border-l-2 border-verde-medio pl-5">
            <p className="max-w-[60ch] text-corpo italic text-marrom">"O sistema canabinoide ajuda a regular sono, humor e dor."</p>
          </blockquote>
        </div>

        <div>
          <p className="mb-5 text-pequeno font-bold uppercase tracking-[0.2em] text-verde-cta">Condições acompanhadas</p>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {condicoes.map((condicao) => (
              <div
                key={condicao.nome}
                className="flex items-center gap-3.5 rounded-3xl border border-transparent bg-fundo px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-escuro"
              >
                <img src={condicao.icone} alt="" className="h-10 w-10 shrink-0" />
                <p className="text-pequeno text-escuro">{condicao.nome}</p>
              </div>
            ))}
          </div>
          <a
            href="#programa"
            className="inline-flex h-[50px] items-center rounded-full border border-verde-medio px-8 text-pequeno text-escuro transition-colors duration-300 hover:border-verde-cta hover:bg-verde-cta hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta active:bg-escuro"
          >
            Ver todas as condições
          </a>
        </div>
      </div>
    </section>
  )
}

export default CannabisMedicinal
