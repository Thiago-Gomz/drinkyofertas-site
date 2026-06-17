import Link from "next/link";
import {
  BadgePercent,
  Bell,
  ChartNoAxesCombined,
  LineChart,
  Search,
  ShieldCheck,
  Store,
  Ticket,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";

const steps = [
  {
    title: "Monitoramos o mercado",
    icon: Search,
    description:
      "Acompanhamos lojas, marketplaces, supermercados, adegas online e plataformas que vendem bebidas pela internet.",
  },
  {
    title: "Comparamos preços",
    icon: Store,
    description:
      "Organizamos valores, frete, cupons, cashback e condições para facilitar a decisão de compra.",
  },
  {
    title: "Analisamos histórico",
    icon: LineChart,
    description:
      "Mostramos variação de preço para ajudar você a identificar se a oferta realmente está vantajosa.",
  },
  {
    title: "Aplicamos cupons",
    icon: Ticket,
    description:
      "Quando há cupom disponível, o sistema facilita a cópia e direciona para a loja com a busca do produto.",
  },
  {
    title: "Geramos alertas",
    icon: Bell,
    description:
      "Você pode acompanhar produtos e monitorar oportunidades de queda de preço.",
  },
  {
    title: "Apoiamos a decisão",
    icon: ChartNoAxesCombined,
    description:
      "O Assistente ajuda a estimar consumo, custo por pessoa, margem de segurança e plano de compra.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title="Como funciona" />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[36px] bg-zinc-950 p-10 text-white shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black text-red-200">
            <ShieldCheck size={16} strokeWidth={2.5} />
            Plataforma de inteligência e comparação
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight md:text-6xl">
            O DrinkyOfertas ajuda você a comprar bebidas com mais precisão.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            A plataforma combina monitoramento de preços, comparação de lojas,
            cupons, histórico e análise de consumo para transformar promoções em
            decisões melhores.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-[32px] border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                  <Icon size={26} strokeWidth={2.5} />
                </div>

                <h2 className="mt-6 text-2xl font-black text-zinc-950">
                  {step.title}
                </h2>

                <p className="mt-4 leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-red-700">
                Decisão de compra
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Não mostramos apenas promoções.
              </h2>

              <p className="mt-5 max-w-3xl leading-relaxed text-zinc-500">
                O DrinkyOfertas existe para organizar o mercado de bebidas
                online. A proposta é mostrar oportunidades reais, comparar
                preços entre plataformas e reduzir compras ruins, impulsivas ou
                mal calculadas.
              </p>
            </div>

            <div className="rounded-3xl bg-red-50 p-6">
              <div className="flex items-center gap-3 text-red-700">
                <BadgePercent size={24} strokeWidth={2.5} />

                <p className="font-black">Foco em economia real</p>
              </div>

              <p className="mt-4 leading-relaxed text-red-700">
                Onde houver bebida à venda online, a plataforma pode monitorar,
                comparar e recomendar.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#ofertas"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-red-700 px-8 font-black text-white transition hover:bg-red-800"
            >
              Ver ofertas monitoradas
            </Link>

            <Link
              href="/assistente"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-8 font-black text-zinc-950 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Abrir assistente
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}