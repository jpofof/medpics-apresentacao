interface IconeSimboloProps {
  nome: string // alerta, check, info, relogio, x, pausa
  className?: string
}

// Ícones simples em SVG, na cor do texto ao redor (currentColor)
function IconeSimbolo({ nome, className = 'h-5 w-5' }: IconeSimboloProps) {
  let desenho = <path d="M12 8v5m0 3h.01" /> // alerta: círculo com "!"
  if (nome === 'check') desenho = <path d="m8 12.5 3 3 5-6" />
  if (nome === 'info') desenho = <path d="M12 11v5m0-8h.01" />
  if (nome === 'relogio') desenho = <path d="M12 7v5l3 2" />
  if (nome === 'x') desenho = <path d="m9 9 6 6m0-6-6 6" />
  if (nome === 'pausa') desenho = <path d="M9 12h6" />

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      {desenho}
    </svg>
  )
}

export default IconeSimbolo
