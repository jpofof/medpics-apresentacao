import type { ConsultaResumo } from '../data/agenda'
import { formatarData } from '../data/datas'
import EtiquetaStatus from './EtiquetaStatus'

interface ListaConsultasProps {
  consultas: ConsultaResumo[]
  mensagemVazia: string
}

// Lista de consultas: dia/mês, horário, nome, detalhe e status. Mostra um estado vazio amigável.
function ListaConsultas({ consultas, mensagemVazia }: ListaConsultasProps) {
  if (consultas.length === 0) {
    return <p className="rounded-xl bg-bege px-4 py-3 text-sm text-marrom">{mensagemVazia}</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {consultas.map((consulta) => (
        <li key={consulta.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[18px] border border-escuro/5 bg-bege px-4 py-3">
          <div className="w-14 shrink-0 text-center">
            <p className="text-[13px] font-semibold text-escuro">{formatarData(consulta.data).slice(0, 5)}</p>
            <p className="text-[12px] text-marrom">{consulta.hora}</p>
          </div>
          <div className="min-w-0 flex-1 basis-40">
            <strong className="block break-words text-[15px] text-escuro">{consulta.titulo}</strong>
            {consulta.detalhe && <span className="block break-words text-[13px] text-marrom">{consulta.detalhe}</span>}
          </div>
          <EtiquetaStatus texto={consulta.status} />
        </li>
      ))}
    </ul>
  )
}

export default ListaConsultas
