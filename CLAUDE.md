# MedPics — Sistema de Gestão de Clínica (versão completa)

Projeto Integrador da Fatec Votorantim (DSM). Front-end only: React + TypeScript + Tailwind v4 + React Router, dados no localStorage.
Quem mantém é estudante iniciante: código SIMPLES e legível. Branch de trabalho: `projeto-completo` (a `main` é a versão de apresentação, não mexer). Sem push sem pedido; commit local por fase ("Fase N: resumo").

## Regras de código
- Só: componentes de função, props, useState, useEffect, Router básico (Routes, Route, Link, NavLink, Navigate, useNavigate).
- PROIBIDO: Context, Redux, useReducer, hooks customizados, generics, Partial/Omit/Pick, enums, `as`, `any`, libs novas.
- Um componente por arquivo, nomes em português, comentários curtos em português. Reutilizar o design system (classes Tailwind e componentes existentes).
- Dados: funções simples em `src/data/` (armazenamento, datas, usuarios, agenda, anamnese, inicializacao). Modelos do DER em `src/types.ts`.
- Validações do sistema passam por `VALIDACOES_ATIVAS` (`src/config.ts`, deve ficar `true`). LOGIN e CADASTRO são SEMPRE livres (sem validação, sem erro, sem `required`), independente do interruptor. Regras que mudam dados valem sempre.
- Datas: texto AAAA-MM-DD e HH:mm; exibir dd/mm/aaaa. Perfil é calculado (tem registro de Paciente? senão cargo do Profissional); administrador = `ehAdministrador` de um Profissional.
- Responsividade (360/390/768/1280px): sem rolagem horizontal, botões >= 44px, menus mobile, estados vazios amigáveis.

## Documentos (fonte da verdade, em `docs/*.docx`)
regras-de-negocio-sistema, Descricao_DER_Sistema_Clinica, descricoes-casos-de-uso (Quadros 1 a 14), logica-estrutura-sistema.

## Logins de demonstração (senha `medpics123`)
admin@ (Médico + admin), medico@, dentista@, terapeuta@, paciente@ (com anamnese e 3 consultas), aguardando@, recusado@, inativo@ — todos `@medpics.com`.

## Telas e menu
- Todas as telas existem; o menu (`PainelLayout`) e os atalhos (`AtalhoRapido`) sempre são links.
- Componentes das telas iniciais: CartaoIndicador, CartaoProximaConsulta, ListaConsultas, MiniCalendario, AtalhoRapido, AvisosDoPaciente, IconeMenu.

## Estado das fases
- Feitas: 1 dados, 2 login/rotas/menus, 3 anamnese, 4 cadastros/primeiro acesso, Visual (telas iniciais e menu), 5 admin (cadastros pendentes e usuários), 6 disponibilidade e `horariosLivres` (src/data/agenda.ts), 7 agendar/cancelar/avisos/histórico, 8 férias/licença, 9 agenda/atendimento/histórico do profissional (`/profissional/agenda`, `/profissional/historico`), 10 relatórios (`/profissional/relatorios`), 11 senha e perfil (`/esqueci-senha`, `/redefinir-senha`, `/perfil`), regra de login e cadastro livres.
- 12 limpeza e conferência final feitas. O front-end está completo; `VALIDACOES_ATIVAS = true`.
- Status "Recusado" (como no DER). Ao mudar o formato dos dados, aumente `VERSAO_DO_ESQUEMA`.
