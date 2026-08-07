import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  XCircle,
  PlayCircle,
  CircleDot,
  BadgeCheck,
  User,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* Fonts + design tokens                                                   */
/* ---------------------------------------------------------------------- */

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Paytone+One&family=Poppins:wght@400;500;600;700&display=swap');
    .font-display { font-family: 'Paytone One', 'Poppins', sans-serif; }
    .font-body { font-family: 'Poppins', sans-serif; }
  `}</style>
);

const INK = "#0B0B0C";
const AMBER = "#F59E0B";
const AMBER_DARK = "#B45309";
const CREAM = "#FAF9F7";

/* ---------------------------------------------------------------------- */
/* Mock data                                                               */
/* ---------------------------------------------------------------------- */

const ORDERS = [
  { id: "EL-1042", customer: "Ada Obi", pickup: "Lekki Phase 1", dropoff: "Victoria Island", service: "Delivery", price: 4500, status: "New", date: "Today, 9:14 AM", phone: "+234 803 221 9087", email: "ada.obi@gmail.com", payment: "Paid", package: "Sealed document envelope", notes: "Please call on arrival, gate code 2201." },
  { id: "EL-1041", customer: "Emeka Nwosu", pickup: "Ikeja GRA", dropoff: "Yaba", service: "Errand", price: 3000, status: "In Progress", date: "Today, 8:52 AM", phone: "+234 806 442 1120", email: "emeka.n@yahoo.com", payment: "Paid", package: "Grocery pickup from Shoprite", notes: "Prefers Grade A eggs, no substitutes." },
  { id: "EL-1040", customer: "Chiamaka Eze", pickup: "Surulere", dropoff: "Apapa", service: "Delivery", price: 6200, status: "Pending", date: "Today, 8:30 AM", phone: "+234 701 993 2244", email: "chiamaka.eze@outlook.com", payment: "Unpaid", package: "Small electronics box (~2kg)", notes: "Fragile — handle with care." },
  { id: "EL-1039", customer: "Tunde Bakare", pickup: "Ajah", dropoff: "Lekki Phase 1", service: "Personal Assistance", price: 5000, status: "Completed", date: "Yesterday, 6:40 PM", phone: "+234 812 004 5567", email: "tunde.bakare@gmail.com", payment: "Paid", package: "Bank errand — deposit slip drop-off", notes: "None." },
  { id: "EL-1038", customer: "Ngozi Chukwu", pickup: "Gbagada", dropoff: "Ikeja", service: "Delivery", price: 3800, status: "Cancelled", date: "Yesterday, 4:12 PM", phone: "+234 909 331 7743", email: "ngozi.chukwu@gmail.com", payment: "Refunded", package: "Clothing parcel", notes: "Customer cancelled — change of plan." },
  { id: "EL-1037", customer: "Femi Adeyemi", pickup: "Maryland", dropoff: "Ojota", service: "Errand", price: 2500, status: "Completed", date: "Yesterday, 2:05 PM", phone: "+234 815 667 0032", email: "femi.a@gmail.com", payment: "Paid", package: "Prescription pickup", notes: "Leave with security if unavailable." },
];

const CUSTOMERS = [
  { name: "Ada Obi", phone: "+234 803 221 9087", email: "ada.obi@gmail.com", bookings: 12, initials: "AO" },
  { name: "Emeka Nwosu", phone: "+234 806 442 1120", email: "emeka.n@yahoo.com", bookings: 7, initials: "EN" },
  { name: "Chiamaka Eze", phone: "+234 701 993 2244", email: "chiamaka.eze@outlook.com", bookings: 3, initials: "CE" },
  { name: "Tunde Bakare", phone: "+234 812 004 5567", email: "tunde.bakare@gmail.com", bookings: 19, initials: "TB" },
  { name: "Ngozi Chukwu", phone: "+234 909 331 7743", email: "ngozi.chukwu@gmail.com", bookings: 5, initials: "NC" },
  { name: "Femi Adeyemi", phone: "+234 815 667 0032", email: "femi.a@gmail.com", bookings: 9, initials: "FA" },
];

const CONVERSATIONS = [
  { name: "Ada Obi", initials: "AO", unread: true, lastTime: "9:20 AM", messages: [
    { from: "them", text: "Hi, is my order EL-1042 on its way?", time: "9:14 AM" },
    { from: "them", text: "It's a bit urgent, thank you!", time: "9:20 AM" },
  ]},
  { name: "Chiamaka Eze", initials: "CE", unread: true, lastTime: "8:35 AM", messages: [
    { from: "them", text: "Can I pay on delivery instead?", time: "8:35 AM" },
  ]},
  { name: "Tunde Bakare", initials: "TB", unread: false, lastTime: "Yesterday", messages: [
    { from: "them", text: "Thanks for the quick errand run yesterday!", time: "Yesterday, 6:52 PM" },
    { from: "me", text: "You're welcome, Tunde. Happy to help anytime.", time: "Yesterday, 6:58 PM" },
  ]},
];

const NOTIFICATIONS = [
  { type: "order", text: "New booking received from Ada Obi — EL-1042", time: "9:14 AM", read: false },
  { type: "message", text: "Chiamaka Eze sent a message about payment", time: "8:35 AM", read: false },
  { type: "order", text: "Order EL-1038 was cancelled by Ngozi Chukwu", time: "Yesterday, 4:12 PM", read: true },
  { type: "order", text: "Order EL-1037 marked completed", time: "Yesterday, 2:20 PM", read: true },
  { type: "message", text: "Tunde Bakare sent a message", time: "Yesterday, 6:52 PM", read: true },
];

/* ---------------------------------------------------------------------- */
/* Small shared bits                                                       */
/* ---------------------------------------------------------------------- */

const STATUS_STYLES = {
  New: { bg: "#FEF3C7", fg: "#92400E", dot: "#F59E0B" },
  Pending: { bg: "#FEF9C3", fg: "#854D0E", dot: "#EAB308" },
  "In Progress": { bg: "#DBEAFE", fg: "#1E40AF", dot: "#3B82F6" },
  Completed: { bg: "#DCFCE7", fg: "#166534", dot: "#22C55E" },
  Cancelled: { bg: "#FEE2E2", fg: "#991B1B", dot: "#EF4444" },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.New;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-body"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status}
    </span>
  );
}

// Signature element: a delivery-route stepper — dots joined by a line, like a route on a map
const ROUTE_STEPS = ["New", "In Progress", "Completed"];
function RouteStepper({ status }) {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-2 text-red-600 font-body text-sm font-medium">
        <XCircle size={16} />
        Order cancelled
      </div>
    );
  }
  const currentIndex = status === "Pending" ? 0 : ROUTE_STEPS.indexOf(status);
  return (
    <div className="flex items-center w-full">
      {ROUTE_STEPS.map((step, i) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: i <= currentIndex ? AMBER : "#D6D3D1",
                backgroundColor: i <= currentIndex ? AMBER : "#fff",
              }}
            />
            <span
              className="text-xs font-body whitespace-nowrap"
              style={{ color: i <= currentIndex ? INK : "#A8A29E", fontWeight: i === currentIndex ? 600 : 400 }}
            >
              {step}
            </span>
          </div>
          {i < ROUTE_STEPS.length - 1 && (
            <div
              className="flex-1 h-0.5 mx-1 mb-4"
              style={{ backgroundColor: i < currentIndex ? AMBER : "#E7E5E4" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Avatar({ initials, size = 40 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-display shrink-0"
      style={{ width: size, height: size, backgroundColor: INK, color: AMBER, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-200 ${className}`}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Sidebar                                                                  */
