/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Mic, MicOff, Settings, Info, HeartHandshake, RefreshCw } from 'lucide-react';

interface VoiceVisualizersProps {
  isDark?: boolean;
}

export default function VoiceVisualizers({ isDark = false }: VoiceVisualizersProps) {
  const [isLive, setIsLive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const totalBars = 16;
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Setup live audio visualizer
  const toggleLiveMic = async () => {
    if (isLive) {
      stopLiveMic();
    } else {
      try {
        setErrorMsg(null);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        // Web Audio Setup
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;
        
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // Small fftSize to get 32 frequencies
        analyserRef.current = analyser;
        
        source.connect(analyser);
        setIsLive(true);
      } catch (err: any) {
        console.error("Microphone access error:", err);
        setErrorMsg("Không truy cập được Micro. Vui lòng cho phép quyền truy cập micro từ trình duyệt.");
        setIsLive(false);
      }
    }
  };

  const stopLiveMic = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    
    // Reset bar heights
    barRefs.current.forEach((bar) => {
      if (bar) {
        bar.style.height = '12px';
      }
    });

    setIsLive(false);
  };

  useEffect(() => {
    if (!isLive || !analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);
      
      // Map frequencies to our 16 visual bars
      for (let i = 0; i < totalBars; i++) {
        const barIndex = Math.floor((i / totalBars) * bufferLength);
        const value = dataArray[barIndex];
        // Scale values gracefully
        const percentHeight = Math.max(12, Math.min(110, (value / 255) * 110));
        
        const barEl = barRefs.current[i];
        if (barEl) {
          // Direct DOM style manipulation is highly performant (60fps) & prevents infinite React state loops
          barEl.style.height = `${percentHeight}px`;
        }
      }
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLive]);

  // Clean on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div id="visualizers-section" className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-200 text-slate-850 shadow-xs'}`}>
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">05 Sóng & Hiệu Ứng</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Sóng Âm Thanh (Voice Waves Indicator)</h2>
        </div>
      </div>

      <p className={`text-sm mb-8 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Thành phần biểu diễn biên độ giọng nói. Gồm 2 phiên bản chính: <b>CSS Pulse</b> (sóng giả lập chuyển động tuần hoàn khi AI đang nói hoặc chờ phản hồi) và <b>Active Web Audio API</b> (phản ứng trực tiếp theo decibel thu được của người dùng).
      </p>

      {/* Grid Layout for visualizer types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Type A: Simulated Static CSS Waves */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
          <div>
            <span className={`text-[10px] uppercase font-bold tracking-widest font-mono px-2.5 py-1 rounded border transition-colors duration-500 ${
              isDark ? 'bg-indigo-950/40 border-indigo-900/60 text-indigo-455' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
            }`}>
              01 • CSS SIMULATION
            </span>
            <h4 className={`font-extrabold text-sm mt-3 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-950'}`}>Sóng Giả Lập Tuần Hoàn</h4>
            <p className={`text-xs mt-1.5 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Dùng khi AI Tutor đang trò chuyện hoặc phát âm một từ mẫu. Sóng chuyển động êm đềm, không tốn tài nguyên phần cứng.
            </p>
          </div>

          {/* Visual Wave */}
          <div className={`h-32 rounded-xl border shadow-3xs flex items-center justify-center gap-1.5 px-4 my-6 transition-colors duration-500 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {[0.4, 1.2, 0.7, 1.5, 0.9, 0.3, 1.3, 0.8, 1.1, 0.5, 1.4, 0.6].map((mult, id) => (
              <div 
                key={id} 
                className="w-1.5 rounded-full bg-gradient-to-t from-indigo-600 to-indigo-400"
                style={{
                  height: '24px',
                  animation: `voicePulse ${1.2 * mult}s ease-in-out infinite`
                }}
              />
            ))}
          </div>

          <div className={`text-[11px] font-mono transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Class CSS: <code className={`text-xs font-bold px-1.5 py-0.5 rounded border ${
              isDark ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
            }`}>animate-pulse-sound</code>
          </div>
        </div>

        {/* Type B: Live Web Audio Interactive Wave */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
          <div>
            <span className={`text-[10px] uppercase font-bold tracking-widest font-mono px-2.5 py-1 rounded border transition-colors duration-500 ${
              isDark ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
            }`}>
              02 • LIVE AUDIO INPUT
            </span>
            <h4 className={`font-extrabold text-sm mt-3 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-950'}`}>Sóng Tương Tác Micro Thật</h4>
            <p className={`text-xs mt-1.5 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-505'}`}>
              Dùng khi người dùng đang trực tiếp nói vào hệ thống. Liên kết thời gian thực thông qua Web Audio API của trình duyệt.
            </p>
          </div>

          {/* Live Wave display */}
          <div className={`h-32 rounded-xl border shadow-3xs flex items-center justify-center relative overflow-hidden my-6 transition-colors duration-500 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-1 px-4 h-full">
              {Array.from({ length: totalBars }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { barRefs.current[i] = el; }}
                  className="w-1.5 rounded-full bg-gradient-to-t from-sky-500 to-sky-400 transition-all duration-75"
                  style={{ height: '12px' }}
                />
              ))}
            </div>

            {/* Glowing blur behind bars */}
            {isLive && (
              <div className="absolute inset-0 bg-sky-500/5 animate-pulse-slow pointer-events-none" />
            )}
          </div>

          {/* Control Button for Live Demo */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              id="live-mic-visualizer-toggle"
              onClick={toggleLiveMic}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-with-all cursor-pointer ${
                isLive 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Mic className={`w-4 h-4 ${isLive ? 'animate-pulse' : ''}`} />
              {isLive ? 'TẮT MICRO DEMO' : 'BẬT THỬ MICRO THẬT'}
            </button>

            {errorMsg && (
              <div className={`flex items-start gap-1.5 text-[11px] p-2 rounded-lg border mt-2 ${
                isDark ? 'bg-red-950/30 border-red-900 text-red-400' : 'bg-red-50 border-red-105 text-red-600'
              }`}>
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-4 border mt-6 flex gap-3 items-start transition-colors duration-500 ${
        isDark ? 'bg-indigo-950/20 border-indigo-900/40 text-indigo-200' : 'bg-indigo-50/50 border-indigo-100 text-slate-800'
      }`}>
        <HeartHandshake className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
        <div>
          <span className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-indigo-450' : 'text-indigo-700'}`}>Lời khuyên nghiên cứu UX:</span>
          <p className={`text-xs mt-0.5 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-indigo-600'}`}>
            Nên thiết lập mức kích hoạt âm trung (threshold) để chặn tiếng thở dốc hoặc nhai kẹo cao su của học viên tránh kích hoạt sóng ảo cực đại làm nhiễu kết quả đánh giá của AI.
          </p>
        </div>
      </div>
    </div>
  );
}
