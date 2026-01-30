"use client";
import { useState } from "react";
import { getTagStyles, renderTagIcon } from "../utils/helper";

export default function TaskCard({
  title = "Task title",
  description = "Task description",
  defaultChecked = false,
  tag = { label: "Work", variant: "personal" },
  timeAgo = "4h ago",
  onEdit,
  onDelete,
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const tagStyles = getTagStyles(tag?.variant);

  return (
    <div
      className={[
        "w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm",
        ,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="flex min-w-0 items-start gap-4">
          <button
            type="button"
            onClick={() => setChecked((v) => !v)} // ✅ toggle here
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
            {/* ✅ strike-through when checked */}
            <h3
              className={[
                "truncate text-lg font-semibold",
                checked ? "text-zinc-400 line-through" : "text-zinc-900",
              ].join(" ")}
            >
              {title}
            </h3>

            <p
              className={[
                "mt-1 truncate text-base",
                checked ? "text-zinc-400 line-through" : "text-zinc-600",
              ].join(" ")}
            >
              {description}
            </p>

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

        {/* Right actions */}
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
