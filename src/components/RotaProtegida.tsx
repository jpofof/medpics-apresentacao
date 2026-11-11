import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { podeAcessar, primeiroAcessoPendente, telaInicialDo, usuarioLogado } from '../data/usuarios'

interface RotaProtegidaProps {
  area: string // 'paciente', 'primeiro-acesso', 'profissional' ou 'admin'
  children: ReactNode
}

// Só mostra a tela se a pessoa estiver logada e puder entrar nessa área.
// Sem login vai para /login; em área de outro perfil vai para a própria tela inicial.
// Paciente com termos/anamnese pendentes é levado ao primeiro acesso antes de usar o painel.
function RotaProtegida({ area, children }: RotaProtegidaProps) {
  const usuario = usuarioLogado()

  if (usuario === null) return <Navigate to="/login" replace />
  if (area === 'paciente' && podeAcessar(usuario, 'paciente') && primeiroAcessoPendente(usuario.id)) {
    return <Navigate to="/primeiro-acesso" replace />
  }
  if (!podeAcessar(usuario, area)) return <Navigate to={telaInicialDo(usuario)} replace />

  return <>{children}</>
}

export default RotaProtegida
