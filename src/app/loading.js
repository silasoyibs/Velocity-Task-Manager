import TaskCardSkeleton from "./components/TaskCardSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  );
}
