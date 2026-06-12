import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AIInsightCard({ insight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-neon opacity-10 blur-2xl animate-pulse" />
      
      {/* Card */}
      <div className="relative bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon" />
        
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="flex-shrink-0"
          >
            <Sparkles className="w-6 h-6 text-amber-400" />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-2">
              🤖 AI Insight
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {insight}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}