interface CampoSelectProps {
  id: string
  rotulo: string
  opcoes: string[]
  valor?: string // só quando a página precisa saber a opção escolhida
  aoMudar?: (valor: string) => void
}

// Lista de escolha com rótulo
function CampoSelect({ id, rotulo, opcoes, valor, aoMudar }: CampoSelectProps) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-marrom">
        {rotulo}
      </label>
      <select
        id={id}
        value={valor}
        onChange={(e) => aoMudar && aoMudar(e.target.value)}
        className="h-[54px] w-full rounded-xl border-[1.5px] border-borda bg-fundo px-4 text-sm text-texto transition-colors duration-200 hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-suave/60"
      >
        <option value="">Selecione</option>
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CampoSelect
