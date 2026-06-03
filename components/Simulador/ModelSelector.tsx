"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MODELOS, formatarMoeda } from "@/data/simulador";
import type { ModeloId } from "@/data/simulador";

/* ── Props ─────────────────────────────────────────────────────────── */

interface Props {
  modeloSelecionado:       ModeloId | null;
  onSelecionar:            (id: ModeloId) => void;
  // Personnalité é tratado separadamente pois não é um ModeloId
  personnaliteSelecionado?: boolean;
  onPersonnalite?:          () => void;
}

/* ── Constantes ────────────────────────────────────────────────────── */

const MODELOS_LIST = [MODELOS.start, MODELOS.essence, MODELOS.prime] as const;

const MODEL_NUM: Record<ModeloId, string> = {
  start:   "01",
  essence: "02",
  prime:   "03",
};

// Imagens dos modelos vêm direto de MODELOS[id].foto (simulador.ts)
const PERSONNALITE_FOTO =
  "https://placehold.co/800x500/0D3B8E/C9A84C?text=Personnalite";

/* ── Variantes ─────────────────────────────────────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ── Ícones ────────────────────────────────────────────────────────── */

function IconCheck() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M2 8l4 4 8-8" />
    </svg>
  );
}

function IconDiamond() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <path d="M6.012 3h11.976L22 9.64 12 21 2 9.64 6.012 3zM4.57 10l7.43 8.585L19.43 10H4.57zM18.655 8l-2.667-4H8.012L5.345 8h13.31z" />
    </svg>
  );
}

/* ── Componente ────────────────────────────────────────────────────── */

export default function ModelSelector({
  modeloSelecionado,
  onSelecionar,
  personnaliteSelecionado = false,
  onPersonnalite,
}: Props) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={stagger}
    >

      {/* ── Cards padrão: Start / Essence / Prime ──────────── */}
      {MODELOS_LIST.map((modelo) => {
        const sel = modeloSelecionado === modelo.id;

        return (
          <motion.div
            key={modelo.id}
            role="button"
            tabIndex={0}
            aria-pressed={sel}
            aria-label={`Selecionar modelo ${modelo.nome}`}
            className={[
              "relative flex flex-col overflow-hidden rounded-xl cursor-pointer",
              "transition-all duration-200",
              sel
                ? "border border-navy-mid bg-white/[0.08] ring-2 ring-navy-mid ring-offset-2 ring-offset-navy-deep"
                : "border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]",
            ].join(" ")}
            onClick={() => onSelecionar(modelo.id)}
            onKeyDown={(e) => e.key === "Enter" && onSelecionar(modelo.id)}
            variants={fadeUp}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Imagem */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={modelo.foto}
                alt={modelo.nome}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
              {/* Badge área */}
              <span className="absolute left-3 top-3 bg-navy-mid px-2 py-1 font-display text-xs font-bold text-white">
                {modelo.area}m²
              </span>
            </div>

            {/* Corpo */}
            <div className="flex flex-1 flex-col p-5">
              {/* Número do modelo */}
              <span className="mb-1 font-display text-xs font-bold text-navy-mid">
                {MODEL_NUM[modelo.id]}
              </span>

              {/* Nome */}
              <h3 className="font-display text-lg font-bold text-white">
                {modelo.nome}
              </h3>

              {/* Divider */}
              <div className="my-3 border-t border-white/10" />

              {/* Specs */}
              <ul className="flex flex-col gap-2" role="list">
                {modelo.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-center gap-2 font-body text-xs text-muted"
                  >
                    <span className="text-navy-mid">
                      <IconCheck />
                    </span>
                    {spec}
                  </li>
                ))}
              </ul>

              {/* Preço */}
              <div className="mt-4">
                <span className="font-body text-xs text-muted">A partir de</span>
                <p className="mt-0.5 font-display text-xl font-bold text-white">
                  {formatarMoeda(modelo.precoBase)}
                </p>
              </div>

              {/* Botão selecionar */}
              <button
                type="button"
                className={[
                  "mt-4 w-full py-2 font-display text-sm font-bold transition-all duration-200",
                  sel
                    ? "bg-navy-mid text-white"
                    : "border border-white/20 text-white/60 hover:border-navy-mid hover:text-white",
                ].join(" ")}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelecionar(modelo.id);
                }}
                aria-label={sel ? `${modelo.nome} selecionado` : `Selecionar ${modelo.nome}`}
              >
                {sel ? "Selecionado ✓" : "Selecionar"}
              </button>
            </div>
          </motion.div>
        );
      })}

      {/* ── Card Personnalité ─────────────────────────────── */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={personnaliteSelecionado}
        aria-label="Iniciar personalização Personnalité"
        className={[
          "relative flex flex-col overflow-hidden rounded-xl cursor-pointer",
          "bg-gradient-to-br from-navy-deep to-navy-darker",
          "transition-all duration-200",
          personnaliteSelecionado
            ? "border border-gold/30 ring-2 ring-gold ring-offset-2 ring-offset-navy-deep"
            : "border border-gold/30 hover:border-gold/50",
        ].join(" ")}
        onClick={onPersonnalite}
        onKeyDown={(e) => e.key === "Enter" && onPersonnalite?.()}
        variants={fadeUp}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Imagem */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={PERSONNALITE_FOTO}
            alt="HouseUp Personnalité"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </div>

        {/* Corpo */}
        <div className="flex flex-1 flex-col p-5">
          {/* Badge */}
          <span className="mb-4 inline-flex self-start items-center bg-gold px-3 py-1 font-display text-xs font-bold uppercase tracking-widest text-navy-deep">
            SOB MEDIDA
          </span>

          {/* Ícone */}
          <div className="mb-3 text-gold">
            <IconDiamond />
          </div>

          {/* Título */}
          <h3 className="font-display text-xl font-bold text-gold">
            HouseUp Personnalité
          </h3>

          {/* Subtítulo */}
          <p className="mt-2 font-body text-sm text-white/70">
            Sem limites. Sem compromisso com o padrão.
          </p>

          {/* Descrição */}
          <p className="mt-2 font-body text-xs text-muted">
            Área, planta e acabamentos totalmente personalizados.
          </p>

          {/* Botão personalizar */}
          <button
            type="button"
            className={[
              "mt-6 w-full py-2 font-display text-sm font-bold transition-all duration-200 bg-gold text-navy-deep",
              personnaliteSelecionado
                ? "brightness-90"
                : "hover:brightness-110",
            ].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              onPersonnalite?.();
            }}
            aria-label={
              personnaliteSelecionado
                ? "Personnalité selecionado"
                : "Personalizar com Personnalité"
            }
          >
            {personnaliteSelecionado ? "Selecionado ✓" : "Personalizar"}
          </button>
        </div>
      </motion.div>

    </motion.div>
  );
}
