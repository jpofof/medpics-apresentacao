import estrelas from '../assets/landing/estrelas.svg'

interface Depoimento {
  texto: string
  nome: string
  condicao: string
}

const depoimentos: Depoimento[] = [
  {
    texto:
      'Conhecer a MedPics e o canabidiol mudou a minha vida. Sempre convivi com a ansiedade, mas após o início do tratamento, consegui enfrentar situações que antes causavam crises. Hoje sei o que é ter qualidade de vida. Eternamente grata!',
    nome: 'Vitória Gerevini',
    condicao: 'Paciente — Ansiedade',
  },
  {
    texto:
      'Sofria de enxaquecas há 30 anos, com quedas de pressão e vômitos. Após iniciar o óleo de cannabis indicado pela Dra. Adriana, as crises foram diminuindo. Já faz 3 meses sem nem dor de cabeça. Outra vida! Indico a todos.',
    nome: 'Carolina Teller',
    condicao: 'Paciente — Enxaqueca Crônica',
  },
  {
    texto:
      'A Dra. Adriana é simplesmente maravilhosa, muito dedicada e faz tudo com amor. Minha mãe iniciou o tratamento para dor crônica e a melhora é visível — as dores diminuíram muito! Sou pura gratidão pela MedPics.',
    nome: 'Cíntia Caveden',
    condicao: 'Filha de Paciente — Dor Crônica',
  },
]

function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-20 bg-fundo-2 py-16 text-center md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-verde-medio">Depoimentos</p>
        <h2 className="font-titulo text-[34px] font-normal leading-[1.15] text-texto md:text-[48px]">
          Vidas que já foram
          <br />
          <span className="italic text-primary">transformadas</span>
        </h2>
        <p className="mb-14 mt-5 text-[15px] font-light text-verde-medio">
          Histórias reais de pacientes que confiaram na MedPics.
        </p>

        <div className="grid gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((depoimento) => (
            <figure
              key={depoimento.nome}
              className="flex flex-col justify-between rounded-[18px] bg-fundo px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(62,74,63,0.1)]"
            >
              <img src={estrelas} alt="5 estrelas" className="mb-5 self-start" />
              <blockquote className="mb-7 grow text-[15px] italic leading-[1.75] text-texto">
                "{depoimento.texto}"
              </blockquote>
              <figcaption className="flex items-center gap-3.5">
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-verde-medio bg-fundo-2 font-titulo text-[17px] text-texto">
                  {depoimento.nome[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-texto">{depoimento.nome}</p>
                  <p className="text-xs font-light text-verde-medio">{depoimento.condicao}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Depoimentos
