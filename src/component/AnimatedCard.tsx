import { motion } from 'framer-motion';

export const AnimatedCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ scale: 1.02 }}
    className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-lg"
  >
    {children}
  </motion.div>
);
