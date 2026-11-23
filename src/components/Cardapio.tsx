import { AnimatePresence, m } from 'motion/react'
import { useState } from 'react'
import { cardapio, categorias, preco, type Categoria, type Prato } from '../data/cardapio'
import { fotosDoCardapio } from '../data/fotos'
import { Imagem } from './Imagem'
import { PratoDialogo } from './PratoDialogo'
import './Cardapio.css'

type Filtro = Categoria | 'tudo'

const filtros: { id: Filtro; nome: string }[] = [{ id: 'tudo', nome: 'Tudo' }, ...categorias]

export function Cardapio() {
  const [filtro, setFiltro] = useState<Filtro>('tudo')
  const [aberto, setAberto] = useState<Prato | null>(null)

  const visiveis = categorias.filter((c) => filtro === 'tudo' || c.id === filtro)

  return (
    <section className="secao cardapio" id="cardapio" aria-labelledby="cardapio-titulo">
      <div className="conteiner">
        <span className="filete" aria-hidden="true" />
        <h2 id="cardapio-titulo" className="secao-titulo">
          Cardápio
        </h2>
        <p className="secao-intro">
          Preços em reais. O peixe do ceviche e a lagosta dependem do que a pesca trouxe. Toque em
          um prato para ver mais.
        </p>

        <div className="filtros" role="group" aria-label="Mostrar no cardápio">
          {filtros.map((f) => (
            <button
              key={f.id}
              type="button"
              className="filtro"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
            >
              {filtro === f.id && (
                <m.span
                  layoutId="filtro-ativo"
                  className="filtro-fundo"
                  transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
                />
              )}
              <span className="filtro-nome">{f.nome}</span>
            </button>
          ))}
        </div>

        <div className="cardapio-grupos">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiveis.map((c) => (
              <m.section
                key={c.id}
                layout
                className="grupo"
                aria-labelledby={`grupo-${c.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grupo-lado">
                  <h3 id={`grupo-${c.id}`} className="grupo-titulo">
                    {c.nome}
                  </h3>
                  <Imagem
                    className="grupo-foto"
                    foto={fotosDoCardapio[c.id]}
                    proporcao={4 / 5}
                    sizes="(min-width: 900px) 19rem, calc(100vw - 2.5rem)"
                  />
                </div>
                <ul className="grupo-lista">
                  {cardapio
                    .filter((p) => p.categoria === c.id)
                    .map((p) => (
                      <li key={p.id} className="item">
                        <button
                          type="button"
                          className="item-linha"
                          aria-haspopup="dialog"
                          onClick={() => setAberto(p)}
                        >
                          <span className="item-nome">{p.nome}</span>
                          <span className="item-pontos" aria-hidden="true" />
                          <span className="item-preco">
                            <span className="so-leitor">R$ </span>
                            {preco(p.preco)}
                          </span>
                        </button>
                        <p className="item-resumo">
                          {p.marca && <span className="item-marca">{p.marca}. </span>}
                          {p.resumo}
                        </p>
                      </li>
                    ))}
                </ul>
              </m.section>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <PratoDialogo prato={aberto} aoFechar={() => setAberto(null)} />
    </section>
  )
}
