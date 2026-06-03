"use client";

import { motion } from "framer-motion";

/* Variante base para todos os elementos animados */
const fadeUp = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy-deep"
    >
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src="/video/hero-2.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient — navy escuro à esquerda, transparente à direita */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(13,59,142,0.92) 0%, rgba(13,59,142,0.92) 50%, rgba(13,59,142,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Conteúdo ──────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-36 lg:px-10 lg:pt-0">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.18, delayChildren: 0.2 },
            },
          }}
        >
          {/* H1 — delay 0.2s via stagger */}
          <motion.h1
            className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-white lg:text-7xl"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            Sua casa do jeito
            <br />
            que você imaginou.
          </motion.h1>

          {/* Subtítulo — delay 0.6s */}
          <motion.p
            className="mt-6 font-body text-base leading-relaxed text-muted sm:text-lg lg:text-xl"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Construção transparente, com você em cada etapa.
            <br className="hidden sm:block" />
            Do projeto à entrega, tudo com a HouseUp.
          </motion.p>

          {/* CTAs — delay 0.8s */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Primário */}
            <a
              href="#simulador"
              className="inline-flex items-center bg-navy-mid px-8 py-4 font-body text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
              aria-label="Ir para o simulador de investimento"
            >
              Simular meu projeto
            </a>

            {/* Secundário */}
            <a
              href="https://wa.me/5534991887059"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white px-8 py-4 font-body text-sm font-medium text-white transition-all duration-200 hover:bg-white hover:text-navy-deep"
              aria-label="Falar com engenheiro pelo WhatsApp"
            >
              Falar com engenheiro
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Indicador de scroll ───────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        aria-hidden="true"
      >
        <span className="font-body text-[10px] uppercase tracking-widest">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
