import type { MetadataRoute } from "next";

import { offers } from "@/data/offers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drinkyofertas.com.br";

  const staticRoutes = [
    "",
    "/cupons",
    "/ranking",
    "/assistente",
    "/favoritos",
    "/alertas",
    "/revenda",
    "/como-funciona",
    "/category/cervejas",
    "/category/whiskies",
    "/category/vodkas",
    "/category/energeticos",
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const offerPages = offers.map((offer) => ({
    url: `${baseUrl}/offer/${offer.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...offerPages];
}