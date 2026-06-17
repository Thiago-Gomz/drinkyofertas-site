"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing, Check, LoaderCircle } from "lucide-react";

type PriceAlertButtonProps = {
  slug: string;
  title: string;
};

export default function PriceAlertButton({
  slug,
  title,
}: PriceAlertButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [justActivated, setJustActivated] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const storedAlerts = localStorage.getItem("price-alerts");

      if (!storedAlerts) {
        return;
      }

      const parsedAlerts = JSON.parse(storedAlerts);

      if (
        Array.isArray(parsedAlerts) &&
        parsedAlerts.includes(slug)
      ) {
        setIsActive(true);
      }
    } catch {
      console.warn("Erro ao carregar alertas.");
    }
  }, [slug]);

  function handleToggleAlert() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const storedAlerts = localStorage.getItem("price-alerts");

      let alerts: string[] = [];

      if (storedAlerts) {
        const parsedAlerts = JSON.parse(storedAlerts);

        if (Array.isArray(parsedAlerts)) {
          alerts = parsedAlerts;
        }
      }

      let updatedAlerts: string[];

      if (alerts.includes(slug)) {
        updatedAlerts = alerts.filter(
          (alertSlug) => alertSlug !== slug
        );

        setIsActive(false);
      } else {
        updatedAlerts = [...alerts, slug];

        setIsActive(true);
        setJustActivated(true);

        setTimeout(() => {
          setJustActivated(false);
        }, 2200);
      }

      localStorage.setItem(
        "price-alerts",
        JSON.stringify(updatedAlerts)
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 350);
    } catch {
      console.warn("Erro ao salvar alerta.");

      setIsLoading(false);
    }
  }

  function renderIcon() {
    if (isLoading) {
      return (
        <LoaderCircle
          size={20}
          strokeWidth={2.5}
          className="animate-spin"
        />
      );
    }

    if (justActivated) {
      return <Check size={20} strokeWidth={2.8} />;
    }

    if (isActive) {
      return <BellRing size={20} strokeWidth={2.5} />;
    }

    return <Bell size={20} strokeWidth={2.5} />;
  }

  function renderText() {
    if (isLoading) {
      return "Atualizando alerta...";
    }

    if (justActivated) {
      return "Alerta ativado";
    }

    if (isActive) {
      return "Monitorando preço";
    }

    return "Me avise quando baixar";
  }

  if (!mounted) {
    return (
      <div className="mt-4 h-14 w-full rounded-3xl bg-zinc-200 animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggleAlert}
      className={`mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-3xl border text-sm font-black transition-all duration-300 ${
        isActive
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border-zinc-200 bg-white text-zinc-950 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
      }`}
      aria-label={`Alerta de preço para ${title}`}
    >
      {renderIcon()}

      <span>{renderText()}</span>
    </button>
  );
}