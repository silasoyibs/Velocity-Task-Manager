// Main task UI (client component)
import TaskCardSkeleton from "@/app/components/TaskCardSkeleton";
import TaskSection from "@/app/components/TaskSection";
import { Suspense } from "react";

// Server-side task fetcher used for initial page load
export default async function WorkTask({ params }) {
  const { tag } = await params;
  const title = tag.charAt(0).toUpperCase() + tag.slice(1);
  return (
    <>
      <div className="mb-3 text-2xl font-light text-black">{title} Task</div>
      {/* // Wrap content so all children share the same realtime task state */}
      <Suspense fallback={<TaskCardSkeleton />}>
        <TaskSection />
      </Suspense>
    </>
  );
}
