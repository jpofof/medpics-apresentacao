import { useState } from 'react'
import { anamneseVazia } from '../data/anamnese'
import { contaVazia, criarPaciente, origensDoPaciente, semErros, usuarioLogado } from '../data/usuarios'
import Botao from './Botao'
import CampoSelect from './CampoSelect'
import CampoTermos from './CampoTermos'
import CamposAcesso from './CamposAcesso'
import CamposDadosPessoais from './CamposDadosPessoais'
import FormularioAnamnese from './FormularioAnamnese'
import TituloDaSecao from './TituloDaSecao'

interface FormularioNovoPacienteProps {
  aoConcluir: (nome: string) => void
}

// Cadastro de paciente feito pelo administrador (Quadro 7). Cadastro livre: nada é obrigatório nem conferido. A conta já nasce Ativa. Dois caminhos:
// - paciente ao telefone: o administrador preenche a anamnese junto e registra o aceite dos termos;
// - senão: termos e anamnese ficam pendentes para o primeiro acesso do próprio paciente.
function FormularioNovoPaciente({ aoConcluir }: FormularioNovoPacienteProps) {
  const [conta, setConta] = useState(contaVazia())
  const [origem, setOrigem] = useState('')
  const [aoTelefone, setAoTelefone] = useState(false)
  const [termos, setTermos] = useState(false)
  const [anamnese, setAnamnese] = useState(anamneseVazia())

  function mudarConta(campo: string, valor: string) {
    setConta({ ...conta, [campo]: valor })
  }

  function cadastrar() {
    const administrador = usuarioLogado()
    if (administrador === null) return

    criarPaciente(conta, origem, aoTelefone && termos, aoTelefone ? anamnese : null, administrador.id)
    aoConcluir(conta.nome)
  }

  const classeDaOpcao = (escolhida: boolean) =>
    `rounded-2xl border-[1.5px] p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-cta ${
      escolhida ? 'border-verde-cta bg-verde-cta/10' : 'border-marrom-claro bg-fundo hover:border-verde-cta active:bg-bege'
    }`

  return (
    <form
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault()
        cadastrar()
      }}
    >
      <CamposDadosPessoais dados={conta} aoMudar={mudarConta} erros={semErros()} />
      <CampoSelect id="origem" rotulo="Como chegou até a clínica?" opcoes={origensDoPaciente} valor={origem} aoMudar={setOrigem} />
      <CamposAcesso dados={conta} aoMudar={mudarConta} erros={semErros()} />

      <TituloDaSecao comEspacoAcima>Termos e anamnese</TituloDaSecao>
      <div role="radiogroup" aria-label="Como preencher termos e anamnese" className="mb-6 grid gap-3 sm:grid-cols-2">
        <button type="button" role="radio" aria-checked={aoTelefone} onClick={() => setAoTelefone(true)} className={classeDaOpcao(aoTelefone)}>
          <p className="mb-1 text-lg text-escuro">Paciente ao telefone</p>
          <p className="text-sm text-marrom">Preencho a anamnese junto com o paciente e registro o aceite dos termos.</p>
        </button>
        <button type="button" role="radio" aria-checked={!aoTelefone} onClick={() => setAoTelefone(false)} className={classeDaOpcao(!aoTelefone)}>
          <p className="mb-1 text-lg text-escuro">Deixar para o primeiro acesso</p>
          <p className="text-sm text-marrom">O próprio paciente aceita os termos e preenche a anamnese ao entrar.</p>
        </button>
      </div>

      {aoTelefone && (
        <>
          <CampoTermos aceito={termos} aoMudar={setTermos} texto="O paciente informou que aceita os Termos de Uso e a Política de Privacidade (LGPD)" />
          <FormularioAnamnese estado={anamnese} aoMudar={setAnamnese} />
        </>
      )}

      <Botao enviar larguraTotal>
        Cadastrar paciente
      </Botao>
    </form>
  )
}

export default FormularioNovoPaciente
