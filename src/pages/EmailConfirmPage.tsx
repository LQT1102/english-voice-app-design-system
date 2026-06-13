/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, RefreshCw, ArrowRight, Check, Inbox } from 'lucide-react';

interface EmailConfirmPageProps {
  isDark?: boolean;
}

export default function EmailConfirmPage({ isDark = false }: EmailConfirmPageProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const handleResend = () => {
    if (isResending) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setResendCount((c) => c + 1);
    }, 1800);
  };

  if (confirmed) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 font-sans antialiased transition-colors duration-500 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}>
        <div className={`w-full max-w-sm rounded-3xl border p-8 shadow-sm text-center transition-colors duration-500 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
          <span className="text-[10px] font-mono font-black text-emerald-500 uppercase tracking-widest block mb-2">
            Xác nhận thành công
          </span>
          <h2 className={`text-xl font-black uppercase mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Email đã được xác nhận!
          </h2>
          <p className={`text-xs font-semibold mb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập ngay bây giờ.
          </p>
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm px-4 py-3 rounded-xl active:scale-95 transition-all"
          >
            Đăng Nhập Ngay
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    {
      number: '01',
      title: 'Kiểm tra hộp thư đến',
      desc: 'Mở email từ Echo English với tiêu đề "Xác nhận địa chỉ email của bạn".',
      icon: Inbox,
    },
    {
      number: '02',
      title: 'Nhấn link xác nhận',
      desc: 'Tìm và click nút "Xác Nhận Email" màu xanh trong nội dung email.',
      icon: Mail,
    },
    {
      number: '03',
      title: 'Hoàn tất đăng ký',
      desc: 'Tài khoản được kích hoạt tự động. Đăng nhập để bắt đầu học.',
      icon: Check,
    },
  ];

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
      <div className={`w-full max-w-md rounded-3xl border p-8 shadow-sm transition-colors duration-500 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            isDark ? 'bg-indigo-950/60 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
          }`}>
            <Mail className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-mono font-black text-indigo-500 uppercase tracking-widest block mb-1">
            Kích hoạt tài khoản
          </span>
          <h2 className={`text-xl font-black uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Xác Nhận Email
          </h2>
          <p className={`text-xs mt-2 font-semibold leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Chúng tôi đã gửi email xác nhận đến hộp thư của bạn. Làm theo các bước dưới đây để kích hoạt tài khoản.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors duration-500 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black font-mono ${
                    isDark ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-900/60' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-px h-3 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
                  )}
                </div>
                <div className="pt-1">
                  <h3 className={`text-xs font-black uppercase mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-[11px] font-semibold leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resend + notice */}
        <div className={`p-4 rounded-2xl border mb-5 transition-colors duration-500 ${
          isDark ? 'bg-amber-950/20 border-amber-900/40' : 'bg-amber-50 border-amber-100'
        }`}>
          <p className={`text-[11px] font-semibold leading-relaxed ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            <strong>Lưu ý:</strong> Kiểm tra cả thư mục <strong>Spam / Junk</strong> nếu không thấy email. Link có hiệu lực trong <strong>24 giờ</strong>.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {/* Demo confirm button */}
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-4 py-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Tôi đã xác nhận email (Demo)
          </button>

          {/* Resend */}
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className={`w-full font-black text-sm px-4 py-2.5 rounded-xl border active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer ${
              isDark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
            {isResending
              ? 'Đang gửi lại...'
              : resendCount > 0
              ? `Gửi lại lần ${resendCount + 1}`
              : 'Gửi lại Email Xác Nhận'
            }
          </button>

          <Link
            to="/login"
            className={`w-full flex items-center justify-center gap-1 font-black text-xs transition-colors ${
              isDark ? 'text-slate-500 hover:text-indigo-400' : 'text-slate-400 hover:text-indigo-500'
            }`}
          >
            Quay lại Đăng Nhập
          </Link>
        </div>
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
