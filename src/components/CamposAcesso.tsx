import type { DadosDaConta, Erros } from '../data/usuarios'
import Campo from './Campo'
import TituloDaSecao from './TituloDaSecao'

interface CamposAcessoProps {
  dados: DadosDaConta
  aoMudar: (campo: string, valor: string) => void
  erros: Erros
}

// E-mail, senha e confirmação da senha
function CamposAcesso({ dados, aoMudar, erros }: CamposAcessoProps) {
  return (
    <>
      <TituloDaSecao comEspacoAcima>Acesso ao sistema</TituloDaSecao>
      <Campo id="email" rotulo="Email" tipo="email" placeholder="seu@email.com" valor={dados.email} aoMudar={(v) => aoMudar('email', v)} erro={erros.email} autoComplete="off" />
      <div className="grid gap-x-5 sm:grid-cols-2">
        <Campo id="senha" rotulo="Senha" tipo="password" placeholder="Crie uma senha" valor={dados.senha} aoMudar={(v) => aoMudar('senha', v)} erro={erros.senha} autoComplete="new-password" />
        <Campo id="confirmarSenha" rotulo="Confirmar senha" tipo="password" placeholder="Repita a senha" valor={dados.confirmarSenha} aoMudar={(v) => aoMudar('confirmarSenha', v)} erro={erros.confirmarSenha} autoComplete="new-password" />
      </div>
    </>
  )
}

export default CamposAcesso
