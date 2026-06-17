export type OfferStatus = "active" | "expired";

export type CouponStatus = "active" | "expired" | "none";

export type MarketplaceOffer = {
  name: string;
  price: string;
  shipping: string;
  cashback: string;
  coupon: string;
  paymentMethod: string;
  affiliateUrl: string;
};

export type PriceHistoryItem = {
  date: string;
  price: number;
};

export type Review = {
  user: string;
  rating: number;
  comment: string;
  date: string;
};

export type Offer = {
  slug: string;
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  store: string;
  imageUrl: string;
  imageSourceUrl: string;
  cachedImageUrl: string;
  affiliateUrl: string;
  paymentMethod: string;
  installments: string;
  cashback: string;
  shipping: string;
  coupon: string;
  couponStatus: CouponStatus;
  validUntil: string;
  status: OfferStatus;
  context: string;
  description: string;
  category: string;
  marketplaces: MarketplaceOffer[];
  priceHistory: PriceHistoryItem[];
  reviews: Review[];
};

function generatePriceHistory(start: number, end: number): PriceHistoryItem[] {
  return [
    { date: "01/05", price: start },
    { date: "05/05", price: start - (start - end) * 0.2 },
    { date: "10/05", price: start - (start - end) * 0.4 },
    { date: "15/05", price: start - (start - end) * 0.6 },
    { date: "20/05", price: start - (start - end) * 0.8 },
    { date: "25/05", price: end },
  ];
}

