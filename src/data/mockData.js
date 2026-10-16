// Initial mock database for Authentication & User Access Management

export const DEFAULT_USERS = [
  {
    id: 'usr-1',
    name: 'Gokilavani',
    username: 'gokilavani',
    email: 'gokilavani@authvault.io',
    password: 'Password@123',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Security & Infrastructure',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    bio: 'Lead Security Architect managing identity, zero-trust policies, and multi-tenant access control.',
    status: 'Active',
    twoFactorEnabled: true,
    joinedDate: '2024-01-15',
    lastLogin: 'Just now',
    permissions: ['users:read', 'users:write', 'roles:manage', 'audit:view', 'security:admin'],
    accessLevel: 'Full Admin'
  },
  {
    id: 'usr-2',
    name: 'Priya Sharma',
    username: 'priya.sharma',
    email: 'priya.s@authvault.io',
    password: 'Password@123',
    role: 'Security Officer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Cyber Compliance',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    bio: 'Specialist in SOC2, ISO27001, and automated identity verification pipelines.',
    status: 'Active',
    twoFactorEnabled: true,
    joinedDate: '2024-02-10',
    lastLogin: '10 mins ago',
    permissions: ['users:read', 'audit:view', 'security:admin'],
    accessLevel: 'Security Admin'
  },
  {
    id: 'usr-3',
    name: 'Arjun Verma',
    username: 'arjun.verma',
    email: 'arjun.v@authvault.io',
    password: 'Password@123',
    role: 'Engineering Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Core Platform',
    phone: '+91 98765 43211',
    location: 'Hyderabad, India',
    bio: 'Frontend & backend infrastructure architect.',
    status: 'Active',
    twoFactorEnabled: false,
    joinedDate: '2024-03-01',
    lastLogin: '1 hour ago',
    permissions: ['users:read', 'users:write'],
    accessLevel: 'Write'
  },
  {
    id: 'usr-4',
    name: 'Ananya Iyer',
    username: 'ananya.iyer',
    email: 'ananya.i@authvault.io',
    password: 'Password@123',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    department: 'Growth & Strategy',
    phone: '+91 98765 43212',
    location: 'Chennai, India',
    bio: 'Driving enterprise authentication analytics and onboarding experiences.',
    status: 'Active',
    twoFactorEnabled: true,
    joinedDate: '2024-04-18',
    lastLogin: '3 hours ago',
    permissions: ['users:read', 'audit:view'],
    accessLevel: 'Read Only'
  },
  {
    id: 'usr-5',
    name: 'Karthik Sundaram',
    username: 'karthik.s',
    email: 'karthik.s@authvault.io',
    password: 'Password@123',
    role: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Cloud Ops',
    phone: '+91 98765 43213',
    location: 'Pune, India',
    bio: 'Kubernetes cluster security and gateway egress monitoring.',
    status: 'Suspended',
    twoFactorEnabled: false,
    joinedDate: '2024-05-12',
    lastLogin: '4 days ago',
    permissions: ['users:read'],
    accessLevel: 'Suspended'
  },
  {
    id: 'usr-6',
    name: 'Deepa Patel',
    username: 'deepa.patel',
    email: 'deepa.p@authvault.io',
    password: 'Password@123',
    role: 'QA Specialist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    department: 'Product Quality',
    phone: '+91 98765 43214',
    location: 'Ahmedabad, India',
    bio: 'Automated end-to-end authentication and regression testing suites.',
    status: 'Inactive',
    twoFactorEnabled: false,
    joinedDate: '2024-06-20',
    lastLogin: '2 weeks ago',
    permissions: ['users:read'],
    accessLevel: 'Read Only'
  },
  {
    id: 'usr-7',
    name: 'Rajesh Nambiar',
    username: 'rajesh.nambiar',
    email: 'rajesh.n@authvault.io',
    password: 'Password@123',
    role: 'Compliance Auditor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    department: 'External Audit',
    phone: '+91 98765 43215',
    location: 'Kochi, India',
    bio: 'Third-party cybersecurity reviewer auditing RBAC and least privilege enforcement.',
    status: 'Active',
    twoFactorEnabled: true,
    joinedDate: '2024-07-05',
    lastLogin: 'Yesterday',
    permissions: ['audit:view'],
    accessLevel: 'Read Only'
  }
];

