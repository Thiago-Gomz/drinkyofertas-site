"use client";

import { useState } from "react";

const eventOptions = {
  churrasco: {
    title: "Kit Churrasco Econômico",
    itemsPerPerson: 18,
    items: ["🍺 Cervejas", "🔥 Carvão", "🧊 Gelo", "🥤 Refrigerante"],
  },
  festa: {
    title: "Kit Festa Completo",
    itemsPerPerson: 25,
    items: ["🍸 Vodka", "🥃 Whisky", "⚡ Energéticos", "🧊 Gelo"],
  },
  resenha: {
    title: "Kit Resenha Barata",
    itemsPerPerson: 14,
    items: ["🍺 Cervejas", "🍹 Vodka econômica", "⚡ Energético"],
  },
  jantar: {
    title: "Kit Vinho para Jantar",
    itemsPerPerson: 22,
    items: ["🍷 Vinho", "🥤 Água", "🧀 Acompanhamentos"],
  },
  revenda: {
    title: "Kit Revenda Inicial",
    itemsPerPerson: 40,
    items: ["🍺 Cervejas", "⚡ Energéticos", "🥃 Destilados"],
  },
};

export default function EventPlannerCalculator() {
  const [eventType, setEventType] = useState("churrasco");
  const [people, setPeople] = useState(10);
  const [budget, setBudget] = useState(300);
  const [calculated, setCalculated] = useState(false);

  const selectedEvent = eventOptions[eventType as keyof typeof eventOptions];

  const estimatedCost = people * selectedEvent.itemsPerPerson;
  const costPerPerson = estimatedCost / people;
  const budgetStatus =
    budget >= estimatedCost
      ? "Seu orçamento está adequado para este evento."
      : "Seu orçamento está abaixo do ideal. Vamos priorizar economia.";

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black">
          Dados do evento
        </h2>

        <div className="mt-6 grid gap-5">
          <label className="block">
            <span className="font-bold text-zinc-700">
              Tipo de evento
            </span>

            <select
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
              className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-red-700"
            >
              <option value="churrasco">Churrasco</option>
              <option value="festa">Festa</option>
              <option value="resenha">Resenha</option>
              <option value="jantar">Jantar</option>
              <option value="revenda">Revenda</option>
            </select>
          </label>

          <label className="block">
            <span className="font-bold text-zinc-700">
              Número de pessoas
            </span>

            <input
              type="number"
              min="1"
              value={people}
              onChange={(event) => setPeople(Number(event.target.value))}
              className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-red-700"
            />
          </label>

          <label className="block">
            <span className="font-bold text-zinc-700">
              Orçamento aproximado
            </span>

            <input
              type="number"
              min="0"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-red-700"
            />
          </label>

          <button
            onClick={() => setCalculated(true)}
            className="mt-3 flex h-14 items-center justify-center rounded-2xl bg-red-700 font-black text-white transition hover:bg-red-800"
          >
            Calcular sugestão
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-red-700 p-8 text-white shadow-sm">
        <p className="text-sm font-black uppercase text-red-100">
          Sugestão inteligente
        </p>

        <h2 className="mt-3 text-3xl font-black">
          {selectedEvent.title}
        </h2>

        <p className="mt-4 text-red-100">
          {calculated
            ? `Sugestão para ${people} pessoas.`
            : "Preencha os dados e clique em calcular."}
        </p>

        <div className="mt-6 space-y-3">
          {selectedEvent.items.map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white/15 p-4 font-bold"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-white/15 p-5">
          <p className="text-sm text-red-100">
            Custo estimado
          </p>

          <p className="mt-1 text-3xl font-black">
            R$ {estimatedCost.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-white/15 p-5">
          <p className="text-sm text-red-100">
            Custo por pessoa
          </p>

          <p className="mt-1 text-2xl font-black">
            R$ {costPerPerson.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <p className="mt-5 text-sm font-bold text-red-100">
          {budgetStatus}
        </p>
      </div>
    </div>
  );
}