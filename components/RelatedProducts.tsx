import OfferCard from "@/components/OfferCard";
import type { Offer } from "@/data/offers";

type RelatedProductsProps = {
  currentOffer: Offer;
  offers: Offer[];
};

export default function RelatedProducts({
  currentOffer,
  offers,
}: RelatedProductsProps) {
  const relatedOffers = offers
    .filter((offer) => {
      return (
        offer.category === currentOffer.category &&
        offer.slug !== currentOffer.slug
      );
    })
    .slice(0, 4);

  if (relatedOffers.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-8">
        <p className="font-black uppercase tracking-wide text-red-700">
          Produtos relacionados
        </p>

        <h2 className="mt-2 text-3xl font-black text-zinc-950">
          Você também pode gostar
        </h2>

        <p className="mt-3 max-w-2xl text-zinc-500">
          Outras ofertas parecidas para comparar antes de decidir onde comprar.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {relatedOffers.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </div>
    </section>
  );
}