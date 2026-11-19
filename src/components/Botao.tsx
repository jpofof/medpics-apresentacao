interface BotaoProps {
  children: string
  variante?: string // "primario" (padrão), "secundario" ou "perigo"
  enviar?: boolean // true = botão que envia o formulário
  desabilitado?: boolean
  larguraTotal?: boolean
  aoClicar?: () => void
}

function Botao({ children, variante = 'primario', enviar = false, desabilitado = false, larguraTotal = false, aoClicar }: BotaoProps) {
  let cores = 'bg-verde-cta text-white hover:bg-escuro hover:text-fundo active:bg-escuro'
  if (variante === 'secundario') {
    cores = 'bg-fundo text-verde-cta border border-escuro/10 hover:bg-verde-cta hover:text-white active:bg-escuro'
  }
  if (variante === 'perigo') {
    cores = 'bg-fundo text-erro font-bold border-2 border-erro hover:bg-erro hover:text-fundo active:bg-erro'
  }

  return (
    <button
      type={enviar ? 'submit' : 'button'}
      onClick={aoClicar}
      disabled={desabilitado}
      className={`min-h-14 rounded-xl px-5 py-3 text-botao font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta disabled:cursor-not-allowed disabled:opacity-50 ${cores} ${larguraTotal ? 'w-full' : ''}`}
    >
      {children}
    </button>
  )
}

export default Botao
