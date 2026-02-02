// Skeleton placeholder shown while tasks are loading
import TaskCardSkeleton from "../components/TaskCardSkeleton";

export default function Loading() {
  return (
    // Stack multiple skeleton cards to mimic the task list layout
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        // Key is safe here since this list is static and non-interactive
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  );
}
