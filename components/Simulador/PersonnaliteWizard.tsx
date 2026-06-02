"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PERSONNALITE,
  UPGRADES,
  calcularPrecoUpgrade,
  formatarMoeda,
} from "@/data/simulador";
import type { PersonnaliteSelecao } from "@/data/simulador";
import SecaoUpgrades from "./SecaoUpgrades";

/* ── Props ─────────────────────────────────────────────────────────── */

interface Props {
  aberto:     boolean;
  onFechar:   () => void;
  onConcluir: (selecao: PersonnaliteSelecao) => void;
}

/* ── Constantes ────────────────────────────────────────────────────── */

const PASSOS_LABELS = ["Tipo", "Metragem", "Cômodos", "Acabamentos"] as const;

/* ── Ícones ────────────────────────────────────────────────────────── */

function IconTerrea() {
  return (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16" aria-hidden="true">
      <polyline points="8,28 32,8 56,28" />
      <rect x="12" y="28" width="40" height="16" />
      <rect x="26" y="32" width="12" height="12" />
    </svg>
  );
}

function IconSobrado() {
  return (
    <svg viewBox="0 0 64 56" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16" aria-hidden="true">
      <polyline points="12,28 32,10 52,28" />
      <rect x="16" y="28" width="32" height="12" />
      <rect x="12" y="40" width="40" height="14" />
      <rect x="25" y="44" width="14" height="10" />
    </svg>
  );
}

function IconFechar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/* ── Componente ────────────────────────────────────────────────────── */

