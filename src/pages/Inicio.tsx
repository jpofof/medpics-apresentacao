import CannabisMedicinal from '../components/CannabisMedicinal'
import ComeceHoje from '../components/ComeceHoje'
import ComoFunciona from '../components/ComoFunciona'
import Depoimentos from '../components/Depoimentos'
import Footer from '../components/Footer'
import Introducao from '../components/Introducao'
import Navbar from '../components/Navbar'
import ParaQuemE from '../components/ParaQuemE'
import Programa from '../components/Programa'

// Página inicial (institucional): barra do topo, as seções da clínica e o rodapé
function Inicio() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Introducao />
        <CannabisMedicinal />
        <ParaQuemE />
        <ComoFunciona />
        <Programa />
        <Depoimentos />
        <ComeceHoje />
      </main>
      <Footer />
    </div>
  )
}

export default Inicio
