import Link from "next/link";

type KitPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const kits = [
  {
    slug: "churrasco",
    title: "Kit Churrasco",
    emoji: "🍖",
    price: "A partir de R$ 149,90",
    description:
      "Kit pensado para churrascos com cerveja, carvão, gelo e itens essenciais para receber bem.",
    items: ["Cerveja", "Carvão", "Gelo", "Temperos", "Refrigerante"],
    context: "Ideal para churrasco de fim de semana com amigos e família.",
  },
  {
    slug: "festa",
    title: "Kit Festa",
    emoji: "🎉",
    price: "A partir de R$ 199,90",
    description:
      "Combinação prática para festas, com bebidas, energéticos e opções para diferentes perfis.",
    items: ["Vodka", "Whisky", "Energético", "Refrigerante", "Gelo"],
    context: "Perfeito para festas hoje, aniversários e encontros maiores.",
  },
  {
    slug: "resenha",
    title: "Kit Resenha",
    emoji: "🍻",
    price: "A partir de R$ 89,90",
    description:
      "Kit econômico para encontros rápidos, resenhas pequenas e rolês sem gastar muito.",
    items: ["Cerveja", "Vodka econômica", "Energético", "Petiscos"],
    context: "Ideal para juntar a galera gastando pouco.",
  },
  {
    slug: "gin-tonica",
    title: "Kit Gin Tônica",
    emoji: "🍸",
    price: "A partir de R$ 119,90",
    description:
      "Kit para preparar drinks com gin, tônica e complementos para deixar a experiência mais completa.",
    items: ["Gin", "Água tônica", "Especiarias", "Limão", "Gelo"],
    context: "Ótimo para happy hour, jantar e drinks em casa.",
  },
  {
    slug: "familia",
    title: "Kit Família",
    emoji: "🥤",
    price: "A partir de R$ 69,90",
    description:
      "Kit com opções sem álcool para família, almoço, churrasco e eventos com crianças.",
    items: ["Refrigerante", "Suco", "Água", "Energético sem álcool"],
    context: "Pensado para eventos familiares e compras práticas.",
  },
  {
    slug: "revenda",
    title: "Kit Revenda",
    emoji: "🏪",
    price: "A partir de R$ 299,90",
    description:
      "Kit voltado para bares, adegas e pequenos revendedores com foco em giro e margem.",
    items: ["Cervejas", "Energéticos", "Destilados", "Combos de alto giro"],
    context: "Ideal para quem compra pensando em revenda e estoque.",
  },
];

export default async function KitPage({ params }: KitPageProps) {
  const { slug } = await params;

  const kit = kits.find((item) => item.slug === slug);

  if (!kit) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-black text-zinc-950">
            Kit não encontrado
          </h1>

          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-red-700 px-7 font-black text-white"
          >
            Voltar
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-black text-red-700">
            ← Voltar
          </Link>

          <span className="font-black">DrinkyOfertas</span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-[260px_1fr]">
          <div className="flex h-[240px] items-center justify-center rounded-3xl bg-red-50 text-8xl">
            {kit.emoji}
          </div>

          <div>
            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-black text-red-700">
              Kit inteligente
            </span>

            <h1 className="mt-5 text-4xl font-black md:text-5xl">
              {kit.title}
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-500">
              {kit.description}
            </p>

            <p className="mt-6 text-4xl font-black text-red-700">
              {kit.price}
            </p>

            <div className="mt-8 rounded-2xl bg-red-50 p-5">
              <p className="font-bold text-red-700">
                {kit.context}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black">
            O que vem nesse kit
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kit.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-200 p-5 font-bold"
              >
                ✅ {item}
              </div>
            ))}
          </div>

          <button className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-red-700 font-black text-white transition hover:bg-red-800">
            Montar este kit
          </button>
        </div>
      </section>
    </main>
  );
}