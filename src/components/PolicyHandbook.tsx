import React, { useState } from 'react';
import { PRACTICAL_GUIDES } from '../data';
import { BookOpen, Calendar, HelpCircle, ArrowRight, ClipboardCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PolicyHandbook() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="bg-white border-2 border-[#5a5a40] rounded-2xl p-6 shadow-sm handwritten-card relative h-full flex flex-col">
      {/* Decorative notebook binding loops on the left */}
      <div className="absolute left-[-8px] top-10 bottom-10 w-4 flex flex-col justify-between pointer-events-none z-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-5 h-3 bg-gradient-to-r from-gray-300 to-[#5a5a40] rounded-full border border-[#cbcec1] shadow-sm" />
        ))}
      </div>

      <div className="pl-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#e5e7eb]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#5a5a40]" />
            <h3 className="text-xl font-bold text-[#5a5a40] font-serif">天津中高考与落户转学指南</h3>
          </div>
          <span className="text-[10px] bg-[#cbcec1]/30 text-[#5a5a40] px-2 py-0.5 font-bold rounded-md flex items-center gap-1 font-sans">
            <Calendar className="w-3 h-3" />
            {PRACTICAL_GUIDES.updateTime}
          </span>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row gap-1.5 mb-5 bg-[#cbcec1]/10 p-1.5 rounded-lg border border-[#cbcec1]">
          {PRACTICAL_GUIDES.sections.map((section, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 text-left sm:text-center px-3 py-2 text-xs font-bold rounded-md transition-all font-sans relative ${
                activeTab === idx
                  ? 'bg-[#5a5a40] text-white shadow-sm'
                  : 'text-[#3d3d3d] hover:bg-[#cbcec1]/30'
              }`}
            >
              {idx === 0 && "高考优势"}
              {idx === 1 && "中考统招"}
              {idx === 2 && "转学落户"}
              {activeTab === idx && (
                <motion.div
                  layoutId="activeHandbookTab"
                  className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-[#5a5a40] hidden sm:block"
                />
              )}
            </button>
          ))}
        </div>

        {/* Handbook Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 max-h-[360px] sm:max-h-[none]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-base font-bold text-[#5a5a40] flex items-center gap-2 border-b border-[#e5e7eb] pb-2 font-serif tracking-wide">
                {activeTab === 0 && <Sparkles className="w-5 h-5 text-[#5a5a40]" />}
                {activeTab === 1 && <ClipboardCheck className="w-5 h-5 text-[#5a5a40]" />}
                {activeTab === 2 && <HelpCircle className="w-5 h-5 text-[#5a5a40]" />}
                {PRACTICAL_GUIDES.sections[activeTab].title}
              </h4>

              <div className="text-gray-700 text-sm leading-relaxed space-y-3 font-sans">
                {PRACTICAL_GUIDES.sections[activeTab].content.split('\n').map((line, i) => {
                  if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')) {
                    const colonIndex = line.indexOf('：');
                    if (colonIndex !== -1) {
                      const prefix = line.substring(0, colonIndex + 1);
                      const body = line.substring(colonIndex + 1);
                      return (
                        <p key={i} className="pl-4 -indent-4">
                          <strong className="text-[#5a5a40] font-bold">{prefix}</strong>
                          {body}
                        </p>
                      );
                    }
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>

              {/* Special warning or tip footer */}
              <div className="mt-6 p-3 bg-red-50/50 border border-red-100 rounded-lg text-xs text-red-900">
                <span className="font-bold">⚠️ 政策贴士：</span>
                {activeTab === 0 && "天津自主命题侧重考查基础，不追求怪题与超纲题，适合平时底子扎实、稳扎稳打的学生取得优异成绩。"}
                {activeTab === 1 && "‘市五所’的名额分配是进入津门顶尖高中的重要渠道，选择口碑优良的区属公立初中也有极大概率突围！"}
                {activeTab === 2 && "和平区对转学及高考资格的政策具有明显的‘锁定’期限（如三年房产及户籍），一定要提早布局并咨询对应教育局！"}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick policy summary block on bottom */}
        <div className="mt-4 pt-3 border-t border-[#e5e7eb] flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 font-sans">
          <span className="flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5 text-[#5a5a40]" />
            天津实行“3+3”新高考模式
          </span>
          <span className="flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5 text-[#5a5a40]" />
            市五所名额分配比率达50%
          </span>
        </div>
      </div>
    </div>
  );
}
