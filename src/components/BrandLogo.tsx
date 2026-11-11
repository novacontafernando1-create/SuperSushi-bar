import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = 'h-8 w-auto' }) => {
  return (
    <div className="flex items-center shrink-0">
      <div className="relative w-8 h-8 rounded-lg bg-surface-container-high border border-primary-container/40 flex items-center justify-center transition-all group-hover:border-primary-container group-hover:shadow-[0_0_16px_rgba(255,122,26,0.5)] shrink-0">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dragon Ki Flame & Nigiri Contour */}
          <path
            d="M12 2C8 6 6 10 6 14C6 17.5 8.7 20.5 12 21C15.3 20.5 18 17.5 18 14C18 11.5 17 9 15.5 7C15.5 9.5 14 11 12 11C10 11 9 9.5 9.8 7.2C10.5 5 11.5 3.5 12 2Z"
            fill="url(#dragon-logo-grad)"
          />
          <ellipse cx="12" cy="15" rx="3.5" ry="2" fill="#FFDBCA" />
          <circle cx="12" cy="15" r="1" fill="#542200" />
          <defs>
            <linearGradient id="dragon-logo-grad" x1="6" y1="2" x2="18" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFB68E" />
              <stop offset="0.5" stopColor="#FF7A1A" />
              <stop offset="1" stopColor="#528DFF" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-secondary-container shadow-[0_0_6px_#528dff] animate-pulse"></span>
      </div>
    </div>
  );
};
