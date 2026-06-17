export default function SearchSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-10">

      <div className="bg-zinc-900 border border-white/5 rounded-[32px] p-6 md:p-8">

        <div className="flex flex-col md:flex-row gap-5">

          <input
            type="text"
            placeholder="Buscar whisky, cerveja, gin..."
            className="flex-1 bg-[#111111] border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-red-500 text-lg"
          />

          <button className="bg-red-600 hover:bg-red-500 transition px-8 py-5 rounded-2xl font-black text-lg">
            Buscar ofertas
          </button>

        </div>

        <div className="flex flex-wrap gap-3 mt-6">

          <button className="bg-red-600 text-white px-5 py-3 rounded-full text-sm font-bold">
            Whisky
          </button>

          <button className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-full text-sm font-bold">
            Gin
          </button>

          <button className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-full text-sm font-bold">
            Churrasco
          </button>

          <button className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-full text-sm font-bold">
            Energéticos
          </button>

          <button className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-full text-sm font-bold">
            Vinhos
          </button>

        </div>

      </div>

    </section>
  );
}