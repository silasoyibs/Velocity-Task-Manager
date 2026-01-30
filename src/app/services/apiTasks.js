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

// DELETE
export async function deleteTask(id) {
  try {
    await pb.collection("Tasks").delete(id);
    return id;
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    throw new Error("Could not delete task");
  }
}

// CREATE
export async function createTask({ tittle, description = "", tags = [] }) {
  try {
    const record = await pb.collection("Tasks").create({
      tittle,
      description,
      completed: false,
      tags, // ✅ PB field
    });

    return record;
  } catch (err) {
    console.error("Failed to create task:", err);
    throw new Error("Could not create task");
  }
}
