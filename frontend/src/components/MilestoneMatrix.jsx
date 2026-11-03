import React from 'react';
import { CheckCircle, AlertTriangle, Clock, Layers, ArrowUpRight } from 'lucide-react';

export default function MilestoneMatrix({ items, onSelectMilestone }) {
  // Aggregate items by milestone
  const milestonesMap = {};

  items.forEach((item) => {
    const m = item.milestone || 'General';
    if (!milestonesMap[m]) {
      milestonesMap[m] = {
        name: m,
        total: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        onHold: 0,
        leadCount: 0,
        supportCount: 0
      };
    }
    milestonesMap[m].total++;
    const s = item.status || 'Not Started';
    if (s === 'Completed') milestonesMap[m].completed++;
    else if (s === 'In Progress' || s === 'Ongoing') milestonesMap[m].inProgress++;
    else if (s === 'On Hold') milestonesMap[m].onHold++;
    else milestonesMap[m].notStarted++;

    if (item.niit_role === 'Lead') milestonesMap[m].leadCount++;
    else milestonesMap[m].supportCount++;
  });

  const milestoneList = Object.values(milestonesMap);

  return (
    <div className="matrix-wrapper">
      <div className="matrix-grid">
        {milestoneList.map((m) => {
          const pct = m.total > 0 ? Math.round((m.completed / m.total) * 100) : 0;
          let healthColor = 'var(--status-inprogress-text)';
          if (pct === 100) healthColor = 'var(--status-completed-text)';
          else if (m.onHold > 0) healthColor = 'var(--status-onhold-text)';

          return (
            <div
              key={m.name}
              className="matrix-card"
              onClick={() => onSelectMilestone(m.name)}
            >
              <div className="matrix-card-header">
                <span className="matrix-milestone-title">{m.name}</span>
                <span className="matrix-pct" style={{ color: healthColor }}>
                  {pct}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="progress-track" style={{ height: '8px', margin: '10px 0' }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${pct}%`,
                    background: pct === 100 ? 'var(--status-completed-text)' : 'var(--primary)'
                  }}
                />
              </div>

              {/* Breakdown stats */}
              <div className="matrix-stats-row">
                <div className="matrix-stat-item">
                  <span className="matrix-stat-val" style={{ color: 'var(--status-completed-text)' }}>{m.completed}</span>
                  <span className="matrix-stat-lbl">Done</span>
                </div>
                <div className="matrix-stat-item">
                  <span className="matrix-stat-val" style={{ color: 'var(--status-inprogress-text)' }}>{m.inProgress}</span>
                  <span className="matrix-stat-lbl">Active</span>
                </div>
                <div className="matrix-stat-item">
                  <span className="matrix-stat-val" style={{ color: 'var(--text-muted)' }}>{m.notStarted}</span>
                  <span className="matrix-stat-lbl">Pending</span>
                </div>
                {m.onHold > 0 && (
                  <div className="matrix-stat-item">
                    <span className="matrix-stat-val" style={{ color: 'var(--status-onhold-text)' }}>{m.onHold}</span>
                    <span className="matrix-stat-lbl">Hold</span>
                  </div>
                )}
                <div className="matrix-stat-item" style={{ marginLeft: 'auto' }}>
                  <span className="matrix-stat-val">{m.total}</span>
                  <span className="matrix-stat-lbl">Total</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
