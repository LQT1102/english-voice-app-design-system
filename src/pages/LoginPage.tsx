/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useTheme } from '../contexts/ThemeContext';

export default function LoginPage() {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const inputBase = `w-full pl-10 pr-3 py-2.5 border text-sm rounded-xl focus:outline-none transition-all placeholder-slate-400 font-semibold ${
    isDark
      ? 'bg-slate-950 border-slate-750 text-white focus:border-indigo-500'
      : 'bg-white border-slate-205 text-slate-800 focus:border-indigo-650'
  }`;
  const labelClass = `block text-[11px] font-black uppercase tracking-wide mb-1.5 ${
    isDark ? 'text-slate-300' : 'text-slate-700'
  }`;

  return (
    <AuthLayout
      badge="Auth • Đăng nhập"
      title="Chào mừng trở lại"
      subtitle="Đăng nhập để tiếp tục lộ trình luyện nói tiếng Anh của bạn."
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="login-email" className={labelClass}>
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input id="login-email" type="email" placeholder="ban@email.com" className={inputBase} required />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className={labelClass.replace('mb-1.5', '')}>
              Mật khẩu
            </label>
            <Link
              to="/forgot-password"
              className="text-[11px] font-black text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`${inputBase} pr-10`}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer select-none">
          <input type="checkbox" className="w-4 h-4 rounded accent-indigo-600 cursor-pointer" />
          <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Ghi nhớ đăng nhập</span>
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        >
          <LogIn className="w-4 h-4" />
          Đăng nhập
        </button>
      </form>

      <p className={`text-xs font-bold mt-6 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-indigo-500 hover:text-indigo-600 inline-flex items-center gap-0.5">
          Đăng ký ngay <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </p>
    </AuthLayout>
  );
}
