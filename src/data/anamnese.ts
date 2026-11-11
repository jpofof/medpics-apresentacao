// Catálogo fixo da anamnese (7 categorias) e leitura/gravação das anamneses preenchidas.
import type { Anamnese } from '../types'
import { gravarTexto, lerTexto } from './armazenamento'

export interface ItemCatalogo {
  nome: string
  comFrequencia: boolean // true = Sim/Não + frequência obrigatória se Sim
}

export interface CategoriaCatalogo {
  nome: string
  provisoria: boolean // true = a clínica ainda não definiu a lista final
  itens: ItemCatalogo[]
}

// Transforma uma lista de nomes em itens que só se marcam (sem frequência)
function itensSimples(nomes: string[]): ItemCatalogo[] {
  return nomes.map((nome) => ({ nome, comFrequencia: false }))
}

export const catalogo: CategoriaCatalogo[] = [
  {
    nome: 'Hábitos e vícios',
    provisoria: false,
    itens: [
      { nome: 'Tabagismo', comFrequencia: true },
      { nome: 'Álcool', comFrequencia: true },
      { nome: 'Drogas', comFrequencia: true },
      { nome: 'Remédios/opioides', comFrequencia: true },
      { nome: 'Atividade física', comFrequencia: true },
      { nome: 'Alimentação', comFrequencia: false },
    ],
  },
  {
    // PROVISÓRIO: lista ainda não definida pela clínica (documento de regras, seção 13)
    nome: 'Saúde mental e emocional',
    provisoria: true,
    itens: itensSimples(['Estresse', 'Alterações de humor', 'Dificuldade de concentração', 'Tristeza persistente', 'Irritabilidade']),
  },
  {
    // PROVISÓRIO: lista ainda não definida pela clínica (documento de regras, seção 13)
    nome: 'Sintomas físicos',
    provisoria: true,
    itens: itensSimples(['Dor de cabeça', 'Dores musculares', 'Dor nas articulações', 'Fadiga', 'Tontura', 'Náuseas']),
  },
  {
    nome: 'Condições neurológicas',
    provisoria: false,
    itens: itensSimples([
      'Epilepsia refratária', 'Parkinson', 'Alzheimer', 'Esclerose múltipla', 'Enxaqueca',
      'Neuralgias', 'Distúrbios do sono', 'Espasticidade', 'Tremores', 'Dor neuropática',
    ]),
  },
  {
    nome: 'Condições de neurodesenvolvimento e psicoemocionais',
    provisoria: false,
    itens: itensSimples([
      'Autismo (TEA)', 'TDAH', 'Ansiedade', 'Depressão', 'TEPT',
      'Síndrome do pânico', 'Burnout', 'Insônia', 'Transtornos alimentares', 'Dependência química',
    ]),
  },
  {
    nome: 'Doenças crônicas, inflamatórias e autoimunes',
    provisoria: false,
    itens: itensSimples([
      'Dor crônica', 'Fibromialgia', 'Artrite reumatoide', 'Lúpus', 'Psoríase', 'Endometriose', 'Doença de Crohn',
      'Retocolite ulcerativa', 'Síndrome do intestino irritável', 'Inflamações crônicas', 'Cuidados paliativos oncológicos',
    ]),
  },
  {
    nome: 'Condições metabólicas e funcionais',
    provisoria: false,
    itens: itensSimples([
      'Diabetes', 'Obesidade', 'Hipertensão', 'Distúrbios hormonais', 'TPM e menopausa', 'Disfunções gastrointestinais',
      'Bruxismo', 'Dermatites', 'Long COVID', 'Fadiga crônica', 'Alterações de apetite e metabolismo',
    ]),
  },
]

// ---------- Leitura e gravação ----------

export function lerAnamneses(): Anamnese[] {
  const texto = lerTexto('anamneses')
  return texto === '' ? [] : JSON.parse(texto)
}

export function gravarAnamneses(lista: Anamnese[]) {
  gravarTexto('anamneses', JSON.stringify(lista))
}

// Todas as anamneses do paciente, da mais nova para a mais antiga (as antigas são o histórico)
export function anamnesesDoPaciente(idPaciente: number): Anamnese[] {
  return lerAnamneses()
    .filter((a) => a.idPaciente === idPaciente)
    .sort((a, b) => b.id - a.id)
}

// A anamnese atual do paciente (a mais nova), ou null se ainda não preencheu
export function anamneseAtual(idPaciente: number): Anamnese | null {
  const lista = anamnesesDoPaciente(idPaciente)
  return lista.length === 0 ? null : lista[0]
}
