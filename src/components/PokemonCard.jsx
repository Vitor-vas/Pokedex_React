import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import TypeBadge from "./TypeBadge";
import { STATS, formatId, getSpriteUrl } from "../utils/pokemon";
import "../style/PokemonCard.css";

// Card de um Pokémon na lista: ID, sprite, nome, tipos e os 6 atributos.
export default function PokemonCard({
  pokemon,
  index,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) {
  const cardRef = useRef(null);

  // Quando este card passa a ser o selecionado (ex.: botão "Aleatório"),
  // rola a lista até ele para que fique visível.
  useEffect(() => {
    if (isSelected) {
      cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [isSelected]);

  return (
    <motion.article
      ref={cardRef}
      className={`pokemon-card ${isSelected ? "is-selected" : ""}`}
      // initial -> animate: o card nasce transparente/menor e cresce até o normal.
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      // transition.delay: atraso proporcional ao índice cria um efeito "cascata".
      // Math.min limita o atraso para listas grandes não demorarem a aparecer.
      transition={{ duration: 0.25, delay: Math.min(index, 20) * 0.02 }}
      // whileHover / whileTap: reações ao mouse e ao clique, sem usar estado.
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(pokemon.id)}
      onKeyDown={(event) => event.key === "Enter" && onSelect(pokemon.id)}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes de ${pokemon.name}`}
    >
      <div className="pokemon-card__top">
        <span className="pokemon-card__id">{formatId(pokemon.id)}</span>
        <button
          type="button"
          className={`pokemon-card__fav ${isFavorite ? "is-on" : ""}`}
          onClick={(event) => {
            // stopPropagation: evita que o clique na estrela também selecione o card.
            event.stopPropagation();
            onToggleFavorite(pokemon.id);
          }}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <img
        className="pokemon-card__img"
        src={getSpriteUrl(pokemon.id)}
        alt={pokemon.name}
        loading="lazy"
        // onError: se a imagem externa falhar (sem internet), esconde o ícone quebrado.
        onError={(event) => (event.currentTarget.style.visibility = "hidden")}
      />

      <h3 className="pokemon-card__name">{pokemon.name}</h3>

      <div className="pokemon-card__types">
        {pokemon.types.map((type) => (
          <TypeBadge key={type.id} name={type.name} size="sm" />
        ))}
      </div>

      <dl className="pokemon-card__stats">
        {STATS.map((stat) => (
          <div key={stat.key}>
            <dt>{stat.label}</dt>
            <dd>{pokemon.stats[stat.key]}</dd>
          </div>
        ))}
      </dl>
    </motion.article>
  );
}
