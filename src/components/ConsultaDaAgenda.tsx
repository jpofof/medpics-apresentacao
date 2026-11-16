import { horarioJaChegou, podeRegistrarAtendimento } from '../data/agenda'
import { formatarData } from '../data/datas'
import { buscarUsuario } from '../data/usuarios'
import type { Agendamento } from '../types'
import Botao from './Botao'
import EtiquetaStatus from './EtiquetaStatus'

interface ConsultaDaAgendaProps {
  consulta: Agendamento
  aoRegistrar: (idConsulta: number, status: string) => void
}

// Cartão de uma consulta na agenda do profissional: paciente, telefone, data, horário e status.
// Consulta que já passou e continua "Agendada" fica destacada, esperando o registro do atendimento.
function ConsultaDaAgenda({ consulta, aoRegistrar }: ConsultaDaAgendaProps) {
  const paciente = buscarUsuario(consulta.idPaciente)
  const esperandoRegistro = consulta.status === 'Agendada' && horarioJaChegou(consulta)
  const podeRegistrar = podeRegistrarAtendimento(consulta)

  return (
    <li className={`rounded-[18px] border px-4 py-3 ${esperandoRegistro ? 'border-marrom-claro bg-fundo-2' : 'border-black/5 bg-[#f7f5f0]'}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="min-w-0 flex-1 basis-48">
          <strong className="block break-words text-[15px] text-texto">{paciente === null ? 'Paciente' : paciente.nome}</strong>
          <span className="block break-words text-[13px] text-marrom">
            {formatarData(consulta.data)} às {consulta.hora}
          </span>
          <span className="block break-words text-[13px] text-marrom">Telefone: {paciente === null || paciente.telefone === '' ? 'não informado' : paciente.telefone}</span>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <EtiquetaStatus texto={consulta.status} />
          {esperandoRegistro && <span className="text-[12px] font-medium text-marrom">Aguardando registro do atendimento</span>}
        </div>
      </div>

      {consulta.status === 'Agendada' && (
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <Botao desabilitado={!podeRegistrar} aoClicar={() => aoRegistrar(consulta.id, 'Realizada')}>
            Realizada
          </Botao>
          <Botao variante="secundario" desabilitado={!podeRegistrar} aoClicar={() => aoRegistrar(consulta.id, 'Faltou')}>
            Paciente faltou
          </Botao>
          {!podeRegistrar && <p className="self-center text-[12px] text-marrom">Disponível a partir do horário da consulta.</p>}
        </div>
      )}
    </li>
  )
}

export default ConsultaDaAgenda
