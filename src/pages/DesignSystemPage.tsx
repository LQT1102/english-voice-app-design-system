/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Introductions from '../components/Introductions';
import ComponentDirectory from '../components/ComponentDirectory';
import ColorPalette from '../components/ColorPalette';
import TypographySpec from '../components/TypographySpec';
import VoiceControls from '../components/VoiceControls';
import VoiceVisualizers from '../components/VoiceVisualizers';
import FeedbackCards from '../components/FeedbackCards';
import NavigationAndCards from '../components/NavigationAndCards';
import StandardUIElements from '../components/StandardUIElements';
import VoiceSandbox from '../components/VoiceSandbox';
import LiveVoiceScreenSpec from '../components/LiveVoiceScreenSpec';
import DeveloperExporter from '../components/DeveloperExporter';
import { useTheme } from '../contexts/ThemeContext';

import {
  Sparkles,
  Palette,
  Type,
  Radio,
  Settings,
  TrendingUp,
  Compass,
  MessageSquareCode,
  Info,
  ListCollapse,
  Layers,
  ChevronDown,
  ChevronUp,
  FileDown,
  MessageCircle,
} from 'lucide-react';

export default function DesignSystemPage() {
  const { isDark, setIsDark } = useTheme();
  const [activeTab, setActiveTab] = useState('intro');
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const navigationItems = [
    { id: 'intro', label: '1. Triết lý Thiết kế', icon: Sparkles, target: 'intro-section' },
    { id: 'directory', label: '2. Mục Lục Linh Kiện', icon: ListCollapse, target: 'directory-section' },
    { id: 'colors', label: '3. Màu sắc Hệ thống', icon: Palette, target: 'colors-section' },
    { id: 'typography', label: '4. Quy chuẩn Chữ viết', icon: Type, target: 'typography-section' },
    { id: 'mic', label: '5. Nút Giao tiếp Mic', icon: Radio, target: 'mic-states-section' },
    { id: 'waves', label: '6. Sóng và Tương tác', icon: Settings, target: 'visualizers-section' },
    { id: 'diagnostics', label: '7. Mẫu Chẩn đoán AI', icon: TrendingUp, target: 'diagnostics-section' },
    { id: 'navigation', label: '8. Khung Level & Thẻ', icon: Compass, target: 'navigation-section' },
    { id: 'standardElements', label: '9. Thư Viện Linh Kiện', icon: Layers, target: 'standard-components-section' },
    { id: 'liveVoice', label: '10. Phòng Gọi Live Voice', icon: MessageCircle, target: 'live-voice-sec' },
    { id: 'sandbox', label: '11. Sân Chơi Thử Nghiệm', icon: MessageSquareCode, target: 'sandbox-section' },
    { id: 'exporter', label: '12. Xuất Bản Tài Liệu', icon: FileDown, target: 'exporter-section' },
  ];

  const handleScrollTo = (targetId: string, tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Automatically update active tab on scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const item of navigationItems) {
        const element = document.getElementById(item.target);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 pb-16 transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* Top Banner Accent */}
      <div className="bg-slate-900 text-white text-xs px-4 py-2.5 flex items-center justify-center gap-2 font-bold tracking-wide border-b border-slate-800">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
        <span>
          <b>Bản Thiết Kế Hệ Thống Components (Bento Spec Sheet)</b> tối ưu hóa trải nghiệm Voice Real-time & luyện nói tiếng Anh
        </span>
        <span className="hidden md:inline-block px-1.5 py-0.5 bg-white/20 rounded font-black font-mono">v1.1.0</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Main top header */}
        <header
          className={`rounded-3xl border p-6 mb-8 flex flex-wrap items-center justify-between gap-6 shadow-xs transition-colors duration-500 ${
            isDark ? 'bg-slate-900 border-slate-800 text-white shadow-md shadow-indigo-950/10' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-4 lg:pl-20">
            <div
              className={`w-12 h-12 font-black text-2xl flex items-center justify-center rounded-2xl shadow-xs transition-colors duration-500 ${
                isDark ? 'bg-indigo-650 text-white' : 'bg-slate-900 text-white'
              }`}
            >
              E
            </div>
            <div>
              <h2 className={`text-xl sm:text-2xl font-black tracking-tight uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Echo English Spec Sheet
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">design-guidelines.react.live-speech</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode toggle button */}
            <button
              type="button"
              id="theme-global-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              className={`font-black text-xs px-4 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 shadow-3xs active:scale-95 duration-200 ${
                isDark
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-600'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-850'
              }`}
            >
              {isDark ? (
                <>
                  <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                  <span>GIAO DIỆN SÁNG (LIGHT MODE)</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>GIAO DIỆN TỐI (DARK MODE)</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleScrollTo('sandbox-section', 'sandbox')}
              className="bg-indigo-605 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-indigo-705 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              style={{ backgroundColor: '#4f46e5' }}
            >
              <MessageSquareCode className="w-4 h-4" /> Trải Nghiệm Sandbox
            </button>
          </div>
        </header>

        {/* Content & Navigation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-12">
          {/* STICKY SIDEBAR INDEX - Col 3 */}
          <nav
            className={`lg:col-span-3 lg:sticky lg:top-6 p-5 rounded-3xl border shadow-xs space-y-4 transition-colors duration-500 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between lg:block">
              <div>
                <span className="text-[10px] font-black text-slate-400 font-mono tracking-widest uppercase block mb-1">INDEX GUIDELINE</span>
                <h3 className={`font-extrabold text-sm uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Mục Lục Cấu Phần</h3>
              </div>

              {/* Mobile toggle button */}
              <button
                type="button"
                onClick={() => setIsNavExpanded(!isNavExpanded)}
                className="lg:hidden flex items-center gap-1.5 bg-indigo-50 border border-indigo-150 rounded-xl px-3 py-1.5 text-indigo-700 text-xs font-black cursor-pointer shadow-3xs"
              >
                <span>{isNavExpanded ? 'ĐÓNG LỤC' : 'DANH MỤC'}</span>
                {isNavExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className={`${isNavExpanded ? 'block' : 'hidden'} lg:block space-y-1`}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleScrollTo(item.target, item.id);
                      setIsNavExpanded(false);
                    }}
                    className={`w-full text-left font-sans font-black text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-indigo-950/60 text-indigo-400 shadow-3xs'
                          : 'bg-indigo-50 text-indigo-700 shadow-3xs'
                        : isDark
                          ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Micro warning tooltip card */}
            <div
              className={`${isNavExpanded ? 'block' : 'hidden'} lg:block pt-4 border-t space-y-2 text-[11px] font-semibold transition-colors duration-500 ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-150 text-slate-450'
              }`}
            >
              <div className="flex gap-2 text-indigo-400 font-black uppercase tracking-wider">
                <Info className="w-4 h-4 shrink-0 mt-0.2" />
                <span>Hướng dẫn thiết lập:</span>
              </div>
              <p className="leading-relaxed">
                Nút Micro và sóng visualizer hỗ trợ kích hoạt trực tiếp từ trình duyệt giúp kiểm tra độ trễ luồng voice.
              </p>
            </div>
          </nav>

          {/* MAIN DYNAMIC CONTENT STREAM - Col 9 */}
          <main className="lg:col-span-9 space-y-8">
            <Introductions isDark={isDark} />
            <ComponentDirectory onScrollTo={handleScrollTo} isDark={isDark} />
            <ColorPalette isDark={isDark} onDarkChange={(v) => setIsDark(v)} />
            <TypographySpec isDark={isDark} />
            <VoiceControls isDark={isDark} />
            <VoiceVisualizers isDark={isDark} />
            <FeedbackCards isDark={isDark} />
            <NavigationAndCards isDark={isDark} />
            <StandardUIElements isDark={isDark} />
            <VoiceSandbox isDark={isDark} />
            <LiveVoiceScreenSpec isDark={isDark} />
            <DeveloperExporter isDark={isDark} />
          </main>
        </div>
      </div>
    </div>
  );
}
