export function PasswordStrength({ password }: { password: string }) {
  const score = Math.min(
    4,
    [...password].reduce((count, char) => {
      if (/[A-Z]/.test(char)) return count + 1;
      if (/[a-z]/.test(char)) return count + 1;
      if (/[0-9]/.test(char)) return count + 1;
      if (/[^A-Za-z0-9]/.test(char)) return count + 1;
      return count;
    }, 0)
  );

  const levels = ["Weak", "Fair", "Good", "Strong", "Excellent"];
  const colors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-400", "bg-green-500"];

  const computedScore = password.length >= 8 ? score : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#F5F5F0]/60">
        <span>Password strength</span>
        <span>{password ? levels[computedScore] : "—"}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all ${colors[computedScore]}`}
          style={{ width: `${(computedScore + 1) * 20}%` }}
        />
      </div>
    </div>
  );
}
