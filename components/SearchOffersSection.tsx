"use client";

import { useMemo, useState } from "react";
import OfferCard from "@/components/OfferCard";
import { offers } from "@/data/offers";

export default function SearchOffersSection() {
  const [search, setSearch] = useState("");

  const filteredOffers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return offers;
    }

    return offers.filter((offer) => {
      return (
        offer.title.toLowerCase().includes(normalizedSearch) ||
        offer.store.toLowerCase().includes(normalizedSearch) ||
        offer.category.toLowerCase().includes(normalizedSearch) ||
        offer.context.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search]);

  return (
    <section id="busca" className="bg-[#f5f5f5] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="font-black uppercase tracking-wide text-red-700">
                Busca inteligente
              </p>

              <h2 className="mt-2 text-3xl font-black text-zinc-950 md:text-4xl">
                Encontre a oferta certa
              </h2>
            </div>

            <div className="flex h-14 w-full overflow-hidden rounded-2xl border border-red-200 md:max-w-xl">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por vodka, whisky, cerveja, loja..."
                className="h-full flex-1 px-5 text-sm font-medium outline-none"
              />

              <button className="flex h-full w-16 items-center justify-center bg-red-700 text-white">
                🔍
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {["vodka", "whisky", "cervejas", "energeticos", "kits"].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => setSearch(term)}
                  className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-black text-zinc-700 transition hover:bg-red-700 hover:text-white"
                >
                  {term}
                </button>
              )
            )}

            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded-full bg-red-100 px-4 py-2 text-sm font-black text-red-700"
              >
                Limpar busca
              </button>
            )}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-5 text-sm font-black text-zinc-500">
            {filteredOffers.length} resultado(s) encontrado(s)
          </p>

          {filteredOffers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.slug} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h3 className="text-3xl font-black text-zinc-950">
                Nenhuma oferta encontrada
              </h3>

              <p className="mt-3 text-zinc-500">
                Tente buscar por outro produto, categoria ou loja.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}