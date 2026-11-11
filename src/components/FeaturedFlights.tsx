import React from 'react';
import { MenuItem } from '../types';
import { Flame, Sparkles, Plus, Eye, Check } from 'lucide-react';
import { getKiLevelColor, formatCurrency } from '../utils/omakase';

interface FeaturedFlightsProps {
  flights: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddToTray: (item: MenuItem) => void;
  trayItemIds: string[];
}

export const FeaturedFlights: React.FC<FeaturedFlightsProps> = ({
  flights,
  onSelectItem,
  onAddToTray,
  trayItemIds,
}) => {
  return (
    <section id="featured-flights" className="py-16 md:py-24 border-t border-[#F4F5F8]/06 relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191D28] border border-[#FF7A1A]/30 text-[#FFB68E]">
              <span className="w-2 h-2 rounded-full bg-[#FF7A1A] shadow-[0_0_8px_#FF7A1A]"></span>
              <span className="font-space font-bold text-[11px] uppercase tracking-[0.14em]">
                Master Itamae Sequences
              </span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-[#F4F5F8] tracking-tight">
              Flagship Omakase Flights
            </h2>
            <p className="text-sm sm:text-base text-[#8A92A6] max-w-xl font-sans">
              Curated course progressions designed to elevate taste receptors through strict thermal contrasts, binchotan sear-torch caramelization, and sub-zero dry aging.
            </p>
          </div>

          <div className="flex items-center gap-2 font-space text-xs text-[#AFC6FF]">
            <Sparkles className="w-4 h-4 text-[#1677FF]" />
            <span>Seasonal Toyosu Market Inflow: November Edition</span>
          </div>
        </div>

        {/* 3 Featured Flights Monolithic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flights.map((flight) => {
            const kiTheme = getKiLevelColor(flight.kiLevel);
            const isInTray = trayItemIds.includes(flight.id);

            return (
              <div
                key={flight.id}
                className="group relative flex flex-col rounded-xl bg-[#191D28] border border-[#F4F5F8]/10 hover:border-[#FF7A1A]/50 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* Culinary Artifact Imagery with Micro-gradient mask */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#11131A]">
                  <img
                    src={flight.imageUrl}
                    alt={flight.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Micro gradient mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191D28] via-[#191D28]/30 to-transparent"></div>

                  {/* Course Sequence Marker in Left Column */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#090B12]/80 backdrop-blur-md border border-[#F4F5F8]/15 font-space font-bold text-xs text-[#F4F5F8]">
                    SEQ {flight.courseSequence}
                  </div>

                  {/* Transformation Orb Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#090B12]/80 backdrop-blur-md border border-[#F4F5F8]/15">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: kiTheme.dotColor,
                        boxShadow: `0 0 8px ${kiTheme.dotColor}`
                      }}
                    />
                    <span className="font-space font-bold text-[10px] uppercase tracking-wider" style={{ color: kiTheme.badgeText }}>
                      {kiTheme.label}
                    </span>
                  </div>

                  {/* Price Tag in Space Grotesk Mono-Price */}
                  <div className="absolute bottom-3 right-3 font-space font-bold text-2xl text-[#FF7A1A] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {formatCurrency(flight.price)}
                  </div>
                </div>

                {/* Card Content & Culinary Specs */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-syne font-bold text-xl text-[#F4F5F8] group-hover:text-[#FF7A1A] transition-colors">
                        {flight.name}
                      </h3>
                    </div>
                    <p className="font-space text-xs text-[#FFB68E]/80">
                      {flight.japaneseName}
                    </p>
                    <p className="text-xs sm:text-sm text-[#8A92A6] line-clamp-3 leading-relaxed font-sans">
                      {flight.description}
                    </p>
                  </div>

                  {/* Technical Culinary Specs in Space Grotesk */}
                  <div className="pt-3 border-t border-[#F4F5F8]/06 space-y-2 font-space text-xs">
                    <div className="flex justify-between items-center text-[#8A92A6]">
                      <span className="text-[11px] uppercase tracking-wider">Thermal Dynamic:</span>
                      <span className="text-[#F4F5F8] font-medium text-right text-[11px] truncate max-w-[190px]">
                        {flight.thermalNotes}
                      </span>
                    </div>
                    {flight.agingDuration && (
                      <div className="flex justify-between items-center text-[#8A92A6]">
                        <span className="text-[11px] uppercase tracking-wider">Aging Spec:</span>
                        <span className="text-[#AFC6FF] font-medium text-[11px]">
                          {flight.agingDuration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onSelectItem(flight)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#11131A] hover:bg-[#1E2332] border border-[#F4F5F8]/10 text-xs font-space font-semibold text-[#F4F5F8] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#1677FF]" />
                      <span>Details & Specs</span>
                    </button>

                    <button
                      onClick={() => onAddToTray(flight)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-space font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isInTray
                          ? 'bg-[#1677FF]/20 border border-[#1677FF] text-[#AFC6FF]'
                          : 'bg-[#FF7A1A] hover:bg-[#ff8933] text-[#090B12] glow-ki-sm active:scale-95'
                      }`}
                    >
                      {isInTray ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Tray ({flight.price})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
