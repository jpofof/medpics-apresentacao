import BotoesDaPagina from '../components/BotoesDaPagina'
import ListaDeCondicoes from '../components/ListaDeCondicoes'
import PaginaPublica from '../components/PaginaPublica'

// TEXTO PROVISÓRIO: confirmar com a clínica
// Base: site atual da clínica (medpics.com.br), reescrito em frases curtas. Os passos vêm do programa terapêutico do site.
const passos = [
  { titulo: 'Consulta inicial', texto: 'Avaliação individual com médico ou odontólogo especialista em cannabis medicinal.' },
  { titulo: 'Indicação médica', texto: 'O profissional define o melhor caminho para as necessidades de cada pessoa.' },
  { titulo: 'Acompanhamento semanal', texto: 'A equipe acompanha sua evolução e esclarece dúvidas ao longo do tempo.' },
  { titulo: 'Apoio online', texto: 'Você conta com atendimento online sempre que precisar.' },
]

function CannabisMedicinalPagina() {
  return (
    <PaginaPublica>
      <section className="bg-fundo py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="mb-6 text-titulo font-semibold text-escuro md:text-titulo-grande">Cannabis Medicinal</h1>
          <p className="max-w-[60ch] text-corpo text-escuro">
            É o uso terapêutico da planta Cannabis sativa, com indicação e acompanhamento de médicos especializados.
          </p>
        </div>
      </section>

      <section className="bg-bege py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="mb-8 text-titulo font-normal text-escuro md:text-titulo-grande">Como funciona o acompanhamento</h2>
          <ol className="flex flex-col gap-4">
            {passos.map((passo, indice) => (
              <li key={passo.titulo} className="rounded-3xl border-2 border-verde-medio bg-fundo p-6">
                <p className="mb-2 text-corpo font-bold text-escuro">
                  {indice + 1}. {passo.titulo}
                </p>
                <p className="max-w-[60ch] text-corpo text-escuro">{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-fundo py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="mb-8 text-titulo font-normal text-escuro md:text-titulo-grande">Condições acompanhadas</h2>
          <ListaDeCondicoes />
        </div>
      </section>

      <section className="bg-bege py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <p className="mb-8 max-w-[60ch] text-corpo font-bold text-escuro">
            Cada caso é avaliado individualmente por um profissional habilitado.
          </p>
          <BotoesDaPagina />
        </div>
      </section>
    </PaginaPublica>
  )
}

export default CannabisMedicinalPagina
