import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Shield,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Trash2,
  Edit2,
  FileText,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { MemberProfile } from '../types';
import { AddMemberModal } from './Modals/AddMemberModal';
import { AddClassModal } from './Modals/AddClassModal';
import { AddStaffModal } from './Modals/AddStaffModal';
import { AddContentModal } from './Modals/AddContentModal';

export const AdminPortal: React.FC = () => {
  const {
    currentUser,
    members,
    staff,
    classes,
    transactions,
    news,
    promos,
    deleteMember,
    updateMemberStatus,
    deleteClass
  } = useGym();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'members' | 'staff' | 'schedule' | 'finances' | 'broadcast'>('overview');
  const [memberSearch, setMemberSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | 'Standard' | 'Pro' | 'VIP Elite'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending Renewal' | 'Frozen' | 'Expired'>('All');

  // Modals state
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);

  // Filtered members list
  const filteredMembers = members.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesTier = tierFilter === 'All' || m.tier === tierFilter;
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Executive Welcome Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-gray-900 to-rose-950/30 border border-red-800/40 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-950 text-red-400 border border-red-800/60 shadow-xs">
              Executive Level 3 Access
            </span>
            <span className="text-xs text-gray-400">
              Administrator: <strong className="text-white">{currentUser?.name || 'Sarah Chen'}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Aspire Gym Administration</h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Complete facility governance: member accounts, trainer directory, master schedules, and financial ledgers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="admin-add-member-cta"
            onClick={() => setIsAddMemberOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-950/50 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Register Member</span>
          </button>
          <button
            id="admin-broadcast-cta"
            onClick={() => setIsAddContentOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs sm:text-sm border border-gray-700 transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Publish Content</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Pills */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-3">
        <button
          id="admin-tab-overview"
          onClick={() => setActiveAdminTab('overview')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeAdminTab === 'overview'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Dashboard & KPIs</span>
        </button>

        <button
          id="admin-tab-members"
          onClick={() => setActiveAdminTab('members')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeAdminTab === 'members'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Member Accounts</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-950 text-red-300">
            {members.length}
          </span>
        </button>

        <button
          id="admin-tab-staff"
          onClick={() => setActiveAdminTab('staff')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeAdminTab === 'staff'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Staff & Coaches</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-950 text-red-300">
            {staff.length}
          </span>
        </button>

        <button
          id="admin-tab-schedule"
          onClick={() => setActiveAdminTab('schedule')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeAdminTab === 'schedule'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Master Timetable</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-950 text-red-300">
            {classes.length}
          </span>
        </button>

        <button
          id="admin-tab-finances"
          onClick={() => setActiveAdminTab('finances')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeAdminTab === 'finances'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Revenue & Billing</span>
        </button>

        <button
          id="admin-tab-broadcast"
          onClick={() => setActiveAdminTab('broadcast')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeAdminTab === 'broadcast'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Content Broadcast</span>
        </button>
      </div>

      {/* TAB 1: EXECUTIVE DASHBOARD & STATS OVERVIEW */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Members</span>
                <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-black text-white mt-2">{members.length + 1422}</p>
              <p className="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12% from last month
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Monthly Revenue</span>
                <div className="w-9 h-9 rounded-xl bg-green-600/20 text-green-400 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-black text-white mt-2">${(48250 + totalRevenue).toLocaleString()}</p>
              <p className="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +8.4% target pacing
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Coaching Roster</span>
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-black text-white mt-2">{staff.length} Coaches</p>
              <p className="text-xs text-purple-400 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All shifts filled today
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Class Occupancy</span>
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-black text-white mt-2">84.5%</p>
              <p className="text-xs text-blue-400 font-bold mt-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Peak: 05:30 PM & 07:00 AM
              </p>
            </div>
          </div>

          {/* Recent Operations Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Quick Member Registration Snapshot */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Recent Member Enrollments</h3>
                <button
                  onClick={() => setActiveAdminTab('members')}
                  className="text-xs font-bold text-red-400 hover:text-red-300"
                >
                  View All →
                </button>
              </div>

              <div className="divide-y divide-gray-800">
                {members.slice(0, 4).map(mem => (
                  <div key={mem.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-7 h-7 rounded-lg ${mem.avatarBg} text-white font-black flex items-center justify-center text-[10px]`}>
                        {mem.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-white">{mem.name}</span>
                        <p className="text-[11px] text-gray-400">{mem.memberCode} • Joined {mem.joinDate}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-950 text-green-400 border border-green-800/60">
                      {mem.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Financial Charges */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Latest Dues & Pro-Shop Sales</h3>
                <button
                  onClick={() => setActiveAdminTab('finances')}
                  className="text-xs font-bold text-red-400 hover:text-red-300"
                >
                  Full Ledger →
                </button>
              </div>

              <div className="divide-y divide-gray-800">
                {transactions.slice(0, 4).map(tx => (
                  <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{tx.item}</span>
                      <p className="text-[11px] text-gray-400">{tx.memberName} • {tx.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400">+${tx.amount.toFixed(2)}</span>
                      <span className="text-[10px] text-gray-400 block">{tx.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: MEMBER ACCOUNTS MANAGEMENT (CRUD) */}
      {activeAdminTab === 'members' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white">Membership Directory & Controls</h3>
              <p className="text-xs text-gray-400">Search profiles, modify active status, or register new athletes</p>
            </div>
            <button
              onClick={() => setIsAddMemberOpen(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Register Member</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search member name, ID code, or email..."
                value={memberSearch}
                onChange={e => setMemberSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={tierFilter}
                onChange={e => setTierFilter(e.target.value as unknown as typeof tierFilter)}
                className="bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="All">All Tiers</option>
                <option value="Standard">Standard ($69)</option>
                <option value="Pro">Pro ($99)</option>
                <option value="VIP Elite">VIP Elite ($149)</option>
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as unknown as typeof statusFilter)}
                className="bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending Renewal">Pending Renewal</option>
                <option value="Frozen">Frozen</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto border border-gray-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-950 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-800">
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">ID Code</th>
                  <th className="py-3 px-4">Plan Tier</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Expiry Date</th>
                  <th className="py-3 px-4">Total Visits</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-gray-800/40 transition">
                    <td className="py-3 px-4 font-bold text-white flex items-center space-x-2.5">
                      <div className={`w-7 h-7 rounded-lg ${m.avatarBg} text-white font-black flex items-center justify-center text-[10px]`}>
                        {m.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span>{m.name}</span>
                        <p className="text-[10px] text-gray-400 font-normal">{m.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-300 font-bold">{m.memberCode}</td>
                    <td className="py-3 px-4 text-gray-300">{m.tier}</td>
                    <td className="py-3 px-4">
                      <select
                        value={m.status}
                        onChange={e => updateMemberStatus(m.id, e.target.value as MemberProfile['status'])}
                        className={`text-[11px] font-bold rounded-md px-2 py-0.5 border bg-transparent focus:outline-none ${
                          m.status === 'Active'
                            ? 'text-green-400 border-green-800 bg-green-950/40'
                            : m.status === 'Pending Renewal'
                            ? 'text-yellow-400 border-yellow-800 bg-yellow-950/40'
                            : m.status === 'Frozen'
                            ? 'text-cyan-400 border-cyan-800 bg-cyan-950/40'
                            : 'text-red-400 border-red-800 bg-red-950/40'
                        }`}
                      >
                        <option value="Active" className="bg-gray-900 text-green-400">Active</option>
                        <option value="Pending Renewal" className="bg-gray-900 text-yellow-400">Pending Renewal</option>
                        <option value="Frozen" className="bg-gray-900 text-cyan-400">Frozen</option>
                        <option value="Expired" className="bg-gray-900 text-red-400">Expired</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{m.expiryDate}</td>
                    <td className="py-3 px-4 text-gray-300 font-bold">{m.totalCheckIns} check-ins</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteMember(m.id)}
                        className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-800 transition"
                        title="Delete Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: STAFF & TRAINER MANAGEMENT */}
      {activeAdminTab === 'staff' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Coaching Staff & Floor Supervisors</h3>
              <p className="text-xs text-gray-400">Manage trainer contracts, scheduled shifts, and specialty focus</p>
            </div>
            <button
              onClick={() => setIsAddStaffOpen(true)}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Staff</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {staff.map(s => (
              <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-11 h-11 rounded-xl ${s.avatarBg} text-white font-black flex items-center justify-center text-sm shadow-md`}>
                      {s.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{s.name}</h4>
                      <span className="text-xs text-red-400 font-semibold">{s.role}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    s.status === 'On Duty'
                      ? 'bg-green-950 text-green-400 border border-green-800/60'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {s.status}
                  </span>
                </div>

                <div className="p-3 bg-gray-950 rounded-xl border border-gray-800/60 text-xs space-y-1 text-gray-300">
                  <div>Specialty: <strong className="text-white">{s.specialty}</strong></div>
                  <div>Shift: <span className="text-gray-400">{s.shifts}</span></div>
                  <div>Contact: <span className="text-gray-400">{s.email} • {s.phone}</span></div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-800">
                  <span className="text-gray-400">Active Clients: <strong className="text-white">{s.activeClients}</strong></span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    ★ {s.rating} Rating
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MASTER CLASS TIMETABLE */}
      {activeAdminTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Master Fitness Schedule</h3>
              <p className="text-xs text-gray-400">Configure weekly class catalog, room capacities, and instructors</p>
            </div>
            <button
              onClick={() => setIsAddClassOpen(true)}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Class</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map(cls => (
              <div key={cls.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-950 text-red-400 border border-red-800/60">
                      {cls.category}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">{cls.day}</span>
                  </div>

                  <h4 className="font-bold text-base text-white">{cls.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{cls.time} ({cls.durationMinutes}m)</p>
                  <p className="text-xs text-gray-400 mt-0.5">Room: {cls.room} • Coach: {cls.instructor}</p>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-300">
                    {cls.enrolledMemberIds.length} / {cls.capacity} Enrolled
                  </span>
                  <button
                    onClick={() => deleteClass(cls.id)}
                    className="text-gray-500 hover:text-red-400 p-1 rounded-lg hover:bg-gray-800 transition"
                    title="Remove Class"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FINANCIALS & REVENUE LEDGER */}
      {activeAdminTab === 'finances' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Financial Transactions & Membership Billing</h3>
              <p className="text-xs text-gray-400">Audited transaction records, recurring dues, and pro-shop receipts</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Audited Today</span>
              <span className="text-lg font-black text-emerald-400">
                ${transactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden">
            {transactions.map(tx => (
              <div key={tx.id} className="p-3.5 bg-gray-950 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{tx.item}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-gray-800 text-gray-300">
                      {tx.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Charged to: <strong className="text-gray-300">{tx.memberName}</strong> • {tx.date}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-black text-emerald-400 text-sm sm:text-base">
                    +${tx.amount.toFixed(2)}
                  </span>
                  <span className="block text-[10px] text-green-400 font-bold">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: BROADCAST COMMUNITY CONTENT */}
      {activeAdminTab === 'broadcast' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Community News & Promotions Publisher</h3>
              <p className="text-xs text-gray-400">Publish content that appears instantly on the member home screen</p>
            </div>
            <button
              onClick={() => setIsAddContentOpen(true)}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Content</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Live News */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-base font-bold text-white border-b border-gray-800 pb-2">
                Active Community News Posts ({news.length})
              </h4>
              <div className="space-y-2.5">
                {news.map(n => (
                  <div key={n.id} className="p-3 bg-gray-950 border border-gray-800/80 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{n.title}</span>
                      <span className="text-[10px] text-red-400 font-bold">{n.category}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{n.snippet}</p>
                    <span className="text-[10px] text-gray-400 block pt-1">{n.date} • {n.likes} member likes</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Promos */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-base font-bold text-white border-b border-gray-800 pb-2">
                Active Promotional Offers ({promos.length})
              </h4>
              <div className="space-y-2.5">
                {promos.map(p => (
                  <div key={p.id} className="p-3 bg-gray-950 border border-gray-800/80 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{p.title}</span>
                      <span className="font-mono text-red-400 font-bold">{p.code}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{p.description}</p>
                    <span className="text-[10px] text-emerald-400 font-semibold block pt-1">{p.discount} • {p.expiresIn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
      />

      <AddClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
      />

      <AddStaffModal
        isOpen={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
      />

      <AddContentModal
        isOpen={isAddContentOpen}
        onClose={() => setIsAddContentOpen(false)}
      />

    </div>
  );
};
