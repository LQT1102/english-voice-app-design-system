/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutGrid,
  LogIn,
  UserPlus,
  KeyRound,
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
  Radio,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavLink {
  to: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navLinks: NavLink[] = [
  {
    to: '/',
    label: 'Design System',
    description: 'Bản đặc tả components Bento Spec Sheet',
    icon: LayoutGrid,
  },
  {
    to: '/live',
    label: 'Phòng luyện nói',
    description: 'Giao diện Live Voice Sandbox thời gian thực',
    icon: Radio,
  },
  {
    to: '/login',
    label: 'Đăng nhập',
    description: 'Trang đăng nhập tài khoản học viên',
    icon: LogIn,
  },
  {
    to: '/register',
    label: 'Đăng ký',
    description: 'Tạo tài khoản Echo English mới',
    icon: UserPlus,
  },
  {
    to: '/forgot-password',
    label: 'Quên mật khẩu',
    description: 'Khôi phục và đặt lại mật khẩu',
    icon: KeyRound,
  },
];

export default function AppMenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleDark } = useTheme();
  const location = useLocation();

  // Close drawer whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // The live room has its own header navigation, so hide the global menu there
  if (location.pathname === '/live') return null;

  return (
    <>
      {/* Floating menu button */}
      <button
        type="button"
        aria-label="Mở menu điều hướng"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 left-4 z-40 flex items-center gap-2 font-black text-xs px-4 py-2.5 rounded-xl border shadow-md active:scale-95 transition-all cursor-pointer ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800'
            : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'
        }`}
      >
        <Menu className="w-4 h-4 text-indigo-500" />
        <span className="hidden sm:inline uppercase tracking-wide">Menu</span>
      </button>

      {/* Overlay */}
      <div
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
        className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] border-r shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}
      >
        {/* Drawer header */}
        <div
          className={`flex items-center justify-between gap-4 p-5 border-b ${
            isDark ? 'border-slate-800' : 'border-slate-150'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 font-black text-xl flex items-center justify-center rounded-2xl ${
                isDark ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
              }`}
            >
              E
            </div>
            <div>
              <h2 className={`text-sm font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Echo English
              </h2>
              <p className="text-[10px] text-slate-400 font-mono">navigation.menu</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={() => setIsOpen(false)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl border active:scale-95 transition-all cursor-pointer ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto custom-scroll p-3 space-y-1.5">
          <span className="text-[10px] font-black text-slate-400 font-mono tracking-widest uppercase block px-3 pt-2 pb-1">
            Các trang
          </span>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`group w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-indigo-950/50 border-indigo-900/60 text-indigo-300'
                      : 'bg-indigo-50 border-indigo-150 text-indigo-700'
                    : isDark
                      ? 'bg-transparent border-transparent text-slate-300 hover:bg-slate-800'
                      : 'bg-transparent border-transparent text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${
                    isActive
                      ? isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'
                      : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-black truncate">{link.label}</span>
                  <span className="block text-[11px] font-semibold text-slate-400 truncate">
                    {link.description}
                  </span>
                </span>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                    isActive ? 'text-indigo-500' : 'text-slate-300'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className={`p-4 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-150'}`}>
          <button
            type="button"
            onClick={toggleDark}
            className={`w-full flex items-center justify-between gap-2 px-3.5 py-3 rounded-2xl border font-black text-xs active:scale-95 transition-all cursor-pointer ${
              isDark
                ? 'bg-amber-500 border-amber-600 text-slate-950 hover:bg-amber-400'
                : 'bg-slate-900 border-slate-850 text-white hover:bg-slate-800'
            }`}
          >
            <span className="flex items-center gap-2 uppercase tracking-wide">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDark ? 'Giao diện sáng' : 'Giao diện tối'}
            </span>
          </button>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 px-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Echo English Design System · v1.1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}
