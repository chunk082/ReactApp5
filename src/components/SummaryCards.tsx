/* src/components/SummaryCards.tsx */
import './SummaryCards.css';

// Interface matching the props passed by the leader in App.tsx
interface SummaryCardsProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  dueTodayTasks: number;
}

const SummaryCards = ({
  totalTasks,
  completedTasks,
  pendingTasks,
  overdueTasks,
  dueTodayTasks,
}: SummaryCardsProps) => {
  // Calculate progress percentage
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format date for the dashboard
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="summary-container">
      {/* Dashboard Header with Progress Bar */}
      <div className="summary-header">
        <div className="header-info">
          <p className="hero-eyebrow">Dashboard Overview</p>
          <h2 className="current-date">{currentDate}</h2>
        </div>
        
        <div className="overall-progress">
          <div className="progress-text">
            <span>{percentage}% Completed</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-card-header">
            <span className="card-label">Total Tasks</span>
            <span className="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </span>
          </div>
          <h2 className="card-value">{totalTasks}</h2>
        </div>

        <div className="stat-card completed">
          <div className="stat-card-header">
            <span className="card-label">Completed</span>
            <span className="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M21 11.1V12a9 9 0 1 1-5.3-8.2" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </span>
          </div>
          <h2 className="card-value">{completedTasks}</h2>
        </div>

        <div className="stat-card pending">
          <div className="stat-card-header">
            <span className="card-label">Pending</span>
            <span className="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
          </div>
          <h2 className="card-value">{pendingTasks}</h2>
        </div>

        <div className="stat-card due-today">
          <div className="stat-card-header">
            <span className="card-label">Due Today</span>
            <span className="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 2v4M16 2v4M3 10h18" />
                <rect x="3" y="4" width="18" height="18" rx="3" />
              </svg>
            </span>
          </div>
          <h2 className="card-value">{dueTodayTasks}</h2>
        </div>

        <div className="stat-card overdue">
          <div className="stat-card-header">
            <span className="card-label">Overdue</span>
            <span className="stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
            </span>
          </div>
          <h2 className="card-value">{overdueTasks}</h2>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
