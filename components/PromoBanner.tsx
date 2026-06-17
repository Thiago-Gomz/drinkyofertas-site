export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-8">

      <div className="bg-gradient-to-r from-red-700 to-red-500 rounded-[32px] p-8 md:p-14 overflow-hidden relative">

        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">

          <span className="bg-white text-red-600 px-4 py-2 rounded-full font-black text-sm">
            PROMOÇÕES RELÂMPAGO
          </span>

          <h2 className="text-4xl md:text-6xl font-black mt-6 leading-tight text-white">
            Descontos absurdos
            <br />
            todos os dias
          </h2>

          <p className="text-white/80 text-lg mt-5 max-w-2xl">
            Whisky, cerveja, gin, energético,
            churrasco e acessórios com os melhores
            preços encontrados automaticamente.
          </p>

          <button className="mt-8 bg-black hover:bg-zinc-900 transition px-8 py-4 rounded-2xl font-black text-white">
            Explorar ofertas
          </button>

        </div>

      </div>

    </section>
  );
}