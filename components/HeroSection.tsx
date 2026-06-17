import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5] px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_520px] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-black text-red-700">
            <Sparkles size={16} strokeWidth={2.5} />
            Plataforma de inteligência e comparação de bebidas
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-zinc-950 md:text-7xl">
            Monitore preços,
            compare marketplaces
            e compre bebidas
            com inteligência.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500 md:text-xl">
            O DrinkyOfertas monitora milhares de ofertas online,
            compara preços entre marketplaces e ajuda você a tomar
            decisões melhores na hora de comprar bebidas.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#ofertas"
              className="inline-flex h-16 items-center justify-center gap-2 rounded-3xl bg-red-700 px-8 text-lg font-black text-white transition hover:bg-red-800"
            >
              Explorar ofertas
              <ArrowRight size={20} strokeWidth={2.5} />
            </Link>

            <Link
              href="/assistente"
              className="inline-flex h-16 items-center justify-center rounded-3xl border border-zinc-200 bg-white px-8 text-lg font-black text-zinc-950 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Central de Inteligência
            </Link>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-4xl font-black text-red-700">
                +12mil
              </p>

              <p className="mt-2 font-bold text-zinc-500">
                ofertas monitoradas diariamente
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-4xl font-black text-red-700">
                +40
              </p>

              <p className="mt-2 font-bold text-zinc-500">
                marketplaces e lojas online
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-4xl font-black text-red-700">
                24h
              </p>

              <p className="mt-2 font-bold text-zinc-500">
                monitoramento automático de preços
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-2xl shadow-zinc-300/20">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-red-700">
                  Inteligência de mercado
                </p>

                <h2 className="mt-2 text-3xl font-black text-zinc-950">
                  Análise de consumo
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                <ChartNoAxesCombined
                  size={26}
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              <div className="rounded-3xl bg-zinc-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-black text-zinc-950">
                    Melhor custo-benefício
                  </p>

                  <p className="text-sm font-black text-emerald-700">
                    -18%
                  </p>
                </div>

                <p className="mt-3 text-2xl font-black text-zinc-950">
                  Heineken 350ml
                </p>

                <p className="mt-2 text-zinc-500">
                  Menor preço identificado entre
                  marketplaces monitorados.
                </p>
              </div>

              <div className="rounded-3xl bg-zinc-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-black text-zinc-950">
                    Economia potencial
                  </p>

                  <p className="text-sm font-black text-red-700">
                    R$ 84
                  </p>
                </div>

                <p className="mt-3 text-2xl font-black text-zinc-950">
                  Comparativo inteligente
                </p>

                <p className="mt-2 text-zinc-500">
                  Estratégia otimizada entre múltiplas lojas.
                </p>
              </div>

              <div className="rounded-3xl bg-zinc-950 p-6 text-white">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    size={22}
                    strokeWidth={2.5}
                  />

                  <p className="font-black">
                    Monitoramento contínuo
                  </p>
                </div>

                <p className="mt-4 leading-relaxed text-zinc-300">
                  O sistema acompanha preços, cupons,
                  disponibilidade e tendências de consumo
                  em tempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}