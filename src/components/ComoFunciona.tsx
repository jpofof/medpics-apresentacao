interface Passo {
  numero: string
  titulo: string
  descricao: string
}

const passos: Passo[] = [
  { numero: '01', titulo: 'Crie sua conta', descricao: 'Cadastro rápido e gratuito. Acesse a plataforma de qualquer dispositivo.' },
  { numero: '02', titulo: 'Agende sua avaliação', descricao: 'Escolha o melhor horário para sua primeira consulta com nossos especialistas.' },
  { numero: '03', titulo: 'Receba seu plano', descricao: 'Um plano terapêutico construído especialmente para as suas necessidades.' },
  { numero: '04', titulo: 'Inicie o acompanhamento', descricao: 'Acompanhamento contínuo com ajustes semanais para maximizar seus resultados.' },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-fundo-2 py-16 text-center md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-verde-medio">Como funciona</p>
        <h2 className="font-titulo text-[34px] font-normal leading-[1.15] text-texto md:text-[48px]">
          Simples, seguro e
          <br />
          <em className="text-primary">inteiramente online</em>
        </h2>
        <p className="mb-14 mt-5 text-[15px] font-light text-verde-medio">
          Em poucos passos, você começa uma jornada de cuidado personalizada.
        </p>

        <div className="relative mb-12">
          {/* Linha que liga os círculos (só aparece em telas grandes) */}
          <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-[35px] hidden h-px bg-verde-suave/70 md:block" />
          <ol className="relative flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center md:gap-5">
            {passos.map((passo) => (
              <li key={passo.numero} className="flex w-full max-w-64 flex-col items-center md:w-52">
                <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-full border-[1.5px] border-verde-suave bg-fundo transition-all duration-300 hover:scale-105 hover:border-primary">
                  <span className="font-titulo text-xl text-texto">{passo.numero}</span>
                </div>
                <p className="mb-2.5 text-[15px] font-medium text-texto">{passo.titulo}</p>
                <p className="max-w-44 text-[13.5px] font-light leading-relaxed text-verde-medio">{passo.descricao}</p>
              </li>
            ))}
          </ol>
        </div>

        <a
          href="#comece-hoje"
          className="inline-flex h-[50px] items-center gap-2 rounded-full bg-primary px-9 text-[15px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-texto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-0"
        >
          Começar agora →
        </a>
      </div>
    </section>
  )
}

export default ComoFunciona
