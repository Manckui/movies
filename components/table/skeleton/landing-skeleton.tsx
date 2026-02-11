"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { LandingSkeletonProps } from './landing-skeleton.types';

const LandingSkeleton = ({
  children,
  hasLanded,
  loading,
  skeleton,
}: LandingSkeletonProps) => {
  if (loading && !hasLanded) {
    return <>{skeleton}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="landing-content"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { LandingSkeleton };
