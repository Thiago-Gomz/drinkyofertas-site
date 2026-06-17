"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  LoaderCircle,
  Search,
  Ticket,
} from "lucide-react";

type CopyAndOpenButtonProps = {
  url: string;
  coupon?: string;
  label?: string;
  className?: string;
};

export default function CopyAndOpenButton({
  url,
  coupon,
  label,
  className,
}: CopyAndOpenButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const normalizedCoupon = coupon?.trim().toLowerCase();

  const hasValidCoupon =
    normalizedCoupon &&
    normalizedCoupon !== "nenhum" &&
    normalizedCoupon !== "sem cupom";

  async function handleClick() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (hasValidCoupon && coupon) {
        try {
          await navigator.clipboard.writeText(coupon);

          setIsCopied(true);

          setTimeout(() => {
            setIsCopied(false);
          }, 2200);
        } catch {
          console.warn("Clipboard bloqueado pelo navegador.");
        }
      }

      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");

        setIsLoading(false);
      }, 350);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  }

  function renderIcon() {
    if (isLoading) {
      return (
        <LoaderCircle
          size={18}
          strokeWidth={2.5}
          className="animate-spin"
        />
      );
    }

    if (isCopied) {
      return <Check size={18} strokeWidth={2.8} />;
    }

    if (hasValidCoupon) {
      return <Ticket size={18} strokeWidth={2.5} />;
    }

    return <Search size={18} strokeWidth={2.5} />;
  }

  function renderText() {
    if (isLoading) {
      return "Abrindo loja...";
    }

    if (isCopied) {
      return "Cupom copiado";
    }

    if (label) {
      return label;
    }

    if (hasValidCoupon) {
      return "Copiar cupom e buscar";
    }

    return "Buscar produto";
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`group relative overflow-hidden transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80 ${className}`}
    >
      <div className="absolute inset-0 bg-white/0 transition duration-300 group-hover:bg-white/5" />

      <div className="relative flex items-center justify-center gap-2">
        {renderIcon()}

        <span>{renderText()}</span>

        {!isLoading && !isCopied && (
          <ExternalLink
            size={16}
            strokeWidth={2.5}
            className="opacity-80"
          />
        )}
      </div>
    </button>
  );
}