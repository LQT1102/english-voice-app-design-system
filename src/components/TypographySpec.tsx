/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Type, ArrowDownRight, Edit2 } from 'lucide-react';

interface TypographySpecProps {
  isDark?: boolean;
}

export default function TypographySpec({ isDark }: TypographySpecProps) {
  const examples = [
    {
      level: "Display Heading (Hero / Level Up Score)",
      styleClass: `text-4xl font-extrabold tracking-tight font-sans ${isDark ? 'text-indigo-400' : 'text-primary-600'}`,
      fontName: "Outfit (ExtraBold 800) • 40px",
      useCase: "Màn hình hoàn thành, điểm số phát âm hiển thị to, hay đề mục chủ đề lớn.",
      preview: "Fabulous Speaking Streak! 🔥"
    },
    {
      level: "Topic / Session Card Header",
      styleClass: `text-xl font-bold tracking-normal font-sans ${isDark ? 'text-white' : 'text-slate-900'}`,
      fontName: "Outfit (Bold 700) • 20px",
      useCase: "Tiêu đề các bài học, hội thoại mẫu, tên mục cấu hình giọng nói.",
      preview: "Coffee Shop Negotiation (B2)"
    },
    {
      level: "AI Tutor Conversation Bubble",
      styleClass: `text-base font-normal leading-relaxed font-sans ${isDark ? 'text-slate-200' : 'text-slate-800'}`,
      fontName: "Outfit (Regular 400) • 16px",
      useCase: "Nội dung lời thoại của Mentor AI, câu hỏi gợi ý, bản dịch nghĩa chi tiết.",
      preview: "Could you repeat that? Try putting more emphasis on the 'sh' sound in 'Shop'."
    },
    {
      level: "Phonetics IPA Guide (Code)",
      styleClass: `text-sm font-semibold font-mono tracking-wider px-2 py-0.5 rounded-md inline-block ${isDark ? 'text-indigo-400 bg-indigo-950/40 border border-indigo-900/60' : 'text-primary-600 bg-primary-50'}`,
      fontName: "JetBrains Mono (SemiBold 600) • 14px",
      useCase: "Hiển thị ký âm quốc tế IPA giúp người dùng sửa cơ miệng khi phát âm sai.",
      preview: "/ˌpəʊ.pjuˈlæɹ.ə.ti/"
    },
    {
      level: "Subtext / Small Translation Annotations",
      styleClass: "text-xs font-normal text-slate-400 italic font-sans",
      fontName: "Outfit (Light 300) • 12px",
      useCase: "Bản dịch nghĩa thầm lặng dưới câu nói tiếng Anh, trạng thái thời lượng ghi âm.",
      preview: "Bạn có thể lặp lại điều đó không? Hãy thử nhấn mạnh âm 'sh' trong 'Shop'."
    }
  ];

  return (
    <div id="typography-section" className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md' : 'bg-white border-slate-200 text-slate-850 shadow-xs'}`}>
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <Type className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">03 Typography</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Quy chuẩn Chữ viết (Typography System)</h2>
        </div>
      </div>

      <p className={`text-sm mb-6 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Phông chữ chính là <b className={isDark ? 'text-indigo-400' : 'text-slate-805'}>Outfit</b> (phông sans-serif hiện đại với các vòng tròn học thuật, mang sắc thái trò chuyện thân mật đặc thù của Duolingo hay ELSA). 
        Đối với hệ IPA, sử dụng <b className={isDark ? 'text-indigo-400' : 'text-slate-805'}>JetBrains Mono</b> để đảm bảo các ký tự âm tiết đặc biệt không bị vỡ hoặc thay đổi ký tự hiển thị.
      </p>

      {/* Font pairing visual cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-6xl font-black text-slate-200 dark:text-slate-800 font-sans pointer-events-none select-none">Aa</div>
          <h4 className={`font-extrabold font-sans text-sm mt-2 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Outfit Sans-serif</h4>
          <p className={`text-xs mt-1 leading-normal transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sử dụng cho UI, nhãn nút hành động, văn bản giọng nói chính, các dòng dịch nghĩa và điểm CEFR.
          </p>
        </div>

        <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-6xl font-black text-slate-200 dark:text-slate-800 font-mono pointer-events-none select-none">/ʃ/</div>
          <h4 className={`font-extrabold font-mono text-sm mt-2 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>JetBrains Mono</h4>
          <p className={`text-xs mt-1 leading-normal transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sử dụng cho hệ IPA phát âm, thời lượng ghi âm của luồng voice server và các thông tin số liệu lập trình.
          </p>
        </div>
      </div>

      {/* Typography Scale Table */}
      <div className="space-y-6">
        {examples.map((item, index) => (
          <div key={index} className={`flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-all duration-300`}>
            <div className="md:w-1/3 min-w-[200px]">
              <span className={`text-xs font-extrabold font-sans uppercase tracking-wider block ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {item.level}
              </span>
              <span className="text-xs font-mono text-slate-400 mt-0.5 block">
                {item.fontName}
              </span>
              <p className={`text-xs mt-1.5 leading-relaxed font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {item.useCase}
              </p>
            </div>

            <div className={`flex-1 p-4 rounded-xl border shadow-2xs transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-[10px] font-mono text-slate-300 block mb-1">PREVIEW:</span>
              <div className={item.styleClass}>
                {item.preview}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
