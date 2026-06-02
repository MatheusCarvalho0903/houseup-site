"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UPGRADES, calcularPrecoUpgrade } from "@/data/simulador";
import type { ModeloId } from "@/data/simulador";
import UpgradeCard from "./UpgradeCard";

/* ── Props ─────────────────────────────────────────────────────────── */

interface Props {
  modeloId:            ModeloId;
  upgradesSelecionados: string[];
  onToggle:            (id: string) => void;
}

/* ── Definição de tabs ─────────────────────────────────────────────── */

const TABS = [
  { id: "acabamentos", label: "Acabamentos"   },
  { id: "lazer",       label: "Área de Lazer" },
  { id: "fachada",     label: "Fachada"       },
  { id: "paisagismo",  label: "Paisagismo"    },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ── Componente ────────────────────────────────────────────────────── */

export default function SecaoUpgrades({
  modeloId,
  upgradesSelecionados,
  onToggle,
}: Props) {
  const [tabAtiva, setTabAtiva] = useState<TabId>("acabamentos");

  // Filtra upgrades indisponíveis para o modelo atual
  const upgradesFiltrados = UPGRADES[tabAtiva].filter(
    (u) => calcularPrecoUpgrade(u, modeloId) !== null
  );

  return (
    <div>

      {/* ── Tabs ──────────────────────────────────────────── */}
      <div
        className="flex overflow-x-auto border-b border-white/10"
        role="tablist"
        aria-label="Categorias de upgrades"
      >
        {TABS.map((tab) => {
          const ativa = tabAtiva === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={ativa}
              aria-controls={`painel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={[
                "-mb-px whitespace-nowrap px-4 pb-3 pt-1 font-body text-sm font-medium",
                "border-b-2 transition-colors duration-200",
                ativa
                  ? "border-navy-mid text-white"
                  : "border-transparent text-muted hover:text-white/70",
              ].join(" ")}
              onClick={() => setTabAtiva(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Painel de cards com animação lateral ──────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tabAtiva}
          id={`painel-${tabAtiva}`}
          role="tabpanel"
          aria-labelledby={`tab-${tabAtiva}`}
          className="mt-6"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {upgradesFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upgradesFiltrados.map((upgrade) => (
                <UpgradeCard
                  key={upgrade.id}
                  upgrade={upgrade}
                  modeloId={modeloId}
                  selecionado={upgradesSelecionados.includes(upgrade.id)}
                  onToggle={onToggle}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="font-body text-sm text-muted">
                Nenhum upgrade disponível nesta categoria para o modelo selecionado.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
