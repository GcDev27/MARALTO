import { duvidas } from '../data/casa'
import './Duvidas.css'

/* <details> nativo: abre e fecha pelo teclado e funciona mesmo sem JavaScript. */
export function Duvidas() {
  return (
    <section className="secao duvidas" id="duvidas" aria-labelledby="duvidas-titulo">
      <div className="conteiner duvidas-grade">
        <div>
          <span className="filete" aria-hidden="true" />
          <h2 id="duvidas-titulo" className="secao-titulo">
            Dúvidas
          </h2>
        </div>
        <div className="duvidas-lista">
          {duvidas.map((d) => (
            <details key={d.pergunta} className="duvida">
              <summary>{d.pergunta}</summary>
              <p>{d.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
