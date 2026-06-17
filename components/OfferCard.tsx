import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  ChartNoAxesCombined,
  Clock3,
  Search,
  TrendingDown,
} from "lucide-react";

import type { Offer } from "@/data/offers";

import FavoriteButton from "@/components/FavoriteButton";
import CopyAndOpenButton from "@/components/CopyAndOpenButton";

import { buildStoreSearchUrl } from "@/lib/storeLinks";

type OfferCardProps = {
  offer: Offer;
};

export default function OfferCard({ offer }: OfferCardProps) {
  const directedUrl = buildStoreSearchUrl(offer.store, offer.title);

  const hasCoupon =
    offer.coupon.toLowerCase() !== "nenhum" &&
    offer.coupon.toLowerCase() !== "sem cupom";

  return (
    <article className="group relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl hover:shadow-zinc-300/30">
      <div className="absolute right-5 top-5 z-20">
        <FavoriteButton slug={offer.slug} />
      </div>

      <div className="absolute left-5 top-5 z-20 rounded-full bg-red-700 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg">
        Monitorado
      </div>

      <Link href={`/offer/${offer.slug}`}>
        <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 p-10">
          <Image
            src={offer.cachedImageUrl || offer.imageUrl}
            alt={offer.title}
            width={300}
            height={300}
            className="max-h-[240px] w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black uppercase tracking-wide text-red-700">
            {offer.store}
          </p>

          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            <TrendingDown size={14} strokeWidth={2.5} />
            Em queda
          </div>
        </div>

        <Link href={`/offer/${offer.slug}`}>
          <h3 className="mt-4 line-clamp-2 text-2xl font-black leading-tight text-zinc-950 transition hover:text-red-700">
            {offer.title}
          </h3>
        </Link>

        <div className="mt-6 flex items-end gap-3">
          <p className="text-lg font-bold text-zinc-400 line-through">
            {offer.oldPrice}
          </p>

          <p className="text-4xl font-black text-red-700">
            {offer.price}
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <BadgePercent
                size={18}
                strokeWidth={2.5}
                className="text-red-700"
              />

              <p className="text-sm font-black text-zinc-950">
                Economia detectada
              </p>
            </div>

            <p className="font-black text-emerald-700">
              {offer.discount}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <ChartNoAxesCombined
                size={18}
                strokeWidth={2.5}
                className="text-red-700"
              />

              <p className="text-sm font-black text-zinc-950">
                Melhor momento
              </p>
            </div>

            <p className="font-black text-zinc-950">
              Recomendado
            </p>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Clock3
                size={18}
                strokeWidth={2.5}
                className="text-red-700"
              />

              <p className="text-sm font-black text-zinc-950">
                Monitoramento
              </p>
            </div>

            <p className="font-black text-zinc-950">
              24h
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-3xl bg-zinc-50 p-5">
          <p className="text-sm font-black uppercase text-zinc-500">
            Cashback
          </p>

          <p className="mt-1 text-xl font-black text-zinc-950">
            {offer.cashback}
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          <Link
            href={`/offer/${offer.slug}`}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-black text-zinc-950 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            Ver análise
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>

          <CopyAndOpenButton
            url={directedUrl}
            coupon={offer.coupon}
            label={hasCoupon ? "Copiar cupom e buscar" : "Buscar produto"}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-700 text-sm font-black text-white transition hover:bg-red-800"
          />

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-400">
            <Search size={14} strokeWidth={2.5} />
            Busca direcionada na loja
          </div>
        </div>
      </div>
    </article>
  );
}