import {
  BadgePercent,
  ShieldCheck,
  Store,
  Ticket,
  TrendingDown,
} from "lucide-react";

import CouponCard from "@/components/CouponCard";
import PageHeader from "@/components/PageHeader";

import { offers } from "@/data/offers";

export default function CuponsPage() {
  const activeCoupons = offers.filter(
    (offer) => offer.couponStatus === "active"
  );

  const expiredCoupons = offers.filter(
    (offer) => offer.couponStatus === "expired"
  );

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title="Cupons monitorados" />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[36px] bg-zinc-950 p-10 text-white shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black text-red-200">
            <Ticket size={16} strokeWidth={2.5} />
            Central de cupons
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight md:text-6xl">
            Cupons monitorados para reduzir o custo final da compra.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            O DrinkyOfertas organiza cupons ativos, condições de uso e lojas
            monitoradas para facilitar sua decisão antes de comprar.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Metric
            icon={<Ticket size={24} strokeWidth={2.5} />}
            title="Cupons ativos"
            value={String(activeCoupons.length)}
          />

          <Metric
            icon={<Store size={24} strokeWidth={2.5} />}
            title="Lojas monitoradas"
            value="3+"
          />

          <Metric
            icon={<BadgePercent size={24} strokeWidth={2.5} />}
            title="Maior desconto"
            value="25%"
          />

          <Metric
            icon={<TrendingDown size={24} strokeWidth={2.5} />}
            title="Economia potencial"
            value="Alta"
            success
          />
        </div>

        <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-red-700">
                Disponíveis agora
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Cupons ativos
              </h2>

              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
                Clique em um cupom para copiar automaticamente e seguir para a
                busca direcionada da loja.
              </p>
            </div>

            <div className="rounded-3xl bg-emerald-50 p-5">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck size={22} strokeWidth={2.5} />
                <p className="font-black">Monitoramento ativo</p>
              </div>

              <p className="mt-3 text-sm font-bold text-emerald-700">
                Cupons revisados dentro da base de ofertas.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {activeCoupons.map((offer) => (
              <CouponCard
                key={offer.slug}
                title={offer.title}
                store={offer.store}
                coupon={offer.coupon}
                validUntil={offer.validUntil}
                status="active"
                affiliateUrl={offer.affiliateUrl}
              />
            ))}
          </div>
        </section>

        {expiredCoupons.length > 0 && (
          <section className="mt-10 rounded-[36px] border border-zinc-200 bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-zinc-500">
                Histórico
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Cupons expirados
              </h2>

              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
                Mantemos o histórico para transparência e acompanhamento de
                campanhas encerradas.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {expiredCoupons.map((offer) => (
                <CouponCard
                  key={offer.slug}
                  title={offer.title}
                  store={offer.store}
                  coupon={offer.coupon}
                  validUntil={offer.validUntil}
                  status="expired"
                  affiliateUrl={offer.affiliateUrl}
                />
              ))}
            </div>
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