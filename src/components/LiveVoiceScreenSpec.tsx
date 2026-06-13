/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  BookMarked, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Play, 
  RotateCcw, 
  HelpCircle, 
  Plus, 
  Check, 
  MessageCircle,
  TrendingUp,
  Award,
  ChevronRight,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WordToken {
  word: string;
  status: 'correct' | 'error' | 'grammar-wavy' | 'normal';
  ipa?: string;
  suggested?: string;
  errorReason?: string;
  isVocabHighlight?: boolean;
  vocabLevel?: string;
  vocabMeaning?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'system';
  systemType?: 'save-word' | 'general';
  tokens?: WordToken[];
  rawText?: string;
  timestamp: string;
  impliedCorrection?: string;
}

const mockConversations: { [key: string]: Message[] } = {
  coffee: [
    {
      id: "u1",
      sender: "user",
      tokens: [
        { word: "Can", status: "correct" },
        { word: "I", status: "correct" },
        { word: "have", status: "correct" },
        { word: "a", status: "correct" },
        { word: "hot", status: "correct" },
        { word: "vanilla", status: "correct" },
        { word: "late", status: "error", ipa: "ˈlæt.eɪ", errorReason: "Sai trọng âm và nguyên âm đơn. Phải đọc là /ˈlæt.eɪ/ thay vì /leɪt/." },
        { word: "with", status: "correct" },
        { word: "ot", status: "error", ipa: "əʊt", errorReason: "Mất nguyên âm đôi /əʊ/. Phải đọc tròn môi là /əʊt/." },
        { word: "milk,", status: "correct" },
        { word: "please?", status: "correct" }
      ],
      timestamp: "10:12 AM"
    },
    {
      id: "ai1",
      sender: "ai",
      tokens: [
        { word: "Absolutely!", status: "normal" },
        { word: "I", status: "normal" },
        { word: "can", status: "normal" },
        { word: "make", status: "normal" },
        { word: "a", status: "normal" },
        { word: "hot", status: "normal" },
        { word: "vanilla", status: "normal", isVocabHighlight: true, vocabLevel: "A2", vocabMeaning: "Hương vị va-ni chiết xuất tự nhiên" },
        { word: "latte", status: "normal", isVocabHighlight: true, vocabLevel: "A2", vocabMeaning: "Cà phê sữa kiểu Ý pha chế bằng hơi mút" },
        { word: "with", status: "normal" },
        { word: "oat", status: "normal", isVocabHighlight: true, vocabLevel: "B1", vocabMeaning: "Sữa yến mạch dồi dào dinh dưỡng" },
        { word: "milk", status: "normal" },
        { word: "for", status: "normal" },
        { word: "you.", status: "normal" },
        { word: "Would", status: "normal" },
        { word: "you", status: "normal" },
        { word: "like", status: "normal" },
        { word: "it", status: "normal" },
        { word: "regular", status: "normal" },
        { word: "or", status: "normal" },
        { word: "large?", status: "normal" }
      ],
      impliedCorrection: "Ngầm sửa phát âm từ 'late' thành 'latte' /ˈlæt.eɪ/ và 'ot' thành 'oat' /əʊt/.",
      timestamp: "10:12 AM"
    }
  ],
  interview: [
    {
      id: "u2",
      sender: "user",
      tokens: [
        { word: "I", status: "correct" },
        { word: "have been work", status: "grammar-wavy", suggested: "have been working", errorReason: "Lỗi thì Hiện tại Hoàn thành Tiếp diễn. Sau 'have been' phải là động từ đuôi -ing để nhấn mạnh tính liên tục của hành động." },
        { word: "as", status: "correct" },
        { word: "a", status: "correct" },
        { word: "developer", status: "correct" },
        { word: "three", status: "correct" },
        { word: "year.", status: "error", ipa: "jɪəz", errorReason: "Thiết âm đuôi số nhiều /z/ của danh từ chỉ thời gian đếm được sau số từ 'three'." }
      ],
      timestamp: "10:14 AM"
    },
    {
      id: "ai2",
      sender: "ai",
      tokens: [
        { word: "That's", status: "normal" },
        { word: "impressive!", status: "normal", isVocabHighlight: true, vocabLevel: "B2", vocabMeaning: "Gây ấn tượng mạnh mẽ, đáng nể" },
        { word: "Since", status: "normal" },
        { word: "you", status: "normal" },
        { word: "have", status: "normal" },
        { word: "been", status: "normal" },
        { word: "working", status: "normal" },
        { word: "for", status: "normal" },
        { word: "three", status: "normal" },
        { word: "years,", status: "normal" },
        { word: "what", status: "normal" },
        { word: "main", status: "normal" },
        { word: "technologies", status: "normal", isVocabHighlight: true, vocabLevel: "B2", vocabMeaning: "Công nghệ cốt lõi cấu tạo kiến trúc phần mềm" },
        { word: "did", status: "normal" },
        { word: "you", status: "normal" },
        { word: "focus", status: "normal" },
        { word: "on?", status: "normal" }
      ],
      impliedCorrection: "Ngầm sửa cấu trúc 'have been work' thành 'have been working' và 'three year' thành 'three years'.",
      timestamp: "10:14 AM"
    }
  ],
  climate: [
    {
      id: "u3",
      sender: "user",
      tokens: [
        { word: "Global", status: "correct" },
        { word: "warming", status: "correct" },
        { word: "poses", status: "error", ipa: "ˈpəʊ.zɪz", errorReason: "Đọc sai âm vị chính giữa /əʊ/. Phải kéo dài âm đôi thay vì âm đơn." },
        { word: "severe", status: "correct" },
        { word: "threats", status: "correct" },
        { word: "to", status: "correct" },
        { word: "biodiversity.", status: "correct" }
      ],
      timestamp: "10:16 AM"
    },
    {
      id: "s1",
      sender: "system",
      systemType: "save-word",
      rawText: "biodiversity",
      timestamp: "10:16 AM"
    },
    {
      id: "ai3",
      sender: "ai",
      tokens: [
        { word: "Indeed.", status: "normal" },
        { word: "Biodiversity", status: "normal", isVocabHighlight: true, vocabLevel: "C1", vocabMeaning: "Sự đa dạng sinh học của các loài động thực vật tự nhiên" },
        { word: "is", status: "normal" },
        { word: "highly", status: "normal" },
        { word: "threatened", status: "normal" },
        { word: "now,", status: "normal" },
        { word: "demanding", status: "normal" },
        { word: "immediate", status: "normal", isVocabHighlight: true, vocabLevel: "B2", vocabMeaning: "Ngay lập tức, mang tính chất cấp bách" },
        { word: "international", status: "normal" },
        { word: "coordination.", status: "normal", isVocabHighlight: true, vocabLevel: "C1", vocabMeaning: "Sự điều phối hành động nhịp nhàng" }
      ],
      timestamp: "10:16 AM"
    }
  ]
};

