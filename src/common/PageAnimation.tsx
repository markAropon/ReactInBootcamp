import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageAnimationProps {
  children: ReactNode;
  keyValue: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },

  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
};


export default function PageAnimation({ children, keyValue }: PageAnimationProps) {
  return (
    <motion.div
      key={keyValue}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.4
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
