import {
  BadgePercent,
  CreditCard,
  HandCoins,
  ShieldCheck,
  Store,
  Ticket,
  Truck,
} from "lucide-react";

import type { MarketplaceOffer } from "@/data/offers";
import CopyAndOpenButton from "@/components/CopyAndOpenButton";
import { buildStoreSearchUrl } from "@/lib/storeLinks";

type MarketplaceComparisonProps = {
  marketplaces: MarketplaceOffer[];
  productTitle: string;
};

export default function MarketplaceComparison({
  marketplaces,
  productTitle,
}: MarketplaceComparisonProps) {
  return (
    <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700">
            <Store size={16} strokeWidth={2.5} />
            Comparação de marketplaces
          </div>

          <h2 className="mt-5 text-4xl font-black text-zinc-950">
            Onde vale mais a pena comprar
          </h2>

          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
            Compare preço, entrega, cashback, cupom e forma de pagamento antes
            de sair para a loja.
          </p>
        </div>

        <div className="rounded-3xl bg-zinc-950 p-5 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} strokeWidth={2.5} />

            <p className="text-sm font-black uppercase text-zinc-300">
              Análise ativa
            </p>
          </div>

          <p className="mt-3 text-2xl font-black">
            {marketplaces.length} lojas comparadas
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5">
        {marketplaces.map((marketplace, index) => {
          const isBestOption = index === 0;

          const hasCoupon =
            marketplace.coupon.toLowerCase() !== "nenhum" &&
            marketplace.coupon.toLowerCase() !== "sem cupom";

          const directedUrl = buildStoreSearchUrl(
            marketplace.name,
            productTitle
          );

          return (
            <article
              key={`${marketplace.name}-${index}`}
              className={`rounded-[30px] border p-6 transition hover:-translate-y-1 hover:shadow-xl ${
                isBestOption
                  ? "border-red-200 bg-red-50/40"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-black text-zinc-950">
                      {marketplace.name}
                    </h3>

                    {isBestOption && (
                      <span className="rounded-full bg-red-700 px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                        Melhor opção
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-bold text-zinc-500">
                    Busca direcionada para este produto dentro da loja.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase text-zinc-500">
                    Preço
                  </p>

                  <p className="mt-2 text-3xl font-black text-red-700">
                    {marketplace.price}
                  </p>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm font-black text-zinc-700">
                    <Truck size={17} strokeWidth={2.5} />
                    {marketplace.shipping}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-black text-emerald-700">
                    <HandCoins size={17} strokeWidth={2.5} />
                    {marketplace.cashback}
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm font-black text-zinc-700">
                    <CreditCard size={17} strokeWidth={2.5} />
                    {marketplace.paymentMethod}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-black text-red-700">
                    {hasCoupon ? (
                      <Ticket size={17} strokeWidth={2.5} />
                    ) : (
                      <BadgePercent size={17} strokeWidth={2.5} />
                    )}
                    {marketplace.coupon}
                  </div>
                </div>

                <CopyAndOpenButton
                  url={directedUrl}
                  coupon={marketplace.coupon}
                  label={hasCoupon ? "Copiar e comprar" : "Buscar produto"}
                  className="flex h-14 items-center justify-center rounded-2xl bg-red-700 px-6 text-sm font-black text-white transition hover:bg-red-800"
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}