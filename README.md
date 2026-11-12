# MedPics (React) — versão completa

Sistema de Gestão de Clínica do Projeto Integrador da Fatec Votorantim. Só front-end (React + TypeScript + Tailwind), sem back-end: os dados ficam no `localStorage` do navegador. Esta branch (`projeto-completo`) está sendo construída por fases; a `main` guarda a versão de apresentação (só visual).

## Como rodar
`npm install` (só na primeira vez), `npm run dev` e abra o endereço mostrado. `npm run build` gera a versão final e `npm run lint` confere o código.

## Logins de demonstração
Senha de todas: `medpics123`. As contas são criadas sozinhas quando o armazenamento está vazio.

| E-mail | Perfil | O que acontece |
| --- | --- | --- |
| admin@medpics.com | Médico + administrador | entra; menu com seções Profissional e Administração |
| medico@medpics.com | Médico | entra |
| dentista@medpics.com | Dentista | entra |
| terapeuta@medpics.com | Terapeuta | entra |
| paciente@medpics.com | Paciente | entra; tem anamnese e 3 consultas (futura, realizada, cancelada) |
| aguardando@medpics.com | Terapeuta | com validações ativas: "Cadastro aguardando aprovação do administrador" |
| recusado@medpics.com | Dentista (status Recusado) | com validações ativas: "Cadastro recusado. Entre em contato com a clínica" |
| inativo@medpics.com | Paciente | com validações ativas: "Conta inativa. Entre em contato com a clínica" |

## Como o login funciona (dois modos, controlados só por `VALIDACOES_ATIVAS` em `src/config.ts`)
- **`false` (modo teste, padrão no desenvolvimento):** o login é livre. "Entrar" sempre entra, com campos vazios ou preenchidos, sem checar senha nem status da conta. Se o e-mail for de uma conta existente, entra nela; se estiver vazio ou não existir, entra como paciente@medpics.com. A tela de login mostra a faixa "Acesso rápido (modo teste)" com botões das 8 contas de demonstração. Continua gravando o último login, a sessão é só da aba e as rotas por perfil continuam protegidas.
- **`true`:** vale o Quadro 1: e-mail e senha corretos, as 4 mensagens literais ("E-mail ou senha inválidos", "Conta inativa. Entre em contato com a clínica", "Cadastro aguardando aprovação do administrador", "Cadastro recusado. Entre em contato com a clínica") e só conta Ativa entra. A faixa de acesso rápido some.
- Nos dois modos, paciente com termos/anamnese pendentes é levado a `/primeiro-acesso` (é um fluxo, não uma validação).

Para recomeçar do zero: apague os dados do site no navegador, ou aumente `VERSAO_DO_ESQUEMA` em `src/data/inicializacao.ts`. A sessão fica só na aba (fechou a aba, saiu).

## Telas e menu lateral
- Cada perfil tem uma tela inicial com dados reais: paciente (próxima consulta, indicadores, calendário, avisos, últimas consultas), profissional (indicadores, agenda de hoje, calendário, atalhos, aviso se não há disponibilidade) e administração (indicadores da clínica e cadastros pendentes). Profissional que também é administrador tem as seções "Meu painel" e "Administração".
- O menu mostra os itens na ordem final, mas só os de telas que já existem são links; os demais aparecem com a etiqueta "em breve". A lista de telas prontas fica em `src/telas.ts`.
- Administração: `/admin/cadastros` (aprovar ou recusar profissionais), `/admin/usuarios` (lista com filtro, novo usuário, editar, ativar/inativar) e `/admin/novo-paciente` (atalho para cadastrar paciente).

## Disponibilidade e horários livres
- `/profissional/disponibilidade`: lista dos blocos (dia da semana, início, término, status Ativa ou Inativa), nova disponibilidade e edição. Valida término maior que início e sobreposição no mesmo dia (mensagens do Quadro 11).
- `horariosLivres(idProfissional)` em `src/data/agenda.ts` é a função única: divide cada bloco pela duração da consulta, descarta a sobra, tira horários já agendados e passados e os dias de férias/licença, até 30 dias à frente. Alterar a duração (pelo administrador) ou um bloco muda os horários na hora.
- Editar ou desativar um bloco com consultas marcadas mantém as consultas e mostra um aviso ao profissional.
- Interpretação: blocos em Férias/Licença voltam a gerar horários nos dias depois do término do período (o documento diz que o status volta a Ativa nessa data).

## Agendar, cancelar, avisos e histórico
- `/paciente/agendar`: lista de profissionais com horário livre (cargo e especialidade), data e horário; "Consulta agendada com sucesso" ou "Horário indisponível, escolha outro". Sem nenhum horário livre aparece uma mensagem amigável. O administrador agenda em `/admin/agendar` escolhendo antes o paciente (nome ou CPF). O agendamento grava `agendadoPor`.
- Cancelar: em `/paciente/consultas` (paciente, só até 24 horas antes, com validações ativas: "Cancelamento permitido somente até 24 horas antes da consulta") e em `/admin/cancelar` (administrador, a qualquer momento, pesquisando o paciente). Os dois pedem confirmação e gravam `canceladoPor` e `dataCancelamento`. Cancelamento que não foi do próprio paciente gera um aviso no painel dele, com botão Dispensar.
- `/paciente/historico` ("Meu histórico"): data, horário, profissional e status, da mais recente para a mais antiga, com filtro por período e status.
- Com `VALIDACOES_ATIVAS = false` o conflito de horário e a regra das 24h não bloqueiam.

