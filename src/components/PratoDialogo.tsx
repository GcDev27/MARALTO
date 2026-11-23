import { m } from 'motion/react'
import { useEffect, useRef } from 'react'
import { preco, type Prato } from '../data/cardapio'

type Props = {
  prato: Prato | null
  aoFechar: () => void
}

/*
  Usa o <dialog> nativo: o navegador já prende o foco dentro dele, fecha com Esc
  e devolve o foco ao botão que abriu.
*/
export function PratoDialogo({ prato, aoFechar }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialogo = ref.current
    if (!dialogo) return
    if (prato && !dialogo.open) dialogo.showModal()
    if (!prato && dialogo.open) dialogo.close()
  }, [prato])

  return (
    <dialog
      ref={ref}
      className="prato"
      aria-labelledby="prato-nome"
      onClose={aoFechar}
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar()
      }}
    >
      {prato && (
        <m.div
          key={prato.id}
          className="prato-conteudo"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <h3 id="prato-nome" className="prato-nome">
            {prato.nome}
          </h3>
          <p className="prato-preco">R$ {preco(prato.preco)}</p>
          {prato.serve && <p className="prato-serve">{prato.serve}</p>}
          <p>{prato.resumo}</p>
          <p className="prato-detalhe">{prato.detalhe}</p>
          <div className="prato-acoes">
            <a className="botao" href="#reserva" onClick={aoFechar}>
              Reservar mesa
            </a>
            <button type="button" className="botao botao-vazado" onClick={aoFechar}>
              Fechar
            </button>
          </div>
        </m.div>
      )}
    </dialog>
  )
}
