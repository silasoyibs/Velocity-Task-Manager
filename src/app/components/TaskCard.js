import React from "react";

/**
 * Reusable Task Card (UI-only)
 *
 * Props:
 * - title: string
 * - description: string
 * - checked: boolean (optional)
 * - tag: { label: string, variant?: "work" | "personal" | "ideas" }
 * - timeAgo: string (e.g. "4h ago")
 * - onEdit: function (optional)
 * - onDelete: function (optional)
 * - onToggle: function (optional)  // checkbox click
 */
export default function TaskCard({
  title = "Task title",
  description = "Task description",
  checked = false,
  tag = { label: "Work", variant: "work" },
  timeAgo = "4h ago",
  onEdit,
  onDelete,
  onToggle,
}) {
  const tagStyles = getTagStyles(tag?.variant);

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        {/* Left: checkbox + content */}
        <div className="flex min-w-0 items-start gap-4">
          <button
            type="button"
            onClick={onToggle}
            className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 bg-white"
            aria-label="Toggle task"
          >
            {checked ? (
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 text-zinc-900"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 010 1.415l-7.2 7.2a1 1 0 01-1.415 0l-3.2-3.2a1 1 0 011.415-1.415l2.492 2.492 6.492-6.492a1 1 0 011.416 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : null}
          </button>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-zinc-900">
              {title}
            </h3>
            <p className="mt-1 truncate text-base text-zinc-600">
              {description}
            </p>

            {/* Tag row */}
            <div className="mt-4 flex items-center gap-3">
              <span
                className={[
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ring-1",
                  tagStyles.pill,
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full",
                    tagStyles.iconWrap,
                  ].join(" ")}
                >
                  {renderTagIcon(tag?.variant)}
                </span>
                {tag?.label}
              </span>

              <span className="text-sm text-zinc-400">{timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
            aria-label="Edit task"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-9.83 9.83a4.5 4.5 0 01-1.897 1.136l-3.09 1.03a.75.75 0 01-.948-.948l1.03-3.09a4.5 4.5 0 011.136-1.897l9.83-9.83z" />
              <path d="M19.5 10.5v9A2.25 2.25 0 0117.25 21.75h-12A2.25 2.25 0 013 19.5v-12A2.25 2.25 0 015.25 5.25h9" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
            aria-label="Delete task"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M9 3.75A2.25 2.25 0 0111.25 1.5h1.5A2.25 2.25 0 0115 3.75V5.25h4.5a.75.75 0 010 1.5H18.75v14.25A3 3 0 0115.75 24h-7.5A3 3 0 015.25 21V6.75H4.5a.75.75 0 010-1.5H9V3.75zM10.5 5.25h3V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v1.5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function getTagStyles(variant) {
  // Default Tailwind palette only
  switch (variant) {
    case "personal":
      return {
        pill: "bg-purple-50 text-purple-700 ring-purple-200",
        iconWrap: "bg-purple-100 text-purple-700",
      };
    case "ideas":
      return {
        pill: "bg-amber-50 text-amber-800 ring-amber-200",
        iconWrap: "bg-amber-100 text-amber-800",
      };
    case "work":
    default:
      return {
        pill: "bg-blue-50 text-blue-700 ring-blue-200",
        iconWrap: "bg-blue-100 text-blue-700",
      };
  }
}

function renderTagIcon(variant) {
  // simple tiny icons
  if (variant === "personal") {
    // user
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M12 12a4.5 4.5 0 10-4.5-4.5A4.5 4.5 0 0012 12zm0 2.25c-4.97 0-9 2.239-9 5v.75A3 3 0 006 23h12a3 3 0 003-3v-.75c0-2.761-4.03-5-9-5z" />
      </svg>
    );
  }
  if (variant === "ideas") {
    // light bulb
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M12 2.25A7.5 7.5 0 006.75 15.3V18a2.25 2.25 0 002.25 2.25h6A2.25 2.25 0 0017.25 18v-2.7A7.5 7.5 0 0012 2.25zM9.75 21.75A1.5 1.5 0 0011.25 23h1.5a1.5 1.5 0 001.5-1.25H9.75z" />
      </svg>
    );
  }
  // work -> briefcase
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M9 3.75A2.25 2.25 0 0111.25 1.5h1.5A2.25 2.25 0 0115 3.75V6h4.5A2.25 2.25 0 0121.75 8.25v10.5A2.25 2.25 0 0119.5 21h-15A2.25 2.25 0 012.25 18.75V8.25A2.25 2.25 0 014.5 6H9V3.75zM10.5 6h3V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75V6z" />
    </svg>
  );
}
