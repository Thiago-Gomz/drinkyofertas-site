import Link from "next/link";
import { Beer, GlassWater, Martini, Zap, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Cervejas",
    icon: Beer,
    slug: "cervejas",
    description: "Churrasco e resenha",
  },
  {
    name: "Whiskies",
    icon: GlassWater,
    slug: "whiskies",
    description: "Festas e presentes",
  },
  {
    name: "Vodkas",
    icon: Martini,
    slug: "vodkas",
    description: "Drinks e open bar",
  },
  {
    name: "Energéticos",
    icon: Zap,
    slug: "energeticos",
    description: "Festa e rotina",
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-[#f5f5f5] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="font-black uppercase tracking-wide text-red-700">
            Categorias
          </p>

          <h2 className="mt-2 text-4xl font-black text-zinc-950 md:text-5xl">
            Compre por tipo de bebida
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-700 transition group-hover:bg-red-700 group-hover:text-white">
                  <Icon size={36} strokeWidth={2} />
                </div>

                <h3 className="mt-8 text-3xl font-black text-zinc-950">
                  {category.name}
                </h3>

                <p className="mt-3 font-bold text-zinc-500">
                  {category.description}
                </p>

                <div className="mt-8 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-700 transition group-hover:bg-red-700 group-hover:text-white">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}