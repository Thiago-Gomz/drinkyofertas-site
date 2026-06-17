import {
  BadgeDollarSign,
  BarChart3,
  PackageCheck,
  ShieldCheck,
  Store,
  TrendingDown,
  Truck,
} from "lucide-react";

import OfferCard from "@/components/OfferCard";
import PageHeader from "@/components/PageHeader";

import { offers } from "@/data/offers";

export default function RevendaPage() {
  const resellerOffers = offers.filter((offer) => {
    return offer.category === "cervejas" || offer.category === "energeticos";
  });

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title="Inteligência para revenda" />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[36px] bg-zinc-950 p-10 text-white shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black text-red-200">
            <Store size={16} strokeWidth={2.5} />
            Compra comercial monitorada
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight md:text-6xl">
            Encontre oportunidades para comprar melhor e revender com mais margem.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            O DrinkyOfertas organiza ofertas com foco em giro, margem,
            reposição e custo de aquisição para adegas, bares e pequenos
            revendedores.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Metric
            icon={<BadgeDollarSign size={24} strokeWidth={2.5} />}
            title="Margem estimada"
            value="até 38%"
            success
          />

          <Metric
            icon={<PackageCheck size={24} strokeWidth={2.5} />}
            title="Itens com giro"
            value={String(resellerOffers.length)}
          />

          <Metric
            icon={<TrendingDown size={24} strokeWidth={2.5} />}
            title="Oportunidades"
            value="Ativas"
            success
          />

          <Metric
            icon={<Truck size={24} strokeWidth={2.5} />}
            title="Entrega"
            value="Comparada"
          />
        </div>

        <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700">
                <BarChart3 size={17} strokeWidth={2.5} />
                Análise comercial
              </div>

              <h2 className="mt-5 text-4xl font-black text-zinc-950">
                Critérios usados na seleção
              </h2>

              <p className="mt-4 max-w-3xl leading-relaxed text-zinc-500">
                A curadoria prioriza produtos com maior potencial de saída,
                preço competitivo, frete viável e categorias com boa aceitação
                para reposição rápida.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <CommercialInsight
                  title="Maior giro"
                  description="Cervejas e energéticos tendem a ter maior saída em finais de semana, eventos e compras de conveniência."
                />

                <CommercialInsight
                  title="Reposição rápida"
                  description="Produtos de consumo recorrente reduzem risco de estoque parado e ajudam na previsibilidade de compra."
                />

                <CommercialInsight
                  title="Custo por unidade"
                  description="Comparar marketplaces ajuda a identificar preço unitário mais competitivo antes da compra em volume."
                />

                <CommercialInsight
                  title="Margem operacional"
                  description="A combinação de preço, frete, cupom e cashback influencia diretamente o lucro final da revenda."
                />
              </div>
            </div>

            <aside className="rounded-[32px] bg-zinc-950 p-7 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} strokeWidth={2.5} />

                <p className="font-black">
                  Compra orientada por margem
                </p>
              </div>

              <p className="mt-5 leading-relaxed text-zinc-300">
                O objetivo não é apenas comprar barato, mas encontrar produtos
                com potencial real de giro e melhor relação entre custo,
                demanda e reposição.
              </p>

              <div className="mt-7 grid gap-4">
                <SideMetric label="Perfil ideal" value="Alto giro" />
                <SideMetric label="Foco" value="Margem + reposição" />
                <SideMetric label="Uso" value="Adegas e bares" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-red-700">
                Seleção monitorada
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Produtos recomendados para compra comercial
              </h2>

              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
                Ofertas com potencial para revenda, reposição de estoque,
                eventos e compras recorrentes.
              </p>
            </div>

            <div className="rounded-3xl bg-emerald-50 p-5">
              <p className="text-sm font-black uppercase text-emerald-700">
                Estratégia
              </p>

              <p className="mt-2 text-2xl font-black text-emerald-700">
                Giro + margem
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {resellerOffers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        </section>
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

function CommercialInsight({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
      <h3 className="text-xl font-black text-zinc-950">
        {title}
      </h3>

      <p className="mt-3 leading-relaxed text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function SideMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
      <p className="font-bold text-zinc-300">{label}</p>

      <p className="font-black text-white">{value}</p>
    </div>
  );
}