import { motion } from "framer-motion";

export default function SkeletonLoader({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-gradient-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="space-y-4">
            <div className="h-4 bg-white/10 rounded-lg w-1/3" />
            <div className="h-8 bg-white/10 rounded-lg w-1/2" />
            <div className="h-3 bg-white/5 rounded-lg w-1/4" />
          </div>
        </motion.div>
      ))}
    </>
  );
}