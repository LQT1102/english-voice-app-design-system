/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useTheme } from '../contexts/ThemeContext';

export default function RegisterPage() {
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
      badge="Auth • Đăng ký"
      title="Tạo tài khoản mới"
      subtitle="Bắt đầu hành trình luyện nói tiếng Anh cùng Echo English ngay hôm nay."
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="reg-name" className={labelClass}>
            Họ và tên
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input id="reg-name" type="text" placeholder="Nguyễn Văn A" className={inputBase} required />
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className={labelClass}>
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input id="reg-email" type="email" placeholder="ban@email.com" className={inputBase} required />
          </div>
        </div>

        <div>
          <label htmlFor="reg-password" className={labelClass}>
            Mật khẩu
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Tối thiểu 8 ký tự"
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

        <label className="flex items-start gap-2 text-xs font-bold cursor-pointer select-none">
          <input type="checkbox" className="w-4 h-4 mt-0.5 rounded accent-indigo-600 cursor-pointer" required />
          <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của Echo English.
          </span>
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          Tạo tài khoản
        </button>
      </form>

      <p className={`text-xs font-bold mt-6 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Đã có tài khoản?{' '}
        <Link to="/login" className="text-indigo-500 hover:text-indigo-600 inline-flex items-center gap-0.5">
          Đăng nhập <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </p>
    </AuthLayout>
  );
}
