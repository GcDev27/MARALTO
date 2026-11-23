import { email, endereco, telefone } from '../data/casa'
import { todasAsFotos } from '../data/fotos'
import logo from '../assets/logo-marfim.webp'
import './Rodape.css'

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="conteiner rodape-grade">
        <img className="rodape-logo" src={logo} alt="Maralto" width={1000} height={423} loading="lazy" />
        <address className="rodape-contato">
          {endereco}
          <br />
          <a href={`tel:+55${telefone.replace(/\D/g, '')}`}>{telefone}</a>
          <br />
          <a href={`mailto:${email}`}>{email}</a>
        </address>
        <p className="rodape-nota">
          Projeto acadêmico da disciplina de Interação Humano-Computador. O Maralto, o Mestre Elias
          e os preços são fictícios.
        </p>
        <p className="rodape-nota rodape-creditos">
          Fotos do Unsplash por{' '}
          {todasAsFotos.map((f, i) => (
            <span key={f.id}>
              <a href={`${f.pagina}?utm_source=maralto&utm_medium=referral`}>{f.autor}</a>
              {i < todasAsFotos.length - 2 ? ', ' : i === todasAsFotos.length - 2 ? ' e ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}
