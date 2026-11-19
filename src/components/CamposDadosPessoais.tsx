import type { DadosDaConta, Erros } from '../data/usuarios'
import Campo from './Campo'
import TituloDaSecao from './TituloDaSecao'

interface CamposDadosPessoaisProps {
  dados: DadosDaConta
  aoMudar: (campo: string, valor: string) => void
  erros: Erros
}

// Nome, CPF, nascimento, telefone e endereço (iguais em todos os cadastros)
function CamposDadosPessoais({ dados, aoMudar, erros }: CamposDadosPessoaisProps) {
  return (
    <>
      <TituloDaSecao>Dados pessoais</TituloDaSecao>
      <div className="grid gap-x-5 sm:grid-cols-2">
        <Campo id="nome" rotulo="Nome" placeholder="Nome completo" valor={dados.nome} aoMudar={(v) => aoMudar('nome', v)} erro={erros.nome} />
        <Campo id="cpf" rotulo="CPF" placeholder="000.000.000-00" valor={dados.cpf} aoMudar={(v) => aoMudar('cpf', v)} erro={erros.cpf} />
        <Campo id="nascimento" rotulo="Data de nascimento" tipo="date" valor={dados.nascimento} aoMudar={(v) => aoMudar('nascimento', v)} erro={erros.nascimento} />
        <Campo id="telefone" rotulo="Telefone" tipo="tel" placeholder="(11) 99999-9999" valor={dados.telefone} aoMudar={(v) => aoMudar('telefone', v)} erro={erros.telefone} />
      </div>
      <Campo id="endereco" rotulo="Endereço" placeholder="Rua, número, bairro e cidade" valor={dados.endereco} aoMudar={(v) => aoMudar('endereco', v)} erro={erros.endereco} />
    </>
  )
}

export default CamposDadosPessoais
