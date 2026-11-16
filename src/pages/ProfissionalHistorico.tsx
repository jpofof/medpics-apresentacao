import { useState } from 'react'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import ListaConsultas from '../components/ListaConsultas'
import PainelLayout from '../components/PainelLayout'
import { historicoComPaciente, pacientesDoProfissional, resumoParaProfissional } from '../data/agenda'
import { usuarioLogado } from '../data/usuarios'

// Histórico por paciente (Quadro 10): o profissional busca por nome ou CPF e vê todas as consultas dele com aquele paciente.
// A busca só acha pacientes que já tiveram consulta com ele.
function ProfissionalHistorico() {
  const [texto, setTexto] = useState('')
  const [idEscolhido, setIdEscolhido] = useState(0)

  const usuario = usuarioLogado()
  if (usuario === null) return null

  const pacientes = pacientesDoProfissional(usuario.id, texto)
  const escolhido = pacientes.find((p) => p.id === idEscolhido)
  const consultas = escolhido ? historicoComPaciente(usuario.id, escolhido.id).map(resumoParaProfissional) : []

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Histórico de pacientes" subtitulo="Suas consultas com cada paciente, com o status de cada uma" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Cartao titulo="Buscar paciente">
          <label htmlFor="busca" className="mb-2 block text-sm font-medium text-marrom">
            Nome ou CPF
          </label>
          <input
            id="busca"
            type="text"
            value={texto}
            placeholder="Digite o nome ou o CPF"
            onChange={(e) => setTexto(e.target.value)}
            className="mb-4 h-[54px] w-full rounded-xl border-[1.5px] border-borda bg-fundo px-4 text-sm text-texto transition-colors duration-200 placeholder:text-[#b8b0a4] hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-suave/60"
          />

          {pacientes.length === 0 ? (
            <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">
              {texto === '' ? 'Você ainda não atendeu nenhum paciente.' : 'Nenhum paciente seu foi encontrado com esta busca.'}
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {pacientes.map((paciente) => (
                <li key={paciente.id}>
                  <button
                    type="button"
                    onClick={() => setIdEscolhido(paciente.id)}
                    aria-pressed={paciente.id === idEscolhido}
                    className={`min-h-11 w-full rounded-xl border px-4 py-3 text-left transition-colors duration-200 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-fundo-2 ${
                      paciente.id === idEscolhido ? 'border-primary bg-primary/10' : 'border-borda bg-white'
                    }`}
                  >
                    <strong className="block break-words text-[15px] text-texto">{paciente.nome}</strong>
                    <span className="break-words text-[13px] text-marrom">CPF {paciente.cpf === '' ? 'não informado' : paciente.cpf}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Cartao>

        <Cartao titulo={escolhido ? 'Consultas com ' + escolhido.nome : 'Consultas'}>
          {escolhido ? (
            <ListaConsultas consultas={consultas} mensagemVazia="Nenhuma consulta com este paciente." />
          ) : (
            <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">Escolha um paciente para ver o histórico.</p>
          )}
        </Cartao>
      </div>
    </PainelLayout>
  )
}

export default ProfissionalHistorico
