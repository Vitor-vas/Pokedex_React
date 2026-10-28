import { motion } from "motion/react";
import "../style/StatBar.css";

// Maior valor possível de um atributo base na Pokédex (usado para calcular a % da barra).
const MAX_STAT = 255;

// Linha com rótulo, valor e barra de progresso de um atributo.
export default function StatBar({ label, value }) {
  const percent = Math.min(100, (value / MAX_STAT) * 100);

  return (
    <div className="stat-bar">
      <span className="stat-bar__label">{label}</span>
      <span className="stat-bar__value">{value}</span>
      <div className="stat-bar__track">
        {/*
          motion.div: versão animável de <div>.
          - initial: estado de partida (largura 0).
          - animate: estado final; o Motion anima sozinho de um para o outro.
            Como o componente não é remontado ao trocar de Pokémon, a barra
            anima do valor antigo para o novo.
          - transition: duração e curva (easing) da animação.
        */}
        <motion.div
          className="stat-bar__fill"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
