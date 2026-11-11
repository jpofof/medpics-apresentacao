import { useState } from 'react'
import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { buscarPaciente, buscarProfissional, descricaoDoPerfil, encerrarSessao, usuarioLogado } from '../data/usuarios'
import { telaPronta } from '../telas'
import IconeMenu from './IconeMenu'
import sairIcone from '../assets/icones/icon-sair.svg'

interface PainelLayoutProps {
  children: ReactNode
}

interface ItemDoMenu {
  texto: string
  para: string
  icone: string
}

interface SecaoDoMenu {
  titulo: string
  itens: ItemDoMenu[]
}

// Itens já na ordem final. Só viram link se a tela existir (veja src/telas.ts); os outros aparecem como "em breve".
const itensDoPaciente: ItemDoMenu[] = [
  { texto: 'Início', para: '/paciente', icone: 'inicio' },
  { texto: 'Agendar consulta', para: '/paciente/agendar', icone: 'agendar' },
  { texto: 'Minhas consultas', para: '/paciente/consultas', icone: 'consultas' },
  { texto: 'Meu histórico', para: '/paciente/historico', icone: 'historico' },
  { texto: 'Meu perfil', para: '/perfil', icone: 'perfil' },
]

const itensDoProfissional: ItemDoMenu[] = [
  { texto: 'Início', para: '/profissional', icone: 'inicio' },
  { texto: 'Minha agenda', para: '/profissional/agenda', icone: 'agenda' },
  { texto: 'Disponibilidade', para: '/profissional/disponibilidade', icone: 'disponibilidade' },
  { texto: 'Histórico de pacientes', para: '/profissional/historico', icone: 'historico' },
  { texto: 'Relatórios', para: '/profissional/relatorios', icone: 'relatorios' },
  { texto: 'Meu perfil', para: '/perfil', icone: 'perfil' },
]

const itensDaAdministracao: ItemDoMenu[] = [
  { texto: 'Visão geral', para: '/admin', icone: 'visao' },
  { texto: 'Cadastros pendentes', para: '/admin/cadastros', icone: 'cadastros' },
  { texto: 'Usuários', para: '/admin/usuarios', icone: 'usuarios' },
  { texto: 'Novo paciente', para: '/admin/novo-paciente', icone: 'novo' },
  { texto: 'Agendar para paciente', para: '/admin/agendar', icone: 'agendar' },
  { texto: 'Cancelar consultas', para: '/admin/cancelar', icone: 'cancelar' },
]

const classeDoItem = 'flex min-h-11 w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[13px] font-medium'

// A inicial do avatar ignora o título (Dr., Dra.)
function inicialDoNome(nome: string): string {
  const semTitulo = nome.replace(/^(Dr\.|Dra\.)\s+/, '')
  return semTitulo[0] ?? ''
}

// Moldura das telas logadas: menu lateral (no celular vira uma gaveta aberta pelo ☰) e o conteúdo.
function PainelLayout({ children }: PainelLayoutProps) {
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate()

  const usuario = usuarioLogado()
  if (usuario === null) return null // as rotas já protegem; isto só satisfaz o TypeScript

  const profissional = buscarProfissional(usuario.id)

  // Monta as seções do menu conforme o perfil. Profissional que também é administrador tem as duas seções.
  const secoes: SecaoDoMenu[] = []
  if (buscarPaciente(usuario.id) !== null) {
    secoes.push({ titulo: 'Minha saúde', itens: itensDoPaciente })
  }
  if (profissional !== null) {
    secoes.push({ titulo: profissional.ehAdministrador ? 'Meu painel' : 'Profissional', itens: itensDoProfissional })
    if (profissional.ehAdministrador) {
      secoes.push({ titulo: 'Administração', itens: itensDaAdministracao })
    }
  }

  function sair() {
    encerrarSessao()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-fundo-2">
      {/* Fundo escuro atrás do menu no celular */}
      {menuAberto && <div onClick={() => setMenuAberto(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}

      <aside
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-40 flex w-[300px] shrink-0 flex-col overflow-y-auto border-r border-black/10 bg-fundo shadow-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none ${
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-start gap-3 border-b border-black/10 p-5">
          <div className="flex h-11 w-11 min-w-11 items-center justify-center rounded-full bg-primary font-titulo text-base font-semibold text-white">
            {inicialDoNome(usuario.nome)}
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="break-words font-titulo text-sm font-semibold text-texto">{usuario.nome}</h5>
            <small className="text-[11px] text-marrom">{descricaoDoPerfil(usuario.id)}</small>
          </div>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuAberto(false)}
            className="rounded-lg px-2 py-1 text-xl text-marrom transition-colors duration-200 hover:bg-fundo-2 focus-visible:outline-2 focus-visible:outline-primary lg:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-3">
          {secoes.map((secao) => (
            <div key={secao.titulo} className="mb-5">
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-marrom-claro">{secao.titulo}</p>
              <ul className="flex flex-col gap-0.5">
                {secao.itens.map((item) => (
                  <li key={item.para}>
                    {telaPronta(item.para) ? (
                      <NavLink
                        to={item.para}
                        end
                        onClick={() => setMenuAberto(false)}
                        className={({ isActive }) =>
                          `${classeDoItem} transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary ${
                            isActive ? 'bg-primary text-white shadow-sm' : 'text-marrom hover:bg-fundo-2 hover:text-texto active:bg-fundo-2'
                          }`
                        }
                      >
                        <IconeMenu nome={item.icone} />
                        {item.texto}
                      </NavLink>
                    ) : (
                      <div aria-disabled="true" className={`${classeDoItem} cursor-not-allowed text-marrom opacity-50`}>
                        <IconeMenu nome={item.icone} />
                        <span className="flex-1">{item.texto}</span>
                        <span className="shrink-0 whitespace-nowrap rounded-full bg-black/10 px-1.5 py-0.5 text-[10px] font-medium">em breve</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-black/10 p-4">
          <button
            type="button"
            onClick={sair}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-marrom transition-colors duration-200 hover:bg-fundo-2 hover:text-texto focus-visible:outline-2 focus-visible:outline-primary active:bg-fundo-2"
          >
            <img src={sairIcone} alt="" className="h-4 w-4" />
            Sair da Conta
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Barra do celular com o botão do menu */}
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-black/10 bg-fundo px-5 py-3 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto(true)}
            className="rounded-lg px-3 py-1 text-2xl transition-colors duration-200 hover:bg-fundo-2 focus-visible:outline-2 focus-visible:outline-primary"
          >
            ☰
          </button>
          <span className="min-w-0 flex-1 truncate font-titulo text-base font-semibold text-texto">{usuario.nome}</span>
        </div>

        <main className="flex flex-col gap-6 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default PainelLayout
