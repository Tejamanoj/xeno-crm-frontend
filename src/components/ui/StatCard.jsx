export default function StatCard({ label, value, delta, icon: Icon, accent = "brand" }) {
  const colors = {
    brand: "text-brand-500 bg-brand-500/10",
    green: "text-emerald-400 bg-emerald-400/10",
    amber: "text-amber-400 bg-amber-400/10",
    rose:  "text-rose-400 bg-rose-400/10",
  };
  return (
    <div className="bg-panel border border-border rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted font-medium uppercase tracking-wider">{label}</span>
        {Icon && (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[accent]}`}>
            <Icon size={15} />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white font-mono">{value}</p>
      {delta && <p className="text-xs text-muted">{delta}</p>}
    </div>
  );
}