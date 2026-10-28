import PokemonCard from "./PokemonCard";
import EmptyState from "./EmptyState";
import "../style/PokemonList.css";

// Grade de cards. Renderiza a lista com map() e trata o caso "nenhum resultado".
export default function PokemonList({
  pokemon,
  selectedId,
  favorites,
  onSelect,
  onToggleFavorite,
  onClearFilters,
}) {
  if (pokemon.length === 0) {
    return (
      <EmptyState
        title="Nenhum Pokémon encontrado"
        message="Tente outro nome, ID ou mude os filtros aplicados."
        actionLabel="Limpar filtros"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((item, index) => (
        <PokemonCard
          key={item.id}
          pokemon={item}
          index={index}
          isSelected={item.id === selectedId}
          isFavorite={favorites.includes(item.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
