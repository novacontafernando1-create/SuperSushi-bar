import React, { useState } from 'react';
import { TrayItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { calculateTrayTotals, formatCurrency } from '../utils/omakase';

interface TrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: TrayItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
  onOpenConcierge: (message: string) => void;
}

export const TrayDrawer: React.FC<TrayDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
  onOpenConcierge,
}) => {
  const [orderSubmitted, setOrderSubmitted] = useState<string | null>(null);
  const [tableNumber, setTableNumber] = useState('Counter Seat 04');

  if (!isOpen) return null;

  const { subtotal, serviceCharge, total, totalQuantity } = calculateTrayTotals(items);

  const handlePlaceOrder = () => {
    const orderId = `KI-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderSubmitted(orderId);
  };

  const handleSendToConcierge = () => {
    const itemSummary = items
      .map((t) => `${t.quantity}x ${t.item.name} ($${(t.customPrice ?? t.item.price) * t.quantity})`)
      .join(', ');
    const msg = `Hello Supershushi Bar! I'd like to place an order for: ${itemSummary}. Total: $${total}. Table/Seating: ${tableNumber}.`;
    onOpenConcierge(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#090B12]/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Panel */}
      <div
        className="w-full max-w-md bg-[#191D28] border-l border-[#F4F5F8]/10 h-full flex flex-col shadow-[0_12px_36px_-8px_rgba(0,0,0,0.8),0_0_24px_rgba(22,119,255,0.15)] z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tray-drawer-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#F4F5F8]/08 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF7A1A]/15 border border-[#FF7A1A]/40 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#FF7A1A]" />
            </div>
            <div>
              <h2 id="tray-drawer-title" className="font-syne font-bold text-lg text-[#F4F5F8]">
                Your Omakase Tray
              </h2>
              <span className="font-space text-xs text-[#8A92A6]">
                {totalQuantity} {totalQuantity === 1 ? 'Artifact' : 'Artifacts'} Selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#11131A] text-[#8A92A6] hover:text-[#F4F5F8] transition-colors cursor-pointer"
            aria-label="Close Tray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Success State */}
        {orderSubmitted ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1677FF]/20 border border-[#1677FF] flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-[#AFC6FF]" />
            </div>
            <h3 className="font-syne font-bold text-2xl text-[#F4F5F8]">
              Order Transmitted to Kitchen!
            </h3>
            <p className="font-space text-xs text-[#FF7A1A] font-bold">
              Ticket ID: #{orderSubmitted}
            </p>
            <p className="text-xs text-[#8A92A6] font-sans max-w-xs">
              Master Takahashi's counter team has received your selections. Torched items are prepared live upon order confirmation.
            </p>
            <div className="pt-4 flex flex-col gap-2 w-full">
              <button
                onClick={handleSendToConcierge}
                className="w-full py-3 rounded-lg bg-[#1677FF] hover:bg-[#2c84ff] text-[#F4F5F8] font-space text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(22,119,255,0.4)]"
              >
                Share Ticket via WhatsApp Concierge
              </button>
              <button
                onClick={() => {
                  onClearTray();
                  setOrderSubmitted(null);
                  onClose();
                }}
                className="w-full py-2.5 rounded-lg bg-[#11131A] text-[#8A92A6] hover:text-[#F4F5F8] font-space text-xs font-medium cursor-pointer"
              >
                Close & Return to Menu
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#F4F5F8]/06">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[#8A92A6]/30 mx-auto" />
                  <p className="font-syne font-bold text-base text-[#F4F5F8]">
                    Your Omakase Tray is Empty
                  </p>
                  <p className="font-space text-xs text-[#8A92A6] max-w-xs mx-auto">
                    Explore our flagship flights or architect your bespoke 4-course sequence to populate your tray.
                  </p>
                </div>
              ) : (
                items.map((trayItem) => {
                  const effectivePrice = trayItem.customPrice ?? trayItem.item.price;

                  return (
                    <div key={trayItem.id} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={trayItem.item.imageUrl}
                            alt={trayItem.item.name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#F4F5F8]/10"
                          />
                          <div>
                            <h4 className="font-syne font-bold text-sm text-[#F4F5F8]">
                              {trayItem.item.name}
                            </h4>
                            <p className="font-space text-[11px] text-[#FFB68E]">
                              {trayItem.item.japaneseName}
                            </p>
                            {trayItem.selectedOptions && (
                              <p className="text-[10px] text-[#8A92A6] line-clamp-1 max-w-[200px] mt-0.5">
                                {trayItem.selectedOptions}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="font-space font-bold text-sm text-[#FF7A1A]">
                          {formatCurrency(effectivePrice * trayItem.quantity)}
                        </span>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 bg-[#11131A] rounded border border-[#F4F5F8]/08 px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(trayItem.id, trayItem.quantity - 1)}
                            className="p-1 text-[#8A92A6] hover:text-[#F4F5F8] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-space text-xs font-bold text-[#F4F5F8] w-4 text-center">
                            {trayItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(trayItem.id, trayItem.quantity + 1)}
                            className="p-1 text-[#8A92A6] hover:text-[#F4F5F8] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(trayItem.id)}
                          className="text-[#8A92A6] hover:text-[#ffb4ab] transition-colors p-1 cursor-pointer"
                          aria-label={`Remove ${trayItem.item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Checkout Sheet */}
            {items.length > 0 && (
              <div className="p-6 bg-[#12151E] border-t border-[#F4F5F8]/10 space-y-4">
                {/* Seating Location Tag */}
                <div className="flex items-center justify-between text-xs font-space text-[#8A92A6]">
                  <span>Serving Destination:</span>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="bg-[#191D28] border border-[#F4F5F8]/10 rounded px-2 py-1 text-[#F4F5F8] font-space text-xs focus:outline-none focus:border-[#1677FF]"
                  >
                    <option value="Counter Seat 01">Counter Seat 01</option>
                    <option value="Counter Seat 04">Counter Seat 04 (Front Robata)</option>
                    <option value="Counter Seat 08">Counter Seat 08</option>
                    <option value="Celestial Alcove 01">Celestial Alcove 01</option>
                    <option value="Takeout VIP Box">Takeout / Curbside VIP Box</option>
                  </select>
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-1.5 font-space text-xs border-t border-[#F4F5F8]/06 pt-3">
                  <div className="flex justify-between text-[#8A92A6]">
                    <span>Artifacts Subtotal</span>
                    <span className="text-[#F4F5F8]">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#8A92A6]">
                    <span>Izakaya Hospitality (10%)</span>
                    <span className="text-[#F4F5F8]">{formatCurrency(serviceCharge)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#F4F5F8] pt-2 border-t border-[#F4F5F8]/10">
                    <span>Grand Total</span>
                    <span className="text-[#FF7A1A] text-lg font-space">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full flex items-center justify-center gap-2 bg-[#FF7A1A] hover:bg-[#ff8933] text-[#090B12] font-space font-bold uppercase text-xs tracking-wider py-4 rounded-lg transition-all duration-200 glow-ki active:scale-95 cursor-pointer"
                >
                  <span>Transmit Order to Itamae</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
