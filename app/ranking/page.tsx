import {
  BadgePercent,
  ChartNoAxesCombined,
  ShieldCheck,
  Ticket,
  TrendingDown,
  Truck,
} from "lucide-react";

import OfferCard from "@/components/OfferCard";
import PageHeader from "@/components/PageHeader";
import { offers } from "@/data/offers";

function getDiscountNumber(discount: string) {
  return Number(discount.replace("-", "").replace("%", ""));
}

function getPriceNumber(price: string) {
  return Number(
    price
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".")
      .trim()
  );
}

export default function RankingPage() {
  const biggestDiscounts = [...offers]
    .sort((a, b) => getDiscountNumber(b.discount) - getDiscountNumber(a.discount))
    .slice(0, 4);

  const cheapestOffers = [...offers]
    .sort((a, b) => getPriceNumber(a.price) - getPriceNumber(b.price))
    .slice(0, 4);

  const couponOffers = offers
    .filter((offer) => offer.couponStatus === "active")
    .slice(0, 4);

  const freeShippingOffers = offers
    .filter((offer) => offer.shipping.toLowerCase().includes("frete grátis"))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title="Ranking inteligente" />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[36px] bg-zinc-950 p-10 text-white shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black text-red-200">
            <ChartNoAxesCombined size={16} strokeWidth={2.5} />
            Ranking de oportunidades
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight md:text-6xl">
            As melhores oportunidades monitoradas pelo DrinkyOfertas.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            Organizamos ofertas por desconto, preço, cupons ativos e frete para
            ajudar você a decidir com mais rapidez e segurança.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Metric
            icon={<BadgePercent size={24} strokeWidth={2.5} />}
            title="Maior desconto"
            value={`${getDiscountNumber(biggestDiscounts[0].discount)}%`}
          />

          <Metric
            icon={<TrendingDown size={24} strokeWidth={2.5} />}
            title="Menor preço"
            value={cheapestOffers[0].price}
            success
          />

          <Metric
            icon={<Ticket size={24} strokeWidth={2.5} />}
            title="Cupons ativos"
            value={String(couponOffers.length)}
          />

          <Metric
            icon={<Truck size={24} strokeWidth={2.5} />}
            title="Frete grátis"
            value={String(freeShippingOffers.length)}
          />
        </div>

        <RankingBlock
          title="Maiores descontos detectados"
          description="Ofertas com maior redução percentual dentro da base monitorada."
          icon={<BadgePercent size={22} strokeWidth={2.5} />}
          offersList={biggestDiscounts}
        />

        <RankingBlock
          title="Menores preços monitorados"
          description="Produtos com os menores valores atuais entre as ofertas disponíveis."
          icon={<TrendingDown size={22} strokeWidth={2.5} />}
          offersList={cheapestOffers}
        />

        <RankingBlock
          title="Ofertas com cupom ativo"
          description="Produtos que combinam preço monitorado com cupom disponível."
          icon={<Ticket size={22} strokeWidth={2.5} />}
          offersList={couponOffers}
        />

        <RankingBlock
          title="Ofertas com frete grátis"
          description="Oportunidades onde o custo de entrega não pesa no valor final."
          icon={<Truck size={22} strokeWidth={2.5} />}
          offersList={freeShippingOffers}
        />
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

function RankingBlock({
  title,
  description,
  icon,
  offersList,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  offersList: typeof offers;
}) {
  return (
    <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700">
            {icon}
            Análise monitorada
          </div>

          <h2 className="mt-5 text-4xl font-black text-zinc-950">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
            {description}
          </p>
        </div>

        <div className="rounded-3xl bg-zinc-950 p-5 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} strokeWidth={2.5} />

            <p className="text-sm font-black uppercase text-zinc-300">
              Curadoria ativa
            </p>
          </div>

          <p className="mt-3 text-2xl font-black">
            {offersList.length} ofertas
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {offersList.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </div>
    </section>
  );
}