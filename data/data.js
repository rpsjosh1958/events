/* ============================================================
   FLOW — sample data (corporate event)
   ============================================================ */
(function () {
  const PRESETS = {
    corporate: {
      label: "Corporate Event",
      categories: ["VIP", "Speakers", "Sponsors", "Delegates", "Staff", "Media"],
    },
    wedding: {
      label: "Wedding",
      categories: ["Groom's Family", "Bride's Family", "Friends of Groom", "Friends of Bride", "VIP", "Vendors", "Protocol"],
    },
    conference: {
      label: "Conference",
      categories: ["Speakers", "Sponsors", "Delegates", "Exhibitors", "Media", "Staff"],
    },
    church: {
      label: "Church Event",
      categories: ["Pastors", "Ministers", "Volunteers", "Choir", "Media", "Delegates"],
    },
    custom: {
      label: "Custom Event",
      categories: [],
    },
  };

  const EVENT = {
    title: "Meridian Capital — Annual Investor Summit",
    host: "Meridian Capital Partners",
    preset: "corporate",
    dateLabel: "Thursday, 18 June 2026",
    timeLabel: "9:00 AM – 5:30 PM GMT",
    venue: "Kempinski Hotel Gold Coast City, Accra",
    venueShort: "Kempinski Gold Coast City",
    description:
      "A full-day gathering of Meridian's portfolio founders, limited partners and industry leaders — featuring keynote sessions, the 2026 outlook, and an evening reception.",
    link: "flow.events/meridian-summit-26",
  };

  // category meta: order, accent tint index used for chips/dots
  const CATEGORIES = [
    { name: "VIP", tint: 0 },
    { name: "Speakers", tint: 1 },
    { name: "Sponsors", tint: 2 },
    { name: "Delegates", tint: 3 },
    { name: "Staff", tint: 4 },
    { name: "Media", tint: 5 },
  ];

  const FIRST = ["Amara","Kwame","Zainab","David","Lena","Tunde","Grace","Marcus","Priya","Sefa","Olivia","Kofi","Naomi","Ethan","Adwoa","Samuel","Chloe","Yaw","Fatima","Daniel","Esi","Noah","Maya","Kojo","Hannah","Ibrahim","Sophie","Kwesi","Rita","Leo","Abena","Julian","Nadia","Felix","Akosua","Omar","Clara","Bright","Vivian","Theo"];
  const LAST = ["Mensah","Osei","Adjei","Bello","Owusu","Asante","Okafor","Boateng","Sharma","Annan","Cole","Darko","Quartey","Mills","Tetteh","Addo","Nkrumah","Lamptey","Sarpong","Agyeman","Dankwa","Frimpong","Yeboah","Acheampong","Ofori"];
  const ORGS = ["Meridian Capital","Helios Ventures","Northbridge LP","Sterling & Co","Acra Holdings","Vanta Partners","Lumen Group","Crestwood","Atlas Funds","Volta Energy","Equator Bank","Sunbird Media","TechCabal","Reuters","Bloomberg","CitiNews","Self-employed","Sankofa Advisory","Pinnacle Trust","GreenField Agri"];

  const STATUS_ROTATION = [
    "registered","checkedin","registered","invited","registered","declined",
    "registered","noresponse","checkedin","registered","invited","registered",
    "checkedin","registered","noresponse","declined","registered","invited",
  ];

  // weight categories so distribution looks real
  const CAT_WEIGHTS = [
    ...Array(6).fill("VIP"),
    ...Array(7).fill("Speakers"),
    ...Array(8).fill("Sponsors"),
    ...Array(22).fill("Delegates"),
    ...Array(9).fill("Staff"),
    ...Array(5).fill("Media"),
  ];

  function seedRand(seed) {
    let s = seed % 2147483647; if (s <= 0) s += 2147483646;
    return () => (s = (s * 16807) % 2147483647) / 2147483647;
  }
  const rnd = seedRand(42);

  const GUESTS = [];
  let id = 1000;
  for (let i = 0; i < CAT_WEIGHTS.length; i++) {
    const category = CAT_WEIGHTS[i];
    const first = FIRST[Math.floor(rnd() * FIRST.length)];
    const last = LAST[Math.floor(rnd() * LAST.length)];
    let status = STATUS_ROTATION[i % STATUS_ROTATION.length];
    // VIP/Speakers skew toward confirmed
    if ((category === "VIP" || category === "Speakers") && status === "noresponse") status = "registered";
    if (category === "Staff") status = rnd() > 0.25 ? "checkedin" : "registered";
    const name = `${first} ${last}`;
    const org = ORGS[Math.floor(rnd() * ORGS.length)];
    const phone = "+233 " + (50 + Math.floor(rnd() * 9)) + " " + (100 + Math.floor(rnd() * 899)) + " " + (1000 + Math.floor(rnd() * 8999));
    const email = `${first}.${last}`.toLowerCase() + "@" + org.toLowerCase().replace(/[^a-z]/g, "") + ".com";
    GUESTS.push({
      id: id++,
      name, category, status, org, phone, email,
      code: "FLW-" + (Math.floor(rnd() * 9000) + 1000),
      checkinTime: status === "checkedin" ? checkTime(rnd) : null,
      channel: ["Email","SMS","WhatsApp"][Math.floor(rnd() * 3)],
    });
  }

  function checkTime(r) {
    const h = 8 + Math.floor(r() * 2);
    const m = Math.floor(r() * 60);
    return `${h}:${String(m).padStart(2, "0")} AM`;
  }

  window.FLOW = { PRESETS, EVENT, CATEGORIES, GUESTS };

  // ---- derived stats helpers ----
  window.FLOW.statusCounts = function (guests) {
    const c = { invited: 0, registered: 0, declined: 0, checkedin: 0, noresponse: 0 };
    guests.forEach((g) => { c[g.status] = (c[g.status] || 0) + 1; });
    c.total = guests.length;
    c.invitesSent = guests.length; // every guest was invited
    return c;
  };

  window.FLOW.byCategory = function (guests) {
    const map = {};
    CATEGORIES.forEach((c) => (map[c.name] = { total: 0, registered: 0, checkedin: 0, declined: 0, invited: 0, noresponse: 0 }));
    guests.forEach((g) => {
      if (!map[g.category]) map[g.category] = { total: 0, registered: 0, checkedin: 0, declined: 0, invited: 0, noresponse: 0 };
      map[g.category].total++;
      map[g.category][g.status]++;
    });
    return map;
  };

  window.FLOW.STATUS_META = {
    invited:    { label: "Invited",     fg: "var(--st-invited-fg)",    bg: "var(--st-invited-bg)" },
    registered: { label: "Registered",  fg: "var(--st-registered-fg)", bg: "var(--st-registered-bg)" },
    declined:   { label: "Declined",    fg: "var(--st-declined-fg)",   bg: "var(--st-declined-bg)" },
    checkedin:  { label: "Checked In",  fg: "var(--st-checkedin-fg)",  bg: "var(--st-checkedin-bg)" },
    noresponse: { label: "No Response", fg: "var(--st-noresponse-fg)", bg: "var(--st-noresponse-bg)" },
  };
})();
