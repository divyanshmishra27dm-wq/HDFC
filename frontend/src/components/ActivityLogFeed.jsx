import React, { useState } from 'react';
import { History, User, CheckCircle2, Clock, AlertCircle, ArrowRight, MessageSquare, PlusCircle } from 'lucide-react';

export default function ActivityLogFeed({ logs, onSelectRef }) {
  const [filterAuthor, setFilterAuthor] = useState('');

  const authors = Array.from(new Set(logs.map(l => l.author).filter(Boolean)));

  const filteredLogs = filterAuthor 
    ? logs.filter(l => l.author === filterAuthor)
    : logs;

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return '';
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const diffMins = Math.round((now - then) / 60000);

    if (diffMins < 2) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="activity-feed-wrapper">
      <div className="activity-feed-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Tracker Activity & Audit Trail</h3>
          <span className="kanban-count-pill" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            {filteredLogs.length} events
          </span>
        </div>

        {authors.length > 0 && (
          <select
            className="select-input"
            style={{ maxWidth: '200px' }}
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
          >
            <option value="">All Team Members</option>
            {authors.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        )}
      </div>

      <div className="feed-timeline">
        {filteredLogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No recent activity records found.
          </div>
        ) : (
          filteredLogs.map((log) => {
            let Icon = Clock;
            let iconColor = 'var(--status-inprogress-text)';
            let iconBg = 'var(--status-inprogress-bg)';

            if (log.action === 'completed') {
              Icon = CheckCircle2;
              iconColor = 'var(--status-completed-text)';
              iconBg = 'var(--status-completed-bg)';
            } else if (log.action === 'remark_added') {
              Icon = MessageSquare;
              iconColor = 'var(--status-ongoing-text)';
              iconBg = 'var(--status-ongoing-bg)';
            } else if (log.action === 'created') {
              Icon = PlusCircle;
              iconColor = 'var(--primary)';
              iconBg = 'var(--primary-light)';
            }

            return (
              <div 
                key={log.id} 
                className="feed-timeline-item"
                onClick={() => onSelectRef(log.ref)}
              >
                <div className="feed-icon-badge" style={{ background: iconBg, color: iconColor }}>
                  <Icon size={16} />
                </div>

                <div className="feed-content-card">
                  <div className="feed-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="ref-pill">{log.ref}</span>
                      <span className="feed-author-name">{log.author || 'Team Member'}</span>
                    </div>
                    <span className="feed-timestamp">{formatRelativeTime(log.timestamp)}</span>
                  </div>

                  <div className="feed-card-milestone">{log.milestone}</div>
                  <div className="feed-activity-title">{log.activity}</div>

                  <div className="feed-action-summary">
                    {log.field === 'status' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>Updated status:</span>
                        <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>{log.oldValue}</span>
                        <ArrowRight size={12} />
                        <span className={`status-badge status-${log.newValue.toLowerCase().replace(/\s+/g, '')}`}>
                          {log.newValue}
                        </span>
                      </div>
                    ) : log.field === 'remarks' ? (
                      <div>
                        <span style={{ fontWeight: 600 }}>Added remarks:</span> "{log.remarks}"
                      </div>
                    ) : (
                      <span>{log.action}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
