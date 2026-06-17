import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  PackageCheck,
  Search,
  ShieldCheck,
  Store,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";

type EventProfile = "economico" | "equilibrado" | "premium";
type EventType = "social" | "churrasco" | "corporativo" | "revenda";

type ResultadoPageProps = {
  searchParams: Promise<{
    people?: string;
    budget?: string;
    duration?: string;
    type?: string;
    profile?: string;
  }>;
};

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

function normalizeEventType(value?: string): EventType {
  if (
    value === "social" ||
    value === "churrasco" ||
    value === "corporativo" ||
    value === "revenda"
  ) {
    return value;
  }

  return "churrasco";
}

function normalizeProfile(value?: string): EventProfile {
  if (
    value === "economico" ||
    value === "equilibrado" ||
    value === "premium"
  ) {
    return value;
  }

  return "equilibrado";
}

function buildSearchTerm(eventType: EventType, profile: EventProfile) {
  if (eventType === "revenda") {
    return "bebidas atacado cerveja energético whisky vodka";
  }

  if (eventType === "corporativo") {
    return "bebidas evento corporativo água energético cerveja premium";
  }

  if (eventType === "social" && profile === "premium") {
    return "bebidas premium whisky vodka energético festa";
  }

  if (eventType === "social") {
    return "kit bebidas festa cerveja vodka energético";
  }

  if (profile === "premium") {
    return "cerveja premium heineken energético red bull gelo";
  }

  return "pack cerveja energético gelo churrasco";
}

function buildStoreSearchUrl(store: string, searchTerm: string) {
  const encoded = encodeURIComponent(searchTerm);

  if (store === "Amazon") {
    return `https://www.amazon.com.br/s?k=${encoded}`;
  }

  if (store === "Mercado Livre") {
    return `https://lista.mercadolivre.com.br/${encoded}`;
  }

  if (store === "Shopee") {
    return `https://shopee.com.br/search?keyword=${encoded}`;
  }

  return "https://www.google.com/search?q=" + encoded;
}

