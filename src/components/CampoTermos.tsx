interface CampoTermosProps {
  aceito: boolean
  aoMudar: (aceito: boolean) => void
  texto?: string
  erro?: string
}

// Caixa de aceite dos termos de uso (LGPD)
function CampoTermos({ aceito, aoMudar, texto = 'Aceito os Termos de Uso e a Política de Privacidade (LGPD) da Clínica MedPics', erro }: CampoTermosProps) {
  return (
    <div className="mb-6">
      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm text-marrom">
        <input
          type="checkbox"
          checked={aceito}
          onChange={(e) => aoMudar(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <span>{texto}</span>
      </label>
      {erro && (
        <p role="alert" className="mt-1 text-xs text-erro">
          {erro}
        </p>
      )}
    </div>
  )
}

export default CampoTermos
