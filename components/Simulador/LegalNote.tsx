import { NOTA_LEGAL } from "@/data/simulador";

export default function LegalNote() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <span
        className="mt-0.5 shrink-0 font-body text-base leading-none text-navy-mid"
        aria-hidden="true"
      >
        ⓘ
      </span>
      <p className="font-body text-[11px] leading-relaxed text-muted">
        {NOTA_LEGAL}
      </p>
    </div>
  );
}
