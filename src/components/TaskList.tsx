import type { StudyTask } from "../types/Task";
import TaskItem from "./TaskItem";
import "./TaskList.css";

type TaskListProps = {
  tasks: StudyTask[];
  onToggleComplete: (id: string) => void;
  onEditTask: (task: StudyTask) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: () => void;
};

export default function TaskList({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </div>
        <h3>No tasks found</h3>
        <p>Add a new task or adjust your filters to see results.</p>
        <button type="button" className="empty-add-button" onClick={onAddTask}>
          + Add Task
        </button>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
