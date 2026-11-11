import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import PainelLayout from '../components/PainelLayout'
import { agendamentosDoProfissional } from '../data/agenda'
import { formatarData, hojeTexto } from '../data/datas'
import { buscarProfissional, nomeDoUsuario, usuarioLogado } from '../data/usuarios'
import folhaIcone from '../assets/icones/icon-folha.svg'

// Início do profissional (Médico, Dentista ou Terapeuta): resumo da agenda.
// As demais telas (agenda, disponibilidade, histórico, relatórios) entram nas próximas fases.
function ProfissionalInicio() {
  const usuario = usuarioLogado()
  const profissional = usuario === null ? null : buscarProfissional(usuario.id)
  if (usuario === null || profissional === null) return null

  const hoje = hojeTexto()
  const agendadas = agendamentosDoProfissional(usuario.id).filter((a) => a.status === 'Agendada')
  const deHoje = agendadas.filter((a) => a.data === hoje)
  const futuras = agendadas.filter((a) => a.data > hoje)

  return (
    <PainelLayout>
      <CabecalhoPagina titulo={'Olá, ' + usuario.nome + '!'} icone={folhaIcone} subtitulo={profissional.cargo + ' · ' + profissional.especialidade} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Cartao titulo="Consultas de hoje">
          <p className="font-titulo text-[40px] font-semibold leading-none text-texto">{deHoje.length}</p>
          <p className="mt-1 text-[13px] text-marrom">{formatarData(hoje)}</p>
        </Cartao>
        <Cartao titulo="Próximas consultas">
          <p className="font-titulo text-[40px] font-semibold leading-none text-texto">{futuras.length}</p>
          <p className="mt-1 text-[13px] text-marrom">Agendadas a partir de amanhã</p>
        </Cartao>
      </div>

      <Cartao titulo="Próximos atendimentos">
        {agendadas.length === 0 ? (
          <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">Nenhuma consulta agendada.</p>
        ) : (
          <ul>
            {agendadas.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 border-b border-fundo-2 py-3 last:border-0">
                <strong className="text-[15px] text-texto">{nomeDoUsuario(a.idPaciente)}</strong>
                <span className="text-right text-[13px] text-marrom">
                  {formatarData(a.data)} · {a.hora}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Cartao>
    </PainelLayout>
  )
}

export default ProfissionalInicio
