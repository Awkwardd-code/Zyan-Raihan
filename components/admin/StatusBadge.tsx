type StatusBadgeProps = {
  value: string;
};

export function StatusBadge({ value }: StatusBadgeProps) {
  const tone = value === "published" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>{value}</span>;
}
