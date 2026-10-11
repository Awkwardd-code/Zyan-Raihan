"use client";

import { useMemo, useState } from "react";

type FieldTagsProps = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
};

export function FieldTags({ label, value, onChange }: FieldTagsProps) {
  const [draft, setDraft] = useState("");

  const items = useMemo(() => value.filter(Boolean), [value]);

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-[#F5F5F0]">{label}</span>
      <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-[#0B1220] p-2">
        {items.map((item, index) => (
          <button
            key={`${item}-${index}`}
            type="button"
            onClick={() => onChange(items.filter((tag) => tag !== item))}
            className="rounded-full bg-[#F5C518]/15 px-2 py-1 text-xs text-[#F5F5F0]"
          >
            {item} ×
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add tag"
          className="flex-1 rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2 text-[#F5F5F0] placeholder:text-[#F5F5F0]/35"
        />
        <button
          type="button"
          onClick={() => {
            const next = draft.trim();
            if (!next) {
              return;
            }
            onChange([...items, next]);
            setDraft("");
          }}
          className="rounded-xl bg-[#F5C518] px-3 py-2 text-sm font-medium text-[#0A0F1C]"
        >
          Add
        </button>
      </div>
    </div>
  );
}
