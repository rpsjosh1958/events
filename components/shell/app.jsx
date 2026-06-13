/* ============================================================
   FLOW — App shell, navigation, theme + tweaks
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "peregrine",
  "accent": "theme",
  "scale": 100,
  "navGlass": true
}/*EDITMODE-END*/;

const ACCENTS = {
  theme: null,
  brass: ["#9A7634", "#846227"],
  emerald: ["#0E8A63", "#0B7252"],
  indigo: ["#4A6491", "#3A527A"],
  plum: ["#8A5A7A", "#724963"],
  terracotta: ["#A2603B", "#874D2D"],
};

const RAIL_W = 76;
const FULL_W = 248;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState("dashboard");
  const [guests, setGuests] = React.useState(() => FLOW.GUESTS.map((g) => ({ ...g })));
  const [collapsed, setCollapsed] = React.useState(() => {
    try { return localStorage.getItem("flow:nav") === "1"; } catch (e) { return false; }
  });
  const [tip, setTip] = React.useState(null); // { label, top } when collapsed hover
  React.useEffect(() => { try { localStorage.setItem("flow:nav", collapsed ? "1" : "0"); } catch (e) {} }, [collapsed]);
  React.useEffect(() => { if (!collapsed) setTip(null); }, [collapsed]);
  const NAV_W = collapsed ? RAIL_W : FULL_W;
  const showTip = (label) => (e) => { if (!collapsed) return; const r = e.currentTarget.getBoundingClientRect(); setTip({ label, top: r.top + r.height / 2 }); };
  const hideTip = () => setTip(null);

  // apply theme + accent overrides to :root
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t.direction);
    const pair = ACCENTS[t.accent];
    if (pair) {
      root.style.setProperty("--accent", pair[0]);
      root.style.setProperty("--accent-hover", pair[1]);
      root.style.setProperty("--accent-soft", pair[0] + "22");
      root.style.setProperty("--accent-ring", pair[0] + "44");
      root.style.setProperty("--nav-accent", pair[0]);
    } else {
      ["--accent", "--accent-hover", "--accent-soft", "--accent-ring", "--nav-accent"].forEach((p) => root.style.removeProperty(p));
    }
    root.style.fontSize = (t.scale / 100) + "rem";
  }, [t.direction, t.accent, t.scale]);

  const navGroups = [
    { label: "Organiser", items: [
      { k: "dashboard", label: "Dashboard", icon: IconDashboard },
      { k: "create", label: "Create event", icon: IconPlus },
      { k: "guests", label: "Guests", icon: IconUsers },
    ]},
    { label: "Attendee experience", items: [
      { k: "rsvp", label: "Invitation & RSVP", icon: IconMail },
      { k: "checkin", label: "Check-in app", icon: IconScan },
    ]},
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "var(--bg)" }}>
      {/* sidebar */}
      <aside style={{
        position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 10,
        width: NAV_W, display: "flex", flexDirection: "column",
        background: t.navGlass && t.direction === "peregrine" ? "var(--nav-bg)" : "var(--nav-bg-solid)",
        backdropFilter: t.direction === "peregrine" && t.navGlass ? "blur(12px)" : "none",
        borderRight: "1px solid var(--nav-border)", color: "var(--nav-fg)",
        backgroundImage: t.direction === "peregrine" ? "linear-gradient(180deg, var(--nav-bg-solid), #11141f)" : "none",
        transition: "width .26s cubic-bezier(.4,.0,.2,1)",
      }}>
        {/* collapse toggle — sits on the right edge */}
        <button onClick={() => setCollapsed((c) => !c)} title={collapsed ? "Expand sidebar" : "Collapse sidebar"} style={{
          position: "absolute", top: 26, right: -13, zIndex: 20,
          width: 26, height: 26, borderRadius: "50%",
          background: "var(--nav-bg-solid)", border: "1px solid var(--nav-border)",
          color: "var(--nav-fg-muted)", display: "grid", placeItems: "center",
          boxShadow: "var(--shadow-sm)", transition: "transform .26s, color .15s",
        }} className="navtoggle">
          <IconChevL size={15} style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform .26s" }} />
        </button>

        <div style={{ padding: collapsed ? "20px 0 16px" : "20px 20px 16px", display: "flex", justifyContent: "center" }}>
          <Wordmark size={17} color="var(--nav-fg)" accent="var(--nav-accent)" tight={collapsed} compact={collapsed} />
        </div>

        {/* event switcher */}
        <div style={{ margin: collapsed ? "4px auto 14px" : "4px 14px 14px", padding: collapsed ? 0 : "11px 13px", borderRadius: 12, background: collapsed ? "transparent" : "color-mix(in srgb, var(--nav-fg) 7%, transparent)", border: collapsed ? "none" : "1px solid var(--nav-border)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", justifyContent: "center" }}
          onMouseEnter={showTip("Meridian Summit")} onMouseLeave={hideTip}>
          <span style={{ width: collapsed ? 40 : 34, height: collapsed ? 40 : 34, borderRadius: collapsed ? 11 : 9, background: "var(--nav-accent)", color: "var(--nav-bg-solid)", display: "grid", placeItems: "center", flexShrink: 0, transition: "width .2s, height .2s" }}><IconCalendar size={collapsed ? 20 : 18} /></span>
          {!collapsed && (
            <React.Fragment>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nav-fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Meridian Summit</div>
                <div style={{ fontSize: 11, color: "var(--nav-fg-muted)" }}>18 Jun 2026 · Accra</div>
              </div>
              <IconChevD size={15} style={{ color: "var(--nav-fg-muted)" }} />
            </React.Fragment>
          )}
        </div>

        <nav style={{ flex: 1, padding: collapsed ? "4px 12px" : "4px 12px", overflowY: "auto", overflowX: "hidden" }} className="scroll">
          {navGroups.map((grp) => (
            <div key={grp.label} style={{ marginBottom: 18 }}>
              {collapsed
                ? <div style={{ height: 1, background: "var(--nav-border)", margin: "0 8px 10px" }} />
                : <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nav-fg-muted)", padding: "0 10px 8px" }}>{grp.label}</div>}
              {grp.items.map((it) => {
                const active = route === it.k;
                const I = it.icon;
                return (
                  <button key={it.k} onClick={() => setRoute(it.k)}
                    onMouseEnter={showTip(it.label)} onMouseLeave={hideTip} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 11,
                    padding: collapsed ? "11px 0" : "9px 11px", marginBottom: 2,
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: 9, border: "none", textAlign: "left", cursor: "pointer", fontSize: 13.5, fontWeight: 600,
                    background: active ? "var(--nav-active-bg)" : "transparent",
                    color: active ? "var(--nav-active-fg)" : "var(--nav-fg-muted)",
                    position: "relative",
                  }} className="navitem">
                    {active && !collapsed && <span style={{ position: "absolute", left: 0, top: 9, bottom: 9, width: 3, borderRadius: 3, background: "var(--nav-accent)" }} />}
                    {active && collapsed && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", height: 20, width: 3, borderRadius: 3, background: "var(--nav-accent)" }} />}
                    <I size={18} /> {!collapsed && it.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div style={{ padding: collapsed ? "12px 0" : "12px 14px", borderTop: "1px solid var(--nav-border)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}
          onMouseEnter={showTip("Ama Boateng")} onMouseLeave={hideTip}>
          <Avatar name="Ama Boateng" size={32} />
          {!collapsed && (
            <React.Fragment>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--nav-fg)" }}>Ama Boateng</div>
                <div style={{ fontSize: 11, color: "var(--nav-fg-muted)" }}>Organiser · 2 team</div>
              </div>
              <IconBell size={17} style={{ color: "var(--nav-fg-muted)" }} />
            </React.Fragment>
          )}
        </div>
      </aside>

      {/* collapsed-nav tooltip (fixed, never clipped) */}
      {collapsed && tip && (
        <div style={{
          position: "fixed", left: RAIL_W + 10, top: tip.top, transform: "translateY(-50%)",
          background: "var(--nav-bg-solid)", color: "var(--nav-fg)", padding: "7px 12px",
          borderRadius: 8, fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap",
          boxShadow: "var(--shadow-lg)", border: "1px solid var(--nav-border)",
          zIndex: 50, pointerEvents: "none",
        }} className="animate-in">
          {tip.label}
          <span style={{ position: "absolute", left: -5, top: "50%", transform: "translateY(-50%) rotate(45deg)", width: 9, height: 9, background: "var(--nav-bg-solid)", borderLeft: "1px solid var(--nav-border)", borderBottom: "1px solid var(--nav-border)" }} />
        </div>
      )}

      {/* main */}
      <main style={{ marginLeft: NAV_W, height: "100vh", overflow: "hidden", position: "relative", transition: "margin-left .26s cubic-bezier(.4,.0,.2,1)" }}>
        {route === "dashboard" && <Dashboard guests={guests} onNavigate={(k) => setRoute(k === "invite" ? "guests" : k)} />}
        {route === "create" && <CreateEvent onExit={() => setRoute("dashboard")} />}
        {route === "guests" && <GuestManagement guests={guests} setGuests={setGuests} onNavigate={setRoute} />}
        {route === "rsvp" && <MobileStage title="Invitation & RSVP" caption="What guests see when they tap an invitation link. Try Accept or Decline." points={["Event-branded invitation page, themed per event","One tap to Accept or Decline — no account needed","On accept: instant QR code + confirmation by email, SMS & WhatsApp"]}><RSVPMobile /></MobileStage>}
        {route === "checkin" && <MobileStage title="Event-day check-in" caption="Used by the organiser and up to 3 team members on the door. Tap “Simulate scan” to try it." points={["Scan a guest's QR code, or search by name","Category & RSVP status shown at a glance","Duplicate check-ins are detected and blocked"]}><CheckinMobile guests={guests} setGuests={setGuests} /></MobileStage>}
      </main>

      <TweaksPanel>
        <TweakSection label="Direction" />
        <TweakRadio label="Style" value={t.direction} options={["peregrine", "flow"]} onChange={(v) => setTweak("direction", v)} />
        <p style={{ fontSize: 11.5, color: "var(--text-faint)", margin: "2px 2px 4px", lineHeight: 1.4 }}>
          {t.direction === "peregrine" ? "Premium & editorial — ink, brass, serif display." : "Clean & utilitarian — emerald, crisp grotesque, data-dense."}
        </p>
        <TweakSection label="Accent" />
        <AccentPicker value={t.accent} onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Layout" />
        <TweakSlider label="Text scale" value={t.scale} min={90} max={115} step={5} unit="%" onChange={(v) => setTweak("scale", v)} />
        {t.direction === "peregrine" && <TweakToggle label="Glass sidebar" value={t.navGlass} onChange={(v) => setTweak("navGlass", v)} />}
      </TweaksPanel>
    </div>
  );
}

function AccentPicker({ value, onChange }) {
  const keys = Object.keys(ACCENTS);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "2px 0 4px" }}>
      {keys.map((k) => {
        const pair = ACCENTS[k];
        const active = value === k;
        return (
          <button key={k} onClick={() => onChange(k)} title={k} style={{
            width: 30, height: 30, borderRadius: 8, cursor: "pointer",
            border: active ? "2px solid var(--text)" : "1px solid var(--border-strong)",
            background: pair ? pair[0] : "conic-gradient(from 210deg, #9A7634, #0E8A63, #4A6491, #9A7634)",
            display: "grid", placeItems: "center", color: "#fff",
          }}>{k === "theme" ? <IconSparkle size={14} /> : null}</button>
        );
      })}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
