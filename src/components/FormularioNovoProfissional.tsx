import { useState } from 'react'
import { contaVazia, criarProfissional, profissionalVazio, semErros } from '../data/usuarios'
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

// Cadastro de Médico, Dentista ou Terapeuta feito pelo administrador (cadastro livre, nada é obrigatório): a conta já nasce Ativa
function FormularioNovoProfissional({ cargo, ehAdmin, aoConcluir }: FormularioNovoProfissionalProps) {
  const [conta, setConta] = useState(contaVazia())
  const [dados, setDados] = useState(profissionalVazio())

  function mudarConta(campo: string, valor: string) {
    setConta({ ...conta, [campo]: valor })
  }

  function mudarDados(campo: string, valor: string) {
    setDados({ ...dados, [campo]: valor })
  }

  function cadastrar() {
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
      <CamposDadosPessoais dados={conta} aoMudar={mudarConta} erros={semErros()} />
      <CamposProfissionais cargo={cargo} dados={dados} aoMudar={mudarDados} erros={semErros()} />
      <CamposAcesso dados={conta} aoMudar={mudarConta} erros={semErros()} />

      <Botao enviar larguraTotal>
        {'Cadastrar ' + cargo.toLowerCase()}
      </Botao>
    </form>
  )
}

export default FormularioNovoProfissional
