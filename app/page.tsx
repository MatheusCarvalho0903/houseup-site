import Hero          from "@/components/sections/Hero";
import Diferenciais  from "@/components/sections/Diferenciais";
import Modelos       from "@/components/sections/Modelos";
import Projetos      from "@/components/sections/Projetos";
import Financiamento from "@/components/sections/Financiamento";
import MetodoHouseUp from "@/components/sections/MetodoHouseUp";
import CTAFinal      from "@/components/sections/CTAFinal";
import Footer        from "@/components/sections/Footer";
import Simulador     from "@/components/Simulador";

export default function Home() {
  return (
    <main>
      {/* ① Navbar — em layout.tsx (fixo em toda a página) */}
      <Hero />
      <Diferenciais />
      <Modelos />
      <Projetos />
      <Financiamento />
      <MetodoHouseUp />
      <Simulador />
      <CTAFinal />
      <Footer />
    </main>
  );
}
