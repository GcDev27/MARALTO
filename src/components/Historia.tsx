import { useEffect, useRef } from 'react'
import { marcos } from '../data/casa'
import { fotoBarco } from '../data/fotos'
import { desktopComMovimento, gsap } from '../lib/gsap'
import { Imagem } from './Imagem'
import timao from '../assets/timao-marfim.webp'
import './Historia.css'

export function Historia() {
  const palco = useRef<HTMLDivElement>(null)

  /*
    No desktop, a seção fica parada enquanto a rolagem passa pelos três
    momentos e o timão da logo balança. No celular e com movimento reduzido, os três
    aparecem em sequência normal, sem prender a rolagem.
  */
  useEffect(() => {
    const consulta = window.matchMedia(desktopComMovimento)
    let mm: gsap.MatchMedia | undefined
    let cancelado = false

    const iniciar = async () => {
      if (mm || !consulta.matches) return
      await import('../lib/rolagem')
      if (cancelado || mm) return
      const el = palco.current!
      mm = gsap.matchMedia(el)
      mm.add(desktopComMovimento, () => {
        const itens = gsap.utils.toArray<HTMLElement>('.marco', el)
        const cabecalho = document.querySelector<HTMLElement>('.cabecalho')?.offsetHeight ?? 0
        el.classList.add('em-cena')

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            pin: true,
            start: `top top+=${cabecalho}`,
            end: '+=180%',
            scrub: 0.5,
          },
        })

        itens.forEach((item, i) => {
          if (i === 0) return
          tl.to(itens[i - 1], { autoAlpha: 0, y: -32, duration: 0.4 }, i - 0.6)
          tl.fromTo(item, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.4)
          tl.set('.rota-ponto', { className: 'rota-ponto' }, i - 0.4)
          tl.set(`.rota-ponto:nth-child(${i + 1})`, { className: 'rota-ponto atual' }, i - 0.4)
        })
        tl.fromTo('.rota-linha', { scaleX: 0 }, { scaleX: 1, duration: itens.length - 1 }, 0)
        tl.fromTo('.historia-timao', { rotate: -12 }, { rotate: 12, duration: itens.length - 1 }, 0)
        tl.to({}, { duration: 0.3 })

        return () => el.classList.remove('em-cena')
      })
    }

    iniciar()
    consulta.addEventListener('change', iniciar)
    return () => {
      cancelado = true
      consulta.removeEventListener('change', iniciar)
      mm?.revert()
    }
  }, [])

  return (
    <section className="historia" id="historia" aria-labelledby="historia-titulo">
      <div className="historia-palco" ref={palco}>
        <div className="conteiner historia-grade">
          <div className="historia-cabeca">
            <span className="filete" aria-hidden="true" />
            <h2 id="historia-titulo" className="secao-titulo">
              De um barco para a mesa
            </h2>
            <div className="rota" aria-hidden="true">
              <span className="rota-linha" />
              <ol className="rota-pontos">
                {marcos.map((m, i) => (
                  <li key={m.ano} className={i === 0 ? 'rota-ponto atual' : 'rota-ponto'}>
                    {m.ano}
                  </li>
                ))}
              </ol>
            </div>
            <Imagem
              className="historia-foto"
              foto={fotoBarco}
              proporcao={3 / 2}
              sizes="(min-width: 900px) 34rem, calc(100vw - 2rem)"
            />
          </div>

          <ol className="historia-trilho">
            {marcos.map((m) => (
              <li key={m.ano} className="marco">
                <p className="marco-ano">{m.ano}</p>
                <h3 className="marco-titulo">{m.titulo}</h3>
                <p className="marco-texto">{m.texto}</p>
              </li>
            ))}
          </ol>
        </div>
        <img className="historia-timao" src={timao} alt="" width={412} height={203} />
      </div>
    </section>
  )
}
