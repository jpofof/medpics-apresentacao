import BotoesDaPagina from '../components/BotoesDaPagina'
import PaginaPublica from '../components/PaginaPublica'

// TEXTO PROVISÓRIO: confirmar com a clínica
// As práticas são as citadas no site atual da clínica (medpics.com.br), reescritas em frases curtas.
const praticas = [
  { nome: 'Aromaterapia', texto: 'Usa o aroma de óleos essenciais como apoio ao bem-estar.' },
  { nome: 'Arteterapia', texto: 'Usa a arte como caminho para o autoconhecimento e a criatividade.' },
  { nome: 'Ayurveda', texto: 'Sistema tradicional que busca o equilíbrio do corpo e o autocuidado.' },
  { nome: 'Cristaloterapia', texto: 'Uso de cristais com o objetivo de reequilibrar emoções e energias.' },
  { nome: 'Constelação familiar', texto: 'Observa padrões de comportamento entre as gerações de uma família.' },
  { nome: 'Reiki', texto: 'Busca equilibrar corpo e mente por meio da energia vital.' },
  { nome: 'Terapia com florais', texto: 'Essências tomadas com água, que buscam favorecer o relaxamento.' },
  { nome: 'Psicanálise', texto: 'Busca compreender o inconsciente por meio da escuta atenta.' },
]

function PraticasIntegrativas() {
  return (
    <PaginaPublica>
      <section className="bg-fundo py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="mb-6 text-titulo font-semibold text-escuro md:text-titulo-grande">Práticas Integrativas</h1>
          <p className="max-w-[60ch] text-corpo text-escuro">
            São formas de cuidado baseadas em conhecimentos tradicionais, que podem acompanhar o tratamento médico.
          </p>
        </div>
      </section>

      <section className="bg-bege py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="mb-8 text-titulo font-normal text-escuro md:text-titulo-grande">Algumas práticas</h2>
          <ul className="flex flex-col gap-4">
            {praticas.map((pratica) => (
              <li key={pratica.nome} className="rounded-3xl border-2 border-verde-medio bg-fundo p-6">
                <p className="mb-2 text-corpo font-bold text-escuro">{pratica.nome}</p>
                <p className="max-w-[60ch] text-corpo text-escuro">{pratica.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-fundo py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="mb-6 text-titulo font-normal text-escuro md:text-titulo-grande">Atendimento à distância</h2>
          <p className="mb-8 max-w-[60ch] text-corpo text-escuro">
            Muitas práticas podem ser feitas à distância, com orientação de um terapeuta.
          </p>
          <p className="mb-8 max-w-[60ch] text-corpo font-bold text-escuro">
            Cada caso é avaliado individualmente por um profissional habilitado.
          </p>
          <BotoesDaPagina />
        </div>
      </section>
    </PaginaPublica>
  )
}

export default PraticasIntegrativas
