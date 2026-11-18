import { Link } from 'react-router-dom'
import usuarioIcone from '../assets/landing/usuario.svg'
import balaoIcone from '../assets/landing/balao.svg'
import cadastroIcone from '../assets/landing/cadastro.svg'
import atendimentoIcone from '../assets/landing/atendimento.svg'
import especialistasIcone from '../assets/landing/especialistas.svg'
import acompanhamentoIcone from '../assets/landing/acompanhamento.svg'

interface Selo {
  icone: string
  texto: string
}

const selos: Selo[] = [
  { icone: cadastroIcone, texto: 'Cadastro gratuito e seguro' },
  { icone: atendimentoIcone, texto: 'Atendimento 100% online' },
  { icone: especialistasIcone, texto: 'Especialistas certificados' },
  { icone: acompanhamentoIcone, texto: 'Acompanhamento contínuo' },
]

function ComeceHoje() {
  return (
    <section
      id="comece-hoje"
      className="scroll-mt-20 bg-verde-cta py-20 text-center md:py-28"
    >
      <div className="mx-auto max-w-4xl px-5">
        <p className="mb-6 text-[11.5px] uppercase tracking-[0.22em] text-white">Comece hoje</p>
        <h2 className="mb-6 text-[clamp(2.2rem,5vw,3.4rem)] font-normal leading-[1.18] text-white">
          Sua transformação começa com
          <br />
          um <em className="text-white">primeiro passo</em>
        </h2>
        <p className="mx-auto mb-11 max-w-xl text-[15.5px] font-normal leading-relaxed text-white">
          Junte-se aos pacientes que encontraram equilíbrio, alívio e qualidade de vida com o acompanhamento
          especializado da MedPics.
        </p>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/cadastro"
            className="inline-flex items-center gap-2 rounded-full bg-fundo px-8 py-3.5 text-[15px] font-semibold text-escuro shadow-lg shadow-escuro/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-fundo hover:text-verde-cta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundo active:translate-y-0"
          >
            <img src={usuarioIcone} alt="" className="h-[17px] w-[17px]" />
            Criar minha conta gratuitamente
          </Link>
          <a
            href="#para-quem"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-fundo/45 px-8 py-3.5 text-[15px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-fundo/85 hover:bg-fundo/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundo active:translate-y-0"
          >
            <img src={balaoIcone} alt="" className="h-[17px] w-[17px]" />
            Falar com especialista
          </a>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {selos.map((selo) => (
            <li key={selo.texto} className="inline-flex items-center gap-2 text-[13px] font-normal text-white">
              <img src={selo.icone} alt="" className="h-4 w-4 opacity-65" />
              {selo.texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ComeceHoje
