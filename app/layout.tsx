import React from 'react';
import '@/app/globals.css'; // Garante o carregamento dos estilos globais do Tailwind

export const metadata = {
  title: 'DrinkyOfertas — Monitor de Assimetrias',
  description: 'O menor preço de gôndola indexado em tempo real com telemetria sensorial.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="bg-zinc-950">
      <body className="antialiased bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}