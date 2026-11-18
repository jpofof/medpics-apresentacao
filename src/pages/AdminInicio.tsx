import { Link } from 'react-router-dom'
import AtalhoRapido from '../components/AtalhoRapido'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import CartaoIndicador from '../components/CartaoIndicador'
import PainelLayout from '../components/PainelLayout'
import { lerAgendamentos } from '../data/agenda'
import { cadastrosPendentes } from '../data/admin'
import { fimDaSemana, inicioDaSemana } from '../data/datas'
import { buscarProfissional, lerUsuarios } from '../data/usuarios'
import folhaIcone from '../assets/icones/icon-folha.svg'
import agendamentosIcone from '../assets/icones/icon-agendamentos.svg'
import consultasIcone from '../assets/icones/icon-consultas.svg'
import atividadesIcone from '../assets/icones/icon-atividades.svg'

// Início da administração: números gerais da clínica, cadastros pendentes e atalhos. Só dados de agendamento e contas.
function AdminInicio() {
  const usuarios = lerUsuarios()
  const pendentes = cadastrosPendentes()
  const consultasDaSemana = lerAgendamentos().filter((a) => a.status !== 'Cancelada' && a.data >= inicioDaSemana() && a.data <= fimDaSemana())

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Administração" icone={folhaIcone} subtitulo="Visão geral da clínica" />

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        <CartaoIndicador numero={pendentes.length} texto="Cadastros aguardando aprovação" icone={atividadesIcone} />
        <CartaoIndicador numero={usuarios.filter((u) => u.statusConta === 'Ativa').length} texto="Usuários ativos" icone={consultasIcone} />
        <CartaoIndicador numero={usuarios.filter((u) => u.statusConta === 'Inativa').length} texto="Usuários inativos" icone={folhaIcone} />
        <CartaoIndicador numero={consultasDaSemana.length} texto="Consultas da semana" icone={agendamentosIcone} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <AtalhoRapido texto="Cadastros pendentes" descricao="Aprovar ou recusar profissionais" para="/admin/cadastros" icone="cadastros" />
        <AtalhoRapido texto="Usuários" descricao="Editar, ativar e inativar contas" para="/admin/usuarios" icone="usuarios" />
        <AtalhoRapido texto="Novo paciente" descricao="Cadastrar por telefone" para="/admin/novo-paciente" icone="novo" />
        <AtalhoRapido texto="Agendar consulta" descricao="Em nome de um paciente" para="/admin/agendar" icone="agendar" />
      </div>

      <Cartao titulo="Cadastros aguardando aprovação" icone={atividadesIcone}>
        {pendentes.length === 0 ? (
          <p className="rounded-xl bg-bege px-4 py-3 text-pequeno text-marrom">Nenhum cadastro aguardando aprovação.</p>
        ) : (
          <ul>
            {pendentes.slice(0, 5).map((usuario) => (
              <li key={usuario.id} className="flex items-center justify-between gap-3 border-b border-bege py-3 last:border-0">
                <strong className="min-w-0 break-words text-pequeno text-escuro">{usuario.nome}</strong>
                <span className="shrink-0 text-pequeno text-marrom">{buscarProfissional(usuario.id)?.cargo}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <Link to="/admin/cadastros" className="inline-flex min-h-11 items-center text-pequeno font-semibold text-verde-cta hover:underline">
            Ver cadastros pendentes
          </Link>
        </div>
      </Cartao>
    </PainelLayout>
  )
}

export default AdminInicio
