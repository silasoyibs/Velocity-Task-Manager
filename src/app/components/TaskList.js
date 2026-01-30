"use client";
import { useTasksRealtime } from "../lib/TasksRealtimeProvider";
import TaskCard from "./TaskCard";

export default function TaskList() {
  const { sortedItems: Tasks } = useTasksRealtime();
  return (
    <div className="space-y-6">
      {Tasks.map((task) => {
        return <TaskCard key={task.id} title={task.tittle} task={task} />;
      })}
    </div>
  );
}
