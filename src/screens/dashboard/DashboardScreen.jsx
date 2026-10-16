import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { UsersTable } from '../../components/dashboard/UsersTable';
import { AuditLogTable } from '../../components/dashboard/AuditLogTable';
import { RolesMatrix } from '../../components/dashboard/RolesMatrix';
import {
  Users,
  ShieldCheck,
  KeyRound,
  Activity,
  UserCheck,
  ShieldAlert,
  SlidersHorizontal,
  Lock
} from 'lucide-react';

export const DashboardScreen = ({ searchQuery = '', onSearchChange }) => {
  const { users, auditLogs, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'audit' | 'roles'

  const activeUsersCount = users.filter((u) => u.status === 'Active').length;
  const privilegedCount = users.filter((u) =>
    ['Super Admin', 'Security Officer'].includes(u.role)
  ).length;

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Identity & Access Control Hub</h1>
          <p className="page-subtitle">
            Zero-Trust identity verification, role-based access management, and live audit telemetry.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="stats-grid">
        <StatCard
          label="Total Identities"
          value={users.length}
          change="+14% this month"
          changeType="positive"
          icon={Users}
          variant="primary"
        />

        <StatCard
          label="Active Sessions"
          value={activeUsersCount}
          change="Real-time verified"
          changeType="positive"
          icon={Activity}
          variant="success"
        />

        <StatCard
          label="Privileged Roles"
          value={privilegedCount}
          change="Strict MFA required"
          changeType="warning"
          icon={ShieldCheck}
          variant="cyan"
        />

        <StatCard
          label="Security Health Score"
          value="98%"
          change="SOC2 Type II Compliant"
          changeType="positive"
          icon={Lock}
          variant="primary"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'users'}
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <UserCheck size={18} />
          <span>User Directory & Access ({users.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'audit'}
          className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          <Activity size={18} />
          <span>Security Audit Trail ({auditLogs.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'roles'}
          className={`tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <SlidersHorizontal size={18} />
          <span>Roles & Permissions Matrix</span>
        </button>
      </div>

      {/* Dynamic Tab Views */}
      <div style={{ marginTop: '1.25rem' }}>
        {activeTab === 'users' && (
          <UsersTable searchQuery={searchQuery} onSearchChange={onSearchChange} />
        )}
        {activeTab === 'audit' && <AuditLogTable />}
        {activeTab === 'roles' && <RolesMatrix />}
      </div>
    </div>
  );
};
