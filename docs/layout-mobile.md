# Layout mobile-first

Este documento explica as decisões de layout do blog. O código não tem comentários; o "por quê" de
cada propriedade está aqui.

## Breakpoints

Media queries não aceitam `var()`, por isso os valores aparecem literais e repetidos nos arquivos.

| Query | Função |
|---|---|
| base (sem query) | Mobile. A página rola normalmente e o gutter lateral é de `1rem`. |
| `(min-width: 48em)` | Arranjo horizontal: caderno ao lado da foto, `main` com `10rem` de padding lateral, balões do `InfoBalloon` com placement. |
| `(min-width: 48em) and (min-height: 50em)` | Modelo "uma tela": `html`/`body` com altura fixa e rolagem interna em `.sobre` e `main`. É o comportamento original do desktop. |

As queries usam `em` em vez de `px` porque `em` acompanha o zoom de texto do usuário (no Safari, `px`
não acompanha). Com fonte padrão, `48em` = 768px e `50em` = 800px.

Exemplos: 1920×1080 e 1536×864 usam o modelo "uma tela". 1366×768 e 1280×720 rolam a página (no modelo
antigo, a janela de leitura teria ~188px). Celulares em paisagem (ex.: 844×390) têm o arranjo horizontal,
mas rolam a página.

## Variável `--gutter`

`--gutter` é o respiro lateral único do mobile. É usado em `section`, `.container-info`, `main` e
`main > ul`, o que mantém o alinhamento consistente entre as páginas. A partir de `48em` vale `2rem`,
que é o padding que `section` já tinha no desktop.

## `src/styles/global.css`

### `html` / `body`
- `height: 100%` só existe no modelo "uma tela". Fora dele, o documento cresce com o conteúdo e a página
  rola. No celular isso faz a barra do navegador recolher e acaba com a rolagem aninhada.

### `.container-info`
- `padding: 0 var(--gutter) 1rem`: no mobile, o título e a foto não encostam na borda. O `1rem` inferior
  separa o cabeçalho do texto do Sobre.
- `padding-inline: 0` a partir de `48em` mantém o caderno exatamente a `10rem` da borda direita, como
  antes.
- `height: 100%` saiu: fazia parte do modelo antigo de alturas e não tem papel no novo.

### `.img-menu`
- Mobile: `flex-direction: column` + `align-items: center` + `gap: 1rem` empilha a foto e o caderno abaixo
  dela, centralizados.
- A partir de `48em`: `flex-direction: row`; `align-items: flex-start` alinha o caderno ao topo da foto;
  `gap: 0` evita que o gap da base empurre a foto para fora do centro.
- `::before` com `content: ""` e `flex: 1 1 0` é um espaçador simétrico ao `aside`. Com os dois
  crescendo da mesma base (`0`), a foto fica no centro exato, como fazia o antigo `left: 50%` +
  `translateX(-50%)`, mas sem `absolute`.

### `#pixel-di`
- `width: 100%` + `max-width: 20rem` substituem `position: absolute; left: 50%; transform` e `width: 20rem`.
  A foto entra no fluxo, então o texto não passa mais por cima dela, o que acontecia também em
  1366×768. No mobile ela encolhe para caber na tela.

### `aside` e `#blog`
- `aside { flex: 1 1 0 }` a partir de `48em`: mesma base do `::before`, o que garante a simetria.
- `#blog { margin: 0 10rem 0 auto }` a partir de `48em`: `auto` à esquerda empurra o caderno para a
  direita, e `10rem` reproduz o antigo `right: 10rem`. A distância vai como **margem do link**, e não
  como padding do `aside`, porque o padding fica fora do `flex-basis: 0`, quebrava a simetria e
  deslocava a foto em 80px (medido).

### `h1` da home
- `text-align: center`: quando o título quebra em duas linhas (celular), as duas ficam centralizadas. Em
  uma linha não muda nada.

### `.sobre`
- `flex: 1` + `overflow: auto` só no modelo "uma tela": ocupa o espaço entre o cabeçalho e o footer, com
  rolagem interna. Substitui o `height: 82%`.
- `min-height: 0` **não** é necessário. Com `overflow` diferente de `visible`, o mínimo automático do flex
  já é 0 (verificado).

## `src/layouts/layout-styles.css`

### `body` das páginas de Escritos
- `min-height: 100vh` seguido de `min-height: 100dvh`: o escurecimento (`backdrop-filter` do `.blog-body`)
  cobre a tela visível mesmo quando há pouco conteúdo (ex.: a lista). O `vh` vem primeiro como fallback
  para navegadores sem `dvh`; quem entende `dvh` usa a segunda declaração.
- No modelo "uma tela": `min-height: 0` + `height: 95vh`. Sem zerar o `min-height`, os `100dvh` venceriam
  os `95vh` e o desktop mudaria.

### `main`
- `padding: 0 var(--gutter) 2rem`: gutter do mobile. Os `2rem` inferiores evitam que a última linha cole
  na borda quando a página rola.
- `padding-inline: 10rem` a partir de `48em`, como antes.
- `padding-block-end: 0`, `height: 100%` e `overflow-y: auto` só no modelo "uma tela", como antes.
- `> h1 { text-align: center }`: centraliza títulos que quebram em várias linhas.
- `> p { font-family: 'Jersey 15', sans-serif }`: o nome antigo, `'Jersey'`, não existia (a fonte
  carregada é "Jersey 15"), então os posts apareciam em Times. Atenção: a Jersey 15 é uma fonte pixel
  com x-height baixo; em `1.2rem` o texto fica menor e mais denso no desktop.

