export function buildStoreSearchUrl(store: string, searchTerm: string) {
  const encodedSearch = encodeURIComponent(searchTerm);

  const normalizedStore = store.toLowerCase();

  if (normalizedStore.includes("amazon")) {
    return `https://www.amazon.com.br/s?k=${encodedSearch}`;
  }

  if (
    normalizedStore.includes("mercado livre") ||
    normalizedStore.includes("mercadolivre")
  ) {
    return `https://lista.mercadolivre.com.br/${encodedSearch}`;
  }

  if (normalizedStore.includes("shopee")) {
    return `https://shopee.com.br/search?keyword=${encodedSearch}`;
  }

  return `https://www.google.com/search?q=${encodedSearch}`;
}