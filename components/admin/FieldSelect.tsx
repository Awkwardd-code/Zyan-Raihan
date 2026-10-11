type FieldSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
};

export function FieldSelect({ label, value, onChange, options }: FieldSelectProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#F5F5F0]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2.5 text-[#F5F5F0] focus:border-[#F5C518] focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
