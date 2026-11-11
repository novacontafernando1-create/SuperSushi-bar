import React from 'react';
import { CHEF_PHILOSOPHY } from '../data/menuData';
import { Flame, ShieldCheck, Sparkles, Award, Compass } from 'lucide-react';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 md:py-28 relative border-t border-[#F4F5F8]/06 bg-[#0B0D14]">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#762DFF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#FF7A1A]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Asymmetrical 12-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (6 cols): Craft Narrative & Principles */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#191D28] border border-[#762DFF]/40 text-[#D0BCFF]">
              <Sparkles className="w-3.5 h-3.5 text-[#762DFF]" />
              <span className="font-space font-bold text-[11px] uppercase tracking-[0.14em]">
                The Obsidian Craft Codex
              </span>
            </div>

            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F4F5F8] tracking-tight leading-[1.15]">
              Where Ancient Fire Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FFB68E] to-[#1677FF]">
                Celestial Precision.
              </span>
            </h2>

            <p className="text-base text-[#F4F5F8]/80 leading-relaxed font-sans">
              Supershushi Bar was established to transcend the boundaries between ancestral Edomae discipline and modern kinetic gastronomy. We eliminate distracting decor to focus exclusively on three fundamental pillars: temperature, time, and blade geometry.
            </p>

            {/* Principles cards */}
            <div className="space-y-4 pt-2">
              {CHEF_PHILOSOPHY.principles.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#191D28] border border-[#F4F5F8]/08 hover:border-[#1677FF]/40 transition-colors flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#11131A] border border-[#F4F5F8]/10 flex items-center justify-center shrink-0 font-space font-bold text-xs text-[#FF7A1A]">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-sm text-[#F4F5F8]">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#8A92A6] mt-1 leading-relaxed font-sans">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Master Chef signature card */}
            <div className="pt-4 border-t border-[#F4F5F8]/08 flex items-center justify-between">
              <div>
                <span className="font-syne font-bold text-sm text-[#F4F5F8] block">
                  {CHEF_PHILOSOPHY.headChef}
                </span>
                <span className="font-space text-xs text-[#FFB68E]">
                  {CHEF_PHILOSOPHY.title}
                </span>
              </div>
              <div className="text-right">
                <span className="font-space text-[10px] uppercase text-[#8A92A6] block">
                  Blade Lineage
                </span>
                <span className="font-space font-bold text-xs text-[#AFC6FF]">
                  Sakai Takayuki Honyaki
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Culinary Workshop & Visual Slate Plate */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#F4F5F8]/10 bg-[#191D28] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80"
                  alt="Itamae Master executing precision sushi cut"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B12] via-[#090B12]/40 to-transparent"></div>
              </div>

              {/* Bottom Slate Spec Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-xl bg-[#191D28]/95 backdrop-blur-md border border-[#F4F5F8]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-space text-xs font-bold uppercase text-[#FF7A1A] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#FF7A1A]" />
                    White Oak Binchotan Charcoal
                  </span>
                  <span className="font-space text-xs text-[#8A92A6]">
                    Kishu Province, Japan
                  </span>
                </div>
                <p className="text-xs text-[#8A92A6] font-sans">
                  Produces intense radiant infrared energy without smoke soot, sealing fat vapors directly back into the tuna fibers within 1.8 seconds.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F4F5F8]/08 text-center font-space">
                  <div>
                    <span className="block text-[10px] text-[#8A92A6] uppercase">Core Temp</span>
                    <span className="text-xs font-bold text-[#F4F5F8]">1,000°C</span>
                  </div>
                  <div className="border-x border-[#F4F5F8]/08">
                    <span className="block text-[10px] text-[#8A92A6] uppercase">Smoke Carbon</span>
                    <span className="text-xs font-bold text-[#FF7A1A]">0.0% Pure</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#8A92A6] uppercase">Rice Temp</span>
                    <span className="text-xs font-bold text-[#1677FF]">37°C Constant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
