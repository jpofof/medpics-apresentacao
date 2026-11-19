// Modelos de dados, seguindo o DER (docs/Descricao_DER_Sistema_Clinica).
// Datas são texto: "AAAA-MM-DD"; horas "HH:mm"; momentos (login, cancelamento) "AAAA-MM-DDTHH:mm".
// Campos que o texto do DER deixa vazios aqui ficam com '' (texto vazio) ou 0.

export type StatusConta = 'Aguardando aprovação' | 'Ativa' | 'Recusado' | 'Inativa'
export type Cargo = 'Médico' | 'Dentista' | 'Terapeuta'
export type StatusConsulta = 'Agendada' | 'Realizada' | 'Cancelada' | 'Faltou'
export type StatusDisponibilidade = 'Ativa' | 'Férias' | 'Licença' | 'Inativa'

// Dados comuns a qualquer pessoa. Para saber o perfil, veja se existe registro de Paciente ou de Profissional.
export interface Usuario {
  id: number
  nome: string
  cpf: string
  email: string
  senha: string // texto puro só porque é protótipo; num sistema real a senha vai para o back-end com hash
  telefone: string
  nascimento: string
  endereco: string
  cadastro: string // quando a conta foi criada
  ultimoLogin: string // '' = nunca entrou
  statusConta: StatusConta
}

export interface Paciente {
  idUsuario: number
  dataAceiteTermos: string // '' = ainda não aceitou (paciente cadastrado pelo administrador)
  origem: string
  exigeNovaAnamnese: boolean // extra: marcado ao reativar paciente após 365 dias sem login
}

// Médico, Dentista e Terapeuta. Administrador é só a permissão ehAdministrador.
export interface Profissional {
  idUsuario: number
  cargo: Cargo
  numeroRegistro: string
  especialidade: string
  duracaoConsulta: number // minutos (15 a 120)
  ehAdministrador: boolean
}

// Dados extras que só o Terapeuta tem
export interface Terapeuta {
  idUsuario: number
  conselho: string
  graduacao: string
  posGraduacao: string
  formacoesComplementares: string
  areaAtuacao: string
}

export interface Disponibilidade {
  id: number
  idProfissional: number
  diaSemana: number // 0 = domingo ... 6 = sábado
  horaInicio: string
  horaFim: string
  status: StatusDisponibilidade
  inicioBloqueio: string // só em Férias/Licença; senão ''
  fimBloqueio: string
}

// O DER tem um campo Data_hora; aqui ele foi dividido em data e hora para simplificar.
export interface Agendamento {
  id: number
  idPaciente: number
  idProfissional: number
  data: string
  hora: string
  status: StatusConsulta
  agendadoPor: number // id de quem agendou
  canceladoPor: number // id de quem cancelou; 0 = não cancelada
  dataCancelamento: string // '' = não cancelada
}

// Um item marcado na anamnese (relacionamento "Marca" do DER)
export interface ItemMarcado {
  item: string // nome do item, igual ao do catálogo em src/data/anamnese.ts
  frequencia: string
  observacao: string
}

export interface Anamnese {
  id: number
  idPaciente: number
  dataPreenchimento: string
  preenchidaPor: number // extra: id de quem preencheu (o paciente ou o administrador, por telefone)
  itens: ItemMarcado[]
}

// Extra: aviso mostrado no painel do paciente (ex.: consulta cancelada). Some quando ele dispensa.
export interface Aviso {
  id: number
  idPaciente: number
  texto: string
  criadoEm: string
}
