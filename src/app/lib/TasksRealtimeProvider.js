"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PocketBase from "pocketbase";

// Shared context for tasks + realtime state
const TasksRealtimeContext = createContext(null);

export function TasksRealtimeProvider({ initialItems = [], children }) {
  // Local task state seeded from the server-rendered fetch
  const [items, setItems] = useState(initialItems);

  // Derived list kept sorted by newest first for rendering
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.created) - new Date(a.created));
  }, [items]);

  useEffect(() => {
    // Create a PocketBase client for realtime subscriptions
    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

    // Subscribe to all changes in the Tasks collection
    const unsub = pb.collection("Tasks").subscribe("*", (e) => {
      const record = e?.record;
      if (!record) return;

      setItems((prev) => {
        // Check if this record already exists in state
        const idx = prev.findIndex((t) => t.id === record.id);

        // Add new task to the front
        if (e.action === "create") {
          if (idx !== -1) return prev;
          return [record, ...prev];
        }

        // Replace existing task or insert if missing
        if (e.action === "update") {
          if (idx === -1) return [record, ...prev];
          const copy = [...prev];
          copy[idx] = record;
          return copy;
        }

        // Remove deleted task from the list
        if (e.action === "delete") {
          return prev.filter((t) => t.id !== record.id);
        }

        return prev;
      });
    });

    return () => {
      // Unsubscribe realtime listeners on unmount
      pb.collection("Tasks").unsubscribe("*");

      // Clear auth state for this client instance
      pb.authStore.clear();

      // Also run the unsubscribe function returned by subscribe
      unsub?.();
    };
  }, []);

  // Expose raw items, sorted items, and a setter for local updates/optimistic UI
  return (
    <TasksRealtimeContext.Provider value={{ items, sortedItems, setItems }}>
      {children}
    </TasksRealtimeContext.Provider>
  );
}

export function useTasksRealtime() {
  // Read tasks state from context
  const ctx = useContext(TasksRealtimeContext);

  // Guard against using the hook outside the provider
  if (!ctx)
    throw new Error(
      "useTasksRealtime must be used inside TasksRealtimeProvider",
    );

  return ctx;
}