## Férias, licença e cancelamentos automáticos
- Em `/profissional/disponibilidade` (cartão "Férias e licença") o profissional registra Férias ou Licença (início pode ser hoje, término é a previsão de retorno), prorroga ou encerra antes. O registro exige ao menos uma disponibilidade Ativa ("Cadastre uma disponibilidade antes de registrar férias ou licença"), lista as consultas afetadas e pede confirmação. O período vale para todas as disponibilidades Ativas.
- As consultas do período são canceladas (responsável = quem registrou, com data e hora) e cada paciente recebe um aviso. A prorrogação cancela só as consultas do trecho novo.
- O administrador registra em nome do profissional em `/admin/ferias` (escolhe o profissional antes e fica como responsável pelos cancelamentos).
- Disponibilidade nova criada durante um período em vigor herda o mesmo status e período.
- Um único `useEffect` em `src/App.tsx` volta a Ativa as disponibilidades cujo período já terminou.
- A exigência de ter disponibilidade Ativa vale sempre (sem ela não há o que aplicar); as validações de datas só com `VALIDACOES_ATIVAS = true`.

## Mapa de pastas
- `src/App.tsx` — rotas. `/paciente`, `/primeiro-acesso`, `/profissional` e `/admin` ficam dentro de `RotaProtegida`. Cadastros: `/cadastro`, `/cadastro/paciente|medico|dentista|terapeuta`. Admin cadastra paciente em `/admin/novo-paciente`.
- `src/pages` — uma página por arquivo. `src/components` — peças reutilizáveis (layout do painel, campos, botões, navbar...).
- `src/types.ts` — modelos do DER (Usuário, Paciente, Profissional, Terapeuta, Disponibilidade, Agendamento, Anamnese, Aviso).
- `src/data` — funções de dados: `armazenamento` (localStorage), `datas`, `usuarios` (login, sessão, perfil), `agenda`, `anamnese` (catálogo fixo, validação e gravação), `inicializacao` (contas de demonstração).
- `src/config.ts` — `VALIDACOES_ATIVAS`: `false` = nenhuma validação bloqueia e o login é livre (para testar rápido); `true` = valem todas as regras dos documentos. As regras que alteram dados (cancelamentos automáticos, inativar) valem sempre. Deve ficar `true` ao final do projeto.
- `docs/` — documentos de regras, DER, casos de uso e lógica da estrutura (fonte da verdade).

Aviso: as senhas ficam em texto puro no `localStorage` porque é um protótipo; num sistema real isso vai para o back-end com hash.

## Divergências em relação aos documentos
- Avisos ao paciente são guardados (coleção `avisos`) e somem quando ele dispensa; as regras (seção 12) falam em envio simples, sem histórico, por e-mail.
- Campos extras além do DER: `exigeNovaAnamnese` (Paciente), `preenchidaPor` (Anamnese) e a coleção de avisos.
- `Data_hora` do agendamento foi dividida em `data` e `hora`.
- O cargo não pode ser editado depois do cadastro (a "lógica da estrutura" prevê criar/remover o registro de Terapeuta ao mudar o cargo).
- Status da conta "Recusado", como no DER e no Quadro 6.
- Bloqueios de inativar a própria conta e o último administrador ativo (e de remover a permissão do último administrador) valem sempre, mesmo com as validações desligadas, para o administrador não perder o acesso.
- Ao criar usuário com as validações desligadas, perfis inválidos (ex.: paciente + administrador) são resolvidos em favor do paciente; só "nenhum perfil/cargo escolhido" sempre bloqueia, pois não há o que cadastrar.
- Reativar paciente exige nova anamnese se passaram mais de 365 dias desde o último login (ou do cadastro, se nunca entrou).
- Cadastro, ao enviar, volta para `/login` com um aviso (`?cadastro=paciente` ou `?cadastro=profissional` na URL, sem dados pessoais).
- A data de nascimento usa o campo de data do navegador (grava AAAA-MM-DD).
- Na anamnese, cada um dos 5 hábitos exige resposta Sim ou Não (Quadro 3: "exigem resposta"); "Não" fica só na tela, pois o DER não guarda esse dado.
- O administrador cadastra paciente em tela própria (`/admin/novo-paciente`); na Fase 5, "Novo usuário" em `/admin/usuarios` reaproveita o mesmo formulário.
- Itens de "Saúde mental e emocional" e "Sintomas físicos" da anamnese são provisórios (marcados no código), pois a clínica ainda não definiu a lista.
- Item da anamnese é identificado pelo nome (o DER usa um ID_Item).
- Nota: o documento de regras fala em "cinco perfis" e, logo depois, diz que Administrador não é um perfil independente (é permissão de um Profissional). O código segue a segunda; nada foi mudado por causa disso.
