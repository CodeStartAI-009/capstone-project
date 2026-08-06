export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden cyber-grid" aria-hidden="true">
      <div className="absolute left-1/4 top-24 h-48 w-48 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 h-56 w-56 rounded-full bg-violet-500/12 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    </div>
  );
}

