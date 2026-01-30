import pb from "../lib/pocketbase";

// GET
export async function getTasks() {
  try {
    const result = await pb.collection("Tasks").getList(1, 30, {
      sort: "-created",
    });

    return result.items; // return only the tasks
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    throw new Error("Could not get tasks");
  }
}
