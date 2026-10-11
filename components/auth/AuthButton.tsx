import type { ButtonHTMLAttributes } from "react";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function AuthButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: AuthButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-[#F5C518] text-[#0A0F1C] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(245,197,24,0.25)]"
      : "border border-white/10 bg-white/5 text-[#F5F5F0] hover:bg-white/10";

  return (
    <button
      {...props}
      className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 font-medium transition duration-200 ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
