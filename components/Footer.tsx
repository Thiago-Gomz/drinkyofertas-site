import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Beer,
  Camera,
  ChartNoAxesCombined,
  CircleUser,
  GlassWater,
  Heart,
  MessageCircle,
  Music,
  Store,
  Ticket,
  Zap,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-[1760px] gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center">
              <Image
                src="/logo.png"
                alt="DrinkyOfertas"
                width={90}
                height={90}
                className="h-[74px] w-[74px] object-contain"
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-[2.2rem] font-black tracking-[-0.055em] text-zinc-950">
                Drinky<span className="text-red-700">Ofertas</span>
              </span>

              <span className="mt-2 text-sm font-black text-zinc-500">
                Sua dose de descontos diários
              </span>
            </div>
          </Link>

          <p className="mt-6 max-w-md leading-relaxed text-zinc-500">
            Plataforma de inteligência e comparação para encontrar bebidas,
            analisar preços, monitorar ofertas, aplicar cupons e tomar melhores
            decisões de compra.
          </p>

          <div className="mt-7 flex gap-4">
            <SocialLink label="Instagram" icon={<Camera size={21} />} />
            <SocialLink label="TikTok" icon={<Music size={21} />} />
            <SocialLink label="WhatsApp" icon={<MessageCircle size={21} />} />
          </div>
        </div>

        <div>
          <p className="text-lg font-black text-zinc-950">
            Navegação
          </p>

          <div className="mt-5 grid gap-3 text-zinc-500">
            <FooterLink href="/" label="Home" />

            <FooterLink href="/ranking" label="Ranking" />

            <FooterLink href="/cupons" label="Cupons" />

            <FooterLink
              href="/assistente"
              label="Assistente"
              icon={<ChartNoAxesCombined size={17} />}
            />

            <FooterLink href="/como-funciona" label="Como funciona" />
          </div>
        </div>

        <div>
          <p className="text-lg font-black text-zinc-950">
            Categorias
          </p>

          <div className="mt-5 grid gap-3 text-zinc-500">
            <FooterLink
              href="/category/cervejas"
              label="Cervejas"
              icon={<Beer size={17} />}
            />

            <FooterLink
              href="/category/whiskies"
              label="Whiskies"
              icon={<GlassWater size={17} />}
            />

            <FooterLink
              href="/category/vodkas"
              label="Vodkas"
              icon={<GlassWater size={17} />}
            />

            <FooterLink
              href="/category/energeticos"
              label="Energéticos"
              icon={<Zap size={17} />}
            />
          </div>
        </div>

        <div>
          <p className="text-lg font-black text-zinc-950">
            Área pessoal
          </p>

          <div className="mt-5 grid gap-3 text-zinc-500">
            <FooterLink
              href="/login"
              label="Entrar"
              icon={<CircleUser size={17} />}
            />

            <FooterLink
              href="/favoritos"
              label="Favoritos"
              icon={<Heart size={17} />}
            />

            <FooterLink
              href="/alertas"
              label="Alertas"
              icon={<Bell size={17} />}
            />

            <FooterLink
              href="/revenda"
              label="Revenda"
              icon={<Store size={17} />}
            />

            <FooterLink
              href="/cupons"
              label="Cupons"
              icon={<Ticket size={17} />}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-[1760px] flex-col gap-4 px-6 py-6 text-sm font-bold text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 DrinkyOfertas. Todos os direitos reservados.</p>

          <p>Inteligência de compra aplicada ao mercado de bebidas.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 transition hover:text-red-700"
    >
      {icon}
      {label}
    </Link>
  );
}

function SocialLink({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 transition hover:bg-red-700 hover:text-white"
    >
      {icon}
    </a>
  );
}