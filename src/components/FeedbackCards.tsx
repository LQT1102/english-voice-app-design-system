/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, Languages, Star, CheckCircle2, TrendingUp, AlertTriangle, HelpCircle, CornerDownRight } from 'lucide-react';

interface FeedbackCardsProps {
  isDark?: boolean;
}

export default function FeedbackCards({ isDark = false }: FeedbackCardsProps) {
  const [showTranslation, setShowTranslation] = useState(false);

  // Raw mock state for pronunciation feedback
  const mockSyllables = [
    { word: "I", score: 98, status: "perfect", ipa: "aɪ" },
    { word: "really", score: 95, status: "perfect", ipa: "ˈrɪə.li" },
    { word: "want", score: 88, status: "good", ipa: "wɒnt" },
    { word: "to", score: 91, status: "perfect", ipa: "tuː" },
    { word: "improve", score: 45, status: "needs-improvement", ipa: "ɪmˈpruːv" }, // bad pronunciation
    { word: "my", score: 96, status: "perfect", ipa: "maɪ" },
    { word: "pronunciation", score: 52, status: "needs-improvement", ipa: "prəˌnʌn.siˈeɪ.ʃən" } // bad pronunciation
  ];

  return (
    <div id="diagnostics-section" className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-200 text-slate-850 shadow-xs'}`}>
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">06 AI Diagnostics</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Mẫu Đánh giá & Chẩn đoán (Diagnostic Feedback UI)</h2>
        </div>
      </div>

      <p className={`text-sm mb-8 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Thành phần cốt lõi chứng minh tính ưu việt của AI Tutor. Giúp học viên nhận diện điểm tắc nghẽn trong phát âm, ngữ pháp và tốc độ nói qua các chỉ số chi tiết, trực quan.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Conversation bubbles & Pronunciation check */}
        <div className="space-y-6">
          
          {/* Component 1: Tutor Chat Bubble with translate button */}
          <div className={`rounded-2xl rounded-tl-sm p-5 border relative shadow-3xs transition-colors duration-500 ${
            isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-[9px] uppercase font-bold tracking-wider font-mono absolute -top-2.5 left-4 px-2 py-0.5 border rounded-md transition-colors duration-500 ${
              isDark ? 'bg-slate-900 border-slate-750 text-indigo-400' : 'bg-white border-slate-200 text-indigo-600'
            }`}>
              AI Tutor Bubble
            </span>
            
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold leading-none shrink-0 mt-1">
                AI
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-extrabold text-sm transition-colors duration-500 ${isDark ? 'text-slate-250' : 'text-slate-800'}`}>Lexi (Conversational Coach)</span>
                  <span className="text-[10px] bg-sky-950/40 text-sky-400 border border-sky-900/60 px-1.5 py-0.5 rounded-sm font-semibold tracking-wide">TTS READY</span>
                </div>
                
                <h4 className={`text-base leading-normal font-bold transition-colors duration-500 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  "Hi! That's a great start. When saying <b className={`underline underline-offset-4 decoration-wavy transition-colors duration-500 ${isDark ? 'text-indigo-400' : 'text-indigo-705'}`}>improve</b>, your lips should round more tightly. Let's try it together."
                </h4>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
                  <button 
                    type="button" 
                    id="tutor-tts-test"
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer shadow-3xs transition-all ${
                      isDark 
                        ? 'text-indigo-400 bg-slate-900 hover:bg-slate-850 border-slate-750' 
                        : 'text-indigo-600 bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe AI đọc mẫu
                  </button>
                  <button 
                    type="button" 
                    id="tutor-translate-toggle"
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer transition-all ${
                      isDark 
                        ? 'text-slate-300 bg-slate-900 hover:bg-slate-850 border-slate-750 hover:text-white' 
                        : 'text-slate-650 bg-white hover:bg-slate-50 border-slate-200 hover:text-slate-800'
                    }`}
                  >
                    <Languages className="w-3.5 h-3.5" /> {showTranslation ? "Ẩn dịch nghĩa" : "Xem dịch nghĩa VN"}
                  </button>
                </div>

                {showTranslation && (
                  <div className={`p-3 rounded-xl border mt-3 text-xs leading-relaxed italic animate-fade-in font-semibold transition-colors duration-500 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-650'
                  }`}>
                    "Chào bạn! Khởi đầu rất tuyệt. Khi nói từ 'improve', môi của bạn nên tròn chặt hơn một chút. Hãy thử cùng tôi nào."
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Component 2: Word-by-word pronunciation highlights */}
          <div className={`p-5 rounded-2xl border shadow-3xs transition-colors duration-500 ${
            isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'
          }`}>
            <span className={`text-[9px] uppercase font-bold tracking-widest font-mono px-2.5 py-1 rounded border transition-colors duration-500 ${
              isDark ? 'bg-indigo-950/40 border-indigo-900/60 text-indigo-400' : 'bg-purple-50 border-purple-100 text-[#a855f7]'
            }`}>
              02 • PRONUNCIATION WORD HIGHLIGHTS
            </span>
            <h4 className={`font-extrabold text-sm mt-3 mb-1 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Chẩn đoán âm tiết từng chữ</h4>
            <p className={`text-xs leading-relaxed mb-6 font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Di chuột hoặc chạm vào chữ để xem phiên âm IPA và hướng dẫn sửa đổi khẩu hình cơ miệng.
            </p>

            {/* Interactive words array sentence layout */}
            <div className={`flex flex-wrap items-end gap-x-2.5 gap-y-4 p-4 rounded-xl border transition-colors duration-500 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              {mockSyllables.map((word, i) => {
                let colorBg = '';
                let colorText = '';
                let borderStyle = '';
                if (word.status === 'perfect') {
                  colorBg = isDark ? 'bg-emerald-950/30' : 'bg-emerald-50';
                  colorText = isDark ? 'text-emerald-400 font-bold' : 'text-emerald-700 font-bold';
                  borderStyle = isDark ? 'border-emerald-900/60' : 'border-emerald-200';
                } else if (word.status === 'good') {
                  colorBg = isDark ? 'bg-amber-950/30' : 'bg-amber-50';
                  colorText = isDark ? 'text-amber-400 font-bold' : 'text-amber-700 font-bold';
                  borderStyle = isDark ? 'border-amber-900/60' : 'border-amber-200';
                } else {
                  colorBg = isDark ? 'bg-rose-950/30 border-dashed animate-pulse-slow' : 'bg-rose-50 border-rose-200 border-dashed animate-pulse-slow';
                  colorText = isDark ? 'text-rose-400 font-black' : 'text-rose-700 font-black';
                  borderStyle = isDark ? 'border-rose-900/60' : 'border-rose-300';
                }

                return (
                  <div key={i} className="flex flex-col items-center">
                    {/* IPA phonetic text */}
                    <span className="text-[10px] font-mono text-slate-400 tracking-tighter mb-1 select-all font-bold">
                      /{word.ipa}/
                    </span>
                    {/* Word Box */}
                    <div className={`px-2.5 py-1.5 rounded-xl border ${colorBg} ${borderStyle} transition-all duration-300 hover:scale-105 cursor-help flex flex-col items-center shadow-3xs`}>
                      <span className={`text-sm ${colorText}`}>{word.word}</span>
                      <span className="text-[9px] font-bold text-slate-400 mt-0.5">{word.score}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Phonetic Legend */}
            <div className={`grid grid-cols-3 gap-2 mt-4 pt-4 border-t text-[10px] transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-150'}`}>
              <div className={`flex items-center gap-1.5 font-semibold px-2 py-1 rounded-md transition-colors duration-500 ${
                isDark ? 'text-emerald-400 bg-emerald-950/20' : 'text-emerald-700 bg-emerald-50'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Perfect (&gt;90%)
              </div>
              <div className={`flex items-center gap-1.5 font-semibold px-2 py-1 rounded-md transition-colors duration-500 ${
                isDark ? 'text-amber-400 bg-amber-950/20' : 'text-amber-700 bg-amber-50'
              }`}>
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Acceptable (60-89%)
              </div>
              <div className={`flex items-center gap-1.5 font-semibold px-2 py-1 rounded-md transition-colors duration-500 ${
                isDark ? 'text-rose-450 bg-rose-950/20' : 'text-rose-700 bg-rose-50'
              }`}>
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Repronounce (&lt;60%)
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Scores Breakdown & Grammar Diff */}
        <div className="space-y-6">
          
          {/* Component 3: Diagnostic radial meters */}
          <div className={`p-5 rounded-2xl border shadow-3xs transition-colors duration-500 ${
            isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'
          }`}>
            <span className={`text-[9px] uppercase font-bold tracking-widest font-mono px-2.5 py-1 rounded border transition-colors duration-500 ${
              isDark ? 'bg-indigo-950/40 border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 border-indigo-150 text-indigo-600'
            }`}>
              03 • PERFORMANCE RATINGS
            </span>
            <h4 className={`font-extrabold text-sm mt-3 mb-1 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Chỉ số đánh giá (Evaluation)</h4>
            <p className={`text-xs leading-relaxed mb-4 font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Biểu diễn thông tin tiến độ tổng quan sau hội thoại bằng hệ thống điểm phần trăm.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {/* Score 1 */}
              <div className={`p-4 border rounded-xl relative flex flex-col items-center transition-colors duration-500 ${
                isDark ? 'bg-slate-900 border-slate-840' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] font-black text-slate-400 font-sans tracking-wide">PHÁT ÂM</span>
                <div className="mt-3 relative w-16 h-16 flex items-center justify-center">
                  <svg className="absolute inset-0 w-16 h-16 rounded-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="4" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray="176" strokeDashoffset="176" className="transition-all duration-1000" style={{ strokeDashoffset: '40' }} />
                  </svg>
                  <span className={`text-sm font-extrabold ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>77%</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md mt-2 font-bold uppercase ${
                  isDark ? 'text-amber-400 bg-amber-950/30' : 'text-amber-600 bg-amber-50'
                }`}>Khá tốt</span>
              </div>

              {/* Score 2 */}
              <div className={`p-4 border rounded-xl relative flex flex-col items-center transition-colors duration-500 ${
                isDark ? 'bg-slate-900 border-slate-840' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] font-black text-slate-400 font-sans tracking-wide">ĐỘ LƯU LOÁT</span>
                <div className="mt-3 relative w-16 h-16 flex items-center justify-center">
                  <svg className="absolute inset-0 w-16 h-16 rounded-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="4" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="176" strokeDashoffset="176" className="transition-all duration-1000" style={{ strokeDashoffset: '14' }} />
                  </svg>
                  <span className={`text-sm font-extrabold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>92%</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md mt-2 font-bold uppercase ${
                  isDark ? 'text-emerald-400 bg-emerald-950/30' : 'text-emerald-600 bg-emerald-50'
                }`}>Trôi chảy</span>
              </div>

              {/* Score 3 */}
              <div className={`p-4 border rounded-xl relative flex flex-col items-center transition-colors duration-500 ${
                isDark ? 'bg-slate-900 border-slate-840' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[10px] font-black text-slate-400 font-sans tracking-wide">NGỮ PHÁP</span>
                <div className="mt-3 relative w-16 h-16 flex items-center justify-center">
                  <svg className="absolute inset-0 w-16 h-16 rounded-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="4" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="176" strokeDashoffset="176" className="transition-all duration-1000" style={{ strokeDashoffset: '88' }} />
                  </svg>
                  <span className={`text-sm font-extrabold ${isDark ? 'text-rose-455' : 'text-rose-700'}`}>50%</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md mt-2 font-bold uppercase ${
                  isDark ? 'text-rose-400 bg-rose-950/30' : 'text-rose-600 bg-rose-50'
                }`}>Cần sửa</span>
              </div>
            </div>
          </div>

          {/* Component 4: Grammar smart correction with diff highlighting */}
          <div className={`p-5 rounded-2xl border shadow-3xs relative overflow-hidden transition-colors duration-500 ${
            isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'
          }`}>
            <span className={`text-[9px] uppercase font-bold tracking-widest font-mono px-2.5 py-1 rounded border transition-colors duration-500 ${
              isDark ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-[#10b981]'
            }`}>
              04 • GRAMMAR INTELLIGENT REFORMULATOR
            </span>
            <h4 className={`font-extrabold text-sm mt-3 mb-1 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Cải thiện phát ngôn & Ngữ pháp</h4>
            <p className={`text-xs leading-relaxed mb-4 font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              AI phân tích ngữ pháp trong câu trả lời thoại, đề xuất câu nói tự nhiên (natural speaker usage) để bạn nâng cấp cách giao tiếp.
            </p>

            <div className={`space-y-3 p-4 rounded-xl border transition-colors duration-500 ${
              isDark ? 'bg-slate-900 border-slate-850' : 'bg-slate-50 border-slate-200'
            }`}>
              {/* User text with mistake */}
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-rose-500 font-mono tracking-wide uppercase">CÂU BẠN NÓI KHI NAY:</span>
                <div className={`flex items-center gap-2 text-sm transition-colors duration-500 ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                  <span className="text-rose-500 font-semibold line-through">"I no like drink coffees in mornings."</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="text-slate-350 flex items-center pl-4 gap-1.5">
                <CornerDownRight className="w-4 h-4 text-indigo-400 animate-bounce-horizontal" />
                <span className={`text-[10px] font-mono font-bold px-1.5 rounded border transition-colors duration-500 ${
                  isDark ? 'bg-indigo-950/40 border-indigo-900/40 text-indigo-400' : 'bg-indigo-50 border-indigo-150 text-indigo-650'
                }`}>Gợi ý sửa đổi</span>
              </div>

              {/* AI Professional correction */}
              <div className={`space-y-1 p-3.5 rounded-xl border shadow-3xs transition-colors duration-500 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-emerald-100'
              }`}>
                <span className="text-[9px] font-bold text-emerald-600 font-mono tracking-wide uppercase">CÁCH BẢN XỨ HAY NÓI:</span>
                <div className={`text-sm font-bold flex flex-wrap items-center gap-1 transition-colors duration-500 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  "I <span className={`rounded-md px-1 py-0.5 font-extrabold shadow-sm transition-colors duration-500 ${isDark ? 'bg-emerald-950/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`}>don't like</span> drinking <span className={`rounded-md px-1 py-0.5 font-extrabold shadow-sm transition-colors duration-500 ${isDark ? 'bg-emerald-950/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`}>coffee</span> in the <span className={`rounded-md px-1 py-0.5 font-extrabold shadow-sm transition-colors duration-500 ${isDark ? 'bg-emerald-950/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`}>morning</span>."
                </div>

                <div className={`text-[11px] mt-2 leading-relaxed italic border-t pt-2 font-medium transition-colors duration-500 ${
                  isDark ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-emerald-50'
                }`}>
                  <b>Giải thích từ AI Tutor:</b> Trong tiếng Anh, phủ định động từ thường dùng trợ động từ "don't like". Danh từ "coffee" là không đếm được ở ngữ cảnh thói quen chung, và cụm từ cố định là "in the morning".
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
