import { Suspense } from "react";
import TaskCardSkeleton from "../components/TaskCardSkeleton";
import TaskSection from "../components/TaskSection";

export default function DashboardPage() {
  return (
    <>
      <div className=" mb-3 text-2xl font-light text-black">All Task</div>
      {/* // Wrap content so all children share the same realtime task state */}
      <Suspense fallback={<TaskCardSkeleton />}>
        <TaskSection />
      </Suspense>
    </>
  );
}
