import TasksContent from "./components/TasksContent";
import { TasksRealtimeProvider } from "./lib/TasksRealtimeProvider";
import { getTasks } from "./services/apiTasks";

export default async function DashboardPage() {
  const tasks = await getTasks();
  return (
    <TasksRealtimeProvider initialItems={tasks}>
      <TasksContent />
    </TasksRealtimeProvider>
  );
}
