import React, { useState } from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { Header } from './components/Header';
import { HamburgerDrawer } from './components/HamburgerDrawer';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { MemberPortal } from './components/MemberPortal';
import { ManagerPortal } from './components/ManagerPortal';
import { AdminPortal } from './components/AdminPortal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Wifi, Battery, Signal } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, isMobileDeviceView } = useGym();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-red-600 selection:text-white flex flex-col items-center">
      
      {/* Mobile Shell Frame Wrapper (Toggled by top button for testing phone layout) */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileDeviceView
            ? 'max-w-md my-6 rounded-[2.5rem] border-8 border-gray-800 shadow-2xl shadow-red-950/20 bg-gray-950 overflow-hidden relative min-h-[850px]'
            : 'max-w-full'
        }`}
      >
        {/* Simulated Mobile Status Bar in Mobile Shell mode */}
        {isMobileDeviceView && (
          <div className="bg-black/90 px-6 py-2 flex items-center justify-between text-xs text-gray-400 select-none border-b border-gray-850">
            <span className="font-bold text-white text-[11px]">09:41</span>
            <div className="w-20 h-4 bg-black rounded-full mx-auto" />
            <div className="flex items-center space-x-1.5 text-gray-300">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {/* Top Header */}
        <Header onOpenDrawer={() => setIsDrawerOpen(true)} />

        {/* Slide-out Hamburger Drawer */}
        <HamburgerDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />

        {/* Dynamic Views */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
          {currentView === 'home' && <LandingPage />}
          {currentView === 'login' && <LoginPage />}
          {currentView === 'member' && <MemberPortal />}
          {currentView === 'manager' && <ManagerPortal />}
          {currentView === 'admin' && <AdminPortal />}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomNav onOpenDrawer={() => setIsDrawerOpen(true)} />

        {/* Mobile Spacer to avoid bottom nav clipping on small viewports */}
        <div className="h-16 md:hidden" />
      </div>

    </div>
  );
};

export default function App() {
  return (
    <GymProvider>
      <MainContent />
    </GymProvider>
  );
}
