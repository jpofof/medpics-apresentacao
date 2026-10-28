interface BotaoProps {
  children: string
  variante?: string // "primario" (padrão), "secundario" ou "perigo"
  enviar?: boolean // true = botão que envia o formulário
  desabilitado?: boolean
  larguraTotal?: boolean
  aoClicar?: () => void
}

function Botao({ children, variante = 'primario', enviar = false, desabilitado = false, larguraTotal = false, aoClicar }: BotaoProps) {
  let cores = 'bg-primary text-white hover:bg-texto active:bg-black'
  if (variante === 'secundario') {
    cores = 'bg-white text-primary border border-black/10 hover:bg-primary hover:text-white active:bg-texto'
  }
  if (variante === 'perigo') {
    cores = 'bg-white text-erro border border-erro/40 hover:bg-erro hover:text-white active:bg-erro/80'
  }

  return (
    <button
      type={enviar ? 'submit' : 'button'}
      onClick={aoClicar}
      disabled={desabilitado}
      className={`rounded-xl px-5 py-3 text-base font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${cores} ${larguraTotal ? 'w-full' : ''}`}
    >
      {children}
    </button>
  )
}

export default Botao
