export default function CashbackSection() {
  return (
    <section id="cashback" className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-3xl bg-red-700 p-12 text-white shadow-xl">
        <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-black">
          CASHBACK
        </span>

        <h2 className="mt-6 max-w-xl text-5xl font-black leading-tight">
          Ganhe cashback nas suas bebidas
        </h2>

        <p className="mt-5 max-w-2xl text-red-100">
          Compre através das ofertas do DrinkyOfertas e receba cashback nas principais lojas.
        </p>

        <button className="mt-8 rounded-xl bg-white px-7 py-4 font-black text-red-700">
          Ativar cashback
        </button>
      </div>
    </section>
  );
}