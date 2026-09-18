import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Flame,
  Calendar,
  Dumbbell,
  CheckCircle2,
  Clock,
  QrCode,
  Sparkles,
  Plus,
  Trophy,
  Activity,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { LogWorkoutModal } from './Modals/LogWorkoutModal';

export const MemberPortal: React.FC = () => {
  const {
    currentUser,
    members,
    attendance,
    workouts,
    prs,
    classes,
    checkInMember,
    bookClass,
    cancelClassBooking
  } = useGym();

  const [activeTab, setActiveTab] = useState<'attendance' | 'workouts' | 'classes'>('attendance');
  const [isLogWorkoutOpen, setIsLogWorkoutOpen] = useState(false);
  const [selectedClassCategory, setSelectedClassCategory] = useState<string>('All');
  const [checkInFeedback, setCheckInFeedback] = useState<string | null>(null);

  // Identify member data
  const currentMember = members.find(m => m.id === currentUser?.id) || members[0];
  const memberAttendance = attendance.filter(a => a.memberId === currentMember.id);
  const memberWorkouts = workouts.filter(w => w.memberId === currentMember.id);

  const handleSimulateCheckIn = () => {
    const res = checkInMember(currentMember.id, 'Gym Floor');
    setCheckInFeedback(res.message);
    setTimeout(() => setCheckInFeedback(null), 4000);
  };

  const filteredClasses = selectedClassCategory === 'All'
    ? classes
    : classes.filter(c => c.category === selectedClassCategory);

  // Generate calendar days for current month (September 2026 - 30 days)
  const attendedDaysSet = new Set(
    memberAttendance.map(a => Number(a.date.split('-')[2]))
  );

  return (
    <div className="space-y-6 pb-16">
      
      {/* Toast Notification */}
      {checkInFeedback && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white font-bold text-sm px-4 py-3 rounded-2xl shadow-xl border border-emerald-400/40 flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-5 h-5" />
          <span>{checkInFeedback}</span>
        </div>
      )}

      {/* VIBRANT ATHLETE DIGITAL PASS HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/90 via-gray-900 to-teal-950/70 border border-emerald-800/50 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Member Bio & Tier */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-black shadow-md shadow-emerald-500/20">
                {currentMember.tier} Membership
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60">
                Status: {currentMember.status}
              </span>
              <span className="text-xs text-gray-400">
                Member Since: {currentMember.joinDate}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {currentMember.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 font-mono mt-0.5">
                Barcode ID: <span className="text-emerald-400 font-bold">{currentMember.memberCode}</span> • Lockers: General Access
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-300 pt-1">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
                <span><strong className="text-white">{currentMember.streakDays} Day</strong> Streak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span><strong className="text-white">{currentMember.totalCheckIns}</strong> Lifetime Visits</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Last in: {currentMember.lastCheckIn || 'Recent'}</span>
              </div>
            </div>
          </div>

          {/* Digital QR Pass Card & 1-Tap Check-In */}
          <div className="bg-gray-950/90 border border-emerald-800/60 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center shrink-0 sm:w-64 text-center shadow-xl">
            <div className="p-3 bg-white rounded-xl shadow-inner mb-2 flex items-center justify-center">
              <QrCode className="w-20 h-20 text-gray-950" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              {currentMember.memberCode}
            </span>
            <p className="text-[11px] text-gray-400 mt-1">
              Present barcode at front desk optical turnstile
            </p>

            <button
              id="simulate-checkin-pass-button"
              onClick={handleSimulateCheckIn}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-950 transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>One-Tap Pass Check-In</span>
            </button>
          </div>

        </div>
      </section>

      {/* NAVIGATION TABS (ATTENDANCE | WORKOUTS | CLASS SCHEDULES) */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-2">
          <button
            id="member-tab-attendance"
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
              activeTab === 'attendance'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Attendance Tracking</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-900/60 text-emerald-300">
              {memberAttendance.length}
            </span>
          </button>

          <button
            id="member-tab-workouts"
            onClick={() => setActiveTab('workouts')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
              activeTab === 'workouts'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <span>Workout Progress</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-900/60 text-emerald-300">
              {prs.length} PRs
            </span>
          </button>

          <button
            id="member-tab-classes"
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
              activeTab === 'classes'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Class Schedules</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-900/60 text-emerald-300">
              {classes.filter(c => c.enrolledMemberIds.includes(currentMember.id)).length} Booked
            </span>
          </button>
        </div>

        {activeTab === 'workouts' && (
          <button
            id="log-new-workout-button"
            onClick={() => setIsLogWorkoutOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Log New Workout</span>
          </button>
        )}
      </div>

      {/* TAB 1: ATTENDANCE TRACKING */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Streak</span>
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-3xl font-black text-white mt-2">{currentMember.streakDays} Consecutive Days</p>
              <p className="text-xs text-emerald-400 mt-1 font-semibold">Active consistency reward tier</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">September Visits</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-black text-white mt-2">{attendedDaysSet.size} Sessions</p>
              <p className="text-xs text-gray-400 mt-1">Target: 16 sessions / month (Achieved!)</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Avg Time in Gym</span>
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-3xl font-black text-white mt-2">72 Mins</p>
              <p className="text-xs text-gray-400 mt-1">Preferred zone: Heavy Free Weights</p>
            </div>
          </div>

          {/* Interactive Monthly Attendance Grid */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">September 2026 Attendance Heatmap</h3>
                <p className="text-xs text-gray-400">Green badges indicate successful front desk check-ins</p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800/60">
                {attendedDaysSet.size} of 30 Days Active
              </span>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Calendar Cells */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                const attended = attendedDaysSet.has(day);
                const isToday = day === 18; // 2026-09-18
                return (
                  <div
                    key={day}
                    className={`h-12 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition border relative ${
                      attended
                        ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300 shadow-xs'
                        : isToday
                        ? 'bg-gray-800 border-red-500 text-white'
                        : 'bg-gray-950 border-gray-800/60 text-gray-400'
                    }`}
                  >
                    <span>{day}</span>
                    {attended && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5 shadow-xs" />
                    )}
                    {isToday && !attended && (
                      <span className="text-[9px] text-red-400 leading-none">Today</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Check-in Logs Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Recent Turnstile Check-Ins</h3>
                <p className="text-xs text-gray-400">Timestamped logs from the front desk optical reader</p>
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {memberAttendance.map(att => (
                <div key={att.id} className="p-4 flex items-center justify-between hover:bg-gray-800/50 transition text-xs sm:text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{att.type}</p>
                      <p className="text-xs text-gray-400">{att.date} • {att.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400">{att.durationMinutes} min session</span>
                    <p className="text-[11px] text-gray-400">Turnstile 01 Validated</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORKOUT PROGRESS */}
      {activeTab === 'workouts' && (
        <div className="space-y-6">
          {/* PR Showcase Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Verified Personal Records (PRs)</h3>
              </div>
              <span className="text-xs text-gray-400">Main Barbell Lifts</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {prs.map(pr => (
                <div
                  key={pr.exercise}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-4 relative overflow-hidden"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block truncate">
                    {pr.exercise}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-white">{pr.weightLbs}</span>
                    <span className="text-xs font-bold text-emerald-400">lbs</span>
                  </div>
                  <div className="mt-2 text-[10px] text-gray-400 flex items-center justify-between">
                    <span>{pr.date}</span>
                    {pr.previousWeightLbs && (
                      <span className="text-emerald-400 font-bold">+{pr.weightLbs - pr.previousWeightLbs} lbs</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logged Workout Sessions History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Logged Workout History</h3>
              <span className="text-xs text-gray-400">{memberWorkouts.length} Logged Sessions</span>
            </div>

            <div className="space-y-3">
              {memberWorkouts.map(session => (
                <div
                  key={session.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                          {session.category}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{session.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">{session.title}</h4>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {session.durationMinutes} mins
                      </span>
                      <span className="flex items-center gap-1 text-orange-400 font-bold">
                        <Flame className="w-3.5 h-3.5" />
                        {session.caloriesBurned} kcal
                      </span>
                    </div>
                  </div>

                  {/* Exercises Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {session.exercises.map(ex => (
                      <div key={ex.id} className="p-2.5 rounded-xl bg-gray-950 border border-gray-800/80 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white truncate">{ex.name}</span>
                          {ex.pr && (
                            <span className="text-[9px] bg-amber-950 text-amber-300 font-black px-1.5 py-0.2 rounded-sm border border-amber-800/60">
                              PR
                            </span>
                          )}
                        </div>
                        <div className="text-gray-400 text-[11px] mt-1">
                          {ex.sets} sets × {ex.reps} reps @ <strong className="text-emerald-400">{ex.weightLbs} lbs</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  {session.notes && (
                    <p className="text-xs text-gray-400 italic bg-gray-950/60 p-2.5 rounded-xl border border-gray-800/40">
                      "{session.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLASS SCHEDULES */}
      {activeTab === 'classes' && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-900 p-1.5 rounded-2xl border border-gray-800">
            {['All', 'HIIT', 'CrossFit', 'Spin', 'Yoga', 'Boxing', 'Pilates'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedClassCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedClassCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClasses.map(cls => {
              const isEnrolled = cls.enrolledMemberIds.includes(currentMember.id);
              const spotsLeft = cls.capacity - cls.enrolledMemberIds.length;

              return (
                <div
                  key={cls.id}
                  className={`bg-gray-900 border rounded-2xl p-5 transition flex flex-col justify-between ${
                    isEnrolled
                      ? 'border-emerald-700/80 bg-gradient-to-br from-emerald-950/30 to-gray-900'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                          {cls.category}
                        </span>
                        <span className="text-xs font-bold text-gray-300">{cls.day}</span>
                      </div>
                      <span className={`text-xs font-bold ${spotsLeft <= 3 ? 'text-red-400' : 'text-gray-400'}`}>
                        {spotsLeft} / {cls.capacity} spots available
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white">{cls.name}</h4>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {cls.time} ({cls.durationMinutes} mins) • <MapPin className="w-3.5 h-3.5 text-gray-400" /> {cls.room}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 font-bold text-[10px] flex items-center justify-center border border-emerald-500/30">
                        {cls.instructorAvatar}
                      </div>
                      <span>Coach {cls.instructor}</span>
                      <span className="text-gray-400">• Level: {cls.level}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">
                      {isEnrolled ? '✓ Spot Confirmed on Roster' : 'Complimentary with membership'}
                    </span>
                    {isEnrolled ? (
                      <button
                        onClick={() => cancelClassBooking(cls.id, currentMember.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-gray-800 hover:bg-red-950 hover:text-red-400 text-xs font-bold text-gray-300 border border-gray-700 transition"
                      >
                        Cancel Booking
                      </button>
                    ) : (
                      <button
                        onClick={() => bookClass(cls.id, currentMember.id)}
                        disabled={spotsLeft <= 0}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold text-xs shadow-md shadow-emerald-950 transition"
                      >
                        {spotsLeft > 0 ? 'Book Class' : 'Class Full'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Log Workout Modal */}
      <LogWorkoutModal
        isOpen={isLogWorkoutOpen}
        onClose={() => setIsLogWorkoutOpen(false)}
      />

    </div>
  );
};
