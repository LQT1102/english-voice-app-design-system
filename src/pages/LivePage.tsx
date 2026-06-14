/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Settings,
  Octagon,
  Mic,
  MicOff,
  Keyboard,
  Sparkles,
  Target,
  Volume2,
  X,
  BookMarked,
  ArrowDown,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

type WordStatus = 'correct' | 'warning' | 'error';

interface WordToken {
  word: string;
  status: WordStatus;
  ipa: string;
  note?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text?: string; // for AI bubbles
  tokens?: WordToken[]; // for user bubbles (color-coded)
  accuracy?: number; // user score badge
  feedback?: string; // AI grammar feedback for the sentence
  time: string;
}

const LEVEL = 'B2';
const TOPIC = 'COFFEE SHOP ORDER';

const conversation: ChatMessage[] = [
  {
    id: 'ai-1',
    sender: 'ai',
    text: "Hi there! Welcome to the cafe. What can I get started for you today?",
    time: '10:11',
  },
  {
    id: 'u-1',
    sender: 'user',
    accuracy: 78,
    feedback:
      'Phát âm "latte" bị sai trọng âm và "oat" mất nguyên âm đôi. Cấu trúc câu tốt, chỉ cần chỉnh phát âm để tự nhiên hơn.',
    tokens: [
      { word: 'Can', status: 'correct', ipa: 'kæn' },
      { word: 'I', status: 'correct', ipa: 'aɪ' },
      { word: 'have', status: 'correct', ipa: 'hæv' },
      { word: 'a', status: 'correct', ipa: 'ə' },
      { word: 'hot', status: 'correct', ipa: 'hɒt' },
      { word: 'vanilla', status: 'correct', ipa: 'vəˈnɪlə' },
      {
        word: 'late',
        status: 'error',
        ipa: 'ˈlæt.eɪ',
        note: 'Bạn đọc thành /leɪt/. Từ đúng là "latte" /ˈlæt.eɪ/ — nhấn âm đầu và bật đuôi /eɪ/.',
      },
      { word: 'with', status: 'correct', ipa: 'wɪð' },
      {
        word: 'ot',
        status: 'warning',
        ipa: 'əʊt',
        note: 'Thiếu nguyên âm đôi /əʊ/. Đọc tròn môi "oat" /əʊt/ thay vì /ɒt/.',
      },
      { word: 'milk', status: 'correct', ipa: 'mɪlk' },
      { word: 'please', status: 'correct', ipa: 'pliːz' },
    ],
    time: '10:12',
  },
  {
    id: 'ai-2',
    sender: 'ai',
    text: "Absolutely! One hot vanilla latte with oat milk coming right up. Would you like that in a regular or large size?",
    time: '10:12',
  },
  {
    id: 'u-2',
    sender: 'user',
    accuracy: 94,
    feedback:
      'Tuyệt vời! Câu trả lời rõ ràng và trôi chảy. Chỉ cần lưu ý nối âm giữa "large" và "one".',
    tokens: [
      { word: 'A', status: 'correct', ipa: 'ə' },
      { word: 'large', status: 'correct', ipa: 'lɑːdʒ' },
      { word: 'one', status: 'correct', ipa: 'wʌn' },
      { word: 'would', status: 'correct', ipa: 'wʊd' },
      { word: 'be', status: 'correct', ipa: 'biː' },
      {
        word: 'perfect',
        status: 'warning',
        ipa: 'ˈpɜː.fɪkt',
        note: 'Đuôi /kt/ chưa rõ. Bật nhẹ âm /t/ ở cuối để nghe chuẩn hơn.',
      },
      { word: 'thanks', status: 'correct', ipa: 'θæŋks' },
    ],
    time: '10:13',
  },
];

const aiHint = 'Thử dùng "I\u2019d like..." thay vì "Can I have..." để nghe trang trọng và tự nhiên hơn.';

function levelBadgeClasses(isDark: boolean) {
  // B2 maps to sky accent in this design system
  return isDark
    ? 'bg-sky-950/60 text-sky-300 border border-sky-900/70'
    : 'bg-sky-50 text-sky-700 border border-sky-200';
}

function statusTextClass(status: WordStatus, isDark: boolean) {
  switch (status) {
    case 'correct':
      return isDark ? 'text-emerald-300' : 'text-emerald-600';
    case 'warning':
      return isDark ? 'text-amber-300' : 'text-amber-600';
    case 'error':
      return isDark ? 'text-rose-300' : 'text-rose-600';
  }
}

