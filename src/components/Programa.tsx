import integrativoSemanal from '../assets/landing/integrativo-semanal.webp'
import praticasIntegrativas from '../assets/landing/praticas-integrativas.webp'
import acompanhamentoSemana from '../assets/landing/acompanhamento-semana.webp'

interface ProgramaItem {
  imagem: string
  titulo: string
  descricao: string
}

const programas: ProgramaItem[] = [
  {
    imagem: integrativoSemanal,
    titulo: 'Acompanhamento Integrativo Semanal',
    descricao: 'Sessões individuais de meditação, acupuntura e fitoterapia.',
  },
  {
    imagem: praticasIntegrativas,
    titulo: 'Práticas Integrativas Individuais',
    // TEXTO PROVISÓRIO: a clínica ainda vai confirmar
    descricao: 'Atendimento individual com terapeutas especializados em práticas integrativas.',
  },
  {
    imagem: acompanhamentoSemana,
    titulo: 'Acompanhamento Semanal Cannabis Medicinal',
    descricao: 'Acompanhamento semanal com ajuste de dosagem.',
  },
]

function Programa() {
  return (
    <section id="programa" className="scroll-mt-20 bg-fundo py-16 text-center md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="mb-3.5 text-titulo font-normal text-escuro md:text-titulo-grande">
          Programa de Acompanhamento Terapêutico
        </h2>
        <p className="mx-auto mb-11 max-w-[60ch] text-corpo font-normal text-escuro">
          Um programa com estratégias personalizadas para mais autonomia, equilíbrio emocional e qualidade de vida.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programas.map((programa) => (
            <article
              key={programa.titulo}
              style={{ backgroundImage: `url(${programa.imagem})` }}
              className="relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[18px] bg-cover bg-center text-left"
            >
              {/* Camada escura sobre a foto, para o texto ficar sempre legível */}
              <div className="absolute inset-0 bg-linear-to-t from-escuro via-escuro/90 to-escuro/30" />

              <div className="relative px-6 pb-7 pt-24">
                <p className="mb-3 text-corpo font-bold leading-snug text-fundo">{programa.titulo}</p>
                <p className="mb-5 text-corpo font-normal text-fundo">{programa.descricao}</p>
                <a
                  href="#comece-hoje"
                  className="inline-flex min-h-14 items-center rounded-full bg-fundo px-6 text-botao font-semibold text-escuro transition-colors duration-300 hover:bg-bege focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundo"
                >
                  Saiba mais
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
