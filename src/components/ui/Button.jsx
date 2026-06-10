import clsx from "clsx";

export default function Button({ children, variant = "primary", size = "sm", onClick, className, disabled }) {
  const base = "inline-flex items-center gap-2 font-medium rounded-lg transition-colors disabled:opacity-40";
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white",
    outline: "border border-border hover:border-brand-500 text-muted hover:text-white",
    ghost:   "hover:bg-white/5 text-muted hover:text-white",
  };
  const sizes = { sm: "text-xs px-3 py-1.5", md: "text-sm px-4 py-2" };
  return (
    <button onClick={onClick} disabled={disabled}
      className={clsx(base, variants[variant], sizes[size], className)}>
      {children}
    </button>
  );
}