import { Link } from 'react-router-dom'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import FormularioAgendar from '../components/FormularioAgendar'
import PainelLayout from '../components/PainelLayout'
import { usuarioLogado } from '../data/usuarios'

// Tela do paciente para agendar consulta para si (Quadro 8)
function AgendarConsulta() {
  const usuario = usuarioLogado()
  if (usuario === null) return null

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Agendar consulta" subtitulo="Escolha o profissional, a data e um horário livre (até 30 dias à frente)" />

      <div className="max-w-3xl">
        <Cartao>
          <FormularioAgendar idPaciente={usuario.id} />
        </Cartao>
        <p className="mt-4 text-sm text-marrom">
          Veja suas consultas em{' '}
          <Link to="/paciente/consultas" className="inline-flex min-h-11 items-center font-semibold text-verde-cta hover:underline">
            Minhas consultas
          </Link>
          .
        </p>
      </div>
    </PainelLayout>
  )
}

export default AgendarConsulta
