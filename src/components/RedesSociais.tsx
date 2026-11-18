interface RedeSocial {
  nome: string
  rotulo: string // texto lido por leitores de tela
  endereco: string
  desenho: string // traço do ícone (SVG de 24x24)
}

// Endereços reais, conferidos no site atual da clínica (https://medpics.com.br/)
const redes: RedeSocial[] = [
  {
    nome: 'Instagram',
    rotulo: 'Instagram da Medpics',
    endereco: 'https://www.instagram.com/_medpics',
    desenho: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z M12 8a4 4 0 100 8 4 4 0 000-8z M17.5 6.5h.01',
  },
  {
    nome: 'Facebook',
    rotulo: 'Facebook da Medpics',
    endereco: 'https://www.facebook.com/cmedpics',
    desenho: 'M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z',
  },
  {
    nome: 'Avaliação no Google',
    rotulo: 'Avalie a Medpics no Google',
    endereco: 'https://g.page/r/CavaB1vY9E-5EB0/review',
    desenho: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  },
]

// Ícones das redes sociais da clínica (rodapé). Cada link abre em nova aba.
function RedesSociais() {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {redes.map((rede) => (
        <li key={rede.nome}>
          <a
            href={rede.endereco}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={rede.rotulo}
            title={rede.nome}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-bege/30 text-fundo transition-colors duration-200 hover:border-verde-leve hover:text-verde-leve focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-leve active:bg-fundo/10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
              <path d={rede.desenho} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default RedesSociais
