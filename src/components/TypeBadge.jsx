import { TYPE_COLORS } from "../utils/typeColors";
import "../style/TypeBadge.css";

// Etiqueta colorida com o nome do tipo. Props: name (string) e size ("sm" | "md").
export default function TypeBadge({ name, size = "md" }) {
  return (
    <span
      className={`type-badge type-badge--${size}`}
      style={{ backgroundColor: TYPE_COLORS[name] }}
    >
      {name}
    </span>
  );
}
