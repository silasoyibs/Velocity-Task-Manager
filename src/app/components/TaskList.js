"use client";
import { useTasksRealtime } from "../lib/TasksRealtimeProvider";
import { deleteTask } from "../services/apiTasks";
import TaskCard from "./TaskCard";

export default function TaskList() {
  const { sortedItems: Tasks } = useTasksRealtime();

  function handleDelete(id) {
    console.log("clicked");
    deleteTask(id);
  }
  return (
    <div className="space-y-6">
      {Tasks.map((task) => {
        return (
          <TaskCard
            key={task.id}
            title={task.tittle}
            task={task}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}
