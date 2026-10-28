import integrativoSemanal from '../assets/landing/integrativo-semanal.webp'
import praticasIntegrativas from '../assets/landing/praticas-integrativas.webp'
import acompanhamentoSemana from '../assets/landing/acompanhamento-semana.webp'

interface ProgramaItem {
  imagem: string
  titulo: string
  rotuloHover: string
  descricao: string
}

const programas: ProgramaItem[] = [
  {
    imagem: integrativoSemanal,
    titulo: 'Acompanhamento Integrativo Semanal',
    rotuloHover: 'Acompanhamento Integrativo',
    descricao:
      'Sessões individuais de práticas integrativas como meditação, acupuntura e fitoterapia para equilíbrio mente-corpo.',
  },
  {
    imagem: praticasIntegrativas,
    titulo: 'Práticas Integrativas Individuais',
    rotuloHover: 'Práticas Integrativas',
    descricao:
      'Sessões individuais de práticas integrativas como meditação, acupuntura e fitoterapia para equilíbrio mente-corpo.',
  },
  {
    imagem: acompanhamentoSemana,
    titulo: 'Acompanhamento Semanal Cannabis Medicinal',
    rotuloHover: 'Cannabis Medicinal',
    descricao:
      'Monitoramento semanal do tratamento com cannabis medicinal, ajuste de dosagem e acompanhamento clínico contínuo.',
  },
]

function Programa() {
  return (
    <section id="programa" className="scroll-mt-20 bg-fundo py-16 text-center md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-3.5 font-titulo text-[30px] font-normal text-texto md:text-[40px]">
          Programa de Acompanhamento Terapêutico
        </h2>
        <p className="mx-auto mb-11 max-w-2xl text-[16.5px] font-light text-primary">
          Um programa estruturado com estratégias personalizadas para promover autonomia, equilíbrio emocional e uma melhor
          qualidade de vida.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programas.map((programa) => (
            <article
              key={programa.titulo}
              tabIndex={0}
              style={{ backgroundImage: `url(${programa.imagem})` }}
              className="group relative h-[440px] overflow-hidden rounded-[18px] bg-cover bg-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {/* Camada escura sobre a foto: fica mais forte no hover */}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-[#1e2d20]/90 via-[#1e2d20]/10 to-transparent transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0" />
              <div className="absolute inset-0 z-10 bg-linear-to-t from-[#1e2d20]/95 via-[#1e2d20]/75 to-[#1e2d20]/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-7 pt-6 text-left transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-0 group-focus-visible:opacity-0">
                <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-verde-suave">Programa</p>
                <p className="font-titulo text-[19px] font-medium uppercase leading-snug tracking-wide text-white">
                  {programa.titulo}
                </p>
              </div>

              <div className="absolute inset-0 z-30 flex translate-y-4 flex-col items-center justify-center px-8 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <p className="mb-3.5 text-[9px] font-medium uppercase tracking-[0.18em] text-verde-suave">
                  {programa.rotuloHover}
                </p>
                <p className="mb-7 text-[14.5px] font-light leading-[1.7] text-white">{programa.descricao}</p>
                <a
                  href="#comece-hoje"
                  className="inline-flex h-11 items-center rounded-full border border-white/40 bg-white/15 px-6 text-[13px] text-white transition-colors duration-300 hover:border-white/70 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white"
                >
                  Ver mais informações
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programa
