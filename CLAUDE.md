# MedPics — Sistema de Gestão de Clínica (versão completa)

Projeto Integrador da Fatec Votorantim (DSM). Front-end only: React + TypeScript + Tailwind v4 + React Router, dados no localStorage.
Quem mantém é estudante iniciante: código SIMPLES e legível. Branch de trabalho: `projeto-completo` (a `main` é a versão de apresentação, não mexer). Sem push sem pedido; commit local por fase ("Fase N: resumo").

## Regras de código
- Só: componentes de função, props, useState, useEffect, Router básico (Routes, Route, Link, NavLink, Navigate, useNavigate).
- PROIBIDO: Context, Redux, useReducer, hooks customizados, generics, Partial/Omit/Pick, enums, `as`, `any`, libs novas.
- Um componente por arquivo, nomes em português, comentários curtos em português. Reutilizar o design system (classes Tailwind e componentes existentes).
- Dados: funções simples em `src/data/` (armazenamento, datas, usuarios, agenda, anamnese, inicializacao). Modelos do DER em `src/types.ts`.
- Validações passam por `VALIDACOES_ATIVAS` em `src/config.ts` (false em desenvolvimento; true ao final, Fase 12). Login por status e regras que mudam dados valem sempre.
- Datas: texto AAAA-MM-DD e HH:mm; exibir dd/mm/aaaa. Perfil é calculado (tem registro de Paciente? senão cargo do Profissional); administrador = `ehAdministrador` de um Profissional.
- Responsividade (360/390/768/1280px): sem rolagem horizontal, botões >= 44px, menus mobile, estados vazios amigáveis.

## Documentos (fonte da verdade, em `docs/*.docx`)
regras-de-negocio-sistema, Descricao_DER_Sistema_Clinica, descricoes-casos-de-uso (Quadros 1 a 14), logica-estrutura-sistema.

## Logins de demonstração (senha `medpics123`)
admin@ (Médico + admin), medico@, dentista@, terapeuta@, paciente@ (com anamnese e 3 consultas), aguardando@, recusado@, inativo@ — todos `@medpics.com`.
Ao mudar o formato dos dados, aumente `VERSAO_DO_ESQUEMA` em `src/data/inicializacao.ts`.

## Estado das fases
- Fase 1 (tipos, dados, contas demo): feita.
- Fase 2 (login único, rotas por perfil, menus, painel do paciente real): feita.
- Pendente: 3 anamnese, 4 cadastros/primeiro acesso, 5 admin, 6 disponibilidade, 7 agendar/cancelar/avisos/histórico, 8 férias/licença, 9 agenda/atendimento, 10 relatórios, 11 senha/perfil, 12 limpeza final.
- Provisório: `AgendarConsulta` (horários fixos, não salva, até a Fase 7); cancelar em "Minhas consultas" ainda sem regra das 24h (Fase 7).
- Cadastros (/cadastro/*) ainda são só visual e não salvam (Fase 4).
