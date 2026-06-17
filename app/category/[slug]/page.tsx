import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgePercent,
  ChartNoAxesCombined,
  PackageSearch,
  ShieldCheck,
  Store,
  TrendingDown,
} from "lucide-react";

import OfferCard from "@/components/OfferCard";
import PageHeader from "@/components/PageHeader";

import { offers } from "@/data/offers";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryNames: Record<string, string> = {
  cervejas: "Cervejas",
  whiskies: "Whiskies",
  vodkas: "Vodkas",
  energeticos: "Energéticos",
};

const categoryDescriptions: Record<string, string> = {
  cervejas:
    "Compare ofertas de cervejas online, encontre descontos, cupons, frete e oportunidades monitoradas para comprar melhor.",
  whiskies:
    "Encontre ofertas de whiskies online com comparação de preço, cupons, histórico e oportunidades monitoradas.",
  vodkas:
    "Compare vodkas online para drinks, festas e eventos, com ofertas monitoradas, cupons e análise de custo-benefício.",
  energeticos:
    "Ofertas de energéticos online para festas, rotina e revenda, com comparação de preço, cupons e monitoramento.",
};

const categoryStrategies: Record<string, string> = {
  cervejas: "Alto giro e compra recorrente",
  whiskies: "Ticket médio e oportunidade premium",
  vodkas: "Mix de evento e composição de drinks",
  energeticos: "Alta demanda em eventos e revenda",
};

function getDiscountNumber(discount: string) {
  return Number(discount.replace("-", "").replace("%", ""));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const categoryTitle = categoryNames[slug] || "Categoria";
  const categoryDescription =
    categoryDescriptions[slug] ||
    "Compare ofertas de bebidas online com cupons, preços monitorados e oportunidades no DrinkyOfertas.";

  return {
    title: `Ofertas de ${categoryTitle}`,
    description: categoryDescription,

    openGraph: {
      title: `Ofertas de ${categoryTitle} | DrinkyOfertas`,
      description: categoryDescription,
      url: `https://drinkyofertas.com.br/category/${slug}`,
      siteName: "DrinkyOfertas",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `Ofertas de ${categoryTitle} no DrinkyOfertas`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Ofertas de ${categoryTitle} | DrinkyOfertas`,
      description: categoryDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categoryOffers = offers.filter((offer) => offer.category === slug);

  const categoryTitle = categoryNames[slug] || "Categoria";
  const categoryDescription =
    categoryDescriptions[slug] ||
    "Confira ofertas monitoradas desta categoria.";
  const categoryStrategy =
    categoryStrategies[slug] || "Comparação inteligente de oportunidades";

  const bestDiscount = categoryOffers.length
    ? Math.max(
        ...categoryOffers.map((offer) => getDiscountNumber(offer.discount))
      )
    : 0;

  const storesCount = new Set(categoryOffers.map((offer) => offer.store)).size;

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title={categoryTitle} />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[36px] bg-zinc-950 p-10 text-white shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black text-red-200">
            <ChartNoAxesCombined size={16} strokeWidth={2.5} />
            Categoria monitorada
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight md:text-6xl">
            {categoryTitle} com análise de preço, economia e oportunidade.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            {categoryDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Metric
            icon={<PackageSearch size={24} strokeWidth={2.5} />}
            title="Ofertas"
            value={String(categoryOffers.length)}
          />

          <Metric
            icon={<BadgePercent size={24} strokeWidth={2.5} />}
            title="Maior desconto"
            value={`${bestDiscount}%`}
            success
          />

          <Metric
            icon={<Store size={24} strokeWidth={2.5} />}
            title="Lojas"
            value={String(storesCount)}
          />

          <Metric
            icon={<TrendingDown size={24} strokeWidth={2.5} />}
            title="Status"
            value="Monitorado"
            success
          />
        </div>

        <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-red-700">
                Estratégia da categoria
              </p>

              <h2 className="mt-3 text-4xl font-black text-zinc-950">
                {categoryStrategy}
              </h2>

              <p className="mt-5 max-w-3xl leading-relaxed text-zinc-500">
                As ofertas desta categoria são organizadas para facilitar a
                comparação entre preço, desconto, cupom, frete e melhor momento
                de compra.
              </p>
            </div>

            <div className="rounded-3xl bg-zinc-950 p-6 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} strokeWidth={2.5} />

                <p className="font-black">Curadoria ativa</p>
              </div>

              <p className="mt-4 leading-relaxed text-zinc-300">
                Categoria analisada dentro da base de oportunidades monitoradas
                do DrinkyOfertas.
              </p>
            </div>
          </div>
        </section>

        {categoryOffers.length > 0 ? (
          <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-red-700">
                  Ofertas disponíveis
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  Produtos monitorados
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
                  Compare as oportunidades desta categoria e escolha entre
                  analisar melhor ou buscar o produto diretamente na loja.
                </p>
              </div>

              <div className="rounded-3xl bg-emerald-50 p-5">
                <p className="text-sm font-black uppercase text-emerald-700">
                  Análise
                </p>

                <p className="mt-2 text-2xl font-black text-emerald-700">
                  Em tempo real
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {categoryOffers.map((offer) => (
                <OfferCard key={offer.slug} offer={offer} />
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-700">
              <PackageSearch size={34} strokeWidth={2.5} />
            </div>

            <h2 className="mt-6 text-4xl font-black">
              Nenhuma oferta encontrada
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-zinc-500">
              Ainda não existem ofertas monitoradas para esta categoria. A base
              poderá ser ampliada conforme novas lojas e produtos forem
              adicionados.
            </p>

            <Link
              href="/#ofertas"
              className="mt-8 inline-flex h-14 items-center justify-center rounded-2xl bg-red-700 px-8 font-black text-white transition hover:bg-red-800"
            >
              Ver ofertas da home
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