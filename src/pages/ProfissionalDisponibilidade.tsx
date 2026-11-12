import { useState } from 'react'
import Botao from '../components/Botao'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import EtiquetaStatus from '../components/EtiquetaStatus'
import FormularioDisponibilidade from '../components/FormularioDisponibilidade'
import Mensagem from '../components/Mensagem'
import PainelLayout from '../components/PainelLayout'
import PeriodoFeriasLicenca from '../components/PeriodoFeriasLicenca'
import { disponibilidadesDoProfissional, horariosLivres } from '../data/agenda'
import { formatarData, nomesDiasSemana } from '../data/datas'
import { buscarProfissional, usuarioLogado } from '../data/usuarios'

// "Minha disponibilidade" (Quadro 11): lista dos blocos, nova disponibilidade e edição.
// A tela tem dois modos: "lista" e "formulario" (novo ou editar).
function ProfissionalDisponibilidade() {
  const [modo, setModo] = useState('lista')
  const [editandoId, setEditandoId] = useState(0) // 0 = nova disponibilidade
  const [mensagem, setMensagem] = useState('')
  const [, setAlteracoes] = useState(0) // só serve para redesenhar a lista depois de mudar o período

  const usuario = usuarioLogado()
  const profissional = usuario === null ? null : buscarProfissional(usuario.id)
  if (usuario === null || profissional === null) return null

  const blocos = disponibilidadesDoProfissional(usuario.id)
  const editando = blocos.find((b) => b.id === editandoId) ?? null

  if (modo === 'formulario') {
    return (
      <PainelLayout>
        <CabecalhoPagina titulo={editando === null ? 'Nova disponibilidade' : 'Editar disponibilidade'} subtitulo="Um bloco de horário que se repete toda semana" />
        <div className="max-w-2xl">
          <Cartao>
            <FormularioDisponibilidade
              idProfissional={usuario.id}
              disponibilidade={editando}
              aoConcluir={(texto) => {
                setMensagem(texto)
                setModo('lista')
              }}
              aoCancelar={() => setModo('lista')}
            />
          </Cartao>
        </div>
      </PainelLayout>
    )
  }

  return (
    <PainelLayout>
      <CabecalhoPagina
        titulo="Minha disponibilidade"
        subtitulo={'Consultas de ' + profissional.duracaoConsulta + ' minutos (a duração é alterada só pelo administrador)'}
        acao={
          <Botao
            aoClicar={() => {
              setEditandoId(0)
              setMensagem('')
              setModo('formulario')
            }}
          >
            + Nova disponibilidade
          </Botao>
        }
      />

      {mensagem && <Mensagem>{mensagem}</Mensagem>}

      <Cartao titulo="Meus horários">
        {blocos.length === 0 ? (
          <p className="rounded-xl bg-fundo-2 px-4 py-3 text-sm text-marrom">Nenhuma disponibilidade cadastrada. Clique em “Nova disponibilidade” para começar.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {blocos.map((bloco) => (
              <li key={bloco.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[18px] border border-black/5 bg-[#f7f5f0] px-4 py-3">
                <div className="min-w-0 flex-1 basis-44">
                  <strong className="block text-[15px] text-texto">{nomesDiasSemana[bloco.diaSemana]}</strong>
                  <span className="text-[13px] text-marrom">
                    {bloco.horaInicio} às {bloco.horaFim}
                  </span>
                  {bloco.inicioBloqueio !== '' && (
                    <span className="block text-[12px] text-marrom opacity-80">
                      de {formatarData(bloco.inicioBloqueio)} até {formatarData(bloco.fimBloqueio)}
                    </span>
                  )}
                </div>
                <EtiquetaStatus texto={bloco.status} />
                <div className="w-full sm:w-auto">
                  <Botao
                    variante="secundario"
                    larguraTotal
                    aoClicar={() => {
                      setEditandoId(bloco.id)
                      setMensagem('')
                      setModo('formulario')
                    }}
                  >
                    Editar
                  </Botao>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-[13px] text-marrom">
          Horários livres para agendamento nos próximos 30 dias: <strong>{horariosLivres(usuario.id).length}</strong>
        </p>
      </Cartao>

      <Cartao titulo="Férias e licença">
        <PeriodoFeriasLicenca
          idProfissional={usuario.id}
          aoMudar={() => {
            setMensagem('')
            setAlteracoes((n) => n + 1)
          }}
        />
      </Cartao>
    </PainelLayout>
  )
}

export default ProfissionalDisponibilidade
