"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const FOTOS = [
  {
    id:        "jefferson-fachada",
    src:       "/images/projetos/jefferson-fachada.jpg",
    alt:       "Fachada da Residência Jefferson — Personnalité 280m², Uberlândia MG",
    linha1:    "Residência Jefferson · Uberlândia, MG",
    linha2:    "Personnalité · 280m²",
    gridClass: "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  },
  {
    id:        "jefferson-sala",
    src:       "/images/projetos/jefferson-sala.jpg",
    alt:       "Interior da Residência Jefferson — acabamento premium",
    linha1:    "Residência Jefferson · Interior",
    linha2:    "Acabamento premium",
    gridClass: "lg:col-start-2 lg:row-start-1",
  },
  {
    id:        "jefferson-piscina",
    src:       "/images/projetos/jefferson-piscina.jpg",
    alt:       "Área de lazer com piscina e jardim integrados — Residência Jefferson",
    linha1:    "Residência Jefferson · Área de Lazer",
    linha2:    "Piscina e jardim integrados",
    gridClass: "lg:col-start-3 lg:row-start-1",
  },
  {
    id:        "sheila-garagem",
    src:       "/images/projetos/sheila-garagem.jpg",
    alt:       "Garagem da Residência Sheila — Personnalité 145m², Uberlândia MG",
    linha1:    "Residência Sheila · Uberlândia, MG",
    linha2:    "Personnalité · 145m²",
    gridClass: "lg:col-start-2 lg:row-start-2",
  },
  {
    id:        "sheila-fachada",
    src:       "/images/projetos/sheila-fachada.jpg",
    alt:       "Fachada da Residência Sheila — Personnalité 145m², Uberlândia MG",
    linha1:    "Residência Sheila · Uberlândia, MG",
    linha2:    "Personnalité · 145m²",
    gridClass: "lg:col-start-3 lg:row-start-2",
  },
  {
    id:        "sheila-gourmet",
    src:       "/images/projetos/sheila-gourmet.jpg",
    alt:       "Área gourmet da Residência Sheila — Personnalité 145m²",
    linha1:    "Residência Sheila · Área Gourmet",
    linha2:    "Personnalité · 145m²",
    gridClass: "lg:col-start-1 lg:row-start-3",
  },
] as const;

export default function ProjetosRealizados() {
  return (
    <section id="projetos-realizados" className="bg-navy-deep py-16 lg:py-24">
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
          <span className="inline-flex items-center border border-navy-mid px-3 py-1 font-display text-xs uppercase tracking-widest text-navy-mid">
            Projetos Entregues
          </span>
          <h2 className="mt-6 font-display text-3xl font-extrabold text-white lg:text-4xl">
            Casas que entregamos.
          </h2>
          <p className="mt-4 font-body text-lg text-muted">
            Cada projeto é único. Cada entrega, uma história de confiança.
          </p>
        </motion.div>

        {/* Galeria */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-3 lg:grid-rows-[300px_300px_300px] lg:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {FOTOS.map((foto) => (
            <motion.div
              key={foto.id}
              className={[
                "group relative h-[260px] cursor-pointer overflow-hidden rounded-sm lg:h-auto",
                foto.gridClass,
              ].join(" ")}
              variants={fadeUp}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Imagem */}
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              {/* Overlay base — gradiente permanente */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />

              {/* Overlay hover — via CSS group */}
              <div className="absolute inset-0 bg-navy-mid/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-display text-sm font-bold text-white">
                  {foto.linha1}
                </p>
                <p className="font-body text-xs text-white/70">
                  {foto.linha2}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
        >
          <p className="font-display text-xl font-bold text-white">
            Quer ver seu projeto aqui?
          </p>
          <p className="mt-2 font-body text-sm text-muted">
            Simule agora e dê o primeiro passo.
          </p>
          <a
            href="#simulador"
            className="mt-6 inline-flex items-center bg-navy-mid px-8 py-4 font-display text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
            aria-label="Ir para o simulador de investimento"
          >
            Simular meu projeto
          </a>
        </motion.div>

      </div>
    </section>
  );
}
