export interface Task {
	id: number; // Unique identifier for each task
	name: string; // Name of the task
	description: string; // A brief description of the task
	status: "pending" | "completed" | "in-progress" | "editable"; // Task status (you can extend this if needed)
}
