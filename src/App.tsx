import { Route, Routes } from 'react-router-dom'
import AgendarConsulta from './pages/AgendarConsulta'
import CadastroPaciente from './pages/CadastroPaciente'
import CadastroProfissional from './pages/CadastroProfissional'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import NaoEncontrada from './pages/NaoEncontrada'
import NovoCadastro from './pages/NovoCadastro'
import PacienteConsultas from './pages/PacienteConsultas'
import PacienteInicio from './pages/PacienteInicio'
import PainelEmDesenvolvimento from './pages/PainelEmDesenvolvimento'

// Todas as rotas do site. Cada endereço abre uma página da pasta "pages".
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

      <Route path="/paciente" element={<PacienteInicio />} />
      <Route path="/paciente/agendar" element={<AgendarConsulta />} />
      <Route path="/paciente/consultas" element={<PacienteConsultas />} />

      <Route path="/profissional" element={<PainelEmDesenvolvimento />} />

      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  )
}

export default App
