"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

  // Keep a stable PB client across renders
  const pbRef = useRef(null);

  useEffect(() => {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
    pbRef.current = pb;

    let cancelled = false;
    let unsubFn = null;

    (async () => {
      try {
        // subscribe may return a Promise (common)
        unsubFn = await pb.collection("Tasks").subscribe("*", (e) => {
          if (cancelled) return;

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
      } catch (err) {
        console.error("PocketBase subscribe failed:", err);
      }
    })();

    return () => {
      cancelled = true;

      // Safely unsubscribe
      if (typeof unsubFn === "function") {
        try {
          unsubFn();
        } catch (e) {
          console.warn("unsubFn threw:", e);
        }
      } else {
        // fallback (works even if subscribe never resolved)
        try {
          pb.collection("Tasks").unsubscribe("*");
        } catch {}
      }

      pbRef.current = null;
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
  if (!ctx) {
    throw new Error(
      "useTasksRealtime must be used inside TasksRealtimeProvider",
    );
  }
  return ctx;
}
