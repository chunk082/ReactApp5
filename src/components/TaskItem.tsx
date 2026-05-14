import type { StudyTask } from "../types/Task";
import { getDueDateLabel } from "../utils/taskHelpers";
import "./TaskItem.css";

type TaskItemProps = {
  task: StudyTask;
  onToggleComplete: (id: string) => void;
  onEditTask: (task: StudyTask) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskItem({ task, onToggleComplete, onEditTask, onDeleteTask }: TaskItemProps) {
  const isCompleted = task.status === "Completed";
  const dueDate = getDueDateLabel(task);

  return (
    <div className={`task-card ${isCompleted ? "task-completed" : ""}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
      
      <div className="task-details">
        <p><strong>Category:</strong> {task.category}</p>
        <p>
          <strong>Due:</strong>{" "}
          <span className={`due-date-badge due-date-${dueDate.tone}`}>
            {dueDate.label}
          </span>
        </p>
        <p><strong>Status:</strong> {task.status}</p>
      </div>

      {task.notes && (
        <div className="task-notes">
          <p>{task.notes}</p>
        </div>
      )}

      <div className="task-actions">
        <button 
          className={`btn ${isCompleted ? "btn-warning" : "btn-success"}`} 
          onClick={() => onToggleComplete(task.id)}
        >
          {isCompleted ? "Mark Pending" : "Complete"}
        </button>
        
        <button className="btn btn-secondary" onClick={() => onEditTask(task)}>
          Edit
        </button>
        
        <button className="btn btn-danger" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
