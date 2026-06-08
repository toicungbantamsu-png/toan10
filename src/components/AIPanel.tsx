import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, User, RefreshCw, HelpCircle } from "lucide-react";
import { Message } from "../types";

export default function AIPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Chào bạn nhé! Mình là Gia sư Toán học Trí tuệ Nhân tạo lớp 10. Mình được tối ưu hóa để đồng hành cùng bạn chinh phục tất cả nội dung trong sách giáo khoa Toán 10 (Kết nối tri thức với cuộc sống).\n\nBạn có bất kì thắc mắc nào về định lý, công thức, bài tập tự luận hay cần giải thích chi tiết đáp án trắc nghiệm không? Hãy nhập câu hỏi ở ô bên dưới nhé! ✏️",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to state
    const updatedMessages = [...messages, { role: "user" as const, text: userMessage }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Prepare history to send to server (excluding initial greeting to keep token usage small & highly responsive)
      const chatHistory = updatedMessages
        .slice(1, -1) // Exclude first greeting and current last message
        .map((m) => ({
          role: m.role,
          content: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: chatHistory,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: `⚠️ Lỗi máy chủ: ${data.error || "Không thể tải phản hồi từ trợ lý lúc này. Bạn hãy thử kiểm tra lại kết nối mạng nhé!"}`,
          },
        ]);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "⚠️ Lỗi kết nối mạng: Không nhận được phản hồi từ hệ thống. Bạn vui lòng thử lại sau ít phút hoặc nạp lại trang nhé!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch sử trò chuyện và bắt đầu phiên học mới không?")) {
      setMessages([
        {
          role: "model",
          text: "Phiên học mới đã được bắt đầu! Bạn muốn mình hỗ trợ ôn tập kiến thức hay giải đáp bài tập cụ thể nào nào? 📚",
        },
      ]);
    }
  };

  // Quick prompt buttons
  const sendQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 flex flex-col h-[520px] shadow-sm overflow-hidden">
      {/* Upper header */}
      <div className="bg-gradient-to-r from-indigo-650 to-indigo-805 px-4 py-3.5 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-xl">
            <Sparkles className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block leading-none text-indigo-205">TUTOR BOT</span>
            <span className="text-sm font-bold block leading-snug">Gia sư AI trợ giúp giải bài</span>
          </div>
        </div>
        
        <button
          onClick={handleReset}
          title="Bắt đầu lại phiên học"
          className="text-white/80 hover:text-white transition p-1.5 hover:bg-white/10 rounded-xl cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Balloon viewport */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-55">
        {messages.map((m, idx) => {
          const isAI = m.role === "model";
          return (
            <div key={idx} className={`flex gap-2.5 max-w-[85%] ${isAI ? "self-start" : "self-end flex-row-reverse"}`}>
              {/* Avatar balloon */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${isAI ? "bg-indigo-600 text-white" : "bg-slate-800 text-white"}`}>
                {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Chat message text */}
              <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${isAI ? "bg-white text-slate-800 border" : "bg-indigo-600 text-white"}`}>
                <div className="whitespace-pre-line break-words font-sans">
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-2.5 max-w-[85%] self-start animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="rounded-2xl px-4 py-3 text-xs text-slate-500 bg-white border shadow-xs italic flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-indigo-650 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-indigo-705 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              <span>Gia sư AI đang viết lời giải chi tiết...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick assistance suggestion triggers */}
      <div className="bg-white border-t border-slate-100 p-2 shrink-0 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          onClick={() => sendQuickPrompt("Giải thích định lý cô-sin trong tam giác và ví dụ")}
          className="bg-slate-100 hover:bg-slate-200 border rounded-lg px-2.5 py-1 text-[10px] font-medium text-slate-700 transition cursor-pointer"
        >
          Định lý Cô-sin là gì?
        </button>
        <button
          onClick={() => sendQuickPrompt("Làm sao để biết một số có phải là giá trị bất thường (outlier) trong thống kê?")}
          className="bg-slate-100 hover:bg-slate-200 border rounded-lg px-2.5 py-1 text-[10px] font-medium text-slate-700 transition cursor-pointer"
        >
          Nhận diện số bất thường?
        </button>
        <button
          onClick={() => sendQuickPrompt("Tại sao mệnh đề kéo theo P => Q chỉ sai khi P đúng Q sai?")}
          className="bg-slate-100 hover:bg-slate-200 border rounded-lg px-2.5 py-1 text-[10px] font-medium text-slate-700 transition cursor-pointer"
        >
          Giải thích tính đúng sai Mệnh đề kéo theo
        </button>
      </div>

      {/* Sending form input */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex gap-2 shrink-0 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hãy hỏi công thức hoặc nhờ AI giải thích..."
          className="flex-1 border rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 font-sans"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition duration-150 flex items-center justify-center cursor-pointer shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
