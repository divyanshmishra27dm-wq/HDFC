import React from 'react';
import { User, Calendar, AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Edit3 } from 'lucide-react';

const COLUMNS = [
  { id: 'Not Started', label: 'Not Started', color: 'var(--status-notstarted-text)', bg: 'var(--status-notstarted-bg)' },
  { id: 'In Progress', label: 'In Progress', color: 'var(--status-inprogress-text)', bg: 'var(--status-inprogress-bg)' },
  { id: 'Ongoing', label: 'Ongoing', color: 'var(--status-ongoing-text)', bg: 'var(--status-ongoing-bg)' },
  { id: 'Completed', label: 'Completed', color: 'var(--status-completed-text)', bg: 'var(--status-completed-bg)' },
  { id: 'On Hold', label: 'On Hold', color: 'var(--status-onhold-text)', bg: 'var(--status-onhold-bg)' }
];

export default function KanbanBoard({ items, onSelectRow, onQuickStatusChange }) {
  const today = new Date().toISOString().split('T')[0];

  const getNextStatus = (current) => {
    switch (current) {
      case 'Not Started': return 'In Progress';
      case 'In Progress': return 'Completed';
      case 'Ongoing': return 'Completed';
      case 'On Hold': return 'In Progress';
      default: return null;
    }
  };

  return (
    <div className="kanban-container">
      {COLUMNS.map((col) => {
        const columnItems = items.filter(
          (i) => (i.status || 'Not Started').toLowerCase() === col.id.toLowerCase()
        );

        return (
          <div key={col.id} className="kanban-column">
            {/* Column Header */}
            <div className="kanban-column-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: col.color }} />
                <span className="kanban-column-title">{col.label}</span>
              </div>
              <span className="kanban-count-pill" style={{ background: col.bg, color: col.color }}>
                {columnItems.length}
              </span>
            </div>

            {/* Cards List */}
            <div className="kanban-cards-list">
              {columnItems.length === 0 ? (
                <div className="kanban-empty">No tasks in this stage</div>
              ) : (
                columnItems.map((item) => {
                  const isOverdue = item.end && item.end < today && item.status !== 'Completed';
                  const nextStatus = getNextStatus(item.status || 'Not Started');

                  return (
                    <div
                      key={item.ref}
                      className="kanban-card"
                      onClick={() => onSelectRow(item)}
                    >
                      {/* Card Top: Ref & Role */}
                      <div className="kanban-card-top">
                        <span className="ref-pill">{item.ref}</span>
                        <span className={`role-badge ${item.niit_role === 'Lead' ? 'role-lead' : 'role-support'}`}>
                          {item.niit_role || 'Support'}
                        </span>
                        {isOverdue && (
                          <span className="badge-overdue" style={{ marginLeft: 'auto' }}>
                            <AlertTriangle size={11} /> Overdue
                          </span>
                        )}
                      </div>

                      {/* Milestone Subtitle */}
                      <div className="kanban-card-milestone">
                        {item.milestone}
                      </div>

                      {/* Activity Title */}
                      <h4 className="kanban-card-title">
                        {item.activity}
                      </h4>

                      {/* Remarks Preview */}
                      {item.remarks && (
                        <p className="kanban-card-remarks">
                          "{item.remarks.length > 75 ? `${item.remarks.substring(0, 75)}...` : item.remarks}"
                        </p>
                      )}

                      {/* Card Footer: Owner & Dates */}
                      <div className="kanban-card-footer">
                        <div className="kanban-owner">
                          <User size={12} color="var(--text-subtle)" />
                          <span>{item.partner_owner || 'Unassigned'}</span>
                        </div>
                        <div className="kanban-date">
                          <Calendar size={12} color="var(--text-subtle)" />
                          <span>{item.end ? item.end.slice(5) : '-'}</span>
                        </div>
                      </div>

                      {/* Quick Move Action */}
                      {nextStatus && (
                        <div 
                          className="kanban-quick-advance"
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickStatusChange(item.ref, nextStatus);
                          }}
                        >
                          <span>Move to {nextStatus}</span>
                          <ChevronRight size={13} />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
