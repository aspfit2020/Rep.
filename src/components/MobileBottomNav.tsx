import React from 'react';
import { useGym } from '../context/GymContext';
import {
  Sparkles,
  Flame,
  Shield,
  Menu,
  User as UserIcon
} from 'lucide-react';

interface MobileBottomNavProps {
  onOpenDrawer: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenDrawer }) => {
  const { currentView, switchView, currentUser, setSelectedLoginTab } = useGym();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-gray-950/95 backdrop-blur-lg border-t border-gray-800/90 py-2 px-3 md:hidden shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Home Feed */}
        <button
          id="mobile-nav-home"
          onClick={() => switchView('home')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
            currentView === 'home'
              ? 'text-red-500 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Community</span>
        </button>

        {/* Member Portal */}
        <button
          id="mobile-nav-member"
          onClick={() => {
            if (currentUser?.role === 'member') {
              switchView('member');
            } else {
              setSelectedLoginTab('member');
              switchView('login');
            }
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
            currentView === 'member'
              ? 'text-emerald-400 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Flame className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Member Pass</span>
        </button>

        {/* Role-Specific Portal Button (Admin or Manager or Login) */}
        {currentUser?.role === 'admin' ? (
          <button
            id="mobile-nav-admin"
            onClick={() => switchView('admin')}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
              currentView === 'admin'
                ? 'text-red-400 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Admin</span>
          </button>
        ) : currentUser?.role === 'manager' ? (
          <button
            id="mobile-nav-manager"
            onClick={() => switchView('manager')}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
              currentView === 'manager'
                ? 'text-blue-400 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Manager</span>
          </button>
        ) : (
          <button
            id="mobile-nav-login"
            onClick={() => switchView('login')}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition ${
              currentView === 'login'
                ? 'text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UserIcon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Sign In</span>
          </button>
        )}

        {/* Hamburger Menu Toggle (Where Admin and Managers are hidden) */}
        <button
          id="mobile-nav-menu"
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-gray-400 hover:text-red-400 transition"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Menu</span>
        </button>

      </div>
    </div>
  );
};
