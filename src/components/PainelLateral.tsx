import { Link } from 'react-router-dom'
import logo from '../assets/logo-branca.png'
import folha from '../assets/folha.svg'

interface Beneficio {
  icone: string
  texto: string
}

interface PainelLateralProps {
  corFundo: string // classe do Tailwind, ex: "bg-marrom"
  titulo: string
  texto: string
  beneficios: Beneficio[]
  rodape: string
}

function PainelLateral({ corFundo, titulo, texto, beneficios, rodape }: PainelLateralProps) {
  return (
    <div className={`relative flex flex-col justify-between overflow-hidden ${corFundo}`}>
      <img src={folha} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30" />

      <div className="relative border-b border-fundo/10 px-6 py-5 lg:px-8 lg:py-8">
        <Link to="/" className="inline-flex min-h-11 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-fundo">
          <img src={logo} alt="MedPics - voltar ao início" className="w-40 lg:w-52" />
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col px-6 py-6 lg:px-8 lg:py-10">
        <h1 className="mb-2 text-[26px] leading-tight text-fundo lg:mb-4 lg:text-[32px]">{titulo}</h1>
        <p className="text-[14px] leading-relaxed text-fundo lg:mb-10 lg:text-[15px]">{texto}</p>

        <ul className="mt-auto hidden flex-col gap-6 lg:flex">
          {beneficios.map((beneficio) => (
            <li key={beneficio.texto} className="flex items-center gap-4">
              <img src={beneficio.icone} alt="" className="h-12 w-12 shrink-0" />
              <span className="text-[15px] leading-snug text-fundo">{beneficio.texto}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative hidden border-t border-fundo/10 px-8 py-6 text-sm text-fundo lg:block">{rodape}</p>
    </div>
  )
}

export default PainelLateral
