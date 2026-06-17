import Link from "next/link";
import {
  ArrowRight,
  Bell,
  ChartNoAxesCombined,
  Heart,
  History,
  LockKeyhole,
  ShieldCheck,
  User,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-zinc-950">
      <PageHeader title="Conta Drinky" />

      <section className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.05fr_460px] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-black text-red-700">
            <ShieldCheck size={16} strokeWidth={2.5} />
            Área de monitoramento pessoal
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight tracking-tight text-zinc-950 md:text-7xl">
            Salve ofertas, acompanhe alertas e compre com mais precisão.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-500">
            A conta DrinkyOfertas será usada para centralizar favoritos,
            alertas de preço, histórico de produtos acompanhados e preferências
            de compra.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Feature
              icon={<Heart size={22} strokeWidth={2.5} />}
              title="Ofertas salvas"
              text="Acompanhe produtos importantes antes de decidir onde comprar."
            />

            <Feature
              icon={<Bell size={22} strokeWidth={2.5} />}
              title="Alertas de preço"
              text="Monitore oportunidades e quedas de valor em produtos específicos."
            />

            <Feature
              icon={<History size={22} strokeWidth={2.5} />}
              title="Histórico pessoal"
              text="Reveja produtos consultados e decisões de compra anteriores."
            />

            <Feature
              icon={<ChartNoAxesCombined size={22} strokeWidth={2.5} />}
              title="Assistente de compra"
              text="Use análises personalizadas para eventos, consumo e comparação."
            />
          </div>
        </div>

        <aside className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-2xl shadow-zinc-300/20">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-700">
            <User size={30} strokeWidth={2.5} />
          </div>

          <h2 className="mt-6 text-4xl font-black">
            Entrar na conta
          </h2>

          <p className="mt-4 leading-relaxed text-zinc-500">
            Login visual preparado para a próxima fase com autenticação real,
            favoritos em nuvem e alertas sincronizados.
          </p>

          <form className="mt-8 grid gap-5">
            <label>
              <span className="text-sm font-black text-zinc-700">
                E-mail
              </span>

              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-5 font-bold outline-none transition focus:border-red-700"
              />
            </label>

            <label>
              <span className="text-sm font-black text-zinc-700">
                Senha
              </span>

              <input
                type="password"
                placeholder="Digite sua senha"
                className="mt-2 h-14 w-full rounded-2xl border border-zinc-200 px-5 font-bold outline-none transition focus:border-red-700"
              />
            </label>

            <button
              type="button"
              className="mt-3 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-700 font-black text-white transition hover:bg-red-800"
            >
              Entrar
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white font-black text-zinc-950 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Criar conta grátis
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-zinc-950 p-6 text-white">
            <div className="flex items-center gap-3">
              <LockKeyhole size={22} strokeWidth={2.5} />

              <p className="font-black">
                Próxima fase
              </p>
            </div>

            <p className="mt-4 leading-relaxed text-zinc-300">
              A autenticação real será conectada depois com banco de dados,
              conta do usuário e sincronização dos alertas.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black text-zinc-950">
        {title}
      </h3>

      <p className="mt-3 leading-relaxed text-zinc-500">
        {text}
      </p>
    </div>
  );
}