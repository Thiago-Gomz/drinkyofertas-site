"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  slug: string;
};

export default function FavoriteButton({
  slug,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const storedFavorites = localStorage.getItem("favorites");

      if (!storedFavorites) {
        return;
      }

      const parsedFavorites = JSON.parse(storedFavorites);

      if (
        Array.isArray(parsedFavorites) &&
        parsedFavorites.includes(slug)
      ) {
        setIsFavorite(true);
      }
    } catch {
      console.warn("Erro ao carregar favoritos.");
    }
  }, [slug]);

  function toggleFavorite() {
    try {
      const storedFavorites = localStorage.getItem("favorites");

      let favorites: string[] = [];

      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);

        if (Array.isArray(parsedFavorites)) {
          favorites = parsedFavorites;
        }
      }

      let updatedFavorites: string[];

      if (favorites.includes(slug)) {
        updatedFavorites = favorites.filter(
          (favoriteSlug) => favoriteSlug !== slug
        );

        setIsFavorite(false);
      } else {
        updatedFavorites = [...favorites, slug];

        setIsFavorite(true);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );
    } catch {
      console.warn("Erro ao salvar favoritos.");
    }
  }

  if (!mounted) {
    return (
      <div className="h-12 w-12 rounded-2xl bg-white/80 backdrop-blur-sm" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        isFavorite
          ? "Remover dos favoritos"
          : "Salvar nos favoritos"
      }
      className={`group flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
        isFavorite
          ? "border-red-200 bg-red-700 text-white shadow-lg shadow-red-700/25"
          : "border-zinc-200 bg-white/90 text-zinc-500 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
      }`}
    >
      <Heart
        size={20}
        strokeWidth={2.6}
        className={`transition-all duration-300 ${
          isFavorite ? "scale-110 fill-white" : "group-hover:scale-110"
        }`}
      />
    </button>
  );
}