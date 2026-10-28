import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import TypeBadge from "./TypeBadge";
import { STATS, formatId, getArtworkUrl, getTotalStats } from "../utils/pokemon";
import "../style/CompareModal.css";

// Modal que compara lado a lado dois Pokémon; o maior valor de cada linha fica destacado.
export default function CompareModal({ pokemons, onClose }) {
  const isOpen = pokemons.length === 2;
  const [a, b] = pokemons;

  // useEffect: fecha o modal ao apertar ESC (e remove o listener ao desmontar).
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Retorna a classe "win" para o lado com valor maior (empate: nenhum destaque).
  const winner = (x, y) => (x > y ? "win" : "");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="compare-modal"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="compare-modal__box"
            // Clique dentro da caixa não deve fechar o modal (só o fundo escuro fecha).
            onClick={(event) => event.stopPropagation()}
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Comparação de Pokémon"
          >
            <button type="button" className="compare-modal__close" onClick={onClose} aria-label="Fechar">
              ✕
            </button>

            <div className="compare-modal__heads">
              {[a, b].map((p) => (
                <div key={p.id} className="compare-modal__head">
                  <img src={getArtworkUrl(p.id)} alt={p.name} />
                  <small>{formatId(p.id)}</small>
                  <h3>{p.name}</h3>
                  <div>
                    {p.types.map((t) => (
                      <TypeBadge key={t.id} name={t.name} size="sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <ul className="compare-modal__rows">
              {STATS.map((stat) => (
                <li key={stat.key}>
                  <span className={winner(a.stats[stat.key], b.stats[stat.key])}>
                    {a.stats[stat.key]}
                  </span>
                  <em>{stat.label}</em>
                  <span className={winner(b.stats[stat.key], a.stats[stat.key])}>
                    {b.stats[stat.key]}
                  </span>
                </li>
              ))}
              <li className="total">
                <span className={winner(getTotalStats(a), getTotalStats(b))}>{getTotalStats(a)}</span>
                <em>Total</em>
                <span className={winner(getTotalStats(b), getTotalStats(a))}>{getTotalStats(b)}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
