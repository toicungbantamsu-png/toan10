export type ChapterId = "H1_MENH_DE_TAP_HOP" | "H2_BAT_PHUONG_TRINH" | "H3_HE_THUC_LUONG" | "H4_VECTOR" | "H5_THONG_KE";

export interface Lesson {
  id: string;
  title: string;
  pageNumber: number;
  summary: string;
  formulas: string[];
  solvedExamples: {
    question: string;
    solution: string;
  }[];
}

export interface Chapter {
  id: ChapterId;
  title: string;
  shortTitle: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Message {
  role: "user" | "model" | "system";
  text: string;
}
