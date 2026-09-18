import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Shield,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wrench,
  Package,
  Calendar,
  Users,
  Plus,
  Minus,
  Check,
  XCircle
} from 'lucide-react';
import { EquipmentItem } from '../types';

export const ManagerPortal: React.FC = () => {
  const {
    currentUser,
    members,
    attendance,
    classes,
    equipment,
    inventory,
    checkInMember,
    updateEquipmentStatus,
    updateInventoryStock
  } = useGym();

  const [activeTab, setActiveTab] = useState<'checkin' | 'classes' | 'equipment' | 'inventory'>('checkin');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [checkInNotification, setCheckInNotification] = useState<{ message: string; success: boolean } | null>(null);

  // Manual Check-in handler
  const handleCheckIn = (memberId: string) => {
    const res = checkInMember(memberId);
    setCheckInNotification({ message: res.message, success: res.success });
    setTimeout(() => setCheckInNotification(null), 3500);
  };

  const filteredMembers = searchQuery.trim()
    ? members.filter(
        m =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : members;

  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const enrolledMembers = members.filter(m => currentClass?.enrolledMemberIds.includes(m.id));

  return (
    <div className="space-y-6 pb-16">
      
      {/* Toast */}
      {checkInNotification && (
        <div
          className={`fixed top-24 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl font-bold text-sm border flex items-center gap-2 animate-in slide-in-from-top duration-200 ${
            checkInNotification.success
              ? 'bg-blue-600 text-white border-blue-400'
              : 'bg-red-600 text-white border-red-400'
          }`}
        >
          {checkInNotification.success ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span>{checkInNotification.message}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/80 via-gray-900 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800/60">
              Operations Control
            </span>
            <span className="text-xs text-gray-400">
              Floor Supervisor: <strong className="text-white">{currentUser?.name || 'Marcus Vance'}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Floor & Front Desk Operations</h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Real-time turnstile validation, daily class rosters, and equipment maintenance tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-950/80 border border-gray-800 px-4 py-2.5 rounded-2xl text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Today's Check-ins</span>
            <span className="text-xl font-black text-blue-400">{attendance.length}</span>
          </div>
          <div className="bg-gray-950/80 border border-gray-800 px-4 py-2.5 rounded-2xl text-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Service Alerts</span>
            <span className="text-xl font-black text-amber-400">
              {equipment.filter(e => e.status !== 'Operational').length}
            </span>
          </div>
        </div>
      </div>

      {/* Operational Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-3">
        <button
          id="mgr-tab-checkin"
          onClick={() => setActiveTab('checkin')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === 'checkin'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Front Desk Scanner</span>
        </button>

        <button
          id="mgr-tab-classes"
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === 'classes'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Class Rosters</span>
        </button>

        <button
          id="mgr-tab-equipment"
          onClick={() => setActiveTab('equipment')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === 'equipment'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Equipment & Maintenance</span>
        </button>

        <button
          id="mgr-tab-inventory"
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === 'inventory'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Pro-Shop Inventory</span>
        </button>
      </div>

      {/* TAB 1: FRONT DESK SCANNER & CHECK-IN */}
      {activeTab === 'checkin' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Member Look-up & Immediate Check-in */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">Live Front Desk Check-in Terminal</h3>
                  <p className="text-xs text-gray-400">Search member name, ID barcode, or phone number to grant access</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search ASP code or name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Members Quick List */}
              <div className="divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden">
                {filteredMembers.map(member => (
                  <div key={member.id} className="p-3.5 bg-gray-950 hover:bg-gray-900/60 transition flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl ${member.avatarBg} text-white font-black flex items-center justify-center text-xs shadow-xs`}>
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{member.name}</span>
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-gray-800 text-gray-300">
                            {member.tier}
                          </span>
                        </div>
                        <p className="text-gray-400 text-[11px] font-mono mt-0.5">
                          {member.memberCode} • Last in: {member.lastCheckIn || 'Never'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        member.status === 'Active'
                          ? 'bg-green-950 text-green-400 border border-green-800/60'
                          : member.status === 'Pending Renewal'
                          ? 'bg-yellow-950 text-yellow-400 border border-yellow-800/60'
                          : 'bg-red-950 text-red-400 border border-red-800/60'
                      }`}>
                        {member.status}
                      </span>

                      <button
                        id={`mgr-checkin-${member.id}`}
                        onClick={() => handleCheckIn(member.id)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Check In</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Today's Live Attendance Stream */}
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white">Live Stream Logs</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-950 px-2 py-0.5 rounded-full border border-green-800/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                  Active Turnstile
                </span>
              </div>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {attendance.map(att => (
                  <div key={att.id} className="p-2.5 bg-gray-950 border border-gray-800/80 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{att.memberName}</span>
                      <span className="text-[11px] font-mono text-gray-400">{att.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>{att.type}</span>
                      <span className="text-emerald-400 font-semibold">Turnstile OK</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CLASS ROSTERS */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Class Selection */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Today's Class Schedule</h3>
            <div className="space-y-2">
              {classes.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between ${
                    cls.id === selectedClassId
                      ? 'bg-blue-950/70 border-blue-700 text-white shadow-xs'
                      : 'bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-850'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                      {cls.time} • {cls.room}
                    </span>
                    <h4 className="font-bold text-sm mt-0.5">{cls.name}</h4>
                    <span className="text-xs text-gray-400">Coach: {cls.instructor}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-white block">
                      {cls.enrolledMemberIds.length} / {cls.capacity}
                    </span>
                    <span className="text-[10px] text-gray-400">Enrolled</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Member Roster for Selected Class */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-white">{currentClass?.name} Roster</h3>
                <p className="text-xs text-gray-400">
                  {currentClass?.day} • {currentClass?.time} • {currentClass?.room}
                </p>
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800/60">
                {enrolledMembers.length} Booked Members
              </span>
            </div>

            {enrolledMembers.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                No members currently enrolled for this class session.
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {enrolledMembers.map(mem => (
                  <div key={mem.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${mem.avatarBg} text-white font-bold flex items-center justify-center text-xs`}>
                        {mem.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-white">{mem.name}</span>
                        <p className="text-[11px] text-gray-400">{mem.memberCode} • {mem.tier}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-950 text-green-400 border border-green-800/50">
                        Present
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: EQUIPMENT MAINTENANCE */}
      {activeTab === 'equipment' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Gym Facility & Equipment Status</h3>
              <p className="text-xs text-gray-400">Inspect strength machines, cardio gear, and report mechanical defects</p>
            </div>
            <span className="text-xs font-bold text-gray-400">
              {equipment.length} Tracked Units
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map(item => (
              <div
                key={item.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {item.category} • {item.location}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.status === 'Operational'
                        ? 'bg-green-950 text-green-400 border border-green-800/60'
                        : item.status === 'Requires Service'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                        : 'bg-red-950 text-red-400 border border-red-800/60'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">{item.name}</h4>

                  {item.reportedIssue && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-gray-950 border border-amber-900/40 text-xs text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                      <span>{item.reportedIssue}</span>
                    </div>
                  )}

                  <div className="mt-3 text-[11px] text-gray-400 space-y-1">
                    <div>Last Service: <strong className="text-gray-300">{item.lastServiceDate}</strong></div>
                    <div>Next Inspection: <strong className="text-gray-300">{item.nextInspection}</strong></div>
                  </div>
                </div>

                {/* Status Switcher for Floor Supervisor */}
                <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-1">
                  <button
                    onClick={() => updateEquipmentStatus(item.id, 'Operational')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                      item.status === 'Operational'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    Operational
                  </button>
                  <button
                    onClick={() => updateEquipmentStatus(item.id, 'Requires Service')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                      item.status === 'Requires Service'
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    Service Needed
                  </button>
                  <button
                    onClick={() => updateEquipmentStatus(item.id, 'Out of Order')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                      item.status === 'Out of Order'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    Out of Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRO-SHOP INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Pro-Shop & Front Desk Inventory</h3>
              <p className="text-xs text-gray-400">Update stock quantities, monitor reorder alerts, and beverage counters</p>
            </div>
          </div>

          <div className="divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden">
            {inventory.map(item => {
              const isLow = item.stock <= item.minAlert;
              return (
                <div key={item.id} className="p-4 bg-gray-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{item.name}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-gray-800 text-gray-300">
                        {item.category}
                      </span>
                      {isLow && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-red-950 text-red-400 font-bold border border-red-800/60">
                          Low Stock Alert
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Retail Price: <strong className="text-emerald-400">${item.price.toFixed(2)}</strong> • Minimum threshold: {item.minAlert} {item.unit}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    <span className="font-black text-base text-white">
                      {item.stock} <span className="text-xs font-normal text-gray-400">{item.unit}</span>
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => updateInventoryStock(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center font-bold"
                        title="Decrease Stock"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateInventoryStock(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center font-bold"
                        title="Increase Stock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
