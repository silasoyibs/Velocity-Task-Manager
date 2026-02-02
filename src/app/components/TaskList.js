"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import { deleteTask, updateTask } from "../services/apiTasks";

export default function TaskList({ tasks = [] }) {
  const [editingTask, setEditingTask] = useState(null);

  // Stores only the user's drag order (ids), not the full task objects.
  const [orderIds, setOrderIds] = useState(() => tasks.map((t) => t.id));

  const taskById = useMemo(() => new Map(tasks.map((t) => [t.id, t])), [tasks]);

  // Merge incoming tasks with the user's last known drag order:
  // - keep existing ids in their dragged order
  // - drop deleted ids
  // - put brand new ids at the top (so new tasks appear first)
  const mergedIds = useMemo(() => {
    const incomingIds = tasks.map((t) => t.id);
    const incomingSet = new Set(incomingIds);

    const kept = orderIds.filter((id) => incomingSet.has(id));
    const extras = incomingIds.filter((id) => !kept.includes(id));

    return [...extras, ...kept];
  }, [tasks, orderIds]);

  const orderedTasks = useMemo(() => {
    return mergedIds.map((id) => taskById.get(id)).filter(Boolean);
  }, [mergedIds, taskById]);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate(payload) {
    if (!editingTask?.id) return;

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
        values={orderedTasks}
        onReorder={(next) => setOrderIds(next.map((t) => t.id))}
        className="space-y-6"
      >
        <AnimatePresence initial={false}>
          {orderedTasks.map((task) => (
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
                onEdit={setEditingTask}
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
