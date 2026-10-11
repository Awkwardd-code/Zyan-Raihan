import type { InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function AuthInput({ label, error, className = "", ...props }: AuthInputProps) {
  return (
    <label className="block space-y-2 text-sm text-[#F5F5F0]">
      <span className="font-medium text-[#F5F5F0]/80">{label}</span>
      <input
        {...props}
        className={`w-full rounded-2xl border border-white/10 bg-[#0B1220]/80 px-4 py-3 text-[#F5F5F0] placeholder:text-[#F5F5F0]/35 outline-none transition focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/25 ${className} ${
          error ? "border-red-400/80" : ""
        }`}
      />
      {error ? <span className="block text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
