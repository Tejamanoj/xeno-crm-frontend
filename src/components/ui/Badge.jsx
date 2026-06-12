import clsx from "clsx";

const styles = {
  green: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20 rounded-full",
  amber: "bg-amber-400/10  text-amber-400  border-amber-400/20 rounded-full",
  rose:  "bg-rose-400/10   text-rose-400   border-rose-400/20 rounded-full",
  blue:  "bg-brand-500/10  text-brand-500  border-brand-500/20 rounded-full",
  muted: "bg-white/5       text-muted      border-border rounded-full",
};

export default function Badge({ label, color = "muted" }) {
  const statusColors = {
    "Completed": "green",
    "Sending": "amber", 
    "Failed": "rose",
    "Draft": "muted",
  };
  
  const badgeColor = statusColors[label] || color;
  
  return (
    <span className={clsx("text-xs font-medium px-3 py-1 border backdrop-blur-sm", styles[badgeColor])}>
      {label}
    </span>
  );
}