import React from 'react';
import { supabase } from '@/lib/supabase';
import MatchSelector from '@/components/MatchSelector';

// Interface para tipagem estrita das ofertas do feed geral
interface FeedOffer {
  id: string;
  current_price: number;
  original_price: number;
  url: string;
  products: {
    name: string;
    subcategory: string;
    image_url: string;
  };
  stores: {
    name: string;
  };
}

// Rota dinâmica que busca dados atualizados diretamente no banco de dados
export const revalidate = 60; // Revalida o cache a cada 60 segundos

export default async function HomePage() {
  // Coleta as ofertas diretamente no servidor (Server Component)
  const { data: offers } = await supabase
    .from('offers')
    .select(`
      id, current_price, original_price, url,
      products ( name, subcategory, image_url ),
      stores ( name )
    `)
    .order('updated_at', { ascending: false });

  const feedOffers = (offers || []) as unknown as FeedOffer[];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 sm:p-12 antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO / HEADER DA HOME */}
        <div className="border-b border-zinc-900 pb-8 mb-12">
          <span className="text-[10px] font-mono font-bold tracking-widest bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded uppercase">
            Radar de Assimetrias v2.6
          </span>
          <h1 className="text-3xl font-black font-mono tracking-tight text-white mt-4 uppercase">
            DRINKY_OFERTAS
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl">
            O menor preço de gôndola indexado em tempo real. Rastreamento inteligente de frete, telemetria sensorial e inteligência de mercado de bebidas.
          </p>
        </div>

        {/* COMPONENTE INTERATIVO DE MATCH SENSORIAL (File: components/MatchSelector.tsx) */}
        <MatchSelector />

        {/* FEED GERAL DE OFERTAS ATIVAS */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Painel Geral de Ofertas Ativas no Mercado
            </h2>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedOffers.map((offer) => {
              const discount = ((Number(offer.original_price) - Number(offer.current_price)) / Number(offer.original_price)) * 100;
              
              return (
                <div key={offer.id} className="bg-zinc-900/20 border border-zinc-900 rounded overflow-hidden flex flex-col justify-between p-4">
                  <div>
                    {offer.products.image_url && (
                      <img
                        src={offer.products.image_url}
                        alt={offer.products.name}
                        className="w-full h-48 object-cover rounded bg-zinc-950 border border-zinc-900 mb-4"
                      />
                    )}
                    <span className="text-[9px] font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">
                      {offer.products.subcategory}
                    </span>
                    <h3 className="text-md font-bold text-white mt-2 font-mono line-clamp-2">
                      {offer.products.name}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900">
                    <div className="flex justify-between items-baseline mb-2">
                      <p className="text-xs font-mono text-zinc-500 line-through">
                        R$ {Number(offer.original_price).toFixed(2).replace('.', ',')}
                      </p>
                      {discount >= 10 && (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 border border-emerald-900/30 rounded">
                          -{discount.toFixed(0)}%
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-black text-white font-mono">
                        R$ {Number(offer.current_price).toFixed(2).replace('.', ',')}
                      </p>
                      <span className="text-[11px] font-mono text-zinc-400">
                        em {offer.stores.name}
                      </span>
                    </div>

                    <a
                      href={offer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-mono font-bold text-xs uppercase tracking-widest p-2.5 rounded mt-4 transition-colors"
                    >
                      Ir para Loja
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {feedOffers.length === 0 && (
            <div className="text-center py-16 border border-dashed border-zinc-900 rounded font-mono text-xs text-zinc-600 uppercase tracking-widest">
              Aguardando primeira ingestão de mercado...
            </div>
          )}
        </div>

      </div>
    </main>
  );
}