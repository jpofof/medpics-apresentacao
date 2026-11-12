import { useState } from 'react'
import {
  consultasDoTrechoNovo,
  consultasNoPeriodo,
  encerrarPeriodo,
  periodoEmVigor,
  prorrogarPeriodo,
  registrarPeriodo,
  validarNovoFim,
  validarPeriodo,
} from '../data/agenda'
import type { Agendamento } from '../types'
import { formatarData, hojeTexto } from '../data/datas'
import { nomeDoUsuario, usuarioLogado } from '../data/usuarios'
import Botao from './Botao'
import Campo from './Campo'
import CampoSelect from './CampoSelect'
import Confirmacao from './Confirmacao'
import Mensagem from './Mensagem'

interface PeriodoFeriasLicencaProps {
  idProfissional: number // de quem são as férias/licença (o administrador pode registrar em nome do profissional)
  aoMudar?: () => void // chamado depois de registrar, prorrogar ou encerrar
}

const tipos = ['Férias', 'Licença']

// Texto da lista de consultas afetadas, ex: "Maria Oliveira (16/11/2026 às 10:00)"
function listarConsultas(consultas: Agendamento[]): string {
  return consultas.map((c) => nomeDoUsuario(c.idPaciente) + ' (' + formatarData(c.data) + ' às ' + c.hora + ')').join('; ')
}

// Registrar, prorrogar e encerrar férias ou licença (Quadro 11). Quem registra fica como responsável pelos cancelamentos.
function PeriodoFeriasLicenca({ idProfissional, aoMudar }: PeriodoFeriasLicencaProps) {
  const [tipo, setTipo] = useState('Férias')
  const [inicio, setInicio] = useState(hojeTexto())
  const [fim, setFim] = useState('')
  const [novoFim, setNovoFim] = useState('')
  const [confirmando, setConfirmando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const usuario = usuarioLogado()
  if (usuario === null) return null

  const periodo = periodoEmVigor(idProfissional)
  const fimEscolhido = periodo === null || novoFim !== '' ? novoFim : periodo.fim // nova data de término da prorrogação

  function terminou(texto: string) {
    setMensagem(texto)
    setErro('')
    setConfirmando(false)
    setFim('')
    setNovoFim('')
    if (aoMudar) aoMudar()
  }

  // Passo 1 do registro: valida e mostra as consultas afetadas para confirmar
  function pedirConfirmacaoDoRegistro() {
    const erroDoPeriodo = validarPeriodo(idProfissional, inicio, fim)
    setErro(erroDoPeriodo)
    setMensagem('')
    setConfirmando(erroDoPeriodo === '')
  }

  function confirmarRegistro() {
    if (usuario === null) return
    registrarPeriodo(idProfissional, tipo === 'Licença' ? 'Licença' : 'Férias', inicio, fim, usuario.id)
    terminou('Período registrado com sucesso')
  }

  // Passo 1 da prorrogação: pede confirmação mostrando as consultas do trecho novo
  function pedirConfirmacaoDaProrrogacao() {
    if (periodo === null) return
    setMensagem('')
    const erroDaData = validarNovoFim(periodo.inicio, fimEscolhido)
    setErro(erroDaData)
    setConfirmando(erroDaData === '')
  }

  function confirmarProrrogacao() {
    if (usuario === null) return
    prorrogarPeriodo(idProfissional, fimEscolhido, usuario.id)
    terminou('Período atualizado com sucesso')
  }

  function encerrar() {
    encerrarPeriodo(idProfissional)
    terminou('Período atualizado com sucesso')
  }

  const consultasDoRegistro = confirmando && periodo === null ? consultasNoPeriodo(idProfissional, inicio, fim) : []
  const consultasDaProrrogacao = confirmando && periodo !== null ? consultasDoTrechoNovo(idProfissional, fimEscolhido) : []

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

      {periodo !== null ? (
        <div>
          <p className="mb-4 text-sm text-texto">
            <strong>{periodo.tipo}</strong> de {formatarData(periodo.inicio)} até {formatarData(periodo.fim)}. Nenhum horário fica disponível nesse período.
          </p>

          {confirmando ? (
            <Confirmacao
              mensagem={
                'Prorrogar até ' + formatarData(fimEscolhido) + '? ' +
                (consultasDaProrrogacao.length === 0
                  ? 'Nenhuma consulta agendada nesse trecho.'
                  : consultasDaProrrogacao.length + ' consulta(s) serão canceladas e os pacientes avisados: ' + listarConsultas(consultasDaProrrogacao) + '.')
              }
              textoConfirmar="Confirmar prorrogação"
              aoConfirmar={confirmarProrrogacao}
              aoCancelar={() => setConfirmando(false)}
            />
          ) : (
            <div>
              <Campo id="novoFim" rotulo="Nova data de término (prorrogar)" tipo="date" valor={fimEscolhido} aoMudar={setNovoFim} />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Botao aoClicar={pedirConfirmacaoDaProrrogacao}>Prorrogar</Botao>
                <Botao variante="perigo" aoClicar={encerrar}>
                  Encerrar período
                </Botao>
              </div>
            </div>
          )}
        </div>
      ) : confirmando ? (
        <Confirmacao
          mensagem={
            tipo + ' de ' + formatarData(inicio) + ' até ' + formatarData(fim) + '. ' +
            (consultasDoRegistro.length === 0
              ? 'Nenhuma consulta agendada nesse período.'
              : consultasDoRegistro.length + ' consulta(s) serão canceladas e os pacientes avisados: ' + listarConsultas(consultasDoRegistro) + '.')
          }
          textoConfirmar="Confirmar registro"
          aoConfirmar={confirmarRegistro}
          aoCancelar={() => setConfirmando(false)}
        />
      ) : (
        <div>
          <div className="grid gap-x-5 sm:grid-cols-3">
            <CampoSelect id="tipo" rotulo="Tipo" opcoes={tipos} valor={tipo} aoMudar={setTipo} />
            <Campo id="inicio" rotulo="Data de início" tipo="date" valor={inicio} aoMudar={setInicio} />
            <Campo id="fim" rotulo="Data de término (previsão de retorno)" tipo="date" valor={fim} aoMudar={setFim} />
          </div>
          <Botao aoClicar={pedirConfirmacaoDoRegistro}>Registrar férias ou licença</Botao>
        </div>
      )}
    </div>
  )
}

export default PeriodoFeriasLicenca
