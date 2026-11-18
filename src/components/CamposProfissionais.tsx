import type { Cargo } from '../types'
import type { DadosProfissional, Erros } from '../data/usuarios'
import Campo from './Campo'
import TituloDaSecao from './TituloDaSecao'

interface CamposProfissionaisProps {
  cargo: Cargo
  dados: DadosProfissional
  aoMudar: (campo: string, valor: string) => void
  erros: Erros
}

// Dados profissionais de Médico, Dentista ou Terapeuta (o Terapeuta tem campos a mais)
function CamposProfissionais({ cargo, dados, aoMudar, erros }: CamposProfissionaisProps) {
  // O nome do registro muda conforme o cargo
  let rotuloDoRegistro = 'Número de registro no conselho'
  if (cargo === 'Médico') rotuloDoRegistro = 'CRM'
  if (cargo === 'Dentista') rotuloDoRegistro = 'CRO'

  return (
    <>
      <TituloDaSecao comEspacoAcima>Dados profissionais</TituloDaSecao>
      <div className="grid gap-x-5 sm:grid-cols-2">
        <Campo id="registro" rotulo={rotuloDoRegistro} placeholder="Ex: 123456" valor={dados.registro} aoMudar={(v) => aoMudar('registro', v)} erro={erros.registro} />
        <Campo id="especialidade" rotulo="Especialidade" placeholder="Ex: Neurologia" valor={dados.especialidade} aoMudar={(v) => aoMudar('especialidade', v)} erro={erros.especialidade} />
        <Campo id="duracao" rotulo="Duração de cada consulta (minutos)" tipo="number" placeholder="Ex: 30 (de 15 a 120)" valor={dados.duracao} aoMudar={(v) => aoMudar('duracao', v)} erro={erros.duracao} />
      </div>

      {/* Dados extras só do terapeuta */}
      {cargo === 'Terapeuta' && (
        <>
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Campo id="conselho" rotulo="Conselho profissional" placeholder="Ex: CRP, CREFITO" valor={dados.conselho} aoMudar={(v) => aoMudar('conselho', v)} erro={erros.conselho} />
            <Campo id="graduacao" rotulo="Graduação" placeholder="Ex: Psicologia" valor={dados.graduacao} aoMudar={(v) => aoMudar('graduacao', v)} erro={erros.graduacao} />
            <Campo id="areaAtuacao" rotulo="Área de atuação" placeholder="Ex: Ansiedade e Depressão" valor={dados.areaAtuacao} aoMudar={(v) => aoMudar('areaAtuacao', v)} erro={erros.areaAtuacao} />
            <Campo id="posGraduacao" rotulo="Pós-graduação (se houver)" valor={dados.posGraduacao} aoMudar={(v) => aoMudar('posGraduacao', v)} />
          </div>
          <div className="mb-5">
            <label htmlFor="formacoes" className="mb-2 block text-sm font-semibold text-marrom">
              Formações complementares (se houver)
            </label>
            <textarea
              id="formacoes"
              rows={4}
              value={dados.formacoes}
              onChange={(e) => aoMudar('formacoes', e.target.value)}
              className="w-full rounded-xl border-[1.5px] border-marrom-claro bg-fundo px-4 py-3 text-sm text-escuro transition-colors duration-200 placeholder:text-marrom hover:border-verde-medio focus:border-verde-medio focus:outline-2 focus:outline-verde-leve/60"
            />
          </div>
        </>
      )}
    </>
  )
}

export default CamposProfissionais
