import { motion } from "motion/react";
import "../style/Header.css";

const TABS = [
  { id: "pokedex", label: "Pokédex" },
  { id: "trainers", label: "Treinadores" },
];

// Cabeçalho: título, navegação entre telas, contadores e botão de tema.
export default function Header({
  view,
  onChangeView,
  shownCount,
  totalCount,
  favoritesCount,
  theme,
  onToggleTheme,
}) {
  return (
    <header className="header">
      <h1 className="header__title">
        <span className="header__ball" aria-hidden="true" />
        Pokédex
      </h1>

      <nav className="header__tabs" aria-label="Navegação principal">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`header__tab ${view === tab.id ? "is-active" : ""}`}
            onClick={() => onChangeView(tab.id)}
          >
            {tab.label}
            {view === tab.id && (
              // layoutId: o Motion reconhece dois elementos com o mesmo layoutId
              // e anima a posição/tamanho entre eles. Aqui o sublinhado "desliza"
              // de uma aba para a outra em vez de aparecer de repente.
              <motion.span
                layoutId="tab-underline"
                className="header__underline"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="header__info">
        <span title="Pokémon exibidos / total">
          ◓ {shownCount}/{totalCount}
        </span>
        <span title="Favoritos">★ {favoritesCount}</span>
        <motion.button
          type="button"
          className="header__theme"
          onClick={onToggleTheme}
          // whileTap: animação enquanto o botão está pressionado.
          // whileHover: animação enquanto o mouse está sobre o botão.
          whileTap={{ scale: 0.85, rotate: 20 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Alternar tema claro/escuro"
          title="Alternar tema"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.button>
      </div>
    </header>
  );
}