export default function LiveVoiceScreenSpec({ isDark = false }: { isDark?: boolean }) {
  const [activeScenario, setActiveScenario] = useState<'coffee' | 'interview' | 'climate'>('coffee');
  const [currentView, setCurrentView] = useState<'chat' | 'focus'>('chat');
  const [backgroundLogs, setBackgroundLogs] = useState<{ id: string; type: 'pronunciation' | 'grammar' | 'vocab'; text: string; details: string; timestamp: string }[]>([
    { id: 'b1', type: 'pronunciation', text: 'latte', details: 'Azure Voice: Phát hiện lỗi phát âm từ "late" -> /ˈlæt.eɪ/. Lập tức lưu vào queue báo cáo.', timestamp: '10:12 AM' },
    { id: 'b2', type: 'vocab', text: 'oat milk', details: 'Gemini NLP: Phân tích hội thoại rảnh tay, phát hiện từ khóa "latte" và "oat milk".', timestamp: '10:12 AM' }
  ]);
  const [sessionRunning, setSessionRunning] = useState(true);
  const [showingReport, setShowingReport] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'user' | 'ai' | 'idle'>('user');
  
  // Controls states
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  // Overlay Popover coordinates & target states
  const [selectedErrorToken, setSelectedErrorToken] = useState<WordToken | null>(null);
  const [selectedGrammarToken, setSelectedGrammarToken] = useState<WordToken | null>(null);
  const [selectedVocabToken, setSelectedVocabToken] = useState<WordToken | null>(null);
  const [customSavedWords, setCustomSavedWords] = useState<string[]>([]);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [lastSavedWord, setLastSavedWord] = useState('');

  // Sóng âm visualizer state
  const [waveHeights, setWaveHeights] = useState<number[]>([15, 20, 10, 25, 40, 15, 30, 10, 20, 15, 30, 25, 10, 20, 15]);
  const waveTimer = useRef<NodeJS.Timeout | null>(null);

  // Simulated AI responses & audio state transitions
  useEffect(() => {
    let speakInterval: NodeJS.Timeout;
    if (sessionRunning && !showingReport) {
      speakInterval = setInterval(() => {
        setActiveSpeaker(prev => {
          if (prev === 'user') return 'ai';
          if (prev === 'ai') return 'idle';
          return 'user';
        });
      }, 5000);
    }
    return () => clearInterval(speakInterval);
  }, [sessionRunning, showingReport]);

  // Wave pulsing timer
  useEffect(() => {
    waveTimer.current = setInterval(() => {
      if (showingReport || !sessionRunning) return;
      
      const multiplier = activeSpeaker === 'idle' ? 0.2 : activeSpeaker === 'ai' ? 1.4 : 1.0;
      setWaveHeights(prev => prev.map(() => {
        const base = Math.floor(Math.random() * 30) + 10;
        return isMuted && activeSpeaker === 'user' ? 6 : Math.round(base * multiplier);
      }));
    }, 150);

    return () => {
      if (waveTimer.current) clearInterval(waveTimer.current);
    };
  }, [activeSpeaker, sessionRunning, showingReport, isMuted]);

  const handleEndSession = () => {
    setSessionRunning(false);
    setShowingReport(true);
    setActiveSpeaker('idle');
  };

  const handleRestartSession = () => {
    setSessionRunning(true);
    setShowingReport(false);
    setActiveSpeaker('user');
    setSelectedErrorToken(null);
    setSelectedGrammarToken(null);
    setSelectedVocabToken(null);
  };

  const triggerSaveWord = (word: string) => {
    if (!customSavedWords.includes(word)) {
      setCustomSavedWords(prev => [...prev, word]);
    }
    setLastSavedWord(word);
    setShowSaveToast(true);
    setTimeout(() => {
      setShowSaveToast(false);
    }, 3500);
    setSelectedVocabToken(null);
  };

  const currentMessages = mockConversations[activeScenario];

  return (
    <div id="live-voice-sec" className={`p-8 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-205 text-slate-850 shadow-xs'}`}>
      
      <span className={`absolute top-0 right-0 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest font-mono border-l border-b transition-colors duration-500 ${
        isDark ? 'bg-indigo-950/60 text-indigo-400 border-slate-800' : 'bg-indigo-50 text-indigo-750 border-indigo-100'
      }`}>
        UI Spec & Simulation 🔥
      </span>

      {/* Header section name */}
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="w-10 h-10 bg-indigo-605 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#2563eb' }}>
          <MessageCircle className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">09 Live Audio Room Specification</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Giao điện Phòng Gọi Thoại Thử Nghiệm (Live Voice Sandbox)</h2>
        </div>
      </div>

      <p className={`text-sm mb-6 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-505'}`}>
        Đây là bản tái hiện thực tế màn hình gọi thoại AI Live-Voice được cấu trúc lại hoàn hảo: lược bỏ những yếu tố dư thừa, tập trung vào mô phỏng hoạt động của AI chẩn đoán lỗi trong khi trò chuyện trực tiếp. <b>Chọn mẫu kịch bản bên dưới</b> để kiểm thử các popover IPA, tooltip lỗi ngữ pháp, hoạt hoạ lưu từ thông minh và phân tích dải tần sóng thời gian thực.
      </p>

      {/* Scenario selector */}
      <div className="mb-6 flex flex-wrap gap-2.5">
        <span className="text-xs font-bold text-slate-405 self-center mr-1">Các tình huống giả lập:</span>
        <button
          onClick={() => { setActiveScenario('coffee'); handleRestartSession(); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeScenario === 'coffee' 
              ? 'bg-indigo-600 text-white shadow-3xs' 
              : isDark ? 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          ☕ Order Vanilla Latte (A2)
        </button>
        <button
          onClick={() => { setActiveScenario('interview'); handleRestartSession(); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeScenario === 'interview' 
              ? 'bg-indigo-600 text-white shadow-3xs' 
              : isDark ? 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          💼 Phỏng Vấn Code (B2)
        </button>
        <button
          onClick={() => { setActiveScenario('climate'); handleRestartSession(); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeScenario === 'climate' 
              ? 'bg-indigo-600 text-white shadow-3xs' 
              : isDark ? 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          🌍 Biến Đổi Khí Hậu (C1)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INTERACTIVE WEB AUDIO CALL PANEL */}
        <div className="lg:col-span-7 flex flex-col w-full">
          <div className={`w-full rounded-3xl border-4 relative shadow-2xl flex flex-col overflow-hidden h-[630px] transition-all duration-500 ${
            isDark ? 'bg-slate-950 border-slate-800 shadow-indigo-950/20' : 'bg-slate-900 border-slate-950 shadow-slate-900/10'
          }`}>
            
            {/* LIVE VOICE HEADER (Web Room Browser Header) */}
            <div className="py-4 px-6 bg-slate-900 text-white border-b border-white/5 flex items-center justify-between relative z-20">
              <div className="flex items-center gap-2.5">
                {/* AI Coach Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center border border-indigo-400 shadow-sm">
                    AI
                  </div>
                  {activeSpeaker === 'ai' && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-sky-500 rounded-full border border-slate-900 animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-xs flex items-center gap-1.5">
                    <span>AI Tutor (Alex)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                    {activeScenario === 'coffee' ? 'Free Talk - Topic Coffee' : activeScenario === 'interview' ? 'Tech Interview' : 'Climate Challenge (C1)'}
                  </div>
                </div>
              </div>

              {/* End Session Button */}
              <div className="flex items-center gap-2">
                {sessionRunning && (
                  <button
                    onClick={() => {
                      const newView = currentView === 'chat' ? 'focus' : 'chat';
                      setCurrentView(newView);
                      // Add a diagnostic background log when toggled
                      if (newView === 'focus') {
                        setBackgroundLogs(prev => [
                          ...prev,
                          {
                            id: 'toggle-' + Date.now(),
                            type: 'vocab',
                            text: 'Focus Mode Active',
                            details: 'Bắt đầu Chế độ Tập trung. Đóng giao diện chat để tránh xao nhãng. Thuật toán AI chạy ngầm.',
                            timestamp: 'Vừa xong'
                          }
                        ]);
                      }
                    }}
                    className={`h-[28px] rounded-lg px-2 flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                      currentView === 'focus' 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                    title={currentView === 'focus' ? 'Về chế độ Chat' : 'Bật Chế độ tập trung'}
                  >
                    {currentView === 'focus' ? <EyeOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <Eye className="w-3.5 h-3.5" />}
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      {currentView === 'focus' ? 'Focus' : 'Chat'}
                    </span>
                  </button>
                )}

                {sessionRunning ? (
                  <button
                    onClick={handleEndSession}
                    className="bg-red-600 hover:bg-red-700 text-white font-black text-[10px] h-[28px] px-3 rounded-lg transition-all cursor-pointer shadow-3xs hover:scale-103 uppercase tracking-wider"
                  >
                    Kết Thúc
                  </button>
                ) : (
                  <button
                    onClick={handleRestartSession}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] h-[28px] px-3 rounded-lg transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Reload
                  </button>
                )}
              </div>
            </div>

            {/* CONVERSATION STREAM (Khu vực hội thoại trung tâm) */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950 relative min-h-[380px]">
              
              <AnimatePresence mode="popLayout">
                {sessionRunning && currentView === 'chat' && currentMessages.map((msg) => {
                  
                  // Render System type (Command Auto-Save Toast inside timeline)
                  if (msg.sender === 'system' && msg.systemType === 'save-word') {
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center my-3.5"
                      >
                        <div className="bg-indigo-950/70 border border-indigo-900/60 rounded-xl px-4 py-2.5 max-w-[90%] text-center shadow-md">
                          <p className="text-[11px] font-bold text-indigo-300 flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Hệ thống đã tự động lưu từ <b>"{msg.rawText}"</b> vào My Decks</span>
                          </p>
                        </div>
                      </motion.div>
                    );
                  }

                  const isUser = msg.sender === 'user';
                  return (
                    <motion.div
                       key={msg.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'} relative`}
                    >
                      {/* Speech bubbles wrapper */}
                      <div className={`max-w-[85%] rounded-2xl p-3.5 relative shadow-md ${
                        isUser 
                          ? 'bg-indigo-950/40 border border-indigo-900/40 text-slate-100 rounded-tr-sm' 
                          : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-sm'
                      }`}>
                        
                        {/* Speaker Indicator Label */}
                        <span className="text-[8px] font-mono font-black tracking-widest text-slate-500 uppercase block mb-1.5">
                          {isUser ? 'YOU (Vocal Speak)' : 'AI TUTOR COACH (Alex)'}
                        </span>

                        {/* Words Tokens list */}
                        <div className="flex flex-wrap gap-x-1.5 gap-y-2 text-xs leading-relaxed font-semibold">
                          {msg.tokens?.map((token, idx) => {
                            
                            // 1. Pronunciation error behavior (clickable Red word triggers popover)
                            if (token.status === 'error') {
                              return (
                                <span key={idx} className="relative inline-block">
                                  <button
                                    onClick={() => {
                                      setSelectedErrorToken(token);
                                      setSelectedGrammarToken(null);
                                      setSelectedVocabToken(null);
                                    }}
                                    className="text-red-400 hover:text-red-300 font-extrabold underline decoration-red-500/80 decoration-2 cursor-pointer transition-colors"
                                  >
                                    {token.word}
                                  </button>
                                </span>
                              );
                            }

                            // 2. Grammar wavy error behavior (clickable orange wavy underlined text)
                            if (token.status === 'grammar-wavy') {
                              return (
                                <span key={idx} className="relative inline-block">
                                  <button
                                    onClick={() => {
                                      setSelectedGrammarToken(token);
                                      setSelectedErrorToken(null);
                                      setSelectedVocabToken(null);
                                    }}
                                    className="text-amber-400 font-black underline decoration-wavy decoration-orange-500/90 underline-offset-4 cursor-pointer transition"
                                  >
                                    {token.word}
                                  </button>
                                </span>
                              );
                            }

                            // 3. Highlight Vocabulary (clickable Hyperlink for A2-C1 phrases)
                            if (token.isVocabHighlight) {
                              return (
                                <span key={idx} className="relative inline-block">
                                  <button
                                    onClick={() => {
                                      setSelectedVocabToken(token);
                                      setSelectedErrorToken(null);
                                      setSelectedGrammarToken(null);
                                    }}
                                    className="text-sky-400 hover:text-sky-300 font-black cursor-pointer underline decoration-dotted underline-offset-2 hover:scale-[1.02] transition-transform"
                                  >
                                    {token.word}
                                  </button>
                                </span>
                              );
                            }

                            // 4. Correct Speak words
                            if (token.status === 'correct' && isUser) {
                              return (
                                <span key={idx} className="text-emerald-400 font-bold">
                                  {token.word}
                                </span>
                              );
                            }

                            // Default token text
                            return <span key={idx} className="text-slate-200">{token.word}</span>;
                          })}
                        </div>

                        {/* Implied correction detail for AI bubbles */}
                        {msg.impliedCorrection && (
                          <div className="mt-3.5 pt-2.5 border-t border-slate-800 text-[10px] text-slate-400 flex gap-1.5 items-start">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                            <span>
                              <b>Sửa lỗi ngầm:</b> Trả lời tự nhiên lặp lại đúng từ pháp để học viên ghi nhớ thụ động.
                            </span>
                          </div>
                        )}
                        
                        <span className="text-[8px] text-slate-600 font-mono font-bold block mt-2 text-right">
                          {msg.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Simulated Focus Mode View */}
                {sessionRunning && currentView === 'focus' && (
                  <motion.div
                    key="focus-mode-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-[#020617] flex flex-col justify-between p-6 z-10"
                  >
                    {/* Atmospheric background flow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#030712] to-slate-950 opacity-90 pointer-events-none" />
                    
                    {/* Focus Header Badge */}
                    <div className="text-center z-10 pt-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono tracking-widest text-amber-400 font-black uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span>Chế độ không xao nhãng • Active</span>
                      </span>
                    </div>

                    {/* INTERACTIVE CENTERPIECE AUDIO VISUALIZER */}
                    <div className="flex-1 flex flex-col items-center justify-center space-y-8 z-10">
                      
                      {/* Unified Central Pulsing Core */}
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        
                        {/* Background dynamic blur aura */}
                        <motion.div
                          animate={{ 
                            scale: activeSpeaker === 'idle' ? 1 : [1, 1.3, 1],
                            opacity: activeSpeaker === 'idle' ? 0.2 : [0.35, 0.8, 0.35] 
                          }}
                          transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
                          className={`absolute inset-0 rounded-full blur-2xl transition-colors duration-1000 ${
                            activeSpeaker === 'user' ? 'bg-sky-500/30' : activeSpeaker === 'ai' ? 'bg-indigo-500/35' : 'bg-slate-800/20'
                          }`}
                        />

                        {/* Audio Avatar Heartbeat Core */}
                        <motion.div
                          animate={activeSpeaker !== 'idle' ? { scale: [1, 1.06, 0.96, 1.04, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 1.4 }}
                          className={`w-20 h-20 rounded-full bg-slate-900 border-2 z-10 transition-all duration-700 flex items-center justify-center shadow-2xl ${
                            activeSpeaker === 'user' ? 'border-sky-450 shadow-sky-500/20' : activeSpeaker === 'ai' ? 'border-indigo-400 shadow-indigo-550/20' : 'border-slate-800'
                          }`}
                        >
                          {activeSpeaker === 'user' ? (
                            <Mic className="w-8 h-8 text-sky-400 animate-pulse" />
                          ) : activeSpeaker === 'ai' ? (
                            <Sparkles className="w-8 h-8 text-indigo-450" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-650" />
                          )}
                        </motion.div>
                      </div>

                      {/* Giant horizontal visualizer lines (oscillating based on active state) */}
                      <div className="w-full h-14 flex items-end justify-center gap-[5px] px-2">
                        {waveHeights.map((h, i) => {
                          const isAI = activeSpeaker === 'ai';
                          const isUser = activeSpeaker === 'user';
                          const color = isUser 
                             ? 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]' 
                             : isAI 
                             ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' 
                             : 'bg-slate-700';
                          return (
                            <motion.div
                              key={i}
                              className={`w-[4px] rounded-full transition-all duration-150 ${color}`}
                              style={{
                                height: `${Math.max(4, h * 1.55)}px`,
                                opacity: activeSpeaker === 'idle' ? 0.25 : 1
                              }}
                            />
                          );
                        })}
                      </div>

                      {/* Subtle status text indicating loop */}
                      <div className="text-center space-y-1">
                        <span className="text-[10px] font-mono tracking-widest text-[#94a3b8] font-black uppercase-spaced block">
                          {activeSpeaker === 'user' ? '🎙️ LISTENING...' : activeSpeaker === 'ai' ? '⚡ AI ALEX TALKING...' : '⏳ THINKING...'}
                        </span>
                        <p className="text-[10px] text-slate-500 font-extrabold">
                          {activeSpeaker === 'user' ? 'Đang chấm âm Azure phát âm chuẩn IPA...' : activeSpeaker === 'ai' ? 'TTS tự nhiên theo ngữ âm chuẩn Mỹ...' : 'Vẫn ngầm ghi nhận lỗi ngữ pháp...'}
                        </p>
                      </div>

                    </div>

                    {/* FLOATING CONTROL BAR */}
                    <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-2.5 flex justify-around items-center z-10 shadow-2xl">
                      {/* Mute toggle button */}
                      <button
                        onClick={() => {
                          setIsMuted(!isMuted);
                          setBackgroundLogs(prev => [
                            ...prev,
                            {
                              id: 'log-' + Date.now(),
                              type: 'pronunciation',
                              text: 'Microphone Action',
                              details: `Học viên đổi trạng thái Micro thành: ${!isMuted ? 'Tắt âm' : 'Mở âm'}`,
                              timestamp: 'Vừa xong'
                            }
                          ]);
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          isMuted 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/20' 
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-750'
                        }`}
                        title={isMuted ? 'Mở Micro' : 'Tắt Micro'}
                      >
                        {isMuted ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4 text-slate-200" />}
                      </button>

                      {/* End Session physics action */}
                      <button
                        onClick={handleEndSession}
                        className="bg-red-600 hover:bg-red-705 text-white text-[10px] font-extrabold tracking-wider px-4 py-2 rounded-xl uppercase transition-all cursor-pointer hover:scale-103 shadow-lg shadow-red-950/40"
                      >
                        Kết thúc gọi
                      </button>

                      {/* Back to Chat View Button */}
                      <button
                        onClick={() => setCurrentView('chat')}
                        className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white text-[9px] font-black uppercase px-3 py-2 rounded-xl transition-all cursor-pointer"
                        title="Về Giao diện Chat"
                      >
                        Về Xem Chat 💬
                      </button>
                    </div>

                  </motion.div>
                )}

                {/* Simulated Overall Diagnostic Report (Màn hình Báo cáo tổng hợp) */}
                {showingReport && (
                  <motion.div
                    key="overall-report"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[9px] text-indigo-400 font-mono font-black uppercase tracking-wider block">Completed Call Analysis</span>
                        <h4 className="text-sm font-black uppercase text-white">Báo Cáo Đàm Thoại Trọn Gói</h4>
                      </div>
                      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xs font-black font-sans text-amber-300 border border-indigo-400">
                        84%
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-normal font-semibold">
                      Hoàn thành phiên trò chơi đối thoại trực tiếp. Phân tích bám sát tiêu chí phân phối CEFR:
                    </p>

                    <div className="space-y-2.5 bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">CEFR Target Level:</span>
                        <span className="text-indigo-400 font-black">
                          {activeScenario === 'coffee' ? 'A2 • Beginner' : activeScenario === 'interview' ? 'B2 • Upper-Intermediate' : 'C1 • Advanced'}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">Phát âm đạt chuẩn (Accuracy):</span>
                        <span className="text-emerald-400">82%</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">Tần số ngữ pháp chuẩn (Grammar):</span>
                        <span className="text-amber-400">1 Lỗi hệ thống</span>
                      </div>
                    </div>

                    {/* Word storage specs */}
                    {customSavedWords.length > 0 && (
                      <div className="p-3.5 bg-indigo-950/20 rounded-xl border border-indigo-900/30">
                        <span className="text-[10px] text-indigo-300 font-mono font-bold block mb-2 uppercase">🎁 ĐÃ LƯU VÀO SỔ TỪ VỰNG ({customSavedWords.length}):</span>
                        <div className="flex flex-wrap gap-1.5">
                          {customSavedWords.map((w, idx) => (
                            <span key={idx} className="bg-indigo-900/60 border border-indigo-805 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleRestartSession}
                      className="w-full bg-indigo-605 text-white hover:bg-indigo-705 text-xs font-black py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      style={{ backgroundColor: '#2563eb' }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>THIẾT LẬP LẠI PHÒNG THOẠI</span>
                    </button>
                  </motion.div>
                )}

                {/* Simulated Floating Overlays for interactive inspect */}
                {selectedErrorToken && (
                  <motion.div
                    key="err-overlay"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-x-4 top-24 mx-2 bg-slate-900 border border-red-500/40 rounded-2xl p-4 shadow-xl z-30"
                  >
                    <div className="flex justify-between items-start pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-[8px] font-mono text-red-400 font-black uppercase tracking-wider block">Pronunciation IPA Diagnostics</span>
                        <h4 className="text-sm font-black text-white uppercase">Sửa lỗi phát âm từ "{selectedErrorToken.word}"</h4>
                      </div>
                      <button onClick={() => setSelectedErrorToken(null)} className="text-slate-400 hover:text-white cursor-pointer p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2 mt-3 font-semibold text-xs text-slate-350">
                      <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                        <span className="text-slate-400">Phiên âm IPA chuẩn:</span>
                        <span className="text-emerald-400 font-mono font-bold">/{selectedErrorToken.ipa}/</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">
                        {selectedErrorToken.errorReason}
                      </p>
                    </div>
                  </motion.div>
                )}

                {selectedGrammarToken && (
                  <motion.div
                    key="gram-overlay"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-x-4 top-24 mx-2 bg-slate-900 border border-amber-500/40 rounded-2xl p-4 shadow-xl z-30"
                  >
                    <div className="flex justify-between items-start pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-[8px] font-mono text-amber-400 font-black uppercase tracking-wider block">Grammar Checker (Wavy Correct)</span>
                        <h4 className="text-sm font-black text-white uppercase">Sửa lỗi ngữ pháp cấu trúc</h4>
                      </div>
                      <button onClick={() => setSelectedGrammarToken(null)} className="text-slate-400 hover:text-white cursor-pointer p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3 mt-3 font-semibold text-xs text-slate-300">
                      <div>
                        <span className="text-[10px] text-slate-500 block">BẠN ĐÃ NÓI:</span>
                        <span className="text-red-400 line-through">"{selectedGrammarToken.word}"</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-550 block text-emerald-400">GỢI Ý CẤU TRÚC ĐÚNG:</span>
                        <span className="text-emerald-400 font-black">"{selectedGrammarToken.suggested}"</span>
                      </div>
                      <p className="text-[11px] leading-normal text-slate-400 italic pt-1.5 border-t border-slate-800">
                        {selectedGrammarToken.errorReason}
                      </p>
                    </div>
                  </motion.div>
                )}

                {selectedVocabToken && (
                  <motion.div
                    key="vocab-overlay"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-x-4 top-24 mx-1.5 bg-slate-900 border border-sky-500/45 rounded-2xl p-4 shadow-xl z-30"
                  >
                    <div className="flex justify-between items-start pb-2 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] bg-sky-500/20 text-sky-450 font-black px-1.5 py-0.5 rounded font-mono uppercase">{selectedVocabToken.vocabLevel} Vocab</span>
                          <span className="text-[8px] text-slate-405 font-medium font-mono uppercase">Interactive Dictionary</span>
                        </div>
                        <h4 className="text-sm font-black text-white mt-0.5">Nghĩa từ "{selectedVocabToken.word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")}"</h4>
                      </div>
                      <button onClick={() => setSelectedVocabToken(null)} className="text-slate-405 hover:text-white cursor-pointer p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3.5 mt-3 text-xs font-semibold">
                      <p className="text-slate-300 leading-normal">
                        📝 <b>Định nghĩa Việt ngữ:</b> {selectedVocabToken.vocabMeaning}
                      </p>

                      <div className="flex gap-2.5 pt-2">
                        <button
                          onClick={() => triggerSaveWord(selectedVocabToken.word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black py-2 rounded-xl flex items-center justify-center gap-1 uppercase tracking-wide cursor-pointer transition-colors"
                        >
                          <BookMarked className="w-3.5 h-3.5" />
                          <span>Lưu vào My Decks</span>
                        </button>
                        <button
                          onClick={() => {
                            alert(`Bán kính búp âm: Thử nói "Lưu từ ${selectedVocabToken.word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")} vào ôn tập" để tự động kích hoạt tính năng rảnh tay!`);
                            setSelectedVocabToken(null);
                          }}
                          className="px-3 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-wide"
                        >
                          Nói mẫu
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* LIVE SYSTEM TOAST (Micro-notification popup) */}
            <AnimatePresence>
              {showSaveToast && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute bottom-28 inset-x-4 pl-3.5 pr-2 py-2 bg-indigo-950 border border-indigo-500/50 rounded-xl text-white flex items-center justify-between shadow-2xl z-40"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase text-slate-100">
                      Đã lưu từ <b>"{lastSavedWord}"</b> thành công!
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-indigo-405 font-bold uppercase py-0.5 px-1.5 bg-indigo-900 rounded">
                    My Decks
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LIVE AUDIO ZONE (Khu vực sóng âm phòng thoại dưới cùng) */}
            {currentView === 'chat' && (
              <div className="p-5 bg-slate-900 border-t border-white/5 relative z-20">
                
                {/* Audio Visualizer Waves (nhảy nhịp liên tục bộc lộ người nói) */}
                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  
                  {/* Visual state label */}
                  <span className="text-[8px] font-mono tracking-widest text-[#a5b4fc] font-black uppercase mb-2">
                    {showingReport ? 'CALL DISCONNECTED' : activeSpeaker === 'user' ? '🔊 BẠN ĐANG NÓI (USER FREQUENCY)' : activeSpeaker === 'ai' ? '🔊 AI ALEX ĐANG TRẢ LỜI (frequency)' : '🎙️ ĐANG LỜI CHỜ BẮT THOẠI (STANDBY)'}
                  </span>

                  <div className="flex items-end justify-center gap-1.5 h-10 w-full px-8">
                    {waveHeights.map((h, i) => {
                      const color = activeSpeaker === 'user' 
                        ? 'bg-sky-500' 
                        : activeSpeaker === 'ai' 
                        ? 'bg-indigo-500' 
                        : 'bg-slate-700';
                      return (
                        <motion.div 
                          key={i} 
                          className={`w-1 rounded-full transition-all duration-150 ${color}`}
                          style={{ height: `${h}px` }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Call Control Widget */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3.5 px-2">
                  
                  {/* Mute Button (icon nhỏ gọn) */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isMuted 
                        ? 'bg-red-500 text-white hover:bg-red-650' 
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-705'
                    }`}
                    title={isMuted ? 'Mở âm Micro' : 'Tắt tiếng Micro'}
                  >
                    {isMuted ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-slate-100 animate-pulse" />}
                  </button>

                  {/* Call center state badge */}
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 bg-slate-950/80 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                      <span>REAL-TIME ENGINE</span>
                    </span>
                  </div>

                  {/* Speaker Controller */}
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      !isSpeakerOn 
                        ? 'bg-red-500 text-white hover:bg-red-650' 
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-705'
                    }`}
                    title={isSpeakerOn ? 'Tắt Loa Ngoài' : 'Bật Loa Ngoài'}
                  >
                    {isSpeakerOn ? <Volume2 className="w-4 h-4 text-slate-100" /> : <VolumeX className="w-4 h-4 text-white" />}
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>

        {/* SPECIFICATION CARD DETAILS (Col 5) */}
        <div className="lg:col-span-5 space-y-6 text-slate-800 dark:text-slate-205">
          
          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${
            isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] text-indigo-500 font-mono font-black uppercase tracking-wider block">UI Spec Specifications</span>
            <h4 className={`text-base font-black mt-1 uppercase text-slate-900 dark:text-white`}>Chỉ dẫn lập trình Live Voice</h4>
            <div className={`w-12 h-1 bg-indigo-600 mt-2.5 rounded-full`}></div>
            
            <p className="text-xs leading-relaxed mt-4 font-semibold text-slate-650 dark:text-slate-400">
              Mô hình đã được tinh giản, loại bỏ các nút thủ công bất hợp lý, chuyển hẳn sang bắt luồng Voice trực tiếp (Automatic Speech Recognition) với các thông số:
            </p>

            <ul className="space-y-4 text-xs font-semibold mt-4">
              <li className="flex gap-2.5 items-start">
                <div className="w-5 h-5 bg-sky-500/10 text-sky-400 rounded flex items-center justify-center shrink-0 text-[10px] font-black">A</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Detect Phát âm tự động:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-[11px] leading-relaxed">
                    Từ đọc đúng được tô màu xanh lá, từ lỗi tô đỏ đậm. Học viên chạm vào từ Đỏ để kéo Popover IPA chi tiết. Tránh sử dụng Modal làm ngắt ngoãng mạch tập nói.
                  </p>
                </div>
              </li>

              <li className="flex gap-2.5 items-start">
                <div className="w-5 h-5 bg-amber-500/10 text-amber-500 rounded flex items-center justify-center shrink-0 text-[10px] font-black">B</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Detect Ngữ pháp dạng gạch lượn sóng:</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-[11px] leading-relaxed">
                    Sử dụng các lớp CSS custom gạch chân lượn sóng màu cam giúp nhận diện ngay nhịp ghép từ thừa thiếu.
                  </p>
                </div>
              </li>

              <li className="flex gap-2.5 items-start">
                <div className="w-5 h-5 bg-indigo-500/10 text-indigo-400 rounded flex items-center justify-center shrink-0 text-[10px] font-black">C</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Khẩu lệnh rảnh tay "Lưu từ":</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 text-[11px] leading-relaxed">
                    Khi người học thốt lên câu bao gồm tiền tố "Lưu từ...", hệ thống nén dòng thoại, tự động cất từ vào ví từ My Decks của học viên rồi xuất System Toast thay vì in chữ đầy đủ gây nhiễu luồng đàm thoại.
                  </p>
                  
                  {/* Quick test buttons to see commands */}
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    <button
                      onClick={() => triggerSaveWord('latte')}
                      className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-[10px] rounded hover:bg-indigo-750 transition cursor-pointer"
                    >
                      Bắn lệnh: "Lưu từ latte"
                    </button>
                    <button
                      onClick={() => triggerSaveWord('coordination')}
                      className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-[10px] rounded hover:bg-indigo-750 transition cursor-pointer"
                    >
                      Bắn lệnh: "Lưu từ coordination"
                    </button>
                  </div>
                </div>
              </li>
            </ul>

          </div>

          <div className={`p-4 rounded-xl border flex gap-3 text-xs leading-normal transition-colors duration-500 ${
            isDark ? 'bg-indigo-950/20 border-indigo-900/40 text-indigo-300' : 'bg-indigo-50/50 border-indigo-150 text-indigo-805'
          }`}>
            <Info className="w-5 h-5 shrink-0 text-indigo-500 mt-0.5" />
            <div>
              <strong>Chỉ mục thiết kế:</strong> Sóng Visualizer ở chân trang ứng dụng nhảy kép màu tùy thuộc luồng đàm thoại (AI: Violet-Indigo mượt mà, User: Sky-Blue cao bồi dữ dội) bộc lộ rõ nét nhịp tương tác hai chiều.
            </div>
          </div>

          {/* BACKGROUND TELEMETRY PANEL */}
          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${
            isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] text-amber-500 font-mono font-black uppercase tracking-wider block">Background Data Engine</span>
            <h4 className={`text-base font-black mt-1 uppercase text-slate-900 dark:text-white flex items-center gap-1.5`}>
              <span>Xử Lý Dữ Liệu Ngầm (Focus Telemetry)</span>
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </h4>
            <div className={`w-12 h-1 bg-amber-500 mt-2.5 rounded-full`}></div>
            
            <p className="text-xs leading-relaxed mt-4 font-semibold text-slate-650 dark:text-slate-400">
              Khi học viên kích hoạt <b>"Chế Độ Tập Trung (Focus Mode)"</b>, toàn bộ giao diện chat bị mờ và ẩn đi để giải phóng 100% tài nguyên chú ý của mắt. Tuy nhiên, hệ thống ngầm vẫn xử lý dữ liệu liên tục:
            </p>

            <div className="mt-4 p-3.5 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 border-b border-slate-850 pb-2">
                <span>SYSTEM LOGS (SÓNG ĐANG STREAMING)</span>
                <span className="text-emerald-400 font-black flex items-center gap-1 text-[9px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE ACTIVE</span>
                </span>
              </div>
              
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {backgroundLogs.slice().reverse().map((log, idx) => (
                  <div key={log.id || idx} className="text-[10px] font-mono leading-normal bg-slate-950 p-2 rounded border border-slate-850 text-slate-300">
                    <div className="flex justify-between font-black text-[9px] mb-0.5">
                      <span className={log.type === 'pronunciation' ? 'text-rose-400' : log.type === 'grammar' ? 'text-amber-400' : 'text-sky-400'}>
                        [{log.type.toUpperCase()}] {log.text}
                      </span>
                      <span className="text-slate-500">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">{log.details}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-start gap-1.5 text-[9px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><b>Cơ Chế Auto-Flush:</b> Toàn bộ lỗi phát âm (IPA) và phân tích ngữ pháp trong log này sẽ được chuyển dồn và và tổng hợp đầy đủ tại <b>Bảng Báo Cáo Tổng Hợp</b> ngay khi kết thúc cuộc gọi!</span>
              </div>
            </div>

            {/* Quick simulator triggers */}
            <div className="mt-4 space-y-2">
              <span className="text-[10px] font-black text-slate-400 block">Kích hoạt sự kiện giả lập chạy ngầm:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setBackgroundLogs(prev => [
                      ...prev,
                      {
                        id: 'sim-' + Date.now(),
                        type: 'pronunciation',
                        text: 'threats',
                        details: 'Azure Voice: Trọng âm sai từ "threats" /θrets/ -> /θri:ts/. Đã lưu cache.',
                        timestamp: 'Vừa xong'
                      }
                    ]);
                  }}
                  className="px-2 py-1.5 border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-350 rounded-xl hover:text-white hover:border-slate-500 text-[9px] font-bold cursor-pointer transition-all"
                >
                  📡 Mock Lỗi Phát Âm
                </button>
                <button
                  onClick={() => {
                    setBackgroundLogs(prev => [
                      ...prev,
                      {
                        id: 'sim-' + Date.now(),
                        type: 'grammar',
                        text: 'have worked',
                        details: 'Gemini NLP: Phát hiện sai hoàn cảnh dùng thì "have work" -> "have been working".',
                        timestamp: 'Vừa xong'
                      }
                    ]);
                  }}
                  className="px-2 py-1.5 border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-350 rounded-xl hover:text-white hover:border-slate-500 text-[9px] font-bold cursor-pointer transition-all"
                >
                  📝 Mock Sai Ngữ Pháp
                </button>
                <button
                  onClick={() => {
                    setBackgroundLogs(prev => [
                      ...prev,
                      {
                        id: 'sim-' + Date.now(),
                        type: 'vocab',
                        text: 'coordination',
                        details: 'Gemini Voice Parse: Học viên sử dụng khẩu lệnh "Lưu từ coordination" -> Đã auto-gói.',
                        timestamp: 'Vừa xong'
                      }
                    ]);
                    triggerSaveWord('coordination');
                  }}
                  className="px-2 py-1.5 border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-350 rounded-xl hover:text-white hover:border-slate-500 text-[9px] font-bold cursor-pointer transition-all"
                >
                  📦 Mock Khẩu Lệnh Lưu Từ
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
