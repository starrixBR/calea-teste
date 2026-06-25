# Manual de Manutenção — Site CALEA
**Centro Acadêmico de Línguas Estrangeiras Aplicadas ao Multilinguismo e à Sociedade da Informação — UnB**

---

## Índice

1. [Visão geral do projeto](#1-visão-geral-do-projeto)
2. [Estrutura de arquivos](#2-estrutura-de-arquivos)
3. [Estrutura HTML comum a todas as páginas](#3-estrutura-html-comum-a-todas-as-páginas)
4. [Onde alterar textos e links — por página](#4-onde-alterar-textos-e-links--por-página)
5. [Estrutura do CSS (style.css)](#5-estrutura-do-css-stylecss)
6. [Estrutura do JavaScript (main.js)](#6-estrutura-do-javascript-mainjs)
7. [Tarefas de manutenção frequentes](#7-tarefas-de-manutenção-frequentes)
8. [Boas práticas e avisos importantes](#8-boas-práticas-e-avisos-importantes)

---

## 1. Visão geral do projeto

O site do CALEA é construído em **HTML, CSS e JavaScript**, sem frameworks ou bibliotecas externas além do Font Awesome (ícones). Está hospedado no **GitHub Pages** e toda edição é feita diretamente nos arquivos `.html`, no `style.css` e no `main.js`.

O site tem **seis páginas**, todas compartilhando um único arquivo de estilos (`style.css`) e um único arquivo de scripts (`main.js`). Isso significa que uma alteração no CSS ou no JS afeta o site inteiro — tome cuidado ao editar esses arquivos.

---

## 2. Estrutura de arquivos

```
/
├── index.html             → Página Inicial
├── sobre_o_curso.html     → Sobre o Curso
├── oportunidades.html     → Oportunidades
├── calea.html             → Centro Acadêmico
├── projetos_eventos.html  → Projetos e Eventos
├── comunidade.html        → Comunidade
├── style.css              → Estilos globais (todas as páginas)
├── main.js                → Scripts (menu, acessibilidade, modo escuro)
├── imagens/               → Imagens gerais (ícones, professores)
└── imagens_favicons/      → Ícones da aba do navegador (favicon)
```

Todo o **conteúdo editável** de cada página está dentro da tag `<main>`. O cabeçalho, o painel de acessibilidade, a barra de navegação e o rodapé são estruturas fixas repetidas em todos os arquivos.

---

## 3. Estrutura HTML comum a todas as páginas

Cada página `.html` segue esta ordem de blocos:

```
<body>
  → Link "Saltar para o conteúdo" (acessibilidade)
  → <header>      — Logo CALEA e botão de acessibilidade
  → Painel de acessibilidade (oculto por padrão)
  → <nav>         — Barra de navegação
  → <main>        — ★ CONTEÚDO EDITÁVEL DA PÁGINA ★
  → <section id="faq"> (apenas index.html e sobre_o_curso.html)
  → <footer>      — Rodapé
  → <script>      — Carrega o main.js
</body>
```

### 3.1 Cabeçalho (`<header>`)

```html
<header>
    <div class="header-top">
        <p class="site-title"><a href="index.html">CALEA</a></p>
        <button id="btn-acessibilidade" ...>...</button>
    </div>
    <div class="hero-tag">Centro Acadêmico de Línguas Estrangeiras...</div>
</header>
```

O cabeçalho é **idêntico em todas as páginas**. Para alterar o subtítulo que aparece abaixo do nome CALEA, edite o texto dentro de `<div class="hero-tag">` em **todos os seis arquivos HTML**.

### 3.2 Barra de navegação (`<nav>`)

```html
<nav>
    <a href="index.html">Página Inicial</a>
    <a href="sobre_o_curso.html">Sobre o Curso</a>
    <a href="oportunidades.html">Oportunidades</a>
    <a href="calea.html">Centro Acadêmico</a>
    <a href="projetos_eventos.html">Projetos e Eventos</a>
    <a href="comunidade.html">Comunidade</a>
</nav>
```

Em cada página, o link correspondente recebe a classe `class="ativo"`, que o destaca visualmente. Se uma nova página for criada, adicione o link em **todos os seis arquivos HTML** e acrescente a classe `ativo` apenas no arquivo da página nova.

### 3.3 Painel de acessibilidade

O painel (controle de fonte, modo escuro, modos para daltônicos) é um bloco HTML **copiado identicamente** em todos os arquivos. Ele é controlado pelo `main.js` e não precisa ser editado para atualizações de conteúdo. Só altere se precisar adicionar novas opções de acessibilidade.

### 3.4 Rodapé (`<footer>`)

```html
<footer>
    <p><strong>CALEA</strong> &mdash; Centro Acadêmico de Línguas Estrangeiras
    Aplicadas ao Multilinguismo e à Sociedade da Informação &mdash; UnB</p>
</footer>
```

Rodapé igual em todas as páginas. Para atualizar, altere em todos os seis arquivos.

---

## 4. Onde alterar textos e links — por página

### 4.1 `index.html` — Página Inicial

**Textos principais** — dentro de `<main>`:
- O parágrafo de boas-vindas abaixo de `<h1>Bem-vindos ao CALEA</h1>`
- Os textos de destaque dentro da seção `<h2>Destaques</h2>`

**Calendário acadêmico** — atualize a cada semestre:

```html
<!-- Semestre: altere o texto em negrito -->
<p class="sec-desc">
    Datas importantes do semestre <strong>2026.1</strong> para a graduação.
    <a href="URL_DO_PDF_DA_SAA" target="_blank">Ver calendário completo (PDF) ↗</a>
</p>

<!-- Quatro datas: altere o texto dentro de cada <span class="cal-periodo-data"> -->
<span class="cal-periodo-data">23 fev 2026</span>
```

São quatro blocos `<div class="cal-periodo">`: início do período letivo, início das aulas, fim das aulas e fim do período letivo. Altere o texto da data e o link do PDF a cada semestre.

**Dúvidas frequentes (FAQ)** — dentro de `<section id="faq">`:

```html
<details>
    <summary>Pergunta aqui</summary>
    <p>Resposta aqui.</p>
</details>
```

Cada `<details>` é uma pergunta/resposta. Para adicionar, copie um bloco completo. Para remover, apague o bloco inteiro.

---

### 4.2 `sobre_o_curso.html` — Sobre o Curso

**Textos principais** — dentro de `<main>`:
- Parágrafo de introdução abaixo de `<h1>`
- Texto explicativo dentro de `<h2>O QUE É O LEA?</h2>`
- Textos de "Objetivo da formação" e "Diferenciais do curso"

**Duração do curso** — altere os números se a duração mudar:

```html
<span class="duracao-num">4</span>  <!-- anos -->
<span class="duracao-num">8</span>  <!-- semestres -->
```

**Currículos** — cada currículo ativo é um `<a class="curriculo-card">`:

```html
<a class="curriculo-card curriculo-card--destaque"
   href="LINK_DO_SIGAA" target="_blank">
    <span class="curriculo-badge">Ativa</span>
    <div class="curriculo-codigo">4090/2</div>       <!-- código -->
    <div class="curriculo-ano">Criada em 2026...</div>
    <div class="curriculo-link">Ver no SIGAA →</div>
</a>
```

Para adicionar um novo currículo, copie o bloco `<a class="curriculo-card">` e ajuste o código, o ano e o link. Retire a classe `curriculo-card--destaque` dos currículos antigos (ela adiciona a borda verde de destaque).

**Fluxo semestral** — cada semestre é um `<div class="fluxo-sem">`:

```html
<div class="fluxo-sem">
    <div class="fluxo-sem-header">1º Semestre <span>330h</span></div>
    <ul>
        <li>Nome da Disciplina</li>
        <!-- um <li> por disciplina -->
    </ul>
</div>
```

Para atualizar disciplinas, edite o texto dentro de cada `<li>`. Para mudar a carga horária do semestre, edite o número dentro de `<span>`.

**Link do Projeto Pedagógico do Curso**:

```html
<a href="LINK_DO_PDF" target="_blank" ...>Acessar o Projeto Pedagógico do Curso (PDF ⬇️)</a>
```

**FAQ** — mesma estrutura de `<details>` explicada em `index.html`.

---

### 4.3 `oportunidades.html` — Oportunidades

Página com estrutura simples. Todo o conteúdo é texto dentro de `<main>`, organizado em seções com `<h2>`:

- Estágios
- Bolsas
- Editais
- Projetos de pesquisa
- Grupos de pesquisa
- Intercâmbios
- Voluntariado

Para adicionar links ou informações em cada seção, basta editar o parágrafo `<p>` correspondente ou adicionar novos parágrafos e listas abaixo do `<h2>`.

---

### 4.4 `calea.html` — Centro Acadêmico

**Gestão atual** — cada membro é um `<div class="membro-card">` dentro de `<div class="gestao-grid">`:

```html
<div class="membro-card">
    <div class="avatar" style="margin:0 auto .75rem;">PR</div>  <!-- iniciais -->
    <p class="membro-nome">Nome Sobrenome</p>
    <span class="cargo">Presidência</span><br>
    <span class="cargo">
        <a href="https://lattes.cnpq.br/NUMERO" target="_blank" class="lattes-link">
            Lattes↗
        </a>
    </span>
</div>
```

Para atualizar um membro: altere as iniciais no `.avatar`, o nome no `<p class="membro-nome">`, o cargo no `<span class="cargo">` e o link do Lattes no `href`. Para adicionar ou remover membros, copie ou apague um bloco `<div class="membro-card">` completo.

**Gestões passadas** — link para PDF:

```html
<a href="LINK_DO_PDF" target="_blank" class="btn-pdf">
    📄 Baixar PDF das gestões passadas
</a>
```

Substitua `LINK_DO_PDF` pelo link real do documento (Google Drive, por exemplo).

**Estatuto** — link já preenchido, mas atualize se o documento mudar:

```html
<a href="https://drive.google.com/..." target="_blank" class="btn-pdf">
    📄 Estatuto do CALEA
</a>
```

**Contato — telefone** e **Instagram** — localize os respectivos `<p>` e `<a>` dentro de `<h2>Contato</h2>` e edite diretamente.

**Endereço físico** — parágrafo dentro de `<h2>Onde fica o CALEA?</h2>`.

---

### 4.5 `projetos_eventos.html` — Projetos e Eventos

Página com conteúdo de preenchimento livre. Estrutura de `<h2>` e `<h3>`:

- `<h2>Projetos do CA</h2>`
- `<h2>Eventos futuros</h2>`
- `<h2>Eventos passados</h2>`
- `<h2>Parcerias</h2>` → `<h3>Parcerias institucionais</h3>`

Adicione conteúdo dentro de `<main>` seguindo a hierarquia de títulos existente.

---

### 4.6 `comunidade.html` — Comunidade

Esta é a página mais complexa. Ela contém a grade de professores, os modais de perfil e a rede de LEAs.

#### Professores — card na grade

Cada card na grade é um `<div role="listitem">` com um `<a>` dentro:

```html
<div role="listitem">
    <a href="#modal-XX" class="membro-card" style="text-decoration:none; color:inherit;">
        <img src="imagens/professores/NomeArquivo.png" alt="Nome Completo" class="avatar-foto">
        <p class="membro-nome">Nome Completo do Professor</p>
        <span class="cargo">Ver perfil completo →</span>
    </a>
</div>
```

O `href="#modal-XX"` deve ser **idêntico** ao `id` do modal correspondente.

#### Professores — modal de perfil

Cada modal é um `<div id="modal-XX" class="prof-overlay">`:

```html
<div id="modal-XX" class="prof-overlay">
    <div class="prof-modal">
        <a href="#" class="btn-fechar">✕</a>
        <div class="modal-header">
            <img src="imagens/professores/Foto.png" alt="Nome" class="avatar-foto-lg">
            <!-- OU, se não houver foto: -->
            <div class="avatar" style="width:56px; height:56px; font-size:1rem; flex-shrink:0;">XX</div>
            <div>
                <h3 class="modal-nome">Nome Completo</h3>
                <span class="modal-cargo">Cargo — LEA-MSI / UnB</span>
            </div>
        </div>
        <div class="modal-bio">
            <p>Biografia aqui.</p>
        </div>
        <div class="modal-links">
            <a href="https://lattes.cnpq.br/NUMERO" target="_blank" class="btn-lattes">Lattes ↗</a>
            <a href="mailto:email@unb.br" class="btn-email">email@unb.br</a>
        </div>
    </div>
</div>
```

**Regra fundamental:** o `id` do modal (`id="modal-XX"`) e o `href` do card (`href="#modal-XX"`) precisam ser exatamente iguais. Se não forem, o clique no card não abrirá o modal correto.

Para **adicionar um professor**: copie o par card + modal de um professor existente, escolha um novo `id` e atualize todos os dados.

Para **editar a biografia**: localize o `<div class="modal-bio">` dentro do modal correto e edite o texto nos parágrafos `<p>`.

Para **adicionar a foto** de um professor que ainda usa iniciais, substitua a `<div class="avatar">` no modal por:

```html
<img src="imagens/professores/NomeDoArquivo.png" alt="Nome Completo" class="avatar-foto-lg">
```

Salve a imagem em `imagens/professores/` com o mesmo nome usado no `src`.

#### Gestão do site

Bloco simples com cards de membros no mesmo formato dos membros do CA. Edite nome, iniciais e link do Lattes diretamente.

#### Rede de LEAs

Cada instituição é um `<article class="lea-item">`:

```html
<article class="lea-item">
    <h3>Nome do Curso</h3>
    <p class="lea-institution">Nome da Universidade (sigla)</p>
    <p class="social-links">
        <a href="https://www.instagram.com/PERFIL/" target="_blank" class="btn-social">
            <i class="fab fa-instagram"></i>
            Instagram
        </a>
    </p>
</article>
```

Para adicionar uma nova instituição, copie o bloco `<article>` completo e ajuste os dados.

---

## 5. Estrutura do CSS (`style.css`)

O arquivo está organizado em blocos comentados com `/* ═══ NOME ═══ */`. A ordem é:

| Bloco | O que controla |
|---|---|
| `:root { }` | Variáveis de cor e sombra usadas em todo o site |
| Reset & Base | Normalização de estilos entre navegadores |
| Tipografia geral | `h1`, `h2`, `h3`, `p`, `a` |
| Header | Cabeçalho e subtítulo |
| Navegação | Barra de nav, link ativo, menu mobile |
| Avatares | Círculos com iniciais |
| Cards de membros | Grade e card individual |
| Botões Social / PDF | Botões de Instagram, PDF etc. |
| FAQ | Acordeão de perguntas |
| Duração do curso | Blocos numéricos de anos/semestres |
| Estrutura curricular | Cards de currículo e grade de semestres |
| Calendário acadêmico | Cards de datas do semestre |
| Modais de professores | Sobreposição e janela de perfil |
| Rede de LEAs | Cards das instituições parceiras |
| Footer | Rodapé |
| Acessibilidade | Painel, botões de fonte, modos de cor |
| Modo escuro | Variáveis e cores do `body.dark-mode` |
| Responsivo | Ajustes para telas pequenas |

### Variáveis de cor (`:root`)

As cores do site são definidas como variáveis CSS no início do arquivo. Altere aqui para mudar a identidade visual do site inteiro:

```css
:root {
    --verde: #1D9E75;           /* verde principal (botões, ícones) */
    --verde-escuro: #085041;    /* verde escuro (títulos, nav, footer) */
    --verde-claro: #E1F5EE;     /* verde claro (fundos, badges) */
    --verde-medio: #5DCAA5;     /* verde médio (bordas, hover) */
    --cinza-bg: #f4f5f2;        /* fundo geral da página */
    --cinza-borda: #dde0da;     /* bordas de cards */
    --texto: #1a1a18;           /* cor do texto principal */
    --texto-muted: #6f6d69;     /* cor do texto secundário */
    --branco: #ffffff;
}
```

**Atenção:** alguns elementos do `comunidade.html` (modais, rede de LEAs) usam cores hexadecimais fixas (`#085041`, `#1D9E75`, `#E1F5EE`) em vez das variáveis. Se precisar mudar a paleta de cores, esses valores precisam ser atualizados separadamente no CSS.

---

## 6. Estrutura do JavaScript (`main.js`)

O arquivo está dividido em três partes:

### Parte 1 — Menu hamburguer responsivo

Ativado automaticamente em telas menores (mobile). Cria o botão de menu, agrupa os links da nav em uma `<div>` e gerencia abertura/fechamento por clique, tecla Escape e clique fora do menu. **Não requer configuração.**

### Parte 2 — Acessibilidade

Gerencia o painel de acessibilidade:

- **Abertura/fechamento do painel** — botão de acessibilidade no cabeçalho e botão de fechar
- **Controle de tamanho de fonte** — botões A+ / A− / Padrão, com limite entre 80% e 150%; preferência salva no `localStorage`
- **Modos de cor para daltônicos** — protanopia, deuteranopia e tritanopia via filtros SVG injetados no `<body>`; preferência salva no `localStorage`
- **Anúncios para leitores de tela** — função `announceMessage()` cria uma `<div aria-live>` para comunicar mudanças de estado

### Parte 3 — Modo escuro

Adiciona/remove a classe `dark-mode` no `<body>`, atualiza o texto do botão entre "Modo Escuro" e "Modo Claro", e salva a preferência no `localStorage` para ser restaurada ao recarregar a página.

**Importante:** o modo escuro recolore elementos via CSS (variáveis em `body.dark-mode { }`). Novos componentes adicionados ao site precisam ser verificados para garantir contraste adequado no modo escuro.

---

## 7. Tarefas de manutenção frequentes

### Atualizar o calendário acadêmico (a cada semestre)

Em `index.html`:
1. Altere o semestre no texto `<strong>2026.1</strong>`
2. Atualize o link do PDF da SAA no `href` do `<a>`
3. Altere as quatro datas nos `<span class="cal-periodo-data">`

### Atualizar a gestão do CA

Em `calea.html`:
1. Localize `<div class="gestao-grid">` dentro de `<h2>Gestão atual</h2>`
2. Para cada membro, edite iniciais, nome, cargo e link do Lattes
3. Adicione ou remova blocos `<div class="membro-card">` conforme necessário

### Adicionar um professor em `comunidade.html`

1. Copie um par card + modal existente
2. Escolha um `id` curto para o modal (ex.: `modal-jo` para "João Oliveira")
3. No card: atualize `href="#modal-jo"`, `alt`, `src` da foto e o nome
4. No modal: atualize `id="modal-jo"`, foto ou iniciais, nome, cargo, biografia, link do Lattes e e-mail
5. Insira o card na grade na posição alfabética correta

### Adicionar ou editar uma pergunta do FAQ

Em `index.html` ou `sobre_o_curso.html`, dentro de `<section id="faq">`:

```html
<!-- Adicionar: copie este bloco -->
<details>
    <summary>Pergunta nova aqui?</summary>
    <p>Resposta nova aqui.</p>
</details>
```

Para remover, apague o bloco `<details>...</details>` completo.

### Adicionar uma nova página ao site

1. Copie qualquer arquivo `.html` existente como base
2. Atualize o `<title>` no `<head>`
3. Edite o conteúdo dentro de `<main>`
4. Adicione o link para a nova página na `<nav>` de **todos os seis arquivos HTML existentes**
5. Na nova página, marque o link dela com `class="ativo"` e remova essa classe dos demais

---

## 8. Boas práticas e avisos importantes

**Sempre edite dentro de `<main>`** para alterações de conteúdo. O cabeçalho, painel de acessibilidade, nav e footer raramente precisam ser tocados.

**Ao adicionar links externos**, use sempre `target="_blank"` para abrir em nova aba e, quando relevante, `rel="noopener noreferrer"` por segurança.

**IDs únicos:** todos os `id` no HTML devem ser únicos na página. Ao criar novos modais ou seções, escolha um `id` que ainda não exista.

**Hierarquia de títulos:** mantenha a ordem `<h1>` → `<h2>` → `<h3>` sem pular níveis. Cada página tem um único `<h1>`. Isso é importante tanto para acessibilidade quanto para SEO.

**Contraste de cores:** as cores do site foram ajustadas para atender ao padrão WCAG AA (proporção mínima de 4,5:1). Ao adicionar textos com cores novas, verifique o contraste com uma ferramenta como o [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

**Modo escuro:** está implementado via variáveis CSS (`body.dark-mode`). Componentes novos com cores fixas (hexadecimais no HTML ou CSS) podem não se adaptar corretamente. Prefira sempre usar as variáveis do `:root`.

**`localStorage`:** o site salva as preferências de fonte, modo de cor e modo escuro no navegador do usuário. Isso não afeta o servidor e não precisa de manutenção ativa.

**Font Awesome:** os ícones (Instagram etc.) dependem da CDN do Font Awesome, carregada no `<head>` de `calea.html` e `comunidade.html`. Se um ícone não aparecer, confirme que a tag `<link>` do Font Awesome está presente na página.

**Sincronização de arquivos:** alterações no cabeçalho, nav, painel de acessibilidade ou rodapé precisam ser replicadas **manualmente** nos seis arquivos HTML, pois não há sistema de componentes automático.

---

*Manual elaborado para uso interno da gestão do CALEA — UnB.*
