type AdminStatCardProps = {
  label: string;
  value: string | number;
  detail?: string;
};

export function AdminStatCard({ label, value, detail }: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/60">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <span className="text-3xl font-semibold text-[#F5F5F0]">{value}</span>
        {detail ? <span className="text-xs text-[#F5C518]">{detail}</span> : null}
      </div>
    </div>
  );
}
