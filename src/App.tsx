import { LazyMotion, MotionConfig } from 'motion/react'
import { Abertura } from './components/Abertura'
import { Cabecalho } from './components/Cabecalho'
import { Cardapio } from './components/Cardapio'
import { Duvidas } from './components/Duvidas'
import { Historia } from './components/Historia'
import { Reserva } from './components/Reserva'
import { Rodape } from './components/Rodape'
import { Semana } from './components/Semana'

const carregarRecursos = () => import('./lib/recursos-motion').then((r) => r.default)

export default function App() {
  return (
    // reducedMotion="user": o Motion desliga as animações de quem pediu movimento reduzido
    <MotionConfig reducedMotion="user">
      <LazyMotion features={carregarRecursos} strict>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Abertura />
        <Historia />
        <Cardapio />
        <Semana />
        <Reserva />
        <Duvidas />
      </main>
      <Rodape />
      </LazyMotion>
    </MotionConfig>
  )
}
