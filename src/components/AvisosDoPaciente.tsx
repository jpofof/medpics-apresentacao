import { useState } from 'react'
import { avisosDoPaciente, dispensarAviso } from '../data/agenda'
import { formatarDataHora } from '../data/datas'
import Botao from './Botao'

interface AvisosDoPacienteProps {
  idPaciente: number
}

// Avisos de consultas canceladas sem ser pelo paciente. Cada um some quando ele clica em Dispensar.
function AvisosDoPaciente({ idPaciente }: AvisosDoPacienteProps) {
  const [dispensados, setDispensados] = useState(0) // só serve para redesenhar a lista depois de dispensar
  const avisos = avisosDoPaciente(idPaciente)

  if (avisos.length === 0) return null

  return (
    <section aria-label="Avisos" className="flex flex-col gap-3" data-dispensados={dispensados}>
      {avisos.map((aviso) => (
        <div key={aviso.id} role="status" className="flex flex-col gap-3 rounded-2xl border border-erro/30 bg-erro/10 p-4 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-erro">Consulta cancelada</p>
            <p className="break-words text-sm text-texto">{aviso.texto}</p>
            <p className="mt-1 text-xs text-marrom">{formatarDataHora(aviso.criadoEm)}</p>
          </div>
          <Botao
            variante="secundario"
            aoClicar={() => {
              dispensarAviso(aviso.id)
              setDispensados(dispensados + 1)
            }}
          >
            Dispensar
          </Botao>
        </div>
      ))}
    </section>
  )
}

export default AvisosDoPaciente
