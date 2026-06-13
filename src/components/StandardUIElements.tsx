/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AppWindow, 
  Layers, 
  User, 
  ChevronRight, 
  Menu, 
  Bell, 
  Tag, 
  ChevronDown, 
  Check, 
  X, 
  Search, 
  Mail, 
  Lock, 
  Info, 
  Sliders, 
  HelpCircle,
  RefreshCw,
  Plus,
  Play,
  Settings,
  Trash2,
  Database
} from 'lucide-react';

interface ToastType {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  message: string;
}

interface StandardUIElementsProps {
  isDark?: boolean;
}

export default function StandardUIElements({ isDark = false }: StandardUIElementsProps) {
  // Interactive States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const [selectVal, setSelectVal] = useState('B2');
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuOption, setSelectedMenuOption] = useState('Giọng Anh - Mỹ (US)');

  // Dynamic Toast trigger
  const addToast = (type: 'success' | 'info' | 'error' | 'warning', title: string, message: string) => {
    const id = Date.now().toString();
    const newToast: ToastType = { id, type, title, message };
    setToasts(prev => [newToast, ...prev]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerSkeletonReload = () => {
    setIsLoadingSkeleton(true);
    setTimeout(() => {
      setIsLoadingSkeleton(false);
    }, 1800);
  };

  return (
    <div id="standard-components-section" className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-200 text-slate-850 shadow-xs'}`}>
      
      {/* 1. SECTION MAIN HEADER */}
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">09 Core UI Elements Kit</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Hệ Thống Thư Viện Linh Kiện Cơ Bản (Core UI Spec Sheet)</h2>
        </div>
      </div>

      <p className={`text-sm mb-8 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-505'}`}>
        Hệ thống 12 thành tố giao diện cơ bản (Core UI Atoms) thiết lập nền móng cho khung chương trình tiếng Anh Echo. Mỗi bộ phận dưới đây được đặc tả chi tiết về mặt triết lý thiết kế (Mô tả chi tiết) và tích hợp các trạng thái mô phỏng hoạt động trực tiếp (Giao diện thực tế trong code) để đảm bảo tính nhất quán trên mọi điểm chạm.
      </p>

      {/* 2. COMPONENT DETAILS GRID LAYOUT */}
      <div className="space-y-12">
        
        {/* ROW 1: BUTTON & INPUT */}
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          
          {/* 1. BUTTON */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 01 • BUTTON
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Nút bấm hành động (Interactive Buttons)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Bao gồm các cấp độ ưu tiên (Primary, Secondary, Accent, Danger) với font chữ cân xứng. Nút luôn có hiệu ứng mượt mà nhún chạm <span className="font-mono text-[10px]">active:scale-95 duration-200</span> khi tương tác.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[9px] font-mono text-slate-400 block mb-3 font-bold">PREVIEW GIAO DIỆN THỰC TẾ:</span>
              <div className="flex flex-wrap gap-2.5 items-center">
                <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl active:scale-95 transition-all shadow-3xs cursor-pointer">
                  Primary Solid
                </button>
                <button type="button" className={`font-bold text-xs px-3.5 py-2 rounded-xl active:scale-95 transition-all shadow-3xs cursor-pointer border ${
                  isDark ? 'bg-slate-900 border-slate-750 text-slate-300 hover:bg-slate-805 hover:text-white' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-205'
                }`}>
                  Secondary Outline
                </button>
                <button type="button" className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl active:scale-95 transition-all shadow-3xs cursor-pointer">
                  Accent Sky
                </button>
                <button type="button" className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl active:scale-95 transition-all shadow-3xs cursor-pointer">
                  Danger Option
                </button>
                <button type="button" className="bg-indigo-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 opacity-90">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Loading...
                </button>
              </div>
            </div>
          </div>

          {/* 2. INPUT */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 02 • INPUT
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Khung nhập liệu (Stateful Input Fields)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-505'}`}>
                <b>Mô tả:</b> Bo tròn thoải hẹp, tích hợp biểu tượng dẫn đầu hỗ trợ nhận thức và viền bo chuyển sắc khi kích hoạt hoặc rơi vào luồng khai báo có sự cố.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-202'}`}>
              <span className="text-[9px] font-mono text-slate-400 block mb-3 font-bold">PREVIEW GIAO DIỆN THỰC TẾ:</span>
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input 
                    type="text" 
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Tìm kiếm theo chủ đề nói tiếng Anh..." 
                    className={`w-full pl-9 pr-3 py-2 border text-xs rounded-xl focus:outline-none transition-all placeholder-slate-400 font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-750 text-white focus:border-indigo-500' : 'bg-white border-slate-205 text-slate-800 focus:border-indigo-650'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-rose-500">
                        <Mail className="w-3 h-3" />
                      </span>
                      <input 
                        type="email" 
                        defaultValue="student-wrong-email@" 
                        className={`w-full pl-8 pr-2.5 py-1.5 border text-xs text-rose-500 rounded-lg focus:outline-none placeholder-slate-400 font-semibold ${
                          isDark ? 'bg-slate-900 border-rose-900/60' : 'bg-white border-rose-450'
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-3 h-3" />
                      </span>
                      <input 
                        type="password" 
                        disabled 
                        placeholder="••••••••" 
                        className={`w-full pl-8 pr-2.5 py-1.5 border text-xs rounded-lg cursor-not-allowed font-mono ${
                          isDark ? 'bg-slate-900 border-slate-800 text-slate-500 placeholder-slate-600' : 'bg-slate-100 border-slate-200 text-slate-400 placeholder-slate-350'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: LABEL & SELECT */}
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          {/* 3. LABEL */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 03 • LABEL
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Nhãn dán biểu thị (Form Labels & Forums)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Thăng hoa tính kết nối với các nhãn trạng thái kỹ thuật viết in hoa toàn bộ, mang nhịp điệu rẽ nhánh gọn ghẽ trên từng góc dán.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-202'}`}>
              <span className="text-[9px] font-mono text-slate-400 block mb-3 font-bold">PREVIEW GIAO DIỆN THỰC TẾ:</span>
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md border font-mono uppercase transition-colors duration-500 ${
                  isDark ? 'bg-indigo-950/40 text-indigo-400 border-indigo-900/50' : 'bg-indigo-50 text-indigo-705 border-indigo-150'
                }`}>
                  <Tag className="w-3 h-3" /> HIGH ACCURACY
                </span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md border font-mono uppercase transition-colors duration-500 ${
                  isDark ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' : 'bg-emerald-50 text-emerald-805 border-emerald-150'
                }`}>
                  <Check className="w-3 h-3" /> CEFR COMPLIANT
                </span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md border font-mono uppercase transition-colors duration-500 ${
                  isDark ? 'bg-amber-950/40 text-amber-400 border-amber-900/50' : 'bg-amber-50 text-amber-705 border-amber-150'
                }`}>
                  <Info className="w-3 h-3" /> MOCK STATE
                </span>
              </div>
            </div>
          </div>

          {/* 4. SELECT */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 04 • SELECT
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Hộp tùy chọn thả rơi (Dropdown Selector)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Cho phép học viên rẽ lối ngữ cấp một cách nhanh chóng. Chứa icon góc cạnh hỗ trợ nhận diện luồng nạp thông báo.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[9px] font-mono text-slate-400 block mb-3 font-bold">PREVIEW GIAO DIỆN THỰC TẾ:</span>
              <div className="max-w-xs relative">
                <select 
                  value={selectVal}
                  onChange={(e) => {
                    setSelectVal(e.target.value);
                    addToast('info', 'Đã thay đổi cấp độ', `Đã chuyển đổi cấp độ học chuẩn hóa sang khung ${e.target.value}`);
                  }}
                  className={`w-full border text-xs px-3 py-2 rounded-xl focus:outline-none appearance-none font-bold pr-10 shadow-3xs cursor-pointer transition-colors duration-500 ${
                    isDark ? 'bg-slate-900 border-slate-750 text-white focus:border-indigo-500' : 'bg-white border-slate-205 text-slate-800 lg:hover:bg-slate-50'
                  }`}
                >
                  <option value="A1">Starter A1 - Trình độ Sơ Khởi</option>
                  <option value="A2">Elementary A2 - Giao tiếp cơ bản</option>
                  <option value="B2">Upper-Intermediate B2 - Trôi chảy</option>
                  <option value="C1">Advanced C1 - Thuyết trình học thuật</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-450">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: BREADCRUMBS & MENU */}
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          {/* 5. BREADCRUMBS */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 05 • BREADCRUMBS
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Lộ trình bài học phân cấp (Breadcrumbs Path)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Tạo cảm giác định vị không gian bài học học tập rõ rệt, ngăn cách bằng mũi nhọn xám mỏng.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[9px] font-mono text-slate-400 block mb-3 font-bold">PREVIEW GIAO DIỆN THỰC TẾ:</span>
              <div className={`p-3 border rounded-xl shadow-3xs flex items-center flex-wrap gap-1.5 text-[11px] font-extrabold transition-colors duration-500 ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-405' : 'bg-white border-slate-150 text-slate-500'
              }`}>
                <span className="hover:text-indigo-500 transition-colors cursor-pointer uppercase">Trang Chủ</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="hover:text-indigo-500 transition-colors cursor-pointer uppercase">Level B2</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className={`uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>Lesson 08 Airport</span>
              </div>
            </div>
          </div>

          {/* 6. MENU */}
          <div className="space-y-4 font-sans">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 06 • MENU
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Hộp hành động rẽ nhánh (Floating Action Menu)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Cửa sổ thả gối đè nổi, chứa dấu kiểm check xanh lá bộc lộ sự thiết lập tối thượng.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border relative transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[9px] font-mono text-slate-400 block mb-3 font-bold font-sans">PREVIEW GIAO DIỆN THỰC TẾ:</span>
              <div className="relative inline-block text-left font-sans">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`border font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all shadow-3xs cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-750 text-white' : 'bg-white border-slate-205 text-slate-800'
                  }`}
                >
                  <span>{selectedMenuOption}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {isMenuOpen && (
                  <div className={`absolute left-0 mt-1 w-52 rounded-2xl border shadow-md p-1.5 z-25 animate-fade-in transition-colors duration-550 ${
                    isDark ? 'bg-slate-900 border-slate-750' : 'bg-white border-slate-200'
                  }`}>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block px-3 py-1 font-sans">Chọn giọng phát âm:</span>
                    <hr className={`${isDark ? 'border-slate-800' : 'border-slate-100'} my-1`} />
                    {['Giọng Anh - Mỹ (US)', 'Giọng Anh - Anh (UK)'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedMenuOption(opt);
                          setIsMenuOpen(false);
                          addToast('success', 'Đổi giọng chuẩn thành công', `Hệ thống đã chuẩn hóa máy phân tích phát hiện sang chuẩn giọng ${opt}`);
                        }}
                        className={`w-full text-left font-black text-xs px-3 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                          selectedMenuOption === opt 
                            ? isDark ? 'bg-indigo-950/60 text-indigo-400' : 'bg-indigo-50 text-indigo-700' 
                            : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedMenuOption === opt && <Check className="w-3.5 h-3.5 text-indigo-550" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 4: AVATAR & CARD */}
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          {/* 7. AVATAR */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 07 • AVATAR
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Ảnh đại diện cá nhân (User Avatar & Marks)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Đồng bộ vòng màu viền lồi lõm, bám kèm chấm dán xanh thể hiện sự truyền âm micro hoạt động thời gian thực.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[9px] font-mono text-slate-400 block mb-3 font-bold">PREVIEW GIAO DIỆN THỰC TẾ:</span>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-indigo-600 p-0.5 shadow-3xs">
                    <div className={`w-full h-full rounded-full flex items-center justify-center font-black text-xs transition-colors duration-500 ${
                      isDark ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      AM
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full animate-pulse"></span>
                </div>
                <div className="flex -space-x-1.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-500 text-white font-black text-[9px] flex items-center justify-center border-2 border-white dark:border-slate-900">X</div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-[9px] flex items-center justify-center border-2 border-white dark:border-slate-900">Y</div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. CARD */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 08 • CARD
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Khung chứa bento card (Bento Info Cards)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Bo dẹt tối cao, bóng ngầm đổ sắc nét làm nổi bật chủ điểm bài học.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[9px] font-mono text-slate-400 block mb-3 font-bold">PREVIEW GIAO DIỆN THỰC TẾ:</span>
              <div className={`p-4 border shadow-3xs rounded-xl hover:border-indigo-400 hover:shadow-xs transition-with-all duration-300 ${
                isDark ? 'bg-slate-905 border-slate-800' : 'bg-white border-slate-205'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase font-black text-indigo-500 tracking-wider font-mono">SPEAK CHALLENGE #12</span>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border font-mono ${isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>B2 LEVEL</span>
                </div>
                <h4 className={`font-black text-xs uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>Thảo luận vấn đề vĩ mô khoa học</h4>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 5: TOAST ALERT & SKELETON */}
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          {/* 9. TOAST ALERT */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 09 • TOAST
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Hộp thông báo góc màn hình nổi (Floating Toast)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Phút chốc báo động sự liên đới tín mạng từ API máy chủ khi nạp gói dữ liệu.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border min-h-[160px] flex flex-col justify-between transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <div>
                <span className="text-[9px] font-mono text-slate-400 block mb-2 font-bold">KÍCH HOẠT THỬ:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button type="button" onClick={() => addToast('success', 'Chấm điểm đạt', 'Giọng nói phát ra chuẩn xác 94%')} className="bg-emerald-600 text-white font-bold text-[9px] px-2.5 py-1.5 rounded-lg hover:bg-emerald-700 cursor-pointer">
                    Success Demo
                  </button>
                  <button type="button" onClick={() => addToast('error', 'Micro mất tiếng', 'Hãy bật quyền micro lên nhé')} className="bg-rose-600 text-white font-bold text-[9px] px-2.5 py-1.5 rounded-lg hover:bg-rose-700 cursor-pointer">
                    Error Demo
                  </button>
                </div>
              </div>

              {toasts.length > 0 && (
                <div className="mt-3 space-y-1 bg-slate-900/20 p-2 border border-slate-850 rounded-lg">
                  {toasts.map(t => (
                    <div key={t.id} className="p-1.5 text-[10px] flex items-center justify-between text-white bg-slate-905 border border-slate-800 rounded">
                      <div>
                        <strong>{t.title}</strong>
                        <p className="text-[9px] text-slate-400">{t.message}</p>
                      </div>
                      <X className="w-3 h-3 text-slate-400 hover:text-white cursor-pointer" onClick={() => removeToast(t.id)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 10. SKELETON */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 10 • SKELETON
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Liquid Shimmer Skeleton</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Mô phỏng luồng nạp mạng rỗng tuần hoàn khi dữ liệu từ API đang chạy.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border min-h-[160px] flex flex-col justify-between transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-center text-[9px] text-slate-400 mb-2 font-bold select-none">
                <span>SHIMMER GRAPHICS SIM:</span>
                <button type="button" onClick={triggerSkeletonReload} className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[8px] flex items-center gap-1">
                  <RefreshCw className={`w-2.5 h-2.5 ${isLoadingSkeleton ? 'animate-spin' : ''}`} /> Reload
                </button>
              </div>

              {isLoadingSkeleton ? (
                <div className={`p-4 rounded-xl border space-y-2 animate-pulse ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="w-1/3 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="w-2/3 h-4 bg-slate-350 dark:bg-slate-700 rounded"></div>
                </div>
              ) : (
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-205'}`}>
                  <span className="text-[9px] text-emerald-500 font-bold block mb-1">LOADED STATE SUCCESS</span>
                  <h5 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-850'}`}>Hội thoại hoàn thiện!</h5>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ROW 6: MODAL & DRAWER */}
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          {/* 11. MODAL */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 11 • MODAL
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Hộp chặn Modal lớn (Modal Overlays)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Hộp can thiệp chiều sâu thị giác bọc ngoài phông mờ mịt phía sau.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border min-h-[160px] flex flex-col justify-between transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <button type="button" onClick={() => setIsModalOpen(true)} className="bg-indigo-650 text-white font-black text-xs px-4 py-2.5 rounded-xl cursor-pointer">
                Mở Mẫu Thử Hộp Thoại Modal
              </button>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className={`rounded-3xl border max-w-sm w-full overflow-hidden shadow-lg animate-scale-up ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                  <div className="p-4 bg-slate-950 text-white flex items-center justify-between">
                    <span className="font-mono text-[9px] text-indigo-300 font-extrabold">MODAL POPUP ACTIVE</span>
                    <X className="w-4 h-4 cursor-pointer" onClick={() => setIsModalOpen(false)} />
                  </div>
                  <div className="p-5">
                    <h4 className="font-black text-sm uppercase">🎉 Hoành Tráng Đạt Level Mới!</h4>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Bạn đã được mở khóa thêm 4 bài đàm thoại du lịch.</p>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="mt-4 w-full bg-indigo-650 text-white text-xs font-bold py-2 rounded-lg">Đóng Lại</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 12. DRAWER */}
          <div className="space-y-4">
            <div>
              <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded inline-block transition-colors duration-500 ${
                isDark ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400' : 'bg-indigo-50 text-indigo-650'
              }`}>
                Element 12 • DRAWER
              </span>
              <h3 className={`font-extrabold text-sm mt-2 uppercase transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Bảng sườn kéo rút Side Sheet (Drawer)</h3>
              <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <b>Mô tả:</b> Kéo dạt mượt mà từ rìa giúp hiệu chỉnh không làm ngắt quãng trải nghiệm chính.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border min-h-[160px] flex flex-col justify-between transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <button type="button" onClick={() => setIsDrawerOpen(true)} className="bg-slate-900 text-white hover:bg-slate-800 font-black text-xs px-4 py-2.5 rounded-xl cursor-pointer">
                Mở Mẫu Thử Drawer Sườn Phải
              </button>
            </div>

            {isDrawerOpen && (
              <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-45 flex justify-end">
                <div className={`w-72 h-full p-5 shadow-xl flex flex-col justify-between animate-slide-left ${isDark ? 'bg-slate-900 text-white border-l border-slate-800' : 'bg-white text-slate-900 border-l border-slate-200'}`}>
                  <div>
                    <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-800">
                      <span className="font-black text-xs uppercase">Bảng Điều Khiển Lọc Âm</span>
                      <X className="w-4 h-4 cursor-pointer text-slate-400" onClick={() => setIsDrawerOpen(false)} />
                    </div>
                    <label className="text-[10px] font-black text-slate-400 block mb-2 font-mono">Micro thu mặc định:</label>
                    <select className="w-full bg-slate-950 text-xs p-2 rounded-lg border border-slate-800 font-bold select-none text-slate-200">
                      <option>Micro mặc định hệ thống</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => setIsDrawerOpen(false)} className="w-full bg-indigo-650 text-white text-xs font-bold py-2 rounded-lg">Đóng Drawer</button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
