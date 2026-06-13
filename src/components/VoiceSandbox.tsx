/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PracticePrompt, FeedbackData, MicState } from '../types';
import { Mic, MicOff, Info, Play, Volume2, Sparkles, CheckCircle2, RotateCcw, AlertCircle, Edit, Keyboard, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const prompts: PracticePrompt[] = [
  {
    id: "p1",
    topic: "Coffee Shop Order (Giao tiếp cơ bản)",
    difficulty: "A2",
    promptText: "Can I have a hot vanilla latte with oat milk, please?",
    exemplar: "kæn aɪ hæv ə hɒt vəˈnɪl.ə ˈlæt.eɪ wɪð əʊt mɪlk pliːz"
  },
  {
    id: "p2",
    topic: "Describing Job Experience (Phỏng vấn xin việc)",
    difficulty: "B2",
    promptText: "I have been working as a software developer for three years, mainly focusing on building interactive web applications.",
    exemplar: "aɪ hæv biːn ˈwɜː.kɪŋ æz ə ˈsɒft.weə dɪˈvel.ə.pər fɔː θriː jɪəz ˈmeɪn.li ˈfəʊ.kə.sɪŋ ɒn ˈbɪl.dɪŋ ˌɪn.təˈræk.tɪv web ˌæp.lɪˈkeɪ.ʃənz"
  },
  {
    id: "p3",
    topic: "Presenting Climate Challenges (Thảo luận nâng cao)",
    difficulty: "C1",
    promptText: "Global warming poses severe threats to biodiversity, requiring immediate international coordination and transition to green energy.",
    exemplar: "ˈɡləʊ.bəl ˈwɔː.mɪŋ ˈpəʊ.zɪz sɪˈvɪər θrets tuː ˌbaɪ.əʊ.daɪˈvɜː.sə.ti rɪˈkwaɪə.rɪŋ ɪˈmiː.di.ət ˌɪn.təˈnæʃ.ən.əl kəʊˌɔː.dɪˈneɪ.ʃən ænd trænˈzɪʃ.ən tuː ɡriːn ˈen.ə.dʒi"
  }
];

interface VoiceSandboxProps {
  isDark?: boolean;
}

export default function VoiceSandbox({ isDark = false }: VoiceSandboxProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<PracticePrompt>(prompts[0]);
  const [micState, setMicState] = useState<MicState>('idle');
  const [userInput, setUserInput] = useState('');
  const [showInputKeyboard, setShowInputKeyboard] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Trigger simulated voice scoring feedback
  const scoreUserSpeech = (textValue: string) => {
    setMicState('processing');
    
    // Simulate real-time server delay of 1.2 seconds for AI speech-to-text scoring
    setTimeout(() => {
      const cleanInput = textValue.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      const cleanPrompt = selectedPrompt.promptText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      
      const wordsInput = cleanInput.split(/\s+/).filter(Boolean);
      const wordsPrompt = cleanPrompt.split(/\s+/).filter(Boolean);

      // Simple similarity calculation
      let correctWordsCount = 0;
      const wordGraph = wordsPrompt.map((promptWord) => {
        const isMatched = wordsInput.includes(promptWord);
        if (isMatched) correctWordsCount++;
        
        const ipaList: { [key: string]: string } = {
          "can": "kæn", "i": "aɪ", "have": "hæv", "a": "ə", "hot": "hɒt", "vanilla": "vəˈnɪl.ə",
          "latte": "ˈlæt.eɪ", "with": "wɪð", "oat": "əʊt", "milk": "mɪlk", "please": "pliːz",
          "working": "ˈwɜː.kɪŋ", "software": "ˈsɒft.weə", "developer": "dɪˈvel.ə.pər",
          "three": "θriː", "years": "jɪəz", "focusing": "ˈfəʊ.kə.sɪŋ", "building": "ˈbɪl.dɪŋ",
          "interactive": "ˌɪn.təˈræk.tɪv", "web": "web", "applications": "ˌæp.lɪˈkeɪ.ʃənz",
          "global": "ˈɡləʊ.bəl", "warming": "ˈwɔː.mɪŋ", "poses": "ˈpəʊ.zɪz", "severe": "sɪˈvɪər",
          "threats": "θrets", "to": "tuː", "biodiversity": "ˌbaɪ.əʊ.daɪˈvɜː.sə.ti", "immediate": "ɪˈmiː.di.ət",
          "international": "ˌɪn.təˈnæʃ.ən.əl"
        };
        
        let status: 'perfect' | 'good' | 'needs-improvement' = 'perfect';
        if (!isMatched) {
          status = 'needs-improvement';
        } else {
          status = Math.random() > 0.15 ? 'perfect' : 'good';
        }
        
        return {
          word: promptWord,
          status,
          ipa: ipaList[promptWord] || "wɜːd"
        };
      });

      // Calculate score percentages
      const accScore = wordsPrompt.length ? Math.round((correctWordsCount / wordsPrompt.length) * 100) : 50;
      const fluScore = textValue.length > 10 ? Math.min(100, Math.max(60, 60 + Math.round(Math.random() * 40))) : 40;
      const pronScore = Math.round((accScore + fluScore) / 2);
      const overall = Math.round((accScore * 0.4) + (fluScore * 0.3) + (pronScore * 0.3));

      let grammarCorrections = undefined;
      if (textValue.includes("no like") || textValue.includes("latte with milk oats")) {
        grammarCorrections = {
          original: "I want latte with milk oats",
          corrected: "I would like a vanilla latte with oat milk",
          explanation: "Sử dụng 'I would like' thay vì 'I want' tăng độ lịch sự tại quán cà phê. Đồng thời 'oat milk' là danh từ ghép chuẩn xác."
        };
      }

      setFeedback({
        textSpoken: textValue,
        phonetics: selectedPrompt.exemplar,
        overallScore: overall,
        accuracy: accScore,
        fluency: fluScore,
        pronunciation: pronScore,
        wordGraph,
        grammarCorrections
      });
      setMicState('idle');
    }, 1200);
  };

  const handleStartRecording = async () => {
    try {
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      setMicState('listening');
      setRecordingSeconds(0);
      
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 14) {
            handleStopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn("Permission rejected or no device, running interactive simulation mode", err);
      setErrorMsg("Bạn đã từ chối quyền Micro hoặc trình duyệt bị giới hạn. Hệ thống tự động chuyển đổi sang Chế Độ Mô Phỏng (Interactive Simulation Mode).");
      setMicState('listening');
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 14) {
            handleStopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    let SpeechResultText = selectedPrompt.promptText;
    if (Math.random() > 0.4) {
      if (selectedPrompt.id === 'p1') {
        SpeechResultText = "Can I have hot vanilla latte with oat milk please";
      } else if (selectedPrompt.id === 'p2') {
        SpeechResultText = "I worked as developer for three year building interactive web app";
      } else {
        SpeechResultText = "Global warming poses severe threatens to biodiversity immediate coordinate";
      }
    }
    
    setUserInput(SpeechResultText);
    scoreUserSpeech(SpeechResultText);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div id="sandbox-section" className={`p-8 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-205 text-slate-850 shadow-xs'}`}>
      
      {/* Decorative badge indicating active Sandbox core */}
      <span className={`absolute top-0 right-0 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest font-mono border-l border-b transition-colors duration-500 ${
        isDark ? 'bg-indigo-950/60 text-indigo-400 border-slate-800' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
      }`}>
        Active Interactive Hub 🔥
      </span>

      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="w-10 h-10 bg-indigo-605 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#4f46e5' }}>
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">08 Design System Playground</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Sân Chơi Thực Nghiệm Giao Diện (Design System Playground)</h2>
        </div>
      </div>

      <p className={`text-sm mb-6 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Hãy thử tương tác trực tiếp! Chọn một chủ đề ở dưới, click nút Micro hoặc gõ văn bản để xem hệ thống thiết kế phản hồi kết quả chẩn đoán phát âm, ngữ pháp và tốc độ nói giống hệt một ứng dụng học tập thực tế.
      </p>

      {/* Topics directory box */}
      <div className="mb-6">
        <span className={`text-[10px] uppercase font-bold font-mono tracking-wider block mb-2.5 transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-405'}`}>
          Bước 1: Chọn chủ đề tập nói (Speak Prompts Catalog)
        </span>
        <div className="flex flex-col sm:flex-row gap-3">
          {prompts.map((p) => {
            const isSelected = selectedPrompt.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPrompt(p);
                  setFeedback(null);
                  setUserInput('');
                }}
                className={`flex-1 text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? isDark ? 'border-indigo-600 bg-indigo-950/20 shadow-xs scale-[1.01]' : 'border-indigo-600 bg-indigo-50/10 shadow-xs scale-[1.01]'
                    : isDark ? 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900' : 'border-slate-205 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between pointer-events-none mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                    p.difficulty.startsWith('A') ? 'bg-sky-105 text-sky-700 bg-sky-100' : p.difficulty.startsWith('B') ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {p.difficulty} CEFR
                  </span>
                  <span className="text-[10px] text-slate-450 font-mono font-bold">Example prompt</span>
                </div>
                <h5 className={`font-black text-xs mt-3 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-950'}`}>{p.topic}</h5>
                <p className={`text-xs mt-1 italic tracking-tight line-clamp-1 font-semibold transition-colors duration-505 ${isDark ? 'text-slate-450' : 'text-slate-500'}`}>"{p.promptText}"</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Left-Right Grid for Active Session simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in text-slate-800">
        
        {/* SPEAK CHALLENGE CENTER CARD - Col 5 */}
        <div className={`lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between h-full min-h-[400px] transition-colors duration-500 ${
          isDark ? 'bg-slate-950 border-slate-850 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-850'
        }`}>
          <div>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-500 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>THẺ TOẠ ĐỘ LUYỆN NÓI</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6366f1] font-mono">ACTIVE CHALLENGE</span>
            </div>

            <div className={`p-4 rounded-xl border mb-4 transition-colors duration-550 ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-205 shadow-3xs'}`}>
              <span className="text-[10px] text-slate-400 block mb-1 font-bold">MỤC TIÊU NÓI:</span>
              <blockquote className={`text-base font-black leading-relaxed font-sans transition-colors duration-500 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                "{selectedPrompt.promptText}"
              </blockquote>
              <div className={`mt-3 pt-3 border-t flex items-center justify-between text-[11px] font-mono font-bold transition-colors duration-500 ${isDark ? 'border-slate-800/65 text-slate-400' : 'border-slate-100 text-slate-450'}`}>
                <span>PHÁT ÂM PHIÊN ÂM IPA MẪU:</span>
                <span className="text-[#6366f1] font-extrabold">/{selectedPrompt.exemplar.split(' ').slice(0, 3).join(' ')}.../</span>
              </div>
            </div>

            {/* Input helpers / Manual override */}
            {showInputKeyboard ? (
              <div className="space-y-2 mb-4 animate-fade-in">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">NHẬP CHỮ TRỰC TIẾP GIẢ LẬP:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Gõ đoạn văn bản tiếng Anh mô phỏng..."
                    className={`flex-1 border text-sm px-3.5 py-2 rounded-xl focus:outline-none focus:border-indigo-600 font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-75 * text-white border-slate-750' : 'bg-white border-slate-205 text-slate-800'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => scoreUserSpeech(userInput)}
                    className="bg-indigo-605 text-white font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-indigo-755 cursor-pointer shadow-3xs hover:scale-102 active:scale-98 transition-all"
                    style={{ backgroundColor: '#4f46e5' }}
                  >
                    Giao dịch
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-2">
                <button
                  type="button"
                  onClick={() => setShowInputKeyboard(true)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-black text-indigo-400 hover:underline cursor-pointer uppercase tracking-wider"
                >
                  <Keyboard className="w-3.5 h-3.5" /> Hoặc nhập chữ trực tiếp để giả lập nhanh
                </button>
              </div>
            )}
          </div>

          {/* DYNAMIC REC CONTROLLER FOR SPEAK LOOP */}
          <div className={`pt-6 border-t mt-4 flex flex-col items-center animate-fade-in transition-colors duration-550 ${isDark ? 'border-slate-850' : 'border-slate-250'}`}>
            
            {micState === 'listening' ? (
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 bg-red-650 rounded-full animate-ping" />
                <span className="text-xs font-mono font-bold text-rose-500">Đang ghi âm chân thật: {recordingSeconds}s / 15s Max</span>
              </div>
            ) : micState === 'processing' ? (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono font-bold text-indigo-400 animate-pulse">AI Tutor đang chấm phát âm...</span>
              </div>
            ) : (
              <div className="text-xs text-slate-400 mb-4 text-center font-semibold">
                Bấm nút Mic dưới đây, cho phép quyền mic và thử nói to câu trên.
              </div>
            )}

            {/* Glowing Pulsing Button */}
            <div className="relative">
              {micState === 'listening' && (
                <div className="absolute -inset-4 rounded-full bg-rose-500/10 animate-pulse pointer-events-none" />
              )}
              {micState === 'processing' && (
                <div className="absolute -inset-4 rounded-full bg-indigo-600/10 animate-spin pointer-events-none" />
              )}

              <button
                type="button"
                id="sandbox-record-btn"
                onClick={micState === 'listening' ? handleStopRecording : handleStartRecording}
                disabled={micState === 'processing'}
                className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-md cursor-pointer transition-all ${
                  micState === 'listening'
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-95'
                }`}
                style={micState !== 'listening' ? { backgroundColor: '#4f46e5' } : undefined}
              >
                <Mic className="w-6 h-6 text-white" />
              </button>
            </div>

            {errorMsg && (
              <div className={`text-[10px] p-2.5 rounded-lg border mt-4 leading-normal font-semibold flex items-start gap-1.5 transition-colors duration-500 ${
                isDark ? 'bg-amber-950/40 text-amber-300 border-amber-900/40' : 'bg-amber-50 text-amber-705 border-amber-200'
              }`}>
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        </div>

        {/* FEEDBACK & DIAGNOSTICS DISPLAY PANEL - Col 7 */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {feedback ? (
              <motion.div
                key="feedback-present"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* 1. Overall evaluation score dashboard header */}
                <div className={`p-5 rounded-2xl relative shadow-xs overflow-hidden transition-colors duration-500 ${
                  isDark ? 'bg-slate-950 border border-slate-850 text-slate-105' : 'bg-slate-900 text-white shadow-md shadow-indigo-950/10'
                }`}>
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none" />
                  
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-mono ${
                        isDark ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-900/40' : 'bg-white/10 text-indigo-250'
                      }`}>
                        Speaking Session Diagnosed
                      </span>
                      <h4 className="text-xl font-black mt-1 uppercase tracking-wide text-white">Kết quả phân tích giọng của bạn</h4>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">ĐIỂM TỔNG HỢP (CEFR)</span>
                        <span className="text-base font-extrabold text-amber-400">
                          {feedback.overallScore >= 90 ? 'C1 • Fluent Native' : feedback.overallScore >= 75 ? 'B2 • Upper-Intermediate' : 'B1 • Operational'}
                        </span>
                      </div>
                      <div className={`w-16 h-16 rounded-xl border flex items-center justify-center text-3xl font-black text-amber-400 transition-colors duration-500 ${
                        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white/10 border-white/10'
                      }`}>
                        {feedback.overallScore}
                      </div>
                    </div>
                  </div>

                  {/* Meter breakdown rows */}
                  <div className={`grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t text-center text-xs transition-colors duration-500 ${
                    isDark ? 'border-slate-850' : 'border-white/10'
                  }`}>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold">ĐO PHÁT ÂM (Pronunciation)</span>
                      <span className="font-extrabold text-sm text-indigo-400">{feedback.pronunciation}%</span>
                    </div>
                    <div className={isDark ? 'border-x border-slate-850' : 'border-x border-white/5'}>
                      <span className="text-slate-400 block text-[10px] font-bold">ĐỘ TRÔI CHẢY (Fluency)</span>
                      <span className="font-extrabold text-sm text-indigo-400">{feedback.fluency}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold">KHỚP CHỮ (Accuracy)</span>
                      <span className="font-extrabold text-sm text-indigo-400">{feedback.accuracy}%</span>
                    </div>
                  </div>
                </div>

                {/* 2. Color-coded word map */}
                <div className={`p-5 rounded-2xl border shadow-sn transition-colors duration-500 ${
                  isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'
                }`}>
                  <h4 className={`font-black text-xs mb-3 uppercase tracking-wider transition-colors duration-550 ${isDark ? 'text-slate-200' : 'text-slate-950'}`}>Hiển thị chi tiết phát âm từng từ phát ngôn:</h4>
                  
                  <div className={`flex flex-wrap items-end gap-2 p-3 rounded-xl border transition-colors duration-550 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {feedback.wordGraph.map((item, i) => {
                      const color = item.status === 'perfect' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-450 dark:border-emerald-900/60' 
                        : item.status === 'good' 
                        ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-450 dark:border-amber-900/60' 
                        : 'bg-rose-50 text-rose-800 border-rose-300 border-dashed dark:bg-rose-950/40 dark:text-rose-450 dark:border-rose-900/60';
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <span className="text-[9px] font-mono font-bold text-slate-400">/{item.ipa}/</span>
                          <span className={`px-2 py-1 rounded-lg border text-xs font-bold mt-0.5 ${color}`}>
                            {item.word}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 3. Grammar rewrite assistant representation */}
                {feedback.grammarCorrections ? (
                  <div className={`p-5 rounded-2xl border transition-colors duration-550 ${
                    isDark ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300' : 'bg-emerald-50/50 border-emerald-150 text-emerald-800'
                  }`}>
                    <span className={`text-[10px] uppercase font-bold tracking-widest font-mono p-1.5 rounded inline-block ${
                      isDark ? 'bg-emerald-900/40 text-emerald-300' : 'bg-emerald-100'
                    }`}>
                      CẢI THIỆN NGỮ PHÁP TỪ AI TUTOR
                    </span>
                    <p className="text-xs mt-2 font-semibold">
                       Phát hiện lỗi ghép chữ cấu trúc. Hãy tham khảo cách nói chuẩn tự nhiên:
                    </p>

                    <div className={`space-y-2 mt-4 p-4 rounded-xl border transition-colors duration-500 ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-200'
                    }`}>
                      <div className="text-xs text-rose-500 font-semibold line-through">"{feedback.grammarCorrections.original}"</div>
                      <div className={`text-sm font-black ${isDark ? 'text-emerald-450' : 'text-emerald-800'}`}>"{feedback.grammarCorrections.corrected}"</div>
                      <p className={`text-[11px] mt-2 italic leading-relaxed border-t pt-2 font-medium ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                        {feedback.grammarCorrections.explanation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={`p-4 rounded-xl border flex gap-2 items-start text-xs font-semibold transition-colors duration-550 ${
                    isDark ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-300' : 'bg-emerald-50/30 border-emerald-150 text-emerald-800'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                    <div>
                      <b>Chúc mừng:</b> Ngữ pháp của bạn đã chuẩn chỉnh theo phác đồ CEFR {selectedPrompt.difficulty}, không có chỗ sai cấu trúc từ ghép nào!
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedback(null)}
                    className={`flex-1 py-2 px-4 rounded-xl border font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      isDark ? 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900' : 'border-slate-205 text-slate-600 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Thử nói lại chủ đề này
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="feedback-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`h-full min-h-[400px] border border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-6 transition-colors duration-550 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-4 shadow-3xs transition-colors duration-550 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-605' : 'bg-white border-slate-200 text-slate-300'
                }`}>
                  <Mic className="w-8 h-8 animate-pulse text-indigo-400" />
                </div>
                
                <h4 className={`font-extrabold text-base uppercase tracking-wide transition-colors duration-550 ${isDark ? 'text-white' : 'text-slate-900'}`}>Học viên đang chờ xem kết quả chẩn đoán</h4>
                <p className={`text-xs max-w-[320px] leading-relaxed mt-1.5 font-semibold transition-colors duration-550 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Hãy nhấn nút Micro bên trái, đọc to chủ đề câu gợi ý để hệ thống nén dòng thoại, chuyển động sóng thời gian thực và trả về báo cáo phân tích phát âm chi tiết.
                </p>

                <div className={`mt-6 p-4 rounded-2xl border text-left max-w-[380px] space-y-2 text-xs transition-colors duration-550 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <span className={`font-bold block uppercase tracking-wide ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>💡 Phục vụ thiết kế mẫu:</span>
                  <p className={`leading-normal font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Sandbox có khả năng mô phỏng cả việc thu âm thực lẫn nhập văn bản để test nhanh trạng thái các card chẩn đoán mà không cần cấp quyền micro.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
