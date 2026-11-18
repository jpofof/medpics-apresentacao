import { useState } from 'react'
import { hojeTexto } from '../data/datas'
import Cartao from './Cartao'

interface MiniCalendarioProps {
  diasMarcados: string[] // datas AAAA-MM-DD com consulta
  legenda: string
}

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const classeDoBotaoSeta =
  'h-11 w-11 rounded-full border border-escuro/10 text-lg text-marrom transition-colors duration-200 hover:bg-bege focus-visible:outline-2 focus-visible:outline-verde-cta active:bg-bege'

// Calendário do mês com os dias que têm consulta marcados
function MiniCalendario({ diasMarcados, legenda }: MiniCalendarioProps) {
  const [mes, setMes] = useState(new Date().getMonth())
  const [ano, setAno] = useState(new Date().getFullYear())

  function mudarMes(passo: number) {
    const novo = new Date(ano, mes + passo, 1)
    setMes(novo.getMonth())
    setAno(novo.getFullYear())
  }

  // Células: 0 = espaço vazio antes do dia 1, depois os dias do mês
  const celulas: number[] = []
  for (let i = 0; i < new Date(ano, mes, 1).getDay(); i++) {
    celulas.push(0)
  }
  for (let dia = 1; dia <= new Date(ano, mes + 1, 0).getDate(); dia++) {
    celulas.push(dia)
  }

  function textoDoDia(dia: number): string {
    return ano + '-' + String(mes + 1).padStart(2, '0') + '-' + String(dia).padStart(2, '0')
  }

  const hoje = hojeTexto()

  return (
    <Cartao>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-[17px] text-escuro">
          {meses[mes]} {ano}
        </h3>
        <div className="flex gap-2">
          <button type="button" aria-label="Mês anterior" onClick={() => mudarMes(-1)} className={classeDoBotaoSeta}>
            ‹
          </button>
          <button type="button" aria-label="Próximo mês" onClick={() => mudarMes(1)} className={classeDoBotaoSeta}>
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-[12px]">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((letra, indice) => (
          <span key={indice} className="py-1 font-semibold text-marrom">
            {letra}
          </span>
        ))}
        {celulas.map((dia, indice) => (
          <span key={indice} className="flex justify-center py-0.5">
            {dia > 0 && (
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  diasMarcados.includes(textoDoDia(dia))
                    ? 'bg-verde-cta font-semibold text-white'
                    : textoDoDia(dia) === hoje
                      ? 'border border-marrom-claro text-escuro'
                      : 'text-escuro'
                }`}
              >
                {dia}
              </span>
            )}
          </span>
        ))}
      </div>

      <hr className="my-4 border-bege" />
      <p className="flex items-center gap-2 text-[12px] text-marrom">
        <span className="h-2.5 w-2.5 rounded-full bg-verde-cta" /> {legenda}
      </p>
    </Cartao>
  )
}

export default MiniCalendario
