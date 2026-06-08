import React, { useState } from "react";
import { Plus, Minus, Check, X } from "lucide-react";

export default function InequalityVisualizer() {
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(3);
  const [c, setC] = useState<number>(6);
  const [op, setOp] = useState<"<=" | ">=" | "<" | ">">("<=");
  
  // Custom test point coordinates
  const [testX, setTestX] = useState<number>(0);
  const [testY, setTestY] = useState<number>(0);

  // Math helper
  const isSolution = (x: number, y: number) => {
    const val = a * x + b * y;
    if (op === "<=") return val <= c;
    if (op === ">=") return val >= c;
    if (op === "<") return val < c;
    return val > c;
  };

  const loadExample1 = () => {
    setA(2);
    setB(3);
    setC(6);
    setOp("<=");
    setTestX(0);
    setTestY(0);
  };

  const loadExample2 = () => {
    setA(1);
    setB(1);
    setC(2);
    setOp(">=");
    setTestX(3);
    setTestY(4);
  };

  // SVG dimensions
  const width = 300;
  const height = 300;
  const center = 150;
  const scale = 12; // pixels per unit (e.g. from -10 to 10 coordinate)

  const toSvgX = (x: number) => center + x * scale;
  const toSvgY = (y: number) => center - y * scale; // invert Y for standard math orientation

  // Create grid points for visual dots (matrix)
  const dots = [];
  for (let gx = -10; gx <= 10; gx += 1) {
    for (let gy = -10; gy <= 10; gy += 1) {
      dots.push({ x: gx, y: gy, active: isSolution(gx, gy) });
    }
  }

  // Calculate points for line ax + by = c inside grid -10 to +10 bounds
  // If b is not 0: y = (c - ax)/b
  // If a is not 0: x = (c - by)/a
  let linePath = "";
  if (b !== 0) {
    const x1 = -12;
    const y1 = (c - a * x1) / b;
    const x2 = 12;
    const y2 = (c - a * x2) / b;
    linePath = `M ${toSvgX(x1)} ${toSvgY(y1)} L ${toSvgX(x2)} ${toSvgY(y2)}`;
  } else if (a !== 0) {
    const y1 = -12;
    const x1 = (c - b * y1) / a;
    const y2 = 12;
    const x2 = (c - b * y2) / a;
    linePath = `M ${toSvgX(x1)} ${toSvgY(y1)} L ${toSvgX(x2)} ${toSvgY(y2)}`;
  }

  const testVal = a * testX + b * testY;
  const testOk = isSolution(testX, testY);

  return (
    <div className="bg-white mb-6 rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-slate-800">
          Công cụ bổ trợ: Biểu diễn Miền nghiệm trong hệ Oxy
        </h3>
        <div className="flex gap-2">
          <button
            onClick={loadExample1}
            className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 cursor-pointer"
          >
            {"Ví dụ 1: $2x + 3y \\le 6$ (Sách trang 23)"}
          </button>
          <button
            onClick={loadExample2}
            className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-600 transition hover:bg-teal-100 cursor-pointer"
          >
            {"Ví dụ 2: $x + 2y \\ge 5$ (Sách trang 24)"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sliders Configuration */}
        <div className="lg:col-span-5 flex flex-col gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div>
            <span className="text-sm font-semibold text-slate-700 block mb-2">
              Hệ số và Toán tử:
            </span>
            <div className="flex items-center justify-center gap-1.5 py-2 bg-white rounded-xl border border-slate-150 shadow-sm px-3 mb-4">
              <span className="text-lg font-mono font-bold text-indigo-700">{a}</span>
              <span className="text-sm text-slate-500">x</span>
              <span className="text-sm font-bold text-slate-400 font-mono">+</span>
              <span className="text-lg font-mono font-bold text-purple-700">{b}</span>
              <span className="text-sm text-slate-500">y</span>

              <select
                value={op}
                onChange={(e: any) => setOp(e.target.value)}
                className="mx-1 bg-slate-100 text-slate-800 font-bold px-2 py-1.5 rounded-lg border-none text-md outline-none cursor-pointer text-center"
              >
                <option value="<=">&le;</option>
                <option value=">=">&ge;</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
              </select>

              <span className="text-lg font-mono font-bold text-slate-800">{c}</span>
            </div>

            {/* Controls for coefficients */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                  <span>Hệ số ax (a = {a})</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => setA(a - 1)} className="p-0.5 rounded bg-slate-200 hover:bg-slate-300"><Minus className="w-3 h-3"/></button>
                    <button onClick={() => setA(a + 1)} className="p-0.5 rounded bg-slate-200 hover:bg-slate-300"><Plus className="w-3 h-3"/></button>
                  </div>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="8"
                  step="1"
                  value={a}
                  onChange={(e) => setA(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                  <span>Hệ số by (b = {b})</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => setB(b - 1)} className="p-0.5 rounded bg-slate-200 hover:bg-slate-300"><Minus className="w-3 h-3"/></button>
                    <button onClick={() => setB(b + 1)} className="p-0.5 rounded bg-slate-200 hover:bg-slate-300"><Plus className="w-3 h-3"/></button>
                  </div>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="8"
                  step="1"
                  value={b}
                  onChange={(e) => setB(parseInt(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between text-xs font-mono text-slate-500 mb-1">
                  <span>Hằng số tự do {op} c (c = {c})</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => setC(c - 1)} className="p-0.5 rounded bg-slate-200 hover:bg-slate-300"><Minus className="w-3 h-3"/></button>
                    <button onClick={() => setC(c + 1)} className="p-0.5 rounded bg-slate-200 hover:bg-slate-300"><Plus className="w-3 h-3"/></button>
                  </div>
                </div>
                <input
                  type="range"
                  min="-24"
                  max="24"
                  step="1"
                  value={c}
                  onChange={(e) => setC(parseInt(e.target.value))}
                  className="w-full accent-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Test Point block */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-sm mt-1">
            <span className="text-xs font-bold text-slate-500 block mb-1">ĐIỂM THỬ NGHIỆM M(x, y):</span>
            <div className="flex gap-3 mb-2">
              <div className="flex-1">
                <span className="text-[10px] font-mono text-slate-400 block">Hoành độ (x)</span>
                <input
                  type="number"
                  value={testX}
                  onChange={(e) => setTestX(parseInt(e.target.value) || 0)}
                  className="w-full border rounded-lg px-2 py-1 text-sm font-mono focus:outline-indigo-500 text-center"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono text-slate-400 block">Tung độ (y)</span>
                <input
                  type="number"
                  value={testY}
                  onChange={(e) => setTestY(parseInt(e.target.value) || 0)}
                  className="w-full border rounded-lg px-2 py-1 text-sm font-mono focus:outline-indigo-500 text-center"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs leading-tight">
              {testOk ? (
                <Check className="text-emerald-500 w-4 h-4 shrink-0" />
              ) : (
                <X className="text-rose-500 w-4 h-4 shrink-0" />
              )}
              <span className="font-sans">
                {"Thử thế $M(" + testX + "; " + testY + ")$: $" + a + "(" + testX + ") + " + b + "(" + testY + ") = " + testVal + "$ "}
                {testOk ? (
                  <span className="text-emerald-600 font-semibold">{`${op} ${c} (ĐÚNG)`}</span>
                ) : (
                  <span className="text-rose-600 font-semibold">{`không thỏa ${op} ${c} (SAI)`}</span>
                )}
                {testX === 0 && testY === 0 && ". (Đây chính là phép thử gốc O(0,0) mẫu!)"}
              </span>
            </div>
          </div>
        </div>

        {/* SVG Cartesian Canvas Area */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-4 border border-slate-950 text-white relative">
          <div className="absolute top-3 left-3 flex gap-2 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Miền nghiệm
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block"></span> Gạch bỏ
            </span>
          </div>

          <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
            <svg width={width} height={height} className="rounded border border-slate-800">
              {/* Axes & major grid */}
              {/* X Axis */}
              <line x1="0" y1={center} x2={width} y2={center} stroke="#555" strokeWidth="1.5" />
              <polygon points={`${width},${center} ${width - 6},${center - 4} ${width - 6},${center + 4}`} fill="#555" />
              <text x={width - 12} y={center + 14} fill="#888" className="text-[10px] font-mono font-bold">x</text>

              {/* Y Axis */}
              <line x1={center} y1="0" x2={center} y2={height} stroke="#555" strokeWidth="1.5" />
              <polygon points={`${center},0 ${center - 4},6 ${center + 4},6`} fill="#555" />
              <text x={center + 10} y={15} fill="#888" className="text-[10px] font-mono font-bold">y</text>

              {/* Draw dots with color representational domain */}
              {dots.map((dot, index) => (
                <circle
                  key={index}
                  cx={toSvgX(dot.x)}
                  cy={toSvgY(dot.y)}
                  r={dot.x === 0 && dot.y === 0 ? "3.5" : "1.8"} // larger origin dot
                  fill={
                    dot.x === 0 && dot.y === 0
                      ? "#ffeb3b" // bright gold origin
                      : dot.active
                      ? "#10b981" // emerald green dot in half-plane
                      : "#475569" // slate dot outside
                  }
                  opacity={dot.active ? "0.65" : "0.2"}
                />
              ))}

              {/* Draw boundary line d */}
              {linePath && (
                <path
                  d={linePath}
                  stroke={op.includes("=") ? "#818cf8" : "#f87171"}
                  strokeWidth="2.5"
                  strokeDasharray={op.includes("=") ? "none" : "5,5"} // dashed if open inequality
                  className="transition-all duration-300"
                />
              )}

              {/* Draw test point indicator M */}
              <circle
                cx={toSvgX(testX)}
                cy={toSvgY(testY)}
                r="5"
                fill={testOk ? "#10b981" : "#ef4444"}
                stroke="white"
                strokeWidth="1.5"
                className="animate-pulse"
              />
              <text
                x={toSvgX(testX) + 8}
                y={toSvgY(testY) - 8}
                fill="white"
                className="text-[10px] font-mono font-bold bg-slate-900 border"
              >
                M
              </text>
            </svg>
          </div>

          <div className="w-full mt-3 bg-slate-800 rounded-xl p-3 text-xs leading-relaxed text-slate-300">
            <span className="font-semibold text-emerald-400 block mb-0.5 mb-1 text-sm font-sans">
              Đặc điểm miền nghiệm:
            </span>
            <ul className="list-disc pl-4 flex flex-col gap-1 font-sans text-[11px]">
              <li>
                <b>Đường biên d:</b> ${a}x + {b}y = {c}$ vẽ bằng{" "}
                {op.includes("=") ? (
                  <span className="text-indigo-400 font-semibold">nét liền</span>
                ) : (
                  <span className="text-rose-400 font-semibold">nét đứt</span>
                )}{" "}
                vì quan hệ là {op === "<=" || op === ">=" ? "được tính cả biên (chứa dấu =)" : "không tính biên (không có dấu =)"}.
              </li>
              <li>
                Miền chứa các điểm chấm màu <span className="text-emerald-400 font-semibold">xanh lá</span> đại diện cho nửa mặt phẳng nghiệm thỏa mãn bất phương trình.
              </li>
              <li>Miền có các điểm mốc gạch mờ là phần bị gạch bỏ (không thỏa mãn nghiệm).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
