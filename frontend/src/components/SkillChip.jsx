/**
 * SkillChip — a single skill pill. `tone` controls color coding:
 * "matched" (teal) or "missing" (coral). This is functional color,
 * not decoration — it's how the user tells the two lists apart at a glance.
 */
export default function SkillChip({ label, tone = "matched" }) {
  const styles =
    tone === "matched"
      ? "bg-teal-soft text-teal-deep border-teal/20"
      : "bg-coral-soft text-coral border-coral/20";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${styles}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "matched" ? "bg-teal" : "bg-coral"
        }`}
      />
      {label}
    </span>
  );
}
