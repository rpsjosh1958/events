/* ============================================================
   FLOW — Mobile screens (RSVP + Check-in) in iOS frames
   ============================================================ */

/* ---------- Attendee RSVP invitation ---------- */
function RSVPMobile() {
  const [state, setState] = React.useState("invite"); // invite | accepted | declined
  const cat = "VIP";
  const catC = catColor(cat);
  return (
    <IOSDevice title="" height={788}>
      <div className="scroll" style={{ height: "100%", overflowY: "auto", background: "var(--surface-2)" }}>
        {/* branded banner */}
        <div style={{ position: "relative", height: 196, background: "linear-gradient(150deg, var(--nav-bg-solid), #2a2f4d 70%, var(--accent))", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20, color: "#fff", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 16, left: 20 }}><Wordmark size={15} color="#fff" accent="rgba(255,255,255,0.18)" tight /></div>
          <div style={{ position: "absolute", inset: 0, opacity: 0.16, background: "radial-gradient(circle at 78% 18%, #fff 0, transparent 42%)" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.8 }}>You're invited</span>
          <h1 className="display" style={{ fontSize: 23, lineHeight: 1.12, marginTop: 6, maxWidth: 280 }}>{FLOW.EVENT.title}</h1>
        </div>

        <div style={{ padding: 20 }}>
          {state !== "invite" ? (
            <ConfirmCard state={state} cat={cat} catC={catC} onReset={() => setState("invite")} />
          ) : (
            <React.Fragment>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 99, background: catC + "1A", color: catC, fontSize: 12.5, fontWeight: 700, marginBottom: 16 }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: catC }} /> Invited as {cat}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 22 }}>
                <InfoRow icon={<IconCalendar size={18} />} label="Date" value={FLOW.EVENT.dateLabel} />
                <InfoRow icon={<IconClock size={18} />} label="Time" value={FLOW.EVENT.timeLabel} />
                <InfoRow icon={<IconMap size={18} />} label="Venue" value={FLOW.EVENT.venue} />
              </div>
              <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 22 }}>{FLOW.EVENT.description}</p>
              <button onClick={() => setState("accepted")} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "15px", fontSize: 15, marginBottom: 10 }}><IconCheck size={18} /> Accept invitation</button>
              <button onClick={() => setState("declined")} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 14.5 }}>Decline</button>
            </React.Fragment>
          )}
        </div>
      </div>
    </IOSDevice>
  );
}

function ConfirmCard({ state, cat, catC, onReset }) {
  if (state === "declined") {
    return (
      <div className="animate-in" style={{ textAlign: "center", padding: "20px 6px" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--st-declined-bg)", color: "var(--st-declined-fg)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}><IconClose size={28} /></div>
        <h2 className="display" style={{ fontSize: 20, color: "var(--text)", marginBottom: 6 }}>Invitation declined</h2>
        <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 20 }}>Thanks for letting us know. The organiser has been notified. Changed your mind?</p>
        <button onClick={onReset} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: 13 }}>Back to invitation</button>
      </div>
    );
  }
  return (
    <div className="animate-in" style={{ textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--st-registered-bg)", color: "var(--st-registered-fg)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}><IconCheck size={28} /></div>
      <h2 className="display" style={{ fontSize: 21, color: "var(--text)", marginBottom: 5 }}>You're confirmed</h2>
      <p style={{ fontSize: 13.5, color: "var(--text-muted)", marginBottom: 20 }}>Show this QR code at the entrance for fast check-in.</p>
      <div className="card" style={{ padding: 22, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <QRCode value="FLW-VIP-9921-meridian" size={172} fg="var(--text)" bg="var(--surface)" />
        <div style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em", fontWeight: 600, color: "var(--text)", fontSize: 17 }}>FLW-9921</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px", borderRadius: 99, background: catC + "1A", color: catC, fontSize: 12, fontWeight: 700 }}><span style={{ width: 6, height: 6, borderRadius: 2, background: catC }} /> {cat}</div>
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "13px 15px", textAlign: "left", display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <span style={{ color: "var(--st-registered-fg)" }}><IconMail size={18} /></span>
        <span style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.4 }}>Confirmation sent via email, SMS & WhatsApp with your event details.</span>
      </div>
      <button onClick={onReset} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: 12, fontSize: 13 }}>Add to calendar</button>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <span style={{ width: 38, height: 38, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--accent)", flexShrink: 0 }}>{icon}</span>
      <div><div style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div><div style={{ fontSize: 14, color: "var(--text)", fontWeight: 600 }}>{value}</div></div>
    </div>
  );
}

