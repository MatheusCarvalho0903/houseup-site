"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  MODELOS,
  UPGRADES,
  PERSONNALITE,
  NOTA_LEGAL,
  calcularPrecoUpgrade,
  formatarMoeda,
} from "@/data/simulador";
import type { ModeloId, PersonnaliteSelecao } from "@/data/simulador";

/* ── Props ─────────────────────────────────────────────────────────── */

interface Props {
  modeloId:            ModeloId | null;
  upgradesSelecionados: string[];
  onAbrirWhatsApp:     () => void;
  personnaliteConfig?: PersonnaliteSelecao | null;
}

/* ── Ícones ────────────────────────────────────────────────────────── */

function IconWA() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconCasa() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-muted" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

/* ── Componente ────────────────────────────────────────────────────── */

export default function ResumoSimulacao({
  modeloId,
  upgradesSelecionados,
  onAbrirWhatsApp,
  personnaliteConfig = null,
}: Props) {

  /* ── Flags de modo ──────────────────────────────────────────────── */

  const modelo        = modeloId ? MODELOS[modeloId] : null;
  const isPersonnalite = !modeloId && Boolean(personnaliteConfig);
  const upgradeRef    = (modeloId ?? (isPersonnalite ? "prime" : null)) as ModeloId | null;

  /* ── Cálculo de valores ─────────────────────────────────────────── */

  const todosUpgrades = Object.values(UPGRADES).flat();

  // Preço base
  const precoBase = modeloId
    ? (modelo?.precoBase ?? 0)
    : personnaliteConfig
    ? PERSONNALITE.precoM2[personnaliteConfig.tipo] * personnaliteConfig.area
    : 0;

  // Cômodos Personnalité
  const comodosSel = isPersonnalite && personnaliteConfig
    ? PERSONNALITE.comodos.filter((c) =>
        personnaliteConfig.comodosSelecionados.includes(c.id)
      )
    : [];
  const precoComodos = comodosSel.reduce((acc, c) => acc + c.preco, 0);

  // Upgrades com preço (usa "prime" como ref quando Personnalité)
  const upgradesComPreco = upgradeRef
    ? todosUpgrades
        .filter((u) => upgradesSelecionados.includes(u.id))
        .map((u) => ({
          id:    u.id,
          nome:  u.nome,
          preco: calcularPrecoUpgrade(u, upgradeRef) ?? 0,
        }))
    : [];

  const total = precoBase
    + precoComodos
    + upgradesComPreco.reduce((acc, u) => acc + u.preco, 0);

  /* ── Spring animation do total ──────────────────────────────────── */

  const springTotal = useSpring(0, { stiffness: 60, damping: 15 });
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    springTotal.set(total);
  }, [total, springTotal]);

  useMotionValueEvent(springTotal, "change", (v) => {
    setDisplayTotal(Math.round(v));
  });

  /* ── Mobile state ───────────────────────────────────────────────── */

  const [mobileAberto, setMobileAberto] = useState(false);

  const podeEnviar = Boolean(modeloId) || Boolean(personnaliteConfig);

  /* ── Conteúdo compartilhado (desktop + mobile) ──────────────────── */

  const temConteudo = Boolean(modelo) || isPersonnalite;

  const painelConteudo = (
    <div className="flex flex-col gap-4">

      {/* Cabeçalho */}
      <div>
        <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">
          Seu Projeto
        </p>
        {modelo ? (
          <p className="mt-1 font-body text-sm font-medium text-white">{modelo.nome}</p>
        ) : isPersonnalite ? (
          <div className="mt-1">
            <p className="font-body text-sm font-medium text-white">HouseUp Personnalité</p>
            <p className="font-body text-xs text-muted">
              Casa {personnaliteConfig!.tipo === "terrea" ? "Térrea" : "Sobrado"}
              {" · "}{personnaliteConfig!.area}m²
            </p>
          </div>
        ) : (
          <p className="mt-1 font-body text-sm italic text-muted">
            Nenhum modelo selecionado
          </p>
        )}
      </div>

      <div className="border-t border-white/10" />

      {temConteudo ? (
        <>
          {/* Lista de itens */}
          <div className="flex flex-col gap-1.5">

            {/* Item base */}
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-white">
                {modelo?.nome ?? "Personnalité — base"}
              </span>
              <span className="font-display text-sm font-bold text-white">
                {formatarMoeda(precoBase)}
              </span>
            </div>

            {/* Cômodos Personnalité */}
            <AnimatePresence>
              {comodosSel.map((c) => (
                <motion.div key={c.id} layout
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2 pt-1">
                    <span className="font-body text-xs leading-snug text-muted">{c.nome}</span>
                    <span className="shrink-0 font-display text-xs font-bold text-gold">
                      + {formatarMoeda(c.preco)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Upgrades */}
            <AnimatePresence>
              {upgradesComPreco.map((u) => (
                <motion.div key={u.id} layout
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2 pt-1">
                    <span className="font-body text-xs leading-snug text-muted">{u.nome}</span>
                    <span className="shrink-0 font-display text-xs font-bold text-navy-mid">
                      + {formatarMoeda(u.preco)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="border-t border-white/10" />

          {/* Total com spring */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">
              Estimativa Total
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-white">
              {formatarMoeda(displayTotal)}
            </p>
          </div>

          {/* Nota legal */}
          <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
            <p className="flex gap-2 font-body text-[10px] leading-relaxed text-muted">
              <span className="mt-0.5 shrink-0 text-navy-mid" aria-hidden="true">ⓘ</span>
              <span className="line-clamp-3">{NOTA_LEGAL}</span>
            </p>
          </div>
        </>
      ) : (
        /* Estado vazio */
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <IconCasa />
          <p className="font-body text-sm text-muted">
            Selecione um modelo para começar
          </p>
        </div>
      )}

      {/* Botão WhatsApp — pai lida com toda a lógica de URL */}
      <button
        type="button"
        disabled={!podeEnviar}
        onClick={onAbrirWhatsApp}
        className={[
          "flex w-full items-center justify-center gap-2 py-3",
          "font-display text-sm font-bold transition-all duration-200",
          podeEnviar
            ? "bg-[#25D366] text-white hover:brightness-110"
            : "cursor-not-allowed bg-white/10 text-muted",
        ].join(" ")}
        aria-label={
          podeEnviar
            ? "Enviar estimativa pelo WhatsApp"
            : "Selecione um modelo para continuar"
        }
      >
        {podeEnviar && <IconWA />}
        Enviar via WhatsApp
      </button>

    </div>
  );

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <>
      {/* Desktop: sticky */}
      <div className="hidden lg:block sticky top-24 rounded-xl border border-white/10 bg-white/5 p-6">
        {painelConteudo}
      </div>

      {/* Mobile: barra fixa + painel colapsável */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between border-t border-white/10 bg-navy-deep px-5 py-3"
          onClick={() => setMobileAberto((v) => !v)}
          aria-expanded={mobileAberto}
          aria-label={mobileAberto ? "Fechar resumo" : "Ver resumo do projeto"}
        >
          <span className="font-display text-base font-bold text-white">
            {podeEnviar ? formatarMoeda(displayTotal) : "Nenhum modelo"}
          </span>
          <span className="font-body text-sm text-navy-mid">
            {mobileAberto ? "Fechar ↓" : "Ver resumo ↑"}
          </span>
        </button>

        <AnimatePresence>
          {mobileAberto && (
            <motion.div
              className="max-h-[70vh] overflow-y-auto border-t border-white/10 bg-navy-deep px-5 py-5"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              {painelConteudo}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
