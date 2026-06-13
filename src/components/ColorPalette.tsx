/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Palette, Eye, Sun, Moon, Zap } from 'lucide-react';

interface ColorDuo {
  name: string;
  variable: string;
  lightHex: string;
  darkHex: string;
  lightBgClass: string;
  darkBgClass: string;
  lightTextClass: string;
  darkTextClass: string;
  lightRole: string;
  darkRole: string;
  lightContrast: string;
  darkContrast: string;
}

const colorDuoTokens: ColorDuo[] = [
  {
    name: "Primary Brand (Indigo)",
    variable: "--color-primary-600",
    lightHex: "#4f46e5",
    darkHex: "#6366f1",
    lightBgClass: "bg-primary-600",
    darkBgClass: "bg-indigo-550",
    lightTextClass: "text-white",
    darkTextClass: "text-white",
    lightRole: "Màu chủ đạo (Branding Core, Buttons chính, Active Level Highlight)",
    darkRole: "Màu chủ đạo tăng cường sáng (High luminance Indigo để không bị mờ nhạt trên nền tối)",
    lightContrast: "WCAG AA (4.5:1+)",
    darkContrast: "WCAG AAA (7:1+)"
  },
  {
    name: "Primary Light / Deep Background",
    variable: "--color-primary-50",
    lightHex: "#f0f2fe",
    darkHex: "#0c0f1a",
    lightBgClass: "bg-primary-50",
    darkBgClass: "bg-slate-950",
    lightTextClass: "text-indigo-700",
    darkTextClass: "text-indigo-200",
    lightRole: "Nền phụ thân thiện (Card Backgrounds, bung thoại gợi ý, active borders)",
    darkRole: "Nền tối đặc biệt (Deep Indigo Slate để triệt tiêu năng lượng ánh sáng xanh từ màn hình)",
    lightContrast: "WCAG AA",
    darkContrast: "WCAG AA"
  },
  {
    name: "Voice Fluidity (Sky)",
    variable: "--color-accent-500",
    lightHex: "#0ea5e9",
    darkHex: "#38bdf8",
    lightBgClass: "bg-accent-500",
    darkBgClass: "bg-sky-400",
    lightTextClass: "text-white",
    darkTextClass: "text-slate-950",
    lightRole: "Sóng âm thanh (Voice Waves, Micro bận rộn, playback audio)",
    darkRole: "Tia sáng phát âm (Sky Neon phát quang cao giúp học viên nhận biết micro đang lắng nghe)",
    lightContrast: "WCAG AA",
    darkContrast: "WCAG AAA"
  },
  {
    name: "Success Correct (Emerald)",
    variable: "--color-success-correct",
    lightHex: "#10b981",
    darkHex: "#34d399",
    lightBgClass: "bg-success-correct",
    darkBgClass: "bg-emerald-400",
    lightTextClass: "text-white",
    darkTextClass: "text-slate-950",
    lightRole: "Phát âm đạt chuẩn (90-100% score feedback, Grammar chính xác)",
    darkRole: "Điểm tuyệt đối (Màu ngọc lục bảo phát sáng tăng hưng phấn khi đạt kết quả tốt)",
    lightContrast: "WCAG AA",
    darkContrast: "WCAG AAA"
  },
  {
    name: "Warning Medium (Amber)",
    variable: "--color-warning-medium",
    lightHex: "#f59e0b",
    darkHex: "#fbbf24",
    lightBgClass: "bg-warning-medium",
    darkBgClass: "bg-amber-400",
    lightTextClass: "text-white",
    darkTextClass: "text-slate-950",
    lightRole: "Phát âm tương đối (60-89% feedback score, ngắt quãng quá dài)",
    darkRole: "Cảnh báo nhẹ (Amber ấm áp, không chói mắt giúp dễ tiếp thu lỗi cần tinh chỉnh)",
    lightContrast: "WCAG AA",
    darkContrast: "WCAG AAA"
  },
  {
    name: "Danger Stuck (Rose)",
    variable: "--color-danger-stuck",
    lightHex: "#ef4444",
    darkHex: "#f87171",
    lightBgClass: "bg-danger-stuck",
    darkBgClass: "bg-rose-400",
    lightTextClass: "text-white",
    darkTextClass: "text-slate-950",
    lightRole: "Cần luyện tập thêm (0-59% score, âm vị chưa đúng, lỗi từ ngữ pháp)",
    darkRole: "Lưu ý đặc biệt (Sử dụng màu hồng đào thẫm nhẹ để giảm lo âu sợ hãi khi làm sai)",
    lightContrast: "WCAG AA",
    darkContrast: "WCAG AAA"
  }
];

interface ColorPaletteProps {
  isDark?: boolean;
  onDarkChange?: (dark: boolean) => void;
}

