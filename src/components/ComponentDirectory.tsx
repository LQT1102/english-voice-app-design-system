/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Type, 
  Radio, 
  Settings, 
  TrendingUp, 
  Compass, 
  MessageSquareCode, 
  ArrowRight,
  ShieldCheck,
  Volume2,
  Mic,
  BookmarkCheck,
  Eye,
  CheckCircle2,
  ListCollapse,
  Layers,
  Flame,
  Award
} from 'lucide-react';

interface ComponentDirectoryProps {
  onScrollTo: (targetId: string, tabId: string) => void;
  isDark?: boolean;
}

export default function ComponentDirectory({ onScrollTo, isDark = false }: ComponentDirectoryProps) {
  const [selectedSubTab, setSelectedSubTab] = useState<string>('intro');

  const directoryItems = [
    {
      id: 'intro',
      name: 'Triết lý Thiết kế (Foundations)',
      anchor: 'intro-section',
      icon: Sparkles,
      desc: '3 trụ cột tâm lý học và trạng thái vật lý thiết lập tính an toàn, giảm lo âu cho học viên nói tiếng Anh.',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`grid grid-cols-3 gap-2 p-3 rounded-xl border h-28 items-center text-center transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-55 border-slate-200'}`}>
          <div className={`p-2 rounded-lg border flex flex-col items-center justify-center shadow-3xs h-full transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'}`}>
            <ShieldCheck className="w-4 h-4 text-indigo-550 mb-1" />
            <span className={`text-[9px] font-black uppercase ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Safety</span>
          </div>
          <div className={`p-2 rounded-lg border flex flex-col items-center justify-center shadow-3xs h-full transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-150'}`}>
            <Mic className="w-4 h-4 text-sky-500 mb-1" />
            <span className={`text-[9px] font-black uppercase ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>State</span>
          </div>
          <div className={`p-2 rounded-lg border flex flex-col items-center justify-center shadow-3xs h-full transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-100'}`}>
            <TrendingUp className="w-4 h-4 text-emerald-500 mb-1" />
            <span className={`text-[9px] font-black uppercase ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Feedback</span>
          </div>
        </div>
      )
    },
    {
      id: 'colors',
      name: 'Màu sắc Hệ thống (Palettes)',
      anchor: 'colors-section',
      icon: Palette,
      desc: 'Quy chuẩn bảng màu tương phản đạt chuẩn WCAG AA bao gồm Indigo, Sky, Emerald, Amber, và Rose.',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`flex items-center justify-center gap-1.5 p-4 rounded-xl border h-28 transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-55 border-slate-200'}`}>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-indigo-600 shadow-3xs border-2 border-white dark:border-slate-800 ring-1 ring-indigo-100"></div>
            <span className="text-[8px] font-mono font-bold text-slate-500">Core</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-indigo-400 shadow-3xs border-2 border-white dark:border-slate-800 ring-1 ring-sky-100"></div>
            <span className="text-[8px] font-mono font-bold text-slate-500">Voice</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-emerald-500 shadow-3xs border-2 border-white dark:border-slate-800 ring-1 ring-emerald-100"></div>
            <span className="text-[8px] font-mono font-bold text-slate-500">Pass</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-amber-500 shadow-3xs border-2 border-white dark:border-slate-800 ring-1 ring-amber-100"></div>
            <span className="text-[8px] font-mono font-bold text-slate-500">Mid</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-rose-500 shadow-3xs border-2 border-white dark:border-slate-800 ring-1 ring-rose-100"></div>
            <span className="text-[8px] font-mono font-bold text-slate-500">Fail</span>
          </div>
        </div>
      )
    },
    {
      id: 'typography',
      name: 'Typography (Jakarta Sans)',
      anchor: 'typography-section',
      icon: Type,
      desc: 'Tỷ lệ chữ vàng (Jakarta Sans display, titles, body & mono) đảm bảo nhịp đọc thư giãn.',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`flex flex-col justify-center gap-2 p-3.5 rounded-xl border h-28 transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-55 border-slate-200'}`}>
          <div className="border-l-3 border-indigo-650 pl-2">
            <h5 className={`text-xs font-black tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>PLUS OUTFIT SANS</h5>
            <span className="text-[8px] font-mono text-slate-400 font-bold tracking-widest block mt-0.5">DISPLAY COMPONENT</span>
          </div>
          <p className={`text-[9px] font-medium leading-relaxed italic border-t pt-1.5 transition-colors duration-500 ${isDark ? 'text-slate-400 border-slate-800' : 'text-slate-650 border-slate-200'}`}>
            /font-sans/ for natural humans readability.
          </p>
        </div>
      )
    },
    {
      id: 'mic',
      name: 'Nút Giao thoại (Stateful Mic)',
      anchor: 'mic-states-section',
      icon: Radio,
      desc: 'Các trạng thái nút Micro tích hợp (Idle, Listening, Processing, Speaking, Muted).',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`flex items-center justify-around gap-2 p-3 rounded-xl border h-28 transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-55 border-slate-200'}`}>
          {/* Mock idle indicator */}
          <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-indigo-600 shadow-3xs hover:scale-105 transition-all ${isDark ? 'bg-slate-950 border-slate-800 text-indigo-400' : 'bg-white border-slate-250 text-indigo-600'}`}>
            <Mic className="w-4 h-4" />
          </div>
          {/* Mock listening active */}
          <div className="relative w-11 h-11 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shadow-3xs ring-2 ring-rose-500/10">
            <div className="absolute inset-0.5 rounded-full bg-rose-505 text-white flex items-center justify-center">
              <Mic className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          {/* Mock processing */}
          <div className={`w-9 h-9 rounded-full border flex items-center justify-center shadow-3xs transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'}`}>
            <TrendingUp className="w-4 h-4 animate-wrap-spin" />
          </div>
        </div>
      )
    },
    {
      id: 'waves',
      name: 'Sóng Âm Thanh (Audio Wave)',
      anchor: 'visualizers-section',
      icon: Settings,
      desc: 'Gồm CSS Simulation tuần hoàn êm dịu và Web Audio Analyzer bám theo decibel micro người dùng.',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`flex items-center justify-center gap-1 p-4 rounded-xl border h-28 transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-55 border-slate-200'}`}>
          {[0.6, 1.3, 0.8, 1.5, 1.1, 0.4, 1.4, 0.7, 1.2, 0.5, 0.9].map((mult, id) => (
            <div 
              key={id} 
              className={`w-1 rounded-full ${isDark ? 'bg-indigo-400' : 'bg-indigo-650'}`}
              style={{
                height: `${12 + 24 * mult}px`,
                animation: `voicePulse ${1.4 * mult}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      )
    },
    {
      id: 'diagnostics',
      name: 'Chẩn đoán AI (AI Diagnostics)',
      anchor: 'diagnostics-section',
      icon: TrendingUp,
      desc: 'Bong bóng đàm thoại AI, sửa lỗi ngữ pháp, nhãn IPA, chuẩn hóa phát âm.',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`flex flex-col justify-between p-3 rounded-xl border h-28 text-[9px] transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-55 border-slate-200'}`}>
          <div className={`px-2 py-1.5 rounded-lg border leading-normal transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850 text-slate-300 pointer-events-none' : 'bg-white border-slate-200 text-slate-705'}`}>
            "Your lips should <span className="text-indigo-500 font-extrabold underline decoration-wavy">close</span> more..."
          </div>
          <div className="flex gap-1.5 justify-center">
            <span className={`px-1 rounded-md border font-extrabold transition-colors duration-500 ${isDark ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60' : 'bg-emerald-50 text-emerald-800 border-emerald-100'}`}>He /hi/</span>
            <span className={`px-1 rounded-md border font-extrabold transition-colors duration-500 ${isDark ? 'bg-rose-950/40 text-rose-400 border-rose-900/60' : 'bg-rose-50 text-rose-800 border-rose-100'}`}>is /ɪz/</span>
          </div>
        </div>
      )
    },
    {
      id: 'navigation',
      name: 'Khung Level & Thẻ Lộ trình',
      anchor: 'navigation-section',
      icon: Compass,
      desc: 'Level badges chuẩn khung CEFR và hệ thống thẻ bài học (Explore Topic Cards) trực quan hấp dẫn.',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`flex flex-col justify-around p-2.5 rounded-xl border h-28 transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-55 border-slate-200'}`}>
          <div className={`flex justify-between items-center p-1.5 rounded-lg border shadow-3xs transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'}`}>
            <span className="bg-indigo-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded">B2 LEVEL</span>
            <span className="text-[8px] text-slate-400 font-semibold uppercase">5 phút</span>
          </div>
          <div className={`flex items-center gap-1 text-[9px] font-bold pl-1 transition-colors duration-500 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            <Award className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">Thuyết trình chuyên nghiệp</span>
          </div>
        </div>
      )
    },
    {
      id: 'standardElements',
      name: 'Thư Viện Linh Kiện (Core UI Atoms)',
      anchor: 'standard-components-section',
      icon: Layers,
      desc: 'Bộ 12 nguyên tử giao diện cốt lõi: Modal, Button, Avatar, Card, Breadcrumbs, Menu, Toast, Label, Select, Input, Drawer, Skeleton.',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`grid grid-cols-2 gap-1.5 p-2 h-28 rounded-xl border text-[8px] justify-center items-center transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-55 border-slate-200'}`}>
          <div className={`p-1 rounded border text-center font-black truncate shadow-3xs uppercase transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850 text-indigo-400' : 'bg-white border-slate-200 text-indigo-650'}`}>[Button]</div>
          <div className={`p-1 rounded border text-center font-medium truncate shadow-3xs transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850 text-slate-400' : 'bg-white border-slate-150 text-slate-505'}`}>Avatar • AM</div>
          <div className="bg-indigo-600 text-white p-1 rounded text-center text-[7px] font-bold truncate col-span-2">Modal Active</div>
        </div>
      )
    },
    {
      id: 'sandbox',
      name: 'Sân Chơi (Speaks Sandbox)',
      anchor: 'sandbox-section',
      icon: MessageSquareCode,
      desc: 'Hộp tương tác kết hợp toàn diện âm thanh của mic, phản hồi bong bóng chấm điểm, bảng chỉ số tức thì.',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      uiPreview: (
        <div className={`flex flex-col justify-between p-2.5 rounded-xl relative overflow-hidden h-28 text-white border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-805' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex justify-between items-center text-[7px] text-indigo-300 font-extrabold uppercase font-mono">
            <span>READY SANDBOX</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
          </div>
          <div className="text-[10px] font-black text-center text-amber-300">
            77% • B2 Fluent
          </div>
          <div className="text-[8px] text-slate-400 text-center font-mono italic">
            "Phân tích giọng thật của bạn..."
          </div>
        </div>
      )
    }
  ];

  return (
    <div id="directory-section" className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-250 text-slate-850 shadow-xs'}`}>
      
      {/* Directory Section Header */}
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <ListCollapse className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">01 Component Catalog Directory</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Bản Đồ Cấu Phần & Mục Lục Giao Diện (Components Index Shelf)</h2>
        </div>
      </div>

      <p className={`text-sm mb-8 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Mục lục tổng hợp toàn cảnh hệ thống thiết kế. Mỗi cấu phần đi kèm tên gọi chuẩn hóa, vai trò cốt lõi trong phác đồ Lingo-Voice cùng một <b>UI Mini Preview</b> xem thử trước trực quan để nhà phát triển và thiết kế dễ dàng tham chiếu. Click vào bất cứ cấu phần nào để tự động di chuyển thẳng tới phần chính tương ứng.
      </p>

      {/* Grid containing interactive mini components layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {directoryItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className={`rounded-2xl border overflow-hidden transition-all duration-500 flex flex-col justify-between ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 hover:border-indigo-650' 
                  : 'bg-white border-slate-205 hover:border-indigo-400 hover:shadow-xs'
              }`}
            >
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className={`flex items-center gap-2 mb-2 pb-2.5 border-b ${isDark ? 'border-slate-850' : 'border-slate-100'}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-indigo-400 font-black uppercase tracking-wider">
                        Component 0{index + 1}
                      </span>
                      <h4 className={`font-black text-xs uppercase line-clamp-1 transition-colors duration-500 ${isDark ? 'text-slate-150' : 'text-slate-900'}`}>
                        {item.name.split(' (')[0]}
                      </h4>
                    </div>
                  </div>

                  <p className={`text-[10px] font-medium leading-relaxed mb-4 transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-505'}`}>
                    {item.desc}
                  </p>
                </div>

                {/* Simulated UI Box Container */}
                <div className="my-3 overflow-hidden rounded-xl">
                  {item.uiPreview}
                </div>
              </div>

              {/* Action trigger footer bar */}
              <button 
                type="button"
                onClick={() => onScrollTo(item.anchor, item.id)}
                className={`w-full border-t text-[10px] font-bold py-2.5 px-3 flex items-center justify-between transition-all cursor-pointer uppercase tracking-wider ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 hover:bg-indigo-600 text-indigo-400 hover:text-white' 
                    : 'bg-slate-50 border-slate-205 hover:bg-indigo-600 hover:text-white text-indigo-600'
                }`}
              >
                <span>Xem Chi Tiết Components</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
