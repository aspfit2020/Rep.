import React from 'react';

interface AspireLogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  className?: string;
  showLocation?: boolean;
}

export const AspireIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-10 h-10',
}) => {
  return (
    <div className={`relative rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-red-950 p-1 flex items-center justify-center text-white shadow-lg shadow-red-950/60 border border-red-500/30 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aspireIconRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>
        
        {/* Silhouette of Female & Male Athletes Flexing */}
        <g transform="translate(4, 5) scale(0.92)" fill="#FFFFFF">
          {/* Female posing athlete */}
          <path d="M 28 48 C 26 44, 23 41, 19 40 C 14 39, 9 43, 6 48 C 3 53, 5 60, 9 63 C 12 65, 17 64, 21 61 C 24 59, 26 56, 27 52 Z" />
          <path d="M 20 40 C 18 36, 17 31, 19 26 C 21 21, 26 18, 31 18 C 33 22, 34 26, 33 30 C 31 35, 27 38, 20 40 Z" />
          <path d="M 18 25 C 13 23, 8 26, 4 30 C 7 32, 12 31, 16 28 Z" />
          <path d="M 28 50 C 31 55, 34 62, 36 70 C 37 76, 36 82, 33 88 C 36 88, 40 86, 43 82 C 45 76, 45 68, 43 60 C 40 54, 35 49, 28 50 Z" />

          {/* Muscular Male Bodybuilder Front/Back Double Bicep Pose */}
          <path d="M 52 20 C 52 14, 57 10, 63 10 C 69 10, 74 14, 74 20 C 74 24, 72 27, 69 29 C 74 31, 80 34, 84 39 C 81 40, 76 38, 71 35 C 69 36, 67 36, 65 36 C 63 36, 61 36, 59 35 C 54 38, 49 40, 46 39 C 50 34, 56 31, 61 29 C 58 27, 56 24, 56 20 Z" />
          <path d="M 46 39 C 40 37, 34 39, 28 44 C 23 48, 18 55, 12 56 C 8 57, 4 54, 3 49 C 2 44, 5 38, 10 34 C 16 30, 24 29, 31 32 C 37 34, 42 36, 46 39 Z" />
          <path d="M 8 46 C 6 42, 6 36, 9 32 C 12 28, 17 27, 21 28 C 18 33, 15 39, 13 45 Z" />
          <path d="M 9 32 C 8 28, 9 24, 13 22 C 16 21, 20 23, 21 26 C 20 29, 18 31, 15 32 Z" />

          <path d="M 74 36 C 80 34, 86 36, 91 40 C 96 44, 99 50, 99 56 C 96 58, 91 58, 87 54 C 83 50, 80 44, 75 40 Z" />
          <path d="M 86 40 C 89 35, 93 31, 98 32 C 102 33, 104 38, 103 43 C 100 48, 95 51, 90 49 C 88 46, 87 43, 86 40 Z" />
          <path d="M 98 32 C 99 26, 96 21, 91 18 C 86 16, 81 19, 80 24 C 83 26, 87 28, 90 32 Z" />
          <path d="M 82 24 C 79 23, 77 24, 76 27 C 76 30, 79 32, 82 31 Z" />

          <path d="M 48 45 C 53 43, 59 42, 65 42 C 71 42, 77 43, 82 45 C 85 52, 86 60, 84 68 C 81 74, 77 79, 73 85 C 70 89, 67 92, 63 93 C 59 92, 56 89, 53 85 C 49 79, 45 74, 42 68 C 40 60, 41 52, 48 45 Z" />
          <path d="M 63 44 L 63 76" stroke="#0B0F19" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 52 56 C 56 59, 60 59, 63 58 C 66 59, 70 59, 74 56" stroke="#0B0F19" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Accent strip */}
        <rect x="25" y="88" width="50" height="4" rx="2" fill="#EF4444" />
      </svg>
    </div>
  );
};

export const AspireLogo: React.FC<AspireLogoProps> = ({
  variant = 'full',
  className = '',
  showLocation = true,
}) => {
  if (variant === 'icon-only') {
    return <AspireIcon className={className} />;
  }

  return (
    <div className={`flex items-center space-x-3 text-left ${className}`}>
      <AspireIcon className="w-11 h-11 shrink-0" />
      <div>
        <div className="flex items-center gap-2 leading-none">
          <span className="font-black text-xl sm:text-2xl tracking-tight text-white font-sans">
            ASPIRE
          </span>
          <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
            FITNESS
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-300">
            GYM &amp; HEALTH CLUB
          </span>
          {showLocation && (
            <>
              <span className="text-red-500 font-bold">•</span>
              <span className="text-[10px] font-medium text-gray-400 hidden sm:inline">
                East Marady, Muvattupuzha
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
