"use client";
import { useEffect, useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import PocketBase from "pocketbase";
import { tagVariant, timeAgoFromISO } from "../utils/helper";

export default function TaskListRealtime({ initialItems = [] }) {
  console.log(initialItems);
  const [items, setItems] = useState(initialItems);

  // keep newest first even after updates
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.created) - new Date(a.created));
  }, [items]);

  useEffect(() => {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

    pb.collection("Tasks").subscribe("*", (e) => {
      const record = e?.record;
      if (!record) return;

      setItems((prev) => {
        const idx = prev.findIndex((t) => t.id === record.id);

        if (e.action === "create") {
          if (idx !== -1) return prev;
          return [record, ...prev];
        }

        if (e.action === "update") {
          if (idx === -1) return [record, ...prev];
          const copy = [...prev];
          copy[idx] = record;
          return copy;
        }

        if (e.action === "delete") {
          return prev.filter((t) => t.id !== record.id);
        }

        return prev;
      });
    });

    return () => {
      pb.collection("Tasks").unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-6">
      {sortedItems.map((task) => {
        const firstTag = task.tags?.[0] || "Work";

        return (
          <TaskCard
            key={task.id}
            title={task.tittle}
            description={task.description}
            checked={task.completed}
            tag={{ label: firstTag, variant: tagVariant(firstTag) }}
            timeAgo={timeAgoFromISO(task.created)}
          />
        );
      })}
    </div>
  );
}
