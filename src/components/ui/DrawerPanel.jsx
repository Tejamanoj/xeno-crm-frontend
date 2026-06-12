import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function DrawerPanel({ 
  isOpen, 
  onClose, 
  title, 
  children,
  width = "w-96"
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className={`fixed right-0 top-0 bottom-0 z-50 ${width} bg-gradient-glass backdrop-blur-xl border-l border-white/10 shadow-2xl`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="overflow-y-auto h-[calc(100%-80px)] p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}