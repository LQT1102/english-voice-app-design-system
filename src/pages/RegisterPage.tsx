/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

interface RegisterPageProps {
  isDark?: boolean;
}

export default function RegisterPage({ isDark = false }: RegisterPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordChecks = [
    { label: 'Ít nhất 8 ký tự', ok: password.length >= 8 },
    { label: 'Có chữ hoa (A-Z)', ok: /[A-Z]/.test(password) },
    { label: 'Có chữ số (0-9)', ok: /[0-9]/.test(password) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (passwordChecks.some((c) => !c.ok)) {
      setError('Mật khẩu chưa đủ yêu cầu bảo mật.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 font-sans antialiased transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}>
        <div className={`w-full max-w-sm rounded-3xl border p-8 shadow-sm text-center transition-colors duration-500 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Check className="w-7 h-7 text-white" strokeWidth={3} />
          </div>
          <h2 className={`text-xl font-black uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Tạo tài khoản thành công!
          </h2>
          <p className={`text-xs font-semibold mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Vui lòng kiểm tra hộp thư email để xác nhận tài khoản trước khi đăng nhập.
          </p>
          <Link
            to="/email-confirm"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm px-4 py-3 rounded-xl active:scale-95 transition-all"
          >
            Xem hướng dẫn xác nhận Email
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
            Tạo tài khoản mới
          </span>
          <h2 className={`text-xl font-black uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Đăng Ký
          </h2>
          <p className={`text-xs mt-1 font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Bắt đầu hành trình luyện nói tiếng Anh cùng AI.
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
          {/* Full Name */}
          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Họ và tên
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className={`w-full pl-10 pr-4 py-2.5 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-400 font-semibold ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                }`}
              />
            </div>
          </div>

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
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Mật Khẩu
            </label>
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

            {/* Password strength checks */}
            {password.length > 0 && (
              <div className="mt-2 space-y-1">
                {passwordChecks.map((check) => (
                  <div key={check.label} className={`flex items-center gap-1.5 text-[10px] font-bold transition-colors ${
                    check.ok ? 'text-emerald-500' : isDark ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                      check.ok ? 'bg-emerald-500 border-emerald-500' : isDark ? 'border-slate-700' : 'border-slate-300'
                    }`}>
                      {check.ok && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
                    </div>
                    {check.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Xác Nhận Mật Khẩu
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-3.5 h-3.5" />
              </span>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••"
                className={`w-full pl-10 pr-10 py-2.5 border text-sm rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-slate-400 font-mono ${
                  confirmPassword.length > 0 && confirmPassword !== password
                    ? isDark ? 'border-rose-700 focus:ring-rose-500/30 bg-slate-950 text-white' : 'border-rose-300 focus:ring-rose-500/30 bg-slate-50 text-slate-800'
                    : confirmPassword.length > 0 && confirmPassword === password
                    ? isDark ? 'border-emerald-700 focus:ring-emerald-500/30 bg-slate-950 text-white' : 'border-emerald-300 focus:ring-emerald-500/30 bg-slate-50 text-slate-800'
                    : isDark ? 'bg-slate-950 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/30' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
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
                Đang tạo tài khoản...
              </>
            ) : (
              <>
                Tạo Tài Khoản
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <p className={`mt-5 text-center text-xs font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-400 transition-colors font-black">
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      {/* Back */}
      <Link
        to="/"
        className="mt-6 text-[11px] font-black text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest font-mono"
      >
        &larr; Quay lại Design System
      </Link>
    </div>
  );
}
