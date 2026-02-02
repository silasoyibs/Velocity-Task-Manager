"use client";
import { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/apiTasks";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoAlertCircle, IoCloseSharp } from "react-icons/io5";
import { FaUser, FaLightbulb } from "react-icons/fa";
import { toast } from "sonner";

// Available tag categories shown in the modal
const categories = [
  { key: "work", label: "Work", icon: BsBriefcaseFill, color: "text-blue-500" },
  {
    key: "urgent",
    label: "Urgent",
    icon: IoAlertCircle,
    color: "text-red-500",
  },
  {
    key: "personal",
    label: "Personal",
    icon: FaUser,
    color: "text-purple-500",
  },
  { key: "ideas", label: "Ideas", icon: FaLightbulb, color: "text-amber-500" },
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

  // Tracks submission state to prevent double submits + show "Creating/Updating"
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && task) {
      setTitle(task.tittle || "");
      setDescription(task.description || "");

      const t =
        Array.isArray(task.tags) && task.tags.length ? task.tags : ["work"];
      setSelectedTags(t);
    } else {
      setTitle("");
      setDescription("");
      setSelectedTags(["work"]);
    }

    setSubmitting(false);
  }, [open, mode, task]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape" && !submitting) onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, submitting]);

  if (!open) return null;

  function toggleTag(tagKey) {
    setSelectedTags((prev) => {
      const has = prev.includes(tagKey);
      if (has && prev.length === 1) return prev;
      return has ? prev.filter((t) => t !== tagKey) : [...prev, tagKey];
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const payload = {
      tittle: title.trim(),
      description: description.trim(),
      tags: selectedTags,
    };

    if (!payload.tittle) return;

    try {
      setSubmitting(true);

      if (mode === "edit" && task?.id) {
        await updateTask(task.id, payload);
        toast.success("Task update successful");
      } else {
        await createTask(payload);
        toast.success("Task created successful");
      }

      onClose?.();
    } catch (err) {
      console.error(
        `${mode === "edit" ? "Update" : "Create"} task failed:`,
        err,
      );
      toast.error(`${mode === "edit" ? "Update" : "Create"} task failed`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Clickable backdrop to close the modal */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={() => {
          if (!submitting) onClose?.();
        }}
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
              onClick={() => {
                if (!submitting) onClose?.();
              }}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700 disabled:opacity-50"
              aria-label="Close"
              disabled={submitting}
            >
              <IoCloseSharp />
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
                  const Icon = c.icon;
                  const selected = selectedTags.includes(c.key);

                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => toggleTag(c.key)}
                      className={`${
                        selected
                          ? "border-amber-400 bg-amber-50 text-black ring-2 ring-amber-200"
                          : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
                      } inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition`}
                      aria-pressed={selected}
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white ring-1 ring-black/5">
                        <Icon className={c.color} />
                      </span>
                      {c.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 text-xs text-zinc-500">
                Tip: you can pick multiple. (At least one is required.)
              </div>
            </div>

            {/* Form footer actions */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-black/10 pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!submitting) onClose?.();
                }}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!title.trim() || submitting}
              >
                {submitting
                  ? mode === "edit"
                    ? "Updating…"
                    : "Creating…"
                  : mode === "edit"
                    ? "Update Task"
                    : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
