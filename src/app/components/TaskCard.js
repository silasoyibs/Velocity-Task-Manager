"use client";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { getTagStyles, renderTagIcon, timeAgoFromISO } from "../utils/helper";
import { FaEdit } from "react-icons/fa";

export default function TaskCard({ task, onDelete, onEdit }) {
  const [checked, setChecked] = useState(!!task.completed);

  // ✅ tags from DB
  const tags = Array.isArray(task.tags) ? task.tags : [];

  // ✅ map DB tag labels -> your style variants (colors/icons)
  const variantMap = {
    work: "work",
    urgent: "urgent",
    personal: "personal",
    ideas: "ideas",
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="flex min-w-0 items-start gap-2">
          <button
            type="button"
            onClick={() => setChecked((v) => !v)}
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
                  d="M16.704 5.29a1 1 0 010 1.415l-7.2 7.2a1 1 0 01-1.415 0l-3.2-3.2a1 1 0 011.415-1.415l2.492 2.492 6.492-6.492a1 0 011.416 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : null}
          </button>

          <div className="min-w-0">
            {/* Title */}
            <h3
              className={[
                "truncate text-xl font-semibold",
                checked ? "text-zinc-400 line-through" : "text-zinc-900",
              ].join(" ")}
            >
              {task.tittle}
            </h3>

            {/* Description */}
            <p
              className={[
                "mt-1 truncate text-base ",
                checked ? "text-zinc-400 line-through" : "text-zinc-600",
              ].join(" ")}
            >
              {task.description}
            </p>

            {/* ✅ Tags from DB + Time */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {tags.map((label, idx) => {
                const key = String(label).toLowerCase(); // normalize
                const variant = variantMap[key] || "work";
                const tagStyles = getTagStyles(variant);

                return (
                  <span
                    key={`${label}-${idx}`}
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
                      {renderTagIcon(variant)}
                    </span>
                    {label}
                  </span>
                );
              })}

              <span className="ml-1 text-sm text-zinc-400">
                {timeAgoFromISO(task.created)}
              </span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-2"
            aria-label="Edit task"
            onClick={() => onEdit?.task}
          >
            <FaEdit className="h-5 w-5 text-gray-500" />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
            aria-label="Delete task"
            onClick={() => onDelete?.(task.id)}
          >
            <MdDelete className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
