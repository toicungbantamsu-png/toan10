import React, { useState } from "react";
import { HelpCircle, RefreshCw, BarChart3, TrendingUp } from "lucide-react";

export default function StatsVisualizer() {
  const [inputText, setInputText] = useState("58, 74, 92, 81, 97, 88, 75, 69, 87, 69, 75, 77");

  // Load presets from textbook pages
  const loadPreset1 = () => {
    // Page 80: Điểm của 12 thí sinh thi nhảy cao
    setInputText("58, 74, 92, 81, 97, 88, 75, 69, 87, 69, 75, 77");
  };

  const loadPreset2 = () => {
    // Page 84: Điểm trung bình của bạn An
    setInputText("9.2, 8.7, 9.5, 6.8, 8.0, 8.0, 7.3, 6.5");
  };

  const loadPreset3 = () => {
    // Page 86: Ngày tiêu thụ calo
    setInputText("43, 45, 46, 41, 40");
  };

  const loadPreset4 = () => {
    // Custom list with a clear outlier to show box plot outliers detection
    setInputText("42, 45, 48, 51, 46, 12, 49, 44, 98, 47");
  };

  // Math Statistics Solver
  const parseNumbers = (text: string): number[] => {
    return text
      .split(",")
      .map((x) => parseFloat(x))
      .filter((x) => !isNaN(x));
  };

  const rawData = parseNumbers(inputText);
  const n = rawData.length;

  // Sorting for median & quartiles
  const sorted = [...rawData].sort((a, b) => a - b);

  // Mean (Số trung bình)
  const mean = n > 0 ? sorted.reduce((sum, item) => sum + item, 0) / n : 0;

  // Helper for median calculation of any array
  const calculateMedian = (arr: number[]): number => {
    const len = arr.length;
    if (len === 0) return 0;
    const mid = Math.floor(len / 2);
    if (len % 2 !== 0) {
      return arr[mid];
    } else {
      return (arr[mid - 1] + arr[mid]) / 2;
    }
  };

  // Median (Trung vị) = Q2
  const median = calculateMedian(sorted);

  // Quartiles Q1 and Q3 according to Vietnamese Sách Giáo Khoa Math 10:
  // Split into low half and upper half.
  // If n is odd: exclude the median itself.
  // If n is even: split equally.
  let q1 = 0;
  let q3 = 0;

  if (n > 0) {
    const mid = Math.floor(n / 2);
    let lowHalf: number[] = [];
    let upHalf: number[] = [];

    if (n % 2 !== 0) {
      lowHalf = sorted.slice(0, mid);
      upHalf = sorted.slice(mid + 1);
    } else {
      lowHalf = sorted.slice(0, mid);
      upHalf = sorted.slice(mid);
    }

    q1 = calculateMedian(lowHalf);
    q3 = calculateMedian(upHalf);
  }

  const iqr = q3 - q1; // Khoảng tứ phân vị

  // Mode (Mốt)
  const getModes = (arr: number[]): { modes: number[]; maxFreq: number } => {
    const freqs: Record<number, number> = {};
    let maxFreq = 0;
    arr.forEach((num) => {
      freqs[num] = (freqs[num] || 0) + 1;
      if (freqs[num] > maxFreq) {
        maxFreq = freqs[num];
      }
    });

    const modes: number[] = [];
    if (maxFreq > 1) {
      Object.keys(freqs).forEach((key) => {
        const num = parseFloat(key);
        if (freqs[num] === maxFreq) {
          modes.push(num);
        }
      });
    }
    return { modes, maxFreq };
  };

  const { modes, maxFreq } = getModes(sorted);

  // Range (Khoảng biến thiên)
  const minVal = n > 0 ? sorted[0] : 0;
  const maxVal = n > 0 ? sorted[n - 1] : 0;
  const range = maxVal - minVal;

  // Variance (Phương sai) s^2 & Standard Deviation (Độ lệch chuẩn) s
  // SGK uses division by n: s^2 = Σ(xi - x_bar)^2 / n
  const variance = n > 0 
    ? sorted.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / n 
    : 0;
  const stdDev = Math.sqrt(variance);

  // Outliers Detection (Giá trị bất thường):
  // x < Q1 - 1.5*IQR or x > Q3 + 1.5*IQR
  const lowerBoundary = q1 - 1.5 * iqr;
  const upperBoundary = q3 + 1.5 * iqr;
  const outliers = sorted.filter((x) => x < lowerBoundary || x > upperBoundary);
  const cleanData = sorted.filter((x) => x >= lowerBoundary && x <= upperBoundary);

  // Box Plot Draw parameters
  // Whiskers endpoints
  const boxMin = cleanData.length > 0 ? cleanData[0] : minVal;
  const boxMax = cleanData.length > 0 ? cleanData[cleanData.length - 1] : maxVal;

  // Mapping domain to SVG pixels
  const leftMargin = 30;
  const rightMargin = 30;
  const plotWidth = 320;
  const totalWidth = 380;
  const totalHeight = 110;

  const normalize = (val: number) => {
    if (maxVal === minVal) return 0.5;
    return (val - minVal) / (maxVal - minVal);
  };

  const svgX = (val: number) => {
    const norm = normalize(val);
    return leftMargin + norm * plotWidth;
  };

  return (
    <div className="bg-slate-50 border border-slate-100 mb-6 rounded-2xl p-6 shadow-sm">
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <h3 className="font-sans text-lg font-bold text-slate-800 flex items-center gap-1.5">
          <BarChart3 className="text-teal-650 w-5 h-5" />
          Chương V: Thực hành Thống kê &amp; Nhận diện Số liệu Bất thường
        </h3>
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={loadPreset1} className="rounded-lg bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-600 transition hover:bg-teal-100 cursor-pointer">
            Trang 80: Nhảy cao
          </button>
          <button onClick={loadPreset2} className="rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600 transition hover:bg-indigo-100 cursor-pointer">
            Trang 84: Điểm của An
          </button>
          <button onClick={loadPreset3} className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 transition hover:bg-slate-200 cursor-pointer">
            Trang 86: Calo ngày
          </button>
          <button onClick={loadPreset4} className="rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-600 transition hover:bg-rose-100 cursor-pointer">
            Có số bất thường
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input & Form */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Nhập mẫu số liệu (Ngăn cách bằng dấu phẩy)
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={3}
              style={{ resize: "none" }}
              className="w-full rounded-xl border border-slate-250 p-2 text-sm text-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-mono outline-none bg-white shadow-sm"
            />
            <span className="text-[10px] text-slate-400 font-sans block mt-1 leading-tight">
              <b>Dữ liệu đã sắp xếp:</b> {n > 0 ? sorted.join(", ") : "Chưa có dữ liệu"}
            </span>
          </div>

          {/* Quick Metrics output cards */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-[10px] text-slate-400 block font-sans">Kích thước mẫu (n):</span>
              <span className="font-mono text-base font-bold text-slate-800">{n}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-[10px] text-slate-400 block font-sans">Số trung bình (x̄):</span>
              <span className="font-mono text-base font-bold text-teal-700">{mean.toFixed(2)}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-[10px] text-slate-400 block font-sans">Mốt (Mo):</span>
              <span className="font-mono text-sm font-bold text-slate-700">
                {modes.length > 0 ? `${modes.join(", ")} (Tần số: ${maxFreq})` : "Không có"}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
              <span className="text-[10px] text-slate-400 block font-sans">Độ lệch chuẩn (s):</span>
              <span className="font-mono text-sm font-bold text-indigo-700">{stdDev.toFixed(3)}</span>
            </div>
          </div>
        </div>

        {/* Solver output showing box-plot */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-100 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-indigo-750 block uppercase tracking-wider">
              Biểu Đồ Hộp (Box Plot) trực quan hóa (Trang 88):
            </span>

            {n > 0 ? (
              <div className="w-full flex flex-col items-center py-2 bg-slate-950 rounded-xl border shadow-inner text-white">
                <svg width={totalWidth} height={totalHeight} className="overflow-visible">
                  {/* Axis baseline */}
                  <line x1={svgX(minVal)} y1="80" x2={svgX(maxVal)} y2="80" stroke="#777" strokeWidth="1" />
                  
                  {/* Min and Max tick marks */}
                  <line x1={svgX(minVal)} y1="76" x2={svgX(minVal)} y2="84" stroke="#777" strokeWidth="1" />
                  <text x={svgX(minVal)} y="95" textAnchor="middle" fill="#888" className="text-[8px] font-mono">{minVal}</text>
                  <text x={svgX(maxVal)} y="95" textAnchor="middle" fill="#888" className="text-[8px] font-mono">{maxVal}</text>
                  <line x1={svgX(maxVal)} y1="76" x2={svgX(maxVal)} y2="84" stroke="#777" strokeWidth="1" />

                  {/* Whiskers (excluding outliers if any) */}
                  {/* Left whisker line */}
                  <line x1={svgX(boxMin)} y1="40" x2={svgX(q1)} y2="40" stroke="#a5b4fc" strokeWidth="1.5" />
                  {/* Left whisker vertical edge */}
                  <line x1={svgX(boxMin)} y1="30" x2={svgX(boxMin)} y2="50" stroke="#818cf8" strokeWidth="1.5" />

                  {/* Right whisker line */}
                  <line x1={svgX(q3)} y1="40" x2={svgX(boxMax)} y2="40" stroke="#a5b4fc" strokeWidth="1.5" />
                  {/* Right whisker vertical edge */}
                  <line x1={svgX(boxMax)} y1="30" x2={svgX(boxMax)} y2="50" stroke="#818cf8" strokeWidth="1.5" />

                  {/* Center Box representing Q1 onto Q3 */}
                  <rect
                    x={svgX(q1)}
                    y="20"
                    width={svgX(q3) - svgX(q1)}
                    height="40"
                    fill="rgba(99, 102, 241, 0.25)"
                    stroke="#818cf8"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />

                  {/* Median vertical line (Q2) */}
                  <line x1={svgX(median)} y1="20" x2={svgX(median)} y2="60" stroke="#10b981" strokeWidth="2.5" />
                  <text x={svgX(median)} y="15" textAnchor="middle" fill="#34d399" className="text-[8px] font-sans font-bold">Q2=Med</text>
                  <text x={svgX(median)} y="70" textAnchor="middle" fill="#34d399" className="text-[9px] font-mono font-bold">{median}</text>

                  {/* Q1 and Q3 details */}
                  <text x={svgX(q1)} y="70" textAnchor="middle" fill="#818cf8" className="text-[8px] font-sans">Q1={q1.toFixed(1)}</text>
                  <text x={svgX(q3)} y="70" textAnchor="middle" fill="#818cf8" className="text-[8px] font-sans">Q3={q3.toFixed(1)}</text>

                  {/* Outliers dots (represented as red asterisk stars *) */}
                  {outliers.map((out, idx) => (
                    <g key={idx} className="animate-pulse">
                      <circle cx={svgX(out)} cy="40" r="5" fill="#f43f5e" stroke="white" strokeWidth="1" />
                      <text x={svgX(out)} y="95" textAnchor="middle" fill="#f87171" className="text-[8px] font-mono font-bold">{out} (?)</text>
                    </g>
                  ))}
                </svg>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-400 py-6 italic border rounded-xl">Nhập các giá trị dữ liệu để hiển thị sơ đồ hộp.</div>
            )}
          </div>

          {/* Quantitative analysis values table */}
          {n > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-700 bg-slate-50 border p-3 rounded-xl">
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Tác nhân đo phân bố dữ liệu:</span>
                <ul className="list-disc pl-4 text-[11px] text-slate-500">
                  <li><b>Khoảng biến thiên (R):</b> {range.toFixed(2)} (Từ {minVal} đến {maxVal})</li>
                  <li><b>Tứ phân vị:</b> Q1 = {q1.toFixed(1)}, Q2 = {median.toFixed(1)}, Q3 = {q3.toFixed(1)}</li>
                  <li><b>Khoảng tứ phân vị (IQR):</b> {iqr.toFixed(2)}</li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Giá trị bất thường (Outliers):</span>
                {outliers.length > 0 ? (
                  <div>
                    <span className="text-rose-600 font-semibold text-[11px]">
                      Phát hiện {outliers.length} giá trị: {outliers.join(", ")}
                    </span>
                    <p className="text-[10px] text-slate-400 leading-tight mt-1">Là điểm nằm ngoài mốc lý thuyết $[{lowerBoundary.toFixed(1)}; {upperBoundary.toFixed(1)}]$ (vượt quá 1.5 lần độ rộng IQR).</p>
                  </div>
                ) : (
                  <span className="text-emerald-600 font-semibold text-[11px]">
                    Tuyệt vời! Không phát hiện giá trị bất thường nào.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
