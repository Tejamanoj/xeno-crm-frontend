import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-lg mx-4 shadow-glass"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose} 
              className="text-muted hover:text-white transition-colors"
            >
            <X size={16} />
            </motion.button>
          </div>
        <div className="px-6 py-5">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}