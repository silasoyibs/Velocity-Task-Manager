// PocketBase client instance
import pb from "../lib/pocketbase";

// Fetch a paginated list of tasks sorted by newest first
export async function getTasks() {
  try {
    const result = await pb.collection("Tasks").getList(1, 30, {
      sort: "-created",
    });

    // Return only the task records
    return result.items;
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    throw new Error("Could not get tasks");
  }
}

// Delete a task by its id
export async function deleteTask(id) {
  try {
    await pb.collection("Tasks").delete(id);

    // Return the deleted task id for state updates
    return id;
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    throw new Error("Could not delete task");
  }
}

// Create a new task record
export async function createTask({ tittle, description = "", tags = [] }) {
  try {
    const record = await pb.collection("Tasks").create({
      tittle,
      description,
      completed: false,
      tags,
    });

    // Return the created task
    return record;
  } catch (err) {
    console.error("Failed to create task:", err);
    throw new Error("Could not create task");
  }
}

// Update an existing task with partial changes
export async function updateTask(id, updates = {}) {
  const record = await pb.collection("Tasks").update(id, updates);

  // Return the updated task
  return record;
}
