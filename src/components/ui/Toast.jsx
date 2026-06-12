import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}

export default function Toast({ id, message, type = "success", onClose }) {
  const icons = {
    success: <CheckCircle size={18} className="text-emerald-400" />,
    error: <AlertCircle size={18} className="text-rose-400" />,
    info: <Info size={18} className="text-brand-500" />,
  };

  const bgColors = {
    success: "bg-emerald-500/10 border-emerald-500/20",
    error: "bg-rose-500/10 border-rose-500/20",
    info: "bg-brand-500/10 border-brand-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm ${bgColors[type]}`}
    >
      {icons[type]}
      <p className="text-sm text-white flex-1">{message}</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="text-muted hover:text-white transition-colors"
      >
        <X size={16} />
      </motion.button>
    </motion.div>
  );
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => onClose(toast.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}