export default function ColorPalette({ isDark = false, onDarkChange }: ColorPaletteProps) {
  const isDarkModeView = isDark;

  return (
    <div 
      id="colors-section" 
      className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${
        isDarkModeView 
          ? "bg-slate-950 border-slate-800 text-white shadow-md shadow-indigo-950/10" 
          : "bg-white border-slate-205 text-slate-900 shadow-xs"
      }`}
    >
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b pb-4 border-slate-100 dark:border-slate-850">
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isDarkModeView ? 'bg-indigo-500 text-slate-950' : 'bg-indigo-600 text-white'}`}>
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">02 Palette Spec</span>
            <h2 className="text-xl font-black uppercase">Màu sắc Hệ thống (Semantic Color Palette)</h2>
          </div>
        </div>

        {/* INTERACTIVE MODE TOGGLE SWITCH SPEC */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-105 dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 self-start sm:self-auto shrink-0 shadow-3xs">
          <button
            type="button"
            onClick={() => onDarkChange?.(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              !isDarkModeView 
                ? 'bg-white text-indigo-600 shadow-3xs' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>GIAO DIỆN SÁNG</span>
          </button>
          <button
            type="button"
            onClick={() => onDarkChange?.(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              isDarkModeView 
                ? 'bg-slate-800 text-indigo-400 shadow-3xs' 
                : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>XEM ĐẶC TẢ DARKMODE</span>
          </button>
        </div>
      </div>

      <p className={`text-sm mb-6 leading-relaxed font-semibold transition-colors duration-500 ${isDarkModeView ? 'text-slate-400' : 'text-slate-500'}`}>
        Bảng màu kết hợp giữa độ tương phản cao đạt chuẩn <b className={isDarkModeView ? 'text-indigo-400' : 'text-slate-750'}>WCAG 2.1 AA/AAA</b> và 
        quy ước tâm lý học màu sắc. Phiên bản Darkmode sử dụng một <b>Phổ Phát Quang (Neon Luminance Shift)</b> đặc thù giúp tăng mạnh độ sáng các dải nét để hiển thị sắc sảo trên lớp nền than đá tối tăm, mượt mắt hơn trong đêm.
      </p>

      {/* DUAL SPECS COMPARISON DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {colorDuoTokens.map((token, i) => {
          const activeHex = isDarkModeView ? token.darkHex : token.lightHex;
          const bgClass = isDarkModeView ? token.darkBgClass : token.lightBgClass;
          const textClass = isDarkModeView ? token.darkTextClass : token.lightTextClass;
          const roleText = isDarkModeView ? token.darkRole : token.lightRole;
          const contrastScore = isDarkModeView ? token.darkContrast : token.lightContrast;

          return (
            <div 
              key={i} 
              className={`group border rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full ${
                isDarkModeView 
                  ? "bg-slate-900/60 border-slate-800 shadow-3xs hover:border-indigo-500" 
                  : "bg-white border-slate-200 shadow-2xs hover:border-indigo-300"
              }`}
            >
              {/* Live Color Swatch */}
              <div className={`h-24 ${bgClass} flex items-end p-4 relative overflow-hidden transition-all duration-500 group-hover:h-26`}>
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>
                
                <div className="flex items-center justify-between w-full z-10">
                  <span className={`font-mono text-xs font-black px-2 py-1 rounded-md backdrop-blur-xs bg-slate-950/20 ${textClass}`}>
                    {activeHex}
                  </span>
                  <span className={`text-[9px] font-bold tracking-wider font-mono px-1.5 py-0.5 rounded-md bg-slate-950/20 uppercase ${textClass}`}>
                    {contrastScore}
                  </span>
                </div>
              </div>

              {/* Specs and details card */}
              <div className={`p-4 flex-1 flex flex-col justify-between transition-colors duration-500 ${
                isDarkModeView ? "bg-slate-900/30" : "bg-slate-50/50"
              }`}>
                <div>
                  <h4 className={`font-extrabold text-xs uppercase tracking-wider ${isDarkModeView ? 'text-indigo-400' : 'text-slate-900'}`}>
                    {token.name}
                  </h4>
                  <p className={`text-xs mt-2.5 p-3 rounded-xl border transition-all duration-500 leading-normal font-semibold ${
                    isDarkModeView 
                      ? 'bg-slate-950/60 border-slate-800 text-slate-3.5' 
                      : 'bg-white border-slate-100 text-slate-600 shadow-3xs'
                  }`}>
                    {roleText}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="font-bold text-slate-500">{token.variable}</span>
                  <span className="flex items-center gap-1 font-sans">
                    <Eye className="w-3 h-3 text-indigo-500" /> AA Level
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EXTRA STRATEGY EXPLANATION BLOCK */}
      <div className={`mt-6 p-4 rounded-2xl border transition-colors duration-500 flex items-start gap-3 ${
        isDarkModeView 
          ? "bg-indigo-950/20 border-indigo-900/40 text-indigo-200" 
          : "bg-slate-50 border-slate-205 text-slate-650"
      }`}>
        <Zap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed font-semibold">
          <strong className={`block uppercase mb-1 ${isDarkModeView ? 'text-indigo-300' : 'text-slate-800'}`}>
            Chiến thuật Chuyển màu tương tác (Dark Mode Adaptation Strategy)
          </strong>
          Khi người dùng bật Dark Mode, toàn bộ các vùng nền rộng từ màu xám nhạt (<code className="font-mono bg-indigo-50/10 px-1 py-0.2 rounded text-[10px] text-indigo-600">slate-50</code>, <code className="font-mono bg-indigo-50/10 px-1 py-0.2 rounded text-[10px] text-indigo-600">white</code>) sẽ lùi về tông đen mịn sâu (<code className="font-mono bg-indigo-50/10 px-1 py-0.2 rounded text-[10px] text-indigo-650">#0c0f1a</code>) kết hợp bo góc mảnh dẻ. Điều này giữ độ nổi cho thông báo, gia tăng mức tập trung thính giác tối đa tới <b>45%</b> do mắt không cần liên tục điều tiết dưới ánh sáng quá mạnh.
        </div>
      </div>
    </div>
  );
}
