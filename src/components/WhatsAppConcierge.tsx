import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Flame, PhoneCall, Check } from 'lucide-react';

interface WhatsAppConciergeProps {
  isOpen: boolean;
  onToggle: () => void;
  initialMessage?: string;
}

export const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({
  isOpen,
  onToggle,
  initialMessage = '',
}) => {
  const [inputMessage, setInputMessage] = useState(initialMessage);
  const [messages, setMessages] = useState<Array<{ sender: 'concierge' | 'user'; text: string; time: string }>>([
    {
      sender: 'concierge',
      text: 'Konbanwa. Welcome to the Supershushi Bar VIP Concierge desk. How may we curate your dining frequency tonight?',
      time: '19:02',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Reserve 10-seat counter buyout',
    'Ask about tonight’s Toyosu auction catch',
    'Dietary & allergy consultation',
    'Vintage Junmai Daiginjo bottle list',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate smart Itamae concierge response
    setTimeout(() => {
      let reply = 'Thank you for your inquiry. Our Itamae team has logged this request. To finalize instant reservation or dietary adjustments, our master concierge is available directly on WhatsApp at +1 (415) 890-KI99.';
      if (text.toLowerCase().includes('toyosu') || text.toLowerCase().includes('catch')) {
        reply = 'Tonight we received Southern Bluefin Otoro (21-day aged), Hokkaido Murasaki Uni from Ezo bafun divers, and live Botan Ebi spot prawns flown via Tokyo air-freight this morning.';
      } else if (text.toLowerCase().includes('buyout') || text.toLowerCase().includes('seat')) {
        reply = 'Exclusive 10-seat counter buyouts include customized 18-course tasting with Master Takahashi and dedicated sake sommelier. Dates are reserved with 48h advance notice.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      inputMessage || 'Hello Supershushi Bar! I am interested in an omakase reservation.'
    );
    // WhatsApp direct link
    window.open(`https://wa.me/14158905499?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Action Button strictly according to design spec:
          Fixed position bottom-right anchor. #090B12 circular chassis bounded by an animated dual-gradient border (#1677FF to #FF7A1A). Inner icon in Ice White with persistent pulse halo. */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={onToggle}
          className="relative w-14 h-14 rounded-full bg-[#090B12] p-[2px] shadow-[0_0_24px_rgba(22,119,255,0.4)] hover:shadow-[0_0_30px_rgba(255,122,26,0.5)] transition-all duration-300 group cursor-pointer focus:outline-none"
          aria-label="Open WhatsApp VIP Concierge"
        >
          {/* Animated dual-gradient border: #1677FF to #FF7A1A */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1677FF] via-[#762DFF] to-[#FF7A1A] animate-spin-slow opacity-90 group-hover:opacity-100"></div>

          {/* Persistent pulse halo rgba(22, 119, 255, 0.3) */}
          <div className="absolute -inset-1 rounded-full bg-[#1677FF]/30 blur-sm animate-pulse-ki pointer-events-none"></div>

          {/* Inner chassis #090B12 */}
          <div className="relative w-full h-full rounded-full bg-[#090B12] flex items-center justify-center transition-transform group-hover:scale-95">
            {isOpen ? (
              <X className="w-6 h-6 text-[#F4F5F8]" />
            ) : (
              <MessageCircle className="w-6 h-6 text-[#F4F5F8] group-hover:text-[#FF7A1A] transition-colors" />
            )}
          </div>

          {/* Online green indicator dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00e676] border-2 border-[#090B12] shadow-[0_0_8px_#00e676]"></span>
        </button>
      </div>

      {/* Concierge Interactive Chat Flyout */}
      {isOpen && (
        <div
          className="fixed bottom-36 md:bottom-24 right-4 sm:right-6 z-40 w-[92vw] sm:w-96 bg-[#1E2332] border border-[#F4F5F8]/15 rounded-2xl shadow-[0_12px_36px_-8px_rgba(0,0,0,0.8),0_0_24px_rgba(22,119,255,0.2)] overflow-hidden flex flex-col font-sans animate-fadeIn"
          role="dialog"
          aria-labelledby="concierge-title"
        >
          {/* Header */}
          <div className="p-4 bg-[#12151E] border-b border-[#F4F5F8]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#191D28] border border-[#FF7A1A]/40 flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#FF7A1A]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00e676] shadow-[0_0_4px_#00e676]"></span>
              </div>
              <div>
                <h3 id="concierge-title" className="font-syne font-bold text-sm text-[#F4F5F8]">
                  Supershushi VIP Concierge
                </h3>
                <span className="font-space text-[10px] text-[#AFC6FF] flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1677FF] animate-pulse"></span>
                  Active Itamae Desk • WhatsApp Verified
                </span>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="text-[#8A92A6] hover:text-[#F4F5F8] p-1 cursor-pointer"
              aria-label="Close Concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-[#090B12]/50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#FF7A1A] text-[#090B12] font-medium rounded-tr-none font-space'
                      : 'bg-[#191D28] border border-[#F4F5F8]/10 text-[#F4F5F8] rounded-tl-none font-sans'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-[#8A92A6] font-space mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-[#191D28] rounded-lg w-16 text-[#8A92A6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#762DFF] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Quick prompt suggestions */}
          <div className="p-2.5 bg-[#12151E] border-t border-[#F4F5F8]/08 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#191D28] hover:bg-[#1E2332] border border-[#F4F5F8]/10 text-[10px] font-space text-[#AFC6FF] transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Dispatch Actions */}
          <div className="p-3 bg-[#12151E] border-t border-[#F4F5F8]/10 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Master Itamae concierge..."
              className="flex-1 bg-[#191D28] border border-[#F4F5F8]/10 rounded-lg px-3 py-2 text-xs text-[#F4F5F8] placeholder-[#8A92A6] font-space focus:outline-none focus:border-[#1677FF]"
            />

            <button
              onClick={() => handleSend()}
              className="p-2 rounded-lg bg-[#FF7A1A] text-[#090B12] hover:bg-[#ff8933] transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>

            <button
              onClick={handleDirectWhatsApp}
              title="Open WhatsApp app"
              className="p-2 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors cursor-pointer"
              aria-label="Open direct in WhatsApp"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
