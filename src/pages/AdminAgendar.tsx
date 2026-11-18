import { useState } from 'react'
import Botao from '../components/Botao'
import BuscaPaciente from '../components/BuscaPaciente'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import FormularioAgendar from '../components/FormularioAgendar'
import PainelLayout from '../components/PainelLayout'

// Administrador agenda em nome de um paciente (atendimento por telefone): escolhe o paciente e depois agenda
function AdminAgendar() {
  const [idPaciente, setIdPaciente] = useState(0)
  const [nomePaciente, setNomePaciente] = useState('')

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Agendar para paciente" subtitulo="Escolha o paciente e depois o profissional e o horário" />

      <div className="max-w-3xl">
        <Cartao>
          {idPaciente === 0 ? (
            <BuscaPaciente
              somenteAtivos
              aoEscolher={(id, nome) => {
                setIdPaciente(id)
                setNomePaciente(nome)
              }}
            />
          ) : (
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-bege px-4 py-3">
                <p className="min-w-0 break-words text-sm text-escuro">
                  Paciente: <strong>{nomePaciente}</strong>
                </p>
                <Botao variante="secundario" aoClicar={() => setIdPaciente(0)}>
                  Trocar paciente
                </Botao>
              </div>
              <FormularioAgendar idPaciente={idPaciente} />
            </div>
          )}
        </Cartao>
      </div>
    </PainelLayout>
  )
}

export default AdminAgendar
