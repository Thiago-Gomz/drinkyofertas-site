import Link from "next/link";
import { offers } from "@/data/offers";

export default function BestDealSection() {
  const activeOffers = offers.filter((offer) => offer.status === "active");
  const bestDeal = activeOffers[0];

  if (!bestDeal) {
    return null;
  }

  return (
    <section id="melhor-compra" className="bg-[#f5f5f5] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-gradient-to-br from-red-700 to-red-900 p-8 text-white shadow-xl md:p-10">
          <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-center">
            <div className="flex h-[240px] items-center justify-center rounded-3xl bg-white p-6">
              <img
                src={bestDeal.cachedImageUrl || bestDeal.imageUrl}
                alt={bestDeal.title}
                className="max-h-[190px] w-full object-contain"
              />
            </div>

            <div>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-black">
                🏆 MELHOR COMPRA DO DIA
              </span>

              <h2 className="mt-5 text-4xl font-black leading-tight">
                {bestDeal.title}
              </h2>

              <p className="mt-4 max-w-2xl text-red-100">
                Selecionamos esta oferta pelo melhor equilíbrio entre preço,
                desconto, entrega, cashback e contexto de uso.
              </p>

              <div className="mt-6 flex items-end gap-4">
                <p className="text-xl text-red-200 line-through">
                  {bestDeal.oldPrice}
                </p>

                <p className="text-5xl font-black">
                  {bestDeal.price}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                <span className="rounded-full bg-white/15 px-4 py-2">
                  {bestDeal.discount}
                </span>

                <span className="rounded-full bg-white/15 px-4 py-2">
                  💳 {bestDeal.paymentMethod}
                </span>

                <span className="rounded-full bg-white/15 px-4 py-2">
                  🚚 {bestDeal.shipping}
                </span>

                <span className="rounded-full bg-white/15 px-4 py-2">
                  💰 {bestDeal.cashback}
                </span>
              </div>

              <Link
                href={`/offer/${bestDeal.slug}`}
                className="mt-8 inline-flex h-14 items-center justify-center rounded-2xl bg-white px-8 font-black text-red-700 transition hover:bg-red-50"
              >
                Ver melhor oferta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}