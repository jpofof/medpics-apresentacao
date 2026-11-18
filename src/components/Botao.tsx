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
    cores = 'bg-fundo text-marrom border border-marrom/40 hover:bg-marrom hover:text-fundo active:bg-marrom/80'
  }

  return (
    <button
      type={enviar ? 'submit' : 'button'}
      onClick={aoClicar}
      disabled={desabilitado}
      className={`rounded-xl px-5 py-3 text-base font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta disabled:cursor-not-allowed disabled:opacity-50 ${cores} ${larguraTotal ? 'w-full' : ''}`}
    >
      {children}
    </button>
  )
}

export default Botao
