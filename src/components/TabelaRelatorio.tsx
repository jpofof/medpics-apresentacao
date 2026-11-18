import type { Relatorio } from '../data/relatorios'

interface TabelaRelatorioProps {
  relatorio: Relatorio
}

// Tabela simples do relatório. No celular cada linha vira um cartão (sem rolagem horizontal). Mostra os totais embaixo.
function TabelaRelatorio({ relatorio }: TabelaRelatorioProps) {
  return (
    <div>
      {/* Telas médias e grandes: tabela */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-pequeno">
          <thead>
            <tr className="border-b border-marrom-claro text-marrom">
              {relatorio.colunas.map((coluna) => (
                <th key={coluna} scope="col" className="px-3 py-2 font-semibold">
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {relatorio.linhas.map((linha, i) => (
              <tr key={i} className="border-b border-escuro/5 text-escuro">
                {linha.map((celula, j) => (
                  <td key={j} className="px-3 py-2">
                    {celula}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Celular: um cartão por linha */}
      <ul className="flex flex-col gap-3 md:hidden">
        {relatorio.linhas.map((linha, i) => (
          <li key={i} className="rounded-[18px] border border-escuro/5 bg-bege px-4 py-3">
            {linha.map((celula, j) => (
              <p key={j} className="flex flex-wrap justify-between gap-x-3 py-0.5 text-pequeno">
                <span className="text-marrom">{relatorio.colunas[j]}</span>
                <span className="break-words text-right font-semibold text-escuro">{celula}</span>
              </p>
            ))}
          </li>
        ))}
      </ul>

      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 rounded-xl bg-bege px-4 py-3 text-pequeno font-semibold text-escuro">
        {relatorio.totais.map((total) => (
          <span key={total}>{total}</span>
        ))}
      </p>
    </div>
  )
}

export default TabelaRelatorio
