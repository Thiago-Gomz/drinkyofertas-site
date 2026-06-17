"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Search,
  Store,
  Tag,
  TrendingDown,
  X,
} from "lucide-react";

import { offers } from "@/data/offers";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredOffers = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return offers
      .filter((offer) => {
        return (
          offer.title.toLowerCase().includes(normalizedQuery) ||
          offer.category.toLowerCase().includes(normalizedQuery) ||
          offer.store.toLowerCase().includes(normalizedQuery)
        );
      })
      .slice(0, 6);
  }, [normalizedQuery]);

  const showDropdown = isFocused && query.length > 0;

  function clearSearch() {
    setQuery("");
  }

  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <div className="flex h-16 overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-md shadow-zinc-200/60 transition focus-within:border-red-300 focus-within:shadow-lg">
        <div className="flex h-full w-16 items-center justify-center text-zinc-400">
          <Search size={25} strokeWidth={2.5} />
        </div>

        <input
          type="text"
          placeholder="Buscar ofertas"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(event) => setQuery(event.target.value)}
          className="h-full flex-1 bg-transparent pr-3 text-base font-bold text-zinc-950 outline-none placeholder:text-zinc-400"
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={clearSearch}
            className="flex h-full w-12 items-center justify-center text-zinc-400 transition hover:text-red-700"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        )}

        <button
          type="button"
          className="flex h-full min-w-24 items-center justify-center bg-red-700 px-7 text-white transition hover:bg-red-800"
        >
          <Search size={30} strokeWidth={2.7} />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[76px] z-50 overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl">
          <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
              Resultados inteligentes
            </p>

            <p className="mt-1 text-sm font-bold text-zinc-500">
              Busca por produto, categoria, loja e oportunidade monitorada.
            </p>
          </div>

          {filteredOffers.length > 0 ? (
            <div className="max-h-[480px] overflow-y-auto">
              {filteredOffers.map((offer) => (
                <Link
                  key={offer.slug}
                  href={`/offer/${offer.slug}`}
                  onClick={() => setIsFocused(false)}
                  className="group grid gap-4 border-b border-zinc-100 px-5 py-5 transition hover:bg-red-50/50 md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700">
                        <Store size={13} strokeWidth={2.5} />
                        {offer.store}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                        <TrendingDown size={13} strokeWidth={2.5} />
                        Monitorado
                      </span>
                    </div>

                    <h3 className="mt-3 line-clamp-2 text-lg font-black leading-snug text-zinc-950 group-hover:text-red-700">
                      {offer.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold text-zinc-500">
                      <span className="inline-flex items-center gap-1">
                        <Tag size={14} strokeWidth={2.5} />
                        {offer.category}
                      </span>

                      <span className="inline-flex items-center gap-1 text-red-700">
                        <BadgePercent size={14} strokeWidth={2.5} />
                        {offer.discount}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 md:justify-end">
                    <div className="text-left md:text-right">
                      <p className="text-xs font-black uppercase text-zinc-400">
                        Preço atual
                      </p>

                      <p className="mt-1 text-2xl font-black text-red-700">
                        {offer.price}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-700 text-white transition group-hover:scale-105">
                      <ArrowRight size={18} strokeWidth={2.7} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500">
                <Search size={24} strokeWidth={2.5} />
              </div>

              <h3 className="mt-5 text-xl font-black text-zinc-950">
                Nenhum resultado encontrado
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Tente buscar por marca, categoria ou loja.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}