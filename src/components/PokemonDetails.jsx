import { AnimatePresence, motion } from "motion/react";
import TypeBadge from "./TypeBadge";
import StatBar from "./StatBar";
import EmptyState from "./EmptyState";
import {
  STATS,
  formatId,
  getArtworkUrl,
  getTotalStats,
} from "../utils/pokemon";
import { TYPE_COLORS } from "../utils/typeColors";
import "../style/PokemonDetails.css";

// Painel de detalhes (lado direito). Mostra o Pokémon selecionado com atributos em barras.
export default function PokemonDetails({
  pokemon,
  owners,
  isFavorite,
  isComparing,
  isOpen,
  onClose,
  onPrev,
  onNext,
  onToggleFavorite,
  onToggleCompare,
}) {
  return (
    <aside className={`details ${isOpen ? "is-open" : ""}`}>
      <button type="button" className="details__close" onClick={onClose}>
        ← Voltar à lista
      </button>

      {!pokemon ? (
        <EmptyState
          title="Selecione um Pokémon"
          message="Clique em um card para ver os detalhes."
        />
      ) : (
        // AnimatePresence + mode="wait": permite animar a SAÍDA de componentes
        // removidos da árvore. Com "wait", o conteúdo antigo sai por completo
        // antes de o novo entrar.
        <AnimatePresence mode="wait">
          <motion.div
            // key: ao mudar de Pokémon a key muda, o React desmonta o bloco
            // antigo e o AnimatePresence executa a animação "exit" nele.
            key={pokemon.id}
            className="details__content"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            <div className="details__title">
              <span className="details__id">{formatId(pokemon.id)}</span>
              <h2>{pokemon.name}</h2>
              <button
                type="button"
                className={`details__fav ${isFavorite ? "is-on" : ""}`}
                onClick={() => onToggleFavorite(pokemon.id)}
                aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                {isFavorite ? "★" : "☆"}
              </button>
            </div>

            <div
              className="details__hero"
              style={{ "--type-color": TYPE_COLORS[pokemon.types[0].name] }}
            >
              <div className="details__types">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type.id} name={type.name} />
                ))}
              </div>

              <button type="button" className="details__nav details__nav--prev" onClick={onPrev} aria-label="Pokémon anterior">
                ◀
              </button>
              <button type="button" className="details__nav details__nav--next" onClick={onNext} aria-label="Próximo Pokémon">
                ▶
              </button>

              <motion.img
                className="details__img"
                src={getArtworkUrl(pokemon.id)}
                alt={pokemon.name}
                // animate com array = keyframes: flutua para cima e volta, em loop.
                animate={{ y: [0, -8, 0] }}
                // repeat: Infinity repete a animação para sempre.
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                onError={(event) => (event.currentTarget.style.visibility = "hidden")}
              />
            </div>

            <div className="details__stats">
              <h3>Base Stats</h3>
              {STATS.map((stat) => (
                <StatBar key={stat.key} label={stat.label} value={pokemon.stats[stat.key]} />
              ))}
              <p className="details__total">Total: {getTotalStats(pokemon)}</p>
            </div>

            <div className="details__owners">
              <h3>Treinadores</h3>
              {owners.length === 0 ? (
                <p className="details__muted">Nenhum treinador possui este Pokémon.</p>
              ) : (
                <ul>
                  {owners.map((trainer) => (
                    <li key={trainer.id}>🧑‍🚀 {trainer.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              className={`btn details__compare ${isComparing ? "is-active" : ""}`}
              onClick={() => onToggleCompare(pokemon.id)}
            >
              {isComparing ? "✓ Na comparação (remover)" : "⚔ Adicionar à comparação"}
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </aside>
  );
}
