# Task Logger

A modern **Task Logger Web Application** built with **React + TypeScript + Vite**. The app helps users organize study tasks, assignments, and personal activities with categories, priorities, due dates, filters, dashboard statistics, and persistent browser storage.

---

## Project Overview

**Task Logger** is designed to make task tracking simple and focused. Users can create tasks, organize them by category, track progress, and quickly identify work that is pending, completed, due today, or overdue.

The application uses the browser's **Local Storage API**, so tasks remain available after refreshing the page.

---

## Features

### Task Management

- Add new tasks
- Edit existing tasks
- Delete tasks with confirmation
- Mark tasks as completed or pending
- Add notes, priority, category, and due date details

### Categories

Tasks can be organized into:

- Study
- Assignments
- Personal
- Completed

The sidebar includes category icons for quicker scanning.

### Search, Filtering, and Sorting

Users can:

- Search tasks by title or category
- Filter by priority:
  - High
  - Medium
  - Low
- Filter by status:
  - Pending
  - Completed
  - Overdue
- Sort tasks by:
  - Newest
  - Due Date
  - Priority
- Clear active filters with one button

### Due Date Indicators

Task cards display readable due-date badges, including:

- Due today
- Due tomorrow
- Overdue
- No due date
- Formatted future dates

### Dashboard Summary

The dashboard includes:

- Total Tasks
- Completed Tasks
- Pending Tasks
- Due Today Tasks
- Overdue Tasks
- Progress indicator
- Summary card icons

### User Interface

- Sidebar navigation
- Dashboard layout
- Popup modal for task creation and editing
- Improved empty state with an Add Task action
- Responsive design for smaller screens

---

## Technologies Used

- **React**
- **TypeScript**
- **Vite**
- **CSS3**
- **Local Storage API**

---

## Project Structure

```txt
src/
|-- assets/
|   |-- logo.svg
|
|-- components/
|   |-- Sidebar.tsx
|   |-- SummaryCards.tsx
|   |-- TaskFilters.tsx
|   |-- TaskForm.tsx
|   |-- TaskItem.tsx
|   |-- TaskList.tsx
|
|-- types/
|   |-- Task.ts
|
|-- utils/
|   |-- localStorage.ts
|   |-- taskHelpers.ts
|
|-- App.tsx
|-- App.css
|-- index.css
|-- main.tsx
```

---

## Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/brijpatel88/Group2.git
```

2. Navigate to the project folder

```bash
cd Group2
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

5. Open the local URL shown in the terminal

```txt
http://localhost:5173
```

If port `5173` is already in use, Vite will automatically choose another port.

---

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Checks TypeScript and builds the app for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

---

## Team Members

This project was developed collaboratively by:

- Cemar Watin
- Chibuzor Awanye
- Richard Begin
- Isidore Mbargamanga
- Brijesh Patel

---

## Copyright

© 2026 Task Logger Project. All rights reserved.

This project was created for academic and educational purposes as part of a collaborative software development assignment.

Unauthorized commercial distribution, reproduction, or modification of this project without permission from the authors is prohibited.

---

## License

This project is intended for **educational use only**.
