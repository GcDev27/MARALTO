import type { Categoria } from './cardapio'

/* Fotos do Unsplash, de uso livre pela licença deles. Os créditos ficam no rodapé. */
export type Foto = {
  id: string
  alt: string
  autor: string
  pagina: string
}

export const fotoAbertura: Foto = {
  id: 'photo-1784391169939-3927f589263b',
  alt: 'Varanda de restaurante coberta de palha, com mesas de frente para o mar no fim da tarde.',
  autor: 'Alona Sosiedko',
  pagina: 'https://unsplash.com/photos/U_oWnlg_Af0',
}

export const fotoBarco: Foto = {
  id: 'photo-1766114245664-12c138e7abe0',
  alt: 'Dois pescadores num barco pequeno, no mar, com a cidade ao fundo.',
  autor: 'Pedro Kümmel',
  pagina: 'https://unsplash.com/photos/ICmQ2PPOGlY',
}

export const fotosDoCardapio: Record<Categoria, Foto> = {
  entradas: {
    id: 'photo-1769984579601-f2b119cd3379',
    alt: 'Ostras no gelo com limão e um copo de cerveja, numa mesa à beira da água.',
    autor: 'Meg von Haartman',
    pagina: 'https://unsplash.com/photos/pGBJgIZwPks',
  },
  pratos: {
    id: 'photo-1768322264423-4b0adf0cf31b',
    alt: 'Peixe grelhado e polvo com legumes, servidos num prato.',
    autor: 'Aleksandar Rusev',
    pagina: 'https://unsplash.com/photos/Kp69hyN0D7Y',
  },
  sobremesas: {
    id: 'photo-1702728109878-c61a98d80491',
    alt: 'Pudim com calda num prato branco, sobre uma mesa de madeira.',
    autor: 'Felippe Lopes',
    pagina: 'https://unsplash.com/photos/TqPdzQ00I0U',
  },
  vinhos: {
    id: 'photo-1725305316443-4390d588ba01',
    alt: 'Uma mão segura uma taça de vinho branco num barco, com o mar ao fundo.',
    autor: 'Abigail Prowse',
    pagina: 'https://unsplash.com/photos/8Fc6QhMSU6c',
  },
}

export const todasAsFotos = [fotoAbertura, fotoBarco, ...Object.values(fotosDoCardapio)]
