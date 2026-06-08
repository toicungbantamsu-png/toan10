import React, { useState } from "react";
import { HelpCircle, Layers, Settings, Compass } from "lucide-react";

export default function TriangleVisualizer() {
  // Unit Circle Mode state
  const [angle, setAngle] = useState<number>(120);

  // Triangle Solver state
  const [solverMode, setSolverMode] = useState<"SAS" | "SSS">("SAS");
  const [sideA, setSideA] = useState<number>(13);
  const [sideB, setSideB] = useState<number>(14);
  const [sideC, setSideC] = useState<number>(15); // for SSS
  const [angleC, setAngleC] = useState<number>(60); // for SAS (in degrees)

  // Trigonometric estimations on Unit Circle
  const rad = (angle * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);
  const tanVal = angle === 90 ? "Không định nghĩa" : (sinVal / cosVal).toFixed(4);
  const cotVal = angle === 0 || angle === 180 ? "Không định nghĩa" : (cosVal / sinVal).toFixed(4);

  // Coordinates of point M(x0, y0) on SVG plane
  const uRadius = 90;
  const uCenter = 120;
  const mX = uCenter + cosVal * uRadius;
  const mY = uCenter - sinVal * uRadius; // Invert to go upwards in SVG

  // Triangle solver calculations
  let solSideA = sideA;
  let solSideB = sideB;
  let solSideC = sideC;
  let solAngleA = 0;
  let solAngleB = 0;
  let solAngleC = angleC;
  let solArea = 0;
  let solPerimeter = 0;
  let solR = 0;
  let solr = 0;
  let errorMsg = "";

  if (solverMode === "SAS") {
    // a, b, angle C
    const a = sideA;
    const b = sideB;
    const C_rad = (angleC * Math.PI) / 180;
    
    // Estimate c using Cosine Law
    const c_sq = a * a + b * b - 2 * a * b * Math.cos(C_rad);
    if (c_sq > 0) {
      const c = Math.sqrt(c_sq);
      solSideC = Number(c.toFixed(2));
      solPerimeter = a + b + c;
      const p = solPerimeter / 2;
      
      // Area = 1/2 * a * b * sin C
      solArea = Number((0.5 * a * b * Math.sin(C_rad)).toFixed(2));
      
      // Radius r = S/p
      solr = Number((solArea / p).toFixed(2));

      // Circum-radius R = abc / 4S
      solR = Number(((a * b * c) / (4 * solArea)).toFixed(2));

      // Find angles A and B using Cosine/Sine Law safely
      let cosA = (b * b + c * c - a * a) / (2 * b * c);
      cosA = Math.max(-1, Math.min(1, cosA)); // clamp
      solAngleA = Number(((Math.acos(cosA) * 180) / Math.PI).toFixed(1));
      solAngleB = Number((180 - solAngleA - angleC).toFixed(1));
    } else {
      errorMsg = "Số liệu cạnh không thể âm.";
    }
  } else {
    // SSS: a, b, c
    const a = sideA;
    const b = sideB;
    const c = sideC;

    // Check triangle inequalities
    if (a + b > c && a + c > b && b + c > a) {
      solPerimeter = a + b + c;
      const p = solPerimeter / 2;

      // Heron's Formula
      const s_sq = p * (p - a) * (p - b) * (p - c);
      if (s_sq > 0) {
        solArea = Number(Math.sqrt(s_sq).toFixed(2));
        solr = Number((solArea / p).toFixed(2));
        solR = Number(((a * b * c) / (4 * solArea)).toFixed(2));

        // Find angles
        let cosC = (a * a + b * b - c * c) / (2 * a * b);
        cosC = Math.max(-1, Math.min(1, cosC));
        solAngleC = Number(((Math.acos(cosC) * 180) / Math.PI).toFixed(1));

        let cosA = (b * b + c * c - a * a) / (2 * b * c);
        cosA = Math.max(-1, Math.min(1, cosA));
        solAngleA = Number(((Math.acos(cosA) * 180) / Math.PI).toFixed(1));
        
        solAngleB = Number((180 - solAngleA - solAngleC).toFixed(1));
      } else {
        errorMsg = "Tam giác bị bẹt hoặc số cực cực tiểu.";
      }
    } else {
      errorMsg = "Không thỏa mãn bất đẳng thức tam giác! (Tổng hai cạnh bất kì phải lớn hơn cạnh còn lại)";
    }
  }

  // Draw Triangle SVG Coordinates
  // To draw a representative triangle: A at top, B at origin, C at bottom right
  // We can let B = (30, 150), C = (180, 150)
  // Compute A relative to B using solAngleB and solSideC
  const tScale = Math.min(130 / Math.max(solSideA, solSideB, solSideC), 15);
  // Points
  const bx = 40;
  const by = 160;
  const cx = bx + solSideA * tScale;
  const cy = by;

  // Let's compute Coordinates of A which is at angle B relative to BC direction
  const bRad = (solAngleB * Math.PI) / 180;
  const ax = bx + solSideC * tScale * Math.cos(bRad);
  const ay = by - solSideC * tScale * Math.sin(bRad); // upwards

  return (
    <div className="bg-slate-50 border border-slate-100 mb-6 rounded-2xl p-6 shadow-sm">
      <div className="border-b border-slate-150 pb-3 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="font-sans text-lg font-bold text-slate-800 flex items-center gap-2">
          <Compass className="text-indigo-600 w-5 h-5" />
          Chương III: Tương tác Hệ thức lượng &amp; Góc Lượng giác
        </h3>
        <p className="text-xs text-slate-500 font-sans">
          Mô phỏng đầy đủ lý thuyết nửa đường tròn (Trang 34) và Định lý Sin/Cô-sin (Trang 38)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: Unit Circle */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col gap-4">
          <span className="text-sm font-bold text-indigo-750 block flex items-center gap-1.5 border-b pb-1.5 border-slate-100">
            <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full"></span>
            1. Mô phỏng: Nửa đường tròn đơn vị (Trang 34)
          </span>

          {/* Interactive Circle visualizer */}
          <div className="flex flex-col items-center">
            <svg width="240" height="150" viewBox="0 0 240 150" className="border rounded-xl bg-slate-55 mb-2">
              {/* Grid axes */}
              <line x1="20" y1="120" x2="220" y2="120" stroke="#ccc" /> {/* X axis */}
              <line x1={uCenter} y1="20" x2={uCenter} y2="130" stroke="#ccc" /> {/* Y axis */}

              {/* Half arc circle */}
              <path d={`M ${uCenter - uRadius} 120 A ${uRadius} ${uRadius} 0 0 1 ${uCenter + uRadius} 120`} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="3,3" />

              {/* Point A(-1,0), B(1,0), C(0,1) labels */}
              <text x={uCenter - uRadius - 15} y="125" fill="#888" className="text-[10px] font-mono">A(-1,0)</text>
              <text x={uCenter + uRadius + 3} y="125" fill="#888" className="text-[10px] font-mono">B(1,0)</text>
              <text x={uCenter} y="15" fill="#888" className="text-[10px] font-mono text-center">C(0,1)</text>

              {/* Angle sector filling */}
              {angle > 0 && (
                <path
                  d={`M ${uCenter} 120 L ${uCenter + 15} 120 A 15 15 0 0 0 ${uCenter + 15 * Math.cos(rad)} ${120 - 15 * Math.sin(rad)} Z`}
                  fill="rgba(99, 102, 241, 0.25)"
                />
              )}

              {/* Vector line to M */}
              <line x1={uCenter} y1="120" x2={mX} y2={mY} stroke="#10b981" strokeWidth="2.5" />
              {/* Dashed projections of M to coordinate axes */}
              <line x1={mX} y1={mY} x2={mX} y2="120" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
              <line x1={mX} y1={mY} x2={uCenter} y2={mY} stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />

              {/* Point M(x0, y0) itself */}
              <circle cx={mX} cy={mY} r="4.5" fill="#10b981" stroke="white" strokeWidth="1.5" />
              <text x={mX + 6} y={mY - 3} fill="#111827" className="text-[11px] font-bold">M</text>
            </svg>

            {/* Slider */}
            <div className="w-full px-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-1">
                <span>Chọn góc α: <b className="text-lg text-indigo-650 font-bold">{angle}°</b></span>
                <span>(0° đến 180°)</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="1"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full accent-indigo-600 mb-3"
              />
            </div>

            {/* Trig stats output */}
            <div className="grid grid-cols-2 gap-2 w-full text-xs font-mono">
              <div className="bg-rose-50 p-2 rounded-xl border border-rose-100/50 flex flex-col text-slate-800">
                <span className="text-[10px] text-rose-600 block uppercase font-sans font-bold">sin α (Tung độ M):</span>
                <span className="text-sm font-bold">{sinVal.toFixed(4)}</span>
              </div>
              <div className="bg-blue-50 p-2 rounded-xl border border-blue-105 flex flex-col text-slate-800">
                <span className="text-[10px] text-blue-600 block uppercase font-sans font-bold">cos α (Hoành độ M):</span>
                <span className="text-sm font-bold">{cosVal.toFixed(4)}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col text-slate-800 col-span-2 text-center text-[11px]">
                <div className="flex justify-around items-center">
                  <span>tan α = <b className="text-slate-800 font-bold text-xs">{tanVal}</b></span>
                  <span className="text-slate-350">|</span>
                  <span>cot α = <b className="text-slate-800 font-bold text-xs">{cotVal}</b></span>
                </div>
              </div>
            </div>
            {angle > 90 && (
              <span className="text-[10px] text-slate-400 block mt-2 text-center italic">Góc tù α &gt; 90°: hoành độ âm nên cos α &amp; tan α, cot α có giá trị âm!</span>
            )}
          </div>
        </div>

        {/* Section 2: Triangle Solver */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col gap-3">
          <span className="text-sm font-bold text-indigo-750 block flex items-center justify-between border-b pb-1.5 border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full"></span>
              2. Công cụ: Giải &amp; Vẽ tam giác tự động
            </span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg">
              <button
                onClick={() => setSolverMode("SAS")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  solverMode === "SAS" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                } cursor-pointer`}
              >
                Cạnh-Góc-Cạnh
              </button>
              <button
                onClick={() => setSolverMode("SSS")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  solverMode === "SSS" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                } cursor-pointer`}
              >
                3 Cạnh (Heron)
              </button>
            </div>
          </span>

          {/* Controls based on modes */}
          <div className="flex flex-col gap-2">
            {solverMode === "SAS" ? (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Cạnh a</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sideA}
                    onChange={(e) => setSideA(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full border rounded-lg px-2 py-1 text-sm font-mono text-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Cạnh b</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sideB}
                    onChange={(e) => setSideB(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full border rounded-lg px-2 py-1 text-sm font-mono text-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Góc C (độ)</span>
                  <input
                    type="number"
                    min="1"
                    max="179"
                    value={angleC}
                    onChange={(e) => setAngleC(Math.min(179, Math.max(1, parseInt(e.target.value) || 0)))}
                    className="w-full border rounded-lg px-2 py-1 text-sm font-mono text-center"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Cạnh a</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sideA}
                    onChange={(e) => setSideA(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full border rounded-lg px-2 py-1 text-sm font-mono text-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Cạnh b</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sideB}
                    onChange={(e) => setSideB(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full border rounded-lg px-2 py-1 text-sm font-mono text-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block font-sans">Cạnh c</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sideC}
                    onChange={(e) => setSideC(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full border rounded-lg px-2 py-1 text-sm font-mono text-center"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Draw representative triangle screen */}
          {errorMsg ? (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-xs text-rose-600 text-center font-medium my-2">
              {errorMsg}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <svg width="220" height="150" viewBox="0 0 240 180" className="border rounded-xl bg-slate-900 shadow-inner">
                {/* Drawn triangle path */}
                <polygon
                  points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
                  fill="rgba(99, 102, 241, 0.15)"
                  stroke="#818cf8"
                  strokeWidth="2.5"
                />

                {/* Point Labels */}
                {/* Point A */}
                <circle cx={ax} cy={ay} r="3" fill="#818cf8" />
                <text x={ax} y={ay - 7} fill="white" textAnchor="middle" className="text-[11px] font-bold">A</text>

                {/* Point B */}
                <circle cx={bx} cy={by} r="3" fill="#818cf8" />
                <text x={bx - 8} y={by + 4} fill="white" className="text-[11px] font-bold">B</text>

                {/* Point C */}
                <circle cx={cx} cy={cy} r="3" fill="#818cf8" />
                <text x={cx + 8} y={cy + 4} fill="white" className="text-[11px] font-bold">C</text>

                {/* Side lengths labels along boundary segments */}
                {/* Side c (AB) */}
                <text x={(ax + bx) / 2 - 10} y={(ay + by) / 2 - 4} fill="#a5b4fc" className="text-[9px] font-mono">c={solSideC}</text>
                {/* Side b (AC) */}
                <text x={(ax + cx) / 2 + 10} y={(ay + cy) / 2 - 4} fill="#a5b4fc" className="text-[9px] font-mono">b={solSideB}</text>
                {/* Side a (BC) */}
                <text x={(bx + cx) / 2} y={by + 14} fill="#a5b4fc" textAnchor="middle" className="text-[9px] font-mono">a={solSideA}</text>
              </svg>

              {/* Solutions Grid */}
              <div className="grid grid-cols-2 gap-2 w-full mt-3 text-[11px]">
                <div className="bg-slate-50 border p-2 rounded-xl">
                  <span className="text-slate-400 block font-sans">Các góc còn lại:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    A = {solAngleA}°, B = {solAngleB}°
                  </span>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100 p-2 rounded-xl">
                  <span className="text-emerald-600 block font-bold font-sans">Diện tích S (Heron):</span>
                  <span className="font-extrabold text-emerald-800 font-mono text-xs">
                    {solArea}
                  </span>
                </div>
                <div className="bg-slate-50 border p-2 rounded-xl">
                  <span className="text-slate-400 block font-sans">Đường tròn ngoại tiếp R:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    R = {solR}
                  </span>
                </div>
                <div className="bg-slate-50 border p-2 rounded-xl">
                  <span className="text-slate-400 block font-sans">Đường tròn nội tiếp r:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    r = {solr}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
