export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/#services" },
  { label: "About", to: "/about" },
  { label: "Bookings", to: "/bookings" },
];

export const CONTACT = {
  phone: "+234 800 000 0000",
  email: "hello@errandlogix.com",
  location: "Lagos, Nigeria",
};

export const BOOKING_TABS = [
  { id: "delivery", label: "Delivery", sub: "Send a package" },
  { id: "errand", label: "Errand", sub: "Shopping & pickups" },
  { id: "custom", label: "Custom", sub: "Anything else" },
];

export const TASK_TYPES = {
  errand: [
    { id: "groceries", label: "Groceries" },
    { id: "documents", label: "Documents" },
    { id: "queue", label: "Queue Standing" },
  ],
  custom: [
    { id: "gift", label: "Gift Drop-off" },
    { id: "waybill", label: "Waybill Pickup" },
    { id: "other", label: "Other" },
  ],
};