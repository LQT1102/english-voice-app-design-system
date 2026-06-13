/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, MessageCircle, Mic, Star, ShieldCheck } from 'lucide-react';

interface IntroductionsProps {
  isDark?: boolean;
}

export default function Introductions({ isDark }: IntroductionsProps) {
  return (
    <div id="intro-section" className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-200 text-slate-850 shadow-xs'}`}>
      {/* Brand Header & Tag */}
      <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-6 mb-8 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div>
          <span className={`text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 border transition-all duration-500 mb-3 ${isDark ? 'bg-indigo-950/40 border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            01 Foundation • LingoVoice DS
          </span>
          <h1 className={`text-3xl sm:text-4xl font-black tracking-tight uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            English Voice Application UI Guidelines
          </h1>
          <p className={`text-sm mt-2 max-w-2xl leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Hệ thống các thành phần giao diện được tối ưu hoá cho trải nghiệm nói chuyện qua giọng nói 
            thời gian thực (Real-time Voice), giúp người dùng tự tin luyện nói Tiếng Anh mà không sợ sai.
          </p>
        </div>
        <div className={`flex items-center gap-2 p-3 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">
            E
          </div>
          <div>
            <div className={`font-extrabold text-xs uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Echo English</div>
            <div className="text-[11px] font-mono font-bold text-indigo-500">voice.live.system</div>
          </div>
        </div>
      </div>

      {/* 3 Core Design Pillars */}
      <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Core Design Pillars</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-5 rounded-2xl flex flex-col justify-between transition-all duration-500 ${isDark ? 'bg-indigo-950/20 border-indigo-900/40 text-indigo-200' : 'bg-indigo-50/40 border-indigo-100/50 text-slate-800'}`}>
          <div className="flex items-center justify-between pointer-events-none">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-900/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <span className="text-xs text-indigo-500 font-bold">PILLAR 01</span>
          </div>
          <div className="mt-4">
            <h4 className={`font-black text-sm uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Psychological Safety</h4>
            <p className={`text-xs mt-1.5 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Luyện nói dễ gây lo âu (speech anxiety). Hệ thống UI sử dụng tông màu ấm áp, các thông báo khuyến khích và bo tròn cực đại (rounded-3xl) để người dùng thấy thân thiện, không có cảm giác bị "chấm điểm" nặng nề.
            </p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl flex flex-col justify-between transition-all duration-500 ${isDark ? 'bg-sky-950/20 border-sky-900/40 text-sky-200' : 'bg-sky-50/40 border-sky-150 text-slate-800'}`}>
          <div className="flex items-center justify-between pointer-events-none">
            <div className={`w-10 h-10 leading-none rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-sky-900/40 text-sky-400' : 'bg-sky-100 text-sky-600'}`}>
              <Mic className="w-5.5 h-5.5" />
            </div>
            <span className="text-xs text-sky-600 font-bold">PILLAR 02</span>
          </div>
          <div className="mt-4">
            <h4 className={`font-black text-sm uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Physical State</h4>
            <p className={`text-xs mt-1.5 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Trạng thái micro và kết nối thoại được phản hồi ngay lập tức dưới dạng sóng xung động (Interactive Waves). Người dùng nhìn thấy rõ âm lượng của mình đang truyền về hệ thống để biết mic hoạt động ổn định.
            </p>
          </div>
        </div>

        <div className={`p-5 rounded-2xl flex flex-col justify-between transition-all duration-500 ${isDark ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200' : 'bg-emerald-50/40 border-emerald-150 text-slate-800'}`}>
          <div className="flex items-center justify-between pointer-events-none">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
              <MessageCircle className="w-5.5 h-5.5" />
            </div>
            <span className="text-xs text-emerald-600 font-bold">PILLAR 03</span>
          </div>
          <div className="mt-4">
            <h4 className={`font-black text-sm uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Diagnostic Feedback</h4>
            <p className={`text-xs mt-1.5 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Không chỉ cho điểm chung chung. Hệ thống chia tách chi tiết: phát âm IPA của từng từ, độ lưu loát (fluency), các lỗi ngữ pháp được minh hoạ trực quan từng chỗ sai và giải pháp sửa đổi với màu sắc tương quan rõ rệt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
