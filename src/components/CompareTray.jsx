import { AnimatePresence, motion } from "motion/react";
import { formatId, getSpriteUrl } from "../utils/pokemon";
import "../style/CompareTray.css";

// Barra fixa no rodapé com os (até 2) Pokémon escolhidos para comparação.
export default function CompareTray({ selected, onRemove, onClear, onCompare }) {
  return (
    // AnimatePresence: sem Pokémon escolhido a barra é removida, e o Motion
    // executa o "exit" antes de tirá-la do DOM.
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div
          className="compare-tray"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          // type: "spring" cria um movimento com mola em vez de duração fixa.
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <strong>⚔ Comparação</strong>

          <ul>
            {selected.map((p) => (
              <li key={p.id}>
                <img src={getSpriteUrl(p.id)} alt="" />
                <span>
                  {formatId(p.id)} {p.name}
                </span>
                <button type="button" onClick={() => onRemove(p.id)} aria-label={`Remover ${p.name}`}>
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="compare-tray__actions">
            <button type="button" className="btn btn--small" onClick={onClear}>
              Limpar
            </button>
            <button
              type="button"
              className="btn btn--small is-active"
              onClick={onCompare}
              disabled={selected.length < 2}
            >
              {selected.length < 2 ? "Escolha mais 1" : "Comparar"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
