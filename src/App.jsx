import { useEffect, useMemo, useState } from "react";
// MotionConfig: define configurações globais do Motion para todos os filhos.
import { MotionConfig } from "motion/react";

import data from "./data/pokedex-data.json";
import useLocalStorage from "./hooks/useLocalStorage";
import { getSortValue } from "./utils/pokemon";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import TrainersView from "./components/TrainersView";
import CompareTray from "./components/CompareTray";
import CompareModal from "./components/CompareModal";
import "./style/App.css";

// Dados lidos uma única vez, fora do componente (não mudam entre renderizações).
const { pokemon: allPokemon, trainers, types } = data;
// Só os tipos que realmente aparecem em algum Pokémon (descarta "Typeless", por exemplo).
const availableTypes = types.filter((type) =>
  allPokemon.some((p) => p.types.some((t) => t.id === type.id))
);

export default function App() {
  // ---------- Estados ----------
  const [view, setView] = useState("pokedex"); // "pokedex" | "trainers"
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false); // usado só no layout mobile
  const [compareIds, setCompareIds] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  // Estados persistidos no localStorage (sobrevivem ao recarregar a página).
  const [favorites, setFavorites] = useLocalStorage("pokedex-favorites", []);
  const [theme, setTheme] = useLocalStorage("pokedex-theme", "light");

  // Aplica o tema no <html> para o CSS trocar as variáveis de cor.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // ---------- Estado derivado: lista filtrada e ordenada ----------
  // useMemo só recalcula quando uma dependência muda (evita refazer o filtro à toa).
  const visiblePokemon = useMemo(() => {
    const query = search.trim().toLowerCase().replace("#", "");
    const isNumeric = /^\d+$/.test(query);

    const filtered = allPokemon.filter((p) => {
      const matchesSearch =
        query === "" ||
        (isNumeric
          ? String(p.id).startsWith(String(Number(query)))
          : p.name.toLowerCase().includes(query));
      const matchesType =
        selectedType === "all" || p.types.some((t) => t.name === selectedType);
      const matchesFavorite = !favoritesOnly || favorites.includes(p.id);
      return matchesSearch && matchesType && matchesFavorite;
    });

    // sort() altera o array, por isso ordenamos a cópia gerada pelo filter().
    return filtered.sort((x, y) => {
      const vx = getSortValue(x, sortBy);
      const vy = getSortValue(y, sortBy);
      const result = typeof vx === "string" ? vx.localeCompare(vy) : vx - vy;
      return sortOrder === "asc" ? result : -result;
    });
  }, [search, selectedType, favoritesOnly, favorites, sortBy, sortOrder]);

  const selectedPokemon = allPokemon.find((p) => p.id === selectedId);
  const owners = trainers.filter((t) => t.pokemonIds.includes(selectedId));
  const comparePokemon = compareIds.map((id) => allPokemon.find((p) => p.id === id));

  // ---------- Eventos ----------
  const handleSelect = (id) => {
    setSelectedId(id);
    setDetailsOpen(true);
  };

  const handleToggleFavorite = (id) =>
    setFavorites((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
    );

  // Mantém no máximo 2 Pokémon: ao adicionar um terceiro, o mais antigo sai.
  const handleToggleCompare = (id) =>
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((c) => c !== id);
      return [...current, id].slice(-2);
    });

  const handleRandom = () => {
    const random = visiblePokemon[Math.floor(Math.random() * visiblePokemon.length)];
    handleSelect(random.id);
  };

  // Navega para o anterior/próximo dentro da lista atualmente exibida (circular).
  const handleStep = (offset) => {
    if (visiblePokemon.length === 0) return;
    const index = visiblePokemon.findIndex((p) => p.id === selectedId);
    const next = (index + offset + visiblePokemon.length) % visiblePokemon.length;
    setSelectedId(visiblePokemon[index === -1 ? 0 : next].id);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedType("all");
    setFavoritesOnly(false);
  };

  // Vem da tela de treinadores: abre o Pokémon na Pokédex (limpando filtros que o escondam).
  const handleSelectFromTrainer = (id) => {
    handleClearFilters();
    setView("pokedex");
    handleSelect(id);
  };

  return (
    // reducedMotion="user": respeita a configuração "reduzir movimento" do sistema
    // operacional (acessibilidade), desligando animações de movimento automaticamente.
    <MotionConfig reducedMotion="user">
      <div className="app">
        <div className="app__frame">
          <div className="app__screen">
            <Header
              view={view}
              onChangeView={setView}
              shownCount={visiblePokemon.length}
              totalCount={allPokemon.length}
              favoritesCount={favorites.length}
              theme={theme}
              onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
            />

            {view === "pokedex" ? (
              <main className="layout">
                <section className="panel panel--list">
                  <SearchBar value={search} onChange={setSearch} />
                  <Filters
                    types={availableTypes}
                    selectedType={selectedType}
                    onSelectType={setSelectedType}
                    sortBy={sortBy}
                    onChangeSort={setSortBy}
                    sortOrder={sortOrder}
                    onToggleOrder={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    favoritesOnly={favoritesOnly}
                    onToggleFavoritesOnly={() => setFavoritesOnly(!favoritesOnly)}
                    onRandom={handleRandom}
                    canRandom={visiblePokemon.length > 0}
                  />
                  <div className="panel__scroll">
                    <PokemonList
                      pokemon={visiblePokemon}
                      selectedId={selectedId}
                      favorites={favorites}
                      onSelect={handleSelect}
                      onToggleFavorite={handleToggleFavorite}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                </section>

                <PokemonDetails
                  pokemon={selectedPokemon}
                  owners={owners}
                  isFavorite={favorites.includes(selectedId)}
                  isComparing={compareIds.includes(selectedId)}
                  isOpen={detailsOpen}
                  onClose={() => setDetailsOpen(false)}
                  onPrev={() => handleStep(-1)}
                  onNext={() => handleStep(1)}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleCompare={handleToggleCompare}
                />
              </main>
            ) : (
              <TrainersView
                trainers={trainers}
                pokemon={allPokemon}
                onSelectPokemon={handleSelectFromTrainer}
              />
            )}
          </div>
        </div>

        <CompareTray
          selected={comparePokemon}
          onRemove={handleToggleCompare}
          onClear={() => setCompareIds([])}
          onCompare={() => setShowCompare(true)}
        />
        <CompareModal
          pokemons={showCompare ? comparePokemon : []}
          onClose={() => setShowCompare(false)}
        />
      </div>
    </MotionConfig>
  );
}
