"use client";

import EmptyState from "./EmptyState";
import TaskList from "./TaskList";
import { useTasksRealtime } from "../lib/TasksRealtimeProvider";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { normalize } from "../utils/helper";

// Decides whether to show the empty state or the task list
export default function TasksContent() {
  // All realtime tasks (already sorted by provider)
  const { sortedItems: tasks } = useTasksRealtime();
  // Read /dashboard/tag/[tag]
  const params = useParams();
  const activeTag = normalize(params?.tag);

  // Filter tasks based on route tag
  const filteredTasks = useMemo(() => {
    if (!activeTag) return tasks;

    return tasks.filter(
      (task) =>
        Array.isArray(task.tags) &&
        task.tags.some((t) => normalize(t) === activeTag),
    );
  }, [tasks, activeTag]);

  const isEmpty = !filteredTasks || filteredTasks.length === 0;

  return isEmpty ? (
    // Show empty state when no tasks exist
    <EmptyState message="No tasks yet ✨ Your list is empty  start by creating your first task." />
  ) : (
    // Render the task list when tasks are available
    <TaskList tasks={filteredTasks} />
  );
}
