import { catalogo } from '../data/anamnese'
import type { EstadoAnamnese } from '../data/anamnese'

interface FormularioAnamneseProps {
  estado: EstadoAnamnese
  aoMudar: (estado: EstadoAnamnese) => void
}

const classeDoCampoPequeno =
  'h-11 w-full rounded-xl border-[1.5px] border-borda bg-fundo px-3 text-sm text-texto transition-colors duration-200 placeholder:text-[#b8b0a4] hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-suave/60'

// Formulário de anamnese (7 categorias do catálogo). A página dona guarda o "estado" e o passa para cá.
// Hábitos com frequência: Sim/Não, e se Sim, frequência. Demais itens: caixa de marcar. Observação é opcional.
function FormularioAnamnese({ estado, aoMudar }: FormularioAnamneseProps) {
  function responderHabito(nome: string, sim: boolean) {
    const semEste = estado.itens.filter((i) => i.item !== nome)
    const semNao = estado.habitosNao.filter((h) => h !== nome)
    if (sim) {
      aoMudar({ itens: [...semEste, { item: nome, frequencia: '', observacao: '' }], habitosNao: semNao })
    } else {
      aoMudar({ itens: semEste, habitosNao: [...semNao, nome] })
    }
  }

  function marcarItem(nome: string, marcado: boolean) {
    const semEste = estado.itens.filter((i) => i.item !== nome)
    aoMudar({ itens: marcado ? [...semEste, { item: nome, frequencia: '', observacao: '' }] : semEste, habitosNao: estado.habitosNao })
  }

  // Muda a frequência ou a observação de um item já marcado
  function mudarTexto(nome: string, campo: string, texto: string) {
    const itens = estado.itens.map((i) => {
      if (i.item !== nome) return i
      return campo === 'frequencia' ? { ...i, frequencia: texto } : { ...i, observacao: texto }
    })
    aoMudar({ itens, habitosNao: estado.habitosNao })
  }

  return (
    <div>
      <p className="mb-6 text-sm text-marrom">
        Marque os itens que se aplicam a você. Em tabagismo, álcool, drogas, remédios/opioides e atividade física, responda
        Sim ou Não e, se for Sim, informe a frequência. Itens não marcados significam que não se aplicam.
      </p>

      {catalogo.map((categoria) => (
        <fieldset key={categoria.nome} className="mb-6 min-w-0 rounded-2xl border border-black/10 bg-fundo-2/40 p-4 sm:p-5">
          <legend className="px-2 font-titulo text-lg text-texto">{categoria.nome}</legend>
          {categoria.provisoria && <p className="mb-3 text-xs text-marrom-claro">Lista provisória: a clínica ainda vai definir as opções finais.</p>}

          <div className="grid gap-3 sm:grid-cols-2">
            {categoria.itens.map((item) => {
              const marcado = estado.itens.find((i) => i.item === item.nome)

              // Hábito com Sim/Não e frequência
              if (item.comFrequencia) {
                return (
                  <div
                    key={item.nome}
                    className="rounded-xl border border-black/10 bg-fundo p-4 sm:col-span-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                      <p className="text-[15px] font-medium text-texto">{item.nome}</p>
                      <div role="radiogroup" aria-label={item.nome} className="flex gap-5">
                        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-texto">
                          <input
                            type="radio"
                            name={'habito-' + item.nome}
                            checked={marcado !== undefined}
                            onChange={() => responderHabito(item.nome, true)}
                            className="h-5 w-5 cursor-pointer accent-primary"
                          />
                          Sim
                        </label>
                        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-texto">
                          <input
                            type="radio"
                            name={'habito-' + item.nome}
                            checked={estado.habitosNao.includes(item.nome)}
                            onChange={() => responderHabito(item.nome, false)}
                            className="h-5 w-5 cursor-pointer accent-primary"
                          />
                          Não
                        </label>
                      </div>
                    </div>

                    {marcado && (
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        <label className="block text-xs font-medium text-marrom">
                          Frequência
                          <input
                            type="text"
                            placeholder="Ex: 3x por semana"
                            value={marcado.frequencia}
                            onChange={(e) => mudarTexto(item.nome, 'frequencia', e.target.value)}
                            className={`${classeDoCampoPequeno} mt-1`}
                          />
                        </label>
                        <label className="block text-xs font-medium text-marrom">
                          Observação (opcional)
                          <input
                            type="text"
                            value={marcado.observacao}
                            onChange={(e) => mudarTexto(item.nome, 'observacao', e.target.value)}
                            className={`${classeDoCampoPequeno} mt-1`}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                )
              }

              // Item que só se marca
              return (
                <div
                  key={item.nome}
                  className={`rounded-xl border bg-fundo px-4 py-1 transition-colors duration-200 ${
                    marcado ? 'border-primary/60' : 'border-black/10 hover:border-primary/40'
                  }`}
                >
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-texto">
                    <input
                      type="checkbox"
                      checked={marcado !== undefined}
                      onChange={(e) => marcarItem(item.nome, e.target.checked)}
                      className="h-5 w-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                    {item.nome}
                  </label>
                  {marcado && (
                    <input
                      type="text"
                      aria-label={'Observação sobre ' + item.nome + ' (opcional)'}
                      placeholder="Observação (opcional)"
                      value={marcado.observacao}
                      onChange={(e) => mudarTexto(item.nome, 'observacao', e.target.value)}
                      className={`${classeDoCampoPequeno} mb-3`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}

export default FormularioAnamnese
