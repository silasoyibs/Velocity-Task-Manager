export default function TaskCardSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-black/5 bg-white px-6 py-5 shadow-soft ring-1 ring-black/5 animate-pulse">
      <div className="flex items-start justify-between gap-6">
        {/* Left: checkbox + text */}
        <div className="flex min-w-0 items-start gap-5 flex-1">
          {/* checkbox */}
          <div className="h-7 w-7 rounded-lg bg-zinc-200" />

          <div className="min-w-0 flex-1">
            {/* title */}
            <div className="h-6 w-40 rounded-md bg-zinc-200" />
            {/* description */}
            <div className="mt-3 h-4 w-56 rounded-md bg-zinc-100" />

            {/* tags row + time */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <TagPillSkeleton />
              <TagPillSkeleton />
              <TagPillSkeleton />
              <TagPillSkeleton />

              {/* time */}
              <div className="ml-2 h-4 w-16 rounded bg-zinc-100" />
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-4 pt-1">
          <div className="h-9 w-9 rounded-lg bg-zinc-100" />
          <div className="h-9 w-9 rounded-lg bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}

function TagPillSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2">
      {/* icon bubble */}
      <div className="h-6 w-6 rounded-full bg-zinc-200" />
      {/* label */}
      <div className="h-4 w-16 rounded bg-zinc-100" />
    </div>
  );
}
