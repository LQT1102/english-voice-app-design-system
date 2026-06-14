/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useTheme } from '../contexts/ThemeContext';

export default function ForgotPasswordPage() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);

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
      badge="Auth • Khôi phục"
      title="Quên mật khẩu?"
      subtitle="Nhập email đã đăng ký, chúng tôi sẽ gửi cho bạn liên kết đặt lại mật khẩu."
    >
      {submitted ? (
        <div
          className={`rounded-2xl border p-5 flex items-start gap-3 ${
            isDark ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-300' : 'bg-emerald-50 border-emerald-150 text-emerald-800'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
          <div>
            <p className="text-sm font-black">Đã gửi liên kết khôi phục!</p>
            <p className="text-xs font-semibold mt-1 leading-relaxed">
              Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
            </p>
          </div>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <label htmlFor="fp-email" className={labelClass}>
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input id="fp-email" type="email" placeholder="ban@email.com" className={inputBase} required />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Gửi liên kết khôi phục
          </button>
        </form>
      )}

      <Link
        to="/login"
        className={`text-xs font-black mt-6 inline-flex items-center gap-1.5 transition-colors ${
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại đăng nhập
      </Link>
    </AuthLayout>
  );
}
