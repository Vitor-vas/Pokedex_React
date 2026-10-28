import "../style/SearchBar.css";

// Campo de pesquisa controlado: o valor vem do estado do App (props) e cada tecla
// dispara onChange, atualizando a lista em tempo real.
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pesquisar Pokémon por nome ou ID..."
        aria-label="Pesquisar Pokémon por nome ou ID"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Limpar pesquisa"
        >
          ✕
        </button>
      )}
    </div>
  );
}
