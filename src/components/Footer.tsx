import { Link } from 'react-router-dom'
import logo from '../assets/medpics-logo.png'
import RedesSociais from './RedesSociais'

interface FooterProps {
  compacto?: boolean // versão menor, usada no login e no cadastro
}

function Footer({ compacto = false }: FooterProps) {
  const linkClasse = `inline-flex min-h-11 items-center text-pequeno text-fundo transition-colors duration-200 hover:text-verde-leve focus-visible:outline-2 focus-visible:outline-verde-leve`
  const tituloClasse = `${compacto ? 'mb-2' : 'mb-4'} text-pequeno font-bold tracking-wider text-verde-leve`
  const listaClasse = `flex flex-col ${compacto ? 'gap-0' : 'gap-1'}`

  return (
    <footer className={`bg-escuro text-fundo ${compacto ? 'pb-3 pt-6' : 'pb-4 pt-12'}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className={`grid md:grid-cols-3 ${compacto ? 'gap-4' : 'gap-8'}`}>
          <div>
            <img src={logo} alt="MedPics" className={`brightness-0 invert ${compacto ? 'mb-2 max-h-[36px]' : 'mb-3 max-h-[53px]'}`} />
            <p className={`max-w-xs leading-relaxed text-bege text-pequeno`}>
              Cannabis medicinal e práticas integrativas, com ciência, cuidado e humanização.
            </p>
            {/* Redes sociais só no rodapé completo (a página inicial) */}
            {!compacto && <RedesSociais />}
          </div>

          <div>
            <h5 className={tituloClasse}>CLÍNICA</h5>
            <ul className={listaClasse}>
              <li>
                <Link to="/cannabis-medicinal" className={linkClasse}>
                  Cannabis Medicinal
                </Link>
              </li>
              <li>
                <Link to="/programa-terapeutico" className={linkClasse}>
                  Programa
                </Link>
              </li>
              <li>
                <Link to="/praticas-integrativas" className={linkClasse}>
                  Práticas Integrativas
                </Link>
              </li>
              <li>
                <Link to="/#como-funciona" className={linkClasse}>
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/#depoimentos" className={linkClasse}>
                  Depoimentos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className={tituloClasse}>ACESSO</h5>
            <ul className={listaClasse}>
              <li>
                <Link to="/login" className={linkClasse}>
                  Entrar
                </Link>
              </li>
              <li>
                <Link to="/cadastro" className={linkClasse}>
                  Criar conta
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className={`border-bege/20 ${compacto ? 'my-3' : 'my-6'}`} />

        <div className="flex flex-col gap-1 text-pequeno text-verde-leve md:flex-row md:justify-between">
          <p>&copy; 2026 MedPics — Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
