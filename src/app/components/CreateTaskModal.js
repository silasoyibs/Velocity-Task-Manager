"use client";
import { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/apiTasks";
import { toast } from "sonner";

// Available tag categories shown in the modal
const categories = [
  { key: "work", label: "Work", icon: BriefcaseIcon },
  { key: "urgent", label: "Urgent", icon: AlertIcon },
  { key: "personal", label: "Personal", icon: UserIcon },
  { key: "ideas", label: "Ideas", icon: BulbIcon },
];

export default function CreateTaskModal({
  open,
  onClose,
  mode = "create",
  task = null,
}) {
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Selected tags (multi-select, but never empty)
  const [selectedTags, setSelectedTags] = useState(["work"]);

  useEffect(() => {
    // Don’t touch state if the modal isn’t open
    if (!open) return;

    // Pre-fill fields when editing an existing task
    if (mode === "edit" && task) {
      setTitle(task.tittle || "");
      setDescription(task.description || "");

      // Use task tags if present, otherwise default to "work"
      const t =
        Array.isArray(task.tags) && task.tags.length ? task.tags : ["work"];
      setSelectedTags(t);
    } else {
      // Reset fields when creating a fresh task
      setTitle("");
      setDescription("");
      setSelectedTags(["work"]);
    }
  }, [open, mode, task]);

  useEffect(() => {
    // Only listen for Escape while modal is open
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Don’t render anything if the modal is closed
  if (!open) return null;

  function toggleTag(tagKey) {
    setSelectedTags((prev) => {
      const has = prev.includes(tagKey);

      // Prevent removing the last remaining tag
      if (has && prev.length === 1) return prev;

      // Add or remove tag from the list
      return has ? prev.filter((t) => t !== tagKey) : [...prev, tagKey];
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Build payload in the format expected by PocketBase
    const payload = {
      tittle: title.trim(),
      description: description.trim(),
      tags: selectedTags,
    };

    // Skip submit if title is empty
    if (!payload.tittle) return;

    try {
      // Update existing task when in edit mode
      if (mode === "edit" && task?.id) {
        await updateTask(task.id, payload);
        toast.success("Task update successful");
      } else {
        // Create a new task when in create mode
        await createTask(payload);
        toast.success("Task created successful");
      }

      // Close modal after success
      onClose?.();
    } catch (err) {
      console.error(
        `${mode === "edit" ? "Update" : "Create"} task failed:`,
        err,
      );

      // Show a toast error message on failure
      toast.error(
        `${mode === "edit" ? "Update" : "Create"} task failed:` || err.message,
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Clickable backdrop to close the modal */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Centered modal container */}
      <div className="relative mx-auto flex min-h-screen max-w-2xl items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/10">
          {/* Modal header */}
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              {mode === "edit" ? "Edit Task" : "Create New Task"}
            </h2>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
              aria-label="Close"
            >
              <XIcon />
            </button>
          </div>

          {/* Main form body */}
          <form onSubmit={handleSubmit} className="px-5 py-4">
            {/* Title input */}
            <label className="block text-sm font-medium text-zinc-900">
              Task Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />

            {/* Description input */}
            <label className="mt-4 block text-sm font-medium text-zinc-900">
              Description <span className="text-zinc-400">(Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="mt-2 w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />

            {/* Tag picker */}
            <div className="mt-5">
              <div className="text-sm font-medium text-zinc-900">
                Categories
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {categories.map((c) => {
                  // Pull the matching icon component
                  const Icon = c.icon;

                  // Check if this tag is selected
                  const selected = selectedTags.includes(c.key);

                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => toggleTag(c.key)}
                      className={[
                        "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition",
                        selected
                          ? "border-amber-400 bg-amber-50 text-black ring-2 ring-amber-200"
                          : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50",
                      ].join(" ")}
                      aria-pressed={selected}
                    >
                      {/* Category icon */}
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white ring-1 ring-black/5">
                        <Icon />
                      </span>

                      {/* Category label */}
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {/* Small helper text */}
              <div className="mt-2 text-xs text-zinc-500">
                Tip: you can pick multiple. (At least one is required.)
              </div>
            </div>

            {/* Form footer actions */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-black/10 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black "
                disabled={!title.trim()}
              >
                {mode === "edit" ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */

// Close icon used in the header
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.3 5.71a1 1 0 010 1.41L13.41 12l4.89 4.88a1 1 0 01-1.42 1.42L12 13.41l-4.88 4.89a1 1 0 01-1.42-1.42L10.59 12 5.7 7.12A1 1 0 017.12 5.7L12 10.59l4.88-4.88a1 1 0 011.42 0z" />
    </svg>
  );
}

// Briefcase icon for "Work"
function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M9 3.75A2.25 2.25 0 0111.25 1.5h1.5A2.25 2.25 0 0115 3.75V6h4.5A2.25 2.25 0 0121.75 8.25v10.5A2.25 2.25 0 0119.5 21h-15A2.25 2.25 0 012.25 18.75V8.25A2.25 2.25 0 014.5 6H9V3.75zM10.5 6h3V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75V6z" />
    </svg>
  );
}

// Warning icon for "Urgent"
function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2.25a.75.75 0 01.67.41l9 18a.75.75 0 01-.67 1.09H3a.75.75 0 01-.67-1.09l9-18A.75.75 0 0112 2.25zm0 6a.75.75 0 00-.75.75v5.25a.75.75 0 001.5 0V9A.75.75 0 0012 8.25zm0 10.5a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  );
}

// User icon for "Personal"
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 12a4.5 4.5 0 10-4.5-4.5A4.5 4.5 0 0012 12zm0 2.25c-4.97 0-9 2.239-9 5V20a3 3 0 003 3h12a3 3 0 003-3v-.75c0-2.761-4.03-5-9-5z" />
    </svg>
  );
}

// Lightbulb icon for "Ideas"
function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2.25A7.5 7.5 0 006.75 15.3V18A2.25 2.25 0 009 20.25h6A2.25 2.25 0 0017.25 18v-2.7A7.5 7.5 0 0012 2.25zM9.75 21.75A1.5 1.5 0 0011.25 23h1.5a1.5 1.5 0 001.5-1.25h-4.5z" />
    </svg>
  );
}
