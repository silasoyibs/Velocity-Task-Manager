"use client";

import { useEffect, useState } from "react";
import { useTasksRealtime } from "../lib/TasksRealtimeProvider";
import { deleteTask, updateTask } from "../services/apiTasks";
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";
import { AnimatePresence, Reorder } from "framer-motion";

export default function TaskList() {
  const { sortedItems: Tasks } = useTasksRealtime();
  const [editingTask, setEditingTask] = useState(null);

  // local order for dragging
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    setOrdered((prev) => {
      if (!prev.length) return Tasks;

      const prevIndex = new Map(prev.map((t, i) => [t.id, i]));
      return [...Tasks].sort(
        (a, b) => (prevIndex.get(a.id) ?? 9999) - (prevIndex.get(b.id) ?? 9999),
      );
    });
  }, [Tasks]);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmed) return;
    try {
      await deleteTask(id);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate(payload) {
    try {
      await updateTask(editingTask.id, payload);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Reorder.Group
        axis="y"
        values={ordered}
        onReorder={setOrdered}
        className="space-y-6"
      >
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
              <TaskCard
                task={task}
                onEdit={(t) => setEditingTask(t)}
                onDelete={handleDelete}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

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
