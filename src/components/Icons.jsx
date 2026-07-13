
const Icon = ({ children, size = 20, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
);

export const IconTruck = (p) => (
  <Icon {...p}>
    <rect x="1" y="7" width="14" height="10" rx="1.5" />
    <path d="M15 10h3.5L21 13.5V17h-6z" />
    <circle cx="6" cy="19.5" r="1.6" />
    <circle cx="17.5" cy="19.5" r="1.6" />
  </Icon>
);
export const IconBag = (p) => (
  <Icon {...p}>
    <path d="M6 8h12l-1 12H7L6 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Icon>
);
export const IconFile = (p) => (
  <Icon {...p}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5" />
    <path d="M9.5 13h5M9.5 16.5h5" />
  </Icon>
);
export const IconUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
  </Icon>
);
export const IconBriefcase = (p) => (
  <Icon {...p}>
    <rect x="3" y="8" width="18" height="12" rx="1.5" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Icon>
);
export const IconBolt = (p) => (
  <Icon {...p}>
    <path d="M12 2 4 14h6l-1 8 9-13h-6l1-7z" />
  </Icon>
);
export const IconStore = (p) => (
  <Icon {...p}>
    <path d="M4 9 5.5 4h13L20 9" />
    <path d="M4 9h16v11H4z" />
    <path d="M9.5 20v-6h5v6" />
  </Icon>
);
export const IconSparkle = (p) => (
  <Icon {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </Icon>
);
export const IconMapPin = (p) => (
  <Icon {...p}>
    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </Icon>
);
export const IconCheck = (p) => (
  <Icon {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);
export const IconInfo = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.01" />
  </Icon>
);