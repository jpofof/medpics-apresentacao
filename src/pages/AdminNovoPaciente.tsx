import { useState } from 'react'
import BotaoLink from '../components/BotaoLink'
import Botao from '../components/Botao'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import FormularioNovoPaciente from '../components/FormularioNovoPaciente'
import PainelLayout from '../components/PainelLayout'

// Tela do administrador para cadastrar um paciente (por telefone ou deixando pendente para o primeiro acesso).
// Depois de salvar mostra a mensagem de sucesso; "Cadastrar outro" volta ao formulário vazio.
function AdminNovoPaciente() {
  const [nomeCadastrado, setNomeCadastrado] = useState('')

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Cadastrar paciente" subtitulo="A conta já fica ativa, sem aprovação" />

      <div className="max-w-3xl">
        <Cartao>
          {nomeCadastrado === '' ? (
            <FormularioNovoPaciente aoConcluir={(nome) => setNomeCadastrado(nome === '' ? 'Paciente' : nome)} />
          ) : (
            <div className="py-4">
              <div role="status" className="mb-5 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
                Cadastro efetuado com sucesso: {nomeCadastrado}.
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Botao aoClicar={() => setNomeCadastrado('')}>Cadastrar outro paciente</Botao>
                <BotaoLink para="/admin">Voltar ao início</BotaoLink>
              </div>
            </div>
          )}
        </Cartao>
      </div>
    </PainelLayout>
  )
}

export default AdminNovoPaciente
