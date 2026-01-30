import TaskList from "../components/TaskList";
// import TaskListRealtime from "../components/TaskListRealTime";
import { TasksRealtimeProvider } from "../lib/TasksRealtimeProvider";
import { getTasks } from "../services/apiTasks";

export default async function DashboardPage() {
  const tasks = await getTasks();
  return (
    <TasksRealtimeProvider initialItems={tasks}>
      <TaskList />
    </TasksRealtimeProvider>
  );
}
