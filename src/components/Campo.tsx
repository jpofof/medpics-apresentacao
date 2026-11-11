interface CampoProps {
  id: string
  rotulo: string
  tipo?: string
  placeholder?: string
  valor?: string // quando a página guarda o que foi digitado
  aoMudar?: (valor: string) => void
  autoComplete?: string
  erro?: string // mensagem de erro: destaca o campo
}

// Campo de texto com rótulo
function Campo({ id, rotulo, tipo = 'text', placeholder, valor, aoMudar, autoComplete, erro }: CampoProps) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-marrom">
        {rotulo}
      </label>
      <input
        id={id}
        type={tipo}
        placeholder={placeholder}
        value={valor}
        autoComplete={autoComplete}
        aria-invalid={erro ? true : undefined}
        onChange={(e) => aoMudar && aoMudar(e.target.value)}
        className={`h-[54px] w-full rounded-xl border-[1.5px] bg-fundo px-4 text-sm text-texto transition-colors duration-200 placeholder:text-[#b8b0a4] hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-suave/60 ${
          erro ? 'border-erro' : 'border-borda'
        }`}
      />
      {erro && (
        <p role="alert" className="mt-1 text-xs text-erro">
          {erro}
        </p>
      )}
    </div>
  )
}

export default Campo
