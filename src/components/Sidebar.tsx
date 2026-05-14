// src/components/Sidebar.tsx
// Sidebar navigation for task categories.

import type { ReactNode } from "react";
import logo from "../assets/logo.svg";
import './Sidebar.css'

type SidebarCategory =
  | 'All Tasks'
  | 'Study'
  | 'Assignments'
  | 'Personal'
  | 'Completed'

type SidebarProps = {
  selectedCategory: SidebarCategory
  onSelectCategory: (category: SidebarCategory) => void
}

const categories: SidebarCategory[] = [
  'All Tasks',
  'Study',
  'Assignments',
  'Personal',
  'Completed',
]

const categoryIcons: Record<SidebarCategory, ReactNode> = {
  'All Tasks': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  ),
  Study: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    </svg>
  ),
  Assignments: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6l2 2h3v16H4V5h3l2-2Z" />
      <path d="m9 13 2 2 4-5" />
    </svg>
  ),
  Personal: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Completed: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 11.1V12a9 9 0 1 1-5.3-8.2" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
}

function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Task category navigation">
      <div className="sidebar__header">
        <div className="sidebar__brand">
          <img
            src={logo} alt="Task Study Planner Logo"
            className="sidebar__logo" 
          />
        </div>
      </div>

      <nav className="sidebar__nav">
        {categories.map((category) => {
          const isActive = category === selectedCategory

          return (
            <button
              type="button"
              className={`sidebar__category${isActive ? ' sidebar__category--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onSelectCategory(category)}
              key={category}
            >
              <span className="sidebar__category-icon">
                {categoryIcons[category]}
              </span>
              <span className="sidebar__category-name">{category}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
