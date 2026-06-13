/* ============================================================
   FLOW — Guest Management (upload, categories, status, invites)
   ============================================================ */
function GuestManagement({ guests, setGuests, onNavigate }) {
  const cats = FLOW.CATEGORIES;
  const [active, setActive] = React.useState("All");
  const [q, setQ] = React.useState("");
  const [uploadFor, setUploadFor] = React.useState(null);
  const [inviteFor, setInviteFor] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const byCat = FLOW.byCategory(guests);

  const list = guests.filter((g) => (active === "All" || g.category === active) && (!q || `${g.name} ${g.org} ${g.email} ${g.phone}`.toLowerCase().includes(q.toLowerCase())));

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2600); }

  function addUploaded(category, rows) {
    const next = rows.map((r, i) => ({
      id: Date.now() + i, name: r.name, category, status: "invited",
      org: r.org || "—", phone: r.phone, email: r.email,
      code: "FLW-" + (Math.floor(Math.random() * 9000) + 1000), checkinTime: null, channel: "—",
    }));
    setGuests([...next, ...guests]);
    setUploadFor(null);
    showToast(`${rows.length} guests added to ${category} as Invited`);
  }

  function sendInvites(channel, scope) {
    const targets = scope === "all" ? list : list.filter((g) => g.status === "invited" || g.status === "noresponse");
    setGuests(guests.map((g) => (targets.find((t) => t.id === g.id) ? { ...g, channel } : g)));
    setInviteFor(null);
    showToast(`Invitations sent to ${targets.length} guests via ${channel}`);
  }

  return (
    <div className="scroll" style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "28px 36px 60px", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 22 }}>
          <div>
            <span className="eyebrow">Guests</span>
            <h1 className="display" style={{ fontSize: 28, color: "var(--text)", marginTop: 6, whiteSpace: "nowrap" }}>Guest management</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>{guests.length} guests across {cats.length} categories</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => setUploadFor(active === "All" ? cats[0].name : active)}><IconUpload size={17} /> Upload guests</button>
            <button className="btn btn-primary" onClick={() => setInviteFor(active)}><IconSend size={17} /> Send invitations</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "232px 1fr", gap: 18, alignItems: "start" }}>
          {/* category rail */}
          <div className="card" style={{ padding: 8 }}>
            <CatRailItem name="All" count={guests.length} active={active === "All"} onClick={() => setActive("All")} />
            <div style={{ height: 1, background: "var(--border)", margin: "6px 4px" }} />
            {cats.map((c) => (
              <CatRailItem key={c.name} name={c.name} count={byCat[c.name]?.total || 0} color={catColor(c.name)}
                active={active === c.name} onClick={() => setActive(c.name)}
                onUpload={() => setUploadFor(c.name)} />
            ))}
          </div>

          {/* guests table */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid var(--border)" }}>
              <h3 className="display" style={{ fontSize: 16, color: "var(--text)", marginRight: "auto", display: "flex", alignItems: "center", gap: 9 }}>
                {active !== "All" && <span style={{ width: 9, height: 9, borderRadius: 3, background: catColor(active) }} />}
                {active} <span style={{ color: "var(--text-faint)", fontWeight: 400, fontFamily: "var(--font-body)", fontSize: 14 }}>· {list.length}</span>
              </h3>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }}><IconSearch size={16} /></span>
                <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search guests…" style={{ width: 220, padding: "8px 12px 8px 34px" }} />
              </div>
            </div>
            <div className="scroll" style={{ maxHeight: 520, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead style={{ position: "sticky", top: 0, background: "var(--surface-2)", zIndex: 1 }}>
                  <tr style={{ textAlign: "left", color: "var(--text-faint)", fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    <th style={{ padding: "11px 18px", fontWeight: 700 }}>Name</th>
                    <th style={{ padding: "11px 12px", fontWeight: 700 }}>Contact</th>
                    {active === "All" && <th style={{ padding: "11px 12px", fontWeight: 700 }}>Category</th>}
                    <th style={{ padding: "11px 12px", fontWeight: 700 }}>Status</th>
                    <th style={{ padding: "11px 18px", fontWeight: 700, textAlign: "right" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((g) => (
                    <tr key={g.id} style={{ borderTop: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                          <Avatar name={g.name} size={32} />
                          <div><div style={{ fontWeight: 600, color: "var(--text)" }}>{g.name}</div><div style={{ fontSize: 12, color: "var(--text-faint)" }}>{g.org}</div></div>
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", color: "var(--text-muted)", fontSize: 12.5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><IconMail size={13} /> {g.email}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}><IconPhone size={13} /> {g.phone}</div>
                      </td>
                      {active === "All" && <td style={{ padding: "10px 12px" }}><CategoryChip name={g.category} small /></td>}
                      <td style={{ padding: "10px 12px" }}><StatusChip status={g.status} small /></td>
                      <td style={{ padding: "10px 18px", textAlign: "right" }}>
                        <button style={iconBtn} title="More"><IconMore size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {list.length === 0 && <tr><td colSpan={5} style={{ padding: 36, textAlign: "center", color: "var(--text-faint)" }}>No guests here yet. Upload a list to get started.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {uploadFor && <UploadModal category={uploadFor} onClose={() => setUploadFor(null)} onConfirm={addUploaded} />}
      {inviteFor !== null && <InviteModal scopeLabel={inviteFor} count={list.length} onClose={() => setInviteFor(null)} onSend={sendInvites} />}
      {toast && <Toast msg={toast} />}
    </div>
  );
}

function CatRailItem({ name, count, color, active, onClick, onUpload }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 9, cursor: "pointer",
      background: active ? "var(--accent-soft)" : "transparent",
    }} className="catrail">
      {color ? <span style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} /> : <span style={{ width: 8 }} />}
      <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: active ? "var(--accent)" : "var(--text)" }}>{name}</span>
      {onUpload && <button onClick={(e) => { e.stopPropagation(); onUpload(); }} className="railupload" style={{ ...iconBtn, width: 26, height: 26, opacity: 0 }} title={`Upload to ${name}`}><IconUpload size={14} /></button>}
      <span style={{ fontSize: 12.5, color: "var(--text-faint)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{count}</span>
    </div>
  );
}

function UploadModal({ category, onClose, onConfirm }) {
  const sample = [
    { name: "Akosua Frimpong", phone: "+233 54 220 9981", email: "akosua.f@helios.com", org: "Helios Ventures" },
    { name: "Daniel Mensah", phone: "+233 50 118 4420", email: "daniel@northbridge.com", org: "Northbridge LP" },
    { name: "Vivian Cole", phone: "+233 24 776 3310", email: "vivian.cole@sterling.com", org: "Sterling & Co" },
    { name: "Kwesi Boateng", phone: "+233 27 905 1188", email: "kwesi.b@atlasfunds.com", org: "Atlas Funds" },
  ];
  const [uploaded, setUploaded] = React.useState(false);
  return (
    <Modal onClose={onClose} title="Upload guest list" width={620}>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16 }}>Uploading into <b style={{ color: "var(--text)" }}>{category}</b>. Guests start with status <StatusChip status="invited" small />.</p>
      {!uploaded ? (
        <button onClick={() => setUploaded(true)} style={{ width: "100%", border: "1.5px dashed var(--border-strong)", background: "var(--surface-2)", borderRadius: "var(--radius)", padding: "30px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--text-muted)", cursor: "pointer" }}>
          <IconUpload size={26} /><span style={{ fontSize: 14, fontWeight: 600 }}>Drop a CSV or Excel file</span>
          <span style={{ fontSize: 12.5, color: "var(--text-faint)" }}>Columns: Full Name · Phone Number · Email Address</span>
        </button>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "var(--st-registered-fg)", fontWeight: 600, marginBottom: 12 }}><IconCheck size={16} /> guests-{category.toLowerCase().replace(/[^a-z]/g, "")}.csv — {sample.length} rows mapped</div>
          <div className="card" style={{ overflow: "hidden", boxShadow: "none" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ background: "var(--surface-2)", color: "var(--text-faint)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>
                <th style={{ padding: "9px 12px", fontWeight: 700 }}>Full Name</th><th style={{ padding: "9px 12px", fontWeight: 700 }}>Phone</th><th style={{ padding: "9px 12px", fontWeight: 700 }}>Email</th>
              </tr></thead>
              <tbody>{sample.map((r, i) => <tr key={i} style={{ borderTop: "1px solid var(--border)" }}><td style={{ padding: "9px 12px", fontWeight: 600, color: "var(--text)" }}>{r.name}</td><td style={{ padding: "9px 12px", color: "var(--text-muted)" }}>{r.phone}</td><td style={{ padding: "9px 12px", color: "var(--text-muted)" }}>{r.email}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" disabled={!uploaded} style={{ opacity: uploaded ? 1 : 0.45 }} onClick={() => onConfirm(category, sample)}>Add {uploaded ? sample.length : ""} guests</button>
      </div>
    </Modal>
  );
}

function InviteModal({ scopeLabel, count, onClose, onSend }) {
  const [channel, setChannel] = React.useState("WhatsApp");
  const [scope, setScope] = React.useState("pending");
  const channels = [{ k: "Email", icon: <IconMail size={17} /> }, { k: "SMS", icon: <IconChat size={17} /> }, { k: "WhatsApp", icon: <IconPhone size={17} /> }];
  return (
    <Modal onClose={onClose} title="Send invitations" width={560}>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18 }}>Send to <b style={{ color: "var(--text)" }}>{scopeLabel === "All" ? "all categories" : scopeLabel}</b>. Recipients get a branded invitation with Accept / Decline.</p>
      <span className="eyebrow" style={{ display: "block", marginBottom: 9 }}>Channel</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {channels.map((c) => (
          <button key={c.k} onClick={() => setChannel(c.k)} className="card" style={{ padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", borderColor: channel === c.k ? "var(--accent)" : "var(--border)", boxShadow: channel === c.k ? "0 0 0 3px var(--accent-ring)" : "none", color: channel === c.k ? "var(--accent)" : "var(--text-muted)" }}>
            {c.icon}<span style={{ fontSize: 13, fontWeight: 600 }}>{c.k}</span>
          </button>
        ))}
      </div>
      <span className="eyebrow" style={{ display: "block", marginBottom: 9 }}>Message preview</span>
      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 16, fontSize: 13.5, color: "var(--text)", lineHeight: 1.55, marginBottom: 18 }}>
        You've been invited to <b>{FLOW.EVENT.title}</b> as a member of <b>{scopeLabel === "All" ? "our guest list" : scopeLabel}</b>. Tap below to confirm your attendance. <span style={{ color: "var(--accent)" }}>flow.events/meridian-summit-26</span>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
        {[{ k: "pending", l: "Only Invited & No Response" }, { k: "all", l: "Everyone in scope" }].map((o) => (
          <button key={o.k} onClick={() => setScope(o.k)} className="chip" style={{ cursor: "pointer", border: "1px solid", borderColor: scope === o.k ? "var(--accent)" : "var(--border)", background: scope === o.k ? "var(--accent-soft)" : "var(--surface)", color: scope === o.k ? "var(--accent)" : "var(--text-muted)", padding: "8px 12px" }}>{o.l}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSend(channel, scope)}><IconSend size={16} /> Send via {channel}</button>
      </div>
    </Modal>
  );
}

function Modal({ children, onClose, title, width = 560 }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,22,34,0.4)", backdropFilter: "blur(3px)", display: "grid", placeItems: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="card animate-in" style={{ width, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", padding: 26, boxShadow: "var(--shadow-lg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 className="display" style={{ fontSize: 20, color: "var(--text)" }}>{title}</h2>
          <button onClick={onClose} style={iconBtn}><IconClose size={16} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Toast({ msg }) {
  return (
    <div className="animate-in" style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "var(--nav-bg-solid)", color: "var(--nav-fg)", padding: "13px 20px", borderRadius: 99, fontSize: 13.5, fontWeight: 600, boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 10, zIndex: 120 }}>
      <span style={{ color: "var(--nav-accent)" }}><IconCheck size={17} /></span>{msg}
    </div>
  );
}

Object.assign(window, { GuestManagement, Modal, Toast });
