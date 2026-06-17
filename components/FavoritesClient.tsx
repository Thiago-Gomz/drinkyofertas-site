"use client";

import { useEffect, useState } from "react";

import OfferCard from "@/components/OfferCard";

import { offers } from "@/data/offers";

export default function FavoritesClient() {
  const [favoriteSlugs, setFavoriteSlugs] =
    useState<string[]>([]);

  useEffect(() => {
    const storedFavorites =
      localStorage.getItem("favorite-offers");

    if (!storedFavorites) {
      return;
    }

    const parsedFavorites: string[] =
      JSON.parse(storedFavorites);

    setFavoriteSlugs(parsedFavorites);
  }, []);

  const favoriteOffers = offers.filter((offer) =>
    favoriteSlugs.includes(offer.slug)
  );

  function clearFavorites() {
    localStorage.removeItem("favorite-offers");

    setFavoriteSlugs([]);
  }

  if (favoriteOffers.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-3xl font-black text-zinc-950">
          Nenhum favorito salvo
        </h2>

        <p className="mt-4 text-zinc-500">
          Favorite ofertas para acessar rapidamente depois.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black text-zinc-950">
            {favoriteOffers.length} favorito(s)
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Produtos salvos por você.
          </p>
        </div>

        <button
          onClick={clearFavorites}
          className="flex h-12 items-center justify-center rounded-2xl bg-red-100 px-5 text-sm font-black text-red-700 transition hover:bg-red-700 hover:text-white"
        >
          Limpar favoritos
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {favoriteOffers.map((offer) => (
          <OfferCard
            key={offer.slug}
            offer={offer}
          />
        ))}
      </div>
    </div>
  );
}