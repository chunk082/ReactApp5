// src/components/TaskFilters.tsx
// Search, Filter and sort controls for the task list.

import type { TaskPriority, TaskStatus } from "../types/Task";
import "./TaskFilters.css";

type PriorityFilter = "All Priorities" | TaskPriority;
type StatusFilter = "All Status" | TaskStatus | "Overdue";
type SortOption = "Newest" | "Due Date" | "Priority";

interface TaskFiltersProps {
  searchTerm: string;
  priorityFilter: PriorityFilter;
  sortOption: SortOption;
  statusFilter: StatusFilter;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: PriorityFilter) => void;
  onStatusChange: (Value: StatusFilter) => void;
  onSortChange: (value: SortOption) =>void;
  onClearFilters: () => void;
}

export default function TaskFilters ({
  searchTerm,
  priorityFilter,
  statusFilter,
  sortOption,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onSortChange,
  onClearFilters,
}: TaskFiltersProps) {
  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    priorityFilter !== "All Priorities" ||
    statusFilter !== "All Status" ||
    sortOption !== "Newest";

  return (
    <section className="task-filters">

      <div className="filter-grid">
        <label className="filter-field">
          <span>Search</span>
          <input
            type="text"
            placeholder="Search by task or subject..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label className="filter-field">
          <span>Priority</span>
          <select
            value={priorityFilter}
            onChange={(event) =>
              onPriorityChange(event.target.value as PriorityFilter)
            }
          >
            <option value="All Priorities">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label className="filter-field">
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusChange(event.target.value as StatusFilter)
            }
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </label>

        <label className="filter-field">
          <span>Sort</span>
          <select
            value={sortOption}
            onChange={(event) => 
              onSortChange(event.target.value as SortOption)
            }
          >
            <option value="Newest">Sort by Newest</option>
            <option value="Due Date"> Sort by Due Date</option>
            <option value="Priority">Sort by Priority</option>
          </select>
        </label>

        <div className="filter-actions">
          <button
            type="button"
            className="clear-filters-button"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
          >
            Clear filters
          </button>
        </div>
      </div>
    </section>
  )
}
