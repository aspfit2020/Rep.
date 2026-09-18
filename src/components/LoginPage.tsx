import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Shield,
  Flame,
  KeyRound,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const {
    login,
    switchView,
    selectedLoginTab,
    setSelectedLoginTab
  } = useGym();

  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const success = login(selectedLoginTab, emailOrId);
      if (!success) {
        setErrorMessage('Invalid authentication credentials. Please try demo button below.');
      }
    }, 400);
  };

  const handleOneClickDemo = (role: 'member' | 'manager' | 'admin') => {
    setSelectedLoginTab(role);
    login(role);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 flex flex-col items-center justify-center">
      
      {/* Top Breadcrumb / Return Link */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-between">
        <button
          id="back-to-community-feed"
          onClick={() => switchView('home')}
          className="text-xs font-bold text-gray-400 hover:text-white transition flex items-center gap-1.5"
        >
          ← Return to Community Feed
        </button>
        <span className="text-[11px] font-bold text-gray-400 bg-gray-900 border border-gray-800 px-2.5 py-1 rounded-full">
          Aspire Secure Access v3.4
        </span>
      </div>

      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Three-Way Login Tab Selector */}
        <div className="p-2 bg-gray-950/90 border-b border-gray-800 grid grid-cols-3 gap-1.5">
          {/* Option 1: Member */}
          <button
            id="tab-member-login"
            onClick={() => {
              setSelectedLoginTab('member');
              setErrorMessage('');
            }}
            className={`py-3 px-2 rounded-xl text-xs font-black tracking-tight transition flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              selectedLoginTab === 'member'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Flame className="w-4 h-4 text-emerald-300" />
            <span>Members</span>
          </button>

          {/* Option 2: Manager */}
          <button
            id="tab-manager-login"
            onClick={() => {
              setSelectedLoginTab('manager');
              setErrorMessage('');
            }}
            className={`py-3 px-2 rounded-xl text-xs font-black tracking-tight transition flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              selectedLoginTab === 'manager'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Shield className="w-4 h-4 text-blue-300" />
            <span>Managers</span>
          </button>

          {/* Option 3: Admin */}
          <button
            id="tab-admin-login"
            onClick={() => {
              setSelectedLoginTab('admin');
              setErrorMessage('');
            }}
            className={`py-3 px-2 rounded-xl text-xs font-black tracking-tight transition flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              selectedLoginTab === 'admin'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Shield className="w-4 h-4 text-red-300" />
            <span>Admins</span>
          </button>
        </div>

        {/* Tab Banner / Role Introduction */}
        <div className="p-6 sm:p-8">
          
          {selectedLoginTab === 'member' && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-gray-900 to-teal-950/30 border border-emerald-800/40">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    Vibrant Member Experience
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5">Member Athlete Portal</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Sign in to track your gym attendance streaks, log personal record workouts, and reserve class spots.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-emerald-300">
                <span className="bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/50">✓ QR Check-in Pass</span>
                <span className="bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/50">✓ PR Workout Tracker</span>
                <span className="bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/50">✓ Class Booking</span>
              </div>
            </div>
          )}

          {selectedLoginTab === 'manager' && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-950/60 via-gray-900 to-slate-900 border border-blue-800/40">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                    Operations & Front Desk
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5">Floor Manager Authentication</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Access real-time member check-in scanners, class attendance rosters, and equipment maintenance status.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-blue-300">
                <span className="bg-blue-950 px-2 py-0.5 rounded-md border border-blue-800/50">✓ Live Check-in Terminal</span>
                <span className="bg-blue-950 px-2 py-0.5 rounded-md border border-blue-800/50">✓ Class Roster Ops</span>
                <span className="bg-blue-950 px-2 py-0.5 rounded-md border border-blue-800/50">✓ Pro-Shop Inventory</span>
              </div>
            </div>
          )}

          {selectedLoginTab === 'admin' && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-red-950/60 via-gray-900 to-rose-950/20 border border-red-800/40">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400">
                    Executive Clearance
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5">Gym Administrator Gateway</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Full administrational master controls: membership records, financial analytics, trainer roster & schedules.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-xl shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-red-300">
                <span className="bg-red-950 px-2 py-0.5 rounded-md border border-red-800/50">✓ Member Database CRUD</span>
                <span className="bg-red-950 px-2 py-0.5 rounded-md border border-red-800/50">✓ Revenue & Invoicing</span>
                <span className="bg-red-950 px-2 py-0.5 rounded-md border border-red-800/50">✓ Schedule Master</span>
              </div>
            </div>
          )}

          {/* Error Message if any */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {selectedLoginTab === 'member'
                  ? 'Member Code or Registered Email'
                  : selectedLoginTab === 'manager'
                  ? 'Manager Staff ID or Email'
                  : 'Administrator Corporate Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="login-credential-input"
                  required
                  value={emailOrId}
                  onChange={e => setEmailOrId(e.target.value)}
                  placeholder={
                    selectedLoginTab === 'member'
                      ? 'e.g. ASP-7492 or alex.rivera@gym.com'
                      : selectedLoginTab === 'manager'
                      ? 'e.g. marcus.vance@aspirefitness.com'
                      : 'e.g. sarah.admin@aspirefitness.com'
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  {selectedLoginTab === 'member' ? 'Member Security PIN / Password' : 'Secure Passcode'}
                </label>
                <span className="text-[11px] text-gray-400 hover:text-gray-300 cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password-input"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-login-button"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl font-black text-sm tracking-wide text-white transition flex items-center justify-center space-x-2 shadow-lg ${
                selectedLoginTab === 'member'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-900/40'
                  : selectedLoginTab === 'manager'
                  ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/40'
                  : 'bg-red-600 hover:bg-red-500 shadow-red-900/40'
              }`}
            >
              <span>
                {isSubmitting
                  ? 'Authenticating...'
                  : selectedLoginTab === 'member'
                  ? 'Sign In to Member Portal'
                  : selectedLoginTab === 'manager'
                  ? 'Authenticate Floor Manager'
                  : 'Authenticate Administrator'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo Login Shortcuts */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-red-400" />
                Instant Demo Evaluation (1-Click)
              </span>
              <span className="text-[10px] text-gray-400">Pre-authenticated</span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                id="demo-login-member"
                onClick={() => handleOneClickDemo('member')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-950 hover:bg-emerald-950/50 border border-gray-800 hover:border-emerald-700/60 transition group text-left"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                    AR
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-200 group-hover:text-emerald-300">
                      Alex Rivera <span className="text-[10px] font-medium text-gray-400">(VIP Member)</span>
                    </span>
                    <p className="text-[10px] text-gray-400">Code: ASP-7492 • Workouts & Attendance</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-gray-400 group-hover:text-emerald-400" />
              </button>

              <button
                type="button"
                id="demo-login-manager"
                onClick={() => handleOneClickDemo('manager')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-950 hover:bg-blue-950/50 border border-gray-800 hover:border-blue-700/60 transition group text-left"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                    MV
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-200 group-hover:text-blue-300">
                      Marcus Vance <span className="text-[10px] font-medium text-gray-400">(Floor Manager)</span>
                    </span>
                    <p className="text-[10px] text-gray-400">Operations, Check-in Scanner & Stock</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
              </button>

              <button
                type="button"
                id="demo-login-admin"
                onClick={() => handleOneClickDemo('admin')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-950 hover:bg-red-950/50 border border-gray-800 hover:border-red-700/60 transition group text-left"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 font-bold text-xs flex items-center justify-center">
                    SC
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-200 group-hover:text-red-300">
                      Sarah Chen <span className="text-[10px] font-medium text-gray-400">(General Administrator)</span>
                    </span>
                    <p className="text-[10px] text-gray-400">All Gym Privileges, Member CRUD & Finances</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
