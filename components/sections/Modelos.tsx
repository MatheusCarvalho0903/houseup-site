"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MODELOS, CONTATO, formatarMoeda } from "@/data/simulador";

/* ── Ordem de exibição dos modelos ────────────────────────────────── */
const MODELOS_LIST = [MODELOS.start, MODELOS.essence, MODELOS.prime];

/* ── Placeholders (substituir por modelo.foto quando disponível) ──── */
const FOTO_PLACEHOLDER: Record<string, string> = {
  start:   "https://placehold.co/800x500/0D2E6E/1A6DB5?text=HouseUp+Start",
  essence: "https://placehold.co/800x500/0D2E6E/1A6DB5?text=HouseUp+Essence",
  prime:   "https://placehold.co/800x500/0D2E6E/1A6DB5?text=HouseUp+Prime",
};
const PERSONNALITE_FOTO =
  "https://placehold.co/800x500/0D2E6E/C9A84C?text=Personnalite";

/* ── Helpers ──────────────────────────────────────────────────────── */
function waLink(texto: string) {
  return `${CONTATO.whatsappLink}?text=${encodeURIComponent(texto)}`;
}

/* ── Variantes de animação ────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0  },
};

const staggerGrid = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Ícones ───────────────────────────────────────────────────────── */
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

/* ── Componente principal ─────────────────────────────────────────── */
export default function Modelos() {
  return (
    <section id="modelos" className="bg-navy-deep py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Cabeçalho */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="font-display text-3xl font-bold text-white lg:text-4xl">
            Escolha o modelo ideal para você.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-muted lg:text-lg">
            Cada modelo é projetado para um estilo de vida.
            Todos com a mesma qualidade e transparência HouseUp.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerGrid}
        >

          {/* ── Cards padrão (Start / Essence / Prime) ── */}
          {MODELOS_LIST.map((modelo) => (
            <motion.article
              key={modelo.id}
              className={[
                "group flex flex-col overflow-hidden",
                "border border-white/10 bg-white/5",
                "transition-colors duration-300",
                "hover:border-navy-mid hover:bg-white/[0.08]",
              ].join(" ")}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Imagem */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={FOTO_PLACEHOLDER[modelo.id]}
                  alt={modelo.nome}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                {/* Badge área */}
                <span className="absolute right-3 top-3 bg-navy-mid px-2.5 py-1 font-body text-xs font-medium text-white">
                  {modelo.area}m²
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-white">
                  {modelo.nome}
                </h3>

                {/* Specs */}
                <ul className="mt-4 flex flex-col gap-2.5" role="list">
                  {modelo.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2.5 font-body text-sm text-muted"
                    >
                      <span className="text-navy-mid">
                        <IconCheck />
                      </span>
                      {spec}
                    </li>
                  ))}
                </ul>

                {/* Preço */}
                <div className="mt-6">
                  <span className="font-body text-xs text-muted">
                    A partir de
                  </span>
                  <p className="mt-0.5 font-display text-2xl font-bold text-white">
                    {formatarMoeda(modelo.precoBase)}
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-col gap-2 sm:flex-row xl:flex-col">
                  <a
                    href="#simulador"
                    className="flex flex-1 items-center justify-center border border-white/25 px-4 py-2.5 font-body text-xs font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
                    aria-label={`Ver ${modelo.nome} no simulador`}
                  >
                    Ver no simulador
                  </a>
                  <a
                    href={waLink(
                      `Olá! Tenho interesse no modelo ${modelo.nome}. Gostaria de saber mais.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center bg-navy-mid px-4 py-2.5 font-body text-xs font-medium text-white transition-opacity duration-200 hover:opacity-85"
                    aria-label={`Falar pelo WhatsApp sobre ${modelo.nome}`}
                  >
                    Falar pelo WhatsApp
                  </a>
                </div>
              </div>
            </motion.article>
          ))}

          {/* ── Card Personnalité ── */}
          <motion.article
            className="group flex flex-col overflow-hidden border border-gold/30 bg-gradient-to-br from-navy-deep to-navy-darker"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
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
              {/* Badge SOB MEDIDA */}
              <span className="absolute left-3 top-3 bg-gold px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-navy-deep">
                SOB MEDIDA
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
              {/* Ícone */}
              <div className="mb-3 text-gold">
                <IconDiamond />
              </div>

              <h3 className="font-display text-lg font-bold text-gold">
                HouseUp Personnalité
              </h3>

              <p className="mt-2 font-body text-sm font-medium text-white/80">
                Sem limites. Sem compromisso com o padrão.
              </p>

              <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                Cada detalhe pensado para você. Área, planta e acabamentos
                totalmente personalizados.
              </p>

              {/* CTA */}
              <div className="mt-auto pt-6">
                <a
                  href={waLink(
                    "Olá! Tenho interesse no modelo Personnalité. Gostaria de iniciar meu projeto."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center bg-gold px-4 py-3 font-display text-sm font-bold text-navy-deep transition-all duration-200 hover:brightness-110"
                  aria-label="Iniciar projeto Personnalité pelo WhatsApp"
                >
                  Iniciar meu projeto
                </a>
              </div>
            </div>
          </motion.article>

        </motion.div>
      </div>
    </section>
  );
}
