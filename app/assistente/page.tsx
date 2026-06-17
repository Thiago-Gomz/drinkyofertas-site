"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  ChartNoAxesCombined,
  Clock,
  ShieldCheck,
  ShoppingCart,
  TrendingDown,
  Users,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";

type EventProfile = "economico" | "equilibrado" | "premium";
type EventType = "social" | "churrasco" | "corporativo" | "revenda";

const profileMultiplier: Record<EventProfile, number> = {
  economico: 0.85,
  equilibrado: 1,
  premium: 1.25,
};

const eventMultiplier: Record<EventType, number> = {
  social: 1,
  churrasco: 1.12,
  corporativo: 0.9,
  revenda: 1.35,
};

const eventLabels: Record<EventType, string> = {
  social: "Evento social",
  churrasco: "Churrasco",
  corporativo: "Corporativo",
  revenda: "Revenda / Adega",
};

const profileLabels: Record<EventProfile, string> = {
  economico: "Econômico",
  equilibrado: "Equilibrado",
  premium: "Premium",
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function AssistentePage() {
  const [people, setPeople] = useState(18);
  const [budget, setBudget] = useState(650);
  const [duration, setDuration] = useState(5);
  const [eventType, setEventType] = useState<EventType>("churrasco");
  const [profile, setProfile] = useState<EventProfile>("equilibrado");

  const resultUrl = `/assistente/resultado?people=${people}&budget=${budget}&duration=${duration}&type=${eventType}&profile=${profile}`;

  const analysis = useMemo(() => {
    const multiplier =
      profileMultiplier[profile] * eventMultiplier[eventType];

    const baseConsumption = people * duration * 1.15 * multiplier;
    const safetyMargin = baseConsumption * 0.12;
    const totalUnits = Math.ceil(baseConsumption + safetyMargin);

    const costPerPerson = budget / people;
    const optimizedCost = budget * 0.86;
    const projectedSavings = budget - optimizedCost;

    const beerShare =
      eventType === "churrasco" ? 64 : eventType === "revenda" ? 48 : 52;

    const spiritsShare =
      profile === "premium" ? 22 : eventType === "corporativo" ? 12 : 16;

    const mixersShare = 14;
    const reserveShare = 100 - beerShare - spiritsShare - mixersShare;

    const efficiency =
      projectedSavings / budget >= 0.14
        ? "Alta"
        : projectedSavings / budget >= 0.08
        ? "Média"
        : "Baixa";

    return {
      totalUnits,
      safetyMargin: Math.ceil(safetyMargin),
      costPerPerson,
      optimizedCost,
      projectedSavings,
      beerShare,
      spiritsShare,
      mixersShare,
      reserveShare,
      efficiency,
    };
  }, [people, budget, duration, eventType, profile]);

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title="Central de Inteligência" />

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_420px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-black text-red-700">
                <ChartNoAxesCombined size={16} strokeWidth={2.5} />
                Central de Inteligência de Compra
              </div>

              <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[1.03] tracking-tight text-zinc-950 md:text-7xl">
                Projete consumo, otimize orçamento e avance para o plano de
                compra.
              </h1>

              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-zinc-500">
                Estime quantidade, custo por pessoa, margem de segurança e
                estratégia financeira antes de escolher onde comprar.
              </p>
            </div>

            <div className="rounded-[32px] bg-zinc-950 p-6 text-white shadow-2xl">
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} strokeWidth={2.5} />

                <p className="font-black">Análise orientada a decisão</p>
              </div>

              <p className="mt-5 leading-relaxed text-zinc-300">
                Depois da simulação, o sistema gera um plano de compra com
                composição recomendada e comparação por loja.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[430px_1fr]">
        <aside className="rounded-[36px] border border-zinc-200 bg-white p-7 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wide text-red-700">
            Cenário de consumo
          </p>

          <h2 className="mt-3 text-3xl font-black">Parâmetros da análise</h2>

          <div className="mt-8 grid gap-6">
            <label>
              <span className="text-sm font-black text-zinc-700">
                Participantes
              </span>

              <input
                type="number"
                min={1}
                value={people}
                onChange={(event) => setPeople(Number(event.target.value))}
                className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-5 font-black outline-none focus:border-red-700"
              />
            </label>

            <label>
              <span className="text-sm font-black text-zinc-700">
                Orçamento disponível
              </span>

              <input
                type="number"
                min={0}
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-5 font-black outline-none focus:border-red-700"
              />
            </label>

            <label>
              <span className="text-sm font-black text-zinc-700">
                Duração estimada em horas
              </span>

              <input
                type="number"
                min={1}
                value={duration}
                onChange={(event) => setDuration(Number(event.target.value))}
                className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-5 font-black outline-none focus:border-red-700"
              />
            </label>

            <label>
              <span className="text-sm font-black text-zinc-700">
                Perfil do cenário
              </span>

              <select
                value={eventType}
                onChange={(event) =>
                  setEventType(event.target.value as EventType)
                }
                className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-5 font-black outline-none focus:border-red-700"
              >
                <option value="social">Evento social</option>
                <option value="churrasco">Churrasco</option>
                <option value="corporativo">Corporativo</option>
                <option value="revenda">Revenda / Adega</option>
              </select>
            </label>

            <label>
              <span className="text-sm font-black text-zinc-700">
                Estratégia de compra
              </span>

              <select
                value={profile}
                onChange={(event) =>
                  setProfile(event.target.value as EventProfile)
                }
                className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-5 font-black outline-none focus:border-red-700"
              >
                <option value="economico">Econômico</option>
                <option value="equilibrado">Equilibrado</option>
                <option value="premium">Premium</option>
              </select>
            </label>
          </div>
        </aside>

        <div className="grid gap-8">
          <section className="grid gap-5 md:grid-cols-4">
            <MetricCard
              icon={<Users size={24} strokeWidth={2.5} />}
              label="Custo por pessoa"
              value={formatCurrency(analysis.costPerPerson)}
            />

            <MetricCard
              icon={<ShoppingCart size={24} strokeWidth={2.5} />}
              label="Unidades estimadas"
              value={String(analysis.totalUnits)}
            />

            <MetricCard
              icon={<TrendingDown size={24} strokeWidth={2.5} />}
              label="Economia projetada"
              value={formatCurrency(analysis.projectedSavings)}
              tone="success"
            />

            <MetricCard
              icon={<Clock size={24} strokeWidth={2.5} />}
              label="Margem de segurança"
              value={`+${analysis.safetyMargin}`}
            />
          </section>

          <section className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-red-700">
                  Resultado da análise
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  Estratégia recomendada
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
                  Para {people} participantes em um cenário{" "}
                  {eventLabels[eventType].toLowerCase()} com estratégia{" "}
                  {profileLabels[profile].toLowerCase()}, a compra otimizada
                  prioriza equilíbrio entre volume, preço e margem operacional.
                </p>
              </div>

              <div className="rounded-3xl bg-emerald-50 p-5">
                <p className="text-sm font-black uppercase text-emerald-700">
                  Eficiência
                </p>

                <p className="mt-2 text-3xl font-black text-emerald-700">
                  {analysis.efficiency}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-4">
              <MixCard label="Cervejas" value={analysis.beerShare} />
              <MixCard label="Destilados" value={analysis.spiritsShare} />
              <MixCard label="Mixers" value={analysis.mixersShare} />
              <MixCard label="Reserva" value={analysis.reserveShare} />
            </div>
          </section>

          <section className="rounded-[36px] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <BadgeDollarSign size={26} strokeWidth={2.5} />

              <h2 className="text-3xl font-black">Estratégia financeira</h2>
            </div>

            <p className="mt-5 max-w-3xl leading-relaxed text-zinc-300">
              A projeção indica custo otimizado de{" "}
              <strong className="text-white">
                {formatCurrency(analysis.optimizedCost)}
              </strong>
              , com economia potencial de{" "}
              <strong className="text-emerald-400">
                {formatCurrency(analysis.projectedSavings)}
              </strong>{" "}
              ao comparar marketplaces, cupons e condições de entrega.
            </p>
          </section>

          <section className="rounded-[36px] border border-red-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-red-700">
                  Próxima etapa
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  Gerar plano de compra
                </h2>

                <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
                  Avance para visualizar a lista recomendada, comparar o
                  carrinho entre marketplaces e escolher uma única loja para
                  seguir com a compra.
                </p>
              </div>

              <Link
                href={resultUrl}
                className="inline-flex h-16 items-center justify-center gap-2 rounded-3xl bg-red-700 px-8 text-lg font-black text-white transition hover:bg-red-800"
              >
                Gerar plano de compra
                <ArrowRight size={20} strokeWidth={2.5} />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "success";
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className={tone === "success" ? "text-emerald-700" : "text-red-700"}>
        {icon}
      </div>

      <p className="mt-5 text-sm font-black uppercase text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-black ${
          tone === "success" ? "text-emerald-700" : "text-zinc-950"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function MixCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-zinc-50 p-5">
      <div className="flex items-center justify-between">
        <p className="font-black text-zinc-950">{label}</p>

        <p className="font-black text-red-700">{value}%</p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-red-700"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}