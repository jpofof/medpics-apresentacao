import { useState } from 'react'
import Botao from '../components/Botao'
import BotaoLink from '../components/BotaoLink'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import FormularioNovoPaciente from '../components/FormularioNovoPaciente'
import Mensagem from '../components/Mensagem'
import PainelLayout from '../components/PainelLayout'

// Atalho do administrador para cadastrar um paciente (por telefone ou deixando pendente para o primeiro acesso).
// Depois de salvar mostra a mensagem de sucesso; "Cadastrar outro" volta ao formulário vazio.
function AdminNovoPaciente() {
  const [nomeCadastrado, setNomeCadastrado] = useState('')

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Novo paciente" subtitulo="A conta já fica ativa, sem aprovação" />

      <div className="max-w-3xl">
        <Cartao>
          {nomeCadastrado === '' ? (
            <FormularioNovoPaciente aoConcluir={(nome) => setNomeCadastrado(nome === '' ? 'Paciente' : nome)} />
          ) : (
            <div className="py-2">
              <div className="mb-5">
                <Mensagem>Cadastro efetuado com sucesso: {nomeCadastrado}.</Mensagem>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Botao aoClicar={() => setNomeCadastrado('')}>Cadastrar outro paciente</Botao>
                <BotaoLink para="/admin">Voltar à visão geral</BotaoLink>
              </div>
            </div>
          )}
        </Cartao>
      </div>
    </PainelLayout>
  )
}

export default AdminNovoPaciente
