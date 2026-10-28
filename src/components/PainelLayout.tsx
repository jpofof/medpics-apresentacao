import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import sairIcone from '../assets/icones/icon-sair.svg'

interface PainelLayoutProps {
  nome: string
  children: ReactNode
}

// Itens do menu lateral do paciente
const itensDoMenu = [
  { texto: 'Início', para: '/paciente' },
  { texto: 'Agendar consulta', para: '/paciente/agendar' },
  { texto: 'Minhas consultas', para: '/paciente/consultas' },
]

// Moldura das telas do paciente: menu lateral (no celular vira uma gaveta aberta pelo ☰) e o conteúdo
function PainelLayout({ nome, children }: PainelLayoutProps) {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div className="flex min-h-screen bg-fundo-2">
      {/* Fundo escuro atrás do menu no celular */}
      {menuAberto && <div onClick={() => setMenuAberto(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col overflow-y-auto border-r border-black/10 bg-fundo transition-transform duration-300 lg:static lg:translate-x-0 ${
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-fundo-2 font-titulo text-[13px] font-semibold text-primary">
              {nome[0]}
            </div>
            <div>
              <h5 className="font-titulo text-sm font-semibold text-texto">{nome}</h5>
              <small className="text-[11px] text-marrom">Paciente</small>
            </div>
          </div>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-marrom-claro">Minha saúde</p>
          <ul className="flex flex-col gap-0.5">
            {itensDoMenu.map((item) => (
              <li key={item.para}>
                <NavLink
                  to={item.para}
                  end
                  onClick={() => setMenuAberto(false)}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-[10px] px-4 py-2.5 text-left text-[13px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary ${
                      isActive ? 'bg-primary text-white' : 'text-marrom hover:bg-fundo-2 hover:text-texto'
                    }`
                  }
                >
                  {item.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto p-6">
          <Link
            to="/login"
            className="flex w-full items-center justify-center gap-2 rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-marrom transition-colors duration-200 hover:bg-fundo-2 hover:text-texto focus-visible:outline-2 focus-visible:outline-primary active:bg-fundo-2"
          >
            <img src={sairIcone} alt="" className="h-4 w-4" />
            Sair da Conta
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Barra do celular com o botão do menu */}
        <div className="flex items-center gap-3 border-b border-black/10 bg-fundo px-5 py-3 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuAberto(true)}
            className="rounded-lg px-3 py-1 text-2xl transition-colors duration-200 hover:bg-fundo-2 focus-visible:outline-2 focus-visible:outline-primary"
          >
            ☰
          </button>
          <span className="font-titulo text-base font-semibold text-texto">{nome}</span>
        </div>

        <main className="flex flex-col gap-6 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default PainelLayout
