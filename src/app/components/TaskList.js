"use client";
import { useState } from "react";
import { useTasksRealtime } from "../lib/TasksRealtimeProvider";
import { deleteTask, updateTask } from "../services/apiTasks";
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";
import { AnimatePresence, motion } from "framer-motion";

export default function TaskList() {
  const { sortedItems: Tasks } = useTasksRealtime();
  const [editingTask, setEditingTask] = useState(null);

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
      setEditingTask(null); // ✅ close modal
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <motion.div layout className="space-y-6">
        <AnimatePresence initial={false}>
          {Tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", stiffness: 1000, damping: 90 }}
            >
              <TaskCard
                task={task}
                onEdit={(t) => setEditingTask(t)}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <CreateTaskModal
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        mode="edit"
        task={editingTask}
        onSubmit={handleUpdate}
      />
      ;
    </>
  );
}
