import React, { useState } from 'react';
import { TASTING_STEPS } from '../data/menuData';
import { Flame, Sparkles, Check, Plus, Wine, Info, RotateCcw } from 'lucide-react';
import { calculateTastingPrice, formatCurrency, getKiLevelColor } from '../utils/omakase';
import { MenuItem } from '../types';

interface TastingFlightBuilderProps {
  onAddCustomFlightToTray: (customFlight: MenuItem, summary: string) => void;
}

export const TastingFlightBuilder: React.FC<TastingFlightBuilderProps> = ({
  onAddCustomFlightToTray,
}) => {
  const basePrice = 145; // Base price for custom 4-course bespoke omakase
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({
    0: TASTING_STEPS[0].options[0].id,
    1: TASTING_STEPS[1].options[0].id,
    2: TASTING_STEPS[2].options[0].id,
    3: TASTING_STEPS[3].options[0].id,
  });
  const [torchIntensity, setTorchIntensity] = useState<'cold-raw' | 'flame-kissed' | 'ultra-seared'>('flame-kissed');
  const [includeSake, setIncludeSake] = useState(true);
  const [justAdded, setJustAdded] = useState(false);

  const currentStep = TASTING_STEPS[activeStepIndex];

  // Calculate dynamic price
  const selectedOptionIds = Object.values(selectedOptions);
  const currentTotal = calculateTastingPrice(basePrice, selectedOptionIds, TASTING_STEPS, includeSake);

  const handleSelectOption = (stepIdx: number, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [stepIdx]: optionId,
    }));
  };

  const handleReset = () => {
    setSelectedOptions({
      0: TASTING_STEPS[0].options[0].id,
      1: TASTING_STEPS[1].options[0].id,
      2: TASTING_STEPS[2].options[0].id,
      3: TASTING_STEPS[3].options[0].id,
    });
    setTorchIntensity('flame-kissed');
    setIncludeSake(true);
    setActiveStepIndex(0);
  };

  const handleAddFlightToTray = () => {
    // Generate summary
    const chosenItems = TASTING_STEPS.map((step, idx) => {
      const optId = selectedOptions[idx];
      const opt = step.options.find((o) => o.id === optId);
      return opt ? opt.name : '';
    }).join(' • ');

    const customFlightItem: MenuItem = {
      id: `custom-flight-${Date.now()}`,
      name: 'Custom Bespoke Omakase Flight (4-Course)',
      japaneseName: '特撰 龍気おまかせ四品',
      category: 'flights',
      price: currentTotal,
      kiLevel: includeSake ? 'divine' : 'ascended',
      agingDuration: 'Multi-Cellar Bespoke',
      thermalNotes: torchIntensity === 'ultra-seared' ? 'Ultra-Torched 350°C' : torchIntensity === 'flame-kissed' ? 'Charcoal Kissed 280°C' : 'Cold-Cured 4°C',
      cutSpec: 'Custom Itamae Selection',
      description: `Bespoke course selection: ${chosenItems}. Sear level: ${torchIntensity}. ${includeSake ? 'Includes Grand Cru Sake Flight.' : ''}`,
      ingredients: ['Custom Omakase Cuts', 'Toyosu Weekly Seasonal Catch', 'Akazu Warm Rice'],
      dietary: ['Bespoke Omakase'],
      imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1200&q=80',
    };

    onAddCustomFlightToTray(customFlightItem, chosenItems);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <section id="tasting-builder" className="py-16 md:py-24 bg-[#0C0E15] border-y border-[#F4F5F8]/06 relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#191D28] border border-[#1677FF]/40 text-[#AFC6FF]">
            <Sparkles className="w-3.5 h-3.5 text-[#1677FF]" />
            <span className="font-space font-bold text-[11px] uppercase tracking-[0.14em]">
              Interactive Omakase Configurator
            </span>
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F4F5F8]">
            Architect Your Flight
          </h2>
          <p className="text-sm sm:text-base text-[#8A92A6] font-sans">
            Customize each tier of your four-course journey. Calibrate thermal sears, select rare protein pairings, and synchronize with vintage sake.
          </p>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {TASTING_STEPS.map((step, idx) => {
            const isCompleted = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            const selectedOptId = selectedOptions[idx];
            const chosenOption = step.options.find((o) => o.id === selectedOptId);

            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#191D28] border-[#FF7A1A] shadow-[0_0_20px_rgba(255,122,26,0.25)]'
                    : isCompleted
                    ? 'bg-[#191D28]/70 border-[#1677FF]/40 hover:border-[#1677FF]'
                    : 'bg-[#11131A] border-[#F4F5F8]/08 hover:border-[#F4F5F8]/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-space mb-1.5">
                  <span className={`font-bold ${isCurrent ? 'text-[#FF7A1A]' : 'text-[#8A92A6]'}`}>
                    COURSE 0{step.stepNumber}
                  </span>
                  {isCompleted && <Check className="w-3.5 h-3.5 text-[#1677FF]" />}
                </div>
                <h4 className="font-syne font-bold text-xs sm:text-sm text-[#F4F5F8] line-clamp-1">
                  {step.courseTitle.split(':')[1] || step.courseTitle}
                </h4>
                <p className="text-[11px] text-[#8A92A6] line-clamp-1 font-space mt-0.5">
                  {chosenOption ? chosenOption.name : 'Select item'}
                </p>
              </button>
            );
          })}
        </div>

        {/* Current Active Step Options Showcase */}
        <div className="bg-[#191D28] border border-[#F4F5F8]/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F4F5F8]/08 mb-6">
            <div>
              <span className="font-space text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
                Step 0{currentStep.stepNumber} of 04
              </span>
              <h3 className="font-syne font-bold text-2xl text-[#F4F5F8] mt-0.5">
                {currentStep.courseTitle}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#8A92A6] mt-1">
                {currentStep.subtitle}
              </p>
            </div>
            <div className="text-right">
              <span className="font-space text-xs text-[#8A92A6] block">
                Tasting Flight Running Total
              </span>
              <span className="font-space font-bold text-2xl sm:text-3xl text-[#FF7A1A]">
                {formatCurrency(currentTotal)}
              </span>
            </div>
          </div>

          {/* Option Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentStep.options.map((opt) => {
              const isSelected = selectedOptions[activeStepIndex] === opt.id;
              const kiTheme = getKiLevelColor(opt.kiLevel);

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(activeStepIndex, opt.id)}
                  className={`group relative rounded-xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E2332] border-[#FF7A1A] shadow-[0_0_24px_rgba(255,122,26,0.3)]'
                      : 'bg-[#11131A] border-[#F4F5F8]/08 hover:border-[#F4F5F8]/25 hover:bg-[#191D28]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#090B12]">
                      <img
                        src={opt.imageUrl}
                        alt={opt.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-transparent"></div>
                      
                      {/* Ki Orb Badge */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#090B12]/80 backdrop-blur-md border border-[#F4F5F8]/10">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: kiTheme.dotColor }}
                        />
                        <span className="font-space text-[10px] uppercase font-bold" style={{ color: kiTheme.badgeText }}>
                          {kiTheme.label}
                        </span>
                      </div>

                      {/* Addon Price Badge */}
                      {opt.extraPrice > 0 && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#FF7A1A] text-[#090B12] font-space text-[11px] font-bold">
                          +{formatCurrency(opt.extraPrice)}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-syne font-bold text-base text-[#F4F5F8]">
                          {opt.name}
                        </h4>
                      </div>
                      <p className="font-space text-xs text-[#FFB68E] mt-0.5">
                        {opt.japaneseName}
                      </p>
                      <p className="font-sans text-xs text-[#8A92A6] mt-2 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F4F5F8]/08 flex items-center justify-between">
                    <span className="font-space text-[11px] text-[#8A92A6]">
                      {opt.thermalNote}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-[#FF7A1A] border-[#FF7A1A] text-[#090B12]'
                          : 'border-[#F4F5F8]/20 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-[#F4F5F8]/08 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeStepIndex === 0}
              className={`font-space text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                activeStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[#8A92A6]'
                  : 'border-[#F4F5F8]/15 text-[#F4F5F8] hover:bg-[#1E2332]'
              }`}
            >
              Previous Course
            </button>

            <div className="flex items-center gap-2">
              {TASTING_STEPS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveStepIndex(dotIdx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === activeStepIndex
                      ? 'w-6 bg-[#FF7A1A]'
                      : 'bg-[#F4F5F8]/20 hover:bg-[#F4F5F8]/40'
                  }`}
                  aria-label={`Go to Course ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveStepIndex((prev) => Math.min(TASTING_STEPS.length - 1, prev + 1))}
              disabled={activeStepIndex === TASTING_STEPS.length - 1}
              className={`font-space text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                activeStepIndex === TASTING_STEPS.length - 1
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[#8A92A6]'
                  : 'border-[#1677FF]/50 text-[#AFC6FF] hover:bg-[#1677FF]/15'
              }`}
            >
              Next Course (0{Math.min(4, activeStepIndex + 2)})
            </button>
          </div>
        </div>

        {/* Thermal & Pairing Customizer Tray Banner */}
        <div className="bg-[#12151E] border border-[#1677FF]/30 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Torch Heat Selector */}
          <div className="space-y-3 w-full lg:w-auto">
            <span className="font-space text-xs font-bold uppercase tracking-wider text-[#AFC6FF] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#FF7A1A]" />
              Charcoal Thermal Sear Calibration
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'cold-raw', label: 'Edomae Cold-Raw', temp: '4°C Chill' },
                { id: 'flame-kissed', label: 'Binchotan Kissed (Recommended)', temp: '280°C Flash' },
                { id: 'ultra-seared', label: 'Ultra-Torched Caramelized', temp: '350°C Sear' },
              ].map((torch) => (
                <button
                  key={torch.id}
                  onClick={() => setTorchIntensity(torch.id as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-space transition-all cursor-pointer ${
                    torchIntensity === torch.id
                      ? 'bg-[#FF7A1A] text-[#090B12] font-bold shadow-[0_0_12px_rgba(255,122,26,0.4)]'
                      : 'bg-[#191D28] text-[#8A92A6] hover:text-[#F4F5F8] border border-[#F4F5F8]/10'
                  }`}
                >
                  <span className="block">{torch.label}</span>
                  <span className="text-[10px] opacity-80">{torch.temp}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sake Pairing Switch */}
          <div className="flex items-center gap-4 bg-[#191D28] p-4 rounded-xl border border-[#F4F5F8]/10 w-full lg:w-auto">
            <div className="w-10 h-10 rounded-lg bg-[#762DFF]/20 border border-[#762DFF]/40 flex items-center justify-center shrink-0">
              <Wine className="w-5 h-5 text-[#D0BCFF]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-syne font-bold text-sm text-[#F4F5F8]">
                  Junmai Daiginjo Sake Flight
                </span>
                <span className="font-space text-xs text-[#FF7A1A] font-bold">+$45</span>
              </div>
              <p className="text-[11px] text-[#8A92A6] font-sans">
                3 cellar-aged 45ml pours matched to course thermal profiles
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeSake}
                onChange={(e) => setIncludeSake(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#11131A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF7A1A]"></div>
            </label>
          </div>

          {/* Add to Tray Final Action */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <button
              onClick={handleReset}
              className="p-3 rounded-lg bg-[#191D28] hover:bg-[#1E2332] border border-[#F4F5F8]/10 text-[#8A92A6] hover:text-[#F4F5F8] transition-colors cursor-pointer"
              title="Reset Selections"
              aria-label="Reset Configurator"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleAddFlightToTray}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#FF7A1A] hover:bg-[#ff8933] text-[#090B12] font-space font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-lg transition-all duration-200 glow-ki active:scale-95 cursor-pointer"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Omakase Tray!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Bespoke Flight ({formatCurrency(currentTotal)})</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
