import { Star } from "lucide-react";

type Review = {
  user: string;
  rating: number;
  comment: string;
};

type ReviewsSectionProps = {
  reviews?: Review[];
};

export default function ReviewsSection({
  reviews = [],
}: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <section className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-black text-zinc-950">
          Avaliações
        </h2>

        <p className="mt-4 text-zinc-500">
          Ainda não existem avaliações para esta oferta.
        </p>
      </section>
    );
  }

  const average =
    reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    ) / reviews.length;

  return (
    <section className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 border-b border-zinc-200 pb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black uppercase tracking-wide text-red-700">
            Reviews
          </p>

          <h2 className="mt-2 text-4xl font-black text-zinc-950">
            Avaliações da oferta
          </h2>
        </div>

        <div className="flex items-center gap-4 rounded-3xl bg-zinc-100 px-6 py-4">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star
              size={22}
              fill="currentColor"
              strokeWidth={2.5}
            />

            <span className="text-2xl font-black text-zinc-950">
              {average.toFixed(1)}
            </span>
          </div>

          <p className="font-bold text-zinc-500">
            {reviews.length} avaliação(ões)
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {reviews.map((review, index) => (
          <article
            key={index}
            className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-black text-zinc-950">
                {review.user}
              </p>

              <div className="flex items-center gap-1">
                {Array.from({
                  length: review.rating,
                }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={16}
                    fill="currentColor"
                    className="text-yellow-500"
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 leading-relaxed text-zinc-500">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}