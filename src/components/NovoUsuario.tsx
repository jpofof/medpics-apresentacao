import { useState } from 'react'
import { validarPerfil } from '../data/admin'
import type { Cargo } from '../types'
import Botao from './Botao'
import CampoSelect from './CampoSelect'
import FormularioNovoPaciente from './FormularioNovoPaciente'
import FormularioNovoProfissional from './FormularioNovoProfissional'
import Mensagem from './Mensagem'
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
// Perfis: Paciente, ou Profissional (Médico, Dentista, Terapeuta) com a opção extra de administrador.
function NovoUsuario({ aoConcluir, aoCancelar }: NovoUsuarioProps) {
  const [ehPaciente, setEhPaciente] = useState(false)
  const [ehProfissional, setEhProfissional] = useState(false)
  const [cargo, setCargo] = useState('')
  const [ehAdmin, setEhAdmin] = useState(false)
  const [etapa, setEtapa] = useState(1)
  const [erro, setErro] = useState('')

  function continuar() {
    // Combinações inválidas (mensagens do Quadro 7, com validações ativas)
    const erroDoPerfil = validarPerfil(ehPaciente, ehProfissional, ehAdmin)
    if (erroDoPerfil !== '') {
      setErro(erroDoPerfil)
      return
    }
    // Sem escolha não há o que cadastrar (vale sempre)
    if (!ehPaciente && !ehProfissional) {
      setErro('Selecione o perfil do usuário')
      return
    }
    if (!ehPaciente && cargo === '') {
      setErro('Selecione o cargo: Médico, Dentista ou Terapeuta')
      return
    }
    setErro('')
    setEtapa(2)
  }

  const classeDaCaixa = 'flex min-h-11 cursor-pointer items-center gap-3 text-sm text-texto'
  const classeDoCheckbox = 'h-5 w-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

  // Paciente tem prioridade se vier junto com outro perfil (só acontece com as validações desligadas)
  if (etapa === 2) {
    return (
      <div>
        <p className="mb-4 text-sm text-marrom">{ehPaciente ? 'Perfil: Paciente' : 'Perfil: ' + cargo + (ehAdmin ? ' + Administrador' : '')}</p>
        {ehPaciente ? (
          <FormularioNovoPaciente aoConcluir={aoConcluir} />
        ) : (
          <FormularioNovoProfissional cargo={cargoDaEscolha(cargo)} ehAdmin={ehAdmin} aoConcluir={aoConcluir} />
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
      {erro && (
        <div className="mb-5">
          <Mensagem tipo="erro">{erro}</Mensagem>
        </div>
      )}

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
