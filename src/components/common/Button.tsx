import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  shadow = "sm",
  className,
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-cyan-700 text-white hover:bg-cyan-600 active:bg-cyan-700 cursor-pointer",
    ghost:
      "hover:bg-white/10 active:bg-white/20",
    outline:
      "border border-white/30 hover:bg-white/10 active:bg-white/20",
    link:
      "underline-offset-4 hover:underline opacity-90 hover:opacity-80 active:opacity-70",
  };

  const sizes = {
    sm: "w-20 h-8 text-sm px-4 py-2",
    md: "w-40 h-12 text-base",
    lg: "w-48 h-14 text-lg",
  };

  const shadows = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <button
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        shadows[shadow],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

