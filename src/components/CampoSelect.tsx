interface CampoSelectProps {
  id: string
  rotulo: string
  opcoes: string[]
  valor?: string // só quando a página precisa saber a opção escolhida
  aoMudar?: (valor: string) => void
  erro?: string // mensagem de erro: destaca o campo
}

// Lista de escolha com rótulo
function CampoSelect({ id, rotulo, opcoes, valor, aoMudar, erro }: CampoSelectProps) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-marrom">
        {rotulo}
      </label>
      <select
        id={id}
        value={valor}
        aria-invalid={erro ? true : undefined}
        onChange={(e) => aoMudar && aoMudar(e.target.value)}
        className={`h-[54px] w-full rounded-xl border-[1.5px] bg-fundo px-4 text-sm text-texto transition-colors duration-200 hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-suave/60 ${
          erro ? 'border-erro' : 'border-borda'
        }`}
      >
        <option value="">Selecione</option>
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
      {erro && (
        <p role="alert" className="mt-1 text-xs text-erro">
          {erro}
        </p>
      )}
    </div>
  )
}

export default CampoSelect
