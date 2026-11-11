// Funções de data e hora. No sistema, datas são texto "AAAA-MM-DD" e horas "HH:mm".
// Só aqui elas viram Date (para somar dias e calcular as 24h).

export const nomesDiasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

function doisDigitos(numero: number): string {
  return String(numero).padStart(2, '0')
}

function dataParaTexto(data: Date): string {
  return data.getFullYear() + '-' + doisDigitos(data.getMonth() + 1) + '-' + doisDigitos(data.getDate())
}

// Hoje, ex: "2026-11-11"
export function hojeTexto(): string {
  return dataParaTexto(new Date())
}

// Agora, ex: "2026-11-11T14:30" (usado em último login, data de cancelamento, etc.)
export function agoraTexto(): string {
  const agora = new Date()
  return dataParaTexto(agora) + 'T' + doisDigitos(agora.getHours()) + ':' + doisDigitos(agora.getMinutes())
}

// "2026-11-11" (ou um momento "2026-11-11T14:30") vira "11/11/2026"
export function formatarData(texto: string): string {
  if (texto === '') return ''
  const partes = texto.slice(0, 10).split('-')
  return partes[2] + '/' + partes[1] + '/' + partes[0]
}

// "2026-11-11T14:30" vira "11/11/2026 às 14:30"
export function formatarDataHora(texto: string): string {
  if (texto === '') return ''
  return formatarData(texto) + ' às ' + texto.slice(11, 16)
}

// Junta data e hora em um Date
function paraDate(data: string, hora: string): Date {
  const [ano, mes, dia] = data.split('-').map(Number)
  const [horas, minutos] = hora.split(':').map(Number)
  return new Date(ano, mes - 1, dia, horas, minutos)
}

// Quantas horas faltam para a consulta (negativo se já passou). Usado na regra das 24h.
export function horasAte(data: string, hora: string): number {
  return (paraDate(data, hora).getTime() - Date.now()) / (1000 * 60 * 60)
}

// Soma dias a uma data (pode ser negativo): somarDias("2026-11-30", 1) = "2026-12-01"
export function somarDias(data: string, dias: number): string {
  const nova = paraDate(data, '00:00')
  nova.setDate(nova.getDate() + dias)
  return dataParaTexto(nova)
}

// Dia da semana de uma data: 0 = domingo ... 6 = sábado
export function diaDaSemana(data: string): number {
  return paraDate(data, '00:00').getDay()
}

// Quantos dias se passaram desde um momento (ex.: o último login)
export function diasDesde(texto: string): number {
  const antes = paraDate(texto.slice(0, 10), '00:00')
  const hoje = paraDate(hojeTexto(), '00:00')
  return Math.round((hoje.getTime() - antes.getTime()) / (1000 * 60 * 60 * 24))
}

// "09:30" vira 570 (minutos desde a meia-noite)
export function horaParaMinutos(hora: string): number {
  const [horas, minutos] = hora.split(':').map(Number)
  return horas * 60 + minutos
}

// 570 vira "09:30"
export function minutosParaHora(minutos: number): string {
  return doisDigitos(Math.floor(minutos / 60)) + ':' + doisDigitos(minutos % 60)
}
