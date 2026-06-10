import clsx from "clsx";

const styles = {
  green: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  amber: "bg-amber-400/10  text-amber-400  border-amber-400/20",
  rose:  "bg-rose-400/10   text-rose-400   border-rose-400/20",
  blue:  "bg-brand-500/10  text-brand-500  border-brand-500/20",
  muted: "bg-white/5       text-muted      border-border",
};

export default function Badge({ label, color = "muted" }) {
  return (
    <span className={clsx("text-xs font-medium px-2 py-0.5 rounded-full border", styles[color])}>
      {label}
    </span>
  );
}