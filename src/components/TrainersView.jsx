import { motion } from "motion/react";
import { formatId, getSpriteUrl } from "../utils/pokemon";
import "../style/TrainersView.css";

// Tela de treinadores: nome, insígnias e os Pokémon de cada um (relação por pokemonIds).
export default function TrainersView({ trainers, pokemon, onSelectPokemon }) {
  return (
    <section className="trainers">
      <h2 className="trainers__title">Treinadores</h2>
      <div className="trainers__grid">
        {trainers.map((trainer, index) => {
          // Converte a lista de IDs em objetos Pokémon completos.
          const team = trainer.pokemonIds
            .map((id) => pokemon.find((p) => p.id === id))
            .filter(Boolean);

          return (
            <motion.article
              key={trainer.id}
              className="trainer-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <header>
                <h3>🧑‍🚀 {trainer.name}</h3>
                <span className="trainer-card__badges">🏅 {trainer.badges}</span>
              </header>

              <p className="trainer-card__count">
                {team.length} Pokémon
              </p>

              <ul className="trainer-card__team">
                {team.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => onSelectPokemon(p.id)}
                      title={`Ver ${p.name} na Pokédex`}
                    >
                      <img src={getSpriteUrl(p.id)} alt={p.name} loading="lazy" />
                      <span>{p.name}</span>
                      <small>{formatId(p.id)}</small>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
