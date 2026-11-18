import ansiedade from '../assets/landing/ansiedade.svg'
import insonia from '../assets/landing/insonia.svg'
import dorCronica from '../assets/landing/dor_cronica.svg'
import fibromialgia from '../assets/landing/fibromialgia.svg'
import tdah from '../assets/landing/TDAH.svg'
import autismo from '../assets/landing/autismo.svg'
import depressao from '../assets/landing/depressao.svg'
import enxaqueca from '../assets/landing/enxaqueca.svg'

interface Condicao {
  nome: string
  icone: string
}

// Lista única de condições, usada na página inicial e em /cannabis-medicinal.
// Ordem: da mais para a menos frequente, segundo pesquisas.
export const condicoes: Condicao[] = [
  { nome: 'Dor Crônica', icone: dorCronica },
  { nome: 'Ansiedade e Estresse', icone: ansiedade },
  { nome: 'Insônia e Sono', icone: insonia },
  { nome: 'Depressão', icone: depressao },
  { nome: 'Enxaqueca', icone: enxaqueca },
  { nome: 'Fibromialgia', icone: fibromialgia },
  { nome: 'Autismo (TEA)', icone: autismo },
  { nome: 'TDAH e TOC', icone: tdah },
]
