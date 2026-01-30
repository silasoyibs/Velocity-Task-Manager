"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PocketBase from "pocketbase";

const TasksRealtimeContext = createContext(null);

export function TasksRealtimeProvider({ initialItems = [], children }) {
  const [items, setItems] = useState(initialItems);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.created) - new Date(a.created));
  }, [items]);

  useEffect(() => {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

    const unsub = pb.collection("Tasks").subscribe("*", (e) => {
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
      // unsubscribe current subscription
      pb.collection("Tasks").unsubscribe("*");
      // also close the client connection
      pb.authStore.clear();
      unsub?.();
    };
  }, []);

  return (
    <TasksRealtimeContext.Provider value={{ items, sortedItems, setItems }}>
      {children}
    </TasksRealtimeContext.Provider>
  );
}

export function useTasksRealtime() {
  const ctx = useContext(TasksRealtimeContext);
  if (!ctx)
    throw new Error(
      "useTasksRealtime must be used inside TasksRealtimeProvider",
    );
  return ctx;
}
