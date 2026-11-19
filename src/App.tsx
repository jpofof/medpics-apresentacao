import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import RolagemDaPagina from './components/RolagemDaPagina'
import RotaProtegida from './components/RotaProtegida'
import { voltarAtivasAposTermino } from './data/agenda'
import AdminInicio from './pages/AdminInicio'
import AdminAgendar from './pages/AdminAgendar'
import AdminCadastros from './pages/AdminCadastros'
import AdminCancelar from './pages/AdminCancelar'
import AdminNovoPaciente from './pages/AdminNovoPaciente'
import AdminPeriodos from './pages/AdminPeriodos'
import AdminUsuarios from './pages/AdminUsuarios'
import AgendarConsulta from './pages/AgendarConsulta'
import CannabisMedicinalPagina from './pages/CannabisMedicinalPagina'
import CadastroPaciente from './pages/CadastroPaciente'
import CadastroProfissional from './pages/CadastroProfissional'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import NaoEncontrada from './pages/NaoEncontrada'
import NovoCadastro from './pages/NovoCadastro'
import PraticasIntegrativas from './pages/PraticasIntegrativas'
import ProgramaTerapeutico from './pages/ProgramaTerapeutico'
import PacienteConsultas from './pages/PacienteConsultas'
import PacienteHistorico from './pages/PacienteHistorico'
import PacienteInicio from './pages/PacienteInicio'
import EsqueciSenha from './pages/EsqueciSenha'
import MeuPerfil from './pages/MeuPerfil'
import RedefinirSenha from './pages/RedefinirSenha'
import PrimeiroAcesso from './pages/PrimeiroAcesso'
import ProfissionalAgenda from './pages/ProfissionalAgenda'
import ProfissionalDisponibilidade from './pages/ProfissionalDisponibilidade'
import ProfissionalRelatorios from './pages/ProfissionalRelatorios'
import ProfissionalHistorico from './pages/ProfissionalHistorico'
import ProfissionalInicio from './pages/ProfissionalInicio'

// Todas as rotas do site. Cada endereço abre uma página da pasta "pages".
// As telas de /paciente, /primeiro-acesso, /profissional e /admin ficam dentro de RotaProtegida.
function App() {
  // ÚNICO useEffect do sistema para as checagens automáticas: ao abrir o app, as disponibilidades em Férias ou
  // Licença cuja data de término já passou voltam a Ativa e os horários voltam a aparecer, sem ação manual.
  useEffect(() => {
    voltarAtivasAposTermino()
  }, [])

  return (
    <>
    <RolagemDaPagina />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cannabis-medicinal" element={<CannabisMedicinalPagina />} />
        <Route path="/programa-terapeutico" element={<ProgramaTerapeutico />} />
        <Route path="/praticas-integrativas" element={<PraticasIntegrativas />} />
        <Route path="/login" element={<Login />} />
  
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
  
        <Route path="/cadastro" element={<NovoCadastro />} />
        <Route path="/cadastro/paciente" element={<CadastroPaciente />} />
        <Route path="/cadastro/medico" element={<CadastroProfissional perfil="Médico" />} />
        <Route path="/cadastro/dentista" element={<CadastroProfissional perfil="Dentista" />} />
        <Route path="/cadastro/terapeuta" element={<CadastroProfissional perfil="Terapeuta" />} />
  
        <Route path="/primeiro-acesso" element={<RotaProtegida area="primeiro-acesso"><PrimeiroAcesso /></RotaProtegida>} />
  
        <Route path="/perfil" element={<RotaProtegida area="logado"><MeuPerfil /></RotaProtegida>} />
  
        <Route path="/paciente" element={<RotaProtegida area="paciente"><PacienteInicio /></RotaProtegida>} />
        <Route path="/paciente/agendar" element={<RotaProtegida area="paciente"><AgendarConsulta /></RotaProtegida>} />
        <Route path="/paciente/consultas" element={<RotaProtegida area="paciente"><PacienteConsultas /></RotaProtegida>} />
  
        <Route path="/paciente/historico" element={<RotaProtegida area="paciente"><PacienteHistorico /></RotaProtegida>} />
  
        <Route path="/profissional" element={<RotaProtegida area="profissional"><ProfissionalInicio /></RotaProtegida>} />
  
        <Route path="/profissional/disponibilidade" element={<RotaProtegida area="profissional"><ProfissionalDisponibilidade /></RotaProtegida>} />
  
        <Route path="/profissional/agenda" element={<RotaProtegida area="profissional"><ProfissionalAgenda /></RotaProtegida>} />
        <Route path="/profissional/historico" element={<RotaProtegida area="profissional"><ProfissionalHistorico /></RotaProtegida>} />
  
        <Route path="/profissional/relatorios" element={<RotaProtegida area="profissional"><ProfissionalRelatorios /></RotaProtegida>} />
  
        <Route path="/admin" element={<RotaProtegida area="admin"><AdminInicio /></RotaProtegida>} />
        <Route path="/admin/cadastros" element={<RotaProtegida area="admin"><AdminCadastros /></RotaProtegida>} />
        <Route path="/admin/novo-paciente" element={<RotaProtegida area="admin"><AdminNovoPaciente /></RotaProtegida>} />
        <Route path="/admin/ferias" element={<RotaProtegida area="admin"><AdminPeriodos /></RotaProtegida>} />
        <Route path="/admin/agendar" element={<RotaProtegida area="admin"><AdminAgendar /></RotaProtegida>} />
        <Route path="/admin/cancelar" element={<RotaProtegida area="admin"><AdminCancelar /></RotaProtegida>} />
        <Route path="/admin/usuarios" element={<RotaProtegida area="admin"><AdminUsuarios /></RotaProtegida>} />
  
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </>
  )
}

export default App