/* ---------- Event-day check-in scanner ---------- */
function CheckinMobile({ guests, setGuests }) {
  const [scanned, setScanned] = React.useState(null); // guest object
  const [dupe, setDupe] = React.useState(false);
  const eligible = guests.filter((g) => g.status === "registered" || g.status === "checkedin");
  const recent = guests.filter((g) => g.status === "checkedin").slice(0, 4);
  const checkedCount = guests.filter((g) => g.status === "checkedin").length;

  function simulateScan() {
    const pick = eligible[Math.floor(Math.random() * eligible.length)];
    setScanned(pick);
    setDupe(pick.status === "checkedin");
  }
  function confirmCheckin() {
    setGuests(guests.map((g) => (g.id === scanned.id ? { ...g, status: "checkedin", checkinTime: "now" } : g)));
    setScanned({ ...scanned, status: "checkedin" });
    setDupe(false);
  }

  return (
    <IOSDevice dark title="" height={788}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#0c0f1a", color: "#fff" }}>
        <div style={{ padding: "8px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div><div style={{ fontSize: 11, opacity: 0.6, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Check-in</div><div className="display" style={{ fontSize: 17, whiteSpace: "nowrap" }}>Meridian Summit</div></div>
          <div style={{ textAlign: "right", flexShrink: 0 }}><div className="display" style={{ fontSize: 22, color: "#fff", lineHeight: 1 }}>{checkedCount}</div><div style={{ fontSize: 10.5, opacity: 0.55 }}>checked in</div></div>
        </div>

        {/* camera viewport */}
        <div style={{ position: "relative", margin: "0 20px", borderRadius: 20, overflow: "hidden", height: 270, background: "radial-gradient(circle at 50% 40%, #1c2742, #0a0d16)", display: "grid", placeItems: "center" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          {/* scan frame */}
          <div style={{ position: "relative", width: 168, height: 168 }}>
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h],i) => (
              <span key={i} style={{ position: "absolute", [v]: 0, [h]: 0, width: 34, height: 34, [`border${v[0].toUpperCase()+v.slice(1)}`]: "3px solid var(--nav-accent)", [`border${h[0].toUpperCase()+h.slice(1)}`]: "3px solid var(--nav-accent)", borderRadius: v === "top" ? (h === "left" ? "12px 0 0 0" : "0 12px 0 0") : (h === "left" ? "0 0 0 12px" : "0 0 12px 0") }} />
            ))}
            <div className="scanline" style={{ position: "absolute", left: 8, right: 8, height: 2, background: "var(--nav-accent)", boxShadow: "0 0 12px var(--nav-accent)", borderRadius: 2 }} />
          </div>
          <div style={{ position: "absolute", bottom: 14, fontSize: 12, opacity: 0.6 }}>Point at a guest's QR code</div>
        </div>

        <div style={{ padding: "16px 20px" }}>
          <button onClick={simulateScan} className="btn" style={{ width: "100%", justifyContent: "center", background: "var(--nav-accent)", color: "#0c0f1a", padding: 14, fontSize: 14.5, marginBottom: 10 }}><IconQR size={18} /> Simulate scan</button>
          <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "#fff", border: "none", borderRadius: 10, padding: 12, fontSize: 13.5, fontWeight: 600 }}><IconSearch size={16} /> Search manually</button>
        </div>

        {/* recent */}
        <div style={{ flex: 1, padding: "4px 20px 16px", overflowY: "auto" }} className="scroll">
          <div style={{ fontSize: 11, opacity: 0.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Recent check-ins</div>
          {recent.map((g) => (
            <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <Avatar name={g.name} size={32} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>{g.name}</div><div style={{ fontSize: 11.5, opacity: 0.5 }}>{g.category}</div></div>
              <span style={{ color: "var(--nav-accent)" }}><IconCheck size={18} /></span>
            </div>
          ))}
        </div>
      </div>

      {/* scanned sheet */}
      {scanned && (
        <div onClick={() => setScanned(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", zIndex: 40 }}>
          <div onClick={(e) => e.stopPropagation()} className="animate-in" style={{ width: "100%", background: "var(--surface)", borderRadius: "22px 22px 0 0", padding: "22px 22px 30px", color: "var(--text)" }}>
            <div style={{ width: 40, height: 4, borderRadius: 4, background: "var(--border-strong)", margin: "0 auto 18px" }} />
            {dupe && scanned.status === "checkedin" ? (
              <div style={{ display: "flex", gap: 11, alignItems: "center", background: "var(--st-invited-bg)", color: "var(--st-invited-fg)", padding: "11px 14px", borderRadius: 12, marginBottom: 16, fontSize: 13, fontWeight: 600 }}><IconShield size={20} /> Already checked in earlier today</div>
            ) : null}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <Avatar name={scanned.name} size={56} />
              <div><div className="display" style={{ fontSize: 21, color: "var(--text)" }}>{scanned.name}</div><div style={{ fontSize: 13, color: "var(--text-muted)" }}>{scanned.org}</div></div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <CategoryChip name={scanned.category} /><StatusChip status={scanned.status} />
            </div>
            {scanned.status === "checkedin" && !dupe ? (
              <div style={{ textAlign: "center", padding: "10px 0 4px" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--st-registered-bg)", color: "var(--st-registered-fg)", display: "grid", placeItems: "center", margin: "0 auto 10px" }}><IconCheck size={28} /></div>
                <div className="display" style={{ fontSize: 18, color: "var(--text)" }}>Checked in!</div>
              </div>
            ) : scanned.status === "checkedin" && dupe ? (
              <button onClick={() => setScanned(null)} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: 14 }}>Dismiss</button>
            ) : (
              <button onClick={confirmCheckin} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 15, fontSize: 15 }}><IconCheck size={18} /> Check in {scanned.name.split(" ")[0]}</button>
            )}
          </div>
        </div>
      )}
    </IOSDevice>
  );
}

Object.assign(window, { RSVPMobile, CheckinMobile });
