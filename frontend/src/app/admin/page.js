'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  UserCheck, 
  UserX, 
  Activity, 
  Settings, 
  Search, 
  Filter, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Tag, 
  Compass, 
  ShoppingBag,
  Plus,
  Lock,
  ChevronDown,
  Check,
  X
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'system'
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Data states
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);

  // Filters
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: 'Password@123',
    role: 'devotee',
    phone: '+91 '
  });

  const showToast = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  // Init Auth
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem('astada_token');
        const storedRole = localStorage.getItem('astada_role');

        if (storedToken && storedRole === 'admin') {
          setToken(storedToken);
          setUser({ name: 'Sri Astadasapeetam Admin', role: 'admin', email: 'admin@astadasapeetam.com' });
          await fetchAdminData(storedToken);
        } else {
          // Auto login as admin for frictionless testing
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@astadasapeetam.com', password: 'Admin@12345' })
          });
          const data = await res.json();
          if (data.token) {
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('astada_token', data.token);
            localStorage.setItem('astada_role', data.user.role);
            await fetchAdminData(data.token);
          }
        }
      } catch (err) {
        console.error('Admin init error:', err);
        showToast('error', 'Cannot connect to backend server on port 5000');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const fetchAdminData = async (authToken) => {
    const headers = { Authorization: `Bearer ${authToken}` };
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/users`, { headers }),
        fetch(`${API_BASE}/admin/stats`, { headers })
      ]);

      const [usersData, statsData] = await Promise.all([
        usersRes.json(),
        statsRes.json()
      ]);

      if (usersData.success) setUsers(usersData.data);
      if (statsData.success) setStats(statsData.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  // Change user role
  const handleRoleChange = async (userId, newRole) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.map(u => u._id === userId ? data.data : u));
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to update user role');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle user active status
  const handleToggleStatus = async (userId) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.map(u => u._id === userId ? data.data : u));
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to toggle user status');
    } finally {
      setActionLoading(false);
    }
  };

  // Create new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (data.success) {
        setIsAddUserOpen(false);
        setNewUser({ name: '', email: '', password: 'Password@123', role: 'devotee', phone: '+91 ' });
        await fetchAdminData(token);
        showToast('success', `User '${data.user.name}' registered successfully!`);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to register user');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered users
  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesQuery = searchQuery === '' ||
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#faf8f4] text-slate-800 font-sans pb-20">
      {/* Top Header */}
      <div className="bg-[#2a080d] text-white border-b border-amber-900/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">👑</span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-wide">Super Admin Command Center</h1>
                <span className="text-[10px] bg-amber-400 text-stone-900 font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                  Role: Super Admin
                </span>
              </div>
              <p className="text-xs text-amber-200/80">
                Full System Control, RBAC Role Management, Audit Analytics & Staff Oversight
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-stone-900/60 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">{user?.name || 'Super Admin'}</span>
              <span className="text-amber-300">({user?.email || 'admin@astadasapeetam.com'})</span>
            </div>

            <Link
              href="/"
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-3 py-1.5 rounded-lg flex items-center space-x-1 transition"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="max-w-7xl mx-auto px-4 flex space-x-2 border-t border-amber-900/40 pt-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold text-sm rounded-t-lg transition border-b-2 ${
              activeTab === 'users'
                ? 'bg-[#faf8f4] text-[#701a28] border-amber-600 shadow'
                : 'text-amber-100 hover:text-white border-transparent hover:bg-stone-800/40'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users & Role Assignment</span>
            <span className="bg-amber-100 text-[#701a28] text-xs px-2 py-0.2 rounded-full font-bold ml-1">
              {users.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold text-sm rounded-t-lg transition border-b-2 ${
              activeTab === 'system'
                ? 'bg-[#faf8f4] text-[#701a28] border-amber-600 shadow'
                : 'text-amber-100 hover:text-white border-transparent hover:bg-stone-800/40'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Platform Overview & Audit</span>
          </button>
        </div>
      </div>

      {/* Toast */}
      {statusMessage.text && (
        <div className="max-w-md mx-auto mt-4 px-4">
          <div className={`p-3 rounded-xl shadow-lg border flex items-center space-x-3 text-sm ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-medium">Total Registered Users</span>
            <div className="text-2xl font-black text-[#701a28]">{stats?.users?.total || users.length}</div>
            <span className="text-[11px] text-slate-500">Across All 4 System Roles</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-medium">Verified Astrologers</span>
            <div className="text-2xl font-black text-purple-800">{stats?.users?.astrologers || 1}</div>
            <span className="text-[11px] text-purple-600 font-semibold">Jyotish Acharyas</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-medium">Digital Marketing Leads</span>
            <div className="text-2xl font-black text-amber-700">{stats?.users?.digitalMarketing || 1}</div>
            <span className="text-[11px] text-amber-600 font-semibold">Campaigns & Content</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-medium">Devotee Consultations</span>
            <div className="text-2xl font-black text-emerald-700">{stats?.astrology?.totalConsultations || 3}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {stats?.astrology?.pendingConsultations || 1} Pending Review
            </span>
          </div>
        </div>

        {/* Quick Portal Switcher Banner */}
        <div className="bg-gradient-to-r from-stone-900 to-[#4a0e17] text-white p-5 rounded-2xl shadow flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-amber-300 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Direct Fast Jump to Role Portals</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              As Super Admin, you have master access to inspect all workspaces.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <Link
              href="/marketing"
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 transition shadow"
            >
              <span>📢 Digital Marketing Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/astrologer"
              className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 transition shadow"
            >
              <span>🔮 Astrologer Workspace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: USERS & ROLE ASSIGNMENT                            */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#701a28] flex items-center space-x-2">
                  <Users className="w-5 h-5 text-amber-600" />
                  <span>Platform Users & Role Management</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Assign system permissions, upgrade devotees to Staff, and activate or suspend accounts.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => fetchAdminData(token)}
                  className="bg-amber-50 hover:bg-amber-100 text-[#701a28] border border-amber-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={() => setIsAddUserOpen(true)}
                  className="bg-[#701a28] hover:bg-[#58131e] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add New User</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 flex-grow max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto text-xs">
                {[
                  { id: 'all', label: 'All Roles' },
                  { id: 'admin', label: '👑 Admin' },
                  { id: 'digital_marketing', label: '📢 Marketing' },
                  { id: 'astrologer', label: '🔮 Astrologer' },
                  { id: 'devotee', label: '🙏 Devotee' }
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setRoleFilter(role.id)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition ${
                      roleFilter === role.id
                        ? 'bg-[#701a28] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#2a080d] text-white uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">User / Name</th>
                    <th className="py-3 px-4">Contact Info</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Role Upgrade / Changer</th>
                    <th className="py-3 px-4">Account Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-amber-50/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[10px] text-slate-400">ID: {u._id}</div>
                      </td>

                      <td className="py-3 px-4 space-y-0.5">
                        <div className="text-slate-800">{u.email}</div>
                        <div className="text-[10px] text-slate-500">{u.phone || 'No phone'}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : u.role === 'digital_marketing'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : u.role === 'astrologer'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      {/* Instant Role Change Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={u.role}
                          disabled={actionLoading || u.email === 'admin@astadasapeetam.com'}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-amber-600 cursor-pointer"
                        >
                          <option value="admin">Super Admin</option>
                          <option value="digital_marketing">Digital Marketing</option>
                          <option value="astrologer">Astrologer</option>
                          <option value="devotee">Devotee</option>
                        </select>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {u.isActive ? 'ACTIVE' : 'SUSPENDED'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {u.email !== 'admin@astadasapeetam.com' && (
                          <button
                            onClick={() => handleToggleStatus(u._id)}
                            disabled={actionLoading}
                            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition ${
                              u.isActive
                                ? 'border-rose-300 text-rose-700 hover:bg-rose-50'
                                : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                            }`}
                          >
                            {u.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SYSTEM AUDIT & PLATFORM HEALTH                    */}
        {/* ========================================================= */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#701a28] flex items-center space-x-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <span>Sacred System Architecture & Audit</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800">Database Engine</div>
                  <div className="text-emerald-700 font-semibold flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>MongoDB 127.0.0.1:27017 / astadasapeetam</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Collections: Users, Products, SiteContents, Consultations, Campaigns.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800">Security & RBAC Enforcement</div>
                  <div className="text-emerald-700 font-semibold flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>JWT Bearer Auth + Multi-Role Middleware</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Strict 403 Forbidden protection preventing cross-role access.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800">Backend API Daemon</div>
                  <div className="text-slate-700 font-mono text-[11px]">
                    http://localhost:5000 (Express.js)
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800">Frontend Dev Server</div>
                  <div className="text-slate-700 font-mono text-[11px]">
                    http://localhost:3001 (Next.js 15 App Router)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
            <div className="bg-[#2a080d] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Register Staff / User</span>
              </h3>
              <button onClick={() => setIsAddUserOpen(false)} className="text-amber-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acharya Vidyasagar"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@astadasapeetam.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role *</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  >
                    <option value="devotee">Devotee</option>
                    <option value="digital_marketing">Digital Marketing</option>
                    <option value="astrologer">Astrologer</option>
                    <option value="admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-lg bg-[#701a28] hover:bg-[#58131e] text-white font-bold"
                >
                  {actionLoading ? 'Creating...' : 'Register User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
