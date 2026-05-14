// src/components/TaskForm.tsx
import React, { useState } from 'react';
import type { StudyTask, TaskCategory, TaskPriority } from '../types/Task.ts';
import './TaskForm.css';

interface TaskFormProps {
  editingTask: StudyTask | null;

  onAddTask: (
    taskData: Omit<StudyTask, "id" | "status" | "createdAt">
  ) => void;

  onUpdateTask: (
    taskData: Omit<StudyTask, "id" | "status" | "createdAt">
  ) => void;

  onClose:() => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ editingTask, onAddTask, onUpdateTask, onClose, }) => {
  // Use taskToEdit directly for the initial state. 
  // No useEffect needed!
  const [formData, setFormData] = useState<Omit<StudyTask, "id" | "createdAt">>(
    editingTask || {
      title: '',
      category: 'Personal',
      priority: 'Low',
      dueDate: '',
      notes: '',
      status: 'Pending'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const taskData = {
      title: formData.title || "",
      category: formData.category as TaskCategory,
      priority: formData.priority as TaskPriority,
      dueDate: formData.dueDate || "",
      notes: formData.notes || "",
    };
   
    if (editingTask) {
      onUpdateTask(taskData);
    } else {
      onAddTask(taskData);
    }
   
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header>
            <i className="bi bi-check2-circle" style={{ fontSize: '2rem' }}></i>
          <div className="icon-title">
             <h2>{editingTask ? 'Edit task' : 'Create a task'}</h2>
              <p className="subtitle">Please fill in the details below</p>
          </div>
          
        </header>

        <form onSubmit={handleSubmit}>
          <input 
            className="task-input"
            placeholder="Task title"
            value={formData.title || ''}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />

          <div className="form-row">
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value as TaskCategory})}
            >
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Assignments">Assignments</option>
            </select>

            <select 
              value={formData.priority} 
              onChange={(e) => setFormData({...formData, priority: e.target.value as TaskPriority})}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <input 
            type="date"
            className="task-input"
            value={formData.dueDate || ''}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
          />

          <textarea 
            placeholder="Notes"
            value={formData.notes || ''}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">
              {editingTask ? 'Update task' : 'Add a task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;