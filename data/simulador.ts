// Fonte da verdade do simulador — nunca hardcode nos componentes

export type ModeloId = "start" | "essence" | "prime";

export interface Modelo {
  id: ModeloId;
  nome: string;
  area: number;
  banheiros: number;
  precoBase: number;
  foto: string;
  specs: string[];
}

export type UnidadeUpgrade =
  | "por_m2"
  | "por_banheiro"
  | "fixo"
  | "fixo_por_modelo";

export interface Upgrade {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  preco?: number;
  precoVariavel?: Partial<Record<ModeloId, number>>;
  unidade: UnidadeUpgrade;
  categorias: ModeloId[];
}

export interface Comodo {
  id: string;
  nome: string;
  preco: number;
}

export interface PersonnaliteConfig {
  precoM2: { terrea: number; sobrado: number };
  areaMin: number;
  areaMax: number;
  comodos: Comodo[];
}

/* Seleção feita pelo usuário no wizard do Personnalité */
export interface PersonnaliteSelecao {
  tipo:                "terrea" | "sobrado";
  area:                number;
  comodosSelecionados: string[];
  upgradesSelecionados: string[];
}

// ── Modelos ────────────────────────────────────────────────────────────────

export const MODELOS: Record<ModeloId, Modelo> = {
  start: {
    id: "start",
    nome: "HouseUp Start",
    area: 62,
    banheiros: 1,
    precoBase: 250000,
    foto: "/images/modelos/start.jpg",
    specs: [
      "2 quartos",
      "1 banheiro",
      "Sala integrada",
      "Cozinha americana",
    ],
  },
  essence: {
    id: "essence",
    nome: "HouseUp Essence",
    area: 82,
    banheiros: 2,
    precoBase: 350000,
    foto: "/images/modelos/essence.jpg",
    specs: [
      "3 quartos",
      "2 banheiros",
      "Suíte master",
      "Sala ampliada",
    ],
  },
  prime: {
    id: "prime",
    nome: "HouseUp Prime",
    area: 102,
    banheiros: 2,
    precoBase: 450000,
    foto: "/images/modelos/prime.jpg",
    specs: [
      "3 quartos",
      "2 suítes",
      "Sala de estar + jantar",
      "Área de serviço",
    ],
  },
};

// ── Upgrades por categoria ─────────────────────────────────────────────────

export const UPGRADES: Record<string, Upgrade[]> = {
  acabamentos: [
    {
      id: "porcelanato",
      nome: "Piso Porcelanato Premium",
      descricao: "Substituição do piso padrão por porcelanato de alto padrão",
      foto: "/images/upgrades/porcelanato.jpg",
      precoVariavel: { start: 60, essence: 80, prime: 100 },
      unidade: "por_m2",
      categorias: ["start", "essence", "prime"],
    },
    {
      id: "revestimento_banheiro",
      nome: "Revestimento Banheiro Nível A",
      descricao: "Revestimento premium em todos os banheiros",
      foto: "/images/upgrades/banheiro.jpg",
      preco: 8000,
      unidade: "por_banheiro",
      categorias: ["start", "essence", "prime"],
    },
    {
      id: "loucas_metais",
      nome: "Louças e Metais Premium",
      descricao: "Kit completo de louças e metais de alto padrão",
      foto: "/images/upgrades/loucas.jpg",
      precoVariavel: { start: 5000, essence: 8000, prime: 10000 },
      unidade: "fixo_por_modelo",
      categorias: ["start", "essence", "prime"],
    },
  ],
  lazer: [
    {
      id: "area_gourmet",
      nome: "Área Gourmet com Churrasqueira",
      descricao: "Área gourmet coberta de 16m² com churrasqueira em alvenaria",
      foto: "/images/upgrades/gourmet.jpg",
      preco: 22000,
      unidade: "fixo",
      categorias: ["start", "essence", "prime"],
    },
    {
      id: "piscina",
      nome: "Piscina de Fibra (10m²)",
      descricao: "Piscina de fibra com bomba e sistema de filtragem",
      foto: "/images/upgrades/piscina.jpg",
      preco: 28000,
      unidade: "fixo",
      categorias: ["start", "essence", "prime"],
    },
  ],
  fachada: [
    {
      id: "pedra_fachada",
      nome: "Revestimento de Pedra na Fachada",
      descricao: "Revestimento em pedra natural ou reconstituída na fachada",
      foto: "/images/upgrades/pedra.jpg",
      precoVariavel: { start: 8000, essence: 12000 },
      unidade: "fixo_por_modelo",
      categorias: ["start", "essence"],
    },
    {
      id: "iluminacao_fachada",
      nome: "Iluminação de Fachada",
      descricao:
        "Projeto luminotécnico com spots e perfis de LED na fachada",
      foto: "/images/upgrades/iluminacao.jpg",
      preco: 8000,
      unidade: "fixo",
      categorias: ["start", "essence", "prime"],
    },
    {
      id: "porta_pivo",
      nome: "Porta Pivotante",
      descricao:
        "Porta de entrada pivotante em madeira ou vidro temperado",
      foto: "/images/upgrades/porta.jpg",
      precoVariavel: { start: 8000, essence: 8000 },
      unidade: "fixo_por_modelo",
      categorias: ["start", "essence"],
    },
  ],
  paisagismo: [
    {
      id: "paisagismo_basico",
      nome: "Paisagismo Básico",
      descricao:
        "Projeto e execução de paisagismo básico (referência lote 250m²)",
      foto: "/images/upgrades/paisagismo-basico.jpg",
      preco: 5000,
      unidade: "fixo",
      categorias: ["start", "essence", "prime"],
    },
    {
      id: "paisagismo_completo",
      nome: "Paisagismo Completo com Irrigação",
      descricao:
        "Paisagismo premium com sistema de irrigação automatizado",
      foto: "/images/upgrades/paisagismo-completo.jpg",
      preco: 9500,
      unidade: "fixo",
      categorias: ["start", "essence", "prime"],
    },
  ],
};

