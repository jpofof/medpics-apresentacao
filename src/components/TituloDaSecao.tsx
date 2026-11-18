interface TituloDaSecaoProps {
  children: string
  comEspacoAcima?: boolean
}

// Título de uma parte do formulário ("Dados pessoais", "Acesso ao sistema"...)
function TituloDaSecao({ children, comEspacoAcima = false }: TituloDaSecaoProps) {
  return (
    <h3 className={`mb-4 border-b border-marrom-claro pb-2 text-xl text-escuro ${comEspacoAcima ? 'mt-4' : ''}`}>
      {children}
    </h3>
  )
}

export default TituloDaSecao
