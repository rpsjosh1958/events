/* ============================================================
   FLOW — Event Creation flow (wizard)
   ============================================================ */
function CreateEvent({ onExit }) {
  const STEPS = ["Details", "Preset", "Categories", "Links"];
  const [step, setStep] = React.useState(0);
  const [details, setDetails] = React.useState({
    title: "", description: "", date: "", time: "", venue: "",
  });
  const [preset, setPreset] = React.useState(null);
  const [cats, setCats] = React.useState([]);
  const [banner, setBanner] = React.useState(false);

  function choosePreset(key) {
    setPreset(key);
    setCats(FLOW.PRESETS[key].categories.map((name, i) => ({ id: i + 1, name })));
  }

  const canNext = [
    details.title.trim().length > 0,
    !!preset,
    cats.length > 0,
    true,
  ][step];

  return (
    <div className="scroll" style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "26px 36px 80px", maxWidth: 880, margin: "0 auto" }}>
        {/* header + stepper */}
        <button className="btn btn-ghost" onClick={onExit} style={{ marginBottom: 18, border: "none", padding: "6px 10px", marginLeft: -10 }}><IconChevL size={16} /> All events</button>
        <h1 className="display" style={{ fontSize: 30, color: "var(--text)", marginBottom: 4 }}>Create an event</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14.5, marginBottom: 26 }}>Private by default — only people with your registration links can sign up.</p>

        <div style={{ display: "flex", gap: 0, marginBottom: 30 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => i < step && setStep(i)} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", padding: 0, cursor: i < step ? "pointer" : "default" }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", display: "grid", placeItems: "center",
                  fontSize: 13, fontWeight: 700, flexShrink: 0,
                  background: i < step ? "var(--accent)" : i === step ? "var(--accent-soft)" : "var(--surface-inset)",
                  color: i < step ? "var(--accent-contrast)" : i === step ? "var(--accent)" : "var(--text-faint)",
                  border: i === step ? "1px solid var(--accent)" : "1px solid transparent",
                }}>{i < step ? <IconCheck size={15} /> : i + 1}</span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: i <= step ? "var(--text)" : "var(--text-faint)" }}>{s}</span>
              </button>
              {i < STEPS.length - 1 && <span style={{ flex: 1, height: 2, background: i < step ? "var(--accent)" : "var(--border)", margin: "0 12px", borderRadius: 2 }} />}
            </div>
          ))}
        </div>

        <div key={step} className="animate-in">
          {step === 0 && <StepDetails details={details} setDetails={setDetails} banner={banner} setBanner={setBanner} />}
          {step === 1 && <StepPreset preset={preset} choosePreset={choosePreset} />}
          {step === 2 && <StepCategories cats={cats} setCats={setCats} presetLabel={preset && FLOW.PRESETS[preset].label} />}
          {step === 3 && <StepLinks details={details} cats={cats} />}
        </div>

        {/* footer nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 22, borderTop: "1px solid var(--border)" }}>
          <button className="btn btn-ghost" onClick={() => (step === 0 ? onExit() : setStep(step - 1))}>{step === 0 ? "Cancel" : "Back"}</button>
          {step < STEPS.length - 1 ? (
            <button className="btn btn-primary" disabled={!canNext} style={{ opacity: canNext ? 1 : 0.45 }} onClick={() => canNext && setStep(step + 1)}>Continue <IconChevR size={16} /></button>
          ) : (
            <button className="btn btn-primary" onClick={onExit}><IconSparkle size={16} /> Publish event</button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepDetails({ details, setDetails, banner, setBanner }) {
  const set = (k) => (e) => setDetails({ ...details, [k]: e.target.value });
  return (
    <div className="card" style={{ padding: 26 }}>
      <h2 className="display" style={{ fontSize: 19, color: "var(--text)", marginBottom: 20 }}>Event details</h2>
      <div style={{ display: "grid", gap: 18 }}>
        <label className="field"><span>Event title</span>
          <input className="input" value={details.title} onChange={set("title")} placeholder="e.g. Meridian Capital — Annual Investor Summit" /></label>
        <label className="field"><span>Description</span>
          <textarea className="input" value={details.description} onChange={set("description")} rows={3} placeholder="What is this event about?" style={{ resize: "vertical" }} /></label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <label className="field"><span>Date</span><input className="input" type="date" value={details.date} onChange={set("date")} /></label>
          <label className="field"><span>Time</span><input className="input" type="time" value={details.time} onChange={set("time")} /></label>
        </div>
        <label className="field"><span>Venue / location</span>
          <input className="input" value={details.venue} onChange={set("venue")} placeholder="e.g. Kempinski Hotel Gold Coast City, Accra" /></label>
        <label className="field"><span>Event banner</span>
          <button onClick={() => setBanner(!banner)} style={{
            width: "100%", border: "1.5px dashed var(--border-strong)", background: banner ? "var(--accent-soft)" : "var(--surface-2)",
            borderRadius: "var(--radius)", padding: banner ? 0 : "26px", display: "flex", flexDirection: "column", alignItems: "center",
            gap: 8, color: "var(--text-muted)", cursor: "pointer", overflow: "hidden",
          }}>
            {banner ? (
              <div style={{ width: "100%", height: 120, background: "linear-gradient(120deg, var(--accent), var(--accent-hover))", display: "grid", placeItems: "center", color: "var(--accent-contrast)", position: "relative" }}>
                <IconImage size={26} /><span style={{ fontSize: 12.5, marginTop: 6 }}>banner-summit.jpg · uploaded</span>
              </div>
            ) : (<><IconUpload size={22} /><span style={{ fontSize: 13.5, fontWeight: 600 }}>Click to upload a banner</span><span style={{ fontSize: 12, color: "var(--text-faint)" }}>PNG or JPG, 1600×600 recommended</span></>)}
          </button>
        </label>
      </div>
    </div>
  );
}

function StepPreset({ preset, choosePreset }) {
  const meta = {
    corporate: { desc: "VIP, speakers, sponsors, delegates & more", icon: <IconUsers size={20} /> },
    wedding: { desc: "Family, friends, VIP, vendors, protocol", icon: <IconSparkle size={20} /> },
    conference: { desc: "Speakers, sponsors, delegates, exhibitors", icon: <IconCalendar size={20} /> },
    church: { desc: "Pastors, ministers, volunteers, choir", icon: <IconShield size={20} /> },
    custom: { desc: "Start from a blank slate", icon: <IconPlus size={20} /> },
  };
  return (
    <div>
      <h2 className="display" style={{ fontSize: 19, color: "var(--text)", marginBottom: 6 }}>Choose a preset</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18 }}>Presets pre-fill guest categories. You can edit everything in the next step.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {Object.keys(FLOW.PRESETS).map((key) => {
          const p = FLOW.PRESETS[key];
          const active = preset === key;
          return (
            <button key={key} onClick={() => choosePreset(key)} className="card" style={{
              padding: 18, textAlign: "left", cursor: "pointer",
              borderColor: active ? "var(--accent)" : "var(--border)",
              boxShadow: active ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-sm)",
              outline: "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", background: active ? "var(--accent)" : "var(--accent-soft)", color: active ? "var(--accent-contrast)" : "var(--accent)" }}>{meta[key].icon}</span>
                {active && <span style={{ color: "var(--accent)" }}><IconCheck size={18} /></span>}
              </div>
              <div className="display" style={{ fontSize: 16, color: "var(--text)", marginTop: 12, marginBottom: 3 }}>{p.label}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{meta[key].desc}</div>
              {p.categories.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
                  {p.categories.slice(0, 4).map((c) => <span key={c} className="chip" style={{ background: "var(--surface-inset)", color: "var(--text-muted)", fontSize: 11, padding: "2px 8px" }}>{c}</span>)}
                  {p.categories.length > 4 && <span className="chip" style={{ background: "transparent", color: "var(--text-faint)", fontSize: 11 }}>+{p.categories.length - 4}</span>}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepCategories({ cats, setCats, presetLabel }) {
  const [adding, setAdding] = React.useState("");
  const [editId, setEditId] = React.useState(null);
  const [editVal, setEditVal] = React.useState("");
  function add() {
    const v = adding.trim(); if (!v) return;
    setCats([...cats, { id: Date.now(), name: v }]); setAdding("");
  }
  function commitEdit(id) {
    setCats(cats.map((c) => (c.id === id ? { ...c, name: editVal.trim() || c.name } : c))); setEditId(null);
  }
  return (
    <div className="card" style={{ padding: 26 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <h2 className="display" style={{ fontSize: 19, color: "var(--text)" }}>Guest categories</h2>
        <span className="chip" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>{presetLabel}</span>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18 }}>Add, rename or remove categories. Each can have its own registration link. No limit.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {cats.map((c) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: "var(--surface-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: catColor(c.name), flexShrink: 0 }} />
            {editId === c.id ? (
              <input autoFocus className="input" value={editVal} onChange={(e) => setEditVal(e.target.value)} onBlur={() => commitEdit(c.id)} onKeyDown={(e) => e.key === "Enter" && commitEdit(c.id)} style={{ padding: "5px 9px", flex: 1 }} />
            ) : (
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{c.name}</span>
            )}
            <button onClick={() => { setEditId(c.id); setEditVal(c.name); }} style={iconBtn}><IconEdit size={16} /></button>
            <button onClick={() => setCats(cats.filter((x) => x.id !== c.id))} style={iconBtn}><IconTrash size={16} /></button>
          </div>
        ))}
        {cats.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "var(--text-faint)", fontSize: 13.5, border: "1.5px dashed var(--border-strong)", borderRadius: "var(--radius)" }}>No categories yet — add your first below.</div>}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input className="input" value={adding} onChange={(e) => setAdding(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Add a category — e.g. VVIP, Exhibitors…" />
        <button className="btn btn-soft" onClick={add}><IconPlus size={16} /> Add</button>
      </div>
    </div>
  );
}

function StepLinks({ details, cats }) {
  const slug = (details.title || "your-event").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 28) || "your-event";
  const base = `flow.events/${slug}`;
  const [copied, setCopied] = React.useState(null);
  function copy(text, key) { navigator.clipboard?.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 1400); }
  function LinkRow({ label, url, color }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--surface-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
        {color && <span style={{ width: 9, height: 9, borderRadius: 3, background: color, flexShrink: 0 }} />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{label}</div>
          <div style={{ fontSize: 12.5, color: "var(--accent)", fontFamily: "var(--font-display)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{url}</div>
        </div>
        <button className="btn btn-ghost" style={{ padding: "7px 12px" }} onClick={() => copy(url, label)}>{copied === label ? <><IconCheck size={15} /> Copied</> : <><IconCopy size={15} /> Copy</>}</button>
      </div>
    );
  }
  return (
    <div className="card" style={{ padding: 26 }}>
      <h2 className="display" style={{ fontSize: 19, color: "var(--text)", marginBottom: 4 }}>Registration links</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>Anyone who registers via a category link is automatically assigned to that category.</p>
      <div style={{ marginBottom: 12 }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>Main event link</span>
        <LinkRow label="General registration" url={base} />
      </div>
      <span className="eyebrow" style={{ display: "block", marginBottom: 8, marginTop: 18 }}>Category links</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {cats.map((c) => (
          <LinkRow key={c.id} label={`${c.name} registration`} color={catColor(c.name)} url={`${base}/${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} />
        ))}
      </div>
    </div>
  );
}

const iconBtn = { display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-muted)" };

Object.assign(window, { CreateEvent });
