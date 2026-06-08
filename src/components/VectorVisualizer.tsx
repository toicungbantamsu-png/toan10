import React, { useState } from "react";
import { MoveRight, ToggleLeft, ToggleRight, ArrowUpRight } from "lucide-react";

export default function VectorVisualizer() {
  const [ux, setUx] = useState<number>(3);
  const [uy, setUy] = useState<number>(2);
  const [vx, setVx] = useState<number>(-1);
  const [vy, setVy] = useState<number>(3);
  const [showSum, setShowSum] = useState<boolean>(true);
  const [showDiff, setShowDiff] = useState<boolean>(false);

  // Vector metrics
  const magU = Math.sqrt(ux * ux + uy * uy);
  const magV = Math.sqrt(vx * vx + vy * vy);
  
  // Dot product (Tích vô hướng)
  const dotProduct = ux * vx + uy * vy;

  // Sum and Difference vectors
  const sumX = ux + vx;
  const sumY = uy + vy;
  const diffX = ux - vx;
  const diffY = uy - vy;

  // Cos of angle between vectors
  const cosAngleVal = magU * magV > 0 ? dotProduct / (magU * magV) : 0;
  const angleDeg = magU * magV > 0 
    ? (Math.acos(Math.max(-1, Math.min(1, cosAngleVal))) * 180 / Math.PI).toFixed(1)
    : "0";

  // Coordinates Mapping inside standard grid
  const width = 260;
  const center = 130;
  const scale = 18; // pixels per unit (limits from -6 to 6)

  const mapX = (x: number) => center + x * scale;
  const mapY = (y: number) => center - y * scale; // standard upright math plane

  return (
    <div className="bg-white mb-6 rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="font-sans text-lg font-semibold text-slate-800 flex items-center gap-1.5">
          <ArrowUpRight className="text-violet-650 w-5 h-5" />
          Công cụ bổ sung: Vectơ trên Hệ tọa độ Oxy
        </h3>
        <p className="text-xs text-slate-500 font-sans">
          Mô hình hóa tọa độ Vectơ (Trang 60) và Tích vô hướng (Trang 66)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Configurations */}
        <div className="lg:col-span-5 flex flex-col gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100 justify-between">
          <div className="flex flex-col gap-3">
            {/* Vector u */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span className="font-sans text-indigo-700">VECTƠ u = ({ux}; {uy})</span>
                <span className="font-mono">Độ dài: {magU.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block">Hoành độ u_x</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={ux}
                    onChange={(e) => setUx(parseInt(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block">Tung độ u_y</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={uy}
                    onChange={(e) => setUy(parseInt(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Vector v */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span className="font-sans text-purple-700">VECTƠ v = ({vx}; {vy})</span>
                <span className="font-mono">Độ dài: {magV.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block">Hoành độ v_x</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={vx}
                    onChange={(e) => setVx(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block">Tung độ v_y</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={vy}
                    onChange={(e) => setVy(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Công cụ liên kết hiển thị:
            </span>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowSum(!showSum);
                  if (showDiff && !showSum) setShowDiff(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                  showSum ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                Hiện Tổng u + v: ({sumX}; {sumY})
              </button>
              <button
                onClick={() => {
                  setShowDiff(!showDiff);
                  if (showSum && !showDiff) setShowSum(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                  showDiff ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                Hiện Hiệu u - v: ({diffX}; {diffY})
              </button>
            </div>
          </div>

          {/* Math details log */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-xs font-sans text-slate-700 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-slate-800 font-semibold border-b pb-1 font-sans">
              <span>Tính toán Tích vô hướng (Trang 68):</span>
              <span className="font-mono text-indigo-750">u · v = {dotProduct}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              <b>Phép tính tọa độ:</b> {"$(" + ux + ") \\cdot (" + vx + ") + (" + uy + ") \\cdot (" + vy + ") = " + dotProduct + "$"}.
            </p>
            <p className="text-[11px] text-slate-500">
              <b>Góc giữa hai vectơ:</b> {"$\\cos(\\vec{u}, \\vec{v}) = \\frac{u \\cdot v}{|u| \\cdot |v|} = " + cosAngleVal.toFixed(3) + "$"} từ đó suy ra góc bằng <b className="text-slate-800">{angleDeg}°</b>.
            </p>
          </div>
        </div>

        {/* Graphical Representation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-4 border border-slate-950 text-white relative">
          {/* Arrow markers defs for arrow pointing heads */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <marker id="arrow-u" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#6366f1" />
              </marker>
              <marker id="arrow-v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#a855f7" />
              </marker>
              <marker id="arrow-sum" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" />
              </marker>
              <marker id="arrow-diff" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f43f5e" />
              </marker>
            </defs>
          </svg>

          <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
            <svg width={width} height={width} className="rounded border border-slate-800">
              {/* Axes lines */}
              <line x1="0" y1={center} x2={width} y2={center} stroke="#555" strokeWidth="1" />
              <line x1={center} y1="0" x2={center} y2={width} stroke="#555" strokeWidth="1" />

              {/* Grid dots for coordinate integers */}
              {Array.from({ length: 13 }).map((_, i) => {
                const step = i - 6;
                if (step === 0) return null;
                return (
                  <React.Fragment key={i}>
                    {/* X ticks */}
                    <line x1={mapX(step)} y1={center - 3} x2={mapX(step)} y2={center + 3} stroke="#666" />
                    {/* Y ticks */}
                    <line x1={center - 3} y1={mapY(step)} x2={center + 3} y2={mapY(step)} stroke="#666" />
                  </React.Fragment>
                );
              })}

              {/* Guide dotted lines showing Parallelogram sum rule */}
              {showSum && (
                <>
                  {/* From u (ux, uy) to sum (sumX, sumY) which is parallel to v */}
                  <line
                    x1={mapX(ux)}
                    y1={mapY(uy)}
                    x2={mapX(sumX)}
                    y2={mapY(sumY)}
                    stroke="#10b981"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                    className="opacity-70"
                  />
                  {/* From v (vx, vy) to sum (sumX, sumY) which is parallel to u */}
                  <line
                    x1={mapX(vx)}
                    y1={mapY(vy)}
                    x2={mapX(sumX)}
                    y2={mapY(sumY)}
                    stroke="#10b981"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                    className="opacity-70"
                  />
                </>
              )}

              {/* Guide dotted lines showing subtraction rule */}
              {showDiff && (
                <line
                  x1={mapX(vx)}
                  y1={mapY(vy)}
                  x2={mapX(ux)}
                  y2={mapY(uy)}
                  stroke="#ef4444"
                  strokeWidth="1.2"
                  strokeDasharray="4,4"
                  className="opacity-60"
                />
              )}

              {/* Draw Vector u (Blue) */}
              <line
                x1={center}
                y1={center}
                x2={mapX(ux)}
                y2={mapY(uy)}
                stroke="#6366f1"
                strokeWidth="2.5"
                markerEnd="url(#arrow-u)"
              />
              <text x={mapX(ux) + 4} y={mapY(uy) - 4} fill="#818cf8" className="text-[10px] font-bold">u</text>

              {/* Draw Vector v (Purple) */}
              <line
                x1={center}
                y1={center}
                x2={mapX(vx)}
                y2={mapY(vy)}
                stroke="#a855f7"
                strokeWidth="2.5"
                markerEnd="url(#arrow-v)"
              />
              <text x={mapX(vx) + 4} y={mapY(vy) - 4} fill="#c084fc" className="text-[10px] font-bold">v</text>

              {/* Draw Vector Sum (Green) */}
              {showSum && (
                <>
                  <line
                    x1={center}
                    y1={center}
                    x2={mapX(sumX)}
                    y2={mapY(sumY)}
                    stroke="#10b981"
                    strokeWidth="3"
                    markerEnd="url(#arrow-sum)"
                  />
                  <text x={mapX(sumX) + 6} y={mapY(sumY) - 4} fill="#34d399" className="text-[10px] font-bold">u+v</text>
                </>
              )}

              {/* Draw Vector Diff (Red) */}
              {showDiff && (
                <>
                  <line
                    x1={center}
                    y1={center}
                    x2={mapX(diffX)}
                    y2={mapY(diffY)}
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    markerEnd="url(#arrow-diff)"
                  />
                  <text x={mapX(diffX) + 5} y={mapY(diffY) - 5} fill="#f87171" className="text-[10px] font-bold">u-v</text>
                </>
              )}

              {/* Origin dot */}
              <circle cx={center} cy={center} r="3" fill="white" />
              <text x={center - 10} y={center + 12} fill="#bbb" className="text-[9px] font-mono">O</text>
            </svg>
          </div>

          <div className="w-full mt-3 bg-slate-800 rounded-xl p-3 text-xs leading-relaxed text-slate-300">
            <span className="font-semibold text-indigo-400 block mb-1 text-[13px] font-sans">
              Các quy tắc hình học vectơ (Trang 51 - 55):
            </span>
            <ul className="list-disc pl-4 flex flex-col gap-1 font-sans text-[11px]">
              <li>
                <b>Quy tắc hình bình hành:</b> Nhờ nét ghép đôi nét đứt, ta thấy đường chéo nối từ mốc tọa độ chính là tổng của hai vectơ {"$\\vec{u} + \\vec{v}$"}.
              </li>
              <li>
                <b>Quy tắc hiệu:</b> Vectơ nối từ ngọn {"$\\vec{v}$"} sang ngọn {"$\\vec{u}$"} chính là biểu thi của hiệu {"$\\vec{u} - \\vec{v}$"} (vectơ màu hồng nhạt biểu diễn từ điểm O tương ứng).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
