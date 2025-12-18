import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverScale?: number;
  onClick?: () => void;
}

export function AnimatedCard({ 
  children, 
  delay = 0, 
  className = '', 
  hoverScale = 1.02,
  onClick 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ 
        scale: hoverScale, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg border border-slate-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  variant = 'primary'
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg',
    outline: 'border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
