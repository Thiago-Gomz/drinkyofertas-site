"use client";

import { CheckCircle, Clock, Search, ShieldCheck, Ticket } from "lucide-react";

import CopyAndOpenButton from "@/components/CopyAndOpenButton";

import { buildStoreSearchUrl } from "@/lib/storeLinks";

type CouponCardProps = {
  title: string;
  store: string;
  coupon: string;
  validUntil: string;
  status: "active" | "expired";
  affiliateUrl: string;
};

export default function CouponCard({
  title,
  store,
  coupon,
  validUntil,
  status,
  affiliateUrl,
}: CouponCardProps) {
  const hasCoupon =
    coupon.toLowerCase() !== "nenhum" &&
    coupon.toLowerCase() !== "sem cupom";

  const isActive = status === "active";

  const directedUrl = buildStoreSearchUrl(store, title) || affiliateUrl;

  return (
    <article
      className={`overflow-hidden rounded-[32px] border shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        isActive
          ? "border-zinc-200 bg-white hover:border-red-200"
          : "border-zinc-200 bg-zinc-100 opacity-70"
      }`}
    >
      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-700">
              <Ticket size={15} strokeWidth={2.5} />
              Cupom monitorado
            </div>

            <p className="mt-5 text-sm font-black uppercase tracking-wide text-red-700">
              {store}
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight text-zinc-950">
              {title}
            </h2>
          </div>

          <div
            className={`rounded-full px-4 py-2 text-xs font-black uppercase ${
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-zinc-300 text-zinc-700"
            }`}
          >
            {isActive ? "Ativo" : "Expirado"}
          </div>
        </div>

        <div className="mt-7 rounded-3xl border border-dashed border-red-200 bg-red-50 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-700">
            Código disponível
          </p>

          <p className="mt-3 break-all text-3xl font-black tracking-wide text-red-700">
            {coupon}
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
            <Clock size={18} strokeWidth={2.5} className="text-zinc-500" />

            <div>
              <p className="text-xs font-black uppercase text-zinc-500">
                Validade
              </p>

              <p className="font-black text-zinc-950">{validUntil}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
            <Search size={18} strokeWidth={2.5} className="text-red-700" />

            <div>
              <p className="text-xs font-black uppercase text-zinc-500">
                Direcionamento
              </p>

              <p className="font-black text-zinc-950">
                Busca do produto na loja
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
            <ShieldCheck
              size={18}
              strokeWidth={2.5}
              className="text-emerald-700"
            />

            <div>
              <p className="text-xs font-black uppercase text-zinc-500">
                Conversão
              </p>

              <p className="font-black text-zinc-950">
                Cupom + busca direcionada
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 p-7">
        {isActive ? (
          <CopyAndOpenButton
            url={directedUrl}
            coupon={coupon}
            label={hasCoupon ? "Copiar cupom e buscar" : "Buscar produto"}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-red-700 text-sm font-black text-white transition hover:bg-red-800"
          />
        ) : (
          <button
            type="button"
            disabled
            className="flex h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-zinc-300 text-sm font-black text-zinc-600"
          >
            <CheckCircle size={18} strokeWidth={2.5} />
            Cupom expirado
          </button>
        )}
      </div>
    </article>
  );
}