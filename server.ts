import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely with key verification
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
} catch (error) {
  console.error("Lỗi khi khởi tạo Gemini:", error);
}

// API endpoint for AI Math Tutor Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Tin nhắn không được để trống." });
    }

    if (!ai) {
      return res.json({
        text: "Xin chào! Hiện tại tính năng Gia sư AI đang ở chế độ offline do chưa được cấu hình API Key. Tuy nhiên, bạn vẫn có thể sử dụng đầy đủ các công cụ tương tác trực quan, học lý thuyết và làm bài tập trắc nghiệm ở các phần bên trái nhé! Chúc bạn học tốt!",
      });
    }

    // Format history for Gemini chat if present
    // The @google/genai SDK chats.create can take systemInstruction and configs.
    // If we just want a simple robust generation, we can pass system instruction in the chat start.
    const systemInstruction = 
      "Bạn là Gia sư Trí tuệ Nhân tạo chuyên dạy Toán lớp 10 theo chương trình sách giáo khoa 'Kết nối tri thức với cuộc sống' tại Việt Nam. " +
      "Hãy giải thích chi tiết, từng bước một các câu hỏi Toán học, bài tập hoặc định lý của học sinh. " +
      "Cố gắng hướng dẫn học sinh tư duy thay vì chỉ đưa ra đáp án ngay lập tức. " +
      "Luôn thân thiện, khăng khít, khích lệ và sử dụng ngôn từ dễ hiểu của học sinh phổ thông. " +
      "QUAN TRỌNG: Hãy sử dụng định dạng LaTeX chuẩn để hiển thị công thức Toán học đẹp mắt. " +
      "Dùng dấu đô-la đơn $...$ cho công thức viết cùng dòng và cặp dấu đô-la kép $$...$$ cho công thức hiển thị riêng một dòng lớn (ví dụ: $a^2 + b^2 = c^2$, hoặc hệ bất phương trình, vectơ...).";

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      // Set initial history if provided
      history: history ? history.map((item: any) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.content || item.text }]
      })) : []
    });

    const response = await chatInstance.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Lỗi API Gemini:", err);
    res.status(500).json({ 
      error: "Không thể kết nối đến máy chủ AI. Vui lòng thử lại sau.", 
      details: err.message 
    });
  }
});

// Configure Vite or serve static assets
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Đang khởi động máy chủ ở chế độ Phát triển (Vite Middleware)...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Mount Vite's middleware
    app.use(vite.middlewares);
  } else {
    console.log("Đang khởi động máy chủ ở chế độ Sản xuất (Production)...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ứng dụng đang chạy tại cổng http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
