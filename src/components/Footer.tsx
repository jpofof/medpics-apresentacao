import { Link } from 'react-router-dom'
import logo from '../assets/medpics-logo.png'
import RedesSociais from './RedesSociais'

interface FooterProps {
  compacto?: boolean // versão menor, usada no login e no cadastro
}

function Footer({ compacto = false }: FooterProps) {
  const linkClasse = `${compacto ? 'text-xs' : 'text-sm'} text-fundo transition-colors duration-200 hover:text-verde-suave focus-visible:outline-2 focus-visible:outline-verde-suave`
  const tituloClasse = `${compacto ? 'mb-2 text-xs' : 'mb-4 text-sm'} font-semibold tracking-wider text-verde-suave`
  const listaClasse = `flex flex-col ${compacto ? 'gap-1.5' : 'gap-3'}`

  return (
    <footer className={`bg-texto text-fundo ${compacto ? 'pb-3 pt-6' : 'pb-4 pt-12'}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className={`grid md:grid-cols-3 ${compacto ? 'gap-4' : 'gap-8'}`}>
          <div>
            <img src={logo} alt="MedPics" className={`brightness-0 invert ${compacto ? 'mb-2 max-h-[36px]' : 'mb-3 max-h-[53px]'}`} />
            <p className={`max-w-xs leading-relaxed text-fundo-2 ${compacto ? 'text-xs' : 'text-sm'}`}>
              Cannabis Medicinal e Práticas Integrativas e Complementares. Transformando vidas com ciência, cuidado e
              humanização.
            </p>
            {/* Redes sociais só no rodapé completo (a página inicial) */}
            {!compacto && <RedesSociais />}
          </div>

          <div>
            <h5 className={tituloClasse}>CLÍNICA</h5>
            <ul className={listaClasse}>
              <li>
                <a href="/#como-funciona" className={linkClasse}>
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="/#depoimentos" className={linkClasse}>
                  Depoimentos
                </a>
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

        <hr className={`border-fundo-2/20 ${compacto ? 'my-3' : 'my-6'}`} />

        <div className="flex flex-col gap-1 text-xs text-verde-medio md:flex-row md:justify-between">
          <p>&copy; 2026 MedPics — Todos os direitos reservados</p>
          <p>Cannabis Medicinal • Práticas Integrativas • Atendimento Online</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
