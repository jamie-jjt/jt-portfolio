import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Realistic website/app mockups shown inside a laptop frame for the
 * Capabilities showcase. Each screen renders a believable UI with real text,
 * buttons, and layout — in the galaxy theme. SpinWheel and Graviton mirror
 * real projects; the rest are illustrative concepts.
 */

function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-t-xl border border-white/15 border-b-0 bg-[#0a0812] shadow-2xl shadow-black/50">
        <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.04] px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <div className="ml-2 h-3 flex-1 rounded bg-white/[0.05]" />
        </div>
        <div className="relative h-52 sm:h-56">{children}</div>
      </div>
      <div className="relative mx-auto h-3 w-[112%] -translate-x-[5%] rounded-b-xl bg-gradient-to-b from-[#1a1730] to-[#0c0a16] shadow-lg">
        <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-black/40" />
      </div>
    </div>
  );
}

/* ---------------- Real projects ---------------- */

export function SpinWheelPreview({ active }: { active: boolean }) {
  const segments = ['#a855f7', '#6366f1', '#7c3aed', '#d946ef', '#8b5cf6', '#818cf8'];
  const seg = 360 / segments.length;
  const gradient = segments.map((c, i) => `${c} ${i * seg}deg ${(i + 1) * seg}deg`).join(', ');
  return (
    <Laptop>
      <div className="flex h-full flex-col bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.28),transparent_55%)]">
        <div className="flex items-center justify-between px-4 py-2.5 text-[9px]">
          <span className="font-bold text-white">🎡 PrizeWheel</span>
          <div className="flex items-center gap-3 text-white/45">
            <span>Editor</span><span>Presets</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-white/70">Sign in</span>
          </div>
        </div>
        <div className="flex flex-1 items-center px-4">
          <div className="flex-1">
            <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-violet-glow/80">Giveaway ready</div>
            <div className="mt-1 text-base font-bold leading-tight text-white">Spin to win<br />amazing prizes</div>
            <div className="mt-2 text-[8px] leading-relaxed text-white/45">Set weighted odds per segment for fair, controlled draws.</div>
            <div className="mt-2.5 flex gap-1.5">
              <div className="rounded-full bg-nebula-gradient px-3 py-1 text-[8px] font-bold text-white shadow-glow">SPIN</div>
              <div className="rounded-full border border-white/15 px-2.5 py-1 text-[8px] text-white/70">Edit odds</div>
            </div>
          </div>
          <div className="flex w-[42%] items-center justify-center">
            <div className="relative h-[92px] w-[92px]">
              {/* pointer sits just above the wheel's top rim, pointing down */}
              <div className="absolute -top-1.5 left-1/2 z-20 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[9px] border-x-transparent border-t-white drop-shadow" />
              <motion.div
                className="h-[92px] w-[92px] rounded-full shadow-[0_0_28px_-4px_rgba(168,85,247,0.8)]"
                style={{ background: `conic-gradient(${gradient})` }}
                animate={active ? { rotate: [0, 1440] } : { rotate: 0 }}
                transition={active ? { duration: 4, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0.3 }}
              >
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 bg-void" />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/8 px-4 py-1.5 text-[7px] text-white/40">
          <span>6 segments · weighted</span><span>Last winner: iPad Pro</span>
        </div>
      </div>
    </Laptop>
  );
}

