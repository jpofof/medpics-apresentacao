// Telas que já existem. Menu lateral e atalhos só viram link quando a rota está nesta lista;
// as outras aparecem desabilitadas com a etiqueta "em breve". Ao criar uma tela nova, acrescente a rota aqui.
const telasProntas = [
  '/paciente',
  '/paciente/agendar',
  '/paciente/consultas',
  '/paciente/historico',
  '/profissional',
  '/profissional/disponibilidade',
  '/profissional/agenda',
  '/profissional/historico',
  '/profissional/relatorios',
  '/admin',
  '/admin/cadastros',
  '/admin/usuarios',
  '/admin/novo-paciente',
  '/admin/agendar',
  '/admin/cancelar',
  '/admin/ferias',
]

export function telaPronta(rota: string): boolean {
  return telasProntas.includes(rota)
}
