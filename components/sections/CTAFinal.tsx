"use client";

import { motion } from "framer-motion";
import { CONTATO } from "@/data/simulador";

/* ── Variantes ─────────────────────────────────────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

/* ── Componente ────────────────────────────────────────────────────── */

export default function CTAFinal() {
  return (
    <section id="cta-final" className="bg-navy-deep py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">

        <motion.div
          className="flex flex-col items-center gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Tag pill */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="inline-flex items-center border border-navy-mid px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-navy-mid">
              Vamos começar
            </span>
          </motion.div>

          {/* Título */}
          <motion.h2
            className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-5xl"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Pronto para construir
            <br />
            a casa que você sempre quis?
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            className="max-w-xl font-body text-base leading-relaxed text-muted lg:text-lg"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Fale com nosso engenheiro e dê o primeiro passo.
            Sem compromisso.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-2 flex flex-wrap items-center justify-center gap-4"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <a
              href="#simulador"
              className="inline-flex items-center bg-white px-8 py-4 font-display text-sm font-bold text-navy-deep transition-colors duration-200 hover:bg-off-white"
              aria-label="Ir para o simulador de investimento"
            >
              Simular meu projeto
            </a>
            <a
              href={CONTATO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white/30 px-8 py-4 font-display text-sm font-bold text-white transition-all duration-200 hover:bg-white/10"
              aria-label="Falar com engenheiro pelo WhatsApp"
            >
              Falar pelo WhatsApp
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
