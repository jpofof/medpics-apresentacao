# MedPics (React) - versão de apresentação

Versão só visual do Sistema de Gestão de Clínica MedPics (Projeto Integrador da Fatec Votorantim): sem banco de dados e sem login de verdade, com dados de exemplo escritos no topo de cada página.

1. **Como rodar:** `npm install` (só na primeira vez) e `npm run dev`; abra o endereço mostrado no terminal. `npm run build` gera a versão final e `npm run lint` confere o código.
2. **Telas:** página inicial (`/`), login (`/login`: escolha o perfil e clique em Entrar, sem digitar nada), cadastro (`/cadastro`, com formulários de Paciente, Médico, Dentista e Terapeuta que levam ao login), painel do paciente (`/paciente`, `/paciente/agendar`, `/paciente/consultas`), painel em desenvolvimento (`/profissional`, para Médico, Dentista, Terapeuta e Administrador) e a página 404.
3. **Fluxo:** Paciente vai para o painel do paciente; os outros perfis vão para o painel em desenvolvimento. "Sair" é um link para o login. Não há validação nem proteção de rotas.
4. **Estrutura:** `src/App.tsx` tem as rotas; `src/pages` tem uma página por arquivo (com os dados de exemplo no topo); `src/components` tem só o que se repete (barra do topo, rodapé, botões, cartão, layout do painel, campos) e as seções da página inicial; `src/assets` guarda as imagens.
5. **O que não persiste:** cancelar uma consulta e agendar mudam só a tela em que você está; ao recarregar a página tudo volta ao início.
