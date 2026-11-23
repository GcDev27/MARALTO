import { AnimatePresence, m } from 'motion/react'
import { useEffect, useState } from 'react'
import logo from '../assets/logo-marinho.webp'
import './Cabecalho.css'

const links = [
  { href: '#historia', nome: 'História' },
  { href: '#cardapio', nome: 'Cardápio' },
  { href: '#semana', nome: 'Nesta semana' },
  { href: '#duvidas', nome: 'Dúvidas' },
]

export function Cabecalho() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberto])

  const fechar = () => setAberto(false)

  return (
    <header className="cabecalho">
      <div className="conteiner cabecalho-barra">
        <a className="cabecalho-marca" href="#inicio" onClick={fechar}>
          <img src={logo} alt="Maralto, voltar ao início" width={1000} height={423} />
        </a>

        <nav className="cabecalho-nav" aria-label="Seções">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.nome}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="botao cabecalho-reservar" href="#reserva" onClick={fechar}>
          Reservar mesa
        </a>

        <button
          type="button"
          className="cabecalho-menu"
          aria-expanded={aberto}
          aria-controls="menu-celular"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? 'Fechar' : 'Menu'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {aberto && (
          <m.nav
            id="menu-celular"
            className="menu-celular"
            aria-label="Seções"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <ul className="conteiner">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={fechar}>
                    {link.nome}
                  </a>
                </li>
              ))}
              <li>
                <a href="#reserva" onClick={fechar}>
                  Reservar mesa
                </a>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
