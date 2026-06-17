"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  PackageSearch,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import OfferCard from "@/components/OfferCard";

import { offers } from "@/data/offers";

export default function AlertasPage() {
  const [alertSlugs, setAlertSlugs] = useState<string[]>([]);

  useEffect(() => {
    const storedAlerts = localStorage.getItem("price-alerts");

    if (!storedAlerts) {
      return;
    }

    try {
      const parsedAlerts = JSON.parse(storedAlerts);

      if (Array.isArray(parsedAlerts)) {
        setAlertSlugs(parsedAlerts);
      }
    } catch {
      setAlertSlugs([]);
    }
  }, []);

  const alertOffers = useMemo(() => {
    return offers.filter((offer) => alertSlugs.includes(offer.slug));
  }, [alertSlugs]);

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title="Alertas de preço" />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[36px] bg-zinc-950 p-10 text-white shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black text-red-200">
            <Bell size={16} strokeWidth={2.5} />
            Monitoramento de preço
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight md:text-6xl">
            Acompanhe produtos e seja mais estratégico antes de comprar.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            Os alertas ajudam você a monitorar oportunidades, acompanhar queda
            de preço e evitar compras no momento errado.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Metric
            icon={<Bell size={24} strokeWidth={2.5} />}
            title="Alertas ativos"
            value={String(alertOffers.length)}
          />

          <Metric
            icon={<TrendingDown size={24} strokeWidth={2.5} />}
            title="Objetivo"
            value="Queda de preço"
            success
          />

          <Metric
            icon={<ShieldCheck size={24} strokeWidth={2.5} />}
            title="Status"
            value="Monitorado"
          />
        </div>

        {alertOffers.length > 0 ? (
          <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-red-700">
                  Produtos acompanhados
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  Alertas ativos
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
                  Esses produtos estão salvos para acompanhamento de preço,
                  histórico e oportunidade futura de compra.
                </p>
              </div>

              <div className="rounded-3xl bg-emerald-50 p-5">
                <p className="text-sm font-black uppercase text-emerald-700">
                  Monitoramento
                </p>

                <p className="mt-2 text-2xl font-black text-emerald-700">
                  Ativo
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {alertOffers.map((offer) => (
                <OfferCard key={offer.slug} offer={offer} />
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-700">
              <PackageSearch size={34} strokeWidth={2.5} />
            </div>

            <h2 className="mt-6 text-4xl font-black text-zinc-950">
              Nenhum alerta criado ainda
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-zinc-500">
              Abra uma oferta e clique em “Me avise quando baixar” para
              começar a monitorar produtos.
            </p>

            <Link
              href="/#ofertas"
              className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-700 px-8 font-black text-white transition hover:bg-red-800"
            >
              Ver ofertas monitoradas
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </section>
        )}
      </section>
    </main>
  );
}

function Metric({
  icon,
  title,
  value,
  success = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className={success ? "text-emerald-700" : "text-red-700"}>
        {icon}
      </div>

      <p className="mt-5 text-sm font-black uppercase text-zinc-500">
        {title}
      </p>

      <p
        className={`mt-3 text-3xl font-black ${
          success ? "text-emerald-700" : "text-zinc-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}