export function GravitonPreview({ active }: { active: boolean }) {
  return (
    <Laptop>
      <div className="flex h-full flex-col font-mono">
        <div className="flex items-center justify-between px-4 py-2.5 text-[9px]">
          <span className="font-bold text-white">⚡ Graviton Converter</span>
          <div className="flex gap-3 text-white/45"><span>Scan</span><span>Convert</span><span>Docs</span></div>
        </div>
        <div className="px-4 text-[8px] text-white/50">
          <span className="text-emerald-300">➜</span> converting <span className="text-violet-glow">payment-service</span> · x86_64 → arm64
        </div>
        <div className="flex flex-1 items-stretch gap-2 px-4 py-2">
          <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <div className="mb-1.5 flex items-center justify-between text-[7px]"><span className="text-white/40">source.c · x86</span><span className="text-rose-400/70">SSE2</span></div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded bg-rose-400/40" /><div className="h-1.5 w-2/3 rounded bg-white/15" />
              <div className="h-1.5 w-4/5 rounded bg-white/15" /><div className="h-1.5 w-1/2 rounded bg-rose-400/40" /><div className="h-1.5 w-3/5 rounded bg-white/15" />
            </div>
          </div>
          <motion.svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 self-center text-violet-glow" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" animate={active ? { x: [0, 4, 0] } : { x: 0 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </motion.svg>
          <div className="flex-1 rounded-lg border border-violet-glow/30 bg-violet-core/10 p-2.5">
            <div className="mb-1.5 flex items-center justify-between text-[7px]"><span className="text-white/40">output · arm64</span><span className="text-emerald-300">NEON</span></div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded bg-emerald-400/50" /><div className="h-1.5 w-3/4 rounded bg-white/20" />
              <div className="h-1.5 w-full rounded bg-white/20" /><div className="h-1.5 w-2/3 rounded bg-emerald-400/50" /><div className="h-1.5 w-4/5 rounded bg-white/20" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-white/8 px-4 py-2 text-[7px]">
          <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-400" animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-white/55">✓ Docker build passed · sse2neon headers generated · 0 errors</span>
        </div>
      </div>
    </Laptop>
  );
}

/* ---------------- Concept mockups ---------------- */

export function DashboardPreview() {
  const bars = [45, 70, 50, 85, 60, 95, 72, 64];
  return (
    <Laptop>
      <div className="flex h-full">
        <div className="flex w-14 shrink-0 flex-col gap-2.5 border-r border-white/8 bg-white/[0.02] p-2.5">
          <div className="h-4 w-4 rounded bg-nebula-gradient" />
          {['▦', '◷', '⛃', '⚙'].map((g, i) => (
            <div key={i} className={`flex h-4 items-center text-[9px] ${i === 0 ? 'text-violet-glow' : 'text-white/30'}`}>{g}</div>
          ))}
        </div>
        <div className="flex-1 space-y-2 p-3">
          <div className="flex items-center justify-between">
            <div><div className="text-[10px] font-bold text-white">Overview</div><div className="text-[7px] text-white/40">Last 30 days</div></div>
            <div className="rounded-md bg-white/[0.06] px-2 py-1 text-[7px] text-white/60">Export</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[['Revenue', '$8.2M', '+12%'], ['Users', '12.4k', '+8%'], ['Uptime', '98%', '+0.3%']].map(([l, v, d]) => (
              <div key={l} className="rounded-md border border-white/8 bg-white/[0.04] p-1.5">
                <div className="text-[7px] text-white/40">{l}</div>
                <div className="text-[10px] font-bold text-white">{v}</div>
                <div className="text-[6px] text-emerald-300">{d}</div>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-white/8 bg-white/[0.03] p-2">
            <div className="mb-1 text-[7px] text-white/40">Weekly traffic</div>
            <div className="flex h-14 items-end gap-1">
              {bars.map((h, i) => (
                <motion.div key={i} className="flex-1 rounded-t bg-nebula-gradient" initial={{ height: '10%' }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Laptop>
  );
}

export function StorePreview() {
  const products = [['Aurora Tee', '$29'], ['Nova Cap', '$19'], ['Flux Bag', '$59']];
  return (
    <Laptop>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-2.5 text-[9px]">
          <span className="font-bold tracking-wide text-white">◆ LUXE</span>
          <div className="flex items-center gap-3 text-white/45"><span>Shop</span><span>New</span><span>About</span><span className="rounded-full bg-white/10 px-1.5 py-0.5 text-white/70">Cart · 2</span></div>
        </div>
        <div className="mx-3 flex items-center justify-between rounded-lg bg-gradient-to-r from-violet-core/50 to-nebula-pink/30 p-3">
          <div><div className="text-[11px] font-bold text-white">Season Sale</div><div className="text-[8px] text-white/70">Up to 40% off everything</div></div>
          <div className="rounded-full bg-white px-2.5 py-1 text-[8px] font-bold text-void">Shop now</div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 p-3">
          {products.map(([name, price]) => (
            <div key={name} className="flex flex-col rounded-lg border border-white/8 bg-white/[0.04] p-1.5">
              <div className="mb-1.5 flex-1 rounded bg-gradient-to-br from-violet-core/40 to-nebula-blue/25" />
              <div className="text-[7px] font-medium text-white/80">{name}</div>
              <div className="mt-0.5 flex items-center justify-between">
                <span className="text-[8px] font-bold text-gradient">{price}</span>
                <span className="rounded bg-white/10 px-1 text-[7px] text-white/60">+ Add</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Laptop>
  );
}

export function GamePreview({ active }: { active: boolean }) {
  return (
    <Laptop>
      <div className="relative flex h-full flex-col bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,0.3),transparent_60%)]">
        <div className="flex items-center justify-between px-4 py-2.5 text-[9px]">
          <div className="flex items-center gap-2">
            <span className="text-white/70">❤</span>
            <div className="flex gap-1">{[0, 1, 2].map((i) => (<div key={i} className="h-2 w-2 rotate-45 bg-nebula-pink shadow-[0_0_6px_rgba(217,70,239,0.9)]" />))}</div>
          </div>
          <span className="font-mono text-white/70">SCORE <span className="text-violet-glow">9,310</span></span>
        </div>
        <div className="relative flex-1">
          <motion.div className="absolute h-7 w-7 rounded-full bg-gradient-to-br from-violet-glow to-nebula-blue shadow-[0_0_18px_rgba(168,85,247,0.9)]"
            animate={active ? { x: [12, 170, 70, 210, 12], y: [12, 50, 85, 35, 12] } : { x: 12, y: 12 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
          {[{ l: '72%', t: '28%' }, { l: '38%', t: '66%' }, { l: '86%', t: '52%' }, { l: '55%', t: '38%' }].map((p, i) => (
            <div key={i} className="absolute h-2 w-2 rounded-full bg-white/50 shadow-[0_0_6px_rgba(255,255,255,0.5)]" style={{ left: p.l, top: p.t }} />
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 pb-3">
          <span className="font-mono text-[8px] text-white/50">LV 7</span>
          <div className="h-2 flex-1 rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-nebula-gradient" /></div>
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[7px] text-white/60">⏸</span>
        </div>
      </div>
    </Laptop>
  );
}

export function BusinessPreview() {
  const rows = [
    ['Acme Corp onboarding', 'Active', 'text-emerald-300 border-emerald-400/30'],
    ['Q3 budget approval', 'Review', 'text-violet-glow border-violet-glow/30'],
    ['Vendor contract #221', 'Done', 'text-white/50 border-white/15'],
    ['New user access req.', 'Active', 'text-emerald-300 border-emerald-400/30'],
  ];
  return (
    <Laptop>
      <div className="flex h-full">
        <div className="flex w-14 shrink-0 flex-col gap-2.5 border-r border-white/8 bg-white/[0.02] p-2.5">
          <div className="h-4 w-4 rounded bg-nebula-gradient" />
          {['▤', '☰', '◷', '⚙'].map((g, i) => (
            <div key={i} className={`flex h-4 items-center text-[9px] ${i === 1 ? 'text-violet-glow' : 'text-white/30'}`}>{g}</div>
          ))}
        </div>
        <div className="flex-1 space-y-2 p-3">
          <div className="flex items-center justify-between">
            <div><div className="text-[10px] font-bold text-white">Approvals</div><div className="text-[7px] text-white/40">4 pending</div></div>
            <div className="rounded-md bg-nebula-gradient px-2 py-1 text-[7px] font-semibold text-white">+ New</div>
          </div>
          {rows.map(([name, tag, c], i) => (
            <motion.div key={i} className="flex items-center justify-between rounded-md border border-white/8 bg-white/[0.04] px-2 py-1.5"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-violet-core/60 to-nebula-blue/40" />
                <span className="text-[8px] text-white/75">{name}</span>
              </div>
              <span className={`rounded-full border px-1.5 py-0.5 text-[7px] ${c}`}>{tag}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Laptop>
  );
}
