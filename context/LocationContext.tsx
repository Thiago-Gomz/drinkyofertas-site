'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserLocation, LocationContextType, ViaCepResponse } from '@/types/location';

// Criamos o espaço de memória que vai guardar e distribuir as informações de CEP pelo site
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Nome da "etiqueta" que usaremos para salvar o CEP na memória do navegador do usuário
const LOCAL_STORAGE_KEY = 'drinkyofertas:location';

export function LocationProvider({ children }: { children: ReactNode }) {
  // Criando os estados (as memórias voláteis) do nosso motor de localização
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Este bloco roda AUTOMATICAMENTE assim que o usuário abre o site
  // Ele vai lá na memória do navegador (localStorage) ver se o usuário já digitou o CEP antes
  useEffect(() => {
    try {
      const storedLocation = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedLocation) {
        // Se achou o CEP antigo, coloca ele ativo no site
        setLocation(JSON.parse(storedLocation));
      }
    } catch (e) {
      console.error('Erro ao ler a localização guardada no navegador:', e);
    } finally {
      // Terminou de procurar na memória? Desliga o efeito de "carregando"
      setIsLoading(false);
    }
  }, []);

  // Esta é a função principal: ela recebe o CEP, limpa ele e vai buscar na internet os dados reais
  const updateLocationByCep = async (rawCep: string): Promise<boolean> => {
    setIsLoading(true); // Liga o sinal de "carregando" no site
    setError(null);      // Limpa qualquer erro antigo da tela

    // Deixa apenas os números do CEP, eliminando traços ou espaços digitados errados
    const cleanedCep = rawCep.replace(/\D/g, '');

    // Validação básica brasileira: todo CEP precisa ter exatamente 8 números
    if (cleanedCep.length !== 8) {
      setError('Formato de CEP inválido. O CEP deve conter exatamente 8 números.');
      setIsLoading(false);
      return false;
    }

    try {
      // Fazemos a chamada real para a API do ViaCEP na internet
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      
      if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor dos Correios/ViaCEP.');
      }

      const data: ViaCepResponse = await response.json();

      // O ViaCEP não dá erro de conexão se o CEP não existir, ele nos envia uma propriedade "erro: true"
      if (data.erro) {
        setError('O CEP digitado não foi encontrado na base de dados nacional.');
        setIsLoading(false);
        return false;
      }

      // Montamos o objeto de localização estruturado exatamente como exigido pela nossa tipagem corporativa
      const newLocation: UserLocation = {
        cep: data.cep,
        city: data.localidade,
        state: data.uf,
        neighborhood: data.bairro,
        street: data.logradouro,
        updatedAt: new Date().toISOString(),
        method: 'manual',
      };

      // Grava o endereço na memória do site para os componentes usarem agora
      setLocation(newLocation);
      // Grava o endereço na memória do navegador para o usuário não ter que digitar de novo amanhã
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocation));
      
      setIsLoading(false);
      return true; // Sucesso absoluto!
    } catch (err) {
      console.error('Erro crítico na requisição de localização:', err);
      setError('Serviço de CEP indisponível no momento. Por favor, tente novamente.');
      setIsLoading(false);
      return false;
    }
  };

  // Função para quando o usuário quiser limpar o CEP ou mudar de cidade
  const clearLocation = () => {
    setLocation(null);
    setError(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Apaga da memória do navegador
  };

  return (
    // Distribuímos as variáveis e funções para que QUALQUER botão ou tela do site possa usar
    <LocationContext.Provider value={{ location, isLoading, error, updateLocationByCep, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

// Este é o gancho (hook) que os programadores usam para pegar a localização de forma simples
export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation deve ser obrigatoriamente utilizado dentro de um LocationProvider');
  }
  return context;
}