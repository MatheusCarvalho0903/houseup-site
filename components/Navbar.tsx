"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Modelos",       href: "#modelos"       },
  { label: "Simulador",     href: "#simulador"     },
  { label: "Projetos",      href: "#projetos"      },
  { label: "Financiamento", href: "#financiamento" },
] as const;

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setDrawerOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* ── Barra principal ─────────────────────────────── */}
      <motion.nav
        className="fixed inset-x-0 top-0 z-50"
        animate={{
          backgroundColor: scrolled
            ? "rgba(13, 46, 110, 0.97)"
            : "rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ backdropFilter: scrolled ? "blur(14px)" : "none" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between lg:h-20">

            {/* Logo */}
            <a href="#" aria-label="HouseUp Construtora — página inicial">
              <Image
                src="/logo_houseup.png"
                alt="HouseUp Construtora"
                width={160}
                height={36}
                className="h-20 w-auto lg:h-24"
                priority
              />
            </a>

            {/* Desktop — links centrais */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop — CTA */}
            <a
              href="#simulador"
              className="hidden lg:inline-flex items-center font-body text-sm font-medium text-white border border-navy-mid px-5 py-2.5 transition-all duration-200 hover:bg-navy-mid"
              aria-label="Abrir simulador de investimento"
            >
              Simular minha casa
            </a>

            {/* Mobile — hamburger */}
            <button
              type="button"
              className="lg:hidden flex flex-col items-end gap-[5px] p-2 text-white"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <span className="block h-px w-6 bg-white" />
              <span className="block h-px w-4 bg-white" />
              <span className="block h-px w-6 bg-white" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ───────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Painel lateral */}
            <motion.aside
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              className="fixed inset-y-0 right-0 z-[70] flex w-72 flex-col bg-navy-deep px-8 py-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              {/* Fechar */}
              <button
                type="button"
                className="ml-auto text-white/50 hover:text-white transition-colors"
                onClick={() => setDrawerOpen(false)}
                aria-label="Fechar menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Links */}
              <nav className="mt-10" aria-label="Menu mobile">
                <ul className="flex flex-col gap-7" role="list">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.07, duration: 0.28 }}
                    >
                      <a
                        href={link.href}
                        className="font-display text-2xl font-bold text-white hover:text-navy-mid transition-colors duration-200"
                        onClick={() => setDrawerOpen(false)}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Divisor */}
              <div className="my-8 h-px bg-white/10" />

              {/* CTA mobile */}
              <motion.a
                href="#simulador"
                className="block w-full text-center font-body text-sm font-medium text-white border border-navy-mid px-5 py-3.5 hover:bg-navy-mid transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                onClick={() => setDrawerOpen(false)}
                aria-label="Ir para o simulador"
              >
                Simular minha casa
              </motion.a>

              {/* Contato */}
              <motion.div
                className="mt-auto pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
              >
                <a
                  href="https://wa.me/5534991887059"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  (34) 99188-7059
                </a>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
