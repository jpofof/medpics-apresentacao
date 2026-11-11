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
- Cadastro, ao enviar, volta para `/login` com um aviso (`?cadastro=paciente` ou `?cadastro=profissional` na URL, sem dados pessoais).
- A data de nascimento usa o campo de data do navegador (grava AAAA-MM-DD).
- Na anamnese, cada um dos 5 hábitos exige resposta Sim ou Não (Quadro 3: "exigem resposta"); "Não" fica só na tela, pois o DER não guarda esse dado.
- O administrador cadastra paciente em tela própria (`/admin/novo-paciente`); na Fase 5, "Novo usuário" em `/admin/usuarios` reaproveita o mesmo formulário.
- Itens de "Saúde mental e emocional" e "Sintomas físicos" da anamnese são provisórios (marcados no código), pois a clínica ainda não definiu a lista.
- Item da anamnese é identificado pelo nome (o DER usa um ID_Item).
- Nota: o documento de regras fala em "cinco perfis" e, logo depois, diz que Administrador não é um perfil independente (é permissão de um Profissional). O código segue a segunda; nada foi mudado por causa disso.
