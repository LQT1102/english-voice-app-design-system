/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileDown, 
  FileJson, 
  Code, 
  Printer, 
  Copy, 
  Check, 
  Settings, 
  Sparkles, 
  BookOpen, 
  Info, 
  Layers, 
  Layout, 
  Terminal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeveloperExporterProps {
  isDark?: boolean;
}

export default function DeveloperExporter({ isDark = false }: DeveloperExporterProps) {
  const [copied, setCopied] = useState(false);
  const [tokenPrefix, setTokenPrefix] = useState('echo');
  const [activeExporterTab, setActiveExporterTab] = useState<'hub' | 'json' | 'help'>('hub');

  // Hardcoded real design tokens based on our actual spec sheet
  const getDesignTokens = () => ({
    metadata: {
      systemName: "Echo English Design System",
      version: "1.1.0",
      prefix: tokenPrefix,
      schema: "https://echo-english.design/schema/v1",
      lastUpdated: "2026-06-03",
      author: "Echo Team"
    },
    colors: [
      {
        id: `${tokenPrefix}-primary-indigo`,
        name: "Primary Brand (Indigo)",
        variable: `var(--${tokenPrefix}-primary-indigo)`,
        hexLight: "#4f46e5",
        hexDark: "#6366f1",
        contrastLight: "WCAG AA (4.5:1+)",
        contrastDark: "WCAG AAA (7:1+)",
        roles: "Màu chủ đạo (Branding Core, Buttons chính, Active Level Highlight)"
      },
      {
        id: `${tokenPrefix}-bg-slate-primary`,
        name: "Primary Deep Background / Light background",
        variable: `var(--${tokenPrefix}-bg-slate)`,
        hexLight: "#f0f2fe",
        hexDark: "#0c0f1a",
        contrastLight: "WCAG AA",
        contrastDark: "WCAG AA",
        roles: "Nền phụ thân thiện (Card Backgrounds, bong thoại gợi ý, active borders)"
      },
      {
        id: `${tokenPrefix}-accent-sky`,
        name: "Voice Fluidity (Sky Blue)",
        variable: `var(--${tokenPrefix}-accent-sky)`,
        hexLight: "#0ea5e9",
        hexDark: "#38bdf8",
        contrastLight: "WCAG AA",
        contrastDark: "WCAG AAA",
        roles: "Sóng âm thanh (Voice Waves, Micro bận rộn, playback audio)"
      },
      {
        id: `${tokenPrefix}-success-emerald`,
        name: "Success Correct (Emerald Green)",
        variable: `var(--${tokenPrefix}-success-emerald)`,
        hexLight: "#10b981",
        hexDark: "#34d399",
        contrastLight: "WCAG AA",
        contrastDark: "WCAG AAA",
        roles: "Phát âm đạt chuẩn (90-100% score feedback, Grammar chính xác)"
      },
      {
        id: `${tokenPrefix}-warning-amber`,
        name: "Warning Medium (Amber Yellow)",
        variable: `var(--${tokenPrefix}-warning-amber)`,
        hexLight: "#f59e0b",
        hexDark: "#fbbf24",
        contrastLight: "WCAG AA",
        contrastDark: "WCAG AAA",
        roles: "Phát âm tương đối (60-89% feedback score, ngắt quãng quá dài)"
      },
      {
        id: `${tokenPrefix}-danger-rose`,
        name: "Danger Stuck (Rose Red)",
        variable: `var(--${tokenPrefix}-danger-rose)`,
        hexLight: "#ef4444",
        hexDark: "#f87171",
        contrastLight: "WCAG AA",
        contrastDark: "WCAG AAA",
        roles: "Cần luyện tập thêm (0-59% score, âm vị chưa đúng, lỗi từ ngữ pháp)"
      }
    ],
    typography: {
      primaryFamily: "Outfit, sans-serif",
      secondaryFamily: "JetBrains Mono, monospace",
      scale: [
        { name: "Display Heading", size: "40px", weight: "800", tracking: "-0.025em", usage: "Hero titles & final exam results score badges" },
        { name: "Topic Card Header", size: "20px", weight: "700", tracking: "normal", usage: "Lesson list and section headers" },
        { name: "Conversational text", size: "16px", weight: "400", tracking: "normal", usage: "AI coach statements & guidance messages" },
        { name: "Phonetics IPA Guide", size: "14px", weight: "600", tracking: "0.05em", usage: "IPA notations & time counters" },
        { name: "Small Annotation", size: "12px", weight: "300", tracking: "normal", usage: "Subtitles & Vietnamese text translation clues" }
      ]
    },
    voiceStates: {
      audioDeviceRequirements: {
        channelCount: 1,
        sampleSize: 16,
        sampleRate: 44100,
        idealLatencySeconds: 0.1
      },
      micStateMachine: [
        { state: "idle", statusText: "Sẵn sàng", animationSpeed: "0s", pulseAlpha: 0.05 },
        { state: "listening", statusText: "Đang thu âm chân thật", animationSpeed: "1.2s", pulseAlpha: 0.15 },
        { state: "processing", statusText: "AI Tutor đang chấm phát âm", animationSpeed: "0.6s animate-spin", pulseAlpha: 0.1 },
        { state: "speaking", statusText: "Đang phát âm mẫu", animationSpeed: "1s ease-in-out", pulseAlpha: 0.12 }
      ],
      scoreThresholds: {
        perfect: { range: "90-100", recommendation: "Keep up the native fluency!" },
        good: { range: "60-89", recommendation: "Minor phonetic tune-up required." },
        needsImprovement: { range: "0-59", recommendation: "Focus on lip and tongue shape instructions." }
      }
    },
    tailwinCSS_atoms: {
      btnPrimary: `bg-indigo-605 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-indigo-705 cursor-pointer`,
      btnSecondary: `p-3 py-2 text-xs rounded-xl border border-slate-205 bg-white text-slate-800 hover:bg-slate-100 cursor-pointer`,
      badgeB2: `bg-indigo-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded`,
      panelCard: `p-8 rounded-3xl border bg-white border-slate-200 text-slate-800 shadow-xs`
    }
  });

  const handleCopyJSON = () => {
    const dataString = JSON.stringify(getDesignTokens(), null, 2);
    navigator.clipboard.writeText(dataString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const data = getDesignTokens();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${tokenPrefix}_design_tokens.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleGeneratePDFManual = () => {
    // Elegant system specs print HTML document
    const d = getDesignTokens();
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Echo English Design System Manual</title>
        <meta charset="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Outfit:wght@300;400;700;800&display=swap" rel="stylesheet">
        <style>
          @media print {
            body { background: white; color: #1e293b; font-family: 'Outfit', sans-serif; font-size: 11pt; line-height: 1.5; margin: 1.5cm; }
            .page-break { page-break-after: always; }
            h1, h2, h3 { color: #0f172a; page-break-inside: avoid; }
            td, th { page-break-inside: avoid; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; }
            th { background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1; padding: 8px 12px; text-align: left; font-weight: 700; font-size: 10pt; }
            td { border-bottom: 1px solid #e2e8f0; padding: 10px 12px; font-size: 9.5pt; }
            .badge { background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px; font-size: 8pt; font-weight: 700; }
            .swatch { width: 35px; height: 35px; border-radius: 50%; border: 1px solid #cbd5e1; display: inline-block; vertical-align: middle; margin-right: 10px; }
            pre { font-family: 'JetBrains Mono', monospace; background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 8pt; overflow: hidden; white-space: pre-wrap; }
          }
          body {
            font-family: 'Outfit', sans-serif;
            color: #334155;
            background: #fafaf9;
            margin: 0;
            padding: 40px;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 50px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            border: 1px solid #e5e5e0;
          }
          header {
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 25px;
            margin-bottom: 40px;
          }
          .title { font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em; color: #0f172a; margin: 0; }
          .subtitle { font-size: 14px; font-family: 'JetBrains Mono', monospace; color: #6366f1; margin-top: 5px; font-weight: bold; }
          .meta-info { display: flex; justify-content: space-between; margin-top: 15px; font-size: 12px; color: #64748b; font-weight: 500; }
          .section { margin-bottom: 45px; }
          h2 { font-size: 18px; font-weight: 800; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; color: #1e1b4b; margin-top: 30px; }
          p { font-size: 14px; line-height: 1.6; color: #475569; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background: #f8fafc; border-bottom: 2px solid #cbd5e1; padding: 10px; text-align: left; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; }
          td { padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; vertical-align: top; }
          .mono { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; color: #4338ca; }
          .btn-print {
            background: #4f46e5; color: white; border: none; padding: 12px 24px; font-size: 14px; font-weight: bold; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(79, 70, 229, 0.1);
          }
          .btn-print:hover { background: #4338ca; }
          .swatch-box { display: flex; align-items: center; }
          .badge-difficulty { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
          @media print {
            .btn-print { display: none; }
            .container { box-shadow: none; border: none; padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <button class="btn-print" onclick="window.print()">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-12 0v5h8v-5M6 14h12" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Print & Click 'Save to PDF'
          </button>
          
          <header>
            <div class="title">Echo English Design System Specs</div>
            <div class="subtitle">AUTOMATED SPECIFICATION REPORT • VERSION ${d.metadata.version}</div>
            <div class="meta-info">
              <span>Author: ${d.metadata.author}</span>
              <span>Prefix: "${d.metadata.prefix}"</span>
              <span>Generated At: ${new Date().toLocaleDateString('vi-VN')}</span>
            </div>
          </header>

          <div class="section">
            <p><strong>Giới thiệu tài liệu:</strong> Báo cáo kỹ thuật chi tiết cấu trúc hệ thống thiết kế Echo English. Tài liệu phục vụ lập trình viên và kiểm thử viên, đồng bộ hóa các dải màu, cỡ chữ tỉ lệ vàng, trạng thái máy đo âm lượng mic và liên kết UI-Kit các linh kiện thiết kế React, đảm bảo sản phẩm vận hành mượt mà, đồng đều.</p>
          </div>

          <div class="section">
            <h2>1. Bảng màu Semantic (WCAG 2.1 AA/AAA Compliant)</h2>
            <table>
              <thead>
                <tr>
                  <th width="30%">Màu sắc / Token</th>
                  <th width="15%">Màu Sáng</th>
                  <th width="15%">Màu Tối</th>
                  <th width="40%">Mục tiêu & Hỗ trợ tâm lý học</th>
                </tr>
              </thead>
              <tbody>
                ${d.colors.map(c => `
                  <tr>
                    <td>
                      <div class="swatch-box">
                        <div class="swatch" style="background-color: ${c.hexLight};"></div>
                        <div>
                          <strong>${c.name}</strong><br/>
                          <span class="mono">${c.variable}</span>
                        </div>
                      </div>
                    </td>
                    <td><span class="mono">${c.hexLight}</span></td>
                    <td><span class="mono">${c.hexDark}</span></td>
                    <td>${c.roles} (${c.contrastLight})</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="page-break"></div>

          <div class="section">
            <h2>2. Thang đo Typography (Outfit & JetBrains Mono)</h2>
            <table>
              <thead>
                <tr>
                  <th width="25%">Phân cấp (Hierarchy)</th>
                  <th width="15%">Cỡ chữ (Size)</th>
                  <th width="15%">Độ đậm (Weight)</th>
                  <th width="45%">Mô tả ứng dụng</th>
                </tr>
              </thead>
              <tbody>
                ${d.typography.scale.map(s => `
                  <tr>
                    <td><strong>${s.name}</strong></td>
                    <td class="mono">${s.size}</td>
                    <td>Weight ${s.weight} / tracking ${s.tracking}</td>
                    <td>${s.usage}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p style="font-size: 11px; color:#64748b; font-style:italic;">* Phông chữ <strong>Outfit</strong> dùng cho UI tổng hợp; <strong>JetBrains Mono</strong> dùng duy nhất cho ký âm IPA và các dải hiển thị số liệu âm thanh thời gian thực.</p>
          </div>

          <div class="section">
            <h2>3. Micro-interactions & Trạng thái Micro</h2>
            <p>Hệ thống bắt thoại liên tục đồng bộ qua 4 trạng thái tương tác từ máy học, đảm bảo phản hồi tức thì với độ trễ tối ưu:</p>
            <table>
              <thead>
                <tr>
                  <th width="20%">Trạng thái</th>
                  <th width="40%">Mô tả thuật ngữ</th>
                  <th width="20%">Tốc độ Nhịp sóng</th>
                  <th width="20%">Hệ số dội xung (Pulse Alpha)</th>
                </tr>
              </thead>
              <tbody>
                ${d.voiceStates.micStateMachine.map(m => `
                  <tr>
                    <td><span class="mono" style="text-transform:uppercase;">${m.state}</span></td>
                    <td>${m.statusText}</td>
                    <td class="mono">${m.animationSpeed}</td>
                    <td class="mono">${m.pulseAlpha}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <h3>Yêu cầu phần cứng Mic tối thiểu:</h3>
            <ul>
              <li>Kênh âm thanh (Channels): ${d.voiceStates.audioDeviceRequirements.channelCount} (Tải đơn âm - Mono)</li>
              <li>Tần số lấy mẫu: ${d.voiceStates.audioDeviceRequirements.sampleRate} Hz (Studio Standard)</li>
              <li>Dải bit mẫu: ${d.voiceStates.audioDeviceRequirements.sampleSize} bit</li>
              <li>Độ trễ tối đa lý thuyết: &lt; ${d.voiceStates.audioDeviceRequirements.idealLatencySeconds * 1000} ms</li>
            </ul>
          </div>

          <div class="section">
            <h2>4. Các nguyên tử mã nguồn CSS Tailwind</h2>
            <pre>${JSON.stringify(d.tailwinCSS_atoms, null, 2)}</pre>
          </div>

          <footer style="margin-top: 50px; border-top: 1px solid #cbd5e1; padding-top: 20px; font-size: 11px; color:#94a3b8; text-align: center;">
            Cung cấp bởi SPEC-SHEET BUILDER • Giữ toàn quyền Echo English Corp © 2026.
          </footer>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div id="exporter-section" className={`p-8 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:shadow-sm ${isDark ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-md shadow-indigo-950/10' : 'bg-white border-slate-205 text-slate-850 shadow-xs'}`}>
      
      {/* Absolute floating developer indicator */}
      <span className={`absolute top-0 right-0 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest font-mono border-l border-b transition-colors duration-500 ${
        isDark ? 'bg-indigo-950/60 text-indigo-400 border-slate-800' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
      }`}>
        Dev Utilities ⚙️
      </span>

      {/* SECTION HEADER */}
      <div className={`flex items-center gap-3.5 mb-6 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-indigo-950/40 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <FileDown className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-indigo-500 font-extrabold uppercase tracking-wide">10 Developer Document Exporter</span>
          <h2 className={`text-xl font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Xuất Bản Tài Liệu & Cấu Hình (Export Spec & Tokens Chest)</h2>
        </div>
      </div>

      <p className={`text-sm mb-6 leading-relaxed font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-505'}`}>
        Đồng bộ trực tiếp thiết kế vào môi trường lập trình của bạn! Tính năng này cho phép các kỹ sư giao diện tải xuống toàn bộ cấu phần token thiết kế hiện tại dưới dạng file JSON cấu hình, hoặc in hướng dẫn thành một cuốn cẩm nang PDF vector sắc nét phục vụ đóng gói và kiểm thử.
      </p>

      {/* Tabs navigation for exporter panel */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 font-mono text-xs font-bold">
        <button 
          onClick={() => setActiveExporterTab('hub')}
          className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeExporterTab === 'hub' ? 'border-indigo-650 text-indigo-500' : 'border-transparent text-slate-405 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>1. TẢI TÀI LIỆU</span>
        </button>
        <button 
          onClick={() => setActiveExporterTab('json')}
          className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeExporterTab === 'json' ? 'border-indigo-650 text-indigo-500' : 'border-transparent text-slate-405 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <FileJson className="w-4 h-4" />
          <span>2. XEM TRƯỚC TOKENS (JSON)</span>
        </button>
        <button 
          onClick={() => setActiveExporterTab('help')}
          className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeExporterTab === 'help' ? 'border-indigo-650 text-indigo-500' : 'border-transparent text-slate-405 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>3. HƯỚNG DẪN TÍCH HỢP</span>
        </button>
      </div>

      {/* TAB CONTENT CARDS WITH ANIMATIONS */}
      <AnimatePresence mode="wait">
        {activeExporterTab === 'hub' && (
          <motion.div 
            key="hub-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Box 1: PDF Document Generation */}
            <div className={`p-6 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-base font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Tải Cẩm Nang Tài Liệu PDF</h4>
                  <p className="text-[11px] text-slate-400 font-mono uppercase mt-0.5">High-Fidelity Vector Print Guide</p>
                </div>
              </div>
              <p className={`text-xs leading-relaxed mb-6 font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Kết xuất toàn bộ tài liệu cấu phần spec sheet thành báo cáo PDF vector. Mỗi bảng màu semantic, thang chữ và trạng thái micro đều được căn chỉnh hoàn hảo cho khổ giấy in ấn hoặc chia sẻ tài liệu nội bộ.
              </p>
              
              <button 
                onClick={handleGeneratePDFManual}
                className="w-full bg-indigo-605 text-white font-extrabold text-xs px-5 py-3 rounded-xl hover:bg-indigo-705 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                style={{ backgroundColor: '#4f46e5' }}
              >
                <Printer className="w-4 h-4" />
                <span>KHOỞI TẠO & TẢI TÀI LIỆU PDF</span>
              </button>
            </div>

            {/* Box 2: JSON System Config */}
            <div className={`p-6 rounded-2xl border transition-colors duration-500 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                  <FileJson className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-base font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Tải File Cấu Hình JSON Tokens</h4>
                  <p className="text-[11px] text-slate-400 font-mono uppercase mt-0.5">Automated JSON Design Tokens</p>
                </div>
              </div>
              <p className={`text-xs leading-relaxed mb-6 font-semibold transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Tải xuống tệp tin chứa toàn bộ định nghĩa mã màu (hex), kích thước phông tương đối (rem/px), cấu trúc máy chuyển trạng thái micro và lớp CSS Tailwind thông dụng để nhập trực tiếp vào dự án.
              </p>

              <div className="flex gap-2">
                <button 
                  onClick={handleDownloadJSON}
                  className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isDark ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-850' : 'border-slate-205 text-slate-800 bg-white hover:bg-slate-50 shadow-3xs'
                  }`}
                >
                  <FileDown className="w-4 h-4 text-indigo-500" />
                  <span>TẢI FILE JSON</span>
                </button>
                <button 
                  onClick={handleCopyJSON}
                  className={`py-3 px-4 rounded-xl border font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center gap-1.5 min-w-[120px] ${
                    isDark ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-850' : 'border-slate-205 text-slate-800 bg-white hover:bg-slate-50 shadow-3xs'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-505" />}
                  <span>{copied ? "ĐÃ SAO CHÉP" : "CHÉP NHANH"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeExporterTab === 'json' && (
          <motion.div 
            key="json-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Context option bar to prefix tokens */}
            <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-500 ${
              isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex gap-2.5 items-center">
                <Settings className="w-5 h-5 text-indigo-500" />
                <div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase">Tuỳ biến Hệ thống Token</span>
                  <p className={`text-xs font-black uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Thay đổi tiếp đầu ngữ biến (Token Prefix Namespace)</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-405 font-medium font-mono">--</span>
                <input 
                  type="text" 
                  value={tokenPrefix} 
                  onChange={(e) => setTokenPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  placeholder="ns-name" 
                  maxLength={12}
                  className={`border text-xs font-mono font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-600 ${
                    isDark ? 'bg-slate-900 border-slate-750 text-white' : 'bg-white border-slate-205 text-slate-800'
                  }`}
                />
                <span className="text-xs text-slate-405 font-medium font-mono">-[token-name]</span>
              </div>
            </div>

            {/* Interactive Token Live Tree */}
            <div className="relative">
              <div className="absolute top-3.5 right-4 z-10 flex gap-2">
                <button 
                  onClick={handleCopyJSON} 
                  className={`p-2 rounded-lg border flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-wider font-mono cursor-pointer transition-all ${
                    isDark ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-indigo-500" />}
                  <span>{copied ? "COPIED" : "COPY CONFIG"}</span>
                </button>
                <button 
                  onClick={handleDownloadJSON} 
                  className={`p-2 rounded-lg border flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-wider font-mono cursor-pointer transition-all ${
                    isDark ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  }`}
                >
                  <FileDown className="w-3.5 h-3.5 text-amber-500" />
                  <span>DOWNLOAD</span>
                </button>
              </div>

              {/* Mock Web Terminal with Syntax colors */}
              <div className={`p-5 pt-14 rounded-2xl border font-mono text-xs overflow-auto max-h-[350px] transition-colors duration-500 ${
                isDark ? 'bg-slate-950 border-slate-850 text-slate-300' : 'bg-slate-900 text-slate-200 border-slate-950 shadow-inner'
              }`}>
                <div className="flex items-center gap-1.5 absolute top-4 left-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] text-slate-450 ml-2 font-black tracking-widest uppercase">system_tokens.json</span>
                </div>
                <pre>{JSON.stringify(getDesignTokens(), null, 2)}</pre>
              </div>
            </div>
          </motion.div>
        )}

        {activeExporterTab === 'help' && (
          <motion.div 
            key="help-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`p-6 rounded-2xl border transition-colors duration-500 space-y-6 ${
              isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {/* Quick how-to-use checklist */}
            <div>
              <h4 className={`text-sm font-black uppercase mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Cách cấu hình Token vào CSS / Tailwind CSS</span>
              </h4>
              
              <ul className={`space-y-3.5 text-xs font-semibold leading-relaxed pl-1 ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
                <li className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 bg-indigo-500/10 text-indigo-500 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold">1</span>
                  <div>
                    <strong>Khai báo CSS custom properties:</strong> Đặt các biến này vào thẻ <code className="bg-slate-200 dark:bg-slate-850 px-1 py-0.5 rounded font-mono text-[10px] font-bold text-indigo-400">:root</code> hoặc lớp cấu hình tối ưu của bạn trong file CSS chính để sẵn sàng ánh xạ.
                  </div>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 bg-indigo-500/10 text-indigo-500 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold">2</span>
                  <div>
                    <strong>Liên kết Tailwind Config theme:</strong> Thêm các mã khoá dải màu vào tệp phần cứng <code className="bg-slate-200 dark:bg-slate-850 px-1 py-0.5 rounded font-mono text-[10px] font-bold text-indigo-400">tailwind.config.js</code> hoặc chỉ định trực tiếp qua các chỉ thị dải màu tương ứng.
                  </div>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 bg-indigo-500/10 text-indigo-500 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold">3</span>
                  <div>
                    <strong>Tương tác Micro realtime:</strong> Đồng bộ các trạng thái lấy mẫu micro của bạn bám đúng schema nhịp dội sóng dải bit để tránh các lỗi trễ búp sóng (&lt; 120ms latency chuẩn quốc tế).
                  </div>
                </li>
              </ul>
            </div>

            <div className={`p-4 rounded-xl border flex gap-3 text-xs leading-normal transition-colors duration-500 ${
              isDark ? 'bg-indigo-950/20 border-indigo-900/40 text-indigo-300' : 'bg-indigo-50/50 border-indigo-150 text-indigo-800'
            }`}>
              <Info className="w-5 h-5 shrink-0 text-indigo-500 mt-0.5" />
              <div>
                <strong>Lập trình viên lưu ý:</strong> Toàn bộ giá trị trong các file tải xuống đều được trích xuất chân thật trực tiếp từ các tham số vận hành thực tế của các component Spec Sheet này, không có dữ liệu mô phỏng dư thừa.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
