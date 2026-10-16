import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { Download, ShieldCheck, Activity, Search, History } from 'lucide-react';

export const AuditLogTable = () => {
  const { auditLogs } = useAuth();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    if (filterStatus !== 'All' && log.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.user.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.ip.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Success':
        return 'emerald';
      case 'Warning':
        return 'amber';
      case 'Danger':
        return 'rose';
      default:
        return 'slate';
    }
  };

  const exportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `authvault-audit-trail-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div>
      <div className="table-toolbar">
        <div className="toolbar-filters">
          <div className="status-filter-pills">
            {['All', 'Success', 'Warning', 'Danger'].map((status) => (
              <button
                key={status}
                type="button"
                className={`filter-pill ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '240px' }}>
            <input
              type="text"
              placeholder="Search audit trail..."
              className="form-input"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8125rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Button variant="secondary" icon={<Download size={16} />} onClick={exportLogs}>
          Export Audit Trail (.json)
        </Button>
      </div>

      <div className="table-card">
        {filteredLogs.length === 0 ? (
          <EmptyState
            icon={History}
            title="No Log Entries Recorded"
            description="No security events match your current filter or search criteria."
            actionLabel="Reset Log Filters"
            onAction={() => {
              setFilterStatus('All');
              setSearchQuery('');
            }}
          />
        ) : (
          <div className="table-responsive">
            <table className="data-table" aria-label="Security Audit Trail Logs">
              <thead>
                <tr>
                  <th scope="col">Event / Action</th>
                  <th scope="col">User Identity</th>
                  <th scope="col">Event Details</th>
                  <th scope="col">Origin & IP</th>
                  <th scope="col">Status</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                        <Activity size={15} style={{ color: 'var(--primary)' }} />
                        <span>{log.action}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.user}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        {log.details}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                          {log.ip}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {log.location}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(log.status)}>
                        {log.status}
                      </Badge>
                    </td>
                    <td style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {log.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
