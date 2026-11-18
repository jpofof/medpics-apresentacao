import { condicoes } from '../conteudo/condicoes'

// Lista das condições acompanhadas (mesma lista e mesma ordem na página inicial e em /cannabis-medicinal).
// Caixas todas do mesmo tamanho: colunas iguais e linhas com a mesma altura.
// colunasGrandes: número de colunas em telas grandes (4 por padrão; a página inicial usa 2, pois a lista fica numa coluna mais estreita).
interface ListaDeCondicoesProps {
  colunasGrandes?: number
}

function ListaDeCondicoes({ colunasGrandes = 4 }: ListaDeCondicoesProps) {
  const classeGrande = colunasGrandes === 2 ? 'min-[1024px]:grid-cols-2' : 'min-[1024px]:grid-cols-4'

  return (
    <ul className={`grid auto-rows-fr grid-cols-1 gap-3 min-[480px]:grid-cols-2 ${classeGrande}`}>
      {condicoes.map((condicao) => (
        <li
          key={condicao.nome}
          className="flex h-full min-h-24 flex-col items-center justify-center gap-2 rounded-3xl border-2 border-verde-medio bg-fundo p-4 text-center"
        >
          <img src={condicao.icone} alt="" className="h-10 w-10 shrink-0" />
          <span className="break-words text-corpo text-escuro">{condicao.nome}</span>
        </li>
      ))}
    </ul>
  )
}

export default ListaDeCondicoes
