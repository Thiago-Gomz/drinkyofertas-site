"use client";

import type { PriceHistoryItem } from "@/data/offers";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, ChartSpline } from "lucide-react";

type PriceHistoryChartProps = {
  history: PriceHistoryItem[];
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function PriceHistoryChart({
  history,
}: PriceHistoryChartProps) {
  const prices = history.map((item) => item.price);

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];

  const averagePrice =
    prices.reduce((acc, price) => acc + price, 0) / prices.length;

  const variation = firstPrice - lastPrice;
  const variationPercent = (variation / firstPrice) * 100;
  const isPriceDown = variation > 0;

  return (
    <section className="mt-10 rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700">
            <ChartSpline size={17} strokeWidth={2.5} />
            Histórico de preço
          </div>

          <h2 className="mt-5 text-4xl font-black text-zinc-950">
            Evolução do valor
          </h2>

          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
            Acompanhe a variação do preço e entenda se o valor atual realmente
            representa uma boa oportunidade de compra.
          </p>
        </div>

        <div
          className={`rounded-3xl p-5 ${
            isPriceDown ? "bg-emerald-50" : "bg-red-50"
          }`}
        >
          <div className="flex items-center gap-2">
            {isPriceDown ? (
              <ArrowDownRight
                size={22}
                strokeWidth={2.6}
                className="text-emerald-700"
              />
            ) : (
              <ArrowUpRight
                size={22}
                strokeWidth={2.6}
                className="text-red-700"
              />
            )}

            <p
              className={`text-sm font-black uppercase ${
                isPriceDown ? "text-emerald-700" : "text-red-700"
              }`}
            >
              Tendência
            </p>
          </div>

          <p
            className={`mt-3 text-3xl font-black ${
              isPriceDown ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {isPriceDown ? "Preço em queda" : "Preço em alta"}
          </p>

          <p className="mt-2 text-sm font-bold text-zinc-500">
            Variação de {formatCurrency(Math.abs(variation))} (
            {Math.abs(variationPercent).toFixed(1)}%)
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl bg-zinc-50 p-5">
          <p className="text-sm font-black uppercase text-zinc-500">
            Preço atual
          </p>

          <p className="mt-3 text-3xl font-black text-red-700">
            {formatCurrency(lastPrice)}
          </p>
        </div>

        <div className="rounded-3xl bg-emerald-50 p-5">
          <p className="text-sm font-black uppercase text-emerald-700">
            Menor preço
          </p>

          <p className="mt-3 text-3xl font-black text-emerald-700">
            {formatCurrency(lowestPrice)}
          </p>
        </div>

        <div className="rounded-3xl bg-zinc-50 p-5">
          <p className="text-sm font-black uppercase text-zinc-500">
            Preço médio
          </p>

          <p className="mt-3 text-3xl font-black text-zinc-950">
            {formatCurrency(averagePrice)}
          </p>
        </div>

        <div className="rounded-3xl bg-red-50 p-5">
          <p className="text-sm font-black uppercase text-red-700">
            Maior preço
          </p>

          <p className="mt-3 text-3xl font-black text-red-700">
            {formatCurrency(highestPrice)}
          </p>
        </div>
      </div>

      <div className="mt-10 h-[420px] w-full rounded-3xl border border-zinc-200 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={history}
            margin={{
              top: 20,
              right: 24,
              left: 12,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="priceArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#b91c1c" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />

            <XAxis
              dataKey="date"
              tick={{
                fill: "#71717a",
                fontSize: 12,
                fontWeight: 700,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) => formatCurrency(Number(value))}
              tick={{
                fill: "#71717a",
                fontSize: 12,
                fontWeight: 700,
              }}
              axisLine={false}
              tickLine={false}
              width={88}
              domain={["dataMin - 1", "dataMax + 1"]}
            />

            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                "Preço",
              ]}
              labelFormatter={(label) => `Data: ${label}`}
              contentStyle={{
                borderRadius: "18px",
                border: "1px solid #e4e4e7",
                boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
                fontWeight: 800,
              }}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#b91c1c"
              strokeWidth={4}
              fill="url(#priceArea)"
              activeDot={{
                r: 7,
                strokeWidth: 4,
                stroke: "#ffffff",
                fill: "#b91c1c",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}