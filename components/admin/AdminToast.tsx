type AdminToastProps = {
  message: string;
  kind?: "success" | "error";
};

export function AdminToast({ message, kind = "success" }: AdminToastProps) {
  const tone = kind === "error" ? "border-red-500/40 bg-red-500/10 text-red-200" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";

  return (
    <div className={`rounded-xl border px-3 py-2 text-sm ${tone}`}>
      {message}
    </div>
  );
}
