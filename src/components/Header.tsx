import React from 'react';
import { useGym } from '../context/GymContext';
import { AspireLogo } from './AspireLogo';
import {
  Menu,
  Shield,
  User as UserIcon,
  LogOut,
  Smartphone,
  Monitor,
  Flame,
  Clock,
  Phone
} from 'lucide-react';

interface HeaderProps {
  onOpenDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDrawer }) => {
  const {
    currentUser,
    activeRole,
    currentView,
    switchView,
    logout,
    isMobileDeviceView,
    toggleMobileDeviceView
  } = useGym();

  const getRoleBadge = () => {
    switch (activeRole) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/60 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            Admin
          </span>
        );
      case 'manager':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-950/80 text-blue-400 border border-blue-800/60 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            Manager
          </span>
        );
      case 'member':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-emerald-400" />
            Member
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-gray-400 bg-gray-800/80 border border-gray-700/60">
            Guest
          </span>
        );
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/80 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Left: Hamburger Button & Gym Brand */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              id="header-hamburger-button"
              onClick={onOpenDrawer}
              className="text-gray-300 hover:text-red-500 p-2 rounded-xl hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
              title="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              id="header-logo-home-button"
              onClick={() => switchView('home')}
              className="flex items-center text-left group transition focus:outline-none"
            >
              <AspireLogo showLocation={true} />
            </button>
          </div>

          {/* Center Navigation Shortcuts (Desktop only) */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              id="nav-community-feed"
              onClick={() => switchView('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                currentView === 'home'
                  ? 'bg-gray-800 text-white shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              Community & News
            </button>

            {currentUser?.role === 'member' && (
              <button
                id="nav-member-portal"
                onClick={() => switchView('member')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                  currentView === 'member'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 shadow-xs'
                    : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-900'
                }`}
              >
                <Flame className="w-4 h-4 text-emerald-400" />
                Member Portal
              </button>
            )}

            {currentUser?.role === 'manager' && (
              <button
                id="nav-manager-portal"
                onClick={() => switchView('manager')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                  currentView === 'manager'
                    ? 'bg-blue-950/80 text-blue-300 border border-blue-800/60 shadow-xs'
                    : 'text-gray-400 hover:text-blue-400 hover:bg-gray-900'
                }`}
              >
                <Shield className="w-4 h-4 text-blue-400" />
                Manager Operations
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button
                id="nav-admin-portal"
                onClick={() => switchView('admin')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                  currentView === 'admin'
                    ? 'bg-red-950/80 text-red-300 border border-red-800/60 shadow-xs'
                    : 'text-gray-400 hover:text-red-400 hover:bg-gray-900'
                }`}
              >
                <Shield className="w-4 h-4 text-red-500" />
                Admin Dashboard
              </button>
            )}
          </nav>

          {/* Right Actions: Mobile Simulation Toggle & Auth Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Toggle Mobile Phone Frame Preview */}
            <button
              id="toggle-mobile-preview-button"
              onClick={toggleMobileDeviceView}
              className={`p-2 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 ${
                isMobileDeviceView
                  ? 'bg-red-950/60 text-red-400 border-red-800/60'
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
              }`}
              title={isMobileDeviceView ? 'Switch to Full Screen View' : 'Simulate Mobile Frame Preview'}
            >
              {isMobileDeviceView ? (
                <>
                  <Monitor className="w-4 h-4 text-red-400" />
                  <span className="hidden sm:inline">Wide View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4" />
                  <span className="hidden sm:inline">Mobile Shell</span>
                </>
              )}
            </button>

            {/* Current Role Badge */}
            <div className="hidden sm:block">
              {getRoleBadge()}
            </div>

            {/* Auth Button / User Chip */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <button
                  id="header-user-profile-button"
                  onClick={() => {
                    if (currentUser.role === 'admin') switchView('admin');
                    else if (currentUser.role === 'manager') switchView('manager');
                    else switchView('member');
                  }}
                  className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-3 py-1.5 rounded-xl border border-gray-800 transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-red-600/30 text-red-400 font-bold text-xs flex items-center justify-center border border-red-500/30">
                    {currentUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold hidden sm:inline max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                </button>
                <button
                  id="header-logout-button"
                  onClick={logout}
                  className="text-gray-400 hover:text-red-400 p-2 rounded-xl hover:bg-gray-900 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="header-login-button"
                onClick={() => switchView('login')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl shadow-md shadow-red-600/20 transition flex items-center space-x-1.5"
              >
                <UserIcon className="w-4 h-4" />
                <span>Member Portal</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
