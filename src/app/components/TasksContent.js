"use client";

import EmptyState from "./EmptyState";
import TaskList from "./TaskList";
import { useTasksRealtime } from "../lib/TasksRealtimeProvider";

// Decides whether to show the empty state or the task list
export default function TasksContent() {
  // Get the realtime-sorted tasks from context
  const { sortedItems: tasks } = useTasksRealtime();

  // Check if there are no tasks to display
  const isEmpty = !tasks || tasks.length === 0;

  return isEmpty ? (
    // Show empty state when no tasks exist
    <EmptyState message="No tasks yet ✨ Your list is empty  start by creating your first task." />
  ) : (
    // Render the task list when tasks are available
    <TaskList />
  );
}
