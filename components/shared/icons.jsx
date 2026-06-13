/* ============================================================
   FLOW — line icon set (stroke = currentColor)
   ============================================================ */
function Icon({ d, size = 20, stroke = 1.7, fill = "none", children, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={style} aria-hidden="true">
      {d ? <path d={d} /> : children}
    </svg>
  );
}

const IconDashboard = (p) => <Icon {...p}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></Icon>;
const IconCalendar = (p) => <Icon {...p}><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></Icon>;
const IconUsers = (p) => <Icon {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8M17 19a5.5 5.5 0 0 0-2.2-4.4"/></Icon>;
const IconScan = (p) => <Icon {...p}><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M4 12h16"/></Icon>;
const IconSend = (p) => <Icon {...p}><path d="M21 4 3 11l6 2.5L12 20l3-7.5L21 4Z"/><path d="M9 13.5 21 4"/></Icon>;
const IconPlus = (p) => <Icon {...p} d="M12 5v14M5 12h14" />;
const IconCheck = (p) => <Icon {...p} d="M5 12.5l4.5 4.5L19 6.5" />;
const IconChevR = (p) => <Icon {...p} d="M9 6l6 6-6 6" />;
const IconChevL = (p) => <Icon {...p} d="M15 6l-6 6 6 6" />;
const IconChevD = (p) => <Icon {...p} d="M6 9l6 6 6-6" />;
const IconSearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></Icon>;
const IconUpload = (p) => <Icon {...p}><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16"/></Icon>;
const IconLink = (p) => <Icon {...p}><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5"/></Icon>;
const IconCopy = (p) => <Icon {...p}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></Icon>;
const IconMail = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></Icon>;
const IconPhone = (p) => <Icon {...p}><path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"/></Icon>;
const IconChat = (p) => <Icon {...p}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 13.5Z"/></Icon>;
const IconClose = (p) => <Icon {...p} d="M6 6l12 12M18 6 6 18" />;
const IconTrash = (p) => <Icon {...p}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></Icon>;
const IconEdit = (p) => <Icon {...p}><path d="M4 20h4l10-10-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></Icon>;
const IconMap = (p) => <Icon {...p}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></Icon>;
const IconClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></Icon>;
const IconImage = (p) => <Icon {...p}><rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m4 17 5-4.5 4 3 3-2.5 5 4"/></Icon>;
const IconFilter = (p) => <Icon {...p} d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />;
const IconBell = (p) => <Icon {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>;
const IconQR = (p) => <Icon {...p}><rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h3v3M20.5 14.5v6M14.5 20.5h2"/></Icon>;
const IconArrowR = (p) => <Icon {...p} d="M4 12h15M13 6l6 6-6 6" />;
const IconSparkle = (p) => <Icon {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/></Icon>;
const IconDownload = (p) => <Icon {...p}><path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 20h16"/></Icon>;
const IconShield = (p) => <Icon {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/></Icon>;
const IconMore = (p) => <Icon {...p}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></Icon>;
const IconLogo = (p) => <Icon {...p} stroke={2}><path d="M4 19c5-1 7-4 8-8 1 4 3 7 8 8M6 6c3 .5 5 2 6 5M18 6c-3 .5-5 2-6 5"/></Icon>;

Object.assign(window, {
  Icon, IconDashboard, IconCalendar, IconUsers, IconScan, IconSend, IconPlus,
  IconCheck, IconChevR, IconChevL, IconChevD, IconSearch, IconUpload, IconLink,
  IconCopy, IconMail, IconPhone, IconChat, IconClose, IconTrash, IconEdit,
  IconMap, IconClock, IconImage, IconFilter, IconBell, IconQR, IconArrowR,
  IconSparkle, IconDownload, IconShield, IconMore, IconLogo,
});