export default function PersonnaliteWizard({ aberto, onFechar, onConcluir }: Props) {
  /* ── Estado do wizard ───────────────────────────────────────────── */
  const [passo,       setPasso]       = useState(0);
  const [direcao,     setDirecao]     = useState<1 | -1>(1);
  const [tipo,        setTipo]        = useState<"terrea" | "sobrado" | null>(null);
  const [area,        setArea]        = useState(200);
  const [comodosSel,  setComodosSel]  = useState<string[]>([]);
  const [upgradesSel, setUpgradesSel] = useState<string[]>([]);

  /* Reseta ao fechar */
  useEffect(() => {
    if (!aberto) {
      setPasso(0);
      setDirecao(1);
      setTipo(null);
      setArea(200);
      setComodosSel([]);
      setUpgradesSel([]);
    }
  }, [aberto]);

  /* ── Computados ─────────────────────────────────────────────────── */

  const precoM2 = tipo ? PERSONNALITE.precoM2[tipo] : 0;
  const estimativaBase = precoM2 * area;

  const precoComodos = PERSONNALITE.comodos
    .filter((c) => comodosSel.includes(c.id))
    .reduce((acc, c) => acc + c.preco, 0);

  const precoUpgrades = Object.values(UPGRADES)
    .flat()
    .filter((u) => upgradesSel.includes(u.id))
    .reduce((acc, u) => acc + (calcularPrecoUpgrade(u, "prime") ?? 0), 0);

  const totalParcial = estimativaBase + precoComodos + precoUpgrades;

  const pct = ((area - PERSONNALITE.areaMin) / (PERSONNALITE.areaMax - PERSONNALITE.areaMin)) * 100;

  /* ── Navegação ──────────────────────────────────────────────────── */

  const podeAvancar = passo === 0 ? tipo !== null : true;

  const avancar = () => {
    if (passo < 3) {
      setDirecao(1);
      setPasso((p) => p + 1);
    } else {
      concluir();
    }
  };

  const voltar = () => {
    setDirecao(-1);
    setPasso((p) => p - 1);
  };

  const concluir = () => {
    if (!tipo) return;
    onConcluir({
      tipo,
      area,
      comodosSelecionados:  comodosSel,
      upgradesSelecionados: upgradesSel,
    });
    onFechar();
  };

  /* ── Handlers de seleção ────────────────────────────────────────── */

  const toggleComodo = (id: string) =>
    setComodosSel((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const toggleUpgrade = (id: string) =>
    setUpgradesSel((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );

  /* ── Conteúdo de cada passo ─────────────────────────────────────── */

  const stepContent: Record<number, React.ReactNode> = {
    /* Passo 0 — Tipo */
    0: (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">
            Qual o tipo da sua casa?
          </h3>
          <p className="mt-1 font-body text-sm text-muted">
            Isso define o preço base por metro quadrado.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(["terrea", "sobrado"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className={[
                "flex flex-col items-center gap-4 rounded-xl border p-8 text-center",
                "transition-all duration-200",
                tipo === t
                  ? "border-gold bg-gold/5 ring-2 ring-gold ring-offset-2 ring-offset-navy-deep"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]",
              ].join(" ")}
              aria-pressed={tipo === t}
            >
              <span className={tipo === t ? "text-gold" : "text-muted"}>
                {t === "terrea" ? <IconTerrea /> : <IconSobrado />}
              </span>
              <div>
                <p className="font-display text-xl font-bold text-white">
                  {t === "terrea" ? "Casa Térrea" : "Casa Sobrado"}
                </p>
                <p className="mt-1 font-display text-base text-navy-mid">
                  {formatarMoeda(PERSONNALITE.precoM2[t])}/m²
                </p>
                <p className="mt-2 font-body text-sm text-muted">
                  {t === "terrea"
                    ? "Planta em um único nível. Mais acessível e de fácil circulação."
                    : "Dois pavimentos. Maior área construída no mesmo terreno."}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    ),

    /* Passo 1 — Metragem */
    1: (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">
            Qual a área da sua casa?
          </h3>
          <p className="mt-1 font-body text-sm text-muted">
            Arraste o controle para definir a metragem total.
          </p>
        </div>

        {/* Valor grande centralizado */}
        <div className="text-center">
          <span className="font-display text-6xl font-bold text-white">{area}</span>
          <span className="ml-2 font-display text-2xl font-bold text-white">m²</span>
        </div>

        {/* Slider customizado */}
        <div className="flex flex-col gap-3">
          <div className="relative flex h-8 items-center">
            {/* Track */}
            <div className="h-2 w-full rounded-full bg-white/10">
              {/* Fill */}
              <div
                className="h-full rounded-full bg-gold transition-all duration-75"
                style={{ width: `${pct}%` }}
              />
            </div>
            {/* Thumb visual */}
            <div
              className="absolute h-6 w-6 rounded-full border-2 border-white bg-gold shadow-lg"
              style={{
                left: `clamp(0px, calc(${pct.toFixed(1)}% - 12px), calc(100% - 24px))`,
              }}
              aria-hidden="true"
            />
            {/* Input transparente — camada interativa */}
            <input
              type="range"
              min={PERSONNALITE.areaMin}
              max={PERSONNALITE.areaMax}
              step={5}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              style={{ zIndex: 10 }}
              aria-label={`Área da casa: ${area} metros quadrados`}
              aria-valuemin={PERSONNALITE.areaMin}
              aria-valuemax={PERSONNALITE.areaMax}
              aria-valuenow={area}
            />
          </div>

          {/* Labels min/max */}
          <div className="flex justify-between">
            <span className="font-body text-xs text-muted">{PERSONNALITE.areaMin} m²</span>
            <span className="font-body text-xs text-muted">{PERSONNALITE.areaMax} m²</span>
          </div>
        </div>

        {/* Estimativa parcial */}
        {tipo && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="font-body text-xs uppercase tracking-widest text-muted">
              Estimativa base
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-navy-mid">
              {formatarMoeda(estimativaBase)}
            </p>
            <p className="mt-0.5 font-body text-xs text-muted">
              {formatarMoeda(precoM2)}/m² × {area}m²
            </p>
          </div>
        )}
      </div>
    ),

    /* Passo 2 — Cômodos */
    2: (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">
            Personalize os ambientes.
          </h3>
          <p className="mt-1 font-body text-sm text-muted">
            Adicione cômodos além do padrão. Todos são opcionais.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PERSONNALITE.comodos.map((comodo) => {
            const sel = comodosSel.includes(comodo.id);
            return (
              <button
                key={comodo.id}
                type="button"
                onClick={() => toggleComodo(comodo.id)}
                aria-pressed={sel}
                className={[
                  "flex items-start justify-between rounded-lg border p-4 text-left",
                  "transition-colors duration-200",
                  sel
                    ? "border-gold bg-gold/5"
                    : "border-white/10 bg-white/5 hover:border-white/20",
                ].join(" ")}
              >
                <div>
                  <p className="font-display text-sm font-bold text-white">{comodo.nome}</p>
                  <p className="mt-1 font-display text-sm text-gold">
                    + {formatarMoeda(comodo.preco)}
                  </p>
                </div>
                {/* Toggle */}
                <div
                  className={[
                    "ml-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    "transition-colors duration-200",
                    sel ? "bg-gold" : "border border-white/30",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {sel && (
                    <span className="font-body text-[10px] font-bold text-navy-deep">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Total parcial */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="font-body text-xs text-muted">Base + cômodos selecionados</p>
          <p className="mt-1 font-display text-xl font-bold text-navy-mid">
            {formatarMoeda(estimativaBase + precoComodos)}
          </p>
        </div>
      </div>
    ),

    /* Passo 3 — Upgrades */
    3: (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">
            Personalize os acabamentos.
          </h3>
          <p className="mt-1 font-body text-sm text-muted">
            Os upgrades abaixo são opcionais e incrementais ao valor do seu projeto.
            Preços calculados com base no modelo Prime como referência.
          </p>
        </div>

        {/* SecaoUpgrades reutilizada com modeloId="prime" */}
        <SecaoUpgrades
          modeloId="prime"
          upgradesSelecionados={upgradesSel}
          onToggle={toggleUpgrade}
        />

        {/* Total geral */}
        {totalParcial > 0 && (
          <div className="rounded-xl border border-gold/20 bg-gold/5 p-4 text-center">
            <p className="font-body text-xs text-muted">Estimativa total do projeto</p>
            <p className="mt-1 font-display text-2xl font-bold text-gold">
              {formatarMoeda(totalParcial)}
            </p>
          </div>
        )}
      </div>
    ),
  };

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <AnimatePresence>
      {aberto && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-navy-deep/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onFechar}
            aria-hidden="true"
          />

          {/* Painel modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Configurador Personnalité"
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-navy-deep border border-white/10 md:inset-8 md:rounded-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >

            {/* Header fixo */}
            <div className="shrink-0 border-b border-white/10">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center bg-gold px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-navy-deep">
                    Personnalité
                  </span>
                  <h2 className="font-display text-lg font-bold text-white">
                    Monte seu projeto
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onFechar}
                  className="text-white/50 transition-colors duration-200 hover:text-white"
                  aria-label="Fechar configurador"
                >
                  <IconFechar />
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center px-6 pb-5" role="progressbar" aria-valuenow={passo + 1} aria-valuemax={4}>
                {PASSOS_LABELS.map((label, idx) => (
                  <React.Fragment key={idx}>
                    {/* Conector antes do círculo (não no primeiro) */}
                    {idx > 0 && (
                      <div className="flex-1 h-[2px] overflow-hidden bg-white/10">
                        <motion.div
                          className="h-full bg-navy-mid"
                          animate={{ scaleX: passo >= idx ? 1 : 0 }}
                          style={{ originX: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}

                    {/* Círculo do passo */}
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={[
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          "font-display text-xs font-bold transition-colors duration-300",
                          passo > idx
                            ? "bg-navy-mid text-white"
                            : passo === idx
                            ? "bg-gold text-navy-deep"
                            : "border border-white/20 text-muted",
                        ].join(" ")}
                        aria-label={`Passo ${idx + 1}: ${label}${passo > idx ? " (concluído)" : passo === idx ? " (atual)" : ""}`}
                      >
                        {passo > idx ? "✓" : idx + 1}
                      </div>
                      <span
                        className={[
                          "hidden font-body text-[10px] sm:block",
                          passo === idx ? "text-white" : "text-muted",
                        ].join(" ")}
                      >
                        {label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={passo}
                  initial={{ opacity: 0, x: direcao * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direcao * -40 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {stepContent[passo]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer fixo */}
            <div className="shrink-0 border-t border-white/10 p-6">
              <div className="flex items-center justify-between gap-4">

                {/* Voltar */}
                {passo > 0 ? (
                  <button
                    type="button"
                    onClick={voltar}
                    className="flex items-center gap-1.5 border border-white/20 px-5 py-3 font-display text-sm font-bold text-white transition-colors duration-200 hover:border-white/40"
                    aria-label="Voltar ao passo anterior"
                  >
                    ← Voltar
                  </button>
                ) : (
                  <div />
                )}

                {/* Avançar / Concluir */}
                <button
                  type="button"
                  onClick={avancar}
                  disabled={!podeAvancar}
                  className={[
                    "flex items-center gap-1.5 px-6 py-3 font-display text-sm font-bold",
                    "transition-all duration-200",
                    podeAvancar
                      ? "bg-gold text-navy-deep hover:brightness-110"
                      : "cursor-not-allowed bg-white/10 text-muted",
                  ].join(" ")}
                  aria-label={passo < 3 ? "Avançar para o próximo passo" : "Ver estimativa do projeto"}
                >
                  {passo < 3 ? "Avançar →" : "Ver estimativa"}
                </button>

              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
