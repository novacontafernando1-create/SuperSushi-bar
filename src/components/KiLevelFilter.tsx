import React from 'react';
import { KiLevel } from '../types';

interface KiLevelFilterProps {
  selectedKiLevel: KiLevel | 'all';
  onSelectKiLevel: (level: KiLevel | 'all') => void;
}

export const KiLevelFilter: React.FC<KiLevelFilterProps> = ({
  selectedKiLevel,
  onSelectKiLevel,
}) => {
  const levels: {
    id: KiLevel | 'all';
    label: string;
    sublabel: string;
    dotColor: string;
    glowStyle: string;
    activeBorder: string;
    activeBg: string;
  }[] = [
    {
      id: 'all',
      label: 'All Frequencies',
      sublabel: 'Full Menu',
      dotColor: '#F4F5F8',
      glowStyle: '',
      activeBorder: 'border-[#F4F5F8]',
      activeBg: 'bg-[#F4F5F8]/10'
    },
    {
      id: 'base',
      label: 'Base Form',
      sublabel: 'Pure Raw Precision',
      dotColor: '#8A92A6',
      glowStyle: '',
      activeBorder: 'border-[#8A92A6]',
      activeBg: 'bg-[#8A92A6]/15'
    },
    {
      id: 'super-ki',
      label: 'Super Ki (Level I)',
      sublabel: 'Binchotan Flame Torched',
      dotColor: '#FF7A1A',
      glowStyle: 'shadow-[0_0_10px_#FF7A1A]',
      activeBorder: 'border-[#FF7A1A]',
      activeBg: 'bg-[#FF7A1A]/15'
    },
    {
      id: 'ascended',
      label: 'Ascended Ki (Level II)',
      sublabel: '14-Day Dry-Aged & Truffle',
      dotColor: '#1677FF',
      glowStyle: 'shadow-[0_0_10px_#1677FF]',
      activeBorder: 'border-[#1677FF]',
      activeBg: 'bg-[#1677FF]/15'
    },
    {
      id: 'divine',
      label: 'Divine Tier (God Omakase)',
      sublabel: 'A5 Wagyu, 24K Gold, Caviar',
      dotColor: '#762DFF',
      glowStyle: 'shadow-[0_0_10px_#762DFF]',
      activeBorder: 'border-[#762DFF]',
      activeBg: 'bg-[#762DFF]/15'
    }
  ];

  return (
    <div className="w-full py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <span className="font-space font-bold text-[11px] uppercase tracking-[0.14em] text-[#FFB68E] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7A1A] animate-pulse"></span>
            Transformation Frequency Filter
          </span>
          <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F4F5F8] mt-1">
            Filter by Ki Intensity
          </h3>
        </div>
        <p className="font-space text-xs text-[#8A92A6] max-w-sm">
          Navigate from pure refrigerated sashimi cuts to incandescent binchotan sear-torched and celestial imperial reserves.
        </p>
      </div>

      {/* Filter Buttons Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {levels.map((level) => {
          const isActive = selectedKiLevel === level.id;
          return (
            <button
              key={level.id}
              onClick={() => onSelectKiLevel(level.id)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? `${level.activeBorder} ${level.activeBg} shadow-[0_4px_20px_rgba(0,0,0,0.5)]`
                  : 'bg-[#191D28]/60 border-[#F4F5F8]/08 hover:border-[#F4F5F8]/20 hover:bg-[#191D28]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: level.dotColor,
                    boxShadow: isActive ? `0 0 8px ${level.dotColor}` : 'none'
                  }}
                />
                <span className="font-space text-xs font-bold text-[#F4F5F8] truncate">
                  {level.label}
                </span>
              </div>
              <p className="text-[11px] text-[#8A92A6] font-space line-clamp-1">
                {level.sublabel}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
