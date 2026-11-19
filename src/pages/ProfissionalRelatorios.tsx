import { useState } from 'react'
import Campo from '../components/Campo'
import CabecalhoPagina from '../components/CabecalhoPagina'
import Cartao from '../components/Cartao'
import Mensagem from '../components/Mensagem'
import PainelLayout from '../components/PainelLayout'
import TabelaRelatorio from '../components/TabelaRelatorio'
import { VALIDACOES_ATIVAS } from '../config'
import { hojeTexto, somarDias } from '../data/datas'
import { gerarRelatorio, profissionaisVisiveis, tiposDeRelatorio } from '../data/relatorios'
import { usuarioLogado } from '../data/usuarios'

const classeDoSelect =
  'h-[54px] w-full rounded-xl border-[1.5px] border-marrom-claro bg-fundo px-4 text-pequeno text-escuro transition-colors duration-200 hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-leve/60'

// Relatórios (Quadro 14): tabela simples com totais, sem gráficos nem exportação.
// O filtro de profissional lista só quem o usuário pode ver (veja profissionaisVisiveis).
function ProfissionalRelatorios() {
  const [tipo, setTipo] = useState(tiposDeRelatorio[0])
  const [de, setDe] = useState(somarDias(hojeTexto(), -90))
  const [ate, setAte] = useState(somarDias(hojeTexto(), 30))
  const [idProfissional, setIdProfissional] = useState(0)

  const usuario = usuarioLogado()
  if (usuario === null) return null

  const visiveis = profissionaisVisiveis(usuario.id)
  const periodoInvalido = VALIDACOES_ATIVAS && de !== '' && ate !== '' && ate < de
  const relatorio = gerarRelatorio(tipo, usuario.id, de, ate, idProfissional)

  return (
    <PainelLayout>
      <CabecalhoPagina titulo="Relatórios" subtitulo="Consultas, faltas, cancelamentos e atendimentos" />

      <Cartao>
        <div className="grid gap-x-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="mb-5">
            <label htmlFor="tipo" className="mb-2 block text-pequeno font-semibold text-marrom">
              Relatório
            </label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className={classeDoSelect}>
              {tiposDeRelatorio.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </select>
          </div>
          <Campo id="de" rotulo="Período: de" tipo="date" valor={de} aoMudar={setDe} />
          <Campo id="ate" rotulo="Período: até" tipo="date" valor={ate} aoMudar={setAte} />
          <div className="mb-5">
            <label htmlFor="profissional" className="mb-2 block text-pequeno font-semibold text-marrom">
              Profissional
            </label>
            <select id="profissional" value={idProfissional} onChange={(e) => setIdProfissional(Number(e.target.value))} className={classeDoSelect}>
              <option value={0}>{visiveis.length > 1 ? 'Todos' : 'Somente eu'}</option>
              {visiveis.length > 1 && visiveis.map((profissional) => (
                <option key={profissional.id} value={profissional.id}>
                  {profissional.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {periodoInvalido && <Mensagem tipo="erro">A data de término não pode ser anterior à data de início</Mensagem>}

        {!periodoInvalido && relatorio.linhas.length === 0 && (
          <p className="rounded-xl bg-bege px-4 py-3 text-pequeno text-marrom">Nenhum registro encontrado para os filtros selecionados</p>
        )}
        {!periodoInvalido && relatorio.linhas.length > 0 && <TabelaRelatorio relatorio={relatorio} />}
      </Cartao>
    </PainelLayout>
  )
}

export default ProfissionalRelatorios
