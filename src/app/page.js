// Main task UI (client component)
import TasksContent from "./components/TasksContent";

// Context provider that handles realtime task updates
import { TasksRealtimeProvider } from "./lib/TasksRealtimeProvider";

// Server-side task fetcher used for initial page load
import { getTasks } from "./services/apiTasks";

export default async function DashboardPage() {
  // Fetch initial tasks on the server before realtime kicks in
  const tasks = await getTasks();

  return (
    // Wrap content so all children share the same realtime task state
    <TasksRealtimeProvider initialItems={tasks}>
      <TasksContent />
    </TasksRealtimeProvider>
  );
}
