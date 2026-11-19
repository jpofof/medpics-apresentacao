// Interruptor das validações do SISTEMA (regra das 24h, sobreposição de horários, datas de férias,
// campos obrigatórios e e-mail/CPF repetido na edição de usuário e de perfil, combinação de perfis, mensagens dos quadros...).
// true  = valem todas as regras dos documentos (valor final do projeto).
// false = modo de teste rápido: essas regras deixam de bloquear.
//
// LOGIN e CADASTRO NÃO dependem deste interruptor: são sempre livres.
// - Login: "Entrar" sempre entra, sem conferir senha nem status da conta (Aguardando, Recusado, Inativa).
// - Cadastro (paciente, médico, dentista, terapeuta, cadastro pelo administrador e primeiro acesso):
//   nenhum campo é obrigatório, nada é conferido e não há mensagem de erro.
// Regras que alteram dados (cancelamentos automáticos, inativar, bloqueio do último administrador) valem sempre.
export const VALIDACOES_ATIVAS: boolean = true
