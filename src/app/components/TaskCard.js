"use client";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { getTagStyles, renderTagIcon, timeAgoFromISO } from "../utils/helper";
import { FaEdit } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

export default function TaskCard({ task, onDelete, onEdit }) {
  const [checked, setChecked] = useState(!!task.completed);
  const tags = Array.isArray(task.tags) ? task.tags : [];

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        {/* Left Container*/}
        <div className="flex min-w-0 items-start gap-2">
          <button
            type="button"
            onClick={() => setChecked((v) => !v)}
            className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 bg-white"
            aria-label="Toggle task"
          >
            {checked && <HiCheck className="h-4 w-4 text-zinc-900" />}
          </button>

          <div className="min-w-0">
            {/* Title */}
            <h3
              className={`
                 ${checked ? "text-zinc-400 line-through" : "text-zinc-900"} truncate font-semibold`}
            >
              {task.tittle}
            </h3>

            {/* Description */}
            <p
              className={`
                ${checked ? "text-zinc-400 line-through" : "text-zinc-600"}
                mt-1 truncate text-sm font-light
              `}
            >
              {task.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {tags.map((currTag, i) => {
                const tag = String(currTag).toLowerCase(); // normalize
                const tagStyles = getTagStyles(tag);

                return (
                  <span
                    key={`${currTag}-${i}`}
                    className={`
                       ${tagStyles.pill}
                      inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ring-1
                    `}
                  >
                    <span
                      className={`
                           ${tagStyles.iconWrap} inline-flex h-5 w-5 items-center justify-center rounded-full
                      `}
                    >
                      {renderTagIcon(tag)}
                    </span>
                    {currTag}
                  </span>
                );
              })}

              <span className="ml-1 text-sm text-zinc-400">
                {timeAgoFromISO(task.created)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Container*/}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-2"
            aria-label="Edit task"
            onClick={() => onEdit?.(task)}
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
