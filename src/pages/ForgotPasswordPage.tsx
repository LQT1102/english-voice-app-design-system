/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, Send } from 'lucide-react';

interface ForgotPasswordPageProps {
  isDark?: boolean;
}

export default function ForgotPasswordPage({ isDark = false }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Địa chỉ email không hợp lệ.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 font-sans antialiased transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}>
        <div className={`w-full max-w-sm rounded-3xl border p-8 shadow-sm text-center transition-colors duration-500 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>

          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
            isDark ? 'bg-indigo-950/60 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
          }`}>
            <Send className="w-7 h-7" />
          </div>

          <span className="text-[10px] font-mono font-black text-indigo-500 uppercase tracking-widest block mb-2">
            Email đã được gửi
          </span>
          <h2 className={`text-xl font-black uppercase mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Kiểm Tra Hộp Thư
          </h2>
          <p className={`text-xs font-semibold mb-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Chúng tôi đã gửi link đặt lại mật khẩu đến:
          </p>
          <p className="text-sm font-black text-indigo-500 mb-5 break-all">{email}</p>
          <p className={`text-[11px] font-semibold mb-6 leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Link có hiệu lực trong <strong className={isDark ? 'text-slate-300' : 'text-slate-600'}>15 phút</strong>. Hãy kiểm tra cả thư mục spam nếu không tìm thấy.
          </p>

          <Link
            to="/email-confirm"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm px-4 py-3 rounded-xl active:scale-95 transition-all mb-3"
          >
            Hướng dẫn xác nhận Email
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setSent(false)}
            className={`w-full font-black text-xs px-4 py-2.5 rounded-xl border active:scale-95 transition-all ${
              isDark
                ? 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            Gửi lại với email khác
          </button>
        </div>

        <Link
          to="/login"
          className="mt-6 text-[11px] font-black text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-mono flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Quay lại Đăng Nhập
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 font-sans antialiased transition-colors duration-500 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>

      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className={`w-14 h-14 font-black text-3xl flex items-center justify-center rounded-2xl shadow-md ${
          isDark ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
        }`}>
          E
        </div>
        <div className="text-center">
          <h1 className={`text-2xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Echo English
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">voice-ai.learn.speak</p>
        </div>
      </div>

      {/* Card */}
      <div className={`w-full max-w-sm rounded-3xl border p-8 shadow-sm transition-colors duration-500 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[10px] font-mono font-black text-indigo-500 uppercase tracking-widest block mb-1">
            Khôi phục truy cập
          </span>
          <h2 className={`text-xl font-black uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Quên Mật Khẩu
          </h2>
          <p className={`text-xs mt-1 font-semibold leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu cho bạn.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className={`mb-4 px-4 py-3 rounded-xl border text-xs font-bold ${
            isDark
              ? 'bg-rose-950/40 border-rose-900/60 text-rose-400'
              : 'bg-rose-50 border-rose-200 text-rose-600'
          }`}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Địa chỉ Email đã đăng ký
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className={`w-full pl-10 pr-4 py-2.5 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-400 font-semibold ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-black text-sm px-4 py-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang gửi email...
              </>
            ) : (
              <>
                Gửi Link Đặt Lại Mật Khẩu
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to login */}
        <Link
          to="/login"
          className={`mt-5 w-full flex items-center justify-center gap-2 font-black text-xs px-4 py-2.5 rounded-xl border active:scale-95 transition-all ${
            isDark
              ? 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
              : 'border-slate-200 text-slate-500 hover:bg-slate-50'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Quay lại Đăng Nhập
        </Link>
      </div>

      {/* Back to design system */}
      <Link
        to="/"
        className="mt-6 text-[11px] font-black text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-mono"
      >
        &larr; Quay lại Design System
      </Link>
    </div>
  );
}
