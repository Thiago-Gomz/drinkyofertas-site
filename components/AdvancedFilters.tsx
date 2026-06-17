    "use client";

import { useMemo, useState } from "react";

import OfferCard from "@/components/OfferCard";

import { offers } from "@/data/offers";

export default function AdvancedFilters() {
  const [category, setCategory] =
    useState("todos");

  const [store, setStore] =
    useState("todas");

  const [sortBy, setSortBy] =
    useState("menor-preco");

  const [freeShipping, setFreeShipping] =
    useState(false);

  const filteredOffers = useMemo(() => {
    let filtered = [...offers];

    if (category !== "todos") {
      filtered = filtered.filter(
        (offer) => offer.category === category
      );
    }

    if (store !== "todas") {
      filtered = filtered.filter(
        (offer) => offer.store === store
      );
    }

    if (freeShipping) {
      filtered = filtered.filter((offer) =>
        offer.shipping
          .toLowerCase()
          .includes("frete grátis")
      );
    }

    if (sortBy === "menor-preco") {
      filtered.sort((a, b) => {
        const priceA = Number(
          a.price
            .replace("R$", "")
            .replace(",", ".")
        );

        const priceB = Number(
          b.price
            .replace("R$", "")
            .replace(",", ".")
        );

        return priceA - priceB;
      });
    }

    if (sortBy === "maior-desconto") {
      filtered.sort((a, b) => {
        const discountA = Number(
          a.discount.replace("%", "").replace("-", "")
        );

        const discountB = Number(
          b.discount.replace("%", "").replace("-", "")
        );

        return discountB - discountA;
      });
    }

    return filtered;
  }, [category, store, sortBy, freeShipping]);

  return (
    <section className="mt-10">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-black text-zinc-700">
              Categoria
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="h-14 w-full rounded-2xl border border-zinc-200 px-4 font-bold outline-none"
            >
              <option value="todos">
                Todas categorias
              </option>

              <option value="cervejas">
                Cervejas
              </option>

              <option value="whiskies">
                Whiskies
              </option>

              <option value="vodkas">
                Vodkas
              </option>

              <option value="energeticos">
                Energéticos
              </option>
            </select>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-black text-zinc-700">
              Marketplace
            </label>

            <select
              value={store}
              onChange={(event) =>
                setStore(event.target.value)
              }
              className="h-14 w-full rounded-2xl border border-zinc-200 px-4 font-bold outline-none"
            >
              <option value="todas">
                Todas lojas
              </option>

              <option value="Amazon">
                Amazon
              </option>

              <option value="Shopee">
                Shopee
              </option>

              <option value="Mercado Livre">
                Mercado Livre
              </option>
            </select>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-black text-zinc-700">
              Ordenar
            </label>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="h-14 w-full rounded-2xl border border-zinc-200 px-4 font-bold outline-none"
            >
              <option value="menor-preco">
                Menor preço
              </option>

              <option value="maior-desconto">
                Maior desconto
              </option>
            </select>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-5 py-4">
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={() =>
                setFreeShipping(!freeShipping)
              }
              className="h-5 w-5"
            />

            <span className="text-sm font-black text-zinc-700">
              Frete grátis
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {filteredOffers.map((offer) => (
          <OfferCard
            key={offer.slug}
            offer={offer}
          />
        ))}
      </div>
    </section>
  );
}