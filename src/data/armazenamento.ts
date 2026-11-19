// Leitura e gravação no localStorage. Cada coleção (usuarios, agendamentos...) é guardada como um texto JSON.
// Os outros arquivos de src/data transformam esse texto em listas com tipo.

const PREFIXO = 'medpics:'

export function lerTexto(colecao: string): string {
  return localStorage.getItem(PREFIXO + colecao) ?? ''
}

export function gravarTexto(colecao: string, texto: string) {
  localStorage.setItem(PREFIXO + colecao, texto)
}

// Apaga só o que é do MedPics (chaves que começam com o prefixo)
export function apagarTudo() {
  const chaves: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i)
    if (chave !== null && chave.startsWith(PREFIXO)) chaves.push(chave)
  }
  for (const chave of chaves) {
    localStorage.removeItem(chave)
  }
}

// Próximo id livre de uma coleção: recebe os ids que já existem
export function proximoId(idsExistentes: number[]): number {
  let maior = 0
  for (const id of idsExistentes) {
    if (id > maior) maior = id
  }
  return maior + 1
}
