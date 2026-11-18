import { useState } from 'react'
import Botao from '../components/Botao'
import BuscaPaciente from '../components/BuscaPaciente'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import ConsultasAgendadas from '../components/ConsultasAgendadas'
import PainelLayout from '../components/PainelLayout'

// Administrador cancela consultas de um paciente a qualquer momento (sem a regra das 24h).
// O paciente recebe um aviso no painel dele.
function AdminCancelar() {
  const [idPaciente, setIdPaciente] = useState(0)
  const [nomePaciente, setNomePaciente] = useState('')

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Cancelar consultas" subtitulo="Pesquise o paciente e veja as consultas agendadas dele" />

      <div className="max-w-3xl">
        <Cartao>
          {idPaciente === 0 ? (
            <BuscaPaciente
              somenteAtivos={false}
              aoEscolher={(id, nome) => {
                setIdPaciente(id)
                setNomePaciente(nome)
              }}
            />
          ) : (
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-bege px-4 py-3">
                <p className="min-w-0 break-words text-pequeno text-escuro">
                  Paciente: <strong>{nomePaciente}</strong>
                </p>
                <Botao variante="secundario" aoClicar={() => setIdPaciente(0)}>
                  Trocar paciente
                </Botao>
              </div>
              <ConsultasAgendadas idPaciente={idPaciente} />
            </div>
          )}
        </Cartao>
      </div>
    </PainelLayout>
  )
}

export default AdminCancelar
