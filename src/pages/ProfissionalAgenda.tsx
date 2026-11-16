import { useState } from 'react'
import Botao from '../components/Botao'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import ConsultaDaAgenda from '../components/ConsultaDaAgenda'
import Mensagem from '../components/Mensagem'
import PainelLayout from '../components/PainelLayout'
import { consultasDoPeriodo, registrarAtendimento } from '../data/agenda'
import { diaDaSemana, formatarData, hojeTexto, nomesDiasSemana, somarDias } from '../data/datas'
import { usuarioLogado } from '../data/usuarios'

// Agenda do profissional (Quadros 12 e 13): consultas do dia ou da semana, com os dados do paciente.
// Cada profissional vê só a própria agenda. Aqui também se registra "Realizada" ou "Paciente faltou".
function ProfissionalAgenda() {
  const [modo, setModo] = useState('dia') // 'dia' ou 'semana'
  const [dataBase, setDataBase] = useState(hojeTexto())
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const usuario = usuarioLogado()
  if (usuario === null) return null

  // Semana vai de domingo a sábado
  const inicio = modo === 'dia' ? dataBase : somarDias(dataBase, -diaDaSemana(dataBase))
  const fim = modo === 'dia' ? dataBase : somarDias(inicio, 6)
  const consultas = consultasDoPeriodo(usuario.id, inicio, fim)

  // Agrupa por dia (a lista já vem em ordem)
  const dias: string[] = []
  for (const consulta of consultas) {
    if (!dias.includes(consulta.data)) dias.push(consulta.data)
  }

  function mover(passo: number) {
    setDataBase(somarDias(dataBase, modo === 'dia' ? passo : passo * 7))
  }

  function registrar(idConsulta: number, status: string) {
    if (usuario === null) return
    const resultado = registrarAtendimento(idConsulta, usuario.id, status)
    setErro(resultado)
    setMensagem(resultado === '' ? 'Atendimento registrado com sucesso' : '')
  }

  const titulo = modo === 'dia' ? formatarData(inicio) + ' (' + nomesDiasSemana[diaDaSemana(inicio)] + ')' : formatarData(inicio) + ' a ' + formatarData(fim)

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Minha agenda" subtitulo="Suas consultas por dia ou por semana" />

      {mensagem && <Mensagem>{mensagem}</Mensagem>}
      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

      <Cartao>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Tipo de visão" className="flex gap-2">
            <Botao variante={modo === 'dia' ? 'primario' : 'secundario'} aoClicar={() => setModo('dia')}>
              Dia
            </Botao>
            <Botao variante={modo === 'semana' ? 'primario' : 'secundario'} aoClicar={() => setModo('semana')}>
              Semana
            </Botao>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <Botao variante="secundario" aoClicar={() => mover(-1)}>
              ‹ Anterior
            </Botao>
            <Botao variante="secundario" aoClicar={() => setDataBase(hojeTexto())}>
              Hoje
            </Botao>
            <Botao variante="secundario" aoClicar={() => mover(1)}>
              Próximo ›
            </Botao>
          </div>
        </div>

        <h2 className="mb-4 text-lg text-texto">{titulo}</h2>

        {dias.length === 0 && (
          <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">
            {modo === 'dia' ? 'Nenhuma consulta neste dia.' : 'Nenhuma consulta nesta semana.'}
          </p>
        )}

        {dias.map((dia) => (
          <div key={dia} className="mb-5">
            {modo === 'semana' && (
              <h3 className="mb-2 text-sm font-semibold text-marrom">
                {nomesDiasSemana[diaDaSemana(dia)]}, {formatarData(dia)}
              </h3>
            )}
            <ul className="flex flex-col gap-3">
              {consultas
                .filter((c) => c.data === dia)
                .map((consulta) => (
                  <ConsultaDaAgenda key={consulta.id} consulta={consulta} aoRegistrar={registrar} />
                ))}
            </ul>
          </div>
        ))}
      </Cartao>
    </PainelLayout>
  )
}

export default ProfissionalAgenda
