"use client";
import { useEffect, useMemo, useState } from "react";
import PocketBase from "pocketbase";

export function useRealTimeListner(initialItems) {
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
  return sortedItems;
}
