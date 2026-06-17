import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Resgatando as credenciais de segurança configuradas no arquivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificação de Segurança de Arquitetura: 
// Se por acaso as chaves não existirem no .env.local, o sistema evita falhas silenciosas e alerta o desenvolvedor.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Erro Crítico de Infraestrutura: Faltam as variáveis de ambiente do Supabase no arquivo .env.local');
}

/**
 * INSTÂNCIA CLIENTE SINGLETON DO SUPABASE
 * Este é o ponto único de contato do DrinkyOfertas com o banco de dados PostgreSQL.
 * Ele herda as tipagens estáticas do contrato de dados <Database> para dar suporte a buscas inteligentes.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);