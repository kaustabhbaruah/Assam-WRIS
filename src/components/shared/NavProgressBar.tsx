"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * NavProgressBar - Provides immediate visual feedback during page transitions.
 * This helps the app feel "seamless" even if the underlying JS chunks take time to load.
 */
export function NavProgressBar() {
  const pathname = usePathname();
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    // When pathname changes, start the animation
    setIsChanging(true);
    
    // Simulate a completion delay (roughly matches chunk load time)
    const timer = setTimeout(() => {
      setIsChanging(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isChanging && (
        <motion.div
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "70%" }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{ 
            width: { duration: 0.3, ease: "easeOut" },
            opacity: { delay: 0.2, duration: 0.2 }
          }}
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-cyan-400 z-[9999] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
