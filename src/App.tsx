import React, { useState, useMemo } from 'react';
import {
  HIGH_SCHOOLS,
  TRANSPORT_HUBS,
  DELICACIES,
  PHOTO_SPOTS,
  HighSchool
} from './data';
import SchoolCard from './components/SchoolCard';
import PolicyHandbook from './components/PolicyHandbook';
import MapRenderer from './components/MapRenderer';
import LegendPanel from './components/LegendPanel';
import {
  GraduationCap,
  Search,
  SlidersHorizontal,
  Sparkles,
  Map,
  Compass,
  Info,
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('全部');
  const [selectedLevel, setSelectedLevel] = useState<string>('全部');
  const [selectedSchool, setSelectedSchool] = useState<HighSchool | null>(HIGH_SCHOOLS[0]); // Default to Nankai
  const [viewMode, setViewMode] = useState<'full' | 'central'>('central'); // Start at city center for rich details

  // Map layer controls
  const [showSchools, setShowSchools] = useState(true);
  const [showHubs, setShowHubs] = useState(true);
  const [showDelicacies, setShowDelicacies] = useState(true);
  const [showPhotoSpots, setShowPhotoSpots] = useState(true);

  // List of unique districts with schools for filtering
  const districts = useMemo(() => {
    return ['全部', '和平区', '河西区', '南开区', '河东区', '河北区', '红桥区', '滨海新区', '郊县重点'];
  }, []);

  // Filter school list
  const filteredSchools = useMemo(() => {
    return HIGH_SCHOOLS.filter((school) => {
      // Search matching
      const matchesSearch =
        school.name.includes(searchQuery) ||
        school.alias.includes(searchQuery) ||
        school.motto.includes(searchQuery) ||
        school.features.some((f) => f.includes(searchQuery));

      // District matching
      let matchesDistrict = true;
      if (selectedDistrict !== '全部') {
        if (selectedDistrict === '郊县重点') {
          matchesDistrict = !school.isCentral && school.district !== '滨海新区';
        } else {
          matchesDistrict = school.district === selectedDistrict;
        }
      }

      // Level matching
      let matchesLevel = true;
      if (selectedLevel !== '全部') {
        if (selectedLevel === '市五所') {
          matchesLevel = school.level.includes('市五所');
        } else {
          matchesLevel = !school.level.includes('市五所');
        }
      }

      return matchesSearch && matchesDistrict && matchesLevel;
    });
  }, [searchQuery, selectedDistrict, selectedLevel]);

  // Handle select school
  const handleSelectSchool = (school: HighSchool) => {
    setSelectedSchool(school);
    // Auto toggle map view based on school location
    if (school.isCentral && viewMode !== 'central') {
      setViewMode('central');
    } else if (!school.isCentral && viewMode !== 'full') {
      setViewMode('full');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6e3] text-[#3d3d3d] font-serif pb-12 selection:bg-[#5a5a40] selection:text-white relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}>
      {/* Decorative top header sage accent border */}
      <div className="h-2 bg-gradient-to-r from-[#5a5a40] via-[#8fb3c0] to-[#cbcec1] w-full" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Hand-drawn Heading Banner */}
        <header className="relative flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b-2 border-[#5a5a40]">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {/* Animated Hand-drawn Stamp Logo */}
            <motion.div
              animate={{ rotate: [0, -3, 3, -1, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="w-16 h-16 bg-[#5a5a40] border-2 border-dashed border-[#cbcec1] rounded-xl flex items-center justify-center text-white shadow-inner transform rotate-[-2deg] shrink-0"
            >
              <GraduationCap className="w-10 h-10 drop-shadow-[1px_2px_1px_rgba(0,0,0,0.3)]" />
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-wide text-[#5a5a40] drop-shadow-sm select-none">
                  天津市名校分布手绘地图
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-[#5a5a40] text-white text-[10px] font-sans font-normal rounded uppercase tracking-wider">
                  2026 最新攻略版
                </span>
              </div>
              <p className="text-sm italic opacity-80 mt-1 flex items-center gap-1.5 font-sans text-gray-600">
                <Sparkles className="w-4 h-4 text-[#5a5a40]" />
                更新日期：2026年5月 | 准确比例绘制 (示意) • 考前必读名校大公开
              </p>
            </div>
          </div>

          {/* Compass / Small Emblem on Right */}
          <div className="hidden lg:flex items-center gap-3 bg-white/70 border border-[#5a5a40]/50 px-4 py-2 rounded-xl shadow-sm">
            <Compass className="w-6 h-6 text-[#5a5a40] animate-spin" style={{ animationDuration: '20s' }} />
            <div className="text-xs font-sans">
              <span className="block font-bold text-[#5a5a40]">津门教育罗盘</span>
              <span className="text-gray-500 text-[10px]">艺术性服从准确性</span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          
          {/* LEFT PANEL: Filters, Search and School List (Grid Column Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Search and Filters Card */}
            <div className="bg-white/95 border-2 border-[#5a5a40] rounded-2xl p-5 shadow-sm handwritten-card">
              <h3 className="text-base font-bold text-[#5a5a40] font-serif mb-3 flex items-center gap-1.5 border-b border-[#e5e7eb] pb-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#5a5a40]" />
                名校检索与过滤
              </h3>

              {/* Search input */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5a5a40]" />
                <input
                  type="text"
                  placeholder="搜索学校、校训或办学特色..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#fdf6e3]/40 border border-[#cbcec1] rounded-xl text-xs text-[#3d3d3d] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5a5a40] transition-all font-sans"
                />
              </div>

              {/* District Select Filter */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">
                  行政区域分布
                </label>
                <div className="flex flex-wrap gap-1">
                  {districts.map((dist) => (
                    <button
                      key={dist}
                      onClick={() => setSelectedDistrict(dist)}
                      className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all font-sans ${
                        selectedDistrict === dist
                          ? 'bg-[#5a5a40] text-white shadow-sm'
                          : 'bg-[#e5e7eb]/40 text-[#3d3d3d] hover:bg-[#cbcec1]/60'
                      }`}
                    >
                      {dist}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">
                  办学梯队层次
                </label>
                <div className="flex gap-1.5">
                  {['全部', '市五所', '其他重点'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`flex-1 px-2.5 py-1 text-[11px] font-bold rounded-md text-center transition-all font-sans ${
                        selectedLevel === level
                          ? 'bg-[#5a5a40] text-white shadow-sm'
                          : 'bg-[#e5e7eb]/40 text-[#3d3d3d] hover:bg-[#cbcec1]/60'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* School List Scrollable Card */}
            <div className="bg-white border-2 border-[#5a5a40] rounded-2xl p-4 shadow-sm handwritten-card flex-1 flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-2 mb-3">
                <h3 className="text-base font-bold text-[#5a5a40] font-serif flex items-center gap-1.5">
                  <Award className="w-4.5 h-4.5 text-[#5a5a40]" />
                  津门知名高中 ({filteredSchools.length}所)
                </h3>
                <span className="text-[10px] text-gray-400 font-sans">
                  已核实真实存在
                </span>
              </div>

              {/* Scroll Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[420px] space-y-1.5 pr-1">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => {
                    const isSelected = selectedSchool?.id === school.id;
                    return (
                      <div
                        key={school.id}
                        onClick={() => handleSelectSchool(school)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-[#5a5a40]/10 border-[#5a5a40] shadow-sm translate-x-1'
                            : 'bg-white/40 border-transparent hover:bg-[#cbcec1]/20 hover:border-[#5a5a40]/40'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="text-sm font-bold text-[#3d3d3d] truncate flex items-center gap-1">
                            {school.name}
                            {school.level.includes('市五所') && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                            )}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-sans truncate">
                            {school.district} • {school.level}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-[#5a5a40] shrink-0 transition-transform ${
                          isSelected ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-gray-400 text-xs font-mono">
                    没有找到符合条件的高中 🔍
                    <br />
                    <span className="text-[10px] block mt-1">请重试或重置搜索词</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CENTER PANEL: Dynamic Map Stage (Grid Column Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <MapRenderer
              viewMode={viewMode}
              schools={filteredSchools}
              transportHubs={TRANSPORT_HUBS}
              delicacies={DELICACIES}
              photoSpots={PHOTO_SPOTS}
              selectedSchool={selectedSchool}
              onSelectSchool={handleSelectSchool}
              showSchools={showSchools}
              showHubs={showHubs}
              showDelicacies={showDelicacies}
              showPhotoSpots={showPhotoSpots}
              onViewModeToggle={setViewMode}
            />
          </div>

          {/* RIGHT PANEL: Details Shelf & Layer Panel (Grid Column Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Legend layering switches */}
            <LegendPanel
              showSchools={showSchools}
              setShowSchools={setShowSchools}
              showHubs={showHubs}
              setShowHubs={setShowHubs}
              showDelicacies={showDelicacies}
              setShowDelicacies={setShowDelicacies}
              showPhotoSpots={showPhotoSpots}
              setShowPhotoSpots={setShowPhotoSpots}
            />

            {/* Selected school detail drawer */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {selectedSchool ? (
                  <SchoolCard
                    key={selectedSchool.id}
                    school={selectedSchool}
                    onClose={() => setSelectedSchool(null)}
                  />
                ) : (
                  <div className="h-full bg-white/70 border-2 border-dashed border-[#5a5a40]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-gray-400 text-xs min-h-[300px]">
                    <Info className="w-10 h-10 text-[#5a5a40]/60 mb-2 animate-bounce" />
                    请在地图或列表中选择一所高中
                    <br />
                    查看其清北录取背景、办学特色与位置档案。
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* BOTTOM PANEL: 2026 May Policy Handbook Section */}
        <section className="mt-8 border-t-2 border-dashed border-[#5a5a40]/30 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Quick stats and help notes on left */}
            <div className="lg:col-span-4 bg-white/95 border-2 border-[#5a5a40] rounded-2xl p-5 shadow-sm handwritten-card flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#5a5a40] font-serif mb-2.5 flex items-center gap-1.5 border-b border-[#e5e7eb] pb-1.5">
                  <BookOpen className="w-4.5 h-4.5 text-[#5a5a40]" />
                  2026年天津中高考数览
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  天津作为自主命题的直辖市，高考升学指标体系和名校录取比例常年处于全国前列。本手绘地图收录的20所高中，均是经过严格核实的津门金牌学府。
                </p>

                <div className="space-y-2 font-sans text-xs">
                  <div className="flex justify-between items-center p-2 bg-[#cbcec1]/20 border border-[#cbcec1] rounded">
                    <span className="text-[#3d3d3d] font-bold">市五所名额分配比</span>
                    <span className="font-bold text-[#5a5a40]">50% 统配</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#cbcec1]/20 border border-[#cbcec1] rounded">
                    <span className="text-[#3d3d3d] font-bold">新高考科目组合</span>
                    <span className="font-bold text-[#5a5a40]">“3+3” 自由选考</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#cbcec1]/20 border border-[#cbcec1] rounded">
                    <span className="text-[#3d3d3d] font-bold">随迁高考要求</span>
                    <span className="font-bold text-[#5a5a40]">“双三年” 政策锁</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 mt-4 pt-2 border-t border-[#e5e7eb]">
                数据核实于 2026年5月。艺术性插图布局非绝对物理比例测绘，请以具体交通路线为准。
              </div>
            </div>

            {/* Interactive Policy Handbook core on right */}
            <div className="lg:col-span-8">
              <PolicyHandbook />
            </div>

          </div>
        </section>

      </div>

      {/* Footer copyright */}
      <footer className="text-center text-xs text-gray-400 font-sans mt-12 pt-6 border-t border-[#5a5a40]/20">
        <p>© 2026 天津市知名高中手绘风分布地图. All rights reserved.</p>
        <p className="text-[10px] mt-1">天津教育优势探索工具 • 专为升学和转学择校家庭倾心编制</p>
      </footer>
    </div>
  );
}
