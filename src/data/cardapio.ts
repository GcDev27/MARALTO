export type Categoria = 'entradas' | 'pratos' | 'sobremesas' | 'vinhos'

export type Prato = {
  id: string
  nome: string
  categoria: Categoria
  preco: number
  resumo: string
  detalhe: string
  serve?: string
  marca?: 'Da casa' | 'Novo'
}

export const categorias: { id: Categoria; nome: string }[] = [
  { id: 'entradas', nome: 'Entradas' },
  { id: 'pratos', nome: 'Pratos' },
  { id: 'sobremesas', nome: 'Sobremesas' },
  { id: 'vinhos', nome: 'Vinhos' },
]

export const cardapio: Prato[] = [
  {
    id: 'ostras',
    nome: 'Ostras frescas',
    categoria: 'entradas',
    preco: 54,
    resumo: 'Seis ostras no gelo, com limão e vinagrete de chalota.',
    detalhe:
      'Chegam vivas todo dia de manhã. Podem vir cruas ou gratinadas com queijo coalho (mais R$ 10).',
    serve: '6 unidades',
  },
  {
    id: 'casquinha',
    nome: 'Casquinha de siri',
    categoria: 'entradas',
    preco: 38,
    resumo: 'Siri catado à mão, gratinado, com farofa de manteiga.',
    detalhe:
      'A receita é a mesma da tenda de 1978. O siri é catado na cozinha, por isso às vezes acaba antes das 21h.',
    serve: '4 unidades',
  },
  {
    id: 'ceviche',
    nome: 'Ceviche de peixe branco',
    categoria: 'entradas',
    preco: 45,
    resumo: 'Peixe do dia no limão, com manga, coentro e pimenta dedo-de-moça.',
    detalhe:
      'O peixe muda conforme a pesca: em geral pargo ou serra. Pergunte ao garçom qual chegou hoje.',
  },
  {
    id: 'bolinhos',
    nome: 'Bolinhos de bacalhau',
    categoria: 'entradas',
    preco: 42,
    resumo: 'Seis bolinhos, com maionese de limão siciliano.',
    detalhe: 'Bacalhau dessalgado aqui, batata e salsa. Fritos na hora do pedido.',
    serve: '6 unidades',
  },
  {
    id: 'lagosta',
    nome: 'Lagosta grelhada',
    categoria: 'pratos',
    preco: 189,
    resumo: 'Lagosta inteira na manteiga de ervas, com risoto de limão siciliano.',
    detalhe:
      'Só servimos lagosta fora do período de defeso (dezembro a maio). Fora da época, o prato sai do cardápio.',
    marca: 'Da casa',
  },
  {
    id: 'moqueca',
    nome: 'Moqueca capixaba',
    categoria: 'pratos',
    preco: 125,
    resumo: 'Peixe, camarão e lula na panela de barro, sem dendê.',
    detalhe:
      'Vem com arroz branco e pirão. Leva uns 35 minutos, então vale pedir junto com a entrada.',
    serve: 'Serve 2 pessoas',
    marca: 'Novo',
  },
  {
    id: 'polvo',
    nome: 'Polvo à lagareiro',
    categoria: 'pratos',
    preco: 98,
    resumo: 'Polvo grelhado no azeite, com batatas ao murro e alho.',
    detalhe: 'O polvo é cozido devagar antes de ir para a brasa, por isso fica macio.',
  },
  {
    id: 'salmao',
    nome: 'Salmão ao maracujá',
    categoria: 'pratos',
    preco: 89,
    resumo: 'Filé grelhado com molho de maracujá e purê de mandioquinha.',
    detalhe: 'O único peixe do cardápio que não é da costa. Fica porque os clientes pedem.',
  },
  {
    id: 'camarao',
    nome: 'Camarão ao alho e óleo',
    categoria: 'pratos',
    preco: 78,
    resumo: 'Meio quilo de camarão salteado com alho e pimenta calabresa.',
    detalhe: 'Acompanha arroz de coco ou fritas, à escolha.',
    serve: '500 g',
  },
  {
    id: 'robalo',
    nome: 'Robalo na brasa',
    categoria: 'pratos',
    preco: 92,
    resumo: 'Filé com crosta de ervas e legumes salteados na manteiga.',
    detalhe: 'Grelhado na brasa de carvão. Pode pedir sem a crosta.',
  },
  {
    id: 'pudim',
    nome: 'Pudim de tapioca',
    categoria: 'sobremesas',
    preco: 24,
    resumo: 'Com calda de coco queimado.',
    detalhe: 'Receita da avó do Mestre Elias. É a sobremesa que mais sai.',
    marca: 'Da casa',
  },
  {
    id: 'petit',
    nome: 'Petit gâteau',
    categoria: 'sobremesas',
    preco: 28,
    resumo: 'Bolo quente de chocolate com sorvete de creme.',
    detalhe: 'Assado na hora, leva cerca de 12 minutos.',
  },
  {
    id: 'torta',
    nome: 'Torta de limão',
    categoria: 'sobremesas',
    preco: 26,
    resumo: 'Base de biscoito, creme de limão siciliano e merengue.',
    detalhe: 'O merengue é maçaricado na hora de servir.',
  },
  {
    id: 'chardonnay',
    nome: 'Chardonnay reserva',
    categoria: 'vinhos',
    preco: 120,
    resumo: 'Branco com notas de fruta branca e um pouco de madeira.',
    detalhe: 'Vai bem com a lagosta e com o robalo. Garrafa de 750 ml.',
  },
  {
    id: 'rose',
    nome: 'Rosé da Provence',
    categoria: 'vinhos',
    preco: 145,
    resumo: 'Leve, seco, com notas de morango.',
    detalhe: 'Bom para a varanda no fim da tarde. Garrafa de 750 ml.',
  },
  {
    id: 'espumante',
    nome: 'Espumante brut',
    categoria: 'vinhos',
    preco: 85,
    resumo: 'Brasileiro, feito pelo método tradicional.',
    detalhe: 'Da Serra Gaúcha. É o que vai no combo de ostras do happy hour.',
  },
]

const formato = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const preco = (valor: number) => formato.format(valor)
