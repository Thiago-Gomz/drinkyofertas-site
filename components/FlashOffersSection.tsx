export default function FlashOffersSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-20">

      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-red-700 to-red-500 p-10 md:p-16">

        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[120px]" />

        <div className="relative z-10">

          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-black">
            ⚡ PROMOÇÕES RELÂMPAGO
          </span>

          <h2 className="text-5xl md:text-6xl font-black mt-8 leading-tight max-w-4xl">

            Descontos absurdos
            <br />

            por tempo limitado

          </h2>

          <p className="text-white/80 text-xl mt-6 max-w-2xl">
            Encontramos automaticamente as melhores
            promoções do momento nas principais lojas.
          </p>

          <div className="flex flex-col md:flex-row gap-5 mt-10">

            <button className="bg-white text-red-600 hover:bg-zinc-100 transition px-8 py-5 rounded-2xl font-black text-lg">
              Ver promoções
            </button>

            <button className="bg-black/20 hover:bg-black/30 transition px-8 py-5 rounded-2xl font-black text-lg border border-white/10">
              Entrar no Telegram
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}