export default async function ResultadoAssistentePage({
  searchParams,
}: ResultadoPageProps) {
  const params = await searchParams;

  const people = Math.max(Number(params.people || 18), 1);
  const budget = Math.max(Number(params.budget || 650), 0);
  const duration = Math.max(Number(params.duration || 5), 1);
  const eventType = normalizeEventType(params.type);
  const profile = normalizeProfile(params.profile);

  const multiplier = profileMultiplier[profile] * eventMultiplier[eventType];

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

  const beerUnits = Math.ceil(totalUnits * (beerShare / 100));
  const spiritsUnits = Math.ceil(totalUnits * (spiritsShare / 100) / 8);
  const mixersUnits = Math.ceil(totalUnits * (mixersShare / 100) / 4);
  const operationalUnits = Math.ceil(people / 5);

  const searchTerm = buildSearchTerm(eventType, profile);

  const cartItems = [
    {
      name: "Cervejas selecionadas",
      quantity: `${beerUnits} unidades estimadas`,
      role: "Base principal de consumo do cenário analisado.",
    },
    {
      name: "Destilados e bebidas premium",
      quantity: `${spiritsUnits} garrafa(s) sugerida(s)`,
      role: "Complemento para variedade, drinks e aumento de ticket.",
    },
    {
      name: "Mixers e energéticos",
      quantity: `${mixersUnits} unidade(s) / pack(s)`,
      role: "Apoio para drinks, consumo noturno e composição do carrinho.",
    },
    {
      name: "Gelo e itens operacionais",
      quantity: `${operationalUnits} pacote(s) estimado(s)`,
      role: "Margem operacional para reduzir risco de falta no evento.",
    },
  ];

  const stores = [
    {
      name: "Shopee",
      total: optimizedCost * 0.94,
      shipping: 0,
      coupon: "DRINKY10",
      searchUrl: buildStoreSearchUrl("Shopee", searchTerm),
    },
    {
      name: "Amazon",
      total: optimizedCost * 0.98,
      shipping: 0,
      coupon: "OFERTA10",
      searchUrl: buildStoreSearchUrl("Amazon", searchTerm),
    },
    {
      name: "Mercado Livre",
      total: optimizedCost * 1.03,
      shipping: 18.9,
      coupon: "MLDRINKS",
      searchUrl: buildStoreSearchUrl("Mercado Livre", searchTerm),
    },
  ].sort((a, b) => a.total + a.shipping - (b.total + b.shipping));

  const bestStore = stores[0];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title="Resultado da análise" />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[36px] bg-zinc-950 p-10 text-white shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black text-red-200">
            <ShieldCheck size={16} strokeWidth={2.5} />
            Carrinho inteligente
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            Plano de compra otimizado para {people} participantes
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            Resultado calculado para {eventLabels[eventType].toLowerCase()},
            com estratégia {profileLabels[profile].toLowerCase()}, duração de{" "}
            {duration} horas e orçamento de {formatCurrency(budget)}.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-black text-zinc-200">
            <Search size={17} strokeWidth={2.5} />
            Busca sugerida: {searchTerm}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Metric title="Economia estimada" value={formatCurrency(projectedSavings)} />
          <Metric title="Custo por pessoa" value={formatCurrency(costPerPerson)} />
          <Metric title="Unidades estimadas" value={String(totalUnits)} />
          <Metric title="Melhor loja" value={bestStore.name} />
        </div>

        <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <PackageCheck
              size={28}
              strokeWidth={2.5}
              className="text-red-700"
            />

            <h2 className="text-4xl font-black">Lista recomendada</h2>
          </div>

          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-500">
            A lista abaixo representa uma composição estimada para reduzir risco
            de falta, evitar excesso de compra e manter o orçamento sob controle.
          </p>

          <div className="mt-8 grid gap-4">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-xl font-black">{item.name}</p>

                  <p className="mt-1 text-sm font-bold text-zinc-500">
                    {item.role}
                  </p>
                </div>

                <p className="rounded-full bg-white px-5 py-3 text-sm font-black text-red-700 shadow-sm">
                  {item.quantity}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Store size={28} strokeWidth={2.5} className="text-red-700" />

            <h2 className="text-4xl font-black">Escolha onde comprar</h2>
          </div>

          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
            Cada botão abre a busca já direcionada dentro da loja escolhida,
            aproximando o usuário dos itens recomendados.
          </p>

          <div className="mt-8 grid gap-5">
            {stores.map((store, index) => {
              const finalTotal = store.total + store.shipping;
              const isBest = index === 0;

              return (
                <article
                  key={store.name}
                  className={`rounded-[30px] border p-6 ${
                    isBest
                      ? "border-red-200 bg-red-50/50"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-black">{store.name}</h3>

                        {isBest && (
                          <span className="rounded-full bg-red-700 px-4 py-2 text-xs font-black uppercase text-white">
                            Melhor valor final
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm font-bold text-zinc-500">
                        Cupom aplicado: {store.coupon}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase text-zinc-500">
                        Frete
                      </p>

                      <p className="mt-2 text-xl font-black">
                        {store.shipping === 0
                          ? "Grátis"
                          : formatCurrency(store.shipping)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase text-zinc-500">
                        Total estimado
                      </p>

                      <p className="mt-2 text-3xl font-black text-red-700">
                        {formatCurrency(finalTotal)}
                      </p>
                    </div>

                    <a
                      href={store.searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-700 px-6 text-sm font-black text-white transition hover:bg-red-800"
                    >
                      Buscar na {store.name}
                      <ExternalLink size={17} strokeWidth={2.5} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/assistente"
            className="inline-flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-8 font-black text-zinc-950 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            Ajustar análise
          </Link>

          <Link
            href="/#ofertas"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-8 font-black text-white transition hover:bg-zinc-800"
          >
            Ver ofertas monitoradas
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase text-zinc-500">{title}</p>

      <p className="mt-3 text-3xl font-black text-zinc-950">{value}</p>
    </div>
  );
}