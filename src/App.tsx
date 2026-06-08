import React, { useState, useEffect } from "react";
import { CHAPTERS } from "./data";
import { ChapterId, Lesson } from "./types";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Compass,
  ArrowUpRight,
  BarChart3,
  BookmarkCheck,
  CheckCircle,
  Menu,
  X,
  Award,
  Layers,
  HelpCircle,
  RotateCcw
} from "lucide-react";

// Sub-components imports
import VennVisualizer from "./components/VennVisualizer";
import InequalityVisualizer from "./components/InequalityVisualizer";
import TriangleVisualizer from "./components/TriangleVisualizer";
import VectorVisualizer from "./components/VectorVisualizer";
import StatsVisualizer from "./components/StatsVisualizer";
import QuizPanel from "./components/QuizPanel";
import AIPanel from "./components/AIPanel";

export default function App() {
  const [activeChapterId, setActiveChapterId] = useState<ChapterId>("H1_MENH_DE_TAP_HOP");
  
  // Find current chapter
  const activeChapter = CHAPTERS.find((ch) => ch.id === activeChapterId) || CHAPTERS[0];
  
  // Active lesson selection, defaults to first lesson in the chosen chapter
  const [activeLessonId, setActiveLessonId] = useState<string>(activeChapter.lessons[0].id);

  // Main UI Mode tabs: "theory" (Lý thuyết & Ví dụ), "interactive" (Công cụ trực quan), "quiz" (Luyện tập trắc nghiệm)
  const [mainTab, setMainTab] = useState<"theory" | "interactive" | "quiz">("theory");

  // Keep track of mobile responsive sidebar
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Completed lessons progress state stored in local state + synced with localStorage
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("toan10_completed_lessons");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track progress syncing
  useEffect(() => {
    localStorage.setItem("toan10_completed_lessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Handle chapter changes - automatically switch active lesson to the first of new chapter
  const changeChapter = (id: ChapterId) => {
    setActiveChapterId(id);
    const newChapter = CHAPTERS.find((ch) => ch.id === id) || CHAPTERS[0];
    setActiveLessonId(newChapter.lessons[0].id);
    setIsMobileOpen(false);
  };

  const toggleLessonCompleted = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleResetAllProgress = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại tất cả tiến độ học tập không?")) {
      setCompletedLessons([]);
    }
  };

  // Total lessons count and calculation of complete percentage
  const totalLessonsCount = CHAPTERS.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const progressPercent = totalLessonsCount > 0 
    ? Math.round((completedLessons.length / totalLessonsCount) * 105) / 1.05 // Adjust math
    : 0;

  const currentLesson = activeChapter.lessons.find((l) => l.id === activeLessonId) || activeChapter.lessons[0];

  // Helper helper to highlight math strings nicely inside standard markup text
  const renderMath = (text: string) => {
    if (!text) return "";
    // split by markdown $ symbols
    const parts = text.split(/\$(.*?)\$/g);
    return parts.map((part, index) => {
      if (index % 2 !== 0) {
        return (
          <span key={index} className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5 select-all inline-block mx-0.5">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Icon mapping according to Chapter Index
  const getChapterIcon = (id: ChapterId) => {
    switch (id) {
      case "H1_MENH_DE_TAP_HOP":
        return <Layers className="w-5 h-5 text-indigo-600" />;
      case "H2_BAT_PHUONG_TRINH":
        return <Compass className="w-5 h-5 text-emerald-600" />;
      case "H3_HE_THUC_LUONG":
        return <Award className="w-5 h-5 text-indigo-600" />;
      case "H4_VECTOR":
        return <ArrowUpRight className="w-5 h-5 text-purple-600" />;
      case "H5_THONG_KE":
        return <BarChart3 className="w-5 h-5 text-teal-600" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased text-slate-800">
      
      {/* 🚀 Top beautiful header bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-4 py-3 md:px-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden text-slate-500 hover:text-slate-700 p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-550 bg-clip-text text-transparent font-display tracking-tight">
                Toán 10 - Kết nối tri thức
              </span>
              <span className="hidden sm:inline bg-indigo-50 border border-indigo-100 text-[10px] uppercase font-extrabold text-indigo-750 px-2 py-0.5 rounded-full">
                Sách mới tập một
              </span>
            </div>
          </div>

          {/* Progress dashboard summary */}
          <div className="flex items-center gap-4 text-xs font-sans">
            <div className="hidden md:flex flex-col text-right">
              <div className="flex items-center gap-1.5 text-slate-500">
                <BookmarkCheck className="w-4 h-4 text-indigo-600" />
                <span>Tiến trình hoàn thành:</span>
                <b className="text-slate-800 font-bold block">{completedLessons.length}/{totalLessonsCount} bài học</b>
              </div>
              <div className="w-44 bg-slate-150 h-1.5 rounded-full overflow-hidden mt-1 self-end shadow-inner">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${(completedLessons.length / totalLessonsCount) * 100}%` }}
                ></div>
              </div>
            </div>

            {completedLessons.length > 0 && (
              <button
                onClick={handleResetAllProgress}
                title="Đặt lại tiến trình"
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 🚀 Main Core Layout Split: Sidebar navigations + Bento content area */}
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* Sidebar Nav (collapsible on mobile, persistent on big screen) */}
        <aside
          className={`lg:col-span-3 bg-white lg:border-r border-slate-200/80 p-5 flex flex-col gap-5 lg:sticky lg:top-[61px] lg:h-[calc(100vh-61px)] overflow-y-auto z-30 transition-all duration-300 fixed inset-y-[61px] left-0 w-72 lg:w-auto shadow-lg lg:shadow-none ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Chapter header selection */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 font-display">
              CHỌN CHƯƠNG HỌC TẬP
            </span>
            <div className="flex flex-col gap-2">
              {CHAPTERS.map((ch) => {
                const isActive = activeChapterId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => changeChapter(ch.id)}
                    className={`w-full flex items-center gap-2.5 p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50/50 border-indigo-200 text-indigo-950 font-bold shadow-xs scale-[1.01]"
                        : "bg-white border-slate-100 hover:border-slate-200 text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-white border border-indigo-200 shadow-sm" : "bg-slate-50"}`}>
                      {getChapterIcon(ch.id)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold block leading-tight font-display text-slate-800">
                        {ch.shortTitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lessons matching the currently active chapter list */}
          <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-4 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1 font-display">
              BÀI HỌC CỦA CHƯƠNG
            </span>
            <div className="flex flex-col gap-1 select-none">
              {activeChapter.lessons.map((les) => {
                const isLessonActive = activeLessonId === les.id;
                const isCompleted = completedLessons.includes(les.id);
                return (
                  <button
                    key={les.id}
                    onClick={() => {
                      setActiveLessonId(les.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-lg p-2.5 text-xs text-left cursor-pointer transition ${
                      isLessonActive
                        ? "bg-slate-100/90 text-slate-900 font-bold"
                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 line-clamp-1 py-0.5">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-350 shrink-0" />
                      )}
                      {les.title}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 block ml-1 shrink-0">
                      Tr.{les.pageNumber}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Overlay backdrop on shadow click under mobile */}
        {isMobileOpen && (
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 lg:hidden top-[61px]"
          />
        )}

        {/* Outer content area wrapping Bento and AI assistant */}
        <main className="lg:col-span-9 p-4 md:p-6 flex flex-col gap-6 lg:overflow-y-auto lg:h-[calc(100vh-61px)]">
          
          {/* Top Banner introducing active Chapter & selected Lesson info */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-850 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 relative overflow-hidden select-none">
            {/* Ambient graphical background circles */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-10 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="z-10 flex flex-col gap-1.5 max-w-xl">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-305 block font-display">
                {activeChapter.title}
              </span>
              <h1 className="text-xl md:text-2xl font-bold font-display tracking-tight">
                {currentLesson.title}
              </h1>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {renderMath(currentLesson.summary)}
              </p>
            </div>

            {/* Tracker completion toggle right-aligned */}
            <button
              onClick={() => toggleLessonCompleted(currentLesson.id)}
              className={`z-10 px-4 py-2 px-3 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition select-none cursor-pointer self-start sm:self-center shrink-0 border ${
                completedLessons.includes(currentLesson.id)
                  ? "bg-emerald-500/20 text-emerald-305 border-emerald-400/50"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${completedLessons.includes(currentLesson.id) ? "text-emerald-400" : "text-white"}`} />
              {completedLessons.includes(currentLesson.id) ? "Đã học" : "Đánh dấu đã học"}
            </button>
          </div>

          {/* Mode Switcher panel tabs */}
          <div className="flex bg-white rounded-2xl border border-slate-200/80 p-1 self-start shadow-xs">
            <button
              onClick={() => setMainTab("theory")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-display flex items-center gap-1.5 transition cursor-pointer ${
                mainTab === "theory" ? "bg-indigo-650 text-white shadow-md shadow-indigo-600/15" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Lý thuyết &amp; Ví dụ dịch nghĩa
            </button>
            <button
              onClick={() => setMainTab("interactive")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-display flex items-center gap-1.5 transition cursor-pointer ${
                mainTab === "interactive" ? "bg-indigo-650 text-white shadow-md shadow-indigo-600/15" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Compass className="w-4 h-4" />
              Công cụ Trực quan Tương tác
            </button>
            <button
              onClick={() => setMainTab("quiz")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-display flex items-center gap-1.5 transition cursor-pointer ${
                mainTab === "quiz" ? "bg-indigo-650 text-white shadow-md shadow-indigo-600/15" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Luyện trắc nghiệm ôn tập
            </button>
          </div>

          {/* Content splitter grid wrapping main visualizers & tutor right bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">
            
            {/* Core learning column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Tab 1: Theory definitions & solved math problems */}
              {mainTab === "theory" && (
                <div className="flex flex-col gap-6">
                  {/* Key formulas box */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-3">
                    <span className="text-xs font-bold text-indigo-755 uppercase tracking-wider block border-b pb-1.5 border-slate-100 font-display">
                      Định lý &amp; Công thức Cốt lõi cần nắm:
                    </span>
                    <ul className="flex flex-col gap-2 pl-1">
                      {currentLesson.formulas.map((form, index) => (
                        <li key={index} className="text-xs leading-normal flex items-start gap-2 text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <span>{renderMath(form)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Textbook Solved Math Examples */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-4">
                    <span className="text-xs font-bold text-indigo-755 uppercase tracking-wider block border-b pb-1.5 border-slate-100 font-display">
                      Ví dụ Minh họa từ Sách giáo khoa:
                    </span>
                    <div className="flex flex-col gap-4">
                      {currentLesson.solvedExamples.map((ex, index) => (
                        <div key={index} className="flex flex-col gap-2.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] font-bold text-indigo-600 bg-white border border-indigo-200/50 rounded-xl px-2.5 py-0.5 self-start">
                            Ví dụ mẫu {index + 1}
                          </span>
                          <div className="text-xs font-bold text-slate-800 leading-snug whitespace-pre-line font-sans">
                            {renderMath(ex.question)}
                          </div>
                          
                          <div className="border-t border-slate-200 mt-2 pt-2 text-xs leading-normal text-slate-650 bg-white p-3 rounded-lg border">
                            <span className="font-bold text-[10px] text-slate-400 block uppercase mb-1 font-sans">Lời giải chi tiết:</span>
                            <div className="whitespace-pre-line font-sans">
                              {renderMath(ex.solution)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Interactive Mathematics Simulator */}
              {mainTab === "interactive" && (
                <div>
                  {activeChapterId === "H1_MENH_DE_TAP_HOP" ? (
                    <VennVisualizer />
                  ) : activeChapterId === "H2_BAT_PHUONG_TRINH" ? (
                    <InequalityVisualizer />
                  ) : activeChapterId === "H3_HE_THUC_LUONG" ? (
                    <TriangleVisualizer />
                  ) : activeChapterId === "H4_VECTOR" ? (
                    <VectorVisualizer />
                  ) : (
                    <StatsVisualizer />
                  )}
                </div>
              )}

              {/* Tab 3: Practice quizz panel */}
              {mainTab === "quiz" && (
                <QuizPanel chapterId={activeChapterId} />
              )}
            </div>

            {/* AI Tutor Floating Right panel column */}
            <div className="lg:col-span-4 lg:sticky lg:top-[61px] flex flex-col gap-4">
              <AIPanel />
              
              <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-sans shadow-xs">
                <span>NXB Giáo dục Việt Nam © 2026</span>
                <span className="font-semibold text-slate-800 font-display">Bộ sách Kết nối tri thức</span>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
