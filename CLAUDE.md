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
- `src/telas.ts` lista as rotas que já existem: menu lateral (`PainelLayout`) e atalhos (`AtalhoRapido`) só viram link se a rota estiver lá; as outras aparecem "em breve". Ao criar uma tela, acrescente a rota em `telas.ts`.
- Componentes das telas iniciais: CartaoIndicador, CartaoProximaConsulta, ListaConsultas, MiniCalendario, AtalhoRapido, AvisosDoPaciente, IconeMenu.

## Estado das fases
- Feitas: 1 dados, 2 login/rotas/menus, 3 anamnese, 4 cadastros/primeiro acesso, Visual (telas iniciais e menu), 5 admin (cadastros pendentes e usuários), 6 disponibilidade e `horariosLivres` (src/data/agenda.ts), 7 agendar/cancelar/avisos/histórico, 8 férias/licença, 9 agenda/atendimento/histórico do profissional (`/profissional/agenda`, `/profissional/historico`), 10 relatórios (`/profissional/relatorios`), regra de login e cadastro livres.
- Pendentes: 11 senha/perfil, 12 limpeza final.
- Status "Recusado" (como no DER). Ao mudar o formato dos dados, aumente `VERSAO_DO_ESQUEMA`.
- PENDENTE DA FASE 8 (retomar aqui): testar com `VALIDACOES_ATIVAS = true` os erros de datas do período ("A data de término não pode ser anterior à data de início"); medir responsividade (360/390/768/1280) de `/admin/ferias` e do cartão "Férias e licença" em `/profissional/disponibilidade`. Depois seguir para a Fase 9.
