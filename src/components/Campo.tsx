interface CampoProps {
  id: string
  rotulo: string
  tipo?: string
  placeholder?: string
}

// Campo de texto com rótulo. Nesta versão os formulários não guardam o que é digitado.
function Campo({ id, rotulo, tipo = 'text', placeholder }: CampoProps) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-marrom">
        {rotulo}
      </label>
      <input
        id={id}
        type={tipo}
        placeholder={placeholder}
        className="h-[54px] w-full rounded-xl border-[1.5px] border-borda bg-fundo px-4 text-sm text-texto transition-colors duration-200 placeholder:text-[#b8b0a4] hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-suave/60"
      />
    </div>
  )
}

export default Campo
