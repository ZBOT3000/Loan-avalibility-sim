import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  currency?: string;
}

export default function InputField({
  fullWidth = true,
  currency,
  className,
  ...props
}: Props) {
  const base =
    "rounded-full px-5 py-3 bg-cyan-400/14 border border-white/30 text-white placeholder-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent";

  if (currency) {
    return (
      <div className={clsx("relative", fullWidth && "w-full")}>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 font-medium pointer-events-none">
          {currency}
        </span>
        <input
          className={clsx(base, "pl-10", fullWidth && "w-full", className)}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      className={clsx(base, fullWidth && "w-full", className)}
      {...props}
    />
  );
}
