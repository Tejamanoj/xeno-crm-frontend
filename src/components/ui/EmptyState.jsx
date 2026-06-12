import { motion } from "framer-motion";

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mb-4"
      >
        {Icon && <Icon size={48} className="text-muted/30" />}
      </motion.div>

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-muted text-center max-w-sm mb-6">{description}</p>

      {action && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}