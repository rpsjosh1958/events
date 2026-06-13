/* ============================================================
   FLOW — Organiser Dashboard
   ============================================================ */
function StatCard({ label, value, sub, accent, icon, delay = 0 }) {
  return (
    <div className="card animate-in" style={{ padding: "18px 20px", animationDelay: delay + "ms", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="eyebrow">{label}</span>
        <span style={{ color: accent || "var(--text-faint)" }}>{icon}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span className="display" style={{ fontSize: 34, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em" }}>{value}</span>
        {sub && <span style={{ fontSize: 13, color: "var(--text-faint)", fontWeight: 500 }}>{sub}</span>}
      </div>
    </div>
  );
}

function Dashboard({ guests, onNavigate }) {
  const [catFilter, setCatFilter] = React.useState("All");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [q, setQ] = React.useState("");

  const counts = FLOW.statusCounts(guests);
  const byCat = FLOW.byCategory(guests);
  const cats = FLOW.CATEGORIES;

  const statusSegments = [
    { label: "Checked In", value: counts.checkedin, color: "var(--st-checkedin-fg)" },
    { label: "Registered", value: counts.registered, color: "var(--st-registered-fg)" },
    { label: "Invited", value: counts.invited, color: "var(--st-invited-fg)" },
    { label: "No Response", value: counts.noresponse, color: "var(--st-noresponse-fg)" },
    { label: "Declined", value: counts.declined, color: "var(--st-declined-fg)" },
  ];
  const confirmed = counts.registered + counts.checkedin;
  const responseRate = Math.round(((confirmed + counts.declined) / counts.total) * 100);

  const filtered = guests.filter((g) => {
    if (catFilter !== "All" && g.category !== catFilter) return false;
    if (statusFilter !== "all" && g.status !== statusFilter) return false;
    if (q && !(`${g.name} ${g.org} ${g.email}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="scroll" style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "28px 36px 60px", maxWidth: 1240, margin: "0 auto" }}>
        {/* page header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 26 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span className="eyebrow">Corporate Event</span>
              <span style={{ width: 4, height: 4, borderRadius: 99, background: "var(--text-faint)" }} />
              <span style={{ fontSize: 12, color: "var(--st-registered-fg)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "var(--st-registered-fg)" }} /> Live · accepting RSVPs
              </span>
            </div>
            <h1 className="display" style={{ fontSize: 30, color: "var(--text)", lineHeight: 1.15, maxWidth: 440, textWrap: "balance" }}>{FLOW.EVENT.title}</h1>
            <div style={{ display: "flex", gap: 18, marginTop: 14, color: "var(--text-muted)", fontSize: 13.5, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><IconCalendar size={16} /> {FLOW.EVENT.dateLabel}</span>
              <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><IconClock size={16} /> {FLOW.EVENT.timeLabel}</span>
              <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><IconMap size={16} /> {FLOW.EVENT.venueShort}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => onNavigate("guests")}><IconUsers size={17} /> Manage guests</button>
            <button className="btn btn-primary" onClick={() => onNavigate("invite")}><IconSend size={17} /> Send invitations</button>
          </div>
        </div>

        {/* stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 16 }}>
          <StatCard label="Invitations Sent" value={counts.invitesSent} icon={<IconSend size={18} />} delay={0} />
          <StatCard label="Registrations" value={confirmed} sub={`${Math.round((confirmed / counts.total) * 100)}%`} accent="var(--st-registered-fg)" icon={<IconCheck size={18} />} delay={40} />
          <StatCard label="Checked In" value={counts.checkedin} accent="var(--st-checkedin-fg)" icon={<IconScan size={18} />} delay={80} />
          <StatCard label="Declined" value={counts.declined} accent="var(--st-declined-fg)" icon={<IconClose size={18} />} delay={120} />
          <StatCard label="No Response" value={counts.noresponse} accent="var(--st-noresponse-fg)" icon={<IconClock size={18} />} delay={160} />
        </div>

        {/* charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginBottom: 16 }}>
          {/* RSVP overview donut */}
          <div className="card animate-in" style={{ padding: 22, display: "flex", gap: 22, alignItems: "center", animationDelay: "120ms" }}>
            <Donut segments={statusSegments} size={140} thickness={17} center={
              <div>
                <div className="display" style={{ fontSize: 30, fontWeight: 600, color: "var(--text)" }}>{responseRate}%</div>
                <div style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 600 }}>responded</div>
              </div>
            } />
            <div style={{ flex: 1 }}>
              <h3 className="display" style={{ fontSize: 16, color: "var(--text)", marginBottom: 12 }}>RSVP overview</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {statusSegments.map((s) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 3, background: s.color }} />
                    <span style={{ color: "var(--text-muted)", flex: 1 }}>{s.label}</span>
                    <span style={{ color: "var(--text)", fontWeight: 700 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* by category */}
          <div className="card animate-in" style={{ padding: 22, animationDelay: "160ms" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 className="display" style={{ fontSize: 16, color: "var(--text)" }}>Registrations by category</h3>
              <span style={{ fontSize: 12, color: "var(--text-faint)", display: "inline-flex", gap: 12 }}>
                <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}><span style={{ width: 8, height: 8, background: "var(--st-checkedin-fg)", borderRadius: 2 }} /> Checked in</span>
                <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}><span style={{ width: 8, height: 8, background: "var(--st-registered-fg)", borderRadius: 2 }} /> Registered</span>
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cats.map((c) => {
                const d = byCat[c.name];
                return (
                  <div key={c.name} style={{ display: "grid", gridTemplateColumns: "120px 1fr 44px", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 600, display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: catColor(c.name) }} />{c.name}
                    </span>
                    <SegmentBar height={9} segments={[
                      { label: "Checked in", value: d.checkedin, color: "var(--st-checkedin-fg)" },
                      { label: "Registered", value: d.registered, color: "var(--st-registered-fg)" },
                      { label: "Other", value: d.invited + d.noresponse + d.declined, color: "var(--surface-inset)" },
                    ]} />
                    <span style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      <b style={{ color: "var(--text)" }}>{d.checkedin + d.registered}</b>/{d.total}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* attendee list */}
        <div className="card animate-in" style={{ padding: 0, animationDelay: "200ms", overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", borderBottom: "1px solid var(--border)" }}>
            <h3 className="display" style={{ fontSize: 16, color: "var(--text)", marginRight: "auto" }}>Attendees <span style={{ color: "var(--text-faint)", fontWeight: 400, fontFamily: "var(--font-body)", fontSize: 14 }}>· {filtered.length}</span></h3>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }}><IconSearch size={16} /></span>
              <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, org, email…" style={{ width: 230, paddingLeft: 34, padding: "8px 12px 8px 34px" }} />
            </div>
            <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: "auto", padding: "8px 12px" }}>
              <option value="all">All statuses</option>
              {Object.keys(FLOW.STATUS_META).map((s) => <option key={s} value={s}>{FLOW.STATUS_META[s].label}</option>)}
            </select>
          </div>

          {/* category filter pills */}
          <div className="scroll" style={{ display: "flex", gap: 8, padding: "12px 22px", borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
            {["All", ...cats.map((c) => c.name)].map((name) => {
              const active = catFilter === name;
              const n = name === "All" ? guests.length : (byCat[name]?.total || 0);
              return (
                <button key={name} onClick={() => setCatFilter(name)} className="chip" style={{
                  cursor: "pointer", border: "1px solid",
                  borderColor: active ? "transparent" : "var(--border)",
                  background: active ? (name === "All" ? "var(--text)" : catColor(name)) : "var(--surface)",
                  color: active ? "#fff" : "var(--text-muted)",
                  padding: "6px 12px", fontSize: 12.5,
                }}>
                  {name} <span style={{ opacity: 0.7, marginLeft: 2 }}>{n}</span>
                </button>
              );
            })}
          </div>

          {/* table */}
          <div className="scroll" style={{ maxHeight: 380, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
              <thead style={{ position: "sticky", top: 0, background: "var(--surface-2)", zIndex: 1 }}>
                <tr style={{ textAlign: "left", color: "var(--text-faint)", fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  <th style={{ padding: "11px 22px", fontWeight: 700 }}>Guest</th>
                  <th style={{ padding: "11px 12px", fontWeight: 700 }}>Category</th>
                  <th style={{ padding: "11px 12px", fontWeight: 700 }}>Status</th>
                  <th style={{ padding: "11px 12px", fontWeight: 700 }}>Channel</th>
                  <th style={{ padding: "11px 22px", fontWeight: 700, textAlign: "right" }}>Code</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g) => (
                  <tr key={g.id} style={{ borderTop: "1px solid var(--border)" }} className="rowhover">
                    <td style={{ padding: "10px 22px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                        <Avatar name={g.name} size={34} />
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--text)" }}>{g.name}</div>
                          <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{g.org}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px" }}><CategoryChip name={g.category} small /></td>
                    <td style={{ padding: "10px 12px" }}><StatusChip status={g.status} small /></td>
                    <td style={{ padding: "10px 12px", color: "var(--text-muted)" }}>{g.channel}</td>
                    <td style={{ padding: "10px 22px", textAlign: "right", color: "var(--text-faint)", fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>{g.code}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} style={{ padding: 40, textAlign: "center", color: "var(--text-faint)" }}>No attendees match these filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
