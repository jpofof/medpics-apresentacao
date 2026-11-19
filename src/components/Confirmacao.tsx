import Botao from './Botao'

interface ConfirmacaoProps {
  mensagem: string
  textoConfirmar?: string
  perigo?: boolean // botão de confirmar em vermelho
  aoConfirmar: () => void
  aoCancelar: () => void
}

// Pedido de confirmação na própria tela (sem janelas do navegador)
function Confirmacao({ mensagem, textoConfirmar = 'Confirmar', perigo = false, aoConfirmar, aoCancelar }: ConfirmacaoProps) {
  return (
    <div role="group" aria-label="Confirmação" className="rounded-xl border border-marrom-claro bg-bege/60 p-4">
      <p className="mb-4 text-pequeno text-escuro">{mensagem}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Botao variante={perigo ? 'perigo' : 'primario'} aoClicar={aoConfirmar}>
          {textoConfirmar}
        </Botao>
        <Botao variante="secundario" aoClicar={aoCancelar}>
          Voltar
        </Botao>
      </div>
    </div>
  )
}

export default Confirmacao
