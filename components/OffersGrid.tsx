import OfferCard from "./OfferCard";
import { offers } from "@/data/offers";

export default function OffersGrid() {
  const activeOffers = offers.filter((offer) => offer.status === "active");

  return (
    <section id="ofertas" className="bg-[#f5f5f5] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-black uppercase tracking-wide text-red-700">
              🔥 Ofertas em destaque
            </p>

            <h2 className="mt-2 text-4xl font-black text-zinc-950 md:text-5xl">
              Promoções selecionadas para hoje
            </h2>

            <p className="mt-4 max-w-2xl text-zinc-500">
              Bebidas, kits, churrasco e acessórios com preço, cupom,
              cashback e condições organizadas para você decidir melhor.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <p className="text-sm font-black text-zinc-950">
              {activeOffers.length} ofertas ativas
            </p>

            <p className="text-xs font-bold text-zinc-500">
              Atualização automática em breve
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {activeOffers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}