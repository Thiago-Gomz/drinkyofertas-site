import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChartNoAxesCombined,
  Heart,
  Menu,
  Store,
  Ticket,
  User,
} from "lucide-react";

import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto flex h-auto max-w-[1760px] flex-col gap-5 px-4 py-5 md:h-[138px] md:flex-row md:items-center md:gap-8 md:px-5 md:py-0">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-[2px]"
          >
            <div className="flex h-28 w-[88px] items-center justify-center">
              <Image
                src="/logo.png"
                alt="DrinkyOfertas"
                width={130}
                height={130}
                priority
                className="h-[96px] w-[96px] object-contain"
              />
            </div>

            <div className="-ml-1 flex flex-col leading-none">
              <span className="text-[2.75rem] font-black tracking-[-0.065em] text-zinc-950 md:text-[3.15rem]">
                Drinky
                <span className="text-red-700">
                  Ofertas
                </span>
              </span>

              <span className="mt-2 text-[15px] font-black tracking-[-0.015em] text-zinc-500 md:text-[16px]">
                Sua dose de descontos diários
              </span>
            </div>
          </Link>

          <Link
            href="/login"
            className="flex h-11 items-center justify-center rounded-xl bg-red-700 px-5 text-sm font-black text-white md:hidden"
          >
            Entrar
          </Link>
        </div>

        <div className="w-full flex-1">
          <SearchBar />
        </div>

        <div className="hidden shrink-0 items-center gap-7 text-sm font-black text-zinc-900 lg:flex">
          <TopLink
            href="/alertas"
            icon={<Bell size={30} strokeWidth={2.4} />}
            label="Alertas"
          />

          <TopLink
            href="/favoritos"
            icon={<Heart size={30} strokeWidth={2.4} />}
            label="Favoritos"
          />

          <TopLink
            href="/cupons"
            icon={<Ticket size={30} strokeWidth={2.4} />}
            label="Cupons"
          />

          <TopLink
            href="/revenda"
            icon={<Store size={30} strokeWidth={2.4} />}
            label="Revenda"
          />

          <TopLink
            href="/login"
            icon={<User size={30} strokeWidth={2.4} />}
            label="Entrar"
          />
        </div>
      </div>

      <nav className="overflow-x-auto bg-red-700">
        <div className="mx-auto flex h-16 min-w-max max-w-[1760px] items-center gap-14 px-5 text-lg font-black text-white">
          <Link
            href="/category/cervejas"
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <Menu size={28} strokeWidth={2.7} />
            Categorias
          </Link>

          <Link href="/#ofertas" className="whitespace-nowrap">
            Ofertas
          </Link>

          <Link href="/cupons" className="whitespace-nowrap">
            Cupons
          </Link>

          <Link
            href="/assistente"
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <ChartNoAxesCombined size={27} strokeWidth={2.7} />
            Assistente
          </Link>

          <Link href="/ranking" className="whitespace-nowrap">
            Ranking
          </Link>

          <Link href="/revenda" className="whitespace-nowrap">
            Revenda
          </Link>

          <Link href="/como-funciona" className="whitespace-nowrap">
            Como funciona
          </Link>
        </div>
      </nav>
    </header>
  );
}

function TopLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-w-[78px] flex-col items-center justify-center gap-2 text-center transition hover:text-red-700"
    >
      {icon}

      <span className="text-sm font-black leading-none">
        {label}
      </span>
    </Link>
  );
}