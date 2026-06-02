"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MODELOS,
  UPGRADES,
  PERSONNALITE,
  CONTATO,
  calcularPrecoUpgrade,
  formatarMoeda,
  gerarMensagemWhatsApp,
} from "@/data/simulador";
import type { ModeloId, PersonnaliteSelecao } from "@/data/simulador";
import ModelSelector   from "./ModelSelector";
import SecaoUpgrades   from "./SecaoUpgrades";
import ResumoSimulacao from "./ResumoSimulacao";
import PersonnaliteWizard from "./PersonnaliteWizard";
import LegalNote       from "./LegalNote";

/* ── Variantes ─────────────────────────────────────────────────────── */

const fadeSlideUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0  },
  exit:    { opacity: 0, y: -8 },
};

/* ── Componente ────────────────────────────────────────────────────── */

export default function Simulador() {

  /* ── Estado global ──────────────────────────────────────────────── */

  const [modeloId,          setModeloId]          = useState<ModeloId | null>(null);
  const [personnaliteSel,   setPersonnaliteSel]   = useState(false);
  const [upgradesSel,       setUpgradesSel]       = useState<string[]>([]);
  const [wizardAberto,      setWizardAberto]      = useState(false);
  const [personnaliteConfig, setPersonnaliteConfig] =
    useState<PersonnaliteSelecao | null>(null);

  /* ── Handlers ───────────────────────────────────────────────────── */

  function handleSelecionarModelo(id: ModeloId) {
    setModeloId(id);
    setPersonnaliteSel(false);
    setPersonnaliteConfig(null);
    // Mantém apenas os upgrades compatíveis com o novo modelo
    setUpgradesSel((prev) =>
      prev.filter((uid) => {
        const u = Object.values(UPGRADES).flat().find((u) => u.id === uid);
        return u && calcularPrecoUpgrade(u, id) !== null;
      })
    );
  }

  function handlePersonnalite() {
    setModeloId(null);
    setPersonnaliteSel(true);
    setUpgradesSel([]);
    setWizardAberto(true);
  }

  function handleConcluirWizard(config: PersonnaliteSelecao) {
    setPersonnaliteConfig(config);
    setUpgradesSel(config.upgradesSelecionados);
    setWizardAberto(false);
  }

  function handleToggleUpgrade(id: string) {
    setUpgradesSel((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleWhatsApp() {
    // Personnalité — mensagem específica
    if (personnaliteSel && personnaliteConfig) {
      const { tipo, area } = personnaliteConfig;
      const tipoLabel      = tipo === "terrea" ? "Térrea" : "Sobrado";
      const precoBase      = PERSONNALITE.precoM2[tipo] * area;
      const msg            = encodeURIComponent(
        `Olá! Simulei minha casa Personnalité no site da HouseUp:\n` +
        `📐 Casa ${tipoLabel} | ${area}m²\n` +
        `💰 Estimativa base: ${formatarMoeda(precoBase)}\n` +
        `Gostaria de iniciar meu projeto personalizado!`
      );
      window.open(`https://wa.me/${CONTATO.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
      return;
    }

    // Modelo padrão
    if (!modeloId) return;
    const modelo       = MODELOS[modeloId];
    const todosUpgrades = Object.values(UPGRADES).flat();
    const upgradesData = upgradesSel
      .map((uid) => todosUpgrades.find((u) => u.id === uid))
      .filter((u): u is NonNullable<typeof u> => Boolean(u))
      .map((u) => ({
        nome:  u.nome,
        preco: calcularPrecoUpgrade(u, modeloId) ?? 0,
      }));
    const total = modelo.precoBase + upgradesData.reduce((a, u) => a + u.preco, 0);
    const msg   = encodeURIComponent(gerarMensagemWhatsApp(modelo, upgradesData, total));
    window.open(`https://wa.me/${CONTATO.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
  }

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <section id="simulador" className="bg-navy-deep py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Cabeçalho */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-white lg:text-4xl">
            Monte sua casa. Veja o custo em tempo real.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-muted lg:text-lg">
            Selecione o modelo, adicione upgrades e receba uma estimativa
            instantânea baseada no CUB Sinduscon-MG.
          </p>
          <div className="mt-6">
            <LegalNote />
          </div>
        </div>

        {/* Grid principal */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">

          {/* ── Coluna esquerda ────────────────────────────────────── */}
          <div className="pb-24 lg:pb-0">

            {/* Seletor de modelos */}
            <ModelSelector
              modeloSelecionado={modeloId}
              onSelecionar={handleSelecionarModelo}
              personnaliteSelecionado={personnaliteSel}
              onPersonnalite={handlePersonnalite}
            />

            {/* Upgrades — visível apenas quando modelo padrão selecionado */}
            <AnimatePresence>
              {modeloId && (
                <motion.div
                  key="upgrades"
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="mb-6 mt-10 font-display text-xl font-bold text-white">
                    Personalize sua casa
                  </h3>
                  <SecaoUpgrades
                    modeloId={modeloId}
                    upgradesSelecionados={upgradesSel}
                    onToggle={handleToggleUpgrade}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Banner Personnalité configurado */}
            <AnimatePresence>
              {personnaliteSel && personnaliteConfig && (
                <motion.div
                  key="personnalite-banner"
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-10 rounded-xl border border-gold/30 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex self-start bg-gold px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-navy-deep">
                        Personnalité Configurado
                      </span>
                      <p className="font-display text-lg font-bold text-white">
                        Casa{" "}
                        {personnaliteConfig.tipo === "terrea" ? "Térrea" : "Sobrado"}
                        {" · "}
                        {personnaliteConfig.area}m²
                      </p>
                      {personnaliteConfig.comodosSelecionados.length > 0 && (
                        <p className="font-body text-sm text-muted">
                          {personnaliteConfig.comodosSelecionados.length} cômodo
                          {personnaliteConfig.comodosSelecionados.length > 1 ? "s" : ""} extra
                          {personnaliteConfig.comodosSelecionados.length > 1 ? "s" : ""}
                        </p>
                      )}
                      {upgradesSel.length > 0 && (
                        <p className="font-body text-sm text-muted">
                          {upgradesSel.length} upgrade
                          {upgradesSel.length > 1 ? "s" : ""} selecionado
                          {upgradesSel.length > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setWizardAberto(true)}
                      className="shrink-0 border border-gold/30 px-4 py-2 font-body text-sm text-gold transition-colors duration-200 hover:bg-gold/10"
                      aria-label="Editar configuração Personnalité"
                    >
                      Editar →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ── Coluna direita — painel de resumo ──────────────────── */}
          <ResumoSimulacao
            modeloId={modeloId}
            upgradesSelecionados={upgradesSel}
            onAbrirWhatsApp={handleWhatsApp}
            personnaliteConfig={personnaliteConfig}
          />

        </div>
      </div>

      {/* Wizard Personnalité — fora do grid, fixed/modal */}
      <PersonnaliteWizard
        aberto={wizardAberto}
        onFechar={() => setWizardAberto(false)}
        onConcluir={handleConcluirWizard}
      />

    </section>
  );
}
