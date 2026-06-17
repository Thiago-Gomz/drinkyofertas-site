export default function TelegramSection() {
  return (
    <section id="telegram" className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col justify-between gap-8 rounded-3xl border border-zinc-200 bg-white p-12 shadow-sm md:flex-row md:items-center">
        <div>
          <span className="text-sm font-black text-blue-600">
            TELEGRAM VIP
          </span>

          <h2 className="mt-4 max-w-xl text-4xl font-black text-zinc-950">
            Receba promoções em tempo real
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-500">
            Nosso bot encontra automaticamente as melhores ofertas de bebidas, churrasco e acessórios.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-8 py-4 font-black text-white">
          Entrar no Telegram
        </button>
      </div>
    </section>
  );
}