// ── Personnalité ────────────────────────────────────────────────────────────

export const PERSONNALITE: PersonnaliteConfig = {
  precoM2: { terrea: 4800, sobrado: 5400 },
  areaMin: 120,
  areaMax: 500,
  comodos: [
    { id: "suite_master",    nome: "Suíte Master",        preco: 15000 },
    { id: "suite_adicional", nome: "Suíte Adicional",     preco: 12000 },
    { id: "home_office",     nome: "Home Office",          preco: 8000  },
    { id: "varanda_gourmet", nome: "Varanda Gourmet",      preco: 18000 },
    { id: "lavabo",          nome: "Lavabo",               preco: 4000  },
    { id: "closet",          nome: "Closet",               preco: 6000  },
    { id: "quarto_extra",    nome: "Quarto Adicional",     preco: 10000 },
    { id: "despensa",        nome: "Despensa",             preco: 3500  },
  ],
};

// ── Nota legal ─────────────────────────────────────────────────────────────

export const NOTA_LEGAL =
  "Os valores apresentados são estimativas de referência baseadas no CUB " +
  "Sinduscon-MG e não constituem proposta ou oferta comercial. O custo final " +
  "varia conforme terreno, localização, especificações técnicas, tipo de " +
  "contratação de mão de obra e condições de mercado. Solicite uma proposta " +
  "personalizada.";

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Calcula o preço de um upgrade para um modelo específico.
 * Retorna null se o upgrade não for disponível para esse modelo.
 */
export function calcularPrecoUpgrade(
  upgrade: Upgrade,
  modeloId: ModeloId
): number | null {
  const modelo = MODELOS[modeloId];

  if (!upgrade.categorias.includes(modeloId)) return null;

  switch (upgrade.unidade) {
    case "fixo":
      return upgrade.preco ?? 0;

    case "por_m2":
      return (upgrade.precoVariavel?.[modeloId] ?? 0) * modelo.area;

    case "por_banheiro":
      return (upgrade.preco ?? 0) * modelo.banheiros;

    case "fixo_por_modelo":
      return upgrade.precoVariavel?.[modeloId] ?? 0;

    default:
      return 0;
  }
}

/**
 * Formata um número como moeda brasileira.
 */
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/**
 * Gera a mensagem pré-formatada para envio via WhatsApp.
 */
export function gerarMensagemWhatsApp(
  modelo: Modelo,
  upgradesSelecionados: Array<{ nome: string; preco: number }>,
  total: number
): string {
  const listaUpgrades =
    upgradesSelecionados.length > 0
      ? upgradesSelecionados.map((u) => `✅ ${u.nome}`).join("\n")
      : "Nenhum upgrade selecionado";

  return (
    `Olá! Simulei minha casa no site da HouseUp:\n` +
    `📐 Modelo: ${modelo.nome} | ${modelo.area}m²\n` +
    `${listaUpgrades}\n` +
    `💰 Estimativa: ${formatarMoeda(total)}\n` +
    `Gostaria de conversar sobre meu projeto!`
  );
}

// ── Constantes de contato ──────────────────────────────────────────────────

export const CONTATO = {
  whatsapp: "5534991887059",
  whatsappFormatado: "(34) 99188-7059",
  whatsappLink: "https://wa.me/5534991887059",
  instagram: "@houseup.construtora",
  cidade: "Uberlândia, MG",
} as const;
