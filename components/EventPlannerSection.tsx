import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  ChartNoAxesCombined,
  Clock,
  ShieldCheck,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function EventPlannerSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-black text-red-700">
            <ChartNoAxesCombined size={16} strokeWidth={2.5} />
            Assistente Inteligente de Compra
          </div>

          <h2 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight text-zinc-950 md:text-6xl">
            Transforme um cenário de consumo em um plano de compra.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
            Informe participantes, orçamento, duração e perfil do evento. O
            sistema estima consumo, custo por pessoa, margem de segurança e
            direciona para as melhores opções de compra.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Feature
              icon={<Users size={22} strokeWidth={2.5} />}
              title="Custo por participante"
              text="Entenda o impacto real do orçamento por pessoa."
            />

            <Feature
              icon={<ShoppingCart size={22} strokeWidth={2.5} />}
              title="Carrinho recomendado"
              text="Receba uma composição estimada por categoria."
            />

            <Feature
              icon={<BadgeDollarSign size={22} strokeWidth={2.5} />}
              title="Economia projetada"
              text="Compare cenários e reduza compras desnecessárias."
            />

            <Feature
              icon={<Clock size={22} strokeWidth={2.5} />}
              title="Margem de segurança"
              text="Evite falta de bebida durante o evento."
            />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/assistente"
              className="inline-flex h-16 items-center justify-center gap-2 rounded-3xl bg-red-700 px-8 text-lg font-black text-white transition hover:bg-red-800"
            >
              Abrir assistente
              <ArrowRight size={20} strokeWidth={2.5} />
            </Link>

            <Link
              href="/como-funciona"
              className="inline-flex h-16 items-center justify-center rounded-3xl border border-zinc-200 bg-white px-8 text-lg font-black text-zinc-950 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Entender a metodologia
            </Link>
          </div>
        </div>

        <div className="rounded-[36px] border border-zinc-200 bg-[#f5f5f5] p-8 shadow-sm">
          <div className="rounded-[30px] bg-zinc-950 p-7 text-white shadow-2xl">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} strokeWidth={2.5} />

              <p className="font-black">
                Análise orientada a decisão
              </p>
            </div>

            <p className="mt-5 leading-relaxed text-zinc-300">
              O assistente não apenas sugere bebidas. Ele projeta consumo,
              calcula margem, estima custo e direciona para opções reais de
              compra.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            <Insight label="Cenário analisado" value="25 participantes" />
            <Insight label="Orçamento validado" value="R$ 900,00" />
            <Insight label="Economia potencial" value="R$ 126,00" />
            <Insight label="Melhor estratégia" value="Compra única por loja" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black text-zinc-950">
        {title}
      </h3>

      <p className="mt-3 leading-relaxed text-zinc-500">
        {text}
      </p>
    </div>
  );
}

function Insight({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-5">
      <p className="font-bold text-zinc-500">{label}</p>

      <p className="font-black text-zinc-950">{value}</p>
    </div>
  );
}