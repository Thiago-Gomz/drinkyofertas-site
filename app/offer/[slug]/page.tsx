import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgePercent,
  BarChart3,
  Clock,
  CreditCard,
  HandCoins,
  ShieldCheck,
  Ticket,
  TrendingDown,
  Truck,
} from "lucide-react";

import { offers } from "@/data/offers";
import { buildStoreSearchUrl } from "@/lib/storeLinks";

import PageHeader from "@/components/PageHeader";
import MarketplaceComparison from "@/components/MarketplaceComparison";
import CopyAndOpenButton from "@/components/CopyAndOpenButton";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import RelatedProducts from "@/components/RelatedProducts";
import PriceAlertButton from "@/components/PriceAlertButton";
import ReviewsSection from "@/components/ReviewsSection";

type OfferPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: OfferPageProps): Promise<Metadata> {
  const { slug } = await params;

  const offer = offers.find((item) => item.slug === slug);

  if (!offer) {
    return {
      title: "Oferta não encontrada",
      description:
        "A oferta solicitada não foi encontrada no DrinkyOfertas.",
    };
  }

  return {
    title: `${offer.title} por ${offer.price}`,
    description: `${offer.title} com preço monitorado, cupom ${offer.coupon}, desconto ${offer.discount} e comparação entre marketplaces no DrinkyOfertas.`,

    openGraph: {
      title: `${offer.title} por ${offer.price}`,
      description: `${offer.title} com desconto ${offer.discount}, cupom ${offer.coupon} e comparação de preço.`,
      url: `https://drinkyofertas.com.br/offer/${offer.slug}`,
      siteName: "DrinkyOfertas",
      images: [
        {
          url: offer.cachedImageUrl || offer.imageUrl,
          width: 1200,
          height: 630,
          alt: offer.title,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${offer.title} por ${offer.price}`,
      description: `${offer.title} com desconto ${offer.discount} no DrinkyOfertas.`,
      images: [offer.cachedImageUrl || offer.imageUrl],
    },
  };
}

export default async function OfferPage({ params }: OfferPageProps) {
  const { slug } = await params;

  const offer = offers.find((item) => item.slug === slug);

  if (!offer) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
        <PageHeader />

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-black text-zinc-950">
              Oferta não encontrada
            </h1>

            <Link
              href="/"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-red-700 px-6 font-black text-white"
            >
              Voltar para a home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const directedOfferUrl = buildStoreSearchUrl(offer.store, offer.title);

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[520px_1fr]">
          <div className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex h-[460px] items-center justify-center rounded-[28px] bg-gradient-to-br from-zinc-50 to-zinc-100 p-10">
              <Image
                src={offer.cachedImageUrl || offer.imageUrl}
                alt={offer.title}
                width={520}
                height={520}
                className="max-h-[390px] w-full object-contain"
                priority
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-emerald-50 p-5">
                <p className="text-sm font-black uppercase text-emerald-700">
                  Tendência
                </p>

                <div className="mt-3 flex items-center gap-2 text-2xl font-black text-emerald-700">
                  <TrendingDown size={24} strokeWidth={2.7} />
                  Em queda
                </div>
              </div>

              <div className="rounded-3xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase text-red-700">
                  Economia
                </p>

                <p className="mt-3 text-2xl font-black text-red-700">
                  {offer.discount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700">
              <ShieldCheck size={16} strokeWidth={2.5} />
              Oferta monitorada
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-wide text-red-700">
              {offer.store}
            </p>

            <h1 className="mt-3 text-5xl font-black leading-tight text-zinc-950">
              {offer.title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-500">
              {offer.description}
            </p>

            <div className="mt-8 rounded-3xl bg-zinc-50 p-6">
              <p className="text-sm font-black uppercase text-zinc-500">
                Preço monitorado
              </p>

              <div className="mt-3 flex flex-wrap items-end gap-4">
                <p className="text-2xl font-bold text-zinc-400 line-through">
                  {offer.oldPrice}
                </p>

                <p className="text-6xl font-black text-red-700">
                  {offer.price}
                </p>
              </div>

              <p className="mt-4 text-sm font-bold text-zinc-500">
                Valor atual identificado no marketplace com melhor oportunidade
                disponível.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoCard
                icon={<BadgePercent size={20} strokeWidth={2.5} />}
                label="Desconto"
                value={offer.discount}
              />

              <InfoCard
                icon={<CreditCard size={20} strokeWidth={2.5} />}
                label="Pagamento"
                value={offer.paymentMethod}
              />

              <InfoCard
                icon={<HandCoins size={20} strokeWidth={2.5} />}
                label="Cashback"
                value={offer.cashback}
                success
              />

              <InfoCard
                icon={<Truck size={20} strokeWidth={2.5} />}
                label="Entrega"
                value={offer.shipping}
              />
            </div>

            <div className="mt-6 rounded-3xl border border-red-100 bg-red-50 p-6">
              <div className="flex items-center gap-2 font-black text-zinc-950">
                <Ticket size={20} strokeWidth={2.5} />
                Cupom aplicado
              </div>

              <p className="mt-3 text-3xl font-black tracking-wide text-red-700">
                {offer.coupon}
              </p>

              <p className="mt-3 flex items-center gap-2 text-sm font-bold text-zinc-500">
                <Clock size={16} strokeWidth={2.5} />
                {offer.validUntil}
              </p>
            </div>

            <CopyAndOpenButton
              url={directedOfferUrl}
              coupon={offer.coupon}
              label={
                offer.coupon.toLowerCase() === "nenhum"
                  ? "Buscar produto"
                  : "Copiar cupom e buscar produto"
              }
              className="mt-8 flex h-16 w-full items-center justify-center rounded-3xl bg-red-700 text-lg font-black text-white transition hover:bg-red-800"
            />

            <PriceAlertButton slug={offer.slug} title={offer.title} />
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <InsightCard
            icon={<TrendingDown size={24} strokeWidth={2.5} />}
            title="Melhor momento de compra"
            description="O preço atual está abaixo da média recente monitorada, indicando oportunidade favorável para compra."
            success
          />

          <InsightCard
            icon={<BarChart3 size={24} strokeWidth={2.5} />}
            title="Análise comparativa"
            description="Compare valores, frete, cupom e condições entre lojas antes de decidir onde comprar."
          />

          <InsightCard
            icon={<ShieldCheck size={24} strokeWidth={2.5} />}
            title="Decisão mais segura"
            description="A oferta reúne preço, histórico, cupom e contexto para reduzir risco de compra impulsiva."
          />
        </section>

        <MarketplaceComparison
          marketplaces={offer.marketplaces}
          productTitle={offer.title}
        />

        <PriceHistoryChart history={offer.priceHistory} />

        <ReviewsSection reviews={offer.reviews} />

        <RelatedProducts currentOffer={offer} offers={offers} />
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
  success = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
      <div className={success ? "text-emerald-700" : "text-red-700"}>
        {icon}
      </div>

      <div>
        <p className="text-xs font-black uppercase text-zinc-500">
          {label}
        </p>

        <p className="font-black text-zinc-950">{value}</p>
      </div>
    </div>
  );
}

function InsightCard({
  icon,
  title,
  description,
  success = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          success
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-700"
        }`}
      >
        {icon}
      </div>

      <h2 className="mt-5 text-2xl font-black">{title}</h2>

      <p className="mt-3 leading-relaxed text-zinc-500">
        {description}
      </p>
    </div>
  );
}