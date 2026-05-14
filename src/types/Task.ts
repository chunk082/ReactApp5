// src/types/Task.ts
// Defines the shared TypeScript structure for all task data.

export type TaskPriority = "High" | "Medium" | "Low";

export type TaskStatus = "Pending" | "Completed";

export type TaskCategory = "Study" | "Assignments" | "Personal";

export interface StudyTask {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  notes: string;
  createdAt: string;
}