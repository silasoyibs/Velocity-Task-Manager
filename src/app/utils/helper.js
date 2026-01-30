// Convert an ISO date string into a short "time ago" label
export function timeAgoFromISO(isoString) {
  const date = new Date(isoString);
  const diffMs = Date.now() - date.getTime();

  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Normalize a raw tag string into a known variant
export function tagVariant(tag) {
  const t = (tag || "").toLowerCase();
  if (t === "personal") return "personal";
  if (t === "ideas") return "ideas";
  return "work";
}

// Render a small icon based on the tag variant
export function renderTagIcon(variant) {
  if (variant === "personal") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M12 12a4.5 4.5 0 10-4.5-4.5A4.5 4.5 0 0012 12zm0 2.25c-4.97 0-9 2.239-9 5v.75A3 3 0 006 23h12a3 3 0 003-3v-.75c0-2.761-4.03-5-9-5z" />
      </svg>
    );
  }

  if (variant === "ideas") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M12 2.25A7.5 7.5 0 006.75 15.3V18a2.25 2.25 0 002.25 2.25h6A2.25 2.25 0 0017.25 18v-2.7A7.5 7.5 0 0012 2.25zM9.75 21.75A1.5 1.5 0 0011.25 23h1.5a1.5 1.5 0 001.5-1.25H9.75z" />
      </svg>
    );
  }

  // Default icon (work / fallback)
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M9 3.75A2.25 2.25 0 0111.25 1.5h1.5A2.25 2.25 0 0115 3.75V6h4.5A2.25 2.25 0 0121.75 8.25v10.5A2.25 2.25 0 0119.5 21h-15A2.25 2.25 0 012.25 18.75V8.25A2.25 2.25 0 014.5 6H9V3.75zM10.5 6h3V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75V6z" />
    </svg>
  );
}

// Return Tailwind styles for each tag variant
export function getTagStyles(variant) {
  switch (variant) {
    case "urgent":
      return {
        pill: "bg-red-50 text-red-700 ring-red-200",
        iconWrap: "bg-red-100 text-red-700",
      };

    case "personal":
      return {
        pill: "bg-purple-50 text-purple-700 ring-purple-200",
        iconWrap: "bg-purple-100 text-purple-700",
      };

    case "ideas":
      return {
        pill: "bg-amber-50 text-amber-700 ring-amber-200",
        iconWrap: "bg-amber-100 text-amber-700", // fixed typo (ember → amber)
      };

    case "work":
    default:
      return {
        pill: "bg-blue-50 text-blue-700 ring-blue-200",
        iconWrap: "bg-blue-100 text-blue-700",
      };
  }
}
