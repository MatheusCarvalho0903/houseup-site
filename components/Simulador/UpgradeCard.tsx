"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { calcularPrecoUpgrade, formatarMoeda } from "@/data/simulador";
import type { Upgrade, ModeloId } from "@/data/simulador";

/* ── Props ─────────────────────────────────────────────────────────── */

interface Props {
  upgrade:     Upgrade;
  modeloId:    ModeloId;
  selecionado: boolean;
  onToggle:    (id: string) => void;
}

/* ── Helper de imagem placeholder ─────────────────────────────────── */

function imgSrc(nome: string): string {
  return `https://placehold.co/600x400/0D2E6E/1A6DB5?text=${nome.replace(/\s+/g, "+")}`;
}

/* ── Componente ────────────────────────────────────────────────────── */

export default function UpgradeCard({
  upgrade,
  modeloId,
  selecionado,
  onToggle,
}: Props) {
  const preco = calcularPrecoUpgrade(upgrade, modeloId);

  // Upgrade indisponível para este modelo — não renderiza
  if (preco === null) return null;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={selecionado}
      aria-label={`${selecionado ? "Remover" : "Adicionar"} ${upgrade.nome}`}
      className={[
        "relative flex flex-col overflow-hidden rounded-xl cursor-pointer",
        "transition-colors duration-200",
        selecionado
          ? "border border-navy-mid bg-white/[0.08] ring-1 ring-navy-mid"
          : "border border-white/10 bg-white/5 hover:border-white/20",
      ].join(" ")}
      onClick={() => onToggle(upgrade.id)}
      onKeyDown={(e) => e.key === "Enter" && onToggle(upgrade.id)}
      whileTap={{ scale: 0.97 }}
    >
      {/* Imagem */}
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <Image
          src={imgSrc(upgrade.nome)}
          alt={upgrade.nome}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Corpo */}
      <div className="flex flex-col p-4">

        {/* Linha topo: nome + toggle */}
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-sm font-bold leading-snug text-white">
            {upgrade.nome}
          </h4>

          {/* Toggle visual com Framer Motion */}
          <div
            className={[
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              "transition-colors duration-200",
              selecionado ? "bg-navy-mid" : "border border-white/30",
            ].join(" ")}
            aria-hidden="true"
          >
            <AnimatePresence>
              {selecionado && (
                <motion.span
                  className="font-body text-[10px] font-bold leading-none text-white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Preço — anima de text-navy-mid para text-white quando selecionado */}
        <motion.p
          className={[
            "mt-2 font-display text-lg font-bold transition-colors duration-200",
            selecionado ? "text-white" : "text-navy-mid",
          ].join(" ")}
        >
          + {formatarMoeda(preco)}
        </motion.p>

        {/* Descrição */}
        <p className="mt-1 font-body text-xs leading-relaxed text-muted">
          {upgrade.descricao}
        </p>

      </div>
    </motion.div>
  );
}
