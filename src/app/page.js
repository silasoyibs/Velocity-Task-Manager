import EmptyState from "./components/EmptyState";
import TaskList from "./components/TaskList";
import TasksContent from "./components/TasksContent";
import { TasksRealtimeProvider } from "./lib/TasksRealtimeProvider";
import { getTasks } from "./services/apiTasks";

export default async function DashboardPage() {
  const tasks = await getTasks();
  return (
    <TasksRealtimeProvider initialItems={tasks}>
      <TasksContent />
      {/* {<TaskList />} */}
    </TasksRealtimeProvider>
  );
}
// <EmptyState message="No tasks yet ✨ Your list is empty start by creating your first task." />
