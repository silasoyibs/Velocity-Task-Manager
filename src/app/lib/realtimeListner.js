"use client";

import { useEffect, useMemo, useState } from "react";
import PocketBase from "pocketbase";

// Hook that keeps a task list in sync with PocketBase realtime updates
export function useRealTimeListner(initialItems) {
  // Local state seeded with server-fetched items
  const [items, setItems] = useState(initialItems);

  // Always return tasks sorted by newest first
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.created) - new Date(a.created));
  }, [items]);

  useEffect(() => {
    // Create a PocketBase client for realtime subscriptions
    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

    // Listen to all task changes (create, update, delete)
    pb.collection("Tasks").subscribe("*", (e) => {
      const record = e?.record;
      if (!record) return;

      setItems((prev) => {
        // Find the existing task index if it exists
        const idx = prev.findIndex((t) => t.id === record.id);

        // Add new task to the top of the list
        if (e.action === "create") {
          if (idx !== -1) return prev;
          return [record, ...prev];
        }

        // Replace or insert updated task
        if (e.action === "update") {
          if (idx === -1) return [record, ...prev];
          const copy = [...prev];
          copy[idx] = record;
          return copy;
        }

        // Remove deleted task from state
        if (e.action === "delete") {
          return prev.filter((t) => t.id !== record.id);
        }

        return prev;
      });
    });

    // Clean up realtime subscription on unmount
    return () => {
      pb.collection("Tasks").unsubscribe();
    };
  }, []);

  // Expose sorted realtime items
  return sortedItems;
}
