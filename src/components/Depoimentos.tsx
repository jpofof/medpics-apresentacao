import estrelas from '../assets/landing/estrelas.svg'

interface Depoimento {
  texto: string
  nome: string
  condicao: string
}

const depoimentos: Depoimento[] = [
  {
    texto:
      'Conhecer a MedPics e o canabidiol mudou a minha vida. Hoje sei o que é ter qualidade de vida. Eternamente grata!',
    nome: 'Vitória Gerevini',
    condicao: 'Paciente — Ansiedade',
  },
  {
    texto:
      'Sofria de enxaquecas há 30 anos. Já faz 3 meses sem nem dor de cabeça. Outra vida! Indico a todos.',
    nome: 'Carolina Teller',
    condicao: 'Paciente — Enxaqueca Crônica',
  },
  {
    texto:
      'A Dra. Adriana é simplesmente maravilhosa, muito dedicada e faz tudo com amor. Sou pura gratidão pela MedPics.',
    nome: 'Cíntia Caveden',
    condicao: 'Filha de Paciente — Dor Crônica',
  },
]

function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-20 bg-bege py-16 text-center md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="mb-4 text-pequeno font-bold uppercase tracking-[0.2em] text-verde-cta">Depoimentos</p>
        <h2 className="text-titulo font-normal leading-[1.15] text-escuro md:text-titulo-grande">
          Vidas que já foram
          <br />
          <span className="italic text-verde-cta">transformadas</span>
        </h2>
        <p className="mb-14 mt-5 text-corpo font-normal text-escuro">
          Histórias reais de pacientes.
        </p>

        <div className="grid gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((depoimento) => (
            <figure
              key={depoimento.nome}
              className="flex flex-col justify-between rounded-[18px] bg-fundo px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-escuro/10"
            >
              <img src={estrelas} alt="5 estrelas" className="mb-5 self-start" />
              <blockquote className="mb-7 grow text-corpo italic text-escuro">
                "{depoimento.texto}"
              </blockquote>
              <figcaption className="flex items-center gap-3.5">
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-verde-medio bg-bege text-[17px] text-escuro">
                  {depoimento.nome[0]}
                </div>
                <div>
                  <p className="text-pequeno font-bold text-escuro">{depoimento.nome}</p>
                  <p className="text-pequeno font-normal text-marrom">{depoimento.condicao}</p>
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
