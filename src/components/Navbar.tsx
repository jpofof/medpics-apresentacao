import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/medpics-logo.png'

// Itens do menu: "para" é o endereço (página própria ou seção da página inicial)
const links = [
  { texto: 'Cannabis Medicinal', para: '/cannabis-medicinal' },
  { texto: 'Para Quem É', para: '/#para-quem-e' },
  { texto: 'Como Funciona', para: '/#como-funciona' },
  { texto: 'Programa', para: '/programa-terapeutico' },
  { texto: 'Depoimentos', para: '/#depoimentos' },
]

const classeDoLink =
  'flex min-h-11 items-center whitespace-nowrap rounded-lg px-3 py-2 text-botao font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-verde-cta menu:px-1.5'

// Barra de navegação do topo (no celular os links ficam dentro do botão ☰)
function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { pathname, hash } = useLocation() // página e seção atuais

  // Página própria: endereço igual. Seção da página inicial: o hash da barra de endereço
  function estaAtivo(para: string) {
    if (para.startsWith("/#")) return pathname === "/" && "/" + hash === para
    return pathname === para
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-bege bg-fundo">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between px-5 py-3 menu:flex-nowrap menu:px-6 menu:gap-3">
        <Link to="/" onClick={() => setMenuAberto(false)} className="rounded-lg focus-visible:outline-2 focus-visible:outline-verde-cta">
          <img src={logo} alt="MedPics" className="max-h-[46px]" />
        </Link>

        <button
          type="button"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
          className="min-h-11 min-w-11 rounded-lg px-3 py-1 text-2xl transition-colors duration-200 hover:bg-bege focus-visible:outline-2 focus-visible:outline-verde-cta menu:hidden"
        >
          {menuAberto ? '✕' : '☰'}
        </button>

        <nav className={`${menuAberto ? 'block' : 'hidden'} w-full menu:block menu:w-auto`}>
          <ul className="mt-4 flex flex-col gap-1 menu:mt-0 menu:flex-row menu:items-center">
            {links.map((link) => (
              <li key={link.para}>
                <Link
                  to={link.para}
                  onClick={() => setMenuAberto(false)}
                  className={`${classeDoLink} ${estaAtivo(link.para) ? "bg-bege text-verde-cta" : "text-escuro hover:bg-bege hover:text-verde-cta"}`}
                >
                  {link.texto}
                </Link>
              </li>
            ))}
            <li className="mt-2 menu:ml-2 menu:mt-0">
              <Link
                to="/login"
                onClick={() => setMenuAberto(false)}
                className="block min-h-12 rounded-full bg-verde-cta px-4 py-3 text-center text-botao font-semibold text-white transition-colors duration-200 hover:bg-escuro hover:text-fundo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta active:bg-escuro"
              >
                Cadastro/Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
