import { useEffect, useState } from "react";

// Hook personalizado: funciona como useState, mas persiste o valor no localStorage.
export default function useLocalStorage(key, initialValue) {
  // Função inicializadora: roda só na primeira renderização e lê o valor salvo.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // useEffect: sempre que o valor mudar, grava de novo no localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* localStorage indisponível: ignora */
    }
  }, [key, value]);

  return [value, setValue];
}
