/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

interface LoginPageProps {
  isDark?: boolean;
}

export default function LoginPage({ isDark = false }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setError('Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
    }, 1500);
  };

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
            Xác thực tài khoản
          </span>
          <h2 className={`text-xl font-black uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Đăng Nhập
          </h2>
          <p className={`text-xs mt-1 font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Tiếp tục hành trình luyện nói tiếng Anh của bạn.
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
          {/* Email */}
          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Email
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

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={`text-[10px] font-black uppercase tracking-widest font-mono ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Mật Khẩu
              </label>
              <Link
                to="/forgot-password"
                className="text-[10px] font-black text-indigo-500 hover:text-indigo-400 transition-colors uppercase tracking-wide"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-3.5 h-3.5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className={`w-full pl-10 pr-10 py-2.5 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-400 font-mono ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-black text-sm px-4 py-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang xác thực...
              </>
            ) : (
              <>
                Đăng Nhập
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className={`flex items-center gap-3 my-5 ${isDark ? 'text-slate-700' : 'text-slate-200'}`}>
          <div className="flex-1 h-px bg-current" />
          <span className={`text-[10px] font-black font-mono uppercase ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            Chưa có tài khoản?
          </span>
          <div className="flex-1 h-px bg-current" />
        </div>

        {/* Register link */}
        <Link
          to="/register"
          className={`w-full flex items-center justify-center gap-2 font-black text-sm px-4 py-2.5 rounded-xl border active:scale-95 transition-all ${
            isDark
              ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Tạo tài khoản mới
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
