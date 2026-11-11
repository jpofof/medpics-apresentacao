import { Route, Routes } from 'react-router-dom'
import RotaProtegida from './components/RotaProtegida'
import AdminInicio from './pages/AdminInicio'
import AdminNovoPaciente from './pages/AdminNovoPaciente'
import AgendarConsulta from './pages/AgendarConsulta'
import CadastroPaciente from './pages/CadastroPaciente'
import CadastroProfissional from './pages/CadastroProfissional'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import NaoEncontrada from './pages/NaoEncontrada'
import NovoCadastro from './pages/NovoCadastro'
import PacienteConsultas from './pages/PacienteConsultas'
import PacienteInicio from './pages/PacienteInicio'
import PrimeiroAcesso from './pages/PrimeiroAcesso'
import ProfissionalInicio from './pages/ProfissionalInicio'

// Todas as rotas do site. Cada endereço abre uma página da pasta "pages".
// As telas de /paciente, /primeiro-acesso, /profissional e /admin ficam dentro de RotaProtegida.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />

      <Route path="/cadastro" element={<NovoCadastro />} />
      <Route path="/cadastro/paciente" element={<CadastroPaciente />} />
      <Route path="/cadastro/medico" element={<CadastroProfissional perfil="Médico" />} />
      <Route path="/cadastro/dentista" element={<CadastroProfissional perfil="Dentista" />} />
      <Route path="/cadastro/terapeuta" element={<CadastroProfissional perfil="Terapeuta" />} />

      <Route path="/primeiro-acesso" element={<RotaProtegida area="primeiro-acesso"><PrimeiroAcesso /></RotaProtegida>} />

      <Route path="/paciente" element={<RotaProtegida area="paciente"><PacienteInicio /></RotaProtegida>} />
      <Route path="/paciente/agendar" element={<RotaProtegida area="paciente"><AgendarConsulta /></RotaProtegida>} />
      <Route path="/paciente/consultas" element={<RotaProtegida area="paciente"><PacienteConsultas /></RotaProtegida>} />

      <Route path="/profissional" element={<RotaProtegida area="profissional"><ProfissionalInicio /></RotaProtegida>} />

      <Route path="/admin" element={<RotaProtegida area="admin"><AdminInicio /></RotaProtegida>} />
      <Route path="/admin/novo-paciente" element={<RotaProtegida area="admin"><AdminNovoPaciente /></RotaProtegida>} />

      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  )
}

export default App
