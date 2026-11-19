interface IconeMenuProps {
  nome: string
  className?: string
}

const CALENDARIO = 'M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4'

// Desenho de cada ícone (traços simples de 24x24, sem biblioteca)
const desenhos = [
  { nome: 'inicio', d: 'M3 11l9-8 9 8 M5 9.5V20h5v-6h4v6h5V9.5' },
  { nome: 'agendar', d: CALENDARIO + ' M12 13v5 M9.5 15.5h5' },
  { nome: 'consultas', d: CALENDARIO + ' M9 15l2 2 4-4' },
  { nome: 'historico', d: 'M12 3a9 9 0 100 18 9 9 0 000-18z M12 7v5l3 2' },
  { nome: 'perfil', d: 'M12 4a4 4 0 100 8 4 4 0 000-8z M4 21c0-4 4-6 8-6s8 2 8 6' },
  { nome: 'agenda', d: CALENDARIO + ' M8 14h.01 M12 14h.01 M16 14h.01 M8 17.5h.01 M12 17.5h.01' },
  { nome: 'disponibilidade', d: 'M12 5a8 8 0 100 16 8 8 0 000-16z M12 9v4l2 2 M5 3L2 6 M19 3l3 3' },
  { nome: 'relatorios', d: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2' },
  { nome: 'cadastros', d: 'M7 5h10v16H7z M10 3h4v4h-4z M10 14l2 2 3-4' },
  { nome: 'usuarios', d: 'M9 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5 M16.5 4.8a3.5 3.5 0 010 6.4 M18 15c2.5.6 4 2.3 4 5' },
  { nome: 'novo', d: 'M10 4a4 4 0 100 8 4 4 0 000-8z M2 21c0-4 4-6 8-6 M19 8v6 M16 11h6' },
  { nome: 'cancelar', d: 'M12 3a9 9 0 100 18 9 9 0 000-18z M9 9l6 6 M15 9l-6 6' },
  { nome: 'ferias', d: 'M12 8a4 4 0 100 8 4 4 0 000-8z M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2' },
  { nome: 'visao', d: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z' },
]

// Ícone simples em SVG, na cor do texto (currentColor)
function IconeMenu({ nome, className = 'h-5 w-5' }: IconeMenuProps) {
  const desenho = desenhos.find((i) => i.nome === nome)
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {desenho && <path d={desenho.d} />}
    </svg>
  )
}

export default IconeMenu
