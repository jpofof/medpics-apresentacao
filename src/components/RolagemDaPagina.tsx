import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Título da aba de cada página pública (as outras ficam com "MedPics")
function tituloDaPagina(pathname: string) {
  if (pathname === '/cannabis-medicinal') return 'Cannabis Medicinal | MedPics'
  if (pathname === '/programa-terapeutico') return 'Programa Terapêutico | MedPics'
  if (pathname === '/praticas-integrativas') return 'Práticas Integrativas | MedPics'
  return 'MedPics'
}

// Ao mudar de página: rola até a seção do endereço (#...) ou volta ao topo, e troca o título da aba
function RolagemDaPagina() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = tituloDaPagina(pathname)
    const secao = hash === '' ? null : document.getElementById(hash.slice(1))
    if (secao) secao.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default RolagemDaPagina
