interface TituloDaSecaoProps {
  children: string
  comEspacoAcima?: boolean
}

// Título de uma parte do formulário ("Dados pessoais", "Acesso ao sistema"...)
function TituloDaSecao({ children, comEspacoAcima = false }: TituloDaSecaoProps) {
  return (
    <h3 className={`mb-4 border-b border-borda pb-2 font-titulo text-xl text-texto ${comEspacoAcima ? 'mt-4' : ''}`}>
      {children}
    </h3>
  )
}

export default TituloDaSecao
