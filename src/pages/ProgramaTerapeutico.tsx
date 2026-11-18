import BotoesDaPagina from '../components/BotoesDaPagina'
import PaginaPublica from '../components/PaginaPublica'
import { programas } from '../conteudo/programa'

// TEXTO PROVISÓRIO: confirmar com a clínica
// Os cartões vêm de src/conteudo/programa.ts (os mesmos da página inicial). Os textos a mais vêm do site atual, reescritos.
function ProgramaTerapeutico() {
  return (
    <PaginaPublica>
      <section className="bg-fundo py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="mb-6 text-titulo font-semibold text-escuro md:text-titulo-grande">Programa Terapêutico</h1>
          <p className="max-w-[60ch] text-corpo text-escuro">
            Um acompanhamento pensado para cada pessoa, com apoio da equipe e atendimento online sempre que for preciso.
          </p>
        </div>
      </section>

      <section className="bg-bege py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="mb-8 text-titulo font-normal text-escuro md:text-titulo-grande">O que o programa inclui</h2>
          <ul className="flex flex-col gap-4">
            {programas.map((programa) => (
              <li key={programa.titulo} className="rounded-3xl border-2 border-verde-medio bg-fundo p-6">
                <p className="mb-3 text-corpo font-bold text-escuro">{programa.titulo}</p>
                <p className="mb-3 max-w-[60ch] text-corpo text-escuro">{programa.descricao}</p>
                <p className="max-w-[60ch] text-corpo text-escuro">{programa.detalhe}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-fundo py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <p className="mb-8 max-w-[60ch] text-corpo font-bold text-escuro">
            Cada caso é avaliado individualmente por um profissional habilitado.
          </p>
          <BotoesDaPagina extraTexto="Conhecer as práticas integrativas" extraPara="/praticas-integrativas" />
        </div>
      </section>
    </PaginaPublica>
  )
}

export default ProgramaTerapeutico
