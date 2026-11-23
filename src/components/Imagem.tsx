import type { Foto } from '../data/fotos'

type Props = {
  foto: Foto
  /* proporção largura / altura do recorte */
  proporcao: number
  sizes: string
  className?: string
  larguras?: number[]
  /* a foto do topo carrega logo e com prioridade; as outras, só perto da rolagem */
  prioridade?: boolean
}

/* O CDN do Unsplash recorta, redimensiona e entrega AVIF ou WebP conforme o navegador. */
function url(id: string, largura: number, proporcao: number) {
  const altura = Math.round(largura / proporcao)
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=${largura}&h=${altura}`
}

export function Imagem({
  foto,
  proporcao,
  sizes,
  className,
  larguras = [400, 640, 960, 1280],
  prioridade = false,
}: Props) {
  const maior = larguras[larguras.length - 1]
  return (
    <img
      className={className}
      src={url(foto.id, maior, proporcao)}
      srcSet={larguras.map((l) => `${url(foto.id, l, proporcao)} ${l}w`).join(', ')}
      sizes={sizes}
      width={maior}
      height={Math.round(maior / proporcao)}
      alt={foto.alt}
      loading={prioridade ? 'eager' : 'lazy'}
      fetchPriority={prioridade ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
