// src/utils/tasjHelpers.ts
// Helper functions for Tasj Calculations, overdue checking, and sorting.

import type { StudyTask } from "../types/Task";

export function isTaskOverdue(task: StudyTask): boolean {
  if (!task.dueDate || task.status === "Completed") {
    return false;
  }

  const today = new Date();
  const dueDate = new Date(task.dueDate);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
}

export function getDueDateLabel(task: StudyTask): {
  label: string;
  tone: "overdue" | "today" | "soon" | "none" | "normal";
} {
  if (!task.dueDate) {
    return { label: "No due date", tone: "none" };
  }

  const today = new Date();
  const dueDate = new Date(task.dueDate);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const dayDifference = Math.round(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (task.status !== "Completed" && dayDifference < 0) {
    return { label: "Overdue", tone: "overdue" };
  }

  if (dayDifference === 0) {
    return { label: "Due today", tone: "today" };
  }

  if (dayDifference === 1) {
    return { label: "Due tomorrow", tone: "soon" };
  }

  return {
    label: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dueDate),
    tone: "normal",
  };
}

export function getCompletedPercentage(tasks: StudyTask[]): number {
  if (tasks.length === 0) {
    return 0;
  }
  
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return Math.round((completedTasks.length / tasks.length) * 100);
 }

 export function sortTasjsByDueDate(tasks: StudyTask[]): StudyTask[] {
  return [...tasks].sort(
   (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

 }
