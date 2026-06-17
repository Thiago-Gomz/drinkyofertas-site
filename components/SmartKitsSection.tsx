import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  ChartNoAxesCombined,
  PackageCheck,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";

const kits = [
  {
    title: "Kit Churrasco Otimizado",
    description:
      "Composição equilibrada para eventos sociais com foco em volume, custo por pessoa e margem de segurança.",
    economy: "até 18%",
    profile: "Alto giro",
  },
  {
    title: "Kit Festa Premium",
    description:
      "Seleção orientada para ocasiões com maior ticket médio, combinando destilados, mixers e energéticos.",
    economy: "até 14%",
    profile: "Premium",
  },
  {
    title: "Kit Revenda Inteligente",
    description:
      "Estratégia de compra voltada para adegas e pequenos revendedores com foco em margem e reposição.",
    economy: "até 22%",
    profile: "Comercial",
  },
];

export default function SmartKitsSection() {
  return (
    <section className="bg-[#f5f5f5] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-black text-red-700">
              <PackageCheck size={16} strokeWidth={2.5} />
              Kits otimizados
            </div>

            <h2 className="mt-6 text-5xl font-black leading-tight tracking-tight text-zinc-950">
              Combinações pensadas para reduzir custo e melhorar a compra.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
              O DrinkyOfertas organiza sugestões por cenário de consumo,
              considerando economia, categoria, volume estimado e oportunidade
              de compra.
            </p>
          </div>

          <div className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-red-700">
                  Análise de composição
                </p>

                <h3 className="mt-2 text-3xl font-black text-zinc-950">
                  Distribuição inteligente
                </h3>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                <ChartNoAxesCombined size={26} strokeWidth={2.5} />
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <DistributionBar label="Cervejas" value={58} />
              <DistributionBar label="Destilados" value={18} />
              <DistributionBar label="Mixers" value={16} />
              <DistributionBar label="Reserva operacional" value={8} />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {kits.map((kit) => (
            <article
              key={kit.title}
              className="group rounded-[32px] border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl hover:shadow-zinc-300/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700 transition group-hover:bg-red-700 group-hover:text-white">
                  <ShieldCheck size={26} strokeWidth={2.5} />
                </div>

                <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-700">
                  {kit.profile}
                </span>
              </div>

              <h3 className="mt-7 text-3xl font-black leading-tight text-zinc-950">
                {kit.title}
              </h3>

              <p className="mt-4 leading-relaxed text-zinc-500">
                {kit.description}
              </p>

              <div className="mt-7 rounded-3xl bg-zinc-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-700">
                    <BadgePercent size={20} strokeWidth={2.5} />
                    <p className="font-black text-zinc-950">
                      Economia projetada
                    </p>
                  </div>

                  <p className="font-black text-emerald-700">
                    {kit.economy}
                  </p>
                </div>
              </div>

              <Link
                href="/assistente"
                className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-red-700 text-sm font-black text-white transition hover:bg-red-800"
              >
                Analisar cenário
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DistributionBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-black text-zinc-950">{label}</p>

        <div className="flex items-center gap-1 text-emerald-700">
          <TrendingDown size={15} strokeWidth={2.5} />
          <p className="font-black">{value}%</p>
        </div>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-200">
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