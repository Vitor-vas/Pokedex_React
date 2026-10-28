import { motion } from "motion/react";
import "../style/EmptyState.css";

// Mensagem exibida quando nenhum Pokémon é encontrado (pesquisa/filtros sem resultado).
export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <motion.div
      className="empty-state"
      // initial/animate: entrada suave com fade (opacity) e leve subida (y).
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="empty-state__icon" aria-hidden="true">
        ◓
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {onAction && (
        <button type="button" className="btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
