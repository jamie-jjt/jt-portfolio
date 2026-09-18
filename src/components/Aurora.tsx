/**
 * A lightweight, animated aurora/nebula backdrop built from blurred
 * gradient blobs. Pure CSS — no WebGL cost. Meant to sit behind content
 * inside a rounded, clipped container.
 */
export default function Aurora({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* base wash */}
      <div className="absolute inset-0 bg-[#0a0714]" />

      {/* drifting color blobs */}
      <div className="absolute -left-1/4 top-[-20%] h-[70%] w-[70%] animate-aurora-1 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.55),transparent_60%)] blur-3xl" />
      <div className="absolute right-[-15%] top-[10%] h-[65%] w-[65%] animate-aurora-2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.5),transparent_60%)] blur-3xl" />
      <div className="absolute bottom-[-25%] left-1/3 h-[70%] w-[70%] animate-aurora-3 rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.4),transparent_60%)] blur-3xl" />
      <div className="absolute bottom-[10%] right-[20%] h-[45%] w-[45%] animate-aurora-1 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.25),transparent_60%)] blur-3xl" />

      {/* subtle grain + top-down legibility gradient handled by consumer */}
    </div>
  );
}
