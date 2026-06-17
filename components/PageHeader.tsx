import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
  title?: string;
};

export default function PageHeader({
  title = "DrinkyOfertas",
}: PageHeaderProps) {
  return (
    <section className="border-b border-zinc-200 bg-[#f5f5f5]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-black text-zinc-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          <ArrowLeft size={16} strokeWidth={2.6} />
          Voltar
        </Link>

        <span className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">
          {title}
        </span>
      </div>
    </section>
  );
}