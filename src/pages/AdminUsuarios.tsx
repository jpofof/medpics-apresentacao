import { useState } from 'react'
import Botao from '../components/Botao'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import Confirmacao from '../components/Confirmacao'
import EtiquetaStatus from '../components/EtiquetaStatus'
import FormularioEditarUsuario from '../components/FormularioEditarUsuario'
import Mensagem from '../components/Mensagem'
import NovoUsuario from '../components/NovoUsuario'
import PainelLayout from '../components/PainelLayout'
import { alterarStatusConta, consultasQueSeraoCanceladas, reativacaoExigeNovaAnamnese } from '../data/admin'
import { descricaoDoPerfil, lerUsuarios, usuarioLogado } from '../data/usuarios'
import { formatarData } from '../data/datas'

const filtrosDeStatus = ['Todos', 'Ativa', 'Aguardando aprovação', 'Recusado', 'Inativa']

// Gerenciar usuários (Quadro 7): lista com status e filtro, novo usuário, editar e ativar/inativar.
// A tela tem três modos: "lista", "novo" e "editar".
function AdminUsuarios() {
  const [modo, setModo] = useState('lista')
  const [editandoId, setEditandoId] = useState(0)
  const [confirmandoId, setConfirmandoId] = useState(0) // usuário cujo Ativar/Inativar está pedindo confirmação
  const [filtro, setFiltro] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const administrador = usuarioLogado()
  if (administrador === null) return null

  const usuarios = lerUsuarios().filter((u) => {
    const nomeBate = u.nome.toLowerCase().includes(busca.trim().toLowerCase())
    return nomeBate && (filtro === 'Todos' || u.statusConta === filtro)
  })

  function mostrarResultado(texto: string) {
    setMensagem(texto)
    setErro('')
    setModo('lista')
    window.scrollTo({ top: 0 })
  }

  function confirmarTroca(idUsuario: number, ativando: boolean) {
    if (administrador === null) return
    const erroDaTroca = alterarStatusConta(idUsuario, administrador.id, ativando ? 'Ativa' : 'Inativa')
    setConfirmandoId(0)
    if (erroDaTroca !== '') {
      setErro(erroDaTroca)
      setMensagem('')
    } else {
      setMensagem('Status alterado com sucesso')
      setErro('')
    }
  }

  // Texto do pedido de confirmação ao ativar ou inativar
  function textoDaConfirmacao(idUsuario: number, nome: string, ativando: boolean): string {
    if (ativando) {
      let texto = 'Ativar a conta de ' + nome + '?'
      if (reativacaoExigeNovaAnamnese(idUsuario)) {
        texto += ' Como a conta está há mais de um ano sem acesso, o paciente precisará preencher uma nova anamnese no próximo acesso.'
      }
      return texto
    }
    const quantas = consultasQueSeraoCanceladas(idUsuario)
    let texto = 'Inativar a conta de ' + nome + '?'
    if (quantas > 0) {
      texto += ' ' + quantas + (quantas === 1 ? ' consulta futura será cancelada' : ' consultas futuras serão canceladas') + ' e os pacientes receberão um aviso.'
    }
    return texto
  }

  if (modo === 'novo') {
    return (
      <PainelLayout>
        <CabecalhoPagina titulo="Novo usuário" subtitulo="A conta já fica ativa, sem aprovação" />
        <div className="max-w-3xl">
          <Cartao>
            <NovoUsuario aoConcluir={() => mostrarResultado('Cadastro efetuado com sucesso')} aoCancelar={() => setModo('lista')} />
          </Cartao>
        </div>
      </PainelLayout>
    )
  }

  if (modo === 'editar') {
    return (
      <PainelLayout>
        <CabecalhoPagina titulo="Editar usuário" subtitulo="O cargo não pode ser alterado" />
        <div className="max-w-3xl">
          <Cartao>
            <FormularioEditarUsuario idUsuario={editandoId} aoConcluir={() => mostrarResultado('Alteração efetuada com sucesso')} aoCancelar={() => setModo('lista')} />
          </Cartao>
        </div>
      </PainelLayout>
    )
  }

  return (
    <PainelLayout>
      <CabecalhoPagina
        titulo="Usuários"
        subtitulo="Contas nunca são excluídas: só inativadas"
        acao={<Botao aoClicar={() => setModo('novo')}>+ Novo usuário</Botao>}
      />

      {mensagem && <Mensagem>{mensagem}</Mensagem>}
      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

      <Cartao>
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="busca" className="mb-1 block text-xs font-semibold text-marrom">
              Buscar por nome
            </label>
            <input
              id="busca"
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="h-11 w-full rounded-xl border-[1.5px] border-marrom-claro bg-fundo px-3 text-sm text-escuro hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-leve/60"
            />
          </div>
          <div>
            <label htmlFor="filtro" className="mb-1 block text-xs font-semibold text-marrom">
              Status da conta
            </label>
            <select
              id="filtro"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="h-11 w-full rounded-xl border-[1.5px] border-marrom-claro bg-fundo px-3 text-sm text-escuro hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-leve/60"
            >
              {filtrosDeStatus.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>
        </div>

        {usuarios.length === 0 ? (
          <p className="rounded-xl bg-bege px-4 py-3 text-sm text-marrom">Nenhum usuário encontrado para este filtro.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {usuarios.map((usuario) => {
              const ativando = usuario.statusConta !== 'Ativa'
              return (
                <li key={usuario.id} className="rounded-[18px] border border-escuro/5 bg-bege p-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="min-w-0 flex-1 basis-56">
                      <strong className="block break-words text-[15px] text-escuro">{usuario.nome}</strong>
                      <span className="block break-words text-[13px] text-marrom">{descricaoDoPerfil(usuario.id)}</span>
                      <span className="block break-words text-[12px] text-marrom">
                        {usuario.email} · cadastro em {formatarData(usuario.cadastro)}
                      </span>
                    </div>
                    <EtiquetaStatus texto={usuario.statusConta} />
                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                      <Botao
                        variante="secundario"
                        aoClicar={() => {
                          setEditandoId(usuario.id)
                          setModo('editar')
                          setMensagem('')
                          setErro('')
                        }}
                      >
                        Editar
                      </Botao>
                      {usuario.statusConta !== 'Aguardando aprovação' && (
                        <Botao
                          variante={ativando ? 'primario' : 'perigo'}
                          aoClicar={() => {
                            setConfirmandoId(usuario.id)
                            setMensagem('')
                            setErro('')
                          }}
                        >
                          {ativando ? 'Ativar' : 'Inativar'}
                        </Botao>
                      )}
                    </div>
                  </div>

                  {confirmandoId === usuario.id && (
                    <div className="mt-4">
                      <Confirmacao
                        mensagem={textoDaConfirmacao(usuario.id, usuario.nome, ativando)}
                        perigo={!ativando}
                        textoConfirmar={ativando ? 'Ativar conta' : 'Inativar conta'}
                        aoConfirmar={() => confirmarTroca(usuario.id, ativando)}
                        aoCancelar={() => setConfirmandoId(0)}
                      />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </Cartao>
    </PainelLayout>
  )
}

export default AdminUsuarios
