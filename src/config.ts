// Liga ou desliga as validações do formulário (campos obrigatórios, e-mail/CPF repetido,
// senhas iguais, regra das 24h, sobreposição de horários...).
// false = nada bloqueia nem mostra erro (bom para testar telas rápido).
// true  = valem todas as regras dos documentos.
// Não afeta: o login por status da conta e as regras que alteram dados (cancelamentos automáticos, inativar).
export const VALIDACOES_ATIVAS = false
