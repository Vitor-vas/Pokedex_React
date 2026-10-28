# 🎮 Pokédex React + Vite

Pokédex interativa feita com **React + Vite** para a Atividade 03 (Pair Programming).
O visual segue o estilo clássico de Pokédex: moldura vermelha, painéis em tons de azul-turquesa e fonte pixelada.

## ✨ Funcionalidades

- 🐾 Lista com os 151 Pokémon (ID, nome, tipos, HP, Atk, Def, Sp.Atk, Sp.Def e Speed em cada card)
- 🔎 Pesquisa por **nome** ou **ID** em tempo real
- 🧬 Filtro por tipo (botões gerados a partir do `pokedex-data.json`)
- 📄 Painel de detalhes com barras de atributos animadas, total e treinadores que possuem o Pokémon
- 🧑‍🚀 Tela de **Treinadores** (nome, insígnias e time; clicar em um Pokémon abre ele na Pokédex)
- ⚠️ Tratamento de "nenhum Pokémon encontrado"
- ⭐ Favoritos (salvos no `localStorage`)
- ⚔️ Comparação entre dois Pokémon
- 📊 Ordenação por HP, Attack, Defense, Special Attack, Special Defense, Speed, Nome e ID
- 🎲 Pokémon aleatório
- 🌙 Dark mode (salvo no `localStorage`)
- 📱 Layout responsivo (desktop, tablet e smartphone)

## ▶️ Como executar

```bash
npm install
npm run dev
```

Abra no navegador: **http://localhost:5173**

> Requer Node.js 20.19+ ou 22.12+.

## 📦 Dependências adicionais

- [`motion`](https://motion.dev) — animações (`import { motion } from "motion/react"`)

## 📁 Dados

Os dados ficam em `src/data/pokedex-data.json` (Pokémon, tipos e treinadores) e são importados diretamente pelo `App.jsx`.

## 🖼️ Imagens (fonte externa)

As imagens dos Pokémon vêm do repositório público de sprites da **PokéAPI**:
`https://github.com/PokeAPI/sprites`

- Cards: `sprites/pokemon/{id}.png`
- Detalhes e comparação: `sprites/pokemon/other/official-artwork/{id}.png`

Os dados da aplicação continuam vindo apenas do `pokedex-data.json`. Sem internet, tudo funciona, apenas sem as imagens.

## 🧩 Organização do projeto

```text
src/
├── assets/image/          # imagens locais (opcional)
├── components/
│   ├── Header.jsx         # título, abas, contadores e tema
│   ├── SearchBar.jsx      # campo de pesquisa
│   ├── Filters.jsx        # tipo, ordenação, favoritos e aleatório
│   ├── PokemonList.jsx    # grade de cards (+ estado vazio)
│   ├── PokemonCard.jsx    # card de um Pokémon
│   ├── PokemonDetails.jsx # painel de detalhes
│   ├── StatBar.jsx        # barra de atributo
│   ├── TypeBadge.jsx      # etiqueta de tipo
│   ├── TrainersView.jsx   # tela de treinadores
│   ├── CompareTray.jsx    # barra de seleção para comparar
│   ├── CompareModal.jsx   # modal de comparação
│   └── EmptyState.jsx     # mensagem de "nada encontrado"
├── data/pokedex-data.json
├── hooks/useLocalStorage.js
├── style/                 # um CSS por componente + index.css (tema) e App.css (layout)
├── utils/                 # typeColors.js e pokemon.js (funções auxiliares)
├── App.jsx                # estados, filtros e composição dos componentes
└── main.jsx
```