export const offers: Offer[] = [
  {
    slug: "heineken-lata",
    title: "Cerveja Heineken Lata 350ml",
    price: "R$ 2,79",
    oldPrice: "R$ 3,59",
    discount: "-23%",
    store: "Amazon",
    imageUrl:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://www.amazon.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://www.amazon.com.br/",
    paymentMethod: "PIX",
    installments: "ou 3x de R$ 0,93",
    cashback: "3% cashback",
    shipping: "Frete grátis",
    coupon: "HEINEKEN10",
    couponStatus: "active",
    validUntil: "Hoje às 23:59",
    status: "active",
    context: "🍻 Ideal para churrasco de fim de semana",
    description:
      "Oferta selecionada para quem quer economizar em bebidas para churrasco.",
    category: "cervejas",
    marketplaces: [
      {
        name: "Amazon",
        price: "R$ 2,79",
        shipping: "Frete grátis",
        cashback: "3% cashback",
        coupon: "HEINEKEN10",
        paymentMethod: "PIX",
        affiliateUrl: "https://www.amazon.com.br/",
      },
      {
        name: "Shopee",
        price: "R$ 2,99",
        shipping: "Frete grátis",
        cashback: "4% cashback",
        coupon: "SHOPEE10",
        paymentMethod: "PIX",
        affiliateUrl: "https://shopee.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(3.99, 2.79),
    reviews: [
      {
        user: "Carlos",
        rating: 5,
        comment: "Excelente preço para churrasco. Cupom funcionou certinho.",
        date: "2 dias atrás",
      },
      {
        user: "Fernanda",
        rating: 4,
        comment: "Boa oferta, principalmente com frete grátis.",
        date: "5 dias atrás",
      },
    ],
  },
  {
    slug: "budweiser-long-neck",
    title: "Cerveja Budweiser Long Neck 330ml",
    price: "R$ 3,49",
    oldPrice: "R$ 4,49",
    discount: "-22%",
    store: "Mercado Livre",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://www.mercadolivre.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://www.mercadolivre.com.br/",
    paymentMethod: "Cartão",
    installments: "ou 2x de R$ 1,74",
    cashback: "2% cashback",
    shipping: "Entrega rápida",
    coupon: "BUD10",
    couponStatus: "active",
    validUntil: "Hoje às 22:00",
    status: "active",
    context: "🍺 Ótima para resenhas",
    description: "Budweiser com ótimo custo-benefício para festas e encontros.",
    category: "cervejas",
    marketplaces: [
      {
        name: "Mercado Livre",
        price: "R$ 3,49",
        shipping: "Entrega rápida",
        cashback: "2% cashback",
        coupon: "BUD10",
        paymentMethod: "Cartão",
        affiliateUrl: "https://www.mercadolivre.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(4.99, 3.49),
    reviews: [
      {
        user: "Rafael",
        rating: 4,
        comment: "Boa long neck para levar em festa.",
        date: "3 dias atrás",
      },
    ],
  },
  {
    slug: "corona-extra",
    title: "Cerveja Corona Extra 330ml",
    price: "R$ 4,99",
    oldPrice: "R$ 6,49",
    discount: "-20%",
    store: "Shopee",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://shopee.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://shopee.com.br/",
    paymentMethod: "PIX",
    installments: "ou 3x de R$ 1,66",
    cashback: "5% cashback",
    shipping: "Frete grátis",
    coupon: "CORONA15",
    couponStatus: "active",
    validUntil: "Hoje às 20:00",
    status: "active",
    context: "🏖️ Perfeita para finais de semana",
    description: "Corona Extra gelada com preço promocional.",
    category: "cervejas",
    marketplaces: [
      {
        name: "Shopee",
        price: "R$ 4,99",
        shipping: "Frete grátis",
        cashback: "5% cashback",
        coupon: "CORONA15",
        paymentMethod: "PIX",
        affiliateUrl: "https://shopee.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(6.99, 4.99),
    reviews: [
      {
        user: "Bianca",
        rating: 5,
        comment: "Preço bom para comprar em quantidade.",
        date: "1 semana atrás",
      },
    ],
  },
  {
    slug: "red-label",
    title: "Whisky Johnnie Walker Red Label 1L",
    price: "R$ 89,90",
    oldPrice: "R$ 109,90",
    discount: "-18%",
    store: "Mercado Livre",
    imageUrl:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://www.mercadolivre.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://www.mercadolivre.com.br/",
    paymentMethod: "Cartão",
    installments: "ou 10x de R$ 8,99",
    cashback: "5% cashback",
    shipping: "Frete grátis",
    coupon: "REDLABEL15",
    couponStatus: "active",
    validUntil: "Amanhã às 12:00",
    status: "active",
    context: "🥃 Perfeito para festas e resenhas",
    description: "Whisky Red Label com ótimo desconto.",
    category: "whiskies",
    marketplaces: [
      {
        name: "Mercado Livre",
        price: "R$ 89,90",
        shipping: "Frete grátis",
        cashback: "5% cashback",
        coupon: "REDLABEL15",
        paymentMethod: "Cartão",
        affiliateUrl: "https://www.mercadolivre.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(109.9, 89.9),
    reviews: [
      {
        user: "André",
        rating: 5,
        comment: "Preço excelente para festa.",
        date: "4 dias atrás",
      },
    ],
  },
  {
    slug: "jack-daniels",
    title: "Whisky Jack Daniel's 1L",
    price: "R$ 119,90",
    oldPrice: "R$ 139,90",
    discount: "-14%",
    store: "Amazon",
    imageUrl:
      "https://images.unsplash.com/photo-1582819509237-d4b3b1d2c1f3?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://www.amazon.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://www.amazon.com.br/",
    paymentMethod: "PIX",
    installments: "ou 12x de R$ 9,99",
    cashback: "4% cashback",
    shipping: "Frete grátis",
    coupon: "JACK10",
    couponStatus: "active",
    validUntil: "Hoje às 23:59",
    status: "active",
    context: "🔥 Whisky premium para eventos",
    description: "Jack Daniel's com preço promocional para festas.",
    category: "whiskies",
    marketplaces: [
      {
        name: "Amazon",
        price: "R$ 119,90",
        shipping: "Frete grátis",
        cashback: "4% cashback",
        coupon: "JACK10",
        paymentMethod: "PIX",
        affiliateUrl: "https://www.amazon.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(149.9, 119.9),
    reviews: [
      {
        user: "Lucas",
        rating: 4,
        comment: "Boa promoção, valeu pelo cashback.",
        date: "6 dias atrás",
      },
    ],
  },
  {
    slug: "absolut-vodka",
    title: "Vodka Absolut 1L",
    price: "R$ 69,90",
    oldPrice: "R$ 82,90",
    discount: "-15%",
    store: "Shopee",
    imageUrl:
      "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://shopee.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://shopee.com.br/",
    paymentMethod: "PIX",
    installments: "ou 8x de R$ 8,73",
    cashback: "4% cashback",
    shipping: "Entrega rápida",
    coupon: "ABSOLUT10",
    couponStatus: "active",
    validUntil: "Hoje às 20:00",
    status: "active",
    context: "🍸 Ótima para drinks",
    description: "Vodka Absolut ideal para open bar e festas.",
    category: "vodkas",
    marketplaces: [
      {
        name: "Shopee",
        price: "R$ 69,90",
        shipping: "Entrega rápida",
        cashback: "4% cashback",
        coupon: "ABSOLUT10",
        paymentMethod: "PIX",
        affiliateUrl: "https://shopee.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(82.9, 69.9),
    reviews: [
      {
        user: "Marina",
        rating: 5,
        comment: "Ótima para drinks, preço justo.",
        date: "2 dias atrás",
      },
    ],
  },
  {
    slug: "smirnoff-vodka",
    title: "Vodka Smirnoff 998ml",
    price: "R$ 39,90",
    oldPrice: "R$ 49,90",
    discount: "-20%",
    store: "Amazon",
    imageUrl:
      "https://images.unsplash.com/photo-1607622750671-6cd9a99f4c14?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://www.amazon.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://www.amazon.com.br/",
    paymentMethod: "PIX",
    installments: "ou 4x de R$ 9,97",
    cashback: "2% cashback",
    shipping: "Frete grátis",
    coupon: "SMIRNOFF",
    couponStatus: "active",
    validUntil: "Hoje às 21:00",
    status: "active",
    context: "🍹 Excelente para drinks",
    description: "Smirnoff com ótimo custo-benefício.",
    category: "vodkas",
    marketplaces: [
      {
        name: "Amazon",
        price: "R$ 39,90",
        shipping: "Frete grátis",
        cashback: "2% cashback",
        coupon: "SMIRNOFF",
        paymentMethod: "PIX",
        affiliateUrl: "https://www.amazon.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(54.9, 39.9),
    reviews: [
      {
        user: "João",
        rating: 4,
        comment: "Boa opção econômica para resenha.",
        date: "1 dia atrás",
      },
    ],
  },
  {
    slug: "red-bull",
    title: "Energético Red Bull 250ml",
    price: "R$ 6,49",
    oldPrice: "R$ 8,49",
    discount: "-24%",
    store: "Amazon",
    imageUrl:
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://www.amazon.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://www.amazon.com.br/",
    paymentMethod: "PIX",
    installments: "ou 2x de R$ 3,24",
    cashback: "2% cashback",
    shipping: "Frete grátis",
    coupon: "Nenhum",
    couponStatus: "none",
    validUntil: "Oferta relâmpago",
    status: "active",
    context: "⚡ Energia extra para festas",
    description: "Red Bull com desconto especial.",
    category: "energeticos",
    marketplaces: [
      {
        name: "Amazon",
        price: "R$ 6,49",
        shipping: "Frete grátis",
        cashback: "2% cashback",
        coupon: "Nenhum",
        paymentMethod: "PIX",
        affiliateUrl: "https://www.amazon.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(8.49, 6.49),
    reviews: [
      {
        user: "Thiago",
        rating: 5,
        comment: "Preço bom para comprar várias unidades.",
        date: "3 dias atrás",
      },
    ],
  },
  {
    slug: "monster-energy",
    title: "Energético Monster Energy 473ml",
    price: "R$ 8,99",
    oldPrice: "R$ 11,99",
    discount: "-25%",
    store: "Shopee",
    imageUrl:
      "https://images.unsplash.com/photo-1577801595093-30f1fd4e7f8f?q=80&w=900&auto=format&fit=crop",
    imageSourceUrl: "https://shopee.com.br/",
    cachedImageUrl: "",
    affiliateUrl: "https://shopee.com.br/",
    paymentMethod: "PIX",
    installments: "ou 3x de R$ 2,99",
    cashback: "4% cashback",
    shipping: "Frete grátis",
    coupon: "MONSTER10",
    couponStatus: "active",
    validUntil: "Hoje às 22:00",
    status: "active",
    context: "⚡ Ideal para eventos e games",
    description: "Monster Energy com preço promocional.",
    category: "energeticos",
    marketplaces: [
      {
        name: "Shopee",
        price: "R$ 8,99",
        shipping: "Frete grátis",
        cashback: "4% cashback",
        coupon: "MONSTER10",
        paymentMethod: "PIX",
        affiliateUrl: "https://shopee.com.br/",
      },
    ],
    priceHistory: generatePriceHistory(11.99, 8.99),
    reviews: [
      {
        user: "Paulo",
        rating: 4,
        comment: "Boa promoção para energético grande.",
        date: "5 dias atrás",
      },
    ],
  },
];