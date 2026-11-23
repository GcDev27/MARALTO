import { preco } from '../data/cardapio'
import { semana } from '../data/casa'
import './Semana.css'

export function Semana() {
  return (
    <section className="semana" id="semana" aria-labelledby="semana-titulo">
      <div className="conteiner semana-placa">
        <span className="filete" aria-hidden="true" />
        <h2 id="semana-titulo">Nesta semana</h2>
        <ul className="semana-lista">
          {semana.map((s) => (
            <li key={s.nome} className="oferta">
              <h3 className="oferta-nome">{s.nome}</h3>
              <p className="oferta-quando">{s.quando}</p>
              <p className="oferta-texto">{s.texto}</p>
              <p className="oferta-preco">
                {s.precoAntes && (
                  <s className="oferta-antes">
                    <span className="so-leitor">De </span>R$ {preco(s.precoAntes)}
                    <span className="so-leitor"> por</span>
                  </s>
                )}{' '}
                R$ {preco(s.preco)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
