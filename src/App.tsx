// src/App.tsx
// Main app file. Manages global task state and connects all components.

import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import type { StudyTask, TaskCategory, TaskPriority, TaskStatus } from "./types/Task";
import { loadTasks, saveTasks } from "./utils/localStorage";
import { isTaskOverdue } from "./utils/taskHelpers";
import "./App.css";

type CategoryFilter = "All Tasks" | TaskCategory | "Completed";
type PriorityFilter = "All Priorities" | TaskPriority;
type StatusFilter = "All Status" | TaskStatus | "Overdue";
type SortOption = "Newest" | "Due Date" | "Priority";

export default function App() {
  // Main task state loaded from localStorage.
  const [tasks, setTasks] = useState<StudyTask[]>(() => loadTasks());

  // Modal/form state.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<StudyTask | null>(null);

  // Filter state.
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All Tasks");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>("All Priorities");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Status");
  const [sortOption, setSortOption] = useState<SortOption>("Newest");

  // Save tasks whenever task list changes.
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Adds a new task.
  function handleAddTask(taskData: Omit<StudyTask, "id" | "status" | "createdAt">) {
    const newTask: StudyTask = {
      id: crypto.randomUUID(),
      ...taskData,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setIsFormOpen(false);
  }

  // Updates an existing task.
  function handleUpdateTask(taskData: Omit<StudyTask, "id" | "status" | "createdAt">) {
    if (!editingTask) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              ...taskData,
            }
          : task
      )
    );

    setEditingTask(null);
    setIsFormOpen(false);
  }

  // Opens form in edit mode.
  function handleEditTask(task: StudyTask) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  // Deletes a task.
  function handleDeleteTask(taskId: string) {
    const shouldDelete = window.confirm(
      "Delete this task? This action cannot be undone."
    );

    if (!shouldDelete) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  // Toggles task status between Pending and Completed.
  function handleToggleComplete(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  }

  // Opens form in add mode.
  function handleOpenAddForm() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  // Closes modal form.
  function handleCloseForm() {
    setEditingTask(null);
    setIsFormOpen(false);
  }

  function handleClearFilters() {
    setSelectedCategory("All Tasks");
    setSearchTerm("");
    setPriorityFilter("All Priorities");
    setStatusFilter("All Status");
    setSortOption("Newest");
  }

  // Filters and sorts tasks before showing them.
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (selectedCategory === "Completed") {
      result = result.filter((task) => task.status === "Completed");
    } else if (selectedCategory !== "All Tasks") {
      result = result.filter((task) => task.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priorityFilter !== "All Priorities") {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    if (statusFilter === "Overdue") {
      result = result.filter((task) => isTaskOverdue(task));
    } else if (statusFilter !== "All Status") {
      result = result.filter((task) => task.status === statusFilter);
    }

    if (sortOption === "Due Date") {
      result.sort(
        (a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }

    if (sortOption === "Priority") {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    if (sortOption === "Newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [tasks, selectedCategory, searchTerm, priorityFilter, statusFilter, sortOption]);

  const completedCount = tasks.filter((task) => task.status === "Completed").length;
  const pendingCount = tasks.filter((task) => task.status === "Pending").length;
  const overdueCount = tasks.filter((task) => isTaskOverdue(task)).length;
  const dueTodayCount = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") {
      return false;
    }

    const today = new Date();
    const dueDate = new Date(task.dueDate);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate.getTime() === today.getTime();
  }).length;

  return (
    <div className="app-shell">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="main-content">
        <section className="hero-section">
          <div>
            <p className="hero-eyebrow">Student productivity dashboard</p>
            <h1>Plan smarter. Study better.</h1>
            <p>
              Organize assignments, study tasks, priorities, and deadlines in one
              simple planner.
            </p>
          </div>

          <button className="primary-action" onClick={handleOpenAddForm}>
            + Add Task
          </button>
        </section>

        <SummaryCards
          totalTasks={tasks.length}
          completedTasks={completedCount}
          pendingTasks={pendingCount}
          overdueTasks={overdueCount}
          dueTodayTasks={dueTodayCount}
        />

        <TaskFilters
          searchTerm={searchTerm}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          sortOption={sortOption}
          onSearchChange={setSearchTerm}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
          onSortChange={setSortOption}
          onClearFilters={handleClearFilters}
        />

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleOpenAddForm}
        />
      </main>

      {isFormOpen && (
        <TaskForm
          editingTask={editingTask}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
