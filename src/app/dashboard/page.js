import TaskListRealtime from "../components/TaskListRealTime";
import { getTasks } from "../services/apiTasks";

export default async function DashboardPage() {
  const tasks = await getTasks();
  console.log(tasks);
  return <TaskListRealtime initialItems={tasks} />;
}
