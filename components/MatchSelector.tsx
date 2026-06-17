'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface MatchedProduct {
  id: string;
  name: string;
  subcategory: string;
  image_url: string;
  pairing_notes: string[];
  offers: {
    current_price: number;
    stores: { name: string };
  }[];
}

export default function MatchSelector() {
  const [dishInput, setDishInput] = useState('');
  const [results, setResults] = useState<MatchedProduct[]>([]);
  const [searching, setSearching] = useState(false);

  async function executeSensoryMatch(e: React.FormEvent) {
    e.preventDefault();
    if (!dishInput.trim()) return;

    setSearching(true);
    try {
      // Executa a busca utilizando o operador de busca textual em português
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, name, subcategory, image_url, pairing_notes,
          offers (
            current_price,
            stores ( name )
          )
        `)
        .textSearch('pairing_notes' as any, dishInput, { config: 'portuguese' });

      if (error) {
        // Fallback dinâmico caso o textSearch estrito encontre restrições de índice
        const { data: fallbackData } = await supabase
          .from('products')
          .select('id, name, subcategory, image_url, pairing_notes, offers(current_price, stores(name))');
        
        if (fallbackData) {
          const filtered = fallbackData.filter((p: any) =>
            p.pairing_notes?.some((note: string) => 
              note.toLowerCase().includes(dishInput.toLowerCase())
            )
          );
          setResults(filtered as any);
          return;
        }
        throw error;
      }

      if (data) setResults(data as unknown as MatchedProduct[]);
    } catch (err) {
      console.error('SENSORY_MATCH_FAILURE:', err);
    } finally {
      // CORRIGIDO: Palavra reservada estruturada corretamente com dois 'l's
      setSearching(false);
    }
  }

  return (
    <div className="w-full bg-zinc-900/30 border border-zinc-900 rounded p-6 mb-12">
      <div className="mb-6">
        <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
          Mecanismo de Match Organoléptico
        </h3>
        <p className="text-xl font-bold text-white mt-1">
          O que vai comer hoje? Escolhemos a melhor combinação pelo menor preço.
        </p>
      </div>

      {/* FORMULÁRIO DE ENTRADA */}
      <form onSubmit={executeSensoryMatch} className="flex gap-2 max-w-2xl">
        <input
          type="text"
          placeholder="Ex: Churrasco, Comida Mexicana, Chocolate Amargo..."
          value={dishInput}
          onChange={(e) => setDishInput(e.target.value)}
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-600 font-mono"
        />
        <button
          type="submit"
          disabled={searching}
          className="bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 rounded transition-colors"
        >
          {searching ? 'Buscando...' : 'Buscar Match'}
        </button>
      </form>

      {/* RENDERIZAÇÃO DOS RESULTADOS ENCONTRADOS */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-900">
          {results.map((product) => {
            const bestOffer = product.offers?.[0];
            return (
              <div key={product.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded flex gap-4 items-center">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded bg-zinc-900 border border-zinc-800"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-zinc-900 text-zinc-400 rounded border border-zinc-800">
                    {product.subcategory}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate mt-2">{product.name}</h4>
                  
                  {bestOffer ? (
                    <p className="text-xs text-zinc-400 mt-1 font-mono">
                      A partir de <span className="text-red-400 font-bold">R$ {Number(bestOffer.current_price).toFixed(2).replace('.', ',')}</span> em {bestOffer.stores?.name}
                    </p>
                  ) : (
                    <p className="text-xs text-zinc-600 mt-1 font-mono">Indisponível em gôndola</p>
                  )}

                  {/* Exibição das Tags Cadastradas no Banco */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.pairing_notes.map((note, index) => (
                      <span key={index} className="text-[9px] font-mono text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded">
                        #{note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {results.length === 0 && dishInput && !searching && (
        <p className="text-xs font-mono text-zinc-600 mt-4 uppercase">
          Nenhuma bebida combinada para este prato no catálogo ativo.
        </p>
      )}
    </div>
  );
}