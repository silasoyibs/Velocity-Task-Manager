import { BsBriefcaseFill } from "react-icons/bs";
import { IoAlertCircle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

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

// Render a small icon based on the tag variant
export function renderTagIcon(variant) {
  if (variant === "personal") {
    return <FaUser className="text-purple-500" />;
  }

  if (variant === "ideas") {
    return <FaLightbulb className="text-amber-500" />;
  }
  if (variant === "urgent") {
    return <IoAlertCircle className="text-red-500" />;
  }
  if (variant === "work") {
    return <BsBriefcaseFill className="text-blue-500" />;
  }
  // Default icon (work / fallback)
  return <BsBriefcaseFill className="text-blue-500" />;
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

// Normalize input for safe, case-insensitive comparisons
export function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}
