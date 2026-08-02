export const lagomMotion = {
  fadeIn: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }
  },
  hoverLift: {
    whileHover: { y: -2, boxShadow: 'var(--shadow-elevated)' },
    transition: { duration: 0.12 }
  },
  staggerChildren: {
    staggerChildren: 0.04,
    delayChildren: 0.1
  }
}
