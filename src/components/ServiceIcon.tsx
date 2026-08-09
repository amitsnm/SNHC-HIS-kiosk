type IconName =
  | "user-plus"
  | "file"
  | "wallet"
  | "calendar"
  | "ticket"
  | "stethoscope"
  | "pill"
  | "heart"
  | "help";

type Props = {
  name: IconName;
  className?: string;
};

export function ServiceIcon({ name, className }: Props) {
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "user-plus":
      return (
        <svg {...common}>
          <circle cx="20" cy="16" r="7" />
          <path d="M6 38c1.8-7 7-11 14-11s12.2 4 14 11" />
          <path d="M34 14v10M29 19h10" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M14 8h14l10 10v22a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" />
          <path d="M28 8v10h10M18 26h12M18 33h8" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="6" y="12" width="36" height="26" rx="5" />
          <path d="M6 20h36" />
          <circle cx="33" cy="30" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="8" y="12" width="32" height="28" rx="5" />
          <path d="M8 22h32M16 8v8M32 8v8M18 30h4M26 30h4" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...common}>
          <path d="M8 16a4 4 0 0 0 0 8v8a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4v-8a4 4 0 0 0 0-8v-8a4 4 0 0 0-4-4H12a4 4 0 0 0-4 4v8z" />
          <path d="M24 14v20" strokeDasharray="3 4" />
        </svg>
      );
    case "stethoscope":
      return (
        <svg {...common}>
          <path d="M14 10v10a10 10 0 0 0 20 0V10" />
          <path d="M14 10H10M34 10h4" />
          <circle cx="34" cy="34" r="5" />
          <path d="M34 29c0-5-4-8-10-8" />
        </svg>
      );
    case "pill":
      return (
        <svg {...common}>
          <rect x="10" y="18" width="28" height="14" rx="7" transform="rotate(-35 24 25)" />
          <path d="M18 18l12 12" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M24 40s-14-8.8-14-18a8 8 0 0 1 14-5.2A8 8 0 0 1 38 22c0 9.2-14 18-14 18z" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" />
          <path d="M19 19a5 5 0 1 1 7.2 4.5c-1.4.8-2.2 1.7-2.2 3.5" />
          <circle cx="24" cy="34" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
