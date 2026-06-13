/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MicState } from '../types';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, RefreshCw, Radio, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceControlsProps {
  isDark?: boolean;
}

export default function VoiceControls({ isDark }: VoiceControlsProps) {
  const [currentState, setCurrentState] = useState<MicState>('listening');

  const statesDef: { state: MicState; title: string; desc: string; color: string }[] = [
    { state: 'idle', title: "Idle (Sẵn sàng)", desc: "Trạng thái nghỉ, chờ người dùng nhấn kích hoạt giọng nói.", color: isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-750" },
    { state: 'requesting', title: "Requesting (Yêu cầu quyền)", desc: "Đang xin quyền truy cập micro từ trình duyệt.", color: isDark ? "bg-amber-950/40 text-amber-400" : "bg-amber-50 text-amber-600" },
    { state: 'listening', title: "Listening (Đang nghe nói)", desc: "Micro đang thu nhận giọng nói thời gian thực.", color: isDark ? "bg-rose-950/40 text-rose-400 animate-pulse" : "bg-rose-50 text-rose-600 animate-pulse" },
    { state: 'processing', title: "Processing (Xử lý âm thanh)", desc: "Đang biên dịch âm thanh & chấm điểm bằng AI.", color: isDark ? "bg-indigo-950/40 text-indigo-400" : "bg-indigo-50 text-indigo-600" },
    { state: 'speaking', title: "Speaking (Tutor đang đọc)", desc: "AI đang phản hồi bằng giọng nói (Text-to-Speech).", color: isDark ? "bg-sky-950/40 text-sky-450" : "bg-sky-50 text-sky-600" },
    { state: 'muted', title: "Muted (Đã ẩn danh/Tắt mic)", desc: "Micro bị tắt tạm thời bởi người dùng.", color: isDark ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400" },
    { state: 'error', title: "Error (Lỗi kết nối/Micro)", desc: "Mất kết nối mạng hoặc người dùng từ chối quyền mic.", color: isDark ? "bg-red-950/40 text-red-400" : "bg-red-50 text-red-600" }
  ];

  // Logic to render the button based on chosen state
  const renderMicButton = (stateValue: MicState) => {
    switch (stateValue) {
      case 'idle':
        return (
          <button 
            type="button"
            id="mic-btn-idle"
            className={`w-24 h-24 rounded-full border-2 text-indigo-600 flex items-center justify-center shadow-xs hover:shadow-sm hover:border-indigo-400 hover:scale-105 active:scale-95 transition-all relative cursor-pointer ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <Mic className="w-10 h-10" />
            <span className="absolute -bottom-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">TAP</span>
          </button>
        );
      case 'requesting':
        return (
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute w-24 h-24 rounded-full bg-amber-400/20 animate-ping"></div>
            <button 
              type="button"
              id="mic-btn-requesting"
              className={`w-24 h-24 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs border-4 z-10 relative cursor-pointer ${
                isDark ? 'border-slate-900' : 'border-white'
              }`}
            >
              <RefreshCw className="w-10 h-10 animate-spin" />
            </button>
          </div>
        );
      case 'listening':
        return (
          <div className="relative flex items-center justify-center">
            {/* Triple concentric sound rings */}
            <div className="absolute w-32 h-32 rounded-full border-2 border-rose-500/10 animate-ripple" style={{ animationDelay: '0s' }}></div>
            <div className="absolute w-28 h-28 rounded-full border border-rose-500/20 animate-ripple" style={{ animationDelay: '0.6s' }}></div>
            <div className="absolute w-24 h-24 rounded-full bg-rose-500/10 animate-ping"></div>
            
            <button 
              type="button"
              id="mic-btn-listening"
              className={`w-24 h-24 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm border-4 z-10 relative hover:bg-rose-600 transition-all cursor-pointer ${
                isDark ? 'border-slate-900' : 'border-white'
              }`}
            >
              <Mic className="w-10 h-10 animate-pulse" />
              <div className="absolute -top-1 right-0 w-4 h-4 bg-red-600 border-2 border-white rounded-full animate-ping"></div>
            </button>
          </div>
        );
      case 'processing':
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full bg-indigo-600 animate-spin opacity-40 blur-xs"></div>
            <button 
              type="button"
              id="mic-btn-processing"
              className={`w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm border-4 z-10 relative cursor-wait ${
                isDark ? 'border-slate-900' : 'border-white'
              }`}
            >
              <RefreshCw className="w-10 h-10 animate-spin" />
            </button>
          </div>
        );
      case 'speaking':
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full border-2 border-sky-400/30 animate-pulse"></div>
            <button 
              type="button"
              id="mic-btn-speaking"
              className={`w-24 h-24 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs border-4 z-10 relative hover:bg-sky-600 transition-all cursor-pointer ${
                isDark ? 'border-slate-900' : 'border-white'
              }`}
            >
              <Volume2 className="w-10 h-10 animate-bounce" />
            </button>
          </div>
        );
      case 'muted':
        return (
          <button 
            type="button"
            id="mic-btn-muted"
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-inner transition-all cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-500 border-2 border-slate-700 hover:bg-slate-750' : 'bg-slate-100 text-slate-400 border-2 border-slate-250 hover:bg-slate-200'
            }`}
          >
            <MicOff className="w-10 h-10" />
            <span className="absolute -bottom-2 bg-slate-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">MUTED</span>
          </button>
        );
      case 'error':
        return (
          <button 
            type="button"
            id="mic-btn-error"
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer ${
              isDark ? 'bg-red-950/30 text-red-405 border-2 border-red-900 hover:bg-red-900/30' : 'bg-red-100 text-red-600 border-2 border-red-300 hover:bg-red-200'
            }`}
          >
            <AlertCircle className="w-10 h-10" />
            <span className="absolute -bottom-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">OFFLINE</span>
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div id="mic-states-section" className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md' : 'bg-white border-slate-200 text-slate-850 shadow-xs'}`}>
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <Radio className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">04 Voice Mic Button</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Nút Giao thoại Hầm hố (Stateful Mic Button)</h2>
        </div>
      </div>

      <p className={`text-sm mb-8 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Phần trung tâm của ứng dụng giao tiếp voice. Thiết kế sử dụng các chuyển động mượt mà (ripples, pulse, spins) để cung cấp phản hổi trực quan, tránh trường hợp người dùng lo lắng không biết mic đã bật chưa.
      </p>

      {/* Main Interactive Demo Row */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-2xl border mb-8 transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-55 border-slate-200'}`}>
        
        {/* State selector widgets - 12 cols total */}
        <div className="lg:col-span-7 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block mb-2">
            Chọn trạng thái Demo (State Selector):
          </span>
          <div className="space-y-1.5">
            {statesDef.map((def) => (
              <button
                key={def.state}
                onClick={() => setCurrentState(def.state)}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all text-xs cursor-pointer ${
                  currentState === def.state
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs font-semibold'
                    : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-indigo-800 hover:bg-slate-850/50'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    currentState === def.state ? 'bg-white animate-pulse' : 'bg-slate-350 dark:bg-slate-700'
                  }`} />
                  <div>
                    <span className="font-extrabold text-[12px] uppercase">{def.title}</span>
                    <span className={`block text-[10px] mt-0.5 ${currentState === def.state ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {def.desc}
                    </span>
                  </div>
                </div>
                {currentState === def.state && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Preview side */}
        <div className={`lg:col-span-5 h-64 flex flex-col items-center justify-center pt-6 lg:pt-0 lg:border-l transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="text-center mb-6">
            <span className={`text-[10px] uppercase font-extrabold tracking-widest font-mono px-2.5 py-1 rounded-full border transition-all duration-500 ${
              isDark ? 'bg-indigo-950/40 border-indigo-900/40 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-500'
            }`}>
              {currentState.toUpperCase()} PREVIEW
            </span>
          </div>
          
          <div className="h-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentState}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {renderMicButton(currentState)}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <p className="text-[11px] text-slate-400 mt-6 text-center italic max-w-[200px] font-medium">
            Nhấn hoặc dùng bảng chọn bên trái để xem hiệu ứng động của Micro.
          </p>
        </div>
      </div>
    </div>
  );
}
