import { motion } from "framer-motion";

const gradients = {
  cyan: "bg-gradient-cyan",
  purple: "bg-gradient-purple",
  pink: "bg-gradient-pink",
  lime: "bg-gradient-lime",
  neon: "bg-gradient-neon",
};

export default function PremiumKPICard({ 
  label, 
  value, 
  delta, 
  icon: Icon, 
  gradient = "cyan",
  trend = "up",
}) {
  const gradientClass = gradients[gradient] || gradients.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative h-full"
    >
      {/* Background glow effect */}
      <div 
        className={`absolute inset-0 rounded-2xl ${gradientClass} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
      />
      
      {/* Card container */}
      <div className="relative bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 h-full">
        {/* Gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${gradientClass}`} />
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-xs text-muted uppercase tracking-widest font-semibold mb-2">
              {label}
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-white font-mono">
              {value}
            </p>
          </div>
          
          {Icon && (
            <motion.div
              className={`p-3 rounded-xl ${gradientClass} text-white flex-shrink-0`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon size={24} />
            </motion.div>
          )}
        </div>
        
        {delta && (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${trend === "up" ? "text-emerald-400" : "text-rose-400"}`}>
              {delta}
            </span>
            <span className="text-xs text-muted">
              from last period
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}