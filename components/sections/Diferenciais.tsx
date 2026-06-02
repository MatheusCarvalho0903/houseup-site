"use client";

import { motion } from "framer-motion";

/* ── Variantes de animação ─────────────────────────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0  },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ── Ícones inline ─────────────────────────────────────────────────── */

function IconCaixa() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Banco / financiamento */}
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="M5 6l7-3 7 3" />
      <path d="M4 10v11" />
      <path d="M20 10v11" />
      <path d="M8 14v3" />
      <path d="M12 14v3" />
      <path d="M16 14v3" />
    </svg>
  );
}

function IconAdministracao() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Olho — transparência */}
      <path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEntrega() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Prancheta com checkmarks */}
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ── Dados dos cards ───────────────────────────────────────────────── */

const CARDS = [
  {
    id:     "caixa",
    icon:   <IconCaixa />,
    titulo: "Obra Financiada pela Caixa",
    texto:
      "Construa com financiamento CEF. A HouseUp trabalha com obras financiadas, tornando seu projeto viável com menos capital inicial.",
  },
  {
    id:     "administracao",
    icon:   <IconAdministracao />,
    titulo: "Gestão por Administração",
    texto:
      "Você acompanha cada real investido. Sem surpresas, sem margem escondida. Total transparência do início ao fim.",
  },
  {
    id:     "entrega",
    icon:   <IconEntrega />,
    titulo: "Do Projeto à Entrega",
    texto:
      "Arquitetônico, estrutural, elétrico, hidráulico e aprovação municipal. Tudo em um só lugar.",
  },
] as const;

/* ── Componente ────────────────────────────────────────────────────── */

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="bg-off-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Cabeçalho da seção */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="font-display text-3xl font-bold text-navy-deep lg:text-4xl">
            Por que construir com a HouseUp?
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-muted lg:text-lg">
            Transparência, controle e projetos completos —
            do primeiro traço à entrega das chaves.
          </p>
        </motion.div>

        {/* Grid de cards */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {CARDS.map((card) => (
            <motion.article
              key={card.id}
              className={[
                /* base */
                "group relative bg-white p-8",
                /* borda padrão: 1px cinza em 3 lados, 3px transparente à esquerda */
                "border border-gray-100",
                "border-l-[3px] border-l-transparent",
                /* hover: sobe 4px + borda esquerda acende navy-mid */
                "hover:border-l-navy-mid",
                /* transição da borda (FM cuida do y) */
                "transition-colors duration-300",
              ].join(" ")}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              {/* Ícone */}
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-navy-deep/[0.06] text-navy-mid">
                {card.icon}
              </div>

              {/* Título */}
              <h3 className="font-display text-xl font-bold leading-snug text-navy-deep">
                {card.titulo}
              </h3>

              {/* Texto */}
              <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                {card.texto}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
