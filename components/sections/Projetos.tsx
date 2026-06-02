"use client";

import { motion } from "framer-motion";
import { CONTATO } from "@/data/simulador";

const WA_PROJETOS = `${CONTATO.whatsappLink}?text=${encodeURIComponent(
  "Olá! Gostaria de solicitar uma proposta para projetos. Pode me ajudar?"
)}`;

/* ── Variantes ─────────────────────────────────────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Ícones inline ─────────────────────────────────────────────────── */

function IconArquitetonico() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      {/* Régua + lápis */}
      <path d="M17 3l4 4-10 10H7v-4L17 3z" />
      <path d="M3 21h18" />
      <path d="M7 17v-4" />
    </svg>
  );
}

function IconEstrutural() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      {/* Malha estrutural */}
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconEletrico() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      {/* Raio */}
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconHidro() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      {/* Gota d'água */}
      <path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0C19 10 12 2 12 2z" />
      <path d="M9 15a3 3 0 006 0" />
    </svg>
  );
}

function IconAprovacao() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      {/* Prédio + carimbo */}
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <rect x="9" y="13" width="6" height="8" />
      <path d="M9 10h6" />
      <path d="M9 7h6" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4" aria-hidden="true">
      <path d="M4 10h12M12 5l5 5-5 5" />
    </svg>
  );
}

/* ── Dados dos serviços ─────────────────────────────────────────────── */

const SERVICOS = [
  {
    id:       "arquitetonico",
    titulo:   "Projeto Arquitetônico",
    descricao:"Planta baixa, cortes, fachadas e memorial descritivo.",
    icon:     <IconArquitetonico />,
  },
  {
    id:       "estrutural",
    titulo:   "Projeto Estrutural",
    descricao:"Dimensionamento de fundações, vigas e lajes.",
    icon:     <IconEstrutural />,
  },
  {
    id:       "eletrico",
    titulo:   "Projeto Elétrico",
    descricao:"Instalações elétricas conforme norma ABNT NBR 5410.",
    icon:     <IconEletrico />,
  },
  {
    id:       "hidrossanitario",
    titulo:   "Projeto Hidrossanitário",
    descricao:"Água fria, esgoto e águas pluviais.",
    icon:     <IconHidro />,
  },
  {
    id:       "aprovacao",
    titulo:   "Aprovação Municipal",
    descricao:"Entrada e acompanhamento do processo na prefeitura.",
    icon:     <IconAprovacao />,
  },
] as const;

/* ── Componente ────────────────────────────────────────────────────── */

export default function Projetos() {
  return (
    <section id="projetos" className="bg-off-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Cabeçalho — centralizado */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="font-display text-3xl font-bold text-navy-deep lg:text-4xl">
            Tudo começa com um bom projeto.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-muted lg:text-lg">
            A HouseUp cuida de toda a pré-obra para você.
            Do primeiro risco até a aprovação na prefeitura.
          </p>
        </motion.div>

        {/* Layout 2 colunas */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">

          {/* ── Coluna esquerda — texto ── */}
          <motion.div
            className="flex flex-col gap-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="font-body text-base leading-relaxed text-navy-deep/70 lg:text-lg">
              A HouseUp Projetos entrega toda a documentação técnica necessária
              antes do início da obra. Com projetos bem elaborados, a construção
              é mais rápida, mais barata e sem surpresas.
            </p>

            {/* Pills de destaque */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center bg-navy-deep px-4 py-2 font-body text-sm font-medium text-white">
                Projetos completos
              </span>
              <span className="inline-flex items-center bg-navy-mid px-4 py-2 font-body text-sm font-medium text-white">
                Aprovação municipal inclusa
              </span>
            </div>

            {/* CTA WhatsApp */}
            <a
              href={WA_PROJETOS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center bg-navy-deep px-6 py-3.5 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-navy-mid"
              aria-label="Solicitar proposta de projetos pelo WhatsApp"
            >
              Solicitar proposta de projetos
              <IconArrow />
            </a>
          </motion.div>

          {/* ── Coluna direita — cards de serviço ── */}
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {SERVICOS.map((servico, idx) => (
              <motion.div
                key={servico.id}
                className={[
                  /* base */
                  "group flex gap-4 bg-white p-5",
                  /* borda: 1px cinza + 3px esquerda transparente (sem layout shift) */
                  "border border-gray-100",
                  "border-l-[3px] border-l-transparent",
                  /* hover */
                  "hover:border-l-navy-mid transition-colors duration-200",
                  /* 5º card ocupa a largura total no grid de 2 colunas */
                  idx === 4 ? "sm:col-span-2 sm:max-w-[calc(50%-8px)]" : "",
                ].join(" ")}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
                whileHover={{ y: -3 }}
              >
                {/* Ícone */}
                <div className="shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy-deep/[0.06] text-navy-mid">
                    {servico.icon}
                  </div>
                </div>

                {/* Texto */}
                <div className="flex flex-col justify-center gap-1">
                  <h3 className="font-display text-sm font-bold leading-snug text-navy-deep">
                    {servico.titulo}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-muted">
                    {servico.descricao}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
