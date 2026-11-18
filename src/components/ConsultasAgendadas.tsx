import { useState } from 'react'
import { agendamentosDoPaciente, cancelarAgendamento, resumoParaPaciente, verificarCancelamento } from '../data/agenda'
import { formatarData } from '../data/datas'
import { usuarioLogado } from '../data/usuarios'
import Botao from './Botao'
import Confirmacao from './Confirmacao'
import EtiquetaStatus from './EtiquetaStatus'
import Mensagem from './Mensagem'

interface ConsultasAgendadasProps {
  idPaciente: number
  aoMudar?: () => void // chamado depois de cancelar (para a tela redesenhar o que depende disso)
}

// Consultas com status Agendada de um paciente, com o fluxo de cancelamento (Quadro 9):
// verifica a regra das 24h (só para o paciente), pede confirmação, cancela e mostra a mensagem.
function ConsultasAgendadas({ idPaciente, aoMudar }: ConsultasAgendadasProps) {
  const [confirmandoId, setConfirmandoId] = useState(0)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const usuario = usuarioLogado()
  if (usuario === null) return null

  // Da mais próxima para a mais distante
  const agendadas = agendamentosDoPaciente(idPaciente)
    .filter((a) => a.status === 'Agendada')
    .reverse()

  function pedirCancelamento(idAgendamento: number) {
    const agendamento = agendadas.find((a) => a.id === idAgendamento)
    if (!agendamento || usuario === null) return
    setMensagem('')
    const erroDoCancelamento = verificarCancelamento(agendamento, usuario.id)
    setErro(erroDoCancelamento)
    setConfirmandoId(erroDoCancelamento === '' ? idAgendamento : 0)
  }

  function confirmar(idAgendamento: number) {
    if (usuario === null) return
    cancelarAgendamento(idAgendamento, usuario.id, 'pela clínica') // o motivo só aparece no aviso quando não foi o paciente
    setConfirmandoId(0)
    setMensagem('Consulta cancelada com sucesso')
    if (aoMudar) aoMudar()
  }

  return (
    <div>
      {mensagem && (
        <div className="mb-4">
          <Mensagem>{mensagem}</Mensagem>
        </div>
      )}
      {erro && (
        <div className="mb-4">
          <Mensagem tipo="erro">{erro}</Mensagem>
        </div>
      )}

      {agendadas.length === 0 ? (
        <div className="py-6 text-center">
          <p className="mb-1 text-2xl text-escuro">Nenhuma consulta agendada</p>
          <p className="text-sm text-marrom">Quando houver uma consulta marcada, ela aparece aqui.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {agendadas.map((agendamento) => {
            const consulta = resumoParaPaciente(agendamento)
            return (
              <li key={agendamento.id} className="rounded-[18px] border border-escuro/5 bg-bege px-4 py-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="min-w-0 flex-1 basis-44">
                    <strong className="block break-words text-[15px] text-escuro">{consulta.titulo}</strong>
                    <span className="block break-words text-[13px] text-marrom opacity-80">{consulta.detalhe}</span>
                  </div>
                  <div className="text-[13px] text-marrom">
                    <p className="font-semibold">{formatarData(consulta.data)}</p>
                    <p className="opacity-75">{consulta.hora}</p>
                  </div>
                  <EtiquetaStatus texto={consulta.status} />
                  <div className="w-full sm:w-auto">
                    <Botao variante="perigo" larguraTotal aoClicar={() => pedirCancelamento(agendamento.id)}>
                      Cancelar
                    </Botao>
                  </div>
                </div>

                {confirmandoId === agendamento.id && (
                  <div className="mt-4">
                    <Confirmacao
                      mensagem={'Cancelar a consulta com ' + consulta.titulo + ' em ' + formatarData(consulta.data) + ' às ' + consulta.hora + '?'}
                      perigo
                      textoConfirmar="Cancelar consulta"
                      aoConfirmar={() => confirmar(agendamento.id)}
                      aoCancelar={() => setConfirmandoId(0)}
                    />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ConsultasAgendadas
