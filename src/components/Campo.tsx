import MensagemDoCampo from './MensagemDoCampo'
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
      <label htmlFor={id} className="mb-2 block text-botao font-semibold text-marrom">
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
        className={`h-[54px] w-full rounded-xl border-[1.5px] bg-fundo px-4 text-botao text-escuro transition-colors duration-200 placeholder:text-marrom hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-leve/60 ${
          erro ? 'border-erro border-2' : 'border-marrom-claro'
        }`}
      />
      {erro && <MensagemDoCampo texto={erro} />}
    </div>
  )
}

export default Campo
