import Link from "next/link";
import EventPlannerCalculator from "@/components/EventPlannerCalculator";

export default function EventoPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-black text-red-700">
            ← Voltar
          </Link>

          <span className="font-black">
            DrinkyOfertas
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="font-black uppercase tracking-wide text-red-700">
            Planejador de evento
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            Monte o melhor kit para sua ocasião
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-500">
            Informe o tipo de evento, quantidade de pessoas e orçamento.
            O DrinkyOfertas calcula uma sugestão inicial de compra.
          </p>
        </div>

        <EventPlannerCalculator />
      </section>
    </main>
  );
}