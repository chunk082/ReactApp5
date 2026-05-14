// src/utils/localStorage.ts
// Handles saveings and loading task data from browser localStorage.

import type { StudyTask } from "../types/Task";

const TASK_STORAGE_KEY = "task-study-planner-tasks"

export function loadTasks(): StudyTask[] {
 const savedTasks = localStorage.getItem(TASK_STORAGE_KEY);

 if (! savedTasks) {
  return [];
 }

 try {
  return JSON.parse(savedTasks) as StudyTask[];
 } catch {
  return [];
 }
}

export function saveTasks(tasks:StudyTask[]){
 localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}