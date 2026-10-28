import { SORT_OPTIONS } from "../utils/pokemon";
import { TYPE_COLORS } from "../utils/typeColors";
import "../style/Filters.css";

// Barra de filtros: tipo (botões), ordenação, somente favoritos e Pokémon aleatório.
export default function Filters({
  types,
  selectedType,
  onSelectType,
  sortBy,
  onChangeSort,
  sortOrder,
  onToggleOrder,
  favoritesOnly,
  onToggleFavoritesOnly,
  onRandom,
  canRandom,
}) {
  return (
    <div className="filters">
      <div className="filters__types" role="group" aria-label="Filtrar por tipo">
        <button
          type="button"
          className={`chip ${selectedType === "all" ? "is-active" : ""}`}
          onClick={() => onSelectType("all")}
        >
          Todos
        </button>
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`chip ${selectedType === type.name ? "is-active" : ""}`}
            style={{ "--chip-color": TYPE_COLORS[type.name] }}
            onClick={() => onSelectType(type.name)}
          >
            {type.name}
          </button>
        ))}
      </div>

      <div className="filters__row">
        <label className="filters__sort">
          Ordenar por
          <select value={sortBy} onChange={(e) => onChangeSort(e.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="btn btn--small"
          onClick={onToggleOrder}
          title="Inverter ordem"
        >
          {sortOrder === "asc" ? "↑ Crescente" : "↓ Decrescente"}
        </button>

        <button
          type="button"
          className={`btn btn--small ${favoritesOnly ? "is-active" : ""}`}
          onClick={onToggleFavoritesOnly}
        >
          ★ Favoritos
        </button>

        <button
          type="button"
          className="btn btn--small"
          onClick={onRandom}
          disabled={!canRandom}
        >
          🎲 Aleatório
        </button>
      </div>
    </div>
  );
}
