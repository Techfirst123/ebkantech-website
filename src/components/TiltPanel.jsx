import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * The hero's instrument panel: a surface that tilts toward the pointer in 3D.
 *
 * Why this and not a flat screenshot — these products ARE dashboards, so
 * giving the panel real depth makes it read as a device you could reach out
 * and touch rather than a marketing image.
 *
 * Tilt is opt-in by capability, not assumed:
 *   - off until mounted, so the prerendered HTML (scripts/prerender.mjs) and
 *     the first client paint agree and hydration stays clean
 *   - off for a coarse pointer — a finger has no hover, and tilt would only
 *     fight the tap
 *   - off under prefers-reduced-motion
 * In every off case the panel simply renders flat, with all its content.
 */
export default function TiltPanel({ children, max = 7, className = "", ...rest }) {
  const ref = useRef(null);
  const [live, setLive] = useState(false);

  // Raw pointer position, -0.5 … 0.5 relative to the panel's own box.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLive(fine && !calm);
  }, []);

  const onMove = (e) => {
    if (!live || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={live ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
