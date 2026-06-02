"use client";

import { motion } from "framer-motion";

/* ── Variantes ─────────────────────────────────────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ── Ícones ────────────────────────────────────────────────────────── */

function IconProjeto() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconPlanejamento() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}

function IconExecucao() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      {/* Capacete de obra */}
      <path d="M2 20h20" />
      <path d="M6 20v-4a6 6 0 1112 0v4" />
      <path d="M2 14h20" />
    </svg>
  );
}

function IconTransparencia() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEntrega() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      {/* Chave */}
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M21 2L11.5 11.5M15 5l4 4M11.5 11.5L13 13" />
    </svg>
  );
}

/* ── Dados das etapas ──────────────────────────────────────────────── */

const ETAPAS = [
  {
    id:     "projeto",
    num:    "01",
    titulo: "Projeto",
    desc:   "Desenvolvemos toda a documentação técnica e aprovações necessárias.",
    icon:   <IconProjeto />,
  },
  {
    id:     "planejamento",
    num:    "02",
    titulo: "Planejamento",
    desc:   "Orçamento detalhado, cronograma definido e equipe selecionada.",
    icon:   <IconPlanejamento />,
  },
  {
    id:     "execucao",
    num:    "03",
    titulo: "Execução",
    desc:   "Obra gerenciada com relatórios periódicos para você acompanhar.",
    icon:   <IconExecucao />,
  },
  {
    id:     "transparencia",
    num:    "04",
    titulo: "Transparência",
    desc:   "Acesso a todos os custos. Você aprova cada etapa antes de avançar.",
    icon:   <IconTransparencia />,
  },
  {
    id:     "entrega",
    num:    "05",
    titulo: "Entrega",
    desc:   "Vistoria final, documentação e chaves na sua mão.",
    icon:   <IconEntrega />,
  },
] as const;

/* ── Conector horizontal animado ───────────────────────────────────── */

function ConectorH({ delay }: { delay: number }) {
  return (
    <div className="flex-1 h-[2px] overflow-hidden bg-navy-mid/20">
      <motion.div
        className="h-full bg-navy-mid"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay }}
        style={{ originX: 0 }}
      />
    </div>
  );
}

/* ── Conector vertical animado ─────────────────────────────────────── */

function ConectorV({ delay }: { delay: number }) {
  return (
    <div className="my-1 w-[2px] flex-1 overflow-hidden bg-navy-mid/20">
      <motion.div
        className="w-full bg-navy-mid"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
        style={{ originY: 0 }}
      />
    </div>
  );
}

/* ── Componente principal ──────────────────────────────────────────── */

export default function MetodoHouseUp() {
  return (
    <section id="metodo" className="overflow-hidden bg-off-white py-16 lg:py-24">
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
          <h2 className="font-display text-3xl font-bold text-navy-deep lg:text-4xl">
            Como funciona a administração de obra.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-muted lg:text-lg">
            Um processo transparente, do planejamento à entrega.
            Você acompanha cada etapa.
          </p>
        </motion.div>

        {/* ── Desktop: timeline horizontal ────────────────── */}
        <motion.div
          className="mt-16 hidden items-start lg:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {ETAPAS.map((etapa, idx) => (
            <motion.div
              key={etapa.id}
              className="flex flex-1 flex-col items-center"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Número */}
              <span className="mb-3 font-display text-sm font-bold text-navy-mid">
                {etapa.num}
              </span>

              {/* Linha conectora + círculo */}
              <div className="flex w-full items-center">
                {/* Conector esquerdo — espaço vazio no primeiro */}
                {idx === 0
                  ? <div className="flex-1" />
                  : <ConectorH delay={idx * 0.18} />
                }

                {/* Círculo */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-navy-mid bg-white text-navy-mid">
                  {etapa.icon}
                </div>

                {/* Conector direito — espaço vazio no último */}
                {idx === ETAPAS.length - 1
                  ? <div className="flex-1" />
                  : <ConectorH delay={(idx + 0.6) * 0.18} />
                }
              </div>

              {/* Conteúdo */}
              <div className="mt-5 px-3 text-center">
                <h3 className="font-display text-sm font-bold text-navy-deep">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                  {etapa.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mobile: timeline vertical ───────────────────── */}
        <motion.div
          className="mt-12 flex flex-col lg:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {ETAPAS.map((etapa, idx) => (
            <motion.div
              key={etapa.id}
              className="flex gap-5"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {/* Coluna esquerda: círculo + linha vertical */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-navy-mid bg-white text-navy-mid">
                  {etapa.icon}
                </div>
                {idx < ETAPAS.length - 1 && (
                  <ConectorV delay={idx * 0.2 + 0.3} />
                )}
              </div>

              {/* Coluna direita: número + título + desc */}
              <div
                className={[
                  "flex flex-col pt-2",
                  idx < ETAPAS.length - 1 ? "pb-10" : "",
                ].join(" ")}
              >
                <span className="font-display text-xs font-bold text-navy-mid">
                  {etapa.num}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-navy-deep">
                  {etapa.titulo}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-muted">
                  {etapa.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA abaixo da timeline ───────────────────────── */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-5 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="font-display text-xl font-bold text-navy-deep lg:text-2xl">
            Pronto para começar seu projeto?
          </p>
          <a
            href="#simulador"
            className="inline-flex items-center bg-navy-deep px-8 py-4 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-navy-mid"
            aria-label="Ir para o simulador de investimento"
          >
            Simular minha casa
          </a>
        </motion.div>

      </div>
    </section>
  );
}
