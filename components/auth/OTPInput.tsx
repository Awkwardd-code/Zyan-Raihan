"use client";

import { useRef } from "react";

export function OTPInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const updateValue = (index: number, nextChar: string) => {
    const sanitized = nextChar.replace(/\D/g, "").slice(0, 1);
    const next = [...value];
    next[index] = sanitized;
    onChange(next);

    if (sanitized && index < value.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={value[index] ?? ""}
          maxLength={1}
          inputMode="numeric"
          className="h-14 w-10 rounded-xl border border-white/10 bg-[#0B1220]/80 text-center text-xl font-semibold text-[#F5F5F0] outline-none transition focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/20 sm:w-12"
          onChange={(event) => updateValue(index, event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !value[index] && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          onPaste={(event) => {
            event.preventDefault();
            const pasted = event.clipboardData.getData("text").replace(/\s+/g, "").slice(0, 8).toUpperCase();
            if (!pasted) return;
            const next = Array.from({ length: 8 }, (_, i) => pasted[i] ?? "");
            onChange(next);
          }}
        />
      ))}
    </div>
  );
}
