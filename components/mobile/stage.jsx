/* ============================================================
   FLOW — Stage wrapper for mobile screens (two-column)
   ============================================================ */
function MobileStage({ title, caption, children, points }) {
  return (
    <div className="scroll" style={{ height: "100%", overflowY: "auto", background: "var(--bg)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 44, alignItems: "center", justifyContent: "center", maxWidth: 1000, margin: "0 auto", padding: "44px", minHeight: "100%" }}>
        <div style={{ flex: "1 1 300px", maxWidth: 440, minWidth: 260 }}>
          <span className="eyebrow">Attendee experience</span>
          <h1 className="display" style={{ fontSize: 30, color: "var(--text)", marginTop: 8, lineHeight: 1.15, textWrap: "balance" }}>{title}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, marginTop: 12, lineHeight: 1.55 }}>{caption}</p>
          {points && (
            <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "flex", flexDirection: "column", gap: 13 }}>
              {points.map((p, i) => (
                <li key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 14, color: "var(--text)" }}>
                  <span style={{ width: 22, height: 22, borderRadius: 6, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", flexShrink: 0, marginTop: 1 }}><IconCheck size={14} /></span>
                  <span style={{ color: "var(--text-muted)", lineHeight: 1.45 }}>{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ width: 322, height: 630, position: "relative", flexShrink: 0 }}>
          <div style={{ transform: "scale(0.8)", transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { MobileStage });
