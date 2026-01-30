"use client";

import { useEffect, useState } from "react";
import { useTasksRealtime } from "../lib/TasksRealtimeProvider";
import { deleteTask, updateTask } from "../services/apiTasks";
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";
import { AnimatePresence, Reorder } from "framer-motion";

export default function TaskList() {
  // Get realtime tasks (already sorted by newest)
  const { sortedItems: Tasks } = useTasksRealtime();

  // Holds the task currently being edited (also controls the edit modal)
  const [editingTask, setEditingTask] = useState(null);

  // Separate local ordering so drag-reorder doesn’t fight realtime sorting
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    // Keep the current drag order if possible when Tasks updates from realtime
    setOrdered((prev) => {
      if (!prev.length) return Tasks;

      // Build a quick lookup of the previous order positions
      const prevIndex = new Map(prev.map((t, i) => [t.id, i]));

      // Sort incoming Tasks to match the last known local order
      return [...Tasks].sort(
        (a, b) => (prevIndex.get(a.id) ?? 9999) - (prevIndex.get(b.id) ?? 9999),
      );
    });
  }, [Tasks]);

  async function handleDelete(id) {
    // Quick confirm to avoid accidental deletes
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmed) return;

    try {
      // Delete in PocketBase (realtime will update the list)
      await deleteTask(id);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate(payload) {
    try {
      // Persist edits (realtime will update the list)
      await updateTask(editingTask.id, payload);

      // Close the modal after successful update
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* Draggable reorder list */}
      <Reorder.Group
        axis="y"
        values={ordered}
        onReorder={setOrdered}
        className="space-y-6"
      >
        {/* Animate items entering/leaving the list */}
        <AnimatePresence initial={false}>
          {ordered.map((task) => (
            <Reorder.Item
              key={task.id}
              value={task}
              layout
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", stiffness: 600, damping: 50 }}
              whileDrag={{ scale: 1.01 }}
              className="cursor-grab active:cursor-grabbing"
            >
              {/* Task card UI */}
              <TaskCard
                task={task}
                onEdit={(t) => setEditingTask(t)}
                onDelete={handleDelete}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Edit modal (reuses the create modal in edit mode) */}
      <CreateTaskModal
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        mode="edit"
        task={editingTask}
        onSubmit={handleUpdate}
      />
    </>
  );
}
