import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Definição estrita das propriedades do Perfil Técnico
interface TechnicalProfile {
  volume: string;
  origin: string;
}

// Interface que espelha exatamente a estrutura de dados atual do nosso Supabase
interface MarketOffer {
  id: string;
  current_price: number;
  original_price: number;
  url: string;
  products: {
    name: string;
    subcategory: string;
    technical_profile: TechnicalProfile;
  };
  stores: {
    name: string;
  };
}

export async function GET(request: Request) {
  // 1. Captura das credenciais de automação do arquivo .env.local
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Alerta preventivo caso o operador esqueça de configurar as chaves de transmissão
  if (!botToken || !chatId) {
    return NextResponse.json({
      success: false,
      error: 'Variáveis de ambiente ausentes. Configure TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID.'
    }, { status: 500 });
  }

  try {
    // 2. Query Relacional Avançada unificando as tabelas estruturadas em UUID (CORRIGIDO PARA COMETÁRIO JS //)
    const { data: offers, error } = await supabase
      .from('offers')
      .select(`
        id, current_price, original_price, url,
        products ( name, subcategory, technical_profile ),
        stores ( name )
      `);

    if (error) throw error;
    if (!offers || offers.length === 0) {
      return NextResponse.json({ message: 'Nenhuma oferta ativa localizada no gôndola.' }, { status: 200 });
    }

    const typedOffers = offers as unknown as MarketOffer[];
    const dispatchResults = [];

    // 3. Processamento do lote de oportunidades por varredura matemática
    for (const offer of typedOffers) {
      const basePrice = Number(offer.current_price);
      const originalPrice = Number(offer.original_price);
      
      // Cálculo exato da porcentagem de desconto real
      const discountPercentage = ((originalPrice - basePrice) / originalPrice) * 100;

      // Gatilho de relevância: Só distribui se o desconto for real e maior ou igual a 12%
      if (discountPercentage >= 12) {
        
        // Formatação do payload de texto usando Markdown estrito do Telegram
        const messageText = [
          `🚨 *ALERTA DE OPORTUNIDADE CONFIGURADA* 🚨\n`,
          `🍻 *${offer.products.name.toUpperCase()}*`,
          `• 📐 Espec/Volume: ${offer.products.technical_profile?.volume || 'N/A'}`,
          `• 🏛️ Procedência: ${offer.products.technical_profile?.origin || 'N/A'}`,
          `• 🗂️ Segmento: ${offer.products.subcategory}\n`,
          `📉 *ÍNDICE DE PREÇOS:*`,
          `• Preço de Teto: ~R$ ${originalPrice.toFixed(2).replace('.', ',')}~`,
          `• *Preço de Gôndola: R$ ${basePrice.toFixed(2).replace('.', ',')}*`,
          `• 🔥 Assimetria: ${discountPercentage.toFixed(0)}% OFF\n`,
          `🛒 *Disponível em:* ${offer.stores.name}`,
          `📌 *Acesse o Hub para Comprar:* [Clique Aqui](${offer.url})\n`,
          `_Monitorado por DrinkyOfertas S.A._`
        ].join('\n');

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        try {
          // Executa a chamada HTTP real para os servidores do Telegram
          const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: 'Markdown',
              disable_web_page_preview: false
            })
          });

          const telegramData = await telegramResponse.json();

          dispatchResults.push({
            offer_id: offer.id,
            product: offer.products.name,
            sent: telegramData.ok,
            details: telegramData.ok ? 'Mensagem publicada.' : telegramData.description
          });
        } catch (teleErr: any) {
          dispatchResults.push({
            offer_id: offer.id,
            product: offer.products.name,
            sent: false,
            error: teleErr.message
          });
        }
      }
    }

    // Retorno analítico detalhado do lote que acabou de ser processado
    return NextResponse.json({
      success: true,
      executed_at: new Date().toISOString(),
      total_analyzed: typedOffers.length,
      dispatches: dispatchResults
    }, { status: 200 });

  } catch (err: any) {
    console.error('CRITICAL_API_ROUTE_ERROR:', err);
    return NextResponse.json({
      success: false,
      error: 'Falha crítica na rota interna do motor de distribuição.',
      details: err.message
    }, { status: 500 });
  }
}