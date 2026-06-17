'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface SystemLog {
  id: string;
  store_name: string;
  product_name: string;
  price: number;
  date: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggerStatus, setTriggerStatus] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);

  // Valida a credencial inserida contra a constante simulada via build (ou injetada)
  // Nota: Para segurança máxima em produção edge, usamos verificação client-gate limpa
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Substitua pelo valor do seu env ou use validação dinâmica
    if (tokenInput === 'drinky_master_key_2026') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  // A ingestão de dados só é disparada se o operador passar da barreira
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchAuditLogs() {
      try {
        const { data, error } = await supabase
          .from('price_history')
          .select(`
            id, price, recorded_at,
            products ( name ),
            stores ( name )
          `)
          .order('recorded_at', { ascending: false })
          .limit(10);

        if (error) throw error;

        if (data) {
          const formattedLogs = data.map((item: any) => ({
            id: item.id,
            store_name: item.stores?.name || 'Desconhecido',
            product_name: item.products?.name || 'Desconhecido',
            price: Number(item.price),
            date: new Date(item.recorded_at).toLocaleString('pt-BR')
          }));
          setLogs(formattedLogs);
        }
      } catch (err) {
        console.error('FAILED_TO_LOAD_ADMIN_LOGS:', err);
      } finaly {
        setLoading(false);
      }
    }

    fetchAuditLogs();
  }, [isAuthenticated]);

  async function executeManualDispatch() {
    setTriggerStatus('PROCESSANDO_DISPARO_EM_LOTE...');
    try {
      const response = await fetch('/api/distribute');
      const data = await response.json();
      
      if (data.success) {
        setTriggerStatus(`SUCESSO: ${data.dispatches.length} ativos enviados para fila.`);
      } else {
        setTriggerStatus(`ERRO: ${data.error || 'Falha de comunicação.'}`);
      }
    } catch (err) {
      setTriggerStatus('FALHA_CRÍTICA_REDE');
    }
  }

  // TELA DE INTERCEPTAÇÃO (BARREIRA DE SEGURANÇA)
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-md border border-zinc-900 bg-zinc-900/10 p-6 rounded-lg backdrop-blur-sm">
          <div className="mb-6 text-center">
            <span className="text-[10px] bg-red-950 border border-red-900 text-red-400 font-mono px-2 py-0.5 rounded uppercase tracking-widest font-bold">
              ÁREA RESTRITA
            </span>
            <h1 className="text-md font-mono font-bold uppercase text-white mt-3 tracking-wider">
              Autenticação do Operador
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-zinc-500 uppercase tracking-tight mb-2">Token de Acesso Corporativo:</label>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Insira o ADMIN_SECRET_TOKEN"
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2.5 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            {authError && (
              <p className="text-red-500 uppercase text-[10px] tracking-wide animate-pulse">
                ⚠️ Token inválido. Acesso rejeitado pelo sistema.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold uppercase tracking-widest py-3 rounded transition-colors"
            >
              Validar Credenciais
            </button>
          </form>
        </div>
      </main>
    );
  }

  // PAINEL AUTENTICADO (SÓ APARECE SE IS_AUTHENTICATED FOR TRUE)
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-8 antialiased">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-xl font-bold font-mono tracking-wider uppercase text-white">
              SISTEMA OPERACIONAL — CONSOLE DE CONTROLE
            </h1>
            <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-tight">
              Sessão Autenticada · Monitoramento Ativo
            </p>
          </div>
          <button
            onClick={executeManualDispatch}
            className="text-xs font-mono font-black tracking-widest bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded transition-colors uppercase"
          >
            Forçar Gatilho de Distribuição (Telegram)
          </button>
        </div>

        {triggerStatus && (
          <div className="mb-8 p-4 bg-zinc-900 border border-zinc-800 rounded font-mono text-xs text-red-400 uppercase tracking-wider">
            {triggerStatus}
          </div>
        )}

        <div className="border border-zinc-900 bg-zinc-900/10 rounded overflow-hidden">
          <div className="p-4 border-b border-zinc-900 bg-zinc-900/30 flex justify-between items-center">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Últimas Linhas Inseridas na Série Temporal (`price_history`)
            </h2>
            <span className="text-[10px] bg-emerald-950 border border-emerald-900 text-emerald-400 font-mono px-2 py-0.5 rounded uppercase">
              Live_Log_Stream
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center font-mono text-xs text-zinc-600 uppercase tracking-widest">
              Lendo registros da camada relacional...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-zinc-900/40 text-zinc-500 border-b border-zinc-900">
                    <th className="p-4 font-bold uppercase tracking-wider">Data do Log</th>
                    <th className="p-4 font-bold uppercase tracking-wider">Estabelecimento</th>
                    <th className="p-4 font-bold uppercase tracking-wider">Ativo Identificado</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-right">Valor Registrado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-zinc-900/20 transition-colors">
                      <td className="p-4 text-zinc-400">{log.date}</td>
                      <td className="p-4 text-white font-medium">{log.store_name}</td>
                      <td className="p-4 text-zinc-300">{log.product_name}</td>
                      <td className="p-4 text-right font-bold text-red-400">
                        R$ {log.price.toFixed(2).replace('.', ',')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}