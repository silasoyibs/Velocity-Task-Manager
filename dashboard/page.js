import TaskList from "../src/app/components/TaskList";
// import TaskListRealtime from "../components/TaskListRealTime";
import { TasksRealtimeProvider } from "../src/app/lib/TasksRealtimeProvider";
import { getTasks } from "../src/app/services/apiTasks";

export default async function DashboardPage() {
  const tasks = await getTasks();
  return (
    <TasksRealtimeProvider initialItems={tasks}>
      <TaskList />
    </TasksRealtimeProvider>
  );
}