export const DEFAULT_AUDIT_LOGS = [
  {
    id: 'log-1',
    user: 'Gokilavani',
    action: 'User Login',
    details: 'Logged in via OAuth 2.0 / Password with 2FA verification',
    ip: '192.168.1.104',
    location: 'Bengaluru, India',
    status: 'Success',
    timestamp: '2 minutes ago'
  },
  {
    id: 'log-2',
    user: 'Gokilavani',
    action: 'Role Modified',
    details: 'Updated Arjun Verma role permissions to include [users:write]',
    ip: '192.168.1.104',
    location: 'Bengaluru, India',
    status: 'Success',
    timestamp: '28 minutes ago'
  },
  {
    id: 'log-3',
    user: 'Priya Sharma',
    action: 'Session Revoked',
    details: 'Revoked expired API token session for Karthik Sundaram',
    ip: '172.56.21.99',
    location: 'Mumbai, India',
    status: 'Warning',
    timestamp: '2 hours ago'
  },
  {
    id: 'log-4',
    user: 'System Bot',
    action: 'Password Policy Audit',
    details: 'Verified compliance for 14 active user accounts',
    ip: '10.0.4.1',
    location: 'Internal AWS ap-south-1',
    status: 'Success',
    timestamp: '5 hours ago'
  },
  {
    id: 'log-5',
    user: 'Karthik Sundaram',
    action: 'Failed Login Attempt',
    details: 'Invalid password supplied 3 consecutive times',
    ip: '45.33.32.156',
    location: 'Pune, India',
    status: 'Danger',
    timestamp: '1 day ago'
  },
  {
    id: 'log-6',
    user: 'Ananya Iyer',
    action: 'Profile Updated',
    details: 'Updated contact phone number and department info',
    ip: '108.212.19.4',
    location: 'Chennai, India',
    status: 'Success',
    timestamp: '2 days ago'
  }
];

export const AVAILABLE_ROLES = [
  {
    name: 'Super Admin',
    description: 'Full system access, credential management, and security governance.',
    color: 'purple',
    usersCount: 1,
    permissions: ['users:read', 'users:write', 'users:delete', 'roles:manage', 'audit:view', 'security:admin', 'api:keys']
  },
  {
    name: 'Security Officer',
    description: 'Security policies, compliance audits, and access revocation.',
    color: 'blue',
    usersCount: 1,
    permissions: ['users:read', 'roles:manage', 'audit:view', 'security:admin']
  },
  {
    name: 'Engineering Lead',
    description: 'Team management, developer access, and API credentials.',
    color: 'emerald',
    usersCount: 1,
    permissions: ['users:read', 'users:write', 'audit:view']
  },
  {
    name: 'Product Manager',
    description: 'Read-only access to user directories and analytics.',
    color: 'amber',
    usersCount: 1,
    permissions: ['users:read', 'audit:view']
  },
  {
    name: 'Compliance Auditor',
    description: 'Access to security logs, activity tracking, and compliance exports.',
    color: 'indigo',
    usersCount: 1,
    permissions: ['audit:view']
  },
  {
    name: 'Team Member',
    description: 'Standard access to personal dashboard and self-service profile.',
    color: 'slate',
    usersCount: 2,
    permissions: ['users:read']
  }
];

export const PERMISSION_DEFINITIONS = [
  { key: 'users:read', label: 'View User Directory', category: 'Directory' },
  { key: 'users:write', label: 'Create & Edit Users', category: 'Directory' },
  { key: 'users:delete', label: 'Delete & Deactivate Users', category: 'Directory' },
  { key: 'roles:manage', label: 'Manage Roles & Privileges', category: 'Access Control' },
  { key: 'security:admin', label: 'Security & 2FA Enforcement', category: 'Access Control' },
  { key: 'audit:view', label: 'View Real-Time Audit Logs', category: 'Compliance' },
  { key: 'api:keys', label: 'Manage API Tokens & Keys', category: 'Developer' }
];

export const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
];
