import { useState } from 'react'
import { pesquisarPacientes } from '../data/usuarios'

interface BuscaPacienteProps {
  somenteAtivos: boolean // ao agendar, só pacientes com conta Ativa
  aoEscolher: (idPaciente: number, nome: string) => void
}

// Pesquisa de paciente por nome ou CPF (usada pelo administrador). Mostra a lista e devolve o escolhido.
function BuscaPaciente({ somenteAtivos, aoEscolher }: BuscaPacienteProps) {
  const [texto, setTexto] = useState('')
  const encontrados = pesquisarPacientes(texto, somenteAtivos).slice(0, 8)

  return (
    <div>
      <label htmlFor="busca-paciente" className="mb-2 block text-pequeno font-semibold text-marrom">
        Pesquisar paciente por nome ou CPF
      </label>
      <input
        id="busca-paciente"
        type="text"
        value={texto}
        placeholder="Digite o nome ou o CPF"
        onChange={(e) => setTexto(e.target.value)}
        className="mb-4 h-[54px] w-full rounded-xl border-[1.5px] border-marrom-claro bg-fundo px-4 text-pequeno text-escuro transition-colors duration-200 placeholder:text-marrom hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-leve/60"
      />

      {encontrados.length === 0 ? (
        <p className="rounded-xl bg-bege px-4 py-3 text-pequeno text-marrom">Nenhum paciente encontrado.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {encontrados.map((paciente) => (
            <li key={paciente.id}>
              <button
                type="button"
                onClick={() => aoEscolher(paciente.id, paciente.nome)}
                className="min-h-12 w-full rounded-xl border border-marrom-claro bg-fundo px-4 py-3 text-left transition-colors duration-200 hover:border-verde-cta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta active:bg-bege"
              >
                <strong className="block break-words text-pequeno text-escuro">{paciente.nome}</strong>
                <span className="break-words text-pequeno text-marrom">
                  CPF {paciente.cpf} · {paciente.email}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BuscaPaciente
