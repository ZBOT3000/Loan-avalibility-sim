import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export default function InputField({
  fullWidth = true,
  className,
  ...props
}: Props) {
  const base =
    "rounded-full w-1/4 px-5 py-3 bg-cyan-400/14 border border-white/30 text-white placeholder-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent";

  return (
    <input
      className={clsx(base, fullWidth && "w-full", className)}
      {...props}
    />
  );
}
