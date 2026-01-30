"use client";
import EmptyState from "./EmptyState";
import TaskList from "./TaskList";
import { useTasksRealtime } from "../lib/TasksRealtimeProvider";

export default function TasksContent() {
  const { sortedItems: tasks } = useTasksRealtime();
  const isEmpty = !tasks || tasks.length === 0;
  return isEmpty ? (
    <EmptyState message="No tasks yet ✨ Your list is empty  start by creating your first task." />
  ) : (
    <TaskList />
  );
}
