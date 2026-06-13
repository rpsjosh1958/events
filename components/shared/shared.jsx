/* ============================================================
   FLOW — shared UI atoms
   ============================================================ */

function Wordmark({ size = 18, color = "currentColor", accent = "var(--accent)", tight, compact }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9, color }}>
      <span style={{
        width: size * 1.55, height: size * 1.55, borderRadius: "50%",
        display: "grid", placeItems: "center", flexShrink: 0,
        background: accent, color: "var(--accent-contrast)",
      }}>
        <IconLogo size={size * 0.95} />
      </span>
      {!compact && (
        <span className="display" style={{ fontSize: size, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1 }}>
          Flow
          {!tight && <span style={{ color: "var(--text-faint)", fontWeight: 400, fontFamily: "var(--font-body)", fontSize: size * 0.62, marginLeft: 6 }}>by Peregrine</span>}
        </span>
      )}
    </span>
  );
}

function Avatar({ name, size = 36, tint }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const palette = ["#9A7634","#3E6F63","#8A5A7A","#4A6491","#7A6A4E","#56635E"];
  const c = palette[(tint ?? hashStr(name)) % palette.length];
  return (
    <span style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      display: "grid", placeItems: "center",
      background: c + "22", color: c, fontWeight: 700, fontSize: size * 0.36,
      letterSpacing: "0.02em",
    }}>{initials}</span>
  );
}
function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997; return h; }

function StatusChip({ status, small }) {
  const m = FLOW.STATUS_META[status];
  if (!m) return null;
  return (
    <span className="chip" style={{
      background: m.bg, color: m.fg,
      fontSize: small ? 11 : 12, padding: small ? "3px 8px" : "4px 10px",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.fg }} />
      {m.label}
    </span>
  );
}

const CAT_COLORS = ["#9A7634","#3E6F63","#8A5A7A","#4A6491","#6B6F77","#A2603B"];
function catColor(name) {
  const idx = (FLOW.CATEGORIES.findIndex((c) => c.name === name));
  return CAT_COLORS[(idx >= 0 ? idx : hashStr(name)) % CAT_COLORS.length];
}
function CategoryChip({ name, small }) {
  const c = catColor(name);
  return (
    <span className="chip" style={{ background: c + "1A", color: c, fontSize: small ? 11 : 12 }}>
      <span style={{ width: 6, height: 6, borderRadius: 2, background: c }} />
      {name}
    </span>
  );
}

/* Stacked horizontal segment bar */
function SegmentBar({ segments, height = 10, rounded = true }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div style={{ display: "flex", width: "100%", height, borderRadius: rounded ? 99 : 4, overflow: "hidden", background: "var(--surface-inset)" }}>
      {segments.map((s, i) => (
        <div key={i} title={`${s.label}: ${s.value}`} style={{ width: `${(s.value / total) * 100}%`, background: s.color, transition: "width .5s cubic-bezier(.2,.7,.3,1)" }} />
      ))}
    </div>
  );
}

/* Donut ring */
function Donut({ segments, size = 132, thickness = 16, center }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-inset)" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * C;
          const el = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={s.color} strokeWidth={thickness}
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset}
              strokeLinecap="butt" style={{ transition: "stroke-dasharray .6s" }} />
          );
          offset += len;
          return el;
        })}
      </svg>
      {center && (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
          {center}
        </div>
      )}
    </div>
  );
}

/* Deterministic faux-QR */
function QRCode({ value = "FLOW", size = 160, fg = "#16182a", bg = "#fff", pad = 10 }) {
  const N = 25;
  const cells = React.useMemo(() => {
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) { h ^= value.charCodeAt(i); h = Math.imul(h, 16777619); }
    const rnd = () => { h += 0x6D2B79F5; let t = Math.imul(h ^ (h >>> 15), 1 | h); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const g = Array.from({ length: N }, () => Array.from({ length: N }, () => rnd() > 0.5));
    return g;
  }, [value]);
  const cell = (size - pad * 2) / N;
  const finder = (x, y) => (
    <g key={`f${x}${y}`}>
      <rect x={pad + x * cell} y={pad + y * cell} width={cell * 7} height={cell * 7} rx={cell} fill={fg} />
      <rect x={pad + (x + 1) * cell} y={pad + (y + 1) * cell} width={cell * 5} height={cell * 5} rx={cell * 0.8} fill={bg} />
      <rect x={pad + (x + 2) * cell} y={pad + (y + 2) * cell} width={cell * 3} height={cell * 3} rx={cell * 0.6} fill={fg} />
    </g>
  );
  const inFinder = (r, c) => (r < 8 && c < 8) || (r < 8 && c > 16) || (r > 16 && c < 8);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ borderRadius: 12, background: bg, display: "block" }}>
      <rect width={size} height={size} rx={12} fill={bg} />
      {cells.map((row, r) => row.map((on, c) =>
        on && !inFinder(r, c) ? <rect key={`${r}-${c}`} x={pad + c * cell} y={pad + r * cell} width={cell} height={cell} rx={cell * 0.32} fill={fg} /> : null
      ))}
      {finder(0, 0)}{finder(18, 0)}{finder(0, 18)}
    </svg>
  );
}

/* Sparkline-ish mini bars for registration trend */
function MiniBars({ data, color = "var(--accent)", height = 44, width = 120 }) {
  const max = Math.max(...data, 1);
  const bw = width / data.length;
  return (
    <svg width={width} height={height}>
      {data.map((v, i) => {
        const h = (v / max) * (height - 4);
        return <rect key={i} x={i * bw + bw * 0.18} y={height - h} width={bw * 0.64} height={h} rx={2} fill={color} opacity={0.35 + 0.65 * (i / data.length)} />;
      })}
    </svg>
  );
}

Object.assign(window, { Wordmark, Avatar, StatusChip, CategoryChip, catColor, SegmentBar, Donut, QRCode, MiniBars, hashStr, CAT_COLORS });
