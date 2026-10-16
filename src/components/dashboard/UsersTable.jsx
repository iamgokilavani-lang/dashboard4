import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { UserModal } from './UserModal';
import {
  UserPlus,
  Edit2,
  Trash2,
  ShieldAlert,
  Power,
  Search,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Filter
} from 'lucide-react';

export const UsersTable = ({ searchQuery = '', onSearchChange }) => {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    revokeSession,
    currentUser
  } = useAuth();

  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [modalState, setModalState] = useState({ isOpen: false, user: null });

  // Filtering
  const filteredUsers = users.filter((u) => {
    // Status filter
    if (statusFilter !== 'All' && u.status !== statusFilter) return false;
    // Role filter
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      const matchRole = u.role.toLowerCase().includes(q);
      const matchDept = (u.department || '').toLowerCase().includes(q);
      const matchUsername = (u.username || '').toLowerCase().includes(q);
      return matchName || matchEmail || matchRole || matchDept || matchUsername;
    }
    return true;
  });

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'Super Admin':
        return 'purple';
      case 'Security Officer':
        return 'blue';
      case 'Engineering Lead':
        return 'emerald';
      case 'Product Manager':
        return 'amber';
      case 'Compliance Auditor':
        return 'cyan';
      default:
        return 'slate';
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Active':
        return 'emerald';
      case 'Suspended':
        return 'rose';
      default:
        return 'slate';
    }
  };

  const handleOpenAdd = () => {
    setModalState({ isOpen: true, user: null });
  };

  const handleOpenEdit = (user) => {
    setModalState({ isOpen: true, user });
  };

  const handleModalSubmit = async (formData) => {
    if (modalState.user) {
      updateUser(modalState.user.id, formData);
    } else {
      addUser(formData);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="table-toolbar">
        <div className="toolbar-filters">
          {/* Status Pills */}
          <div className="status-filter-pills" role="tablist" aria-label="Filter users by status">
            {['All', 'Active', 'Suspended', 'Inactive'].map((status) => (
              <button
                key={status}
                type="button"
                className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Role Filter Dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              className="form-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                fontSize: '0.8125rem',
                padding: '0.45rem 2rem 0.45rem 0.85rem',
                minWidth: '150px'
              }}
              aria-label="Filter by role"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Security Officer">Security Officer</option>
              <option value="Engineering Lead">Engineering Lead</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Compliance Auditor">Compliance Auditor</option>
              <option value="Team Member">Team Member</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <Button variant="primary" icon={<UserPlus size={16} />} onClick={handleOpenAdd}>
          Add New User
        </Button>
      </div>

      {/* Table Card */}
      <div className="table-card">
        {filteredUsers.length === 0 ? (
          <EmptyState
            title="No Users Match Criteria"
            description="No user accounts match your active search terms or status filters."
            actionLabel="Reset All Filters"
            onAction={() => {
              setStatusFilter('All');
              setRoleFilter('All');
              if (onSearchChange) onSearchChange('');
            }}
          />
        ) : (
          <div className="table-responsive">
            <table className="data-table" aria-label="User Access Management Directory">
              <thead>
                <tr>
                  <th scope="col">User Identity</th>
                  <th scope="col">Contact & Dept</th>
                  <th scope="col">Role & Access</th>
                  <th scope="col">Account Status</th>
                  <th scope="col">Security / 2FA</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const isCurrent = currentUser && currentUser.id === user.id;

                  return (
                    <tr key={user.id}>
                      {/* Identity */}
                      <td>
                        <div className="user-cell">
                          <Avatar
                            src={user.avatar}
                            name={user.name}
                            size="md"
                            status={user.status}
                          />
                          <div className="user-cell-meta">
                            <span className="user-cell-name">
                              {user.name} {isCurrent && <span style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>(You)</span>}
                            </span>
                            <span className="user-cell-username">@{user.username}</span>
                          </div>
                        </div>
                      </td>

                      {/* Contact & Dept */}
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.8125rem' }}>{user.email}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {user.department || 'Operations'}
                          </span>
                        </div>
                      </td>

                      {/* Role & Access */}
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <div>
                            <Badge variant={getRoleBadgeVariant(user.role)}>
                              {user.role}
                            </Badge>
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {user.permissions?.length || 1} Scoped Permissions
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Badge variant={getStatusBadgeVariant(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </td>

                      {/* 2FA & Last Login */}
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
                            {user.twoFactorEnabled ? (
                              <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <CheckCircle size={13} /> 2FA Enabled
                              </span>
                            ) : (
                              <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <XCircle size={13} /> 2FA Disabled
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            Active: {user.lastLogin || 'Recently'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                          {/* Edit User Button */}
                          <button
                            type="button"
                            className="btn-icon btn-ghost"
                            title="Edit Role & Permissions"
                            onClick={() => handleOpenEdit(user)}
                            aria-label={`Edit ${user.name}`}
                          >
                            <Edit2 size={16} />
                          </button>

                          {/* Toggle Status (Active / Suspended) */}
                          <button
                            type="button"
                            className="btn-icon btn-ghost"
                            title={user.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
                            onClick={() => toggleUserStatus(user.id)}
                            style={{
                              color: user.status === 'Active' ? 'var(--warning)' : 'var(--success)'
                            }}
                            aria-label={`Toggle status for ${user.name}`}
                          >
                            <Power size={16} />
                          </button>

                          {/* Revoke Session */}
                          <button
                            type="button"
                            className="btn-icon btn-ghost"
                            title="Force Revoke Sessions"
                            onClick={() => revokeSession(user.id)}
                            style={{ color: 'var(--text-muted)' }}
                            aria-label={`Revoke sessions for ${user.name}`}
                          >
                            <ShieldAlert size={16} />
                          </button>

                          {/* Delete User */}
                          <button
                            type="button"
                            className="btn-icon btn-ghost"
                            title="Delete User"
                            onClick={() => deleteUser(user.id)}
                            disabled={isCurrent}
                            style={{
                              color: isCurrent ? 'var(--border-strong)' : 'var(--danger)',
                              cursor: isCurrent ? 'not-allowed' : 'pointer'
                            }}
                            aria-label={`Delete ${user.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Create / Edit Modal */}
      <UserModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, user: null })}
        onSubmit={handleModalSubmit}
        user={modalState.user}
      />
    </div>
  );
};
