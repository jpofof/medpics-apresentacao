import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import PainelLayout from '../components/PainelLayout'
import { lerUsuarios } from '../data/usuarios'
import folhaIcone from '../assets/icones/icon-folha.svg'

// Início da administração: números gerais. Cadastros pendentes e usuários entram na Fase 5.
function AdminInicio() {
  const usuarios = lerUsuarios()
  const numeros = [
    { numero: usuarios.filter((u) => u.statusConta === 'Ativa').length, texto: 'Contas ativas' },
    { numero: usuarios.filter((u) => u.statusConta === 'Aguardando aprovação').length, texto: 'Cadastros aguardando aprovação' },
    { numero: usuarios.filter((u) => u.statusConta === 'Inativa').length, texto: 'Contas inativas' },
  ]

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Administração" icone={folhaIcone} subtitulo="Visão geral da clínica" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
        {numeros.map((item) => (
          <Cartao key={item.texto}>
            <p className="font-titulo text-[40px] font-semibold leading-none text-texto">{item.numero}</p>
            <p className="mt-1 text-[13px] leading-tight text-marrom">{item.texto}</p>
          </Cartao>
        ))}
      </div>
    </PainelLayout>
  )
}

export default AdminInicio
