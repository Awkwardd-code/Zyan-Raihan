type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({ title, description, confirmLabel = "Delete", onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0F1C]/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1220] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
        <h3 className="text-xl font-semibold text-[#F5F5F0]">{title}</h3>
        <p className="mt-2 text-sm text-[#F5F5F0]/70">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-[#F5F5F0]">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
