import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Flame, Sparkles, Plus, Minus, Check, ShieldCheck, Thermometer } from 'lucide-react';
import { formatCurrency, getKiLevelColor } from '../utils/omakase';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToTray: (item: MenuItem, quantity: number) => void;
  isInTray: boolean;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToTray,
  isInTray,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!item) return null;

  const kiTheme = getKiLevelColor(item.kiLevel);

  const handleAdd = () => {
    onAddToTray(item, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090B12]/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#1E2332] rounded-2xl border border-[#F4F5F8]/15 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.8),0_0_24px_rgba(22,119,255,0.18)] overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#090B12]/80 text-[#F4F5F8] hover:text-[#FF7A1A] border border-[#F4F5F8]/15 transition-colors cursor-pointer"
          aria-label="Close Dish Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Hero Image with Micro Gradient */}
        <div className="relative aspect-[16/9] w-full shrink-0 bg-[#090B12] overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2332] via-[#1E2332]/30 to-transparent"></div>

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#090B12]/85 backdrop-blur-md border border-[#F4F5F8]/15">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: kiTheme.dotColor }}
              />
              <span className="font-space font-bold text-xs uppercase" style={{ color: kiTheme.badgeText }}>
                {kiTheme.label}
              </span>
            </div>

            {item.agingDuration && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#090B12]/85 backdrop-blur-md border border-[#1677FF]/40 text-xs font-space text-[#AFC6FF]">
                <Sparkles className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>{item.agingDuration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 font-sans">
          
          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#F4F5F8]/08 pb-4">
            <div>
              <h2 id="dish-modal-title" className="font-syne font-bold text-2xl sm:text-3xl text-[#F4F5F8]">
                {item.name}
              </h2>
              <p className="font-space text-sm text-[#FFB68E] mt-0.5">
                {item.japaneseName}
              </p>
            </div>
            <div className="font-space font-bold text-2xl sm:text-3xl text-[#FF7A1A]">
              {formatCurrency(item.price)}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#F4F5F8]/90 leading-relaxed font-sans">
            {item.description}
          </p>

          {/* Technical Culinary Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#12151E] p-4 rounded-xl border border-[#F4F5F8]/08 font-space text-xs">
            <div className="space-y-1">
              <span className="text-[#8A92A6] uppercase text-[10px] tracking-wider block flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-[#FF7A1A]" />
                Thermal Calibration
              </span>
              <span className="text-[#F4F5F8] font-medium block">
                {item.thermalNotes}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8A92A6] uppercase text-[10px] tracking-wider block flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#1677FF]" />
                Blade & Cut Protocol
              </span>
              <span className="text-[#F4F5F8] font-medium block">
                {item.cutSpec}
              </span>
            </div>
          </div>

          {/* Ingredients Breakdown */}
          <div className="space-y-2">
            <span className="font-space text-xs font-bold uppercase tracking-wider text-[#8A92A6]">
              Key Ingredients & Rare Seasonings
            </span>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#191D28] border border-[#F4F5F8]/10 text-xs font-space text-[#F4F5F8]"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Sommelier Pairing Note */}
          {item.pairingNote && (
            <div className="p-3.5 rounded-xl bg-[#762DFF]/15 border border-[#762DFF]/30 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#D0BCFF] shrink-0 mt-0.5" />
              <div>
                <span className="block font-space text-xs font-bold text-[#D0BCFF] uppercase tracking-wider">
                  Itamae Pairing Recommendation
                </span>
                <p className="text-xs text-[#F4F5F8]/85 mt-0.5 font-sans">
                  {item.pairingNote}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-6 bg-[#12151E] border-t border-[#F4F5F8]/10 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-[#191D28] border border-[#F4F5F8]/10 rounded-lg p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1.5 rounded hover:bg-[#11131A] text-[#8A92A6] hover:text-[#F4F5F8] transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-space font-bold text-sm text-[#F4F5F8] w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1.5 rounded hover:bg-[#11131A] text-[#8A92A6] hover:text-[#F4F5F8] transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Tray Button */}
          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FF7A1A] hover:bg-[#ff8933] text-[#090B12] font-space font-bold uppercase text-xs tracking-wider py-3.5 px-6 rounded-lg transition-all duration-200 glow-ki active:scale-95 cursor-pointer"
          >
            {addedNotice ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Tray!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add {quantity} to Tray • {formatCurrency(item.price * quantity)}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
