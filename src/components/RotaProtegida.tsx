import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { podeAcessar, telaInicialDo, usuarioLogado } from '../data/usuarios'

interface RotaProtegidaProps {
  area: string // 'paciente', 'profissional' ou 'admin'
  children: ReactNode
}

// Só mostra a tela se a pessoa estiver logada e puder entrar nessa área.
// Sem login vai para /login; em área de outro perfil vai para a própria tela inicial.
function RotaProtegida({ area, children }: RotaProtegidaProps) {
  const usuario = usuarioLogado()

  if (usuario === null) return <Navigate to="/login" replace />
  if (!podeAcessar(usuario, area)) return <Navigate to={telaInicialDo(usuario)} replace />

  return <>{children}</>
}

export default RotaProtegida
