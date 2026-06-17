"use client";

import { useEffect, useState } from "react";

import OfferCard from "@/components/OfferCard";

import { offers } from "@/data/offers";

export default function AlertsClient() {
  const [alertSlugs, setAlertSlugs] = useState<string[]>([]);

  useEffect(() => {
    const storedAlerts =
      localStorage.getItem("price-alerts");

    if (!storedAlerts) {
      return;
    }

    const parsedAlerts: string[] =
      JSON.parse(storedAlerts);

    setAlertSlugs(parsedAlerts);
  }, []);

  const alertOffers = offers.filter((offer) =>
    alertSlugs.includes(offer.slug)
  );

  function clearAlerts() {
    localStorage.removeItem("price-alerts");

    setAlertSlugs([]);
  }

  if (alertOffers.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-3xl font-black text-zinc-950">
          Nenhum alerta ativo
        </h2>

        <p className="mt-4 text-zinc-500">
          Ative alertas nas ofertas para acompanhar quedas
          de preço.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black text-zinc-950">
            {alertOffers.length} alerta(s) ativo(s)
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Produtos monitorados por você.
          </p>
        </div>

        <button
          onClick={clearAlerts}
          className="flex h-12 items-center justify-center rounded-2xl bg-red-100 px-5 text-sm font-black text-red-700 transition hover:bg-red-700 hover:text-white"
        >
          Remover todos alertas
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {alertOffers.map((offer) => (
          <OfferCard
            key={offer.slug}
            offer={offer}
          />
        ))}
      </div>
    </div>
  );
}