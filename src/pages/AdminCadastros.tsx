import { useState } from 'react'
import Botao from '../components/Botao'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import Confirmacao from '../components/Confirmacao'
import Mensagem from '../components/Mensagem'
import PainelLayout from '../components/PainelLayout'
import { aprovarCadastro, cadastrosPendentes, recusarCadastro } from '../data/admin'
import { formatarData } from '../data/datas'
import { buscarProfissional, buscarTerapeuta } from '../data/usuarios'

interface Linha {
  rotulo: string
  valor: string
}

// Gerenciar cadastros (Quadro 6): lista de profissionais "Aguardando aprovação", com todos os dados, e Aprovar/Recusar
function AdminCadastros() {
  const [selecionadoId, setSelecionadoId] = useState(0)
  const [confirmandoRecusa, setConfirmandoRecusa] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const pendentes = cadastrosPendentes()
  const selecionado = pendentes.find((u) => u.id === selecionadoId)

  // Monta as linhas de dados do cadastro selecionado
  const linhas: Linha[] = []
  if (selecionado) {
    const profissional = buscarProfissional(selecionado.id)
    const terapeuta = buscarTerapeuta(selecionado.id)
    linhas.push(
      { rotulo: 'Nome', valor: selecionado.nome },
      { rotulo: 'CPF', valor: selecionado.cpf },
      { rotulo: 'E-mail', valor: selecionado.email },
      { rotulo: 'Telefone', valor: selecionado.telefone },
      { rotulo: 'Data de nascimento', valor: formatarData(selecionado.nascimento) },
      { rotulo: 'Endereço', valor: selecionado.endereco },
    )
    if (profissional) {
      linhas.push(
        { rotulo: 'Cargo', valor: profissional.cargo },
        { rotulo: 'Registro profissional', valor: profissional.numeroRegistro },
        { rotulo: 'Especialidade', valor: profissional.especialidade },
        { rotulo: 'Duração da consulta', valor: profissional.duracaoConsulta + ' minutos' },
      )
    }
    if (terapeuta) {
      linhas.push(
        { rotulo: 'Conselho', valor: terapeuta.conselho },
        { rotulo: 'Graduação', valor: terapeuta.graduacao },
        { rotulo: 'Pós-graduação', valor: terapeuta.posGraduacao || 'Não informada' },
        { rotulo: 'Formações complementares', valor: terapeuta.formacoesComplementares || 'Não informadas' },
        { rotulo: 'Área de atuação', valor: terapeuta.areaAtuacao },
      )
    }
  }

  function aprovar() {
    if (!selecionado) return
    aprovarCadastro(selecionado.id)
    setMensagem('Cadastro aprovado com sucesso')
    setSelecionadoId(0)
  }

  function recusar() {
    if (!selecionado) return
    recusarCadastro(selecionado.id)
    setMensagem('Cadastro recusado')
    setSelecionadoId(0)
    setConfirmandoRecusa(false)
  }

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Cadastros pendentes" subtitulo="Médicos, dentistas e terapeutas aguardando aprovação" />

      {mensagem && <Mensagem>{mensagem}</Mensagem>}

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Cartao titulo="Aguardando aprovação">
          {pendentes.length === 0 ? (
            <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">Nenhum cadastro aguardando aprovação.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {pendentes.map((usuario) => (
                <li key={usuario.id}>
                  <button
                    type="button"
                    aria-pressed={selecionadoId === usuario.id}
                    onClick={() => {
                      setSelecionadoId(usuario.id)
                      setConfirmandoRecusa(false)
                      setMensagem('')
                    }}
                    className={`min-h-11 w-full rounded-xl border px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      selecionadoId === usuario.id ? 'border-primary bg-primary/10' : 'border-borda bg-white hover:border-primary active:bg-fundo-2'
                    }`}
                  >
                    <strong className="block break-words text-[15px] text-texto">{usuario.nome}</strong>
                    <span className="text-[13px] text-marrom">{buscarProfissional(usuario.id)?.cargo}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Cartao>

        <Cartao titulo="Dados do cadastro">
          {!selecionado ? (
            <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">Selecione um cadastro da lista para ver os dados.</p>
          ) : (
            <div>
              <dl className="mb-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {linhas.map((linha) => (
                  <div key={linha.rotulo} className="min-w-0">
                    <dt className="text-xs font-medium text-marrom-claro">{linha.rotulo}</dt>
                    <dd className="break-words text-sm text-texto">{linha.valor || '—'}</dd>
                  </div>
                ))}
              </dl>

              {confirmandoRecusa ? (
                <Confirmacao
                  mensagem={'Recusar o cadastro de ' + selecionado.nome + '? O e-mail e o CPF continuam ocupados.'}
                  perigo
                  textoConfirmar="Recusar cadastro"
                  aoConfirmar={recusar}
                  aoCancelar={() => setConfirmandoRecusa(false)}
                />
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Botao aoClicar={aprovar}>Aprovar</Botao>
                  <Botao variante="perigo" aoClicar={() => setConfirmandoRecusa(true)}>
                    Recusar
                  </Botao>
                </div>
              )}
            </div>
          )}
        </Cartao>
      </div>
    </PainelLayout>
  )
}

export default AdminCadastros
