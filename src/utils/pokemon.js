// Funções e constantes auxiliares sobre Pokémon (sem JSX, apenas lógica reutilizável).

// Ordem e rótulos dos atributos, usados para renderizar barras e comparações com map().
export const STATS = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "Atk" },
  { key: "defense", label: "Def" },
  { key: "specialAttack", label: "Sp.Atk" },
  { key: "specialDefense", label: "Sp.Def" },
  { key: "speed", label: "Speed" },
];

// Opções do seletor de ordenação.
export const SORT_OPTIONS = [
  { value: "id", label: "ID" },
  { value: "name", label: "Nome" },
  ...STATS.map((s) => ({ value: s.key, label: s.label })),
];

// 25 -> "0025"
export const formatId = (id) => String(id).padStart(4, "0");

// Sprites pixelados (leves) e arte oficial (grande) vindos do repositório da PokéAPI.
const SPRITES_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
export const getSpriteUrl = (id) => `${SPRITES_BASE}/${id}.png`;
export const getArtworkUrl = (id) =>
  `${SPRITES_BASE}/other/official-artwork/${id}.png`;

// Soma de todos os atributos base.
export const getTotalStats = (pokemon) =>
  Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0);

// Valor usado na ordenação (texto para "name", número para os demais).
export const getSortValue = (pokemon, sortBy) => {
  if (sortBy === "id") return pokemon.id;
  if (sortBy === "name") return pokemon.name.toLowerCase();
  return pokemon.stats[sortBy];
};
