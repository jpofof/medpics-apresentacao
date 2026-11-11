// Liga ou desliga as validações (campos obrigatórios, e-mail/CPF repetido, senhas iguais, regra das 24h,
// sobreposição de horários, senha e status da conta no login...).
// false = modo teste: nada bloqueia nem mostra erro, e o login é livre (com botões de "Acesso rápido").
// true  = valem todas as regras dos documentos, inclusive o login do Quadro 1.
// Regras que alteram dados (cancelamentos automáticos, inativar) funcionam nos dois modos.
export const VALIDACOES_ATIVAS: boolean = false
