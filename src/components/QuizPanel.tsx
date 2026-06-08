import React, { useState } from "react";
import { QUIZ_QUESTIONS } from "../data";
import { ChapterId } from "../types";
import { CheckCircle2, AlertTriangle, RefreshCw, GraduationCap } from "lucide-react";

interface QuizPanelProps {
  chapterId: ChapterId;
}

export default function QuizPanel({ chapterId }: QuizPanelProps) {
  const questions = QUIZ_QUESTIONS[chapterId] || [];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted[questionId]) return; // locked once clicked
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
    setSubmitted({
      ...submitted,
      [questionId]: true,
    });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted({});
  };

  // Score calculation
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(submitted).length;
  const correctCount = questions.reduce((acc, q) => {
    if (submitted[q.id] && selectedAnswers[q.id] === q.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (totalQuestions === 0) {
    return (
      <div className="bg-white border rounded-2xl p-6 text-center text-slate-400 italic">
        Thư viện câu hỏi của chương này đang được biên soạn. Bạn vui lòng quay lại sau nhé!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between border-b pb-3 mb-5">
        <div>
          <h3 className="font-sans text-base font-bold text-slate-800 flex items-center gap-1.5 leading-tight">
            <GraduationCap className="text-indigo-650 w-5 h-5" />
            Luyện tập Trắc nghiệm ôn tập Chương
          </h3>
          <span className="text-xs text-slate-500 font-sans block mt-0.5">
            Dựa trên khung đề kiểm tra trắc nghiệm chuẩn của mỗi chương trong Sách giáo khoa
          </span>
        </div>
        
        {answeredCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-indigo-650 font-bold hover:text-indigo-800 cursor-pointer p-1 rounded hover:bg-slate-50 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Làm lại
          </button>
        )}
      </div>

      {/* Quiz Progress Status */}
      {answeredCount > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border flex items-center justify-between">
          <div className="text-xs font-sans text-slate-700">
            Tiến độ hoàn thành: <b className="text-slate-800">{answeredCount}/{totalQuestions} câu</b>
          </div>
          <div className="text-xs font-sans text-slate-700">
            Kết quả của bạn:{" "}
            <span className={`font-bold ${correctCount === totalQuestions ? "text-emerald-600" : "text-indigo-600"}`}>
              {correctCount}/{totalQuestions} đúng
            </span>
          </div>
          <div className="w-1/3 bg-slate-205 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Question Cards Stack */}
      <div className="flex flex-col gap-6">
        {questions.map((q, qIndex) => {
          const isAnswered = submitted[q.id];
          const chosenIdx = selectedAnswers[q.id];
          const isCorrect = chosenIdx === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 transition-all ${
                isAnswered
                  ? isCorrect
                    ? "bg-emerald-50/15 border-emerald-150"
                    : "bg-rose-50/10 border-rose-150"
                  : "bg-white border-slate-150 hover:shadow-xs"
              }`}
            >
              <div className="flex gap-2.5 mb-3.5">
                <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 border rounded px-2 py-0.5 self-start">
                  Câu {qIndex + 1}
                </span>
                <span className="font-sans text-sm font-semibold text-slate-800 leading-snug">
                  {q.question}
                </span>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {q.options.map((option, oIndex) => {
                  const wasChosen = chosenIdx === oIndex;
                  const isAnswerRight = q.correctIndex === oIndex;

                  let optClass = "border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
                  if (isAnswered) {
                    if (isAnswerRight) {
                      optClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold";
                    } else if (wasChosen) {
                      optClass = "border-rose-400 bg-rose-50 text-rose-800";
                    } else {
                      optClass = "border-slate-100 bg-slate-50/50 text-slate-450";
                    }
                  } else {
                    if (wasChosen) {
                      optClass = "border-indigo-600 bg-indigo-50/30 text-indigo-700 font-medium";
                    }
                  }

                  return (
                    <button
                      key={oIndex}
                      disabled={isAnswered}
                      onClick={() => handleSelect(q.id, oIndex)}
                      className={`w-full text-left rounded-xl border p-3 text-xs leading-normal transition duration-200 flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <span>
                        <b className="font-mono uppercase text-slate-400 mr-1.5">{["A", "B", "C", "D"][oIndex]}.</b>{" "}
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Solved Explanation section once answered */}
              {isAnswered && (
                <div
                  className={`mt-4 rounded-xl p-4 text-xs leading-relaxed border transition ${
                    isCorrect
                      ? "bg-emerald-50/60 border-emerald-100 text-emerald-950"
                      : "bg-rose-50/80 border-rose-100 text-rose-950"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 font-bold text-emerald-700 font-sans uppercase tracking-wider text-[10px]">
                        <CheckCircle2 className="w-4 h-4" /> Chính xác
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-bold text-rose-700 font-sans uppercase tracking-wider text-[10px]">
                        <AlertTriangle className="w-4 h-4" /> Chưa chính xác
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-sans">| Đáp án đúng: {["A", "B", "C", "D"][q.correctIndex]}</span>
                  </div>
                  <p className="font-semibold text-[11px] text-slate-800 block mb-1">Hướng dẫn giải bài toán:</p>
                  <div className="font-sans text-[11px] leading-snug whitespace-pre-line text-slate-600 bg-white/70 p-2.5 rounded-lg border border-slate-100">
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
