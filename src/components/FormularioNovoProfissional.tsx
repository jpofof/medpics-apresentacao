import { useState } from 'react'
import { contaVazia, criarProfissional, profissionalVazio, semErros, validarConta, validarProfissional } from '../data/usuarios'
import type { Cargo } from '../types'
import Botao from './Botao'
import CamposAcesso from './CamposAcesso'
import CamposDadosPessoais from './CamposDadosPessoais'
import CamposProfissionais from './CamposProfissionais'

interface FormularioNovoProfissionalProps {
  cargo: Cargo
  ehAdmin: boolean // também recebe a permissão de administrador
  aoConcluir: (nome: string) => void
}

// Cadastro de Médico, Dentista ou Terapeuta feito pelo administrador: a conta já nasce Ativa (sem aprovação)
function FormularioNovoProfissional({ cargo, ehAdmin, aoConcluir }: FormularioNovoProfissionalProps) {
  const [conta, setConta] = useState(contaVazia())
  const [dados, setDados] = useState(profissionalVazio())
  const [erros, setErros] = useState(semErros())

  function mudarConta(campo: string, valor: string) {
    setConta({ ...conta, [campo]: valor })
  }

  function mudarDados(campo: string, valor: string) {
    setDados({ ...dados, [campo]: valor })
  }

  function cadastrar() {
    const novosErros = { ...validarConta(conta), ...validarProfissional(cargo, dados) }
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) {
      window.scrollTo({ top: 0 })
      return
    }
    criarProfissional(cargo, conta, dados, 'Ativa', ehAdmin)
    aoConcluir(conta.nome)
  }

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault()
        cadastrar()
      }}
    >
      {erros.geral && (
        <div role="alert" className="mb-5 rounded-xl border border-erro/40 bg-erro/10 px-4 py-3 text-sm text-erro">
          {erros.geral}
        </div>
      )}

      <CamposDadosPessoais dados={conta} aoMudar={mudarConta} erros={erros} />
      <CamposProfissionais cargo={cargo} dados={dados} aoMudar={mudarDados} erros={erros} />
      <CamposAcesso dados={conta} aoMudar={mudarConta} erros={erros} />

      <Botao enviar larguraTotal>
        {'Cadastrar ' + cargo.toLowerCase()}
      </Botao>
    </form>
  )
}

export default FormularioNovoProfissional
