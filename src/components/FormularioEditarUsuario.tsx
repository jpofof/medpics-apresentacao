import { useState } from 'react'
import { contaDoUsuario, extrasDoProfissional, salvarEdicao } from '../data/admin'
import { buscarPaciente, buscarProfissional, buscarUsuario, contaVazia, origensDoPaciente, semErros, validarConta, validarOrigem, validarProfissional } from '../data/usuarios'
import Botao from './Botao'
import CampoSelect from './CampoSelect'
import CamposAcesso from './CamposAcesso'
import CamposDadosPessoais from './CamposDadosPessoais'
import CamposProfissionais from './CamposProfissionais'
import Mensagem from './Mensagem'

interface FormularioEditarUsuarioProps {
  idUsuario: number
  aoConcluir: () => void
  aoCancelar: () => void
}

// Edição de usuário pelo administrador (Quadro 7). Para profissional inclui a duração da consulta.
// O cargo não pode ser mudado depois do cadastro.
function FormularioEditarUsuario({ idUsuario, aoConcluir, aoCancelar }: FormularioEditarUsuarioProps) {
  const usuario = buscarUsuario(idUsuario)
  const paciente = buscarPaciente(idUsuario)
  const profissional = buscarProfissional(idUsuario)

  const [conta, setConta] = useState(usuario === null ? contaVazia() : contaDoUsuario(usuario))
  const [origem, setOrigem] = useState(paciente === null ? '' : paciente.origem)
  const [extras, setExtras] = useState(extrasDoProfissional(idUsuario))
  const [ehAdmin, setEhAdmin] = useState(profissional !== null && profissional.ehAdministrador)
  const [erros, setErros] = useState(semErros())
  const [erroGeral, setErroGeral] = useState('')

  function mudarConta(campo: string, valor: string) {
    setConta({ ...conta, [campo]: valor })
  }

  function mudarExtras(campo: string, valor: string) {
    setExtras({ ...extras, [campo]: valor })
  }

  function salvar() {
    let novosErros = validarConta(conta, idUsuario, false)
    if (paciente !== null) novosErros = { ...novosErros, ...validarOrigem(origem) }
    if (profissional !== null) novosErros = { ...novosErros, ...validarProfissional(profissional.cargo, extras) }
    setErros(novosErros)
    setErroGeral('')
    if (Object.keys(novosErros).length > 0) {
      window.scrollTo({ top: 0 })
      return
    }

    const erro = salvarEdicao(idUsuario, conta, origem, extras, ehAdmin)
    if (erro !== '') {
      setErroGeral(erro)
      window.scrollTo({ top: 0 })
      return
    }
    aoConcluir()
  }

  if (usuario === null) return null

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault()
        salvar()
      }}
    >
      {(erros.geral || erroGeral) && (
        <div className="mb-5">
          <Mensagem tipo="erro">{erros.geral || erroGeral}</Mensagem>
        </div>
      )}

      <CamposDadosPessoais dados={conta} aoMudar={mudarConta} erros={erros} />

      {paciente !== null && <CampoSelect id="origem" rotulo="Como chegou até a clínica?" opcoes={origensDoPaciente} valor={origem} aoMudar={setOrigem} erro={erros.origem} />}

      {profissional !== null && (
        <>
          <p className="mb-2 text-pequeno text-marrom">Cargo: {profissional.cargo} (não pode ser alterado depois do cadastro)</p>
          <CamposProfissionais cargo={profissional.cargo} dados={extras} aoMudar={mudarExtras} erros={erros} />
          <label className="mb-5 flex min-h-11 cursor-pointer items-center gap-3 text-pequeno text-escuro">
            <input
              type="checkbox"
              checked={ehAdmin}
              onChange={(e) => setEhAdmin(e.target.checked)}
              className="h-5 w-5 shrink-0 cursor-pointer accent-verde-cta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta"
            />
            Administrador (permissão adicional)
          </label>
        </>
      )}

      <CamposAcesso dados={conta} aoMudar={mudarConta} erros={erros} senhaOpcional />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Botao variante="secundario" aoClicar={aoCancelar}>
          Cancelar
        </Botao>
        <div className="sm:flex-1">
          <Botao enviar larguraTotal>
            Salvar alterações
          </Botao>
        </div>
      </div>
    </form>
  )
}

export default FormularioEditarUsuario
