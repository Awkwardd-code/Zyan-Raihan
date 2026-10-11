type FieldInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export function FieldInput({ label, value, onChange, type = "text", placeholder, required = false }: FieldInputProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#F5F5F0]">{label}{required ? " *" : ""}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2.5 text-[#F5F5F0] placeholder:text-[#F5F5F0]/35 focus:border-[#F5C518] focus:outline-none"
      />
    </label>
  );
}
