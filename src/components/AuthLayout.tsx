/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Radio, TrendingUp, ShieldCheck } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface AuthLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const highlights = [
  { icon: Radio, text: 'Luyện nói tiếng Anh real-time với phản hồi tức thì' },
  { icon: TrendingUp, text: 'Chấm điểm phát âm theo chuẩn CEFR (A1–C2)' },
  { icon: ShieldCheck, text: 'Bảo mật tài khoản & lộ trình học cá nhân hóa' },
];

export default function AuthLayout({ badge, title, subtitle, children }: AuthLayoutProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen font-sans antialiased flex items-center justify-center px-4 py-20 transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      <div
        className={`w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl border overflow-hidden shadow-xl transition-colors duration-500 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Brand panel */}
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <div className="absolute -top-16 -left-10 w-64 h-64 rounded-full bg-indigo-600 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-sky-500 blur-3xl" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 font-black text-2xl flex items-center justify-center rounded-2xl bg-indigo-600 text-white">
                E
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight">Echo English</h2>
                <p className="text-[11px] text-slate-400 font-mono">live-speech.platform</p>
              </div>
            </div>

            <p className="mt-10 text-2xl font-black leading-snug text-balance">
              Nói tiếng Anh tự tin hơn mỗi ngày cùng AI phản hồi tức thì.
            </p>
          </div>

          <ul className="relative space-y-4 mt-10">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="w-8 h-8 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-200 leading-relaxed">{item.text}</span>
                </li>
              );
            })}
          </ul>

          <div className="relative flex items-center gap-2 text-[11px] font-bold text-slate-400 mt-10">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Design System · Bento Spec Sheet v1.1.0</span>
          </div>
        </div>

        {/* Form panel */}
        <div className="p-7 sm:p-10 flex flex-col justify-center">
          <span
            className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded inline-block w-fit transition-colors duration-500 ${
              isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
            }`}
          >
            {badge}
          </span>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight mt-4 text-balance ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h1>
          <p className={`text-sm font-semibold mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {subtitle}
          </p>

          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