### `main > ul`
- Os `<li>` de Escritos agora ficam dentro de um `<ul>` (antes estavam soltos no `<main>`, o que é HTML
  inválido).
- `display: flex` + `flex-direction: column` + `gap: 1rem` reproduzem o espaçamento que os `<li>` tinham
  quando eram itens diretos do `main`.
- `margin: 0` zera a margem padrão do `<ul>`.
- `padding: 0 0 0 var(--gutter)` no mobile abre espaço para o marcador `outside` (~12px), que senão
  ficaria colado na borda. A partir de `48em`, `padding: 0`: o marcador volta a ficar pendurado no padding
  de `10rem` do `main`, como antes.

### Títulos animados (`.type-fade-right`)
- O script de `escritos.astro` agrupa as letras por palavra: `span.palavra > span.letra`. O espaço entre
  palavras é um `span.letra` com `padding: .2rem`, como antes, e o `--i` continua global, então a
  animação letra a letra não muda.
- `flex-wrap: wrap` deixa o título quebrar **entre palavras**. Sem isso, um título maior que a tela
  estourava (testado: 549px numa tela de 360px).
- `.palavra { display: flex }`: as letras precisam ser itens de flex para o `transform` da animação valer
  (`transform` não se aplica a elementos inline). Como `.palavra` é item de um flex, ela é "blockified";
  `inline-flex` viraria `flex` de qualquer forma. Com `block`, o deslize de −0.35em sumia (medido).
- O seletor da animação passou de `.type-fade-right span` para `.type-fade-right .letra`, porque agora
  há spans de palavra que não podem animar.

## `src/components/InfoBalloon.svelte`

- No mobile, `.info-balloon` não tem `position: relative`. Sem ancestral posicionado, o `.tooltip`
  (`absolute`) usa `left`/`right: var(--gutter)` em relação ao `body` e ocupa a largura útil da tela,
  sem vazar pelas bordas (antes vazava até −41px). Na vertical, sem `top`/`bottom`, ele fica na
  **posição estática** (a linha da palavra), e `transform: translateY(-100%)` o coloca acima dela.
- No mobile não há seta, porque ela apontaria para o centro da tela e não para a palavra. As regras da
  seta e de `.top/.bottom/.left/.right` ficam dentro de `@media (min-width: 48em)`.
- A partir de `48em`: `position: relative` volta, e o `.tooltip` recebe `left: auto; right: auto;
  transform: none` antes das classes de placement, que funcionam exatamente como antes. O reset é
  necessário porque `.left` só define `right` e `.right` só define `left`.
- `left`/`right` explícitos em vez de `inset-inline`: o build não converte `inset-inline` com `var()`, e o
  Safari 14.0 não reconhece a propriedade.

## `<head>` (`index.astro` e `EscritosLayout.astro`)

- `initial-scale=1` no viewport evita o zoom inicial errado do iOS ao girar a tela.
- Um único `<link>` do Google Fonts (`css2?family=…&family=…`) no lugar de 4–5: menos requisições
  bloqueantes na rede móvel. A Montserrat continua só no `EscritosLayout`, na sintaxe `css2`.

## `astro.config.mjs`: `vite.build.cssTarget`

O CSS usa nesting nativo, que antes ia para produção sem conversão. iOS < 16.5 e Chrome < 112 descartam
esses blocos inteiros. iOS < 18 também ignora `backdrop-filter` sem o prefixo `-webkit-`.

Com `cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14']`, o build:
- achata o nesting e os `@media` aninhados;
- gera `-webkit-backdrop-filter`.

O dev continua servindo o CSS como está escrito. O CSS do site continua todo inline no `<head>`.
Limite real: `gap` em flex exige iOS 14.5 / Chrome 84, e isso o build não consegue compensar.

## Verificação

- Prints antes/depois em 10 viewports (320×568 a 1920×1080, incluindo paisagem) × 5 páginas: nenhum
  overflow horizontal.
- Desktop "uma tela": título, foto, caderno, footer, `h1`, `main` e `li` com caixas idênticas às
  originais.
- Ablação: cada declaração de `global.css` e `layout-styles.css` foi removida, uma por vez, medindo
  geometria e pixels em 7 viewports × 5 páginas. Toda declaração nova tem efeito medido.
- O build de produção é idêntico ao dev (0 diferenças de caixa).

## Pendências conhecidas

- Código morto já existente (mantido por decisão): `html { margin; width }`, `#blog { position; display }`
  (já vêm de `a.tooltip`), `footer { align-items }`, `footer > a { text-decoration }`,
  `.type-fade-right { gap: 0 }`, `main li > a { font-family }` (herdada de `.blog-body`). Classes sem uso:
  `.not-ready`, `.fade-in-left-normal`, `.type-fade`. Em `InfoBalloon`, as regras `::before` nunca
  renderizam (não têm `content`).
- `Poema.svelte` usa `Baskerville`, que não é carregada; cai na serif padrão do sistema.
- InfoBalloon no iOS: o Safari só aplica `:hover` ao toque em elementos "clicáveis". Precisa ser
  confirmado num iPhone (no Android funciona).
- Easter eggs no toque: o link do Sartre navega antes de mostrar a imagem no Android. O Drumkit
  expandido vaza à direita em telas < 390px. O `#drumkit` está alinhado a uma estrela do fundo pela
  posição em `rem`; mudar o `font-size` raiz ou o `background` do `body` o desalinha.
- Imagens pesadas: `pixeldi.png` (1.7 MB, exibida com 320px) e `DeepSpaceNein.png` (1.4 MB, exibida
  com 80px). O `<Image>` do Astro resolveria.
