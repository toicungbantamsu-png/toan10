import React, { useState } from "react";
import { HelpCircle, RefreshCw } from "lucide-react";

export default function VennVisualizer() {
  const [inputA, setInputA] = useState("Nam, Tú, Khánh, Hương, Bình, Chi, Ngân");
  const [inputB, setInputB] = useState("Hương, Khánh, Hiền, Chi, Bình, Lam, Tú, Hân");
  const [activeTab, setActiveTab] = useState<"intersect" | "union" | "diffAB" | "diffBA">("intersect");

  const parseSet = (str: string): string[] => {
    return str
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .filter((value, index, self) => self.indexOf(value) === index); // Unique
  };

  const setA = parseSet(inputA);
  const setB = parseSet(inputB);

  // Operations
  const intersect = setA.filter((x) => setB.includes(x));
  const union = Array.from(new Set([...setA, ...setB]));
  const diffAB = setA.filter((x) => !setB.includes(x));
  const diffBA = setB.filter((x) => !setA.includes(x));

  const loadPreset1 = () => {
    setInputA("Nam, Tú, Khánh, Hương, Bình, Chi, Ngân");
    setInputB("Hương, Khánh, Hiền, Chi, Bình, Lam, Tú, Hân");
  };

  const loadPreset2 = () => {
    setInputA("1, 3, 5, 7, 9, 11, 13");
    setInputB("2, 3, 5, 7, 11, 17, 19");
  };

  return (
    <div className="bg-slate-55 mb-6 rounded-2xl border border-slate-100 p-6 leading-relaxed shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-slate-800">
          Công cụ tương tác: Biểu đồ Venn &amp; Phép toán Tập hợp
        </h3>
        <div className="flex gap-2">
          <button
            onClick={loadPreset1}
            className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100 cursor-pointer"
          >
            Sách Trang 12 (Chuyên đề)
          </button>
          <button
            onClick={loadPreset2}
            className="rounded-lg bg-teal-50 px-3 py-1 text-xs font-medium text-teal-600 transition hover:bg-teal-100 cursor-pointer"
          >
            Tập Số tự nhiên / Số nguyên tố
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Input area */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Phần tử tập hợp A (ngăn cách bằng dấu phẩy)
            </label>
            <textarea
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-slate-250 p-2 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-sans outline-none"
            />
            <span className="text-xs text-slate-400 font-mono">Số phần tử: n(A) = {setA.length}</span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Phần tử tập hợp B (ngăn cách bằng dấu phẩy)
            </label>
            <textarea
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-slate-250 p-2 text-sm text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-sans outline-none"
            />
            <span className="text-xs text-slate-400 font-mono">Số phần tử: n(B) = {setB.length}</span>
          </div>

          {/* Operation switcher buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Chọn phép toán hiển thị:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab("intersect")}
                className={`rounded-xl px-3 py-2 text-xs font-medium text-left transition border ${
                  activeTab === "intersect"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                } shadow-sm cursor-pointer`}
              >
                Giao: A ∩ B ({intersect.length})
              </button>
              <button
                onClick={() => setActiveTab("union")}
                className={`rounded-xl px-3 py-2 text-xs font-medium text-left transition border ${
                  activeTab === "union"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                } shadow-sm cursor-pointer`}
              >
                Hợp: A ∪ B ({union.length})
              </button>
              <button
                onClick={() => setActiveTab("diffAB")}
                className={`rounded-xl px-3 py-2 text-xs font-medium text-left transition border ${
                  activeTab === "diffAB"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                } shadow-sm cursor-pointer`}
              >
                Hiệu: A \ B ({diffAB.length})
              </button>
              <button
                onClick={() => setActiveTab("diffBA")}
                className={`rounded-xl px-3 py-2 text-xs font-medium text-left transition border ${
                  activeTab === "diffBA"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                } shadow-sm cursor-pointer`}
              >
                Hiệu: B \ A ({diffBA.length})
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="relative w-full max-w-sm aspect-[4/3] flex items-center justify-center">
            {/* SVG Venn Diagram */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <defs>
                <clipPath id="left-circle">
                  <circle cx="150" cy="150" r="100" />
                </clipPath>
              </defs>

              {/* Background of Circles */}
              {/* Left Circle A */}
              <circle
                cx="150"
                cy="150"
                r="100"
                className={`transition-colors duration-300 ${
                  activeTab === "union" || activeTab === "diffAB"
                    ? "fill-indigo-500/25 stroke-indigo-600"
                    : "fill-indigo-500/5 stroke-indigo-400"
                }`}
                strokeWidth="2.5"
              />

              {/* Right Circle B */}
              <circle
                cx="250"
                cy="150"
                r="100"
                className={`transition-colors duration-300 ${
                  activeTab === "union" || activeTab === "diffBA"
                    ? "fill-indigo-500/25 stroke-indigo-600"
                    : "fill-indigo-500/5 stroke-indigo-400"
                }`}
                strokeWidth="2.5"
              />

              {/* Highlight intersection area with custom style depending on tab active */}
              <g clipPath="url(#left-circle)">
                <circle
                  cx="250"
                  cy="150"
                  r="100"
                  className={`transition-colors duration-300 ${
                    activeTab === "intersect" || activeTab === "union"
                      ? "fill-indigo-500/40"
                      : activeTab === "diffAB"
                      ? "fill-slate-50"
                      : "fill-transparent"
                  }`}
                />
              </g>

              {/* Labels for A and B circle headings */}
              <text x="75" y="45" className="font-sans font-bold text-sm fill-indigo-700">Tập A</text>
              <text x="325" y="45" className="font-sans font-bold text-sm fill-purple-700">Tập B</text>

              {/* Dynamic plotting elements as text nodes inside left-circle domain, right-circle domain, intersection domain */}
              {/* 1. Left elements (diffAB): only inside A */}
              {diffAB.slice(0, 5).map((el, i) => {
                const positions = [
                  { x: 95, y: 110 },
                  { x: 105, y: 155 },
                  { x: 80, y: 175 },
                  { x: 125, y: 195 },
                  { x: 135, y: 115 },
                ];
                const pos = positions[i % positions.length];
                return (
                  <text
                    key={`a-${i}`}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    className="font-sans text-xs font-medium fill-slate-800"
                  >
                    {el}
                  </text>
                );
              })}
              {diffAB.length > 5 && (
                <text x="110" y="225" className="font-sans text-[10px] italic fill-slate-400">+{diffAB.length - 5} nữa...</text>
              )}

              {/* 2. Middle elements (Intersection): inside overlapping */}
              {intersect.slice(0, 5).map((el, i) => {
                const positions = [
                  { x: 200, y: 110 },
                  { x: 190, y: 145 },
                  { x: 210, y: 175 },
                  { x: 185, y: 195 },
                  { x: 200, y: 220 },
                ];
                const pos = positions[i % positions.length];
                return (
                  <text
                    key={`i-${i}`}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    className="font-sans text-xs font-bold fill-indigo-950"
                  >
                    {el}
                  </text>
                );
              })}
              {intersect.length > 5 && (
                <text x="200" y="240" className="font-sans text-[10px] italic fill-slate-400">+{intersect.length - 5} nữa...</text>
              )}

              {/* 3. Right elements (diffBA): only inside B */}
              {diffBA.slice(0, 5).map((el, i) => {
                const positions = [
                  { x: 295, y: 115 },
                  { x: 315, y: 140 },
                  { x: 280, y: 175 },
                  { x: 305, y: 195 },
                  { x: 265, y: 115 },
                ];
                const pos = positions[i % positions.length];
                return (
                  <text
                    key={`b-${i}`}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    className="font-sans text-xs font-medium fill-slate-800"
                  >
                    {el}
                  </text>
                );
              })}
              {diffBA.length > 5 && (
                <text x="290" y="225" className="font-sans text-[10px] italic fill-slate-400">+{diffBA.length - 5} nữa...</text>
              )}
            </svg>
          </div>

          {/* Operational Output list displaying elements details */}
          <div className="w-full mt-4 bg-white rounded-xl p-3 border border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
              Kết quả của phép tính:
            </span>
            <div className="text-sm font-sans text-slate-800">
              {activeTab === "intersect" ? (
                <div>
                  <span className="font-semibold font-mono">A ∩ B (Giao)</span>:{" "}
                  {intersect.length > 0 ? (
                    <span className="font-semibold text-indigo-700">
                      {"{ " + intersect.join(", ") + " }"}
                    </span>
                  ) : (
                    <span className="italic text-slate-400">Tập rỗng (∅)</span>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Là tập hợp gồm các thành viên tham gia cả hai chuyên đề (trong sách giáo khoa là 5 người: Tú, Khánh, Hương, Bình, Chi).</p>
                </div>
              ) : activeTab === "union" ? (
                <div>
                  <span className="font-semibold font-mono">A ∪ B (Hợp)</span>:{" "}
                  <span className="font-semibold text-emerald-700">
                    {"{ " + union.join(", ") + " }"}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Là tập hợp gồm tất cả các thành viên tham gia ít nhất một trong hai chuyên đề (gồm {union.length} người).</p>
                </div>
              ) : activeTab === "diffAB" ? (
                <div>
                  <span className="font-semibold font-mono">A \ B (Hiệu)</span>:{" "}
                  {diffAB.length > 0 ? (
                    <span className="font-semibold text-slate-700">
                      {"{ " + diffAB.join(", ") + " }"}
                    </span>
                  ) : (
                    <span className="italic text-slate-400">Tập rỗng (∅)</span>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Gồm các phần tử thuộc A nhưng không thuộc B (chỉ tham gia chuyên đề 1, ví dụ các bạn: Nam, Ngân).</p>
                </div>
              ) : (
                <div>
                  <span className="font-semibold font-mono">B \ A (Hiệu)</span>:{" "}
                  {diffBA.length > 0 ? (
                    <span className="font-semibold text-slate-700">
                      {"{ " + diffBA.join(", ") + " }"}
                    </span>
                  ) : (
                    <span className="italic text-slate-400">Tập rỗng (∅)</span>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Gồm các phần tử thuộc B nhưng không thuộc A (chỉ tham gia chuyên đề 2: Hiền, Lam, Hân).</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
