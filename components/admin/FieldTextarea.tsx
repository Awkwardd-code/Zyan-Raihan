type FieldTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
};

export function FieldTextarea({ label, value, onChange, rows = 4, placeholder }: FieldTextareaProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#F5F5F0]">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2.5 text-[#F5F5F0] placeholder:text-[#F5F5F0]/35 focus:border-[#F5C518] focus:outline-none"
      />
    </label>
  );
}
