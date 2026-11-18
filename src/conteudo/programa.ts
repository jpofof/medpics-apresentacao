import integrativoSemanal from '../assets/landing/integrativo-semanal.webp'
import praticasIntegrativas from '../assets/landing/praticas-integrativas.webp'
import acompanhamentoSemana from '../assets/landing/acompanhamento-semana.webp'

interface ProgramaItem {
  imagem: string
  titulo: string
  descricao: string // frase curta (cartão da página inicial)
  detalhe: string // texto a mais (página /programa-terapeutico)
}

// Os 3 cartões do programa, usados na página inicial e em /programa-terapeutico
export const programas: ProgramaItem[] = [
  {
    imagem: integrativoSemanal,
    titulo: 'Acompanhamento Integrativo Semanal',
    descricao: 'Sessões individuais de meditação, acupuntura e fitoterapia.',
    detalhe: 'O médico indica quais práticas integrativas podem contribuir, em sessões semanais ou quinzenais.',
  },
  {
    imagem: praticasIntegrativas,
    titulo: 'Práticas Integrativas Individuais',
    // TEXTO PROVISÓRIO: a clínica ainda vai confirmar
    descricao: 'Atendimento individual com terapeutas especializados em práticas integrativas.',
    detalhe: 'Muitas práticas podem ser feitas à distância, com orientação de um terapeuta habilitado.',
  },
  {
    imagem: acompanhamentoSemana,
    titulo: 'Acompanhamento Semanal Cannabis Medicinal',
    descricao: 'Acompanhamento semanal com ajuste de dosagem.',
    detalhe: 'A equipe acompanha sua evolução, esclarece dúvidas e conversa com o médico sempre que necessário.',
  },
]