function statusChipClass(status: WordStatus, isDark: boolean) {
  switch (status) {
    case 'correct':
      return isDark
        ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300'
        : 'bg-emerald-50 border-emerald-200 text-emerald-700';
    case 'warning':
      return isDark
        ? 'bg-amber-950/40 border-amber-900/60 text-amber-300'
        : 'bg-amber-50 border-amber-200 text-amber-700';
    case 'error':
      return isDark
        ? 'bg-rose-950/40 border-rose-900/60 text-rose-300'
        : 'bg-rose-50 border-rose-200 text-rose-700';
  }
}

export default function LivePage() {
  const { isDark } = useTheme();

  const [elapsed, setElapsed] = useState(225); // seconds -> 03:45
  const [isRecording, setIsRecording] = useState(false);
  const [handsFree, setHandsFree] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [showNewBadge, setShowNewBadge] = useState(false);

  // Conversation settings
  const [showSettings, setShowSettings] = useState(false);
  const [level, setLevel] = useState(LEVEL);
  const [systemPrompt, setSystemPrompt] = useState(
    'Bạn là một barista thân thiện tại quán cà phê. Hãy trò chuyện tự nhiên, giữ câu ngắn gọn và sửa nhẹ nhàng khi học viên mắc lỗi.',
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Session timer
  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const timer = useMemo(() => {
    const m = Math.floor(elapsed / 60)
      .toString()
      .padStart(2, '0');
    const s = (elapsed % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [elapsed]);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    bottomRef.current?.scrollIntoView({ behavior });
    setShowNewBadge(false);
  };

  // Auto-scroll on mount
  useEffect(() => {
    scrollToBottom('auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect manual scroll up -> show "new messages" FAB
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowNewBadge(distanceFromBottom > 120);
  };

  return (
    <div
      className={`font-sans fixed inset-0 flex flex-col transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* ===== 1. HEADER (fixed top) ===== */}
      <header
        className={`shrink-0 z-20 border-b backdrop-blur transition-colors duration-500 ${
          isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white/90 border-slate-200'
        }`}
      >
        <div className="mx-auto max-w-3xl w-full flex items-center gap-3 px-4 py-3">
          {/* Left: back + level badge */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              aria-label="Rời phòng luyện nói"
              className={`w-10 h-10 flex items-center justify-center rounded-xl border active:scale-95 transition-all ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black font-mono tracking-wider ${levelBadgeClasses(
                isDark,
              )}`}
            >
              {LEVEL}
            </span>
          </div>

          {/* Center: topic + timer */}
          <div className="flex-1 min-w-0 text-center px-1">
            <h1 className="text-sm font-black uppercase tracking-wide truncate">
              {TOPIC}
            </h1>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-rose-500 opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-rose-500" />
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">{timer}</span>
            </div>
          </div>

          {/* Right: settings + end */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Cài đặt Mic, Loa, tốc độ đọc"
              className={`w-10 h-10 flex items-center justify-center rounded-xl border active:scale-95 transition-all ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
            <Link
              to="/"
              aria-label="Kết thúc phiên và xem báo cáo"
              className="flex items-center gap-1.5 h-10 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wide active:scale-95 transition-all shadow-sm"
            >
              <Octagon className="w-4 h-4" />
              <span className="hidden sm:inline">Kết thúc</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ===== 2. CHAT / HISTORY (scrolling middle) ===== */}
      <main
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto custom-scroll relative"
      >
        <div className="mx-auto max-w-3xl w-full px-4 py-6 flex flex-col gap-5">
          {conversation.map((msg) =>
            msg.sender === 'ai' ? (
              <AiBubble key={msg.id} message={msg} isDark={isDark} />
            ) : (
              <UserBubble
                key={msg.id}
                message={msg}
                isDark={isDark}
                onTap={() => setSelectedMessage(msg)}
              />
            ),
          )}

          {/* Live streaming indicator */}
          {isRecording && (
            <div className="flex justify-end">
              <div
                className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl rounded-br-md ${
                  isDark ? 'bg-indigo-950/50' : 'bg-indigo-50'
                }`}
              >
                <span className="text-[11px] font-bold text-indigo-400">Đang nghe</span>
                <span className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full bg-indigo-400 animate-micro-flash"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Auto-scroll FAB */}
      <AnimatePresence>
        {showNewBadge && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => scrollToBottom()}
            className="absolute left-1/2 -translate-x-1/2 bottom-[180px] z-20 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-indigo-600 text-white text-xs font-black shadow-lg active:scale-95"
          >
            <ArrowDown className="w-4 h-4" />
            Tin nhắn mới
          </motion.button>
        )}
      </AnimatePresence>

      {/* ===== 3. CONTROL DOCK (fixed bottom) ===== */}
      <footer
        className={`shrink-0 z-20 border-t transition-colors duration-500 ${
          isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}
      >
        <div className="mx-auto max-w-3xl w-full px-4 pt-3 pb-5">
          {/* AI Hints card */}
          <div
            className={`flex items-start gap-2.5 px-3.5 py-2.5 rounded-2xl border mb-4 ${
              isDark
                ? 'bg-amber-950/30 border-amber-900/50 text-amber-200'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <p className="text-xs font-semibold leading-relaxed text-pretty">{aiHint}</p>
          </div>

          {showKeyboard ? (
            /* Keyboard input mode */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTextInput('');
                setShowKeyboard(false);
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                aria-label="Đóng bàn phím"
                onClick={() => setShowKeyboard(false)}
                className={`w-11 h-11 shrink-0 flex items-center justify-center rounded-xl border active:scale-95 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
              <input
                autoFocus
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Nhập câu trả lời của bạn..."
                className={`flex-1 h-11 px-4 rounded-xl border text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`}
              />
              <button
                type="submit"
                className="h-11 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm active:scale-95"
              >
                Gửi
              </button>
            </form>
          ) : (
            /* Mic control row */
            <div className="flex items-center justify-between">
              {/* Keyboard toggle (left) */}
              <button
                type="button"
                aria-label="Mở bàn phím nhập văn bản"
                onClick={() => setShowKeyboard(true)}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl border active:scale-95 transition-all ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900'
                }`}
              >
                <Keyboard className="w-5 h-5" />
              </button>

              {/* Mic button with visualizer ring (center) */}
              <div className="relative flex items-center justify-center">
                {isRecording && (
                  <>
                    <span className="absolute w-20 h-20 rounded-full bg-indigo-500/30 animate-ripple" />
                    <span
                      className="absolute w-20 h-20 rounded-full bg-indigo-500/20 animate-ripple"
                      style={{ animationDelay: '1s' }}
                    />
                  </>
                )}
                <button
                  type="button"
                  aria-label={isRecording ? 'Dừng thu âm' : 'Bắt đầu thu âm'}
                  onClick={() => setIsRecording((r) => !r)}
                  className={`relative w-18 h-18 flex items-center justify-center rounded-full text-white shadow-lg active:scale-95 transition-all ${
                    isRecording
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  style={{ width: '4.5rem', height: '4.5rem' }}
                >
                  {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>
              </div>

              {/* Hands-free toggle (right) */}
              <button
                type="button"
                aria-pressed={handsFree}
                aria-label="Chế độ rảnh tay (tự ngắt âm)"
                onClick={() => setHandsFree((h) => !h)}
                className={`flex flex-col items-center justify-center gap-0.5 w-12 h-12 rounded-2xl border active:scale-95 transition-all ${
                  handsFree
                    ? isDark
                      ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <Zap className={`w-4 h-4 ${handsFree ? 'fill-current' : ''}`} />
                <span className="text-[8px] font-black uppercase tracking-wider">Auto</span>
              </button>
            </div>
          )}
        </div>
      </footer>

      {/* ===== BOTTOM SHEET: tap-to-detail ===== */}
      <DetailSheet
        message={selectedMessage}
        isDark={isDark}
        onClose={() => setSelectedMessage(null)}
      />
    </div>
  );
}

/* ---------- Sub-components ---------- */

const AiBubble: React.FC<{ message: ChatMessage; isDark: boolean }> = ({ message, isDark }) => {
  return (
    <div className="flex items-end gap-2.5 max-w-[85%]">
      <div className="w-8 h-8 shrink-0 rounded-full bg-indigo-600 text-white font-black text-[11px] flex items-center justify-center border border-indigo-400 shadow-sm">
        AI
      </div>
      <div
        className={`px-4 py-3 rounded-2xl rounded-bl-md text-sm font-medium leading-relaxed shadow-sm ${
          isDark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800 border border-slate-200'
        }`}
      >
        {message.text}
        <div className="mt-1 text-[10px] font-mono text-slate-400">{message.time}</div>
      </div>
    </div>
  );
}

const UserBubble: React.FC<{
  message: ChatMessage;
  isDark: boolean;
  onTap: () => void;
}> = ({ message, isDark, onTap }) => {
  const hasIssues = message.tokens?.some((t) => t.status !== 'correct');

  return (
    <div className="flex flex-col items-end self-end max-w-[85%]">
      <button
        type="button"
        onClick={onTap}
        className={`text-left px-4 py-3 rounded-2xl rounded-br-md shadow-sm active:scale-[0.99] transition-all cursor-pointer ${
          isDark ? 'bg-indigo-950/60 border border-indigo-900/60' : 'bg-indigo-50 border border-indigo-150'
        }`}
      >
        <p className="text-sm font-semibold leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
          {message.tokens?.map((t, i) => (
            <span
              key={i}
              className={`${statusTextClass(t.status, isDark)} ${
                t.status !== 'correct' ? 'underline decoration-dotted underline-offset-4' : ''
              }`}
            >
              {t.word}
            </span>
          ))}
        </p>

        <div className="flex items-center justify-between gap-3 mt-2">
          {/* Score badge */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black ${
              (message.accuracy ?? 0) >= 90
                ? isDark
                  ? 'bg-emerald-950/50 text-emerald-300'
                  : 'bg-emerald-100 text-emerald-700'
                : isDark
                  ? 'bg-amber-950/50 text-amber-300'
                  : 'bg-amber-100 text-amber-700'
            }`}
          >
            <Target className="w-3 h-3" />
            Accuracy: {message.accuracy}%
          </span>
          <span className="text-[10px] font-mono text-slate-400">{message.time}</span>
        </div>
      </button>

      {/* Visual cue */}
      {hasIssues && (
        <span className="flex items-center gap-1 mt-1 mr-1 text-[10px] font-semibold text-slate-400">
          <span className="w-1 h-1 rounded-full bg-rose-400 animate-pulse" />
          Chạm để xem lỗi
        </span>
      )}
    </div>
  );
}

function DetailSheet({
  message,
  isDark,
  onClose,
}: {
  message: ChatMessage | null;
  isDark: boolean;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (message) setSaved(false);
  }, [message]);

  return (
    <AnimatePresence>
      {message && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed left-0 right-0 bottom-0 z-50 max-h-[85vh] flex flex-col rounded-t-3xl border-t shadow-2xl ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Grabber */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <span className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Header: the sentence */}
            <div
              className={`flex items-start justify-between gap-3 px-5 pb-4 pt-2 border-b shrink-0 ${
                isDark ? 'border-slate-800' : 'border-slate-150'
              }`}
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-indigo-500">
                  Phân tích câu nói
                </span>
                <p className="text-sm font-bold mt-1 leading-relaxed">
                  {message.tokens?.map((t) => t.word).join(' ')}
                </p>
              </div>
              <button
                type="button"
                aria-label="Đóng"
                onClick={onClose}
                className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-xl border active:scale-95 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto custom-scroll px-5 py-5">
              {/* Word-by-word chips with IPA */}
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-400">
                Phát âm từng từ (chạm để nghe)
              </span>
              <div className="flex flex-wrap gap-2.5 mt-3 mb-6">
                {message.tokens?.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-xl border active:scale-95 transition-all cursor-pointer ${statusChipClass(
                      t.status,
                      isDark,
                    )}`}
                  >
                    <span className="flex items-center gap-1 text-[10px] font-mono opacity-80">
                      <Volume2 className="w-2.5 h-2.5" />/{t.ipa}/
                    </span>
                    <span className="text-sm font-black">{t.word}</span>
                  </button>
                ))}
              </div>

              {/* Per-word notes for problem words */}
              {message.tokens
                ?.filter((t) => t.status !== 'correct' && t.note)
                .map((t, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 px-3.5 py-3 rounded-2xl border mb-2.5 ${statusChipClass(
                      t.status,
                      isDark,
                    )}`}
                  >
                    <span className="font-black text-sm shrink-0">{t.word}</span>
                    <p className="text-xs font-semibold leading-relaxed">{t.note}</p>
                  </div>
                ))}

              {/* AI feedback */}
              <div
                className={`flex items-start gap-2.5 px-3.5 py-3 rounded-2xl border mt-4 ${
                  isDark ? 'bg-indigo-950/30 border-indigo-900/50' : 'bg-indigo-50 border-indigo-150'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
                <div>
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-indigo-500">
                    Nhận xét của AI
                  </span>
                  <p className="text-xs font-semibold leading-relaxed mt-1">{message.feedback}</p>
                </div>
              </div>
            </div>

            {/* CTA: Save to review deck */}
            <div className={`px-5 py-4 border-t shrink-0 ${isDark ? 'border-slate-800' : 'border-slate-150'}`}>
              <button
                type="button"
                onClick={() => setSaved(true)}
                className={`w-full h-12 flex items-center justify-center gap-2 rounded-2xl font-black text-sm active:scale-95 transition-all ${
                  saved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Đã lưu vào bộ ôn tập
                  </>
                ) : (
                  <>
                    <BookMarked className="w-5 h-5" />
                    Lưu vào bộ ôn tập
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
