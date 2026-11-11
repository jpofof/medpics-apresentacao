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
| aguardando@medpics.com | Terapeuta | "Cadastro aguardando aprovação do administrador" |
| recusado@medpics.com | Dentista | "Cadastro recusado. Entre em contato com a clínica" |
| inativo@medpics.com | Paciente | "Conta inativa. Entre em contato com a clínica" |

Para recomeçar do zero: apague os dados do site no navegador, ou aumente `VERSAO_DO_ESQUEMA` em `src/data/inicializacao.ts`. A sessão fica só na aba (fechou a aba, saiu).

## Mapa de pastas
- `src/App.tsx` — rotas. `/paciente`, `/profissional` e `/admin` ficam dentro de `RotaProtegida`.
- `src/pages` — uma página por arquivo. `src/components` — peças reutilizáveis (layout do painel, campos, botões, navbar...).
- `src/types.ts` — modelos do DER (Usuário, Paciente, Profissional, Terapeuta, Disponibilidade, Agendamento, Anamnese, Aviso).
- `src/data` — funções de dados: `armazenamento` (localStorage), `datas`, `usuarios` (login, sessão, perfil), `agenda`, `anamnese` (catálogo fixo + leitura/gravação), `inicializacao` (contas de demonstração).
- `src/config.ts` — `VALIDACOES_ATIVAS`: `false` = nenhuma validação de formulário bloqueia (para testar rápido); `true` = valem todas as regras dos documentos. O login por status da conta e as regras que alteram dados valem sempre.
- `docs/` — documentos de regras, DER, casos de uso e lógica da estrutura (fonte da verdade).

Aviso: as senhas ficam em texto puro no `localStorage` porque é um protótipo; num sistema real isso vai para o back-end com hash.

## Divergências em relação aos documentos
- Status da conta "Recusada" (feminino); o DER e o Quadro 6 escrevem "Recusado".
- Avisos ao paciente são guardados (coleção `avisos`) e somem quando ele dispensa; as regras (seção 12) falam em envio simples, sem histórico, por e-mail.
- Campos extras além do DER: `exigeNovaAnamnese` (Paciente), `preenchidaPor` (Anamnese) e a coleção de avisos.
- `Data_hora` do agendamento foi dividida em `data` e `hora`.
- O cargo não pode ser editado depois do cadastro (a "lógica da estrutura" prevê criar/remover o registro de Terapeuta ao mudar o cargo).
- Itens de "Saúde mental e emocional" e "Sintomas físicos" da anamnese são provisórios (marcados no código), pois a clínica ainda não definiu a lista.
- Item da anamnese é identificado pelo nome (o DER usa um ID_Item).
- Contradição interna: as regras falam em "cinco perfis" e dizem logo depois que Administrador não é perfil; seguimos a segunda (permissão de um Profissional).
