import { motion } from "framer-motion";

export default function StatCard({ label, value, delta, icon: Icon, accent = "brand" }) {
  const colors = {
    brand: "text-brand-500 bg-brand-500/10",
    green: "text-emerald-400 bg-emerald-400/10",
    amber: "text-amber-400 bg-amber-400/10",
    rose:  "text-rose-400 bg-rose-400/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-white/20 hover:bg-gradient-glass hover:shadow-glass transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted font-medium uppercase tracking-wider">{label}</span>
        {Icon && (
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[accent]}`}
            >
            <Icon size={15} />
            </motion.div>
        )}
      </div>
      <p className="text-2xl font-bold text-white font-mono">{value}</p>
      {delta && <p className="text-xs text-muted">{delta}</p>}
      </div>
    </motion.div>
  );
}