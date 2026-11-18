import check from '../assets/landing/check.svg'

const beneficios: string[] = [
  'Sofre com dores recorrentes que limitam sua qualidade de vida',
  'Busca alternativas naturais e menos invasivas para o seu tratamento',
  'Deseja melhorar o sono, o humor e o equilíbrio emocional',
  'Quer um acompanhamento especializado e personalizado para você',
  'Prefere atendimento online, no conforto e privacidade do seu lar',
  'Cuida de familiar que precisa de suporte terapêutico contínuo',
  'Tem curiosidade sobre cannabis medicinal e quer entender com segurança',
]

function ParaQuemE() {
  return (
    <section id="para-quem" className="scroll-mt-20 bg-fundo py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-verde-cta">Para Quem É</p>
          <h2 className="mb-7 text-[34px] leading-[1.12] text-escuro md:text-[52px]">
            Este cuidado foi feito
            <br />
            para <i className="text-verde-cta">você</i>
          </h2>
          <p className="mb-8 text-[17px] font-normal leading-[1.75] text-escuro">
            Se você se reconhece em algum destes cenários, a MedPics pode ser o ponto de virada que você estava buscando.
          </p>
          <ul>
            {beneficios.map((beneficio) => (
              <li key={beneficio} className="mb-5 flex items-center gap-4 text-base font-normal text-escuro">
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
            Ainda tem dúvidas se a MedPics é para você?
          </h3>
          <p className="mb-8 text-base font-normal leading-[1.8] text-white">
            Nossa equipe está pronta para ouvir sua história e indicar o melhor caminho terapêutico para o seu caso, sem
            compromisso.
          </p>
          <a
            href="#comece-hoje"
            className="inline-flex items-center gap-2 rounded-full bg-fundo px-8 py-3.5 text-[15px] font-semibold text-escuro transition-all duration-300 hover:-translate-y-0.5 hover:bg-fundo hover:text-verde-cta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundo active:translate-y-0"
          >
            💬 Fale com a gente
          </a>
        </div>
      </div>
    </section>
  )
}

export default ParaQuemE
