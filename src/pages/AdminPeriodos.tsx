import { useState } from 'react'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import CampoSelect from '../components/CampoSelect'
import PainelLayout from '../components/PainelLayout'
import PeriodoFeriasLicenca from '../components/PeriodoFeriasLicenca'
import { profissionaisAtivos } from '../data/usuarios'

// Administrador registra férias ou licença em nome de um profissional (ex.: profissional doente).
// Ele escolhe o profissional antes e fica como responsável pelos cancelamentos.
function AdminPeriodos() {
  const [escolhido, setEscolhido] = useState('') // "Nome — Cargo"

  const profissionais = profissionaisAtivos()
  const opcoes = profissionais.map((p) => p.nome + ' — ' + p.cargo)
  const profissional = profissionais.find((p) => p.nome + ' — ' + p.cargo === escolhido)

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Férias e licença" subtitulo="Registre, prorrogue ou encerre o período de um profissional" />

      <div className="max-w-3xl">
        <Cartao>
          <CampoSelect id="profissional" rotulo="Profissional" opcoes={opcoes} valor={escolhido} aoMudar={setEscolhido} />
          {profissional ? (
            <PeriodoFeriasLicenca key={profissional.id} idProfissional={profissional.id} />
          ) : (
            <p className="rounded-xl bg-bege px-4 py-3 text-pequeno text-marrom">Escolha um profissional para ver ou registrar o período.</p>
          )}
        </Cartao>
      </div>
    </PainelLayout>
  )
}

export default AdminPeriodos
