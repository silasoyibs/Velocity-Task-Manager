import { TasksRealtimeProvider } from "../lib/TasksRealtimeProvider";
import { getTasks } from "../services/apiTasks";
import TasksContent from "./TasksContent";

export default async function TaskSection() {
  const tasks = await getTasks();
  return (
    <TasksRealtimeProvider initialItems={tasks}>
      <TasksContent />
    </TasksRealtimeProvider>
  );
}
