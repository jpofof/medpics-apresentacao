import { condicoes } from '../conteudo/condicoes'

// Lista das condições acompanhadas (mesma lista e mesma ordem na página inicial e em /cannabis-medicinal)
function ListaDeCondicoes() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {condicoes.map((condicao) => (
        <li
          key={condicao.nome}
          className="flex items-center gap-3.5 rounded-3xl border-2 border-verde-medio bg-fundo px-5 py-4"
        >
          <img src={condicao.icone} alt="" className="h-10 w-10 shrink-0" />
          <span className="text-corpo text-escuro">{condicao.nome}</span>
        </li>
      ))}
    </ul>
  )
}

export default ListaDeCondicoes
