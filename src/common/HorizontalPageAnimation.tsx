import { motion } from "framer-motion";
import type { ReactNode } from "react";
interface HorizontalPageAnimationProps {
  children: ReactNode;
  keyValue: string;
}
const horizontalPageVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -100,
  },
};
export default function HorizontalPageAnimation({
  children,
  keyValue,
}: HorizontalPageAnimationProps) {
  return (
    <motion.div
      key={keyValue}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={horizontalPageVariants}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.4,
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
