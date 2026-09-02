import React, { useState } from "react";
import {
  LayoutDashboard, Trophy, Users, Calendar, UserCircle2, Bell, Search,
  LogOut, Settings, ShieldCheck, Eye, PlusCircle, Lock, Unlock, PlayCircle,
  Flag, AlertTriangle, CheckCircle2, XCircle, Clock, MapPin, ChevronRight,
  BarChart3, MessageSquareWarning, Radio, Menu, X, ArrowLeft, Star,
  ChevronDown, ListChecks, UserCog
} from "lucide-react";

/* ---------------------------------------------------------------
   DESIGN TOKENS
   Primary  : slate-900 / slate-800   "Championship Navy"
   Accent   : amber-500               "Track Amber"
   Surface  : white / slate-50
   Success  : emerald-500   Warning: amber-500   Error: rose-500   Info: sky-500
   Live     : rose-600 (pulsing)
   Display  : uppercase tracking-wide labels (broadcast-graphic device)
   Data     : font-mono for scores / timers (scoreboard device)
----------------------------------------------------------------*/

const ROLES = {
  admin: {
    label: "Admin",
    icon: ShieldCheck,
    nav: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "tournaments", label: "Tournaments", icon: Trophy },
      { key: "users", label: "Users", icon: Users },
      { key: "reports", label: "Reports", icon: BarChart3 },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
  organizer: {
    label: "Organizer",
    icon: UserCog,
    nav: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "teams", label: "Teams", icon: Users },
      { key: "fixtures", label: "Fixtures", icon: Calendar },
      { key: "live", label: "Live Match", icon: Radio },
      { key: "objections", label: "Objections", icon: MessageSquareWarning },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
  player: {
    label: "Player",
    icon: UserCircle2,
    nav: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "jointeam", label: "Join Team", icon: PlusCircle },
      { key: "tournament", label: "Tournament", icon: Trophy },
      { key: "objections", label: "My Objections", icon: MessageSquareWarning },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
  viewer: {
    label: "Viewer",
    icon: Eye,
    nav: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "fixtures", label: "Fixtures", icon: Calendar },
      { key: "standings", label: "Standings", icon: ListChecks },
    ],
  },
};

const badgeStyles = {
  live: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  error: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  info: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

function Badge({ tone = "neutral", children, dot }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${badgeStyles[tone]}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${tone === "live" ? "bg-rose-600 animate-pulse" : "bg-current"}`} />}
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, tone = "slate" }) {
  const toneMap = {
    slate: "bg-slate-900 text-white",
    amber: "bg-amber-500 text-white",
  };
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-1.5 font-mono text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneMap[tone]}`}>
          <Icon size={18} />
        </div>
      </div>
    </Card>
  );
}

function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    accent: "bg-amber-500 text-white hover:bg-amber-600",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };
  return (
    <button className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-600">{eyebrow}</p>}
        <h2 className="mt-0.5 text-lg font-bold text-slate-900">{title}</h2>
      </div>
      {action}
    </div>
  );
}

/* ---------------------------------------------------------------
   SAMPLE DATA
----------------------------------------------------------------*/
const tournaments = [
  { name: "Inter-Dept Football Cup", sport: "Football", status: "live", teams: 12, matches: 24, organizer: "R. Chowdhury" },
  { name: "Varsity Basketball League", sport: "Basketball", status: "scheduled", teams: 8, matches: 14, organizer: "S. Islam" },
  { name: "Autumn Volleyball Open", sport: "Volleyball", status: "locked", teams: 10, matches: 18, organizer: "Unassigned" },
  { name: "Summer Cricket Trophy", sport: "Cricket", status: "completed", teams: 6, matches: 15, organizer: "M. Karim" },
];

const statusTone = { live: "live", scheduled: "info", locked: "neutral", completed: "success", open: "warning" };

const teams = [
  { name: "Falcons FC", captain: "Arif Hasan", players: 16, status: "Active" },
  { name: "Thunder United", captain: "Nadia Rahman", players: 15, status: "Active" },
  { name: "Crimson Strikers", captain: "Tanvir Ahmed", players: 14, status: "Active" },
  { name: "Blue Panthers", captain: "Sadia Islam", players: 13, status: "Pending" },
];

