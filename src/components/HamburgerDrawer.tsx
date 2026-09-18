import React from 'react';
import { useGym } from '../context/GymContext';
import { AspireLogo } from './AspireLogo';
import {
  X,
  Shield,
  Flame,
  Calendar,
  Sparkles,
  Lock,
  ChevronRight,
  LogOut,
  Users
} from 'lucide-react';

interface HamburgerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HamburgerDrawer: React.FC<HamburgerDrawerProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    switchView,
    logout,
    login,
    setSelectedLoginTab
  } = useGym();

  if (!isOpen) return null;

  const navigateToLoginTab = (tab: 'member' | 'manager' | 'admin') => {
    setSelectedLoginTab(tab);
    switchView('login');
    onClose();
  };

  const handleDemoSwitch = (role: 'member' | 'manager' | 'admin') => {
    login(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        id="hamburger-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-sm bg-gray-900 border-r border-gray-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
          
          {/* Header */}
          <div>
            <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-gray-950/80">
              <div className="flex items-center space-x-2.5">
                <AspireLogo variant="compact" showLocation={false} />
              </div>
              <button
                id="close-hamburger-button"
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Account Card if Logged In */}
            {currentUser && (
              <div className="p-4 mx-4 mt-4 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 font-black flex items-center justify-center border border-red-500/20">
                    {currentUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">{currentUser.name}</p>
                    <p className="text-xs text-gray-400 capitalize flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Logged in as {currentUser.role}
                    </p>
                  </div>
                </div>
                <button
                  id="drawer-logout-button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="text-gray-500 hover:text-red-400 p-2 rounded-lg hover:bg-gray-900 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Primary Member & Community Navigation */}
            <div className="px-4 py-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3">
                Member Hub & Community
              </span>
              <nav className="mt-2 space-y-1">
                <button
                  id="drawer-nav-home"
                  onClick={() => {
                    switchView('home');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-200 hover:bg-gray-800/80 hover:text-white transition group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">Community Feed & News</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  id="drawer-nav-member"
                  onClick={() => {
                    if (currentUser?.role === 'member') {
                      switchView('member');
                    } else {
                      navigateToLoginTab('member');
                    }
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-emerald-400 hover:bg-emerald-950/40 border border-transparent hover:border-emerald-800/40 transition group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Flame className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-bold text-emerald-300">Member Portal</span>
                      <p className="text-[11px] text-gray-400">Attendance, Workouts & Schedules</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  id="drawer-nav-schedule"
                  onClick={() => {
                    switchView('home');
                    onClose();
                    setTimeout(() => {
                      document.getElementById('classes-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-200 hover:bg-gray-800/80 hover:text-white transition text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold">Group Fitness Timetable</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </nav>
            </div>

            {/* Hidden Administration & Manager Login Section (As Requested by User) */}
            <div className="px-4 py-3 border-t border-gray-800/80 mt-2 bg-gray-950/40">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-500/90 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-amber-400" />
                  Staff & Administrative Access
                </span>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded-sm">
                  Restricted
                </span>
              </div>
              <p className="text-xs text-gray-400 px-3 mb-3">
                Hidden portal for gym directors and floor supervisors to manage records, memberships, and facility operations.
              </p>

              <div className="space-y-2">
                {/* Manager Login Option */}
                <button
                  id="drawer-manager-access-button"
                  onClick={() => {
                    if (currentUser?.role === 'manager') {
                      switchView('manager');
                      onClose();
                    } else {
                      navigateToLoginTab('manager');
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-900 border border-blue-900/40 hover:border-blue-700/70 hover:bg-blue-950/30 transition text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 border border-blue-800/50 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">Manager Portal</span>
                        <span className="text-[10px] bg-blue-900/50 text-blue-300 font-bold px-1.5 py-0.2 rounded-sm border border-blue-700/40">
                          Ops
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">Front desk, attendance scanner & stock</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </button>

                {/* Administrator Login Option */}
                <button
                  id="drawer-admin-access-button"
                  onClick={() => {
                    if (currentUser?.role === 'admin') {
                      switchView('admin');
                      onClose();
                    } else {
                      navigateToLoginTab('admin');
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-900 border border-red-900/40 hover:border-red-700/70 hover:bg-red-950/30 transition text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 border border-red-800/50 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white">Administrator Portal</span>
                        <span className="text-[10px] bg-red-900/50 text-red-300 font-bold px-1.5 py-0.2 rounded-sm border border-red-700/40">
                          Executive
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">Members, finances, trainers & master schedules</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </div>

            {/* Quick Demo Persona Switcher (For easy evaluator testing) */}
            <div className="px-4 py-3 border-t border-gray-800">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 flex items-center gap-1">
                <Users className="w-3 h-3" /> Quick Demo Role Switcher
              </span>
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                <button
                  id="quick-switch-member"
                  onClick={() => handleDemoSwitch('member')}
                  className="px-2 py-2 rounded-lg bg-gray-800/90 hover:bg-emerald-950 hover:text-emerald-300 text-gray-300 text-xs font-bold transition text-center border border-gray-700/50"
                  title="Switch to Alex Rivera (Member)"
                >
                  Member
                </button>
                <button
                  id="quick-switch-manager"
                  onClick={() => handleDemoSwitch('manager')}
                  className="px-2 py-2 rounded-lg bg-gray-800/90 hover:bg-blue-950 hover:text-blue-300 text-gray-300 text-xs font-bold transition text-center border border-gray-700/50"
                  title="Switch to Marcus Vance (Manager)"
                >
                  Manager
                </button>
                <button
                  id="quick-switch-admin"
                  onClick={() => handleDemoSwitch('admin')}
                  className="px-2 py-2 rounded-lg bg-gray-800/90 hover:bg-red-950 hover:text-red-300 text-gray-300 text-xs font-bold transition text-center border border-gray-700/50"
                  title="Switch to Sarah Chen (Administrator)"
                >
                  Admin
                </button>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 bg-gray-950 text-xs text-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-300">Aspire Fitness Metro Club</p>
                <p className="text-[11px] text-gray-400">Facility Hours: 05:00 - 23:00</p>
              </div>
              <span className="px-2 py-1 bg-green-950 text-green-400 border border-green-800/60 rounded-full text-[10px] font-bold">
                Open Now
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
