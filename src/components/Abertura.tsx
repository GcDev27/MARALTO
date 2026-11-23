import { useRef } from 'react'
import logo from '../assets/logo-marfim.webp'
import { horarios } from '../data/casa'
import { fotoAbertura } from '../data/fotos'
import { comMovimento, gsap, useGSAP } from '../lib/gsap'
import { Imagem } from './Imagem'
import './Abertura.css'

const dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

function horarioDeHoje(hoje = new Date()) {
  const dia = hoje.getDay()
  const h = horarios[dia]
  if (!h) return `Hoje, ${dias[dia]}, a casa está fechada. Abrimos amanhã às 18h.`
  const jantar = `${h.jantar[0]}h às ${h.jantar[1]}h`
  if (h.almoco) return `Hoje, ${dias[dia]}: almoço das ${h.almoco[0]}h às ${h.almoco[1]}h e jantar das ${jantar}.`
  return `Hoje, ${dias[dia]}: jantar das ${jantar}.`
}

export function Abertura() {
  const escopo = useRef<HTMLElement>(null)

  /*
    O único movimento que acontece sem o visitante fazer nada: a foto assenta
    devagar e a logo aparece sobre ela.
  */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(comMovimento, () => {
        gsap
          .timeline({ defaults: { ease: 'power2.out' } })
          .from('.abertura-foto', { scale: 1.08, duration: 2.4, ease: 'power1.out' })
          .from('.abertura-logo', { autoAlpha: 0, y: 18, duration: 1.4 }, 0.2)
          .from('.abertura-frase, .abertura-acoes', { autoAlpha: 0, y: 12, duration: 1, stagger: 0.15 }, 0.9)
      })
    },
    { scope: escopo },
  )

  return (
    <section className="abertura" id="inicio" ref={escopo}>
      <Imagem
        className="abertura-foto"
        foto={fotoAbertura}
        proporcao={16 / 10}
        sizes="100vw"
        larguras={[640, 960, 1440, 1920]}
        prioridade
      />
      <div className="abertura-veu" aria-hidden="true" />

      <div className="conteiner abertura-conteudo">
        <h1 className="abertura-titulo">
          <img className="abertura-logo" src={logo} alt="Maralto" width={1000} height={423} />
        </h1>
        <p className="abertura-frase">Frutos do mar na Beira Mar de Fortaleza, desde 1978.</p>
        <div className="abertura-acoes">
          <a className="botao botao-claro" href="#reserva">
            Reservar mesa
          </a>
          <a className="botao botao-claro-vazado" href="#cardapio">
            Ver o cardápio
          </a>
        </div>
      </div>

      <p className="conteiner abertura-horario">{horarioDeHoje()}</p>
    </section>
  )
}
