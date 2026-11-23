# Maralto

Site de um restaurante fictício de frutos do mar em Fortaleza, refeito do zero a partir de um trabalho da disciplina de Interação Humano-Computador (IHC).

O restaurante, o Mestre Elias e os preços são inventados.

**No ar:** https://maralto-ce.vercel.app

## Visual

- **Logo:** é a mesma da versão original, feita por mim. Apenas tirei o fundo do arquivo e gerei duas versões, uma em azul-marinho e outra em marfim, sem redesenhar nada.
- **Cores:** saem da logo. São o azul-marinho do traço, um branco-pérola e um latão usado só em filetes.
- **Fontes:** títulos em Libre Caslon Display e texto em Hanken Grotesk.

## O que mudou em relação à primeira versão

- **Formulário de reserva.** Agora tem rótulos de verdade, e não só placeholder. As mensagens de erro aparecem ao lado de cada campo. O formulário não aceita data passada nem segunda-feira, e só mostra os horários em que a casa está aberta naquele dia. A confirmação aparece na própria página, sem `alert()`.
- **Detalhes do prato.** Abrem num `<dialog>` nativo, que já prende o foco dentro dele, fecha com Esc e devolve o foco ao botão que o abriu.
- **Menu do celular e filtros.** O menu informa se está aberto (`aria-expanded`) e os filtros do cardápio informam qual está ativo (`aria-pressed`).
- **Movimento.** As animações respeitam `prefers-reduced-motion`.

## Animações

- **GSAP + ScrollTrigger.** Fazem a foto do topo assentar devagar e a logo aparecer quando a página abre. No desktop, a seção "De um barco para a mesa" fica fixa enquanto a rolagem passa pelos três momentos da história. No celular, a seção não fica presa.
- **Motion.** Cuida das respostas ao que a pessoa faz: trocar o filtro do cardápio, abrir o menu, abrir o detalhe do prato e confirmar a reserva.

## Peso da página

O JavaScript do carregamento inicial tem 125 KB compactado. O restante só chega quando é preciso:

- **Animações de layout do Motion (34 KB).** Usam `LazyMotion` e são baixadas depois que a página aparece.
- **ScrollTrigger (18 KB).** Só é baixado no desktop, por quem não pediu movimento reduzido. No celular ele nunca é carregado.

## Fotos

As fotos são do [Unsplash](https://unsplash.com) e podem ser usadas livremente pela licença deles. Os créditos ficam no rodapé do site e em `src/data/fotos.ts`. O site busca as imagens direto do CDN do Unsplash, que já recorta, redimensiona e entrega cada uma no formato e no tamanho certos para a tela.

## Rodar

```bash
npm install
npm run dev
```

Feito com Vite, React e TypeScript.
