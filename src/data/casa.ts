export const marcos = [
  {
    ano: 'Anos 70',
    titulo: 'O barco',
    texto:
      'O Maralto era o barco de pesca do Mestre Elias, na costa de Fortaleza. Ele saía de madrugada e voltava com o que o mar tivesse dado.',
  },
  {
    ano: '1978',
    titulo: 'A tenda',
    texto:
      'O almoço da tripulação, feito na areia com os temperos da avó dele, começou a juntar gente. Virou uma tenda com quatro mesas.',
  },
  {
    ano: 'Hoje',
    titulo: 'A casa',
    texto:
      'A terceira geração da família toca o restaurante na Beira Mar. O timão do barco virou a nossa marca e o peixe ainda chega de manhã.',
  },
]

export const semana = [
  {
    nome: 'Festival do camarão',
    quando: 'Até o fim do mês',
    texto: 'Sequência para duas pessoas: alho e óleo, empanado e no bafo.',
    preco: 120,
    precoAntes: 150,
  },
  {
    nome: 'Ostras e espumante',
    quando: 'Terça a quinta, das 18h às 20h',
    texto: 'Uma dúzia de ostras e uma garrafa do espumante da casa.',
    preco: 99.9,
  },
  {
    nome: 'Menu do chef',
    quando: 'Sexta e sábado, com reserva',
    texto: 'Cinco pratos pequenos escolhidos pela cozinha, com vinho em cada etapa.',
    preco: 180,
  },
]

export const duvidas = [
  {
    pergunta: 'Tem estacionamento?',
    resposta:
      'No jantar, o valet é gratuito. No almoço de sábado e domingo, temos convênio com o estacionamento ao lado.',
  },
  {
    pergunta: 'Preciso reservar?',
    resposta:
      'Sexta, sábado e domingo a casa costuma lotar, então é melhor reservar. Sempre guardamos algumas mesas para quem chega sem reserva.',
  },
  {
    pergunta: 'Posso levar meu vinho?',
    resposta:
      'Pode. A taxa de rolha é R$ 50,00 por garrafa. Às terças, a primeira garrafa não paga.',
  },
  {
    pergunta: 'Aceitam animais?',
    resposta:
      'Animais de pequeno porte podem ficar na varanda, na guia. Servimos água fresca para eles.',
  },
  {
    pergunta: 'Fazem eventos e aniversários?',
    resposta:
      'O salão do segundo andar recebe até 40 pessoas. O bolo pode vir de fora ou ser encomendado com a nossa confeitaria.',
  },
]

export const endereco = 'Av. Beira Mar, 500, Meireles, Fortaleza (CE)'
export const telefone = '(85) 3333-4444'
export const email = 'reservas@maralto.com.br'

/* 0 = domingo. Fechado às segundas. */
export const horarios: Record<number, { almoco?: [number, number]; jantar: [number, number] }> = {
  0: { almoco: [12, 16], jantar: [18, 23] },
  2: { jantar: [18, 23] },
  3: { jantar: [18, 23] },
  4: { jantar: [18, 23] },
  5: { jantar: [18, 23] },
  6: { almoco: [12, 16], jantar: [18, 23] },
}
