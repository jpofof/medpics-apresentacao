interface Passo {
  numero: string
  titulo: string
  descricao: string
}

const passos: Passo[] = [
  { numero: '01', titulo: 'Crie sua conta', descricao: 'Cadastro rápido e gratuito, de qualquer dispositivo.' },
  { numero: '02', titulo: 'Agende a avaliação', descricao: 'Escolha o melhor horário para sua primeira consulta.' },
  { numero: '03', titulo: 'Receba seu plano', descricao: 'Um plano feito para as suas necessidades.' },
  { numero: '04', titulo: 'Inicie o acompanhamento', descricao: 'Acompanhamento contínuo, com ajustes semanais.' },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-bege py-16 text-center md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="mb-4 text-pequeno font-bold uppercase tracking-[0.2em] text-verde-cta">Como funciona</p>
        <h2 className="text-titulo font-normal leading-[1.15] text-escuro md:text-titulo-grande">
          Simples, seguro e
          <br />
          <em className="text-verde-cta">online</em>
        </h2>
        <p className="mx-auto mb-14 mt-5 max-w-[60ch] text-corpo font-normal text-escuro">
          Em poucos passos, você começa seu cuidado.
        </p>

        <div className="relative mb-12">
          {/* Linha que liga os círculos (só aparece em telas grandes) */}
          <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-[35px] hidden h-px bg-verde-leve/70 lg:block" />
          <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {passos.map((passo) => (
              <li key={passo.numero} className="mx-auto flex w-full max-w-72 flex-col items-center">
                <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-full border-[1.5px] border-verde-leve bg-fundo transition-all duration-300 hover:scale-105 hover:border-verde-cta">
                  <span className="text-xl font-bold text-escuro">{passo.numero}</span>
                </div>
                <p className="mb-2.5 text-corpo font-bold text-escuro">{passo.titulo}</p>
                <p className="text-corpo font-normal text-escuro">{passo.descricao}</p>
              </li>
            ))}
          </ol>
        </div>

        <a
          href="#comece-hoje"
          className="inline-flex min-h-14 items-center gap-2 rounded-full bg-verde-cta px-9 text-botao font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-escuro hover:text-fundo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta active:translate-y-0"
        >
          Começar agora →
        </a>
      </div>
    </section>
  )
}

export default ComoFunciona
