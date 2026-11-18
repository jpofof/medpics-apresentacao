import { Link } from 'react-router-dom'
import type { ConsultaResumo } from '../data/agenda'
import { formatarData } from '../data/datas'

interface CartaoProximaConsultaProps {
  consulta: ConsultaResumo | null
  rotuloBotao: string // botão quando há consulta
  destinoBotao: string
  mensagemVazia: string // texto quando não há consulta
  rotuloVazio: string // botão quando não há consulta
  destinoVazio: string
}

const classeDoBotao =
  'inline-block self-start rounded-xl bg-fundo px-5 py-3 text-sm font-semibold text-verde-cta transition-colors duration-200 hover:bg-bege focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundo active:bg-bege'

// Cartão verde de destaque com a próxima consulta (ou um estado vazio com botão)
function CartaoProximaConsulta({ consulta, rotuloBotao, destinoBotao, mensagemVazia, rotuloVazio, destinoVazio }: CartaoProximaConsultaProps) {
  return (
    <section className="flex flex-col justify-center gap-3 rounded-2xl bg-verde-cta p-6 text-white lg:px-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-verde-leve">Próxima consulta</p>
      {consulta ? (
        <>
          <h3 className="break-words text-[24px] font-semibold leading-tight">{consulta.titulo}</h3>
          <p className="text-[13px] opacity-90">{consulta.detalhe}</p>
          <p className="text-[15px]">
            {formatarData(consulta.data)} · {consulta.hora}
          </p>
          <span className="self-start rounded-full bg-fundo/20 px-3 py-1 text-xs font-semibold">{consulta.status}</span>
          <Link to={destinoBotao} className={classeDoBotao}>
            {rotuloBotao}
          </Link>
        </>
      ) : (
        <>
          <p className="text-[22px] leading-tight">{mensagemVazia}</p>
          <Link to={destinoVazio} className={classeDoBotao}>
            {rotuloVazio}
          </Link>
        </>
      )}
    </section>
  )
}

export default CartaoProximaConsulta
