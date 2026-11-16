// Relatórios do profissional (Quadro 14): consultas por período, faltas e cancelamentos, atendimentos por profissional.
import type { Agendamento } from '../types'
import { lerAgendamentos } from './agenda'
import { formatarData, formatarDataHora } from './datas'
import { buscarProfissional, lerProfissionais, nomeDoUsuario } from './usuarios'

export const tiposDeRelatorio = ['Consultas por período', 'Faltas e cancelamentos', 'Atendimentos por profissional']

// O relatório pronto: colunas, linhas (tudo texto) e a linha de totais
export interface Relatorio {
  colunas: string[]
  linhas: string[][]
  totais: string[] // ex.: ["Total: 12", "Realizadas: 8"]
}

export interface ProfissionalDoFiltro {
  id: number
  nome: string
}

// Quem o usuário pode ver nos relatórios (só o cargo conta; ser administrador não muda nada):
// Terapeuta vê só os próprios; Médico e Dentista veem os próprios e os dos Terapeutas, nunca um do outro.
export function profissionaisVisiveis(idUsuario: number): ProfissionalDoFiltro[] {
  const eu = buscarProfissional(idUsuario)
  if (eu === null) return []

  const lista: ProfissionalDoFiltro[] = [{ id: idUsuario, nome: nomeDoUsuario(idUsuario) }]
  if (eu.cargo !== 'Terapeuta') {
    for (const outro of lerProfissionais()) {
      if (outro.cargo === 'Terapeuta' && outro.idUsuario !== idUsuario) {
        lista.push({ id: outro.idUsuario, nome: nomeDoUsuario(outro.idUsuario) })
      }
    }
  }
  return lista
}

// Consultas do período que o usuário pode ver. "idFiltro" = 0 mostra todos os profissionais visíveis.
function consultasVisiveis(idUsuario: number, de: string, ate: string, idFiltro: number): Agendamento[] {
  const idsVisiveis = profissionaisVisiveis(idUsuario).map((p) => p.id)
  return lerAgendamentos()
    .filter((a) => idsVisiveis.includes(a.idProfissional))
    .filter((a) => idFiltro === 0 || a.idProfissional === idFiltro)
    .filter((a) => (de === '' || a.data >= de) && (ate === '' || a.data <= ate))
    .sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora))
}

function contar(lista: Agendamento[], status: string): number {
  return lista.filter((a) => a.status === status).length
}

export function gerarRelatorio(tipo: string, idUsuario: number, de: string, ate: string, idFiltro: number): Relatorio {
  const consultas = consultasVisiveis(idUsuario, de, ate, idFiltro)

  if (tipo === 'Faltas e cancelamentos') {
    const ocorrencias = consultas.filter((a) => a.status === 'Faltou' || a.status === 'Cancelada')
    return {
      colunas: ['Data', 'Horário', 'Profissional', 'Paciente', 'Ocorrência'],
      linhas: ocorrencias.map((a) => [
        formatarData(a.data),
        a.hora,
        nomeDoUsuario(a.idProfissional),
        nomeDoUsuario(a.idPaciente),
        a.status === 'Faltou' ? 'Paciente faltou' : 'Cancelada por ' + nomeDoUsuario(a.canceladoPor) + (a.dataCancelamento === '' ? '' : ' em ' + formatarDataHora(a.dataCancelamento)),
      ]),
      totais: ['Faltas: ' + contar(ocorrencias, 'Faltou'), 'Cancelamentos: ' + contar(ocorrencias, 'Cancelada'), 'Total: ' + ocorrencias.length],
    }
  }

  if (tipo === 'Atendimentos por profissional') {
    const linhas: string[][] = []
    const profissionais = profissionaisVisiveis(idUsuario).filter((p) => idFiltro === 0 || p.id === idFiltro)
    for (const profissional of profissionais) {
      const dele = consultas.filter((a) => a.idProfissional === profissional.id)
      if (dele.length === 0) continue
      linhas.push([profissional.nome, String(contar(dele, 'Realizada')), String(contar(dele, 'Faltou')), String(contar(dele, 'Cancelada')), String(dele.length)])
    }
    return {
      colunas: ['Profissional', 'Realizadas', 'Faltas', 'Canceladas', 'Total de consultas'],
      linhas,
      totais: ['Realizadas: ' + contar(consultas, 'Realizada'), 'Total de consultas: ' + consultas.length],
    }
  }

  // Consultas por período
  return {
    colunas: ['Data', 'Horário', 'Profissional', 'Paciente', 'Status'],
    linhas: consultas.map((a) => [formatarData(a.data), a.hora, nomeDoUsuario(a.idProfissional), nomeDoUsuario(a.idPaciente), a.status]),
    totais: [
      'Total: ' + consultas.length,
      'Agendadas: ' + contar(consultas, 'Agendada'),
      'Realizadas: ' + contar(consultas, 'Realizada'),
      'Faltas: ' + contar(consultas, 'Faltou'),
      'Canceladas: ' + contar(consultas, 'Cancelada'),
    ],
  }
}
