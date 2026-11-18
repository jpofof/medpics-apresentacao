import Cartao from './Cartao'

interface CartaoIndicadorProps {
  numero: number
  texto: string
  icone: string // caminho de uma imagem de src/assets/icones
}

// Cartão com um número grande e o que ele significa (ex.: "3 Consultas agendadas")
function CartaoIndicador({ numero, texto, icone }: CartaoIndicadorProps) {
  return (
    <Cartao>
      <img src={icone} alt="" className="mb-2 h-7 w-7" />
      <p className="text-[32px] font-semibold leading-none text-escuro sm:text-[40px]">{numero}</p>
      <p className="mt-1 text-[12px] leading-tight text-marrom sm:text-[13px]">{texto}</p>
    </Cartao>
  )
}

export default CartaoIndicador
