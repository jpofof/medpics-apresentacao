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
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-borda text-marrom">
              {relatorio.colunas.map((coluna) => (
                <th key={coluna} scope="col" className="px-3 py-2 font-semibold">
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {relatorio.linhas.map((linha, i) => (
              <tr key={i} className="border-b border-black/5 text-texto">
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
          <li key={i} className="rounded-[18px] border border-black/5 bg-[#f7f5f0] px-4 py-3">
            {linha.map((celula, j) => (
              <p key={j} className="flex flex-wrap justify-between gap-x-3 py-0.5 text-[13px]">
                <span className="text-marrom">{relatorio.colunas[j]}</span>
                <span className="break-words text-right font-medium text-texto">{celula}</span>
              </p>
            ))}
          </li>
        ))}
      </ul>

      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 rounded-xl bg-fundo-2 px-4 py-3 text-sm font-semibold text-texto">
        {relatorio.totais.map((total) => (
          <span key={total}>{total}</span>
        ))}
      </p>
    </div>
  )
}

export default TabelaRelatorio