/* ---------------------------------------------------------------------- */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "orders", label: "Orders", icon: Package },
  { key: "customers", label: "Customers", icon: Users },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ page, setPage, unreadMessages, unreadNotifications }) {
  return (
    <aside
      className="w-60 shrink-0 h-screen sticky top-0 flex flex-col font-body"
      style={{ backgroundColor: INK }}
    >
      <div className="flex items-center gap-2 px-6 py-6">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-sm"
          style={{ backgroundColor: AMBER, color: INK }}
        >
          EL
        </div>
        <span className="font-display text-white text-lg tracking-wide">Errand Logix</span>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = page === key;
          const badge =
            key === "messages" ? unreadMessages : key === "notifications" ? unreadNotifications : 0;
          return (
            <button
              key={key}
              onClick={() => setPage(key)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
                backgroundColor: active ? "rgba(245,158,11,0.12)" : "transparent",
                color: active ? AMBER : "#D6D3D1",
              }}
            >
              <Icon size={18} />
              <span className="flex-1 text-left">{label}</span>
              {badge > 0 && (
                <span
                  className="text-xs font-semibold rounded-full px-1.5 py-0.5"
                  style={{ backgroundColor: AMBER, color: INK }}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-6 pt-2 border-t border-white/10 mt-2">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-300 hover:text-white transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------------------- */
/* Dashboard page                                                          */
/* ---------------------------------------------------------------------- */

function SummaryCard({ label, value, icon: Icon, accent }) {
  return (
    <Card className="p-5 flex items-start justify-between">
      <div>
        <p className="text-stone-500 text-sm font-body">{label}</p>
        <p className="font-display text-3xl mt-2" style={{ color: INK }}>
          {value}
        </p>
      </div>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: accent + "1A" }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>
    </Card>
  );
}

function OrdersTable({ orders, onOpen, compact }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="text-left text-stone-400 border-b border-stone-100">
            <th className="py-3 pr-4 font-medium">Order ID</th>
            <th className="py-3 pr-4 font-medium">Customer</th>
            <th className="py-3 pr-4 font-medium">Pickup</th>
            <th className="py-3 pr-4 font-medium">Drop-off</th>
            <th className="py-3 pr-4 font-medium">Service</th>
            <th className="py-3 pr-4 font-medium">Price</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 pr-4 font-medium">Date &amp; Time</th>
            <th className="py-3 pr-0 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/70">
              <td className="py-3 pr-4 font-semibold" style={{ color: INK }}>{o.id}</td>
              <td className="py-3 pr-4">{o.customer}</td>
              <td className="py-3 pr-4 text-stone-500">{o.pickup}</td>
              <td className="py-3 pr-4 text-stone-500">{o.dropoff}</td>
              <td className="py-3 pr-4 text-stone-500">{o.service}</td>
              <td className="py-3 pr-4 font-medium">₦{o.price.toLocaleString()}</td>
              <td className="py-3 pr-4"><StatusPill status={o.status} /></td>
              <td className="py-3 pr-4 text-stone-500">{o.date}</td>
              <td className="py-3 pr-0 text-right">
                <button
                  onClick={() => onOpen(o)}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors"
                  style={{ borderColor: AMBER, color: AMBER_DARK }}
                >
                  View <ChevronRight size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DashboardPage({ orders, customersCount, onOpenOrder }) {
  const newOrders = orders.filter((o) => o.status === "New").length;
  const pending = orders.filter((o) => o.status === "Pending").length;
  const completed = orders.filter((o) => o.status === "Completed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl" style={{ color: INK }}>Good morning, Ugonna</h1>
        <p className="text-stone-500 font-body text-sm mt-1">Here's what's happening across Errand Logix today.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <SummaryCard label="New Orders" value={newOrders} icon={Package} accent={AMBER} />
        <SummaryCard label="Pending Orders" value={pending} icon={Clock} accent="#EAB308" />
        <SummaryCard label="Completed Orders" value={completed} icon={CheckCircle2} accent="#22C55E" />
        <SummaryCard label="Total Customers" value={customersCount} icon={Users} accent="#3B82F6" />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg" style={{ color: INK }}>Recent Orders</h2>
        </div>
        <OrdersTable orders={orders.slice(0, 6)} onOpen={onOpenOrder} />
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Orders + order detail pages                                             */
/* ---------------------------------------------------------------------- */

function OrdersPage({ orders, onOpenOrder }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "New", "Pending", "In Progress", "Completed", "Cancelled"];
  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl" style={{ color: INK }}>Orders</h1>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3.5 py-1.5 rounded-full text-sm font-body font-medium border transition-colors"
            style={{
              borderColor: filter === f ? INK : "#E7E5E4",
              backgroundColor: filter === f ? INK : "transparent",
              color: filter === f ? "#fff" : "#57534E",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="p-6">
        <OrdersTable orders={filtered} onOpen={onOpenOrder} />
      </Card>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-stone-100 last:border-0">
      <Icon size={16} className="mt-0.5 text-stone-400 shrink-0" />
      <div>
        <p className="text-xs text-stone-400 font-body">{label}</p>
        <p className="text-sm font-body mt-0.5" style={{ color: INK }}>{value}</p>
      </div>
    </div>
  );
}

function OrderDetailPage({ order, onBack, onUpdateStatus }) {
  const actions = [
    { label: "Accept Order", status: "In Progress", icon: PlayCircle, disabled: order.status !== "New" && order.status !== "Pending" },
    { label: "Mark In Progress", status: "In Progress", icon: CircleDot, disabled: order.status === "Completed" || order.status === "Cancelled" },
    { label: "Mark Completed", status: "Completed", icon: CheckCircle2, disabled: order.status === "Completed" || order.status === "Cancelled" },
    { label: "Cancel Order", status: "Cancelled", icon: XCircle, disabled: order.status === "Completed" || order.status === "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-body text-stone-500 hover:text-stone-900">
        <ArrowLeft size={16} /> Back to Orders
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl" style={{ color: INK }}>{order.id}</h1>
          <p className="text-stone-500 font-body text-sm mt-1">{order.date}</p>
        </div>
        <StatusPill status={order.status} />
      </div>

      <Card className="p-6">
        <RouteStepper status={order.status} />
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 col-span-2">
          <h2 className="font-display text-base mb-1" style={{ color: INK }}>Order Details</h2>
          <InfoRow icon={User} label="Customer" value={order.customer} />
          <InfoRow icon={Phone} label="Contact Number" value={order.phone} />
          <InfoRow icon={MapPin} label="Pickup Address" value={order.pickup} />
          <InfoRow icon={MapPin} label="Delivery Address" value={order.dropoff} />
          <InfoRow icon={Package} label="Package Description" value={order.package} />
          <InfoRow icon={Clock} label="Delivery Notes" value={order.notes} />
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-base mb-3" style={{ color: INK }}>Payment</h2>
            <div className="flex items-center justify-between text-sm font-body mb-1">
              <span className="text-stone-500">Service</span>
              <span style={{ color: INK }}>{order.service}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-body mb-1">
              <span className="text-stone-500">Price</span>
              <span className="font-semibold" style={{ color: INK }}>₦{order.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-body">
              <span className="text-stone-500">Payment Status</span>
              <span className="font-semibold flex items-center gap-1" style={{ color: order.payment === "Paid" ? "#16A34A" : AMBER_DARK }}>
                <BadgeCheck size={14} /> {order.payment}
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-base mb-3" style={{ color: INK }}>Update Status</h2>
            <div className="space-y-2">
              {actions.map((a) => (
                <button
                  key={a.label}
                  disabled={a.disabled}
                  onClick={() => onUpdateStatus(order.id, a.status)}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-body font-medium border transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
                  style={
                    a.status === "Cancelled"
                      ? { borderColor: "#FCA5A5", color: "#DC2626" }
                      : { borderColor: AMBER, color: AMBER_DARK }
                  }
                >
                  <a.icon size={16} />
                  {a.label}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Customers page                                                          */
/* ---------------------------------------------------------------------- */

function CustomersPage({ customers, onOpenConversation }) {
  const [query, setQuery] = useState("");
  const filtered = customers.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl" style={{ color: INK }}>Customers</h1>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm font-body focus:outline-none focus:ring-2"
          style={{ "--tw-ring-color": AMBER }}
        />
      </div>

      <Card>
        {filtered.map((c, i) => (
          <div
            key={c.name}
            className={`flex items-center gap-4 px-6 py-4 ${i !== filtered.length - 1 ? "border-b border-stone-100" : ""}`}
          >
            <Avatar initials={c.initials} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold font-body text-sm" style={{ color: INK }}>{c.name}</p>
              <p className="text-xs text-stone-500 font-body">{c.phone} · {c.email}</p>
            </div>
            <div className="text-sm font-body text-stone-500 w-28 shrink-0">{c.bookings} bookings</div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-200 font-body" style={{ color: INK }}>
                View Profile
              </button>
              <button
                onClick={() => onOpenConversation(c.name)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg font-body"
                style={{ backgroundColor: INK, color: AMBER }}
              >
                Message
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-stone-400 font-body text-sm py-10">No customers match your search.</p>
        )}
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Messages page                                                           */
/* ---------------------------------------------------------------------- */

function MessagesPage({ conversations, setConversations, activeName, setActiveName }) {
  const [draft, setDraft] = useState("");
  const active = conversations.find((c) => c.name === activeName) || conversations[0];

  const openConversation = (name) => {
    setActiveName(name);
    setConversations((prev) => prev.map((c) => (c.name === name ? { ...c, unread: false } : c)));
  };

  const send = () => {
    if (!draft.trim()) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.name === active.name
          ? { ...c, messages: [...c.messages, { from: "me", text: draft, time: "Just now" }] }
          : c
      )
    );
    setDraft("");
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <h1 className="font-display text-2xl" style={{ color: INK }}>Messages</h1>

      <Card className="flex overflow-hidden" style={{ height: 560 }}>
        <div className="w-72 shrink-0 border-r border-stone-100 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.name}
              onClick={() => openConversation(c.name)}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-stone-50 text-left hover:bg-stone-50"
              style={{ backgroundColor: active?.name === c.name ? "#FFF7ED" : "transparent" }}
            >
              <Avatar initials={c.initials} size={36} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-body truncate" style={{ color: INK }}>{c.name}</p>
                <p className="text-xs text-stone-400 font-body truncate">
                  {c.messages[c.messages.length - 1]?.text}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[11px] text-stone-400 font-body">{c.lastTime}</span>
                {c.unread && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: AMBER }} />}
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-3">
            <Avatar initials={active?.initials} size={34} />
            <p className="font-semibold font-body text-sm" style={{ color: INK }}>{active?.name}</p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ backgroundColor: CREAM }}>
            {active?.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-xs px-3.5 py-2.5 rounded-2xl text-sm font-body"
                  style={
                    m.from === "me"
                      ? { backgroundColor: INK, color: "#fff", borderBottomRightRadius: 4 }
                      : { backgroundColor: "#fff", color: INK, border: "1px solid #E7E5E4", borderBottomLeftRadius: 4 }
                  }
                >
                  {m.text}
                  <div className={`text-[10px] mt-1 ${m.from === "me" ? "text-stone-300" : "text-stone-400"}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-stone-100 flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a reply..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-body focus:outline-none"
            />
            <button
              onClick={send}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: AMBER, color: INK }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Notifications page                                                      */
/* ---------------------------------------------------------------------- */

function NotificationsPage({ notifications, setNotifications }) {
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl" style={{ color: INK }}>Notifications</h1>
        <button onClick={markAllRead} className="text-sm font-body font-semibold" style={{ color: AMBER_DARK }}>
          Mark all as read
        </button>
      </div>

      <Card>
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 px-6 py-4 ${i !== notifications.length - 1 ? "border-b border-stone-100" : ""}`}
            style={{ backgroundColor: n.read ? "transparent" : "#FFFBEB" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: n.type === "order" ? "#FEF3C7" : "#DBEAFE" }}
            >
              {n.type === "order" ? <Package size={16} color={AMBER_DARK} /> : <MessageSquare size={16} color="#1E40AF" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-body" style={{ color: INK, fontWeight: n.read ? 400 : 600 }}>{n.text}</p>
              <p className="text-xs text-stone-400 font-body mt-0.5">{n.time}</p>
            </div>
            {!n.read && <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: AMBER }} />}
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Settings page                                                           */
/* ---------------------------------------------------------------------- */

function Field({ label, defaultValue }) {
  return (
    <div>
      <label className="text-xs text-stone-400 font-body">{label}</label>
      <input
        defaultValue={defaultValue}
        className="w-full mt-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-body focus:outline-none"
      />
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-2xl" style={{ color: INK }}>Settings</h1>

      <Card className="p-6 space-y-4">
        <h2 className="font-display text-base" style={{ color: INK }}>Business Information</h2>
        <Field label="Business Name" defaultValue="Errand Logix Ltd" />
        <Field label="Business Email" defaultValue="hello@errandlogix.com" />
        <Field label="Business Phone Number" defaultValue="+234 700 000 0000" />
        <Field label="Business Address" defaultValue="12 Admiralty Way, Lekki Phase 1, Lagos" />
        <Field label="Operating Hours" defaultValue="Mon – Sat, 8:00 AM – 8:00 PM" />
        <button
          className="mt-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold"
          style={{ backgroundColor: AMBER, color: INK }}
        >
          Save Changes
        </button>
      </Card>

      <Card className="p-6">
        <button className="flex items-center gap-2 text-sm font-body font-semibold text-red-600">
          <LogOut size={16} /> Logout
        </button>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* App shell                                                               */
/* ---------------------------------------------------------------------- */

export default function ErrandLogixAdmin() {
  const [page, setPage] = useState("dashboard");
  const [orders, setOrders] = useState(ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeConvo, setActiveConvo] = useState(CONVERSATIONS[0].name);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const selectedOrder = useMemo(() => orders.find((o) => o.id === selectedOrderId), [orders, selectedOrderId]);
  const unreadMessages = conversations.filter((c) => c.unread).length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const openOrder = (order) => {
    setSelectedOrderId(order.id);
    setPage("order-detail");
  };

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const goToMessages = (name) => {
    setActiveConvo(name);
    setPage("messages");
  };

  return (
    <div className="flex font-body" style={{ backgroundColor: CREAM, minHeight: "100vh" }}>
      <FontImport />
      <Sidebar page={page} setPage={setPage} unreadMessages={unreadMessages} unreadNotifications={unreadNotifications} />

      <main className="flex-1 px-8 py-8 min-w-0">
        {page === "dashboard" && (
          <DashboardPage orders={orders} customersCount={CUSTOMERS.length} onOpenOrder={openOrder} />
        )}
        {page === "orders" && <OrdersPage orders={orders} onOpenOrder={openOrder} />}
        {page === "order-detail" && selectedOrder && (
          <OrderDetailPage order={selectedOrder} onBack={() => setPage("orders")} onUpdateStatus={updateStatus} />
        )}
        {page === "customers" && (
          <CustomersPage customers={CUSTOMERS} onOpenConversation={goToMessages} />
        )}
        {page === "messages" && (
          <MessagesPage
            conversations={conversations}
            setConversations={setConversations}
            activeName={activeConvo}
            setActiveName={setActiveConvo}
          />
        )}
        {page === "notifications" && (
          <NotificationsPage notifications={notifications} setNotifications={setNotifications} />
        )}
        {page === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}