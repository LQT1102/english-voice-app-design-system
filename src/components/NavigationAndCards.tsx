/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Award, Trophy, Compass, ArrowRight, Flame, Clock, BookOpen, Layers } from 'lucide-react';

interface NavigationAndCardsProps {
  isDark?: boolean;
}

export default function NavigationAndCards({ isDark = false }: NavigationAndCardsProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('B2');

  const lessonCards = [
    {
      id: "ls-1",
      title: "Arriving at the Airport",
      desc: "Luyện cách hội thoại hỏi đường, làm thủ tục hải quan và ký gửi hành lý.",
      level: "A2",
      duration: "5 phút",
      wordsCount: 15,
      activeUsers: 1420,
      imageGradient: "from-indigo-500 to-indigo-600"
    },
    {
      id: "ls-2",
      title: "Salary Negotiation Mode",
      desc: "Học cách thỏa thuận lương thưởng trực tiếp bằng tiếng Anh thương mại đầy khéo léo.",
      level: "B2",
      duration: "10 phút",
      wordsCount: 38,
      activeUsers: 844,
      imageGradient: "from-indigo-600 to-sky-600"
    },
    {
      id: "ls-3",
      title: "Debating Climate Tech",
      desc: "Tranh luận tự do về tương lai năng lượng tái tạo và giải pháp khí hậu toàn cầu.",
      level: "C1",
      duration: "15 phút",
      wordsCount: 52,
      activeUsers: 312,
      imageGradient: "from-emerald-500 to-teal-600"
    }
  ];

  const levels = [
    { code: 'A1', name: 'Starter', desc: 'Làm quen, chào hỏi cơ bản, từ vựng đơn.' },
    { code: 'A2', name: 'Elementary', desc: 'Nói chuyện mua sắm, hỏi đường, hỏi gia đình.' },
    { code: 'B1', name: 'Intermediate', desc: 'Mô tả kinh nghiệm, ước mơ và thuyết trình cơ bản.' },
    { code: 'B2', name: 'Upper-Inter', desc: 'Thảo luận chuyên ngành, giao tiếp tự tin lưu loát.' },
    { code: 'C1', name: 'Advanced', desc: 'Biện luận phức tạp, sử dụng thành ngữ, viết học thuật.' },
    { code: 'C2', name: 'Mastery', desc: 'Phát âm chuẩn như người bản xứ, viết lách văn chương.' }
  ];

  return (
    <div id="navigation-section" className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-205 text-slate-850 shadow-xs'}`}>
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">07 Navigation & Badges</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Danh mục Thẻ Bài & Phân cấp Trình độ (Topic Cards / Badging)</h2>
        </div>
      </div>

      <p className={`text-sm mb-8 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Phân khu lộ trình học tập trực quan giúp học viên biết rõ năng lực bản thân. Các chỉ số phụ như thời lượng, số từ vựng mang tính định lượng rõ ràng thúc đẩy động cơ học mỗi ngày.
      </p>

      {/* Grid: Left column (CEFR Level select), Right column (Progress & Gamification metrics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* LEVL CHOOSER WIDGET */}
        <div className={`lg:col-span-7 p-6 rounded-2xl border transition-colors duration-500 ${
          isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6366f1] font-mono block mb-1">
            LEVEL BADGE CHIPS (CEFR FRAMEWORK)
          </span>
          <h4 className={`font-extrabold text-xs mb-4 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Danh sách phân chia khung năng lực ngôn ngữ</h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {levels.map((lvl) => {
              const isSelected = selectedLevel === lvl.code;
              return (
                <button
                  key={lvl.code}
                  type="button"
                  onClick={() => setSelectedLevel(lvl.code)}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    isSelected 
                      ? isDark ? 'bg-slate-900 border-indigo-600 shadow-xs scale-[1.02]' : 'bg-white border-indigo-600 shadow-xs scale-[1.02]'
                      : isDark ? 'bg-slate-950 border-slate-850 hover:border-indigo-900/60 hover:bg-slate-900' : 'bg-white/70 border-slate-200 hover:border-indigo-100 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-black px-2 py-0.5 rounded-md transition-colors duration-500 ${
                      isSelected ? 'bg-indigo-600 text-white' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {lvl.code}
                    </span>
                    {isSelected && <Award className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <h5 className={`font-black text-xs mt-2 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{lvl.name}</h5>
                  <p className={`text-[9px] mt-1 leading-snug font-medium line-clamp-2 transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{lvl.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* PROGRESS & GAMIFICATION PROFILE CARD */}
        <div className={`lg:col-span-5 p-6 rounded-2xl text-white flex flex-col justify-between relative overflow-hidden shadow-xs transition-colors duration-500 ${
          isDark ? 'bg-slate-950 border border-slate-850 shadow-indigo-950/20' : 'bg-slate-900'
        }`}>
          {/* Ambient light circles background */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-indigo-600/20 blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-sky-500/10 blur-xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black tracking-widest text-indigo-300 font-mono">
                SỨC MẠNH LUYỆN TẬP CAO TRÀO
              </span>
              <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
            </div>

            <div className="flex items-baseline gap-2 mt-4">
              <h3 className="text-3xl font-black">7 Days</h3>
              <span className="text-xs text-indigo-200 font-semibold">Chuỗi liên tục (Daily Streak)</span>
            </div>

            {/* Streak icons row */}
            <div className={`flex items-center gap-1.5 mt-3 p-2.5 rounded-lg border transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white/10 border-white/5'}`}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[8px] text-indigo-200 font-mono font-bold">T{day}</span>
                  <Flame className={`w-5 h-5 ${day <= 7 ? 'text-amber-500 fill-amber-500 animate-pulse' : 'text-slate-600'}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            {/* Speaking Goal slider progress indicators */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-indigo-200 flex items-center gap-1 font-semibold"><Clock className="w-3.5 h-3.5" /> Speaking Goal</span>
                <span className="font-extrabold font-mono">12 / 15 phút</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white/10'}`}>
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-indigo-200">
              <span className="flex items-center gap-1 font-semibold"><BookOpen className="w-3.5 h-3.5 block" /> Từ vựng: <b className="text-white">42 từ</b></span>
              <span className={`font-mono px-1.5 py-0.5 rounded font-extrabold ${isDark ? 'bg-indigo-950 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-800 text-white'}`}>Level {selectedLevel} active</span>
            </div>
          </div>
        </div>
      </div>

      {/* EXPLORATIVE TOPICS GRID ROW */}
      <div className="space-y-4">
        <div className={`flex items-center justify-between pb-2 border-b transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <h4 className={`font-black text-xs uppercase tracking-widest transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Các Thẻ Bài Học Thử Nghiệm Mô Phỏng</h4>
          <span className="text-xs text-indigo-500 font-extrabold hover:underline cursor-pointer flex items-center gap-1 uppercase">
            Xem thêm <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {lessonCards.map((card) => (
            <div 
              key={card.id} 
              className={`rounded-2xl border overflow-hidden hover:transform hover:-translate-y-0.5 transition-all flex flex-col justify-between ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 hover:border-indigo-650' 
                  : 'bg-white border-slate-205 hover:border-indigo-300 hover:shadow-xs'
              }`}
            >
              {/* Header Gradient */}
              <div className={`h-3 bg-gradient-to-r ${card.imageGradient}`} />
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className={`font-black text-[10px] uppercase px-2.5 py-1 rounded-lg ${
                      isDark ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-900/50' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {card.level} Level
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" /> {card.duration}
                    </span>
                  </div>

                  <h5 className={`font-black text-sm uppercase tracking-wide mb-1.5 transition-colors duration-500 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{card.title}</h5>
                  <p className={`text-xs leading-relaxed mb-4 font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{card.desc}</p>
                </div>

                <div className={`pt-3 border-t flex items-center justify-between transition-colors duration-500 ${isDark ? 'border-slate-850' : 'border-slate-100'}`}>
                  <div className={`text-[10px] font-semibold uppercase transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                    <span className={`font-black ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{card.wordsCount} từ</span> mẫu • {card.activeUsers} đang học
                  </div>
                  
                  <button 
                    type="button" 
                    id={`start-lesson-${card.id}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-3xs ${
                      isDark 
                        ? 'bg-slate-900 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-slate-750' 
                        : 'bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
