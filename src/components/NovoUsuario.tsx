import { useState } from 'react'
import type { Cargo } from '../types'
import Botao from './Botao'
import CampoSelect from './CampoSelect'
import FormularioNovoPaciente from './FormularioNovoPaciente'
import FormularioNovoProfissional from './FormularioNovoProfissional'
import TituloDaSecao from './TituloDaSecao'

interface NovoUsuarioProps {
  aoConcluir: (nome: string) => void
  aoCancelar: () => void
}

const cargos = ['Médico', 'Dentista', 'Terapeuta']

// Transforma o texto do campo de escolha em um Cargo
function cargoDaEscolha(texto: string): Cargo {
  if (texto === 'Dentista') return 'Dentista'
  if (texto === 'Terapeuta') return 'Terapeuta'
  return 'Médico'
}

// Novo usuário (Quadro 7). Etapa 1: escolher o perfil. Etapa 2: o formulário do perfil escolhido.
// Cadastro livre: nenhuma combinação é bloqueada, tudo é aceito e salvo. Como a conta tem um perfil só:
// Paciente tem prioridade se vier marcado; nada marcado vira Paciente; Profissional sem cargo vira Médico;
// Administrador sozinho vira Médico + Administrador (a permissão só existe dentro de um Profissional).
function NovoUsuario({ aoConcluir, aoCancelar }: NovoUsuarioProps) {
  const [ehPaciente, setEhPaciente] = useState(false)
  const [ehProfissional, setEhProfissional] = useState(false)
  const [cargo, setCargo] = useState('')
  const [ehAdmin, setEhAdmin] = useState(false)
  const [etapa, setEtapa] = useState(1)

  // Perfil realmente cadastrado, já resolvido a partir do que foi marcado
  const comoPaciente = ehPaciente || (!ehProfissional && !ehAdmin)
  const cargoFinal = cargoDaEscolha(cargo)

  function continuar() {
    setEtapa(2)
  }

  const classeDaCaixa = 'flex min-h-11 cursor-pointer items-center gap-3 text-sm text-texto'
  const classeDoCheckbox = 'h-5 w-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

  if (etapa === 2) {
    return (
      <div>
        <p className="mb-4 text-sm text-marrom">{comoPaciente ? 'Perfil: Paciente' : 'Perfil: ' + cargoFinal + (ehAdmin ? ' + Administrador' : '')}</p>
        {comoPaciente ? (
          <FormularioNovoPaciente aoConcluir={aoConcluir} />
        ) : (
          <FormularioNovoProfissional cargo={cargoFinal} ehAdmin={ehAdmin} aoConcluir={aoConcluir} />
        )}
        <div className="mt-4">
          <Botao variante="secundario" aoClicar={() => setEtapa(1)}>
            Voltar ao perfil
          </Botao>
        </div>
      </div>
    )
  }

  return (
    <div>
      <TituloDaSecao>Perfil do novo usuário</TituloDaSecao>
      <div className="mb-5 flex flex-col">
        <label className={classeDaCaixa}>
          <input type="checkbox" checked={ehPaciente} onChange={(e) => setEhPaciente(e.target.checked)} className={classeDoCheckbox} />
          Paciente
        </label>
        <label className={classeDaCaixa}>
          <input type="checkbox" checked={ehProfissional} onChange={(e) => setEhProfissional(e.target.checked)} className={classeDoCheckbox} />
          Profissional (Médico, Dentista ou Terapeuta)
        </label>
        <label className={classeDaCaixa}>
          <input type="checkbox" checked={ehAdmin} onChange={(e) => setEhAdmin(e.target.checked)} className={classeDoCheckbox} />
          Administrador (permissão adicional, só para profissional)
        </label>
      </div>

      {ehProfissional && <CampoSelect id="cargo" rotulo="Cargo" opcoes={cargos} valor={cargo} aoMudar={setCargo} />}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Botao variante="secundario" aoClicar={aoCancelar}>
          Cancelar
        </Botao>
        <Botao aoClicar={continuar}>Continuar</Botao>
      </div>
    </div>
  )
}

export default NovoUsuario
