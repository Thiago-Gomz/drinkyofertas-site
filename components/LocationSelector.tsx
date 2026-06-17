'use client';

import React, { useState, useEffect } from 'react';

interface ViaCepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export function LocationSelector() {
  const [cep, setCep] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resolvedLocation, setResolvedLocation] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Hidratação inicial: Busca se o usuário já possui um CEP salvo no navegador
  useEffect(() => {
    const savedLocation = localStorage.getItem('drinky_resolved_location');
    const savedCep = localStorage.getItem('drinky_user_cep');
    if (savedLocation && savedCep) {
      setResolvedLocation(savedLocation);
      setCep(savedCep);
    }
  }, []);

  // Máscara estrita para o padrão de entrada do CEP (00000-000)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length <= 8) {
      const formatted = rawValue.length > 5 
        ? `${rawValue.slice(0, 5)}-${rawValue.slice(5)}` 
        : rawValue;
      setCep(formatted);
      setErrorMessage('');
    }
  };

  const executeLogisticsResolution = async () => {
    const sanitizedCep = cep.replace(/\D/g, '');
    
    if (sanitizedCep.length !== 8) {
      setErrorMessage('Padrão inválido');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);
      const data: ViaCepData = await response.json();

      if (data.erro) {
        setErrorMessage('Não localizado');
        setResolvedLocation('');
        localStorage.removeItem('drinky_user_cep');
        localStorage.removeItem('drinky_resolved_location');
      } else {
        const locationString = `${data.localidade} • ${data.uf}`;
        setResolvedLocation(locationString);
        
        // Persistência em LocalStorage conforme especificado no Documento Mestre
        localStorage.setItem('drinky_user_cep', sanitizedCep);
        localStorage.setItem('drinky_resolved_location', locationString);
        
        // Dispara um evento global para notificar a HomePage que a localização mudou
        window.dispatchEvent(new Event('drinky_location_updated'));
      }
    } catch (error) {
      setErrorMessage('Falha na conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1 font-mono">
      <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded border border-zinc-800">
        
        {/* Indicador de Status Geográfico */}
        {resolvedLocation && !loading && (
          <span className="text-[10px] text-zinc-400 px-2 font-sans font-medium max-w-[180px] truncate">
            {resolvedLocation}
          </span>
        )}

        <input
          type="text"
          value={cep}
          onChange={handleInputChange}
          placeholder="00000-000"
          disabled={loading}
          className="bg-zinc-950 text-white placeholder-zinc-600 px-3 py-1.5 rounded text-xs w-28 font-mono tracking-widest focus:outline-none focus:border-zinc-700 border border-transparent disabled:opacity-50"
        />

        <button
          onClick={executeLogisticsResolution}
          disabled={loading || !cep}
          className="bg-zinc-100 hover:bg-white text-zinc-950 text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider transition-colors disabled:opacity-30 flex items-center justify-center min-w-[70px]"
        >
          {loading ? 'Process...' : 'Validar'}
        </button>
      </div>
      
      {/* Mensagens de Erro de Engenharia Logística */}
      {errorMessage && (
        <span className="text-[9px] text-red-500 uppercase tracking-wider font-bold px-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}