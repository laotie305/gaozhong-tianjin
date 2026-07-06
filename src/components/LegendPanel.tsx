import React from 'react';
import { Train, Plane, Camera, UtensilsCrossed, Sparkles, GraduationCap } from 'lucide-react';

interface LegendPanelProps {
  showSchools: boolean;
  setShowSchools: (val: boolean) => void;
  showHubs: boolean;
  setShowHubs: (val: boolean) => void;
  showDelicacies: boolean;
  setShowDelicacies: (val: boolean) => void;
  showPhotoSpots: boolean;
  setShowPhotoSpots: (val: boolean) => void;
}

export default function LegendPanel({
  showSchools,
  setShowSchools,
  showHubs,
  setShowHubs,
  showDelicacies,
  setShowDelicacies,
  showPhotoSpots,
  setShowPhotoSpots,
}: LegendPanelProps) {
  return (
    <div className="bg-white border-2 border-[#5a5a40] rounded-2xl p-4 shadow-sm handwritten-card flex flex-wrap md:flex-col justify-around gap-4 font-sans">
      <h4 className="text-sm font-bold text-[#5a5a40] font-serif border-b border-[#e5e7eb] pb-1 w-full md:block hidden">
        🗺️ 图例与地图层控制
      </h4>

      {/* Layer 1: Schools */}
      <label className="flex items-center gap-2 cursor-pointer select-none py-1 group">
        <input
          type="checkbox"
          checked={showSchools}
          onChange={(e) => setShowSchools(e.target.checked)}
          className="w-4 h-4 rounded border-2 border-[#5a5a40] text-[#5a5a40] focus:ring-[#5a5a40] accent-[#5a5a40]"
        />
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#3d3d3d] group-hover:text-[#5a5a40] transition-colors">
          <div className="w-5 h-5 bg-[#5a5a40] rounded-full flex items-center justify-center">
            <GraduationCap className="w-3.5 h-3.5 text-white" />
          </div>
          天津高中学校
        </div>
      </label>

      {/* Layer 2: Hubs */}
      <label className="flex items-center gap-2 cursor-pointer select-none py-1 group">
        <input
          type="checkbox"
          checked={showHubs}
          onChange={(e) => setShowHubs(e.target.checked)}
          className="w-4 h-4 rounded border-2 border-[#5a5a40] text-[#5a5a40] focus:ring-[#5a5a40] accent-[#5a5a40]"
        />
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#3d3d3d] group-hover:text-[#5a5a40] transition-colors">
          <div className="w-5 h-5 bg-sky-50 border border-sky-300 rounded-full flex items-center justify-center">
            <Train className="w-3.5 h-3.5 text-sky-600" />
          </div>
          重点交通枢纽
        </div>
      </label>

      {/* Layer 3: Delicacies */}
      <label className="flex items-center gap-2 cursor-pointer select-none py-1 group">
        <input
          type="checkbox"
          checked={showDelicacies}
          onChange={(e) => setShowDelicacies(e.target.checked)}
          className="w-4 h-4 rounded border-2 border-[#5a5a40] text-[#5a5a40] focus:ring-[#5a5a40] accent-[#5a5a40]"
        />
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#3d3d3d] group-hover:text-[#5a5a40] transition-colors">
          <div className="w-5 h-5 bg-orange-50 border border-orange-300 rounded-full flex items-center justify-center">
            <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600" />
          </div>
          津门经典美食
        </div>
      </label>

      {/* Layer 4: Photo spots */}
      <label className="flex items-center gap-2 cursor-pointer select-none py-1 group">
        <input
          type="checkbox"
          checked={showPhotoSpots}
          onChange={(e) => setShowPhotoSpots(e.target.checked)}
          className="w-4 h-4 rounded border-2 border-[#5a5a40] text-[#5a5a40] focus:ring-[#5a5a40] accent-[#5a5a40]"
        />
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#3d3d3d] group-hover:text-[#5a5a40] transition-colors">
          <div className="w-5 h-5 bg-amber-50 border border-amber-300 rounded-full flex items-center justify-center">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
          </div>
          打卡拍照圣地
        </div>
      </label>

      <div className="border-t border-[#e5e7eb] pt-2 w-full md:block hidden text-[10px] text-gray-500 font-sans leading-tight">
        <div className="flex items-center gap-1 mb-1">
          <span className="inline-block w-2.5 h-2.5 bg-[#fefaf0] border border-[#5a5a40] rounded"></span>
          <span>远郊五区与沿海片区</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 bg-[#f5d5c6] border border-[#5a5a40] rounded"></span>
          <span>中心城区片区 (市内六区)</span>
        </div>
      </div>
    </div>
  );
}
