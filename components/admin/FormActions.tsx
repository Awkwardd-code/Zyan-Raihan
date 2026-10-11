type FormActionsProps = {
  loading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
};

export function FormActions({ loading = false, onCancel, submitLabel = "Save changes" }: FormActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-4">
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-[#F5C518] px-4 py-2.5 text-sm font-semibold text-[#0A0F1C] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
      {onCancel ? (
        <button type="button" onClick={onCancel} className="rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-[#F5F5F0]">
          Cancel
        </button>
      ) : null}
    </div>
  );
}
