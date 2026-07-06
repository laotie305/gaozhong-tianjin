import React, { useRef, useEffect } from 'react';
import { HighSchool, TransportHub, Delicacy, PhotoSpot } from '../data';
import { MapPin, Compass, Train, Plane, Camera, UtensilsCrossed, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface MapRendererProps {
  viewMode: 'full' | 'central';
  schools: HighSchool[];
  transportHubs: TransportHub[];
  delicacies: Delicacy[];
  photoSpots: PhotoSpot[];
  selectedSchool: HighSchool | null;
  onSelectSchool: (school: HighSchool) => void;
  showSchools: boolean;
  showHubs: boolean;
  showDelicacies: boolean;
  showPhotoSpots: boolean;
  onViewModeToggle: (mode: 'full' | 'central') => void;
}

export default function MapRenderer({
  viewMode,
  schools,
  transportHubs,
  delicacies,
  photoSpots,
  selectedSchool,
  onSelectSchool,
  showSchools,
  showHubs,
  showDelicacies,
  showPhotoSpots,
  onViewModeToggle,
}: MapRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Compass component rendered inside SVG or as an overlay
  const renderCompass = () => (
    <g transform="translate(720, 100)" className="cursor-pointer group select-none">
      <circle r="45" fill="#fdf6e3" stroke="#5a5a40" strokeWidth="2" strokeDasharray="3,3" />
      <circle r="40" fill="none" stroke="#5a5a40" strokeWidth="1.5" />
      {/* Outer markings */}
      <line x1="0" y1="-40" x2="0" y2="-35" stroke="#5a5a40" strokeWidth="2" />
      <line x1="0" y1="40" x2="0" y2="35" stroke="#5a5a40" strokeWidth="2" />
      <line x1="-40" y1="0" x2="-35" y2="0" stroke="#5a5a40" strokeWidth="2" />
      <line x1="40" y1="0" x2="35" y2="0" stroke="#5a5a40" strokeWidth="2" />
      {/* Direction indicators */}
      <text x="0" y="-26" textAnchor="middle" fill="#5a5a40" className="font-serif text-xs font-bold">北 (N)</text>
      <text x="0" y="34" textAnchor="middle" fill="#5a5a40" className="font-serif text-[10px]">南 (S)</text>
      <text x="30" y="4" textAnchor="middle" fill="#5a5a40" className="font-serif text-[10px]">东 (E)</text>
      <text x="-30" y="4" textAnchor="middle" fill="#5a5a40" className="font-serif text-[10px]">西 (W)</text>
      {/* Needle */}
      <g className="transition-transform duration-700 ease-in-out group-hover:rotate-45">
        <path d="M 0,-32 L 8,0 L 0,6 L -8,0 Z" fill="#5a5a40" stroke="#3d3d3d" strokeWidth="1.5" />
        <path d="M 0,32 L 8,0 L 0,-6 L -8,0 Z" fill="#cbcec1" stroke="#3d3d3d" strokeWidth="1" />
        <circle r="4" fill="#3d3d3d" />
      </g>
    </g>
  );

  // Scale bar component
  const renderScaleBar = () => {
    const isFull = viewMode === 'full';
    return (
      <g transform="translate(50, 930)" className="select-none font-mono">
        <path d="M 0,-5 L 0,0 L 150,0 L 150,-5 M 75,0 L 75,-3" fill="none" stroke="#5a5a40" strokeWidth="2" />
        <text x="0" y="-10" fontSize="10" fill="#5a5a40" fontWeight="bold">0</text>
        <text x="75" y="-10" fontSize="10" fill="#5a5a40" textAnchor="middle" fontWeight="bold">
          {isFull ? '15 km' : '2.5 km'}
        </text>
        <text x="150" y="-10" fontSize="10" fill="#5a5a40" textAnchor="middle" fontWeight="bold">
          {isFull ? '30 km' : '5.0 km'}
        </text>
        <text x="0" y="15" fontSize="10" fill="#5a5a40" className="font-serif">
          手绘比例尺 (示意)
        </text>
      </g>
    );
  };

  // Render sketchy decorative elements based on viewMode
  const renderDecorations = () => {
    if (viewMode === 'full') {
      return (
        <>
          {/* Northern Mountains in Jizhou */}
          <g stroke="#5a4521" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6">
            <path d="M 330,80 L 350,50 L 370,80" />
            <path d="M 355,80 L 380,45 L 405,80" />
            <path d="M 390,85 L 415,55 L 440,85" />
            <path d="M 430,90 L 460,50 L 490,90" />
            <path d="M 340,65 L 345,75 M 370,60 L 375,72 M 450,70 L 455,80" strokeWidth="1" />
            <text x="410" y="125" textAnchor="middle" fill="#5a4521" className="font-handwritten text-xs opacity-75">
              ▲ 蓟州山峦・盘山
            </text>
          </g>

          {/* Bohai Bay and little sailboat on the east */}
          <g stroke="#5a4521" fill="none" strokeLinecap="round" opacity="0.5">
            {/* Wave lines */}
            <path d="M 750,780 Q 765,775 780,780" strokeWidth="1.5" />
            <path d="M 730,810 Q 750,805 770,810" strokeWidth="1.5" />
            <path d="M 760,840 Q 775,835 790,840" strokeWidth="1.5" />
            {/* Sailboat */}
            <g transform="translate(740, 720)">
              <path d="M 0,10 L 25,10 L 20,16 L 5,16 Z" fill="#f4edd8" stroke="#5a4521" strokeWidth="1.5" />
              <path d="M 12,10 L 12,-5 L 2,10" fill="#b5975d" stroke="#5a4521" strokeWidth="1.5" />
              <path d="M 12,-2 L 20,8 L 12,8" fill="#e8dbb7" stroke="#5a4521" strokeWidth="1" />
            </g>
            <text x="760" y="870" textAnchor="middle" fill="#5a4521" className="font-handwritten text-xs tracking-wider font-bold">渤海湾</text>
          </g>
        </>
      );
    } else {
      return (
        <>
          {/* Small compass label */}
          <text x="400" y="50" textAnchor="middle" fill="#5a4521" className="font-handwritten text-xs opacity-50 select-none">
            天津市核心区域 • 市内六区精细图
          </text>
        </>
      );
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full h-full bg-white border-2 border-[#5a5a40] rounded-2xl p-4 shadow-sm overflow-hidden select-none">
      {/* Absolute Header Ribbon */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => onViewModeToggle('full')}
          className={`px-4 py-1.5 rounded-lg border-2 border-[#5a5a40] font-serif text-sm font-bold shadow-sm transition-all ${
            viewMode === 'full'
              ? 'bg-[#5a5a40] text-white rotate-[-1deg]'
              : 'bg-[#e5e7eb]/60 text-[#3d3d3d] hover:bg-[#cbcec1]/50 hover:rotate-[1deg]'
          }`}
        >
          🗺️ 全津高中分布 (全市图)
        </button>
        <button
          onClick={() => onViewModeToggle('central')}
          className={`px-4 py-1.5 rounded-lg border-2 border-[#5a5a40] font-serif text-sm font-bold shadow-sm transition-all ${
            viewMode === 'central'
              ? 'bg-[#5a5a40] text-white rotate-[1deg]'
              : 'bg-[#e5e7eb]/60 text-[#3d3d3d] hover:bg-[#cbcec1]/50 hover:rotate-[-1deg]'
          }`}
        >
          🔍 市中心五所 (市内六区)
        </button>
      </div>

      {/* Map stage container */}
      <div
        ref={containerRef}
        className="w-full flex-1 flex items-center justify-center relative mt-12 bg-white border-4 border-[#5a5a40] p-1 min-h-[480px] shadow-inner"
        style={{
          borderRadius: '40px 25px 35px 20px',
          backgroundImage: 'radial-gradient(#cbcec1 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}
      >
        <svg
          viewBox={viewMode === 'full' ? '0 0 800 1000' : '0 0 800 700'}
          className="w-full h-full max-h-[85vh] select-none"
        >
          {/* Gradients */}
          <defs>
            <filter id="sketch-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#5a5a40" floodOpacity="0.1" />
            </filter>
            <pattern id="grid-paper" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(90, 90, 64, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Background grid texture */}
          <rect width="100%" height="100%" fill="url(#grid-paper)" />

          {/* RENDER THE DISTRICT POLYGONS */}
          {viewMode === 'full' ? (
            <g stroke="#5a4521" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.4" filter="url(#sketch-glow)">
              {/* Jizhou - Far North (Yellow Pastel) */}
              <path d="M 350,20 L 450,20 L 500,100 L 480,180 L 320,180 L 300,100 Z" fill="#faf2d5" />
              <text x="400" y="100" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">蓟州区</text>

              {/* Baodi - North East (Orange Pastel) */}
              <path d="M 480,180 L 580,180 L 680,240 L 620,320 L 460,320 Z" fill="#fce4d6" />
              <text x="560" y="250" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">宝坻区</text>

              {/* Wuqing - North West (Green Pastel) */}
              <path d="M 320,180 L 460,180 L 460,320 L 360,380 L 220,350 L 200,260 Z" fill="#e2f0d9" />
              <text x="310" y="270" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">武清区</text>

              {/* Ninghe - East North (Purple/Blue Pastel) */}
              <path d="M 620,320 L 740,320 L 780,420 L 680,480 L 560,400 Z" fill="#f2e2f7" />
              <text x="670" y="380" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">宁河区</text>

              {/* Beichen - North of core (Yellow Pastel) */}
              <path d="M 280,380 L 360,380 L 460,320 L 460,420 L 380,450 L 280,420 Z" fill="#fff2cc" />
              <text x="360" y="405" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">北辰区</text>

              {/* Dongli - East of core (Peach Pastel) */}
              <path d="M 460,420 L 520,440 L 560,400 L 620,440 L 580,560 L 460,510 Z" fill="#fce4d6" />
              <text x="530" y="475" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">东丽区</text>

              {/* Xiqing - West of core (Green Pastel) */}
              <path d="M 220,460 L 340,440 L 340,560 L 280,620 L 180,580 Z" fill="#e2f0d9" />
              <text x="260" y="515" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">西青区</text>

              {/* Jinnan - South East of core (Pink Pastel) */}
              <path d="M 420,540 L 480,520 L 580,560 L 550,640 L 440,640 L 400,580 Z" fill="#fce4d6" />
              <text x="490" y="590" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">津南区</text>

              {/* Jinghai - South West (Warm Sand) */}
              <path d="M 180,580 L 280,620 L 320,600 L 340,780 L 160,780 L 140,680 Z" fill="#fff2cc" />
              <text x="230" y="690" fill="#5a4521" className="font-handwritten text-xs font-bold pointer-events-none">静海区</text>

              {/* Binhai New Area - Massive East Coast (Blue Pastel) */}
              <path d="M 620,440 L 680,480 L 780,420 L 800,560 L 760,780 L 640,720 L 580,560 Z" fill="#d9e1f2" />
              <text x="700" y="610" fill="#5a4521" className="font-handwritten text-sm font-bold pointer-events-none">滨海新区</text>

              {/* Consolidated City Center (市内六区) (Cream/Gold) */}
              <path
                d="M 340,440 L 420,440 L 460,480 L 420,540 L 340,540 L 320,500 Z"
                fill="#f8cbad"
                strokeWidth="3"
                className="cursor-pointer hover:fill-[#f4b183] transition-colors"
                onClick={() => onViewModeToggle('central')}
              />
              <text
                x="385" y="495"
                fill="#5a4521"
                className="font-handwritten text-xs font-bold cursor-pointer hover:underline"
                onClick={() => onViewModeToggle('central')}
              >
                市内六区🔍
              </text>
            </g>
          ) : (
            <g stroke="#5a4521" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.4" filter="url(#sketch-glow)">
              {/* Hebei District (Pink pastel) */}
              <path d="M 380,50 Q 550,80 580,180 L 520,240 L 400,200 Z" fill="#fcdcd5" />
              <text x="480" y="120" fill="#5a4521" className="font-handwritten text-sm font-bold pointer-events-none">河北区</text>

              {/* Hongqiao District (Yellow pastel) */}
              <path d="M 160,100 L 380,50 L 400,200 L 320,220 L 220,240 Z" fill="#fdf0cd" />
              <text x="270" y="110" fill="#5a4521" className="font-handwritten text-sm font-bold pointer-events-none">红桥区</text>

              {/* Nankai District (Green pastel) */}
              <path d="M 220,240 L 320,220 L 340,420 L 240,540 L 120,440 Z" fill="#e2f0d9" />
              <text x="200" y="370" fill="#5a4521" className="font-handwritten text-sm font-bold pointer-events-none">南开区</text>

              {/* Heping District (Orange/Gold pastel) */}
              <path d="M 320,220 L 440,200 L 480,260 L 420,380 L 340,420 Z" fill="#f8cbad" />
              <text x="380" y="270" fill="#5a4521" className="font-handwritten text-sm font-bold pointer-events-none">和平区</text>

              {/* Hexi District (Blue pastel) */}
              <path d="M 340,420 L 420,380 L 480,400 L 620,540 L 480,640 L 320,600 Z" fill="#d9e1f2" />
              <text x="440" y="550" fill="#5a4521" className="font-handwritten text-sm font-bold pointer-events-none">河西区</text>

              {/* Hedong District (Peach pastel) */}
              <path d="M 440,200 L 520,240 L 580,180 Q 700,300 700,420 L 620,540 L 480,400 L 480,260 Z" fill="#fce4d6" />
              <text x="590" y="320" fill="#5a4521" className="font-handwritten text-sm font-bold pointer-events-none">河东区</text>
            </g>
          )}

          {/* RENDER DYNAMIC THE HAIHE RIVER */}
          {viewMode === 'full' ? (
            <path
              d="M 240,320 Q 320,420 380,490 T 480,560 T 600,600 T 740,620"
              stroke="#85b5d5"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          ) : (
            <path
              d="M 180,180 C 300,170 380,140 420,200 C 460,260 460,340 520,380 C 580,420 640,450 720,500"
              stroke="#85b5d5"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          )}

          {/* RENDER MAP SCALE BAR, COMPASS AND DECORATIONS */}
          {renderCompass()}
          {renderScaleBar()}
          {renderDecorations()}

          {/* LAYER 1: PHOTOGRAPHY SPOTS (CAMERA ICON) */}
          {showPhotoSpots && photoSpots.map((spot, idx) => {
            const coord = viewMode === 'central' ? spot.coordinateCentral : spot.coordinateFull;
            if (!coord) return null;
            return (
              <g
                key={`photo-${idx}`}
                transform={`translate(${coord.x}, ${coord.y})`}
                className="cursor-pointer group"
              >
                <circle r="18" fill="#fbf8f0" stroke="#b5975d" strokeWidth="1.5" />
                <circle r="15" fill="#fefcfa" stroke="#e8dbb7" strokeWidth="1" className="group-hover:fill-amber-50 transition-colors" />
                <foreignObject x="-8" y="-8" width="16" height="16">
                  <Camera className="w-4 h-4 text-amber-600" />
                </foreignObject>
                <g transform="translate(0, -26)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect x="-60" y="-12" width="120" height="20" rx="4" fill="#5a4521" />
                  <text x="0" y="2" textAnchor="middle" fill="#fbf8f0" fontSize="10" className="font-handwritten">
                    📸 {spot.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* LAYER 2: DELICACIES (UTENSILS ICON) */}
          {showDelicacies && delicacies.map((food, idx) => {
            const coord = viewMode === 'central' ? food.coordinateCentral : food.coordinateFull;
            if (!coord) return null;
            return (
              <g
                key={`food-${idx}`}
                transform={`translate(${coord.x}, ${coord.y})`}
                className="cursor-pointer group"
              >
                <circle r="18" fill="#fbf8f0" stroke="#b5975d" strokeWidth="1.5" />
                <circle r="15" fill="#faf5e6" stroke="#e8dbb7" strokeWidth="1" className="group-hover:fill-orange-50 transition-colors" />
                <foreignObject x="-8" y="-8" width="16" height="16">
                  <UtensilsCrossed className="w-4 h-4 text-orange-600" />
                </foreignObject>
                <g transform="translate(0, -26)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect x="-60" y="-12" width="120" height="20" rx="4" fill="#5a4521" />
                  <text x="0" y="2" textAnchor="middle" fill="#fbf8f0" fontSize="10" className="font-handwritten">
                    😋 {food.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* LAYER 3: TRANSPORT HUBS (TRAIN/PLANE ICON) */}
          {showHubs && transportHubs.map((hub, idx) => {
            const coord = viewMode === 'central' ? hub.coordinateCentral : hub.coordinateFull;
            if (!coord) return null;
            return (
              <g
                key={`hub-${idx}`}
                transform={`translate(${coord.x}, ${coord.y})`}
                className="cursor-pointer group"
              >
                <circle r="18" fill="#fbf8f0" stroke="#5a4521" strokeWidth="1.5" />
                <circle r="15" fill="#f3efe0" stroke="#b5975d" strokeWidth="1" className="group-hover:fill-sky-50 transition-colors" />
                <foreignObject x="-8" y="-8" width="16" height="16">
                  {hub.type === 'airport' ? (
                    <Plane className="w-4 h-4 text-sky-600 rotate-45" />
                  ) : (
                    <Train className="w-4 h-4 text-sky-600" />
                  )}
                </foreignObject>
                <g transform="translate(0, -26)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect x="-70" y="-12" width="140" height="20" rx="4" fill="#5a4521" />
                  <text x="0" y="2" textAnchor="middle" fill="#fbf8f0" fontSize="10" className="font-handwritten">
                    🚉 {hub.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* LAYER 4: HIGH SCHOOLS (PIN WITH SCHOOL EMBLAZON) */}
          {showSchools && schools.map((school) => {
            const coord = viewMode === 'central' ? school.coordinate : school.coordinatesFull;
            const isSelected = selectedSchool?.id === school.id;
            
            // For full map view, if school is in Central core, we highlight it but can also offer the zoom
            return (
              <g
                key={`school-pin-${school.id}`}
                transform={`translate(${coord.x}, ${coord.y})`}
                className="cursor-pointer group"
                onClick={() => onSelectSchool(school)}
              >
                {/* Pulse wave animation on select */}
                {isSelected && (
                  <circle r="22" fill="none" stroke="#5a5a40" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                )}
                
                {/* Hand-drawn pin circle */}
                <circle
                  r={isSelected ? "14" : "11"}
                  fill={isSelected ? "#5a5a40" : "#3d3d3d"}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-300 shadow-md group-hover:scale-125"
                />
                
                {/* Cute school visual signifier */}
                <circle
                  r={isSelected ? "8" : "6"}
                  fill={school.level.includes("市五所") ? "#cbcec1" : "#ffffff"}
                  className="pointer-events-none"
                />
                
                {/* School Short Label Text */}
                <g transform={`translate(0, ${isSelected ? '26' : '22'})`} className="pointer-events-none">
                  {/* Styled label background */}
                  <rect
                    x={-school.alias.length * 6 - 5}
                    y="-9"
                    width={school.alias.length * 12 + 10}
                    height="17"
                    rx="4"
                    fill={isSelected ? "#5a5a40" : "#ffffff"}
                    stroke={isSelected ? "#3d3d3d" : "#5a5a40"}
                    strokeWidth="1.5"
                    className="shadow-sm"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isSelected ? "#ffffff" : "#3d3d3d"}
                    fontWeight={isSelected ? "bold" : "600"}
                    fontSize="10"
                    className="font-sans"
                  >
                    {school.alias}
                  </text>
                </g>

                {/* Subtle Star icon above the pin for Top 5 */}
                {school.level.includes("市五所") && (
                  <path
                    d="M 0,-18 L 2,-14 L 6,-14 L 3,-11 L 4,-7 L 0,-9 L -4,-7 L -3,-11 L -6,-14 L -2,-14 Z"
                    fill="#cbcec1"
                    stroke="#5a5a40"
                    strokeWidth="0.5"
                    className="animate-sketch"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Small floating bottom helper badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm border border-[#5a5a40] px-2.5 py-1 rounded-md text-[10px] text-[#5a5a40] font-sans shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#5a5a40]" />
          点击学校图标查看招生实力与详细档案
        </div>
      </div>
    </div>
  );
}
