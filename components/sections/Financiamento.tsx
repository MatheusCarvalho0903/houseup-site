"use client";

import { motion } from "framer-motion";
import { CONTATO } from "@/data/simulador";

const WA_FINANCIAMENTO = `${CONTATO.whatsappLink}?text=${encodeURIComponent(
  "Olá! Gostaria de entender como funciona o financiamento pela Caixa com a HouseUp."
)}`;

/* ── Variantes ─────────────────────────────────────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0  },
};

const staggerLeft = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* ── Dados ─────────────────────────────────────────────────────────── */

const CHECKLIST = [
  "Financiamento CEF aprovado para construção",
  "Acompanhamento completo das medições",
  "Sem burocracia extra para o cliente",
] as const;

const PASSOS = [
  {
    num:    "01",
    titulo: "Análise de crédito",
    desc:   "Você busca o financiamento na Caixa com nossa ajuda.",
  },
  {
    num:    "02",
    titulo: "Aprovação do projeto",
    desc:   "Enviamos a documentação técnica ao banco.",
  },
  {
    num:    "03",
    titulo: "Início da obra",
    desc:   "Caixa libera parcelas conforme o avanço da construção.",
  },
  {
    num:    "04",
    titulo: "Medições periódicas",
    desc:   "Acompanhamos cada liberação de parcela junto ao banco.",
  },
  {
    num:    "05",
    titulo: "Entrega",
    desc:   "Obra concluída e financiamento quitado.",
  },
] as const;

/* ── Ícone ─────────────────────────────────────────────────────────── */

function IconCheck() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M2 8l4 4 8-8" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-2 h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M4 10h12M12 5l5 5-5 5" />
    </svg>
  );
}

/* ── Componente ────────────────────────────────────────────────────── */

export default function Financiamento() {
  return (
    <section id="financiamento" className="bg-navy-deep py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

          {/* ── Coluna esquerda — texto com stagger ── */}
          <motion.div
            className="flex flex-col gap-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerLeft}
          >
            {/* Tag pill */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <span className="inline-flex items-center border border-navy-mid px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-navy-mid">
                Financiamento CEF
              </span>
            </motion.div>

            {/* Título */}
            <motion.h2
              className="font-display text-3xl font-bold text-white lg:text-4xl lg:leading-tight"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              Sua casa financiada pela Caixa.
              <br />
              A HouseUp cuida de tudo.
            </motion.h2>

            {/* Parágrafo */}
            <motion.p
              className="font-body text-base leading-relaxed text-muted"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              Muita gente não sabe que é possível financiar uma construção
              personalizada pela Caixa Econômica Federal. A HouseUp é
              especializada em obras financiadas — acompanhamos todo o
              processo junto com você e o banco, da análise de crédito
              até a liberação das parcelas de obra.
            </motion.p>

            {/* Checklist */}
            <motion.ul
              className="flex flex-col gap-3"
              role="list"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-body text-sm font-medium text-white/80"
                >
                  <span className="text-navy-mid">
                    <IconCheck />
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <a
                href={WA_FINANCIAMENTO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-navy-mid px-6 py-3.5 font-body text-sm font-medium text-white transition-all duration-200 hover:brightness-110"
                aria-label="Entender como funciona o financiamento pelo WhatsApp"
              >
                Quero saber como funciona
                <IconArrow />
              </a>
            </motion.div>
          </motion.div>

          {/* ── Coluna direita — card dashboard ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-8">

              {/* Label do card */}
              <p className="mb-6 font-body text-xs font-medium uppercase tracking-widest text-muted">
                Como funciona
              </p>

              {/* Passos */}
              <div className="flex flex-col">
                {PASSOS.map((passo, idx) => (
                  <div
                    key={passo.num}
                    className={[
                      "flex gap-5 py-4",
                      idx < PASSOS.length - 1 ? "border-b border-white/5" : "",
                    ].join(" ")}
                  >
                    {/* Número */}
                    <span className="w-7 shrink-0 font-display text-base font-bold text-navy-mid">
                      {passo.num}
                    </span>

                    {/* Texto */}
                    <div className="flex flex-col gap-0.5">
                      <p className="font-body text-sm font-semibold text-white">
                        {passo.titulo}
                      </p>
                      <p className="font-body text-xs leading-relaxed text-muted">
                        {passo.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