const events = [
  { time: "12'", text: "Goal — Falcons FC (Arif Hasan)", tone: "success" },
  { time: "28'", text: "Yellow Card — Thunder United (K. Alam)", tone: "warning" },
  { time: "44'", text: "Goal — Thunder United (N. Rahman)", tone: "success" },
  { time: "67'", text: "Goal — Falcons FC (T. Ahmed)", tone: "success" },
];

/* ---------------------------------------------------------------
   SHELL: Sidebar + Header
----------------------------------------------------------------*/
function Sidebar({ role, screen, setScreen, mobileOpen, setMobileOpen }) {
  const cfg = ROLES[role];
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`fixed z-40 flex h-full w-64 flex-col bg-slate-900 text-white transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
            <Trophy size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none">MatchDay</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">Tournament OS</p>
          </div>
          <button className="ml-auto text-slate-400 lg:hidden" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {cfg.nav.map((item) => {
            const Icon = item.icon;
            const active = screen === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { setScreen(item.key); setMobileOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-amber-500 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-slate-800 p-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2">
            <cfg.icon size={15} className="text-amber-400" />
            <span className="text-xs font-semibold text-slate-200">{cfg.label} access</span>
          </div>
        </div>
      </aside>
    </>
  );
}

function TopHeader({ role, title, setMobileOpen, onLogout }) {
  return (
    <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:px-6">
      <button className="text-slate-500 lg:hidden" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
      <h1 className="text-base font-bold text-slate-900">{title}</h1>
      <div className="ml-4 hidden max-w-xs flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 md:flex">
        <Search size={14} className="text-slate-400" />
        <span className="text-xs text-slate-400">Search tournaments, teams, players…</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button className="relative text-slate-500 hover:text-slate-700">
          <Bell size={18} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            {ROLES[role].label[0]}
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-slate-800">{ROLES[role].label} User</p>
            <p className="text-[10px] text-slate-400">demo@matchday.app</p>
          </div>
        </div>
        <button onClick={onLogout} className="text-slate-400 hover:text-rose-500"><LogOut size={17} /></button>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------
   AUTH SCREEN
----------------------------------------------------------------*/
function LoginScreen({ onLogin }) {
  const [role, setRole] = useState("admin");
  return (
    <div className="flex min-h-full items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-slate-900 p-8 text-white md:flex">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500"><Trophy size={18} /></div>
            <span className="text-sm font-bold tracking-wide">MATCHDAY</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">Live Now</p>
            <div className="mt-3 flex items-center justify-between font-mono">
              <div className="text-center">
                <p className="text-xs text-slate-400">FALCONS FC</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <span className="text-slate-500">—</span>
              <div className="text-center">
                <p className="text-xs text-slate-400">THUNDER UTD</p>
                <p className="text-3xl font-bold">1</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">Run every tournament from kickoff to final whistle.</p>
          </div>
          <p className="text-[11px] text-slate-500">© 2026 MatchDay Tournament OS</p>
        </div>
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-900">Sign in to your account</h2>
          <p className="mt-1 text-sm text-slate-500">Demo — pick a role to preview its dashboard.</p>
          <div className="mt-5 space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Email / Username</label>
            <input readOnly value="you@matchday.app" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700" />
          </div>
          <div className="mt-3 space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Password</label>
            <input readOnly type="password" value="••••••••" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700" />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-500"><input type="checkbox" defaultChecked /> Remember me</label>
            <span className="font-semibold text-amber-600">Forgot password?</span>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Preview as</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ROLES).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${role === key ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  <cfg.icon size={14} /> {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <Button className="mt-5 w-full" onClick={() => onLogin(role)}>Log in <ChevronRight size={15} /></Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ADMIN SCREENS
----------------------------------------------------------------*/
function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <SummaryCard label="Total Tournaments" value="18" icon={Trophy} />
        <SummaryCard label="Active" value="3" icon={Radio} tone="amber" />
        <SummaryCard label="Total Organizers" value="9" icon={UserCog} />
        <SummaryCard label="Total Players" value="612" icon={Users} />
      </div>

      <Card className="p-5">
        <SectionHeader eyebrow="Overview" title="Tournament status" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: "Locked", value: 2, tone: "neutral" },
            { label: "Scheduled", value: 4, tone: "info" },
            { label: "Open", value: 3, tone: "warning" },
            { label: "Live", value: 3, tone: "live" },
            { label: "Completed", value: 6, tone: "success" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-slate-200 p-3 text-center">
              <p className="font-mono text-xl font-bold text-slate-900">{s.value}</p>
              <Badge tone={s.tone} dot={s.tone === "live"}>{s.label}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <SectionHeader eyebrow="Activity" title="Recent activity" />
          <ul className="space-y-3">
            {[
              ["Tournament opened", "Inter-Dept Football Cup", Unlock],
              ["Organizer assigned", "S. Islam → Varsity Basketball League", UserCog],
              ["Match result updated", "Falcons FC 2 – 1 Thunder United", CheckCircle2],
              ["Player joined team", "N. Rahman → Thunder United", Users],
            ].map(([title, sub, Icon], i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600"><Icon size={15} /></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <SectionHeader eyebrow="Shortcuts" title="Quick actions" />
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start"><PlusCircle size={15} /> Create tournament</Button>
            <Button variant="outline" className="w-full justify-start"><Users size={15} /> Manage users</Button>
            <Button variant="outline" className="w-full justify-start"><Unlock size={15} /> Open tournament</Button>
            <Button variant="outline" className="w-full justify-start"><Lock size={15} /> Lock tournament</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AdminTournaments() {
  const [confirm, setConfirm] = useState(null);
  return (
    <div className="space-y-4">
      <SectionHeader
        eyebrow="Admin"
        title="Tournament management"
        action={<Button size="sm"><PlusCircle size={14} /> Create tournament</Button>}
      />
      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Tournament</th>
              <th className="px-4 py-3">Sport</th>
              <th className="px-4 py-3">Organizer</th>
              <th className="px-4 py-3">Teams</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tournaments.map((t) => (
              <tr key={t.name} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-800">{t.name}</td>
                <td className="px-4 py-3 text-slate-500">{t.sport}</td>
                <td className="px-4 py-3 text-slate-500">{t.organizer}</td>
                <td className="px-4 py-3 text-slate-500">{t.teams}</td>
                <td className="px-4 py-3"><Badge tone={statusTone[t.status]} dot={t.status === "live"}>{t.status}</Badge></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    {t.status === "locked" ? (
                      <Button size="sm" variant="accent" onClick={() => setConfirm(t)}><Unlock size={12} /> Open</Button>
                    ) : (
                      <Button size="sm" variant="outline"><Lock size={12} /> Lock</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <Card className="w-full max-w-sm p-5">
            <p className="text-sm font-bold text-slate-900">Open this tournament?</p>
            <p className="mt-1 text-xs text-slate-500">Registrations will close and fixtures become visible to all teams.</p>
            <div className="mt-3 space-y-1.5 rounded-lg bg-slate-50 p-3 text-xs">
              <p><span className="text-slate-400">Tournament:</span> <span className="font-semibold text-slate-700">{confirm.name}</span></p>
              <p><span className="text-slate-400">Organizer:</span> <span className="font-semibold text-slate-700">{confirm.organizer}</span></p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setConfirm(null)}>Cancel</Button>
              <Button size="sm" variant="accent" onClick={() => setConfirm(null)}>Confirm & open</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function AdminUsers() {
  const users = [
    { name: "R. Chowdhury", email: "r.chowdhury@uni.edu", role: "Organizer", status: "Active" },
    { name: "S. Islam", email: "s.islam@uni.edu", role: "Organizer", status: "Active" },
    { name: "Arif Hasan", email: "arif.h@uni.edu", role: "Player", status: "Active" },
    { name: "Nadia Rahman", email: "nadia.r@uni.edu", role: "Player", status: "Suspended" },
  ];
  return (
    <div className="space-y-4">
      <SectionHeader eyebrow="Admin" title="User management" action={<Button size="sm"><PlusCircle size={14} /> Add user</Button>} />
      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.email} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-800">{u.name}</td>
                <td className="px-4 py-3 text-slate-500">{u.email}</td>
                <td className="px-4 py-3 text-slate-500">{u.role}</td>
                <td className="px-4 py-3"><Badge tone={u.status === "Active" ? "success" : "error"}>{u.status}</Badge></td>
                <td className="px-4 py-3"><Button size="sm" variant="outline">Manage</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   ORGANIZER SCREENS
----------------------------------------------------------------*/
function OrganizerDashboard({ goLive }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <SummaryCard label="Total Teams" value="12" icon={Users} />
        <SummaryCard label="Upcoming Matches" value="6" icon={Calendar} />
        <SummaryCard label="Live Matches" value="1" icon={Radio} tone="amber" />
        <SummaryCard label="Pending Objections" value="2" icon={MessageSquareWarning} />
      </div>

      <Card className="overflow-hidden bg-slate-900 p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <Badge tone="live" dot>Live now</Badge>
            <p className="mt-2 text-xs text-slate-400">Inter-Dept Football Cup · Main Ground</p>
          </div>
          <span className="font-mono text-sm text-amber-400">67:22</span>
        </div>
        <div className="mt-3 flex items-center justify-center gap-6 font-mono">
          <span className="text-sm font-semibold text-slate-300">FALCONS FC</span>
          <span className="text-4xl font-bold">2 – 1</span>
          <span className="text-sm font-semibold text-slate-300">THUNDER UTD</span>
        </div>
        <Button variant="accent" className="mt-4 w-full" onClick={goLive}><PlayCircle size={15} /> Open live console</Button>
      </Card>

      <Card className="p-5">
        <SectionHeader eyebrow="Schedule" title="Upcoming matches" />
        <div className="divide-y divide-slate-100">
          {[
            { a: "Crimson Strikers", b: "Blue Panthers", date: "22 Aug", time: "4:00 PM", venue: "Ground B" },
            { a: "Falcons FC", b: "Blue Panthers", date: "24 Aug", time: "5:30 PM", venue: "Main Ground" },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between py-3 text-sm">
              <p className="font-semibold text-slate-800">{m.a} <span className="text-slate-400">vs</span> {m.b}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {m.date}, {m.time}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {m.venue}</span>
                <Badge tone="info">Upcoming</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function OrganizerTeams() {
  return (
    <div className="space-y-4">
      <SectionHeader eyebrow="Organizer" title="Team management" action={<Button size="sm"><PlusCircle size={14} /> Create team</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => (
          <Card key={t.name} className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 font-mono text-sm font-bold text-white">
                {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t.name}</p>
                <p className="text-xs text-slate-500">Captain: {t.captain}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{t.players} players</span>
              <Badge tone={t.status === "Active" ? "success" : "warning"}>{t.status}</Badge>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">View roster</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function OrganizerFixtures() {
  const fixtures = [
    { a: "Falcons FC", b: "Thunder United", date: "20 Aug", time: "3:00 PM", venue: "Main Ground", status: "live" },
    { a: "Crimson Strikers", b: "Blue Panthers", date: "22 Aug", time: "4:00 PM", venue: "Ground B", status: "scheduled" },
    { a: "Falcons FC", b: "Blue Panthers", date: "24 Aug", time: "5:30 PM", venue: "Main Ground", status: "scheduled" },
    { a: "Thunder United", b: "Crimson Strikers", date: "14 Aug", time: "3:00 PM", venue: "Ground B", status: "completed" },
  ];
  return (
    <div className="space-y-4">
      <SectionHeader eyebrow="Organizer" title="Fixtures & matches" action={<Button size="sm"><PlusCircle size={14} /> Create fixture</Button>} />
      <Card className="divide-y divide-slate-100">
        {fixtures.map((f, i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
            <p className="font-semibold text-slate-800">{f.a} <span className="text-slate-400">vs</span> {f.b}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar size={12} /> {f.date}, {f.time}</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> {f.venue}</span>
              <Badge tone={statusTone[f.status]} dot={f.status === "live"}>{f.status}</Badge>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function LiveMatchConsole() {
  const [score, setScore] = useState({ a: 2, b: 1 });
  return (
    <div className="space-y-4">
      <SectionHeader eyebrow="Live console" title="Falcons FC vs Thunder United" />
      <Card className="overflow-hidden bg-slate-900 text-white">
        <div className="flex items-center justify-between px-5 pt-4 text-xs text-slate-400">
          <Badge tone="live" dot>Live · 67'</Badge>
          <span className="flex items-center gap-1"><MapPin size={12} /> Main Ground</span>
        </div>
        <div className="grid grid-cols-3 items-center gap-2 px-5 py-6 font-mono">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400">Falcons FC</p>
            <p className="text-5xl font-bold">{score.a}</p>
          </div>
          <p className="text-center text-2xl text-slate-500">vs</p>
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400">Thunder Utd</p>
            <p className="text-5xl font-bold">{score.b}</p>
          </div>
        </div>
        <div className="flex justify-center gap-3 border-t border-slate-800 px-5 py-4">
          <Button variant="accent" size="sm" onClick={() => setScore((s) => ({ ...s, a: s.a + 1 }))}><Flag size={13} /> Goal — Falcons</Button>
          <Button variant="accent" size="sm" onClick={() => setScore((s) => ({ ...s, b: s.b + 1 }))}><Flag size={13} /> Goal — Thunder</Button>
          <Button variant="danger" size="sm">End match</Button>
        </div>
      </Card>

      <Card className="p-5">
        <SectionHeader eyebrow="Timeline" title="Match events" />
        <ul className="space-y-3">
          {events.map((e, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="w-9 shrink-0 font-mono text-xs font-bold text-slate-400">{e.time}</span>
              <Badge tone={e.tone}>{e.tone === "warning" ? "Card" : "Goal"}</Badge>
              <span className="text-slate-700">{e.text}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function OrganizerObjections() {
  const list = [
    { match: "Falcons FC vs Thunder United", by: "N. Rahman", category: "Eligibility", status: "Under Review" },
    { match: "Crimson Strikers vs Blue Panthers", by: "T. Ahmed", category: "Scoring error", status: "Submitted" },
  ];
  return (
    <div className="space-y-4">
      <SectionHeader eyebrow="Organizer" title="Objections" />
      <Card className="divide-y divide-slate-100">
        {list.map((o, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <p className="font-semibold text-slate-800">{o.match}</p>
              <p className="text-xs text-slate-500">{o.category} · filed by {o.by}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={o.status === "Submitted" ? "info" : "warning"}>{o.status}</Badge>
              <Button size="sm" variant="outline">Review</Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   PLAYER SCREENS
----------------------------------------------------------------*/
function PlayerDashboard() {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <SectionHeader eyebrow="My team" title="Falcons FC" />
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 font-mono text-lg font-bold text-white">FFC</div>
          <div className="flex-1">
            <p className="text-sm text-slate-600">Captain: Arif Hasan · 16 players</p>
            <Badge tone="success" className="mt-1">Active</Badge>
          </div>
          <Button variant="outline" size="sm">View team</Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <SectionHeader eyebrow="Next up" title="Upcoming match" />
          <p className="text-sm font-semibold text-slate-800">Falcons FC vs Blue Panthers</p>
          <div className="mt-2 space-y-1 text-xs text-slate-500">
            <p className="flex items-center gap-1"><Calendar size={12} /> 24 Aug, 5:30 PM</p>
            <p className="flex items-center gap-1"><MapPin size={12} /> Main Ground</p>
          </div>
          <Badge tone="info" className="mt-3">Upcoming</Badge>
        </Card>
        <Card className="p-5">
          <SectionHeader eyebrow="Last game" title="Recent result" />
          <div className="flex items-center justify-center gap-3 font-mono text-lg font-bold text-slate-900">
            <span>Falcons 2</span><span className="text-slate-400">–</span><span>Thunder 1</span>
          </div>
          <p className="mt-1 text-center text-xs text-emerald-600 font-semibold">Won</p>
        </Card>
      </div>
    </div>
  );
}

function PlayerJoinTeam({ onJoin }) {
  const [confirm, setConfirm] = useState(null);
  const [joined, setJoined] = useState(false);
  return (
    <div className="space-y-4">
      <SectionHeader eyebrow="Player" title="Available teams" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => (
          <Card key={t.name} className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 font-mono text-sm font-bold text-white">
                {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t.name}</p>
                <p className="text-xs text-slate-500">Captain: {t.captain} · {t.players} players</p>
              </div>
            </div>
            <Button size="sm" className="mt-3 w-full" onClick={() => setConfirm(t)}>Join team</Button>
          </Card>
        ))}
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <Card className="w-full max-w-sm p-5">
            {!joined ? (
              <>
                <p className="text-sm font-bold text-slate-900">Join {confirm.name}?</p>
                <p className="mt-1 text-xs text-slate-500">You'll appear on the team roster immediately.</p>
                <div className="mt-4 flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setConfirm(null)}>Cancel</Button>
                  <Button size="sm" onClick={() => setJoined(true)}>Confirm</Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center py-2 text-center">
                  <CheckCircle2 size={30} className="text-emerald-500" />
                  <p className="mt-2 text-sm font-bold text-slate-900">You've joined {confirm.name}</p>
                  <p className="mt-1 text-xs text-slate-500">Your dashboard has been updated.</p>
                </div>
                <Button size="sm" className="mt-3 w-full" onClick={() => { setConfirm(null); setJoined(false); }}>Done</Button>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

function PlayerObjections() {
  const [tab, setTab] = useState("new");
  const past = [
    { match: "Falcons FC vs Thunder United", category: "Eligibility", status: "Under Review" },
    { match: "Falcons FC vs Crimson Strikers", category: "Scoring", status: "Resolved" },
  ];
  return (
    <div className="space-y-4">
      <SectionHeader eyebrow="Player" title="Objections" />
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1 text-xs font-semibold w-fit">
        {["new", "history"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-3 py-1.5 capitalize ${tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{t === "new" ? "Submit new" : "History"}</button>
        ))}
      </div>
      {tab === "new" ? (
        <Card className="max-w-lg space-y-3 p-5">
          <div>
            <label className="text-xs font-semibold text-slate-600">Match</label>
            <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"><option>Falcons FC vs Thunder United</option></select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Category</label>
            <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"><option>Eligibility</option><option>Scoring error</option><option>Conduct</option></select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Description</label>
            <textarea rows={3} placeholder="Describe the issue…" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <Button size="sm">Submit objection</Button>
        </Card>
      ) : (
        <Card className="divide-y divide-slate-100">
          {past.map((o, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
              <div><p className="font-semibold text-slate-800">{o.match}</p><p className="text-xs text-slate-500">{o.category}</p></div>
              <Badge tone={o.status === "Resolved" ? "success" : "warning"}>{o.status}</Badge>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   VIEWER SCREENS
----------------------------------------------------------------*/
function ViewerDashboard() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-slate-900 p-6 text-white">
        <Badge tone="live" dot>Live now</Badge>
        <div className="mt-4 flex items-center justify-center gap-8 font-mono">
          <span className="text-sm font-semibold text-slate-300">FALCONS FC</span>
          <span className="text-5xl font-bold">2 – 1</span>
          <span className="text-sm font-semibold text-slate-300">THUNDER UTD</span>
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">67' · Main Ground · Inter-Dept Football Cup</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <SectionHeader eyebrow="Schedule" title="Upcoming matches" />
          <div className="divide-y divide-slate-100">
            {[["Crimson Strikers", "Blue Panthers", "22 Aug, 4:00 PM"], ["Falcons FC", "Blue Panthers", "24 Aug, 5:30 PM"]].map((m, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-medium text-slate-700">{m[0]} vs {m[1]}</span>
                <span className="text-xs text-slate-400">{m[2]}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionHeader eyebrow="Results" title="Recent results" />
          <div className="divide-y divide-slate-100">
            {[["Thunder United", "Crimson Strikers", "1 – 0"]].map((m, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-medium text-slate-700">{m[0]} vs {m[1]}</span>
                <span className="font-mono text-xs font-bold text-slate-800">{m[2]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ViewerStandings() {
  const rows = [
    { pos: 1, team: "Falcons FC", p: 6, w: 5, d: 1, l: 0, pts: 16 },
    { pos: 2, team: "Thunder United", p: 6, w: 4, d: 1, l: 1, pts: 13 },
    { pos: 3, team: "Crimson Strikers", p: 6, w: 2, d: 2, l: 2, pts: 8 },
    { pos: 4, team: "Blue Panthers", p: 6, w: 0, d: 2, l: 4, pts: 2 },
  ];
  return (
    <div className="space-y-4">
      <SectionHeader eyebrow="Viewer" title="Tournament standings" />
      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr><th className="px-4 py-3">#</th><th className="px-4 py-3">Team</th><th className="px-4 py-3">P</th><th className="px-4 py-3">W</th><th className="px-4 py-3">D</th><th className="px-4 py-3">L</th><th className="px-4 py-3">Pts</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.team} className={r.pos === 1 ? "bg-amber-50/50" : ""}>
                <td className="px-4 py-3 font-mono text-slate-500">{r.pos}</td>
                <td className="px-4 py-3 font-semibold text-slate-800">{r.team}</td>
                <td className="px-4 py-3 text-slate-500">{r.p}</td>
                <td className="px-4 py-3 text-slate-500">{r.w}</td>
                <td className="px-4 py-3 text-slate-500">{r.d}</td>
                <td className="px-4 py-3 text-slate-500">{r.l}</td>
                <td className="px-4 py-3 font-mono font-bold text-slate-900">{r.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   ROOT APP
----------------------------------------------------------------*/
export default function App() {
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState("admin");
  const [screen, setScreen] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!authed) {
    return (
      <div className="h-full min-h-[640px] w-full bg-slate-950 font-sans">
        <LoginScreen onLogin={(r) => { setRole(r); setScreen("dashboard"); setAuthed(true); }} />
      </div>
    );
  }

  const cfg = ROLES[role];
  const activeLabel = cfg.nav.find((n) => n.key === screen)?.label || "Dashboard";

  function renderScreen() {
    if (role === "admin") {
      if (screen === "tournaments") return <AdminTournaments />;
      if (screen === "users") return <AdminUsers />;
      if (screen === "dashboard") return <AdminDashboard />;
    }
    if (role === "organizer") {
      if (screen === "teams") return <OrganizerTeams />;
      if (screen === "fixtures") return <OrganizerFixtures />;
      if (screen === "live") return <LiveMatchConsole />;
      if (screen === "objections") return <OrganizerObjections />;
      if (screen === "dashboard") return <OrganizerDashboard goLive={() => setScreen("live")} />;
    }
    if (role === "player") {
      if (screen === "jointeam") return <PlayerJoinTeam />;
      if (screen === "objections") return <PlayerObjections />;
      if (screen === "tournament") return <ViewerStandings />;
      if (screen === "dashboard") return <PlayerDashboard />;
    }
    if (role === "viewer") {
      if (screen === "standings") return <ViewerStandings />;
      if (screen === "fixtures") return <ViewerDashboard />;
      if (screen === "dashboard") return <ViewerDashboard />;
    }
    return (
      <Card className="p-8 text-center text-sm text-slate-500">
        <Settings size={22} className="mx-auto mb-2 text-slate-300" />
        {activeLabel} screen — not wired up in this preview.
      </Card>
    );
  }

  return (
    <div className="flex h-full min-h-[640px] w-full overflow-hidden bg-slate-50 font-sans">
      <Sidebar role={role} screen={screen} setScreen={setScreen} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex min-h-0 flex-1 flex-col">
        <TopHeader role={role} title={activeLabel} setMobileOpen={setMobileOpen} onLogout={() => setAuthed(false)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{renderScreen()}</main>
      </div>
    </div>
  );
}
