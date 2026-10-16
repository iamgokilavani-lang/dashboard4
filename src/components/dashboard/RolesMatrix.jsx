import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { AVAILABLE_ROLES, PERMISSION_DEFINITIONS } from '../../data/mockData';
import { Shield, Check, Minus, Users } from 'lucide-react';

export const RolesMatrix = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Roles Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {AVAILABLE_ROLES.map((role) => (
          <Card key={role.name} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={18} style={{ color: 'var(--primary)' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {role.name}
                </h4>
              </div>
              <Badge variant={role.color}>
                {role.usersCount} Assigned
              </Badge>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem', minHeight: '40px' }}>
              {role.description}
            </p>

            <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Included Scopes:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {role.permissions.map((p) => (
                  <span
                    key={p}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      background: 'var(--bg-surface-elevated)',
                      padding: '0.2rem 0.45rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Permissions Matrix Table */}
      <Card
        title="Role-Based Access Control (RBAC) Permissions Matrix"
        subtitle="Global mapping of scoped capabilities across organizational tiers"
      >
        <div className="table-responsive" style={{ marginTop: '1rem' }}>
          <table className="data-table" aria-label="RBAC Permissions Matrix">
            <thead>
              <tr>
                <th scope="col">Capability / Permission</th>
                <th scope="col">Category</th>
                {AVAILABLE_ROLES.map((r) => (
                  <th key={r.name} scope="col" style={{ textAlign: 'center' }}>
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSION_DEFINITIONS.map((perm) => (
                <tr key={perm.key}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}>{perm.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {perm.key}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Badge variant="slate" dot={false}>
                      {perm.category}
                    </Badge>
                  </td>
                  {AVAILABLE_ROLES.map((role) => {
                    const hasPerm = role.permissions.includes(perm.key);
                    return (
                      <td key={role.name} style={{ textAlign: 'center' }}>
                        {hasPerm ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: 'var(--success-light)',
                              color: 'var(--success)'
                            }}
                          >
                            <Check size={14} />
                          </span>
                        ) : (
                          <span style={{ color: 'var(--border-strong)' }}>
                            <Minus size={14} />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
