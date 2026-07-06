import React from 'react';
import { HighSchool } from '../data';
import { Star, MapPin, Calendar, Compass, Shield, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface SchoolCardProps {
  key?: string;
  school: HighSchool;
  onClose?: () => void;
}

export default function SchoolCard({ school, onClose }: SchoolCardProps) {
  // Render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        id={`star-${school.id}-${i}`}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'fill-[#5a5a40] text-[#5a5a40]'
            : rating % 1 !== 0 && i === Math.floor(rating)
            ? 'fill-[#5a5a40]/50 text-[#5a5a40]'
            : 'text-gray-200'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-2 border-[#5a5a40] rounded-2xl p-6 shadow-sm handwritten-card relative overflow-hidden"
    >
      {/* Hand-drawn banner accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#cbcec1] via-[#8fb3c0] to-[#5a5a40]"></div>
      
      {/* Top action row */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <span className="px-3 py-1 bg-[#e5e7eb]/60 border border-[#5a5a40] text-[#5a5a40] text-xs font-sans font-bold rounded-full animate-pulse">
          {school.badge}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#5a5a40] hover:text-[#3d3d3d] font-bold p-1 hover:bg-[#e5e7eb]/40 rounded-full transition-colors text-sm"
            title="关闭"
          >
            ✕
          </button>
        )}
      </div>

      {/* Main School Info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#5a5a40] font-serif tracking-wide mb-1 flex items-center gap-1.5">
          <Award className="w-6 h-6 text-[#5a5a40] shrink-0" />
          {school.name}
        </h3>
        <p className="text-xs text-gray-500 font-sans flex items-center gap-1">
          <span className="font-bold text-[#5a5a40]">{school.district}</span>
          <span>•</span>
          <span className="bg-[#e5e7eb] px-1.5 py-0.5 rounded text-[10px] text-[#5a5a40] font-bold">
            {school.level}
          </span>
        </p>
      </div>

      {/* Motto / Calligraphy Bubble */}
      <div className="bg-[#cbcec1]/20 border-l-4 border-[#5a5a40] p-3 rounded-r-lg mb-4 italic text-[#3d3d3d] text-sm font-sans flex items-start gap-1.5">
        <Compass className="w-4 h-4 text-[#5a5a40] mt-1 shrink-0 rotate-45" />
        <div>
          <span className="text-[10px] uppercase font-sans text-gray-400 block not-italic font-bold">
            校训 / School Motto
          </span>
          「{school.motto}」
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 font-sans border-b border-gray-100 pb-4">
        {school.description}
      </p>

      {/* History and Details */}
      <div className="space-y-3 text-xs text-gray-600 mb-4 font-sans">
        <div className="flex items-start gap-1.5">
          <Calendar className="w-4 h-4 text-[#5a5a40] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#5a5a40] font-bold block">校史底蕴</strong>
            {school.history}
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <MapPin className="w-4 h-4 text-[#5a5a40] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#5a5a40] font-bold block">学校地址</strong>
            {school.address}
          </div>
        </div>
      </div>

      {/* Highlights / Features */}
      <div className="mb-4 font-sans">
        <h4 className="text-xs font-bold text-[#5a5a40] uppercase tracking-wider mb-2 flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-[#5a5a40]" />
          办学特色标签
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {school.features.map((feature, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-[#e5e7eb]/40 border border-[#cbcec1] rounded-md text-[11px] text-[#3d3d3d] font-medium"
            >
              #{feature}
            </span>
          ))}
        </div>
      </div>

      {/* Recommendation Level */}
      <div className="flex items-center justify-between pt-3 border-t border-[#e5e7eb] mt-2 font-sans">
        <span className="text-xs text-[#5a5a40] font-bold">名校推荐指数</span>
        <div className="flex items-center gap-0.5">
          {renderStars(school.recommendationStar)}
        </div>
      </div>
    </motion.div>
  );
}
