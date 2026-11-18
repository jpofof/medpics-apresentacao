import check from '../assets/landing/check.svg'

const beneficios: string[] = [
  'Sente dores que atrapalham o dia a dia',
  'Busca alternativas naturais e menos invasivas',
  'Quer melhorar o sono e o humor',
  'Quer acompanhamento personalizado',
  'Prefere atendimento online, de casa',
  'Cuida de familiar que precisa de apoio contínuo',
  'Tem curiosidade sobre cannabis medicinal',
]

function ParaQuemE() {
  return (
    <section id="para-quem-e" className="scroll-mt-20 bg-fundo py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div>
          <p className="mb-5 text-pequeno font-bold uppercase tracking-[0.2em] text-verde-cta">Para Quem É</p>
          <h2 className="mb-7 text-titulo leading-[1.12] text-escuro md:text-titulo-grande">
            Este cuidado foi feito
            <br />
            para <i className="text-verde-cta">você</i>
          </h2>
          <p className="mb-8 max-w-[60ch] text-corpo font-normal text-escuro">
            Se você se identifica com algum destes casos, a MedPics pode ajudar.
          </p>
          <ul>
            {beneficios.map((beneficio) => (
              <li key={beneficio} className="mb-5 flex items-center gap-4 text-corpo font-normal text-escuro">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bege">
                  <img src={check} alt="" />
                </span>
                {beneficio}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[32px] bg-verde-cta p-8 text-white shadow-xl shadow-escuro/20 md:p-12">
          <h3 className="mb-6 text-[30px] leading-tight text-white md:text-[36px]">
            Ficou com dúvidas?
          </h3>
          <p className="mb-8 max-w-[60ch] text-corpo font-normal text-white">
            Nossa equipe ouve sua história e indica o melhor caminho, sem compromisso.
          </p>
          <a
            href="#comece-hoje"
            className="inline-flex min-h-14 items-center gap-2 rounded-full bg-fundo px-8 py-3.5 text-botao font-semibold text-escuro transition-all duration-300 hover:-translate-y-0.5 hover:bg-fundo hover:text-verde-cta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundo active:translate-y-0"
          >
            💬 Fale com a gente
          </a>
        </div>
      </div>
    </section>
  )
}

export default ParaQuemE
