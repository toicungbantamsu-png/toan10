import { Chapter, QuizQuestion, ChapterId } from "./types";

export const CHAPTERS: Chapter[] = [
  {
    id: "H1_MENH_DE_TAP_HOP",
    title: "Chương I: Mệnh đề và tập hợp",
    shortTitle: "Mệnh đề & Tập hợp",
    lessons: [
      {
        id: "bai-1",
        title: "Bài 1: Mệnh đề",
        pageNumber: 5,
        summary: "Mệnh đề là một khẳng định đúng hoặc một khẳng định sai. Một khẳng định không thể vừa đúng vừa sai, hoặc không xác định được tính đúng sai thì không là mệnh đề. Mệnh đề phủ định của $P$ kí hiệu là $\\overline{P}$. Mệnh đề kéo theo $P \\Rightarrow Q$ chỉ sai khi $P$ đúng và $Q$ sai. Mệnh đề tương đương $P \\Leftrightarrow Q$ đúng khi cả hai cùng đúng hoặc cùng sai.",
        formulas: [
          "Mệnh đề kéo theo: P => Q. Định lí thường có dạng P => Q, trong đó P là giả thiết, Q là kết luận.",
          "Mệnh đề đảo của P => Q là Q => P.",
          "Mệnh đề tương đương: P <=> Q (P kéo theo Q và ngược lại).",
          "Kí hiệu ∀ (với mọi) và ∃ (tồn tại)."
        ],
        solvedExamples: [
          {
            question: "Trong các câu sau, câu nào là mệnh đề? Nếu là mệnh đề hãy xác định tính đúng sai:\na) 'Phương trình $3x^2 - 5x + 2 = 0$ có nghiệm nguyên';\nb) '5 < 7 - 3';\nc) 'Thời tiết hôm nay thật đẹp!'",
            solution: "a) Là mệnh đề. Ta có nghiệm $x = 1$ (nguyên) nên đây là mệnh đề ĐÚNG.\nb) Là mệnh đề. Ta có $7 - 3 = 4$, bất đẳng thức $5 < 4$ là SAI nên đây là mệnh đề SAI.\nc) Không phải là mệnh đề vì đây là câu cảm thán biểu lộ cảm xúc, không xác định được tính đúng sai khách quan."
          }
        ]
      },
      {
        id: "bai-2",
        title: "Bài 2: Tập hợp và các phép toán trên tập hợp",
        pageNumber: 12,
        summary: "Tập hợp là khái niệm cơ bản của toán học. Có hai cách mô tả tập hợp: Liệt kê các phần tử hoặc Chỉ ra tính chất đặc trưng. Tập hợp rỗng kí hiệu là $\\varnothing$. Phép toán giao $A \\cap B$, hợp $A \\cup B$, hiệu $A \\setminus B$. Nếu $B \\subset A$, hiệu $A \\setminus B$ được gọi là phần bù của $B$ trong $A$, kí hiệu là $C_A B$. Trực quan hóa bằng biểu đồ Ven.",
        formulas: [
          "Giao của hai tập hợp: A ∩ B = {x | x ∈ A và x ∈ B}",
          "Hợp của hai tập hợp: A ∪ B = {x | x ∈ A hoặc x ∈ B}",
          "Hiệu của hai tập hợp: A \\ B = {x | x ∈ A và x ∉ B}",
          "Phần bù của B trong A (với B ⊂ A): C_A B = A \\ B",
          "Công thức số lượng phần tử: n(A ∪ B) = n(A) + n(B) - n(A ∩ B)"
        ],
        solvedExamples: [
          {
            question: "Cho tập hợp $A = \\{2; 3; 5\\}$ và $B = \\{-1; 2; 3; 4; 6\\}$. Tìm $A \\cap B$, $A \\cup B$ và $A \\setminus B$.",
            solution: "- $A \\cap B$ gồm phần tử chung: $\\{2; 3\\}$\n- $A \\cup B$ gồm tất cả phần tử: $\\{-1; 2; 3; 4; 5; 6\\}$\n- $A \\setminus B$ gồm phần tử thuộc $A$ nhưng thuộc không thuộc $B$: $\\{5\\}$"
          }
        ]
      }
    ]
  },
  {
    id: "H2_BAT_PHUONG_TRINH",
    title: "Chương II: Bất phương trình và hệ bất phương trình bậc nhất hai ẩn",
    shortTitle: "Bất phương trình 2 ẩn",
    lessons: [
      {
        id: "bai-3",
        title: "Bài 3: Bất phương trình bậc nhất hai ẩn",
        pageNumber: 22,
        summary: "Bất phương trình bậc nhất hai ẩn có dạng tổng quát: $ax + by \\le c$ (hoặc $\\ge c$, $< c$, $> c$) trong đó $a, b, c$ là số thực đã cho ($a, b$ không đồng thời bằng 0). Miền nghiệm trên mặt phẳng tọa độ $Oxy$ là nửa mặt phẳng được phân chia bởi đường thẳng $ax + by = c$. Chú ý sử dụng một điểm thử (thường chọn gốc tọa độ $O(0,0)$ nếu đường thẳng không đi qua $O$) để xác định nửa mặt phẳng nghiệm đúng.",
        formulas: [
          "Dạng tổng quát: ax + by ≤ c (hoặc ≥ c, < c, > c)",
          "Đường thẳng biên: d: ax + by = c",
          "Cách biểu diễn: Vẽ đường thẳng d; thế điểm O(0,0) vào để kiểm tra. Nếu thỏa mãn thì giữ lại nửa mặt phẳng chứa O, ngược lại gạch bỏ."
        ],
        solvedExamples: [
          {
            question: "Biểu diễn miền nghiệm của bất phương trình: $x + y \\ge 100$ trên mặt phẳng tọa độ.",
            solution: "- Bước 1: Vẽ đường thẳng d: $x + y = 100$ đi qua hai điểm $(100; 0)$ và $(0; 100)$.\n- Bước 2: Thế gốc tọa độ $O(0,0)$ vào bất phương trình: $0 + 0 = 0 \\ge 100$ (Vô lí).\n- Kết luận: Miền nghiệm là nửa mặt phẳng không chứa gốc tọa độ $O(0,0)$ kể cả biên d (vẽ nét liền)."
          }
        ]
      },
      {
        id: "bai-4",
        title: "Bài 4: Hệ bất phương trình bậc nhất hai ẩn",
        pageNumber: 26,
        summary: "Hệ bất phương trình bậc nhất hai ẩn là hệ gồm hai hay nhiều bất phương trình bậc nhất hai ẩn. Miền nghiệm của hệ là phần giao của các miền nghiệm của từng bất phương trình thuộc hệ. Ứng dụng thực tế: Giải bài toán tối ưu hóa tuyến tính. Giá trị nhỏ nhất hay lớn nhất của biểu thức $F(x; y) = ax + by$ luôn đạt được tại một trong các đỉnh của miền đa giác nghiệm.",
        formulas: [
          "Miền nghiệm của hệ là miền giao của từng bất phương trình, thường tạo thành đa giác lồi.",
          "Hàm mục tiêu đạt giá trị cực trị (max/min) tại các đỉnh của đa giác miền nghiệm."
        ],
        solvedExamples: [
          {
            question: "Tìm giá trị lớn nhất của biểu thức $F(x, y) = 3.5x + 2y$ với miền nghiệm là tứ giác $OABC$ có các đỉnh $O(0,0)$, $A(0,100)$, $B(20,80)$, $C(60,0)$.",
            solution: "Ta tính giá trị $F(x, y)$ tại các đỉnh:\n- Tại $O(0,0)$: $F(0,0) = 0$\n- Tại $A(0,100)$: $F(0,100) = 3.5(0) + 2(100) = 200$\n- Tại $B(20,80)$: $F(20,80) = 3.5(20) + 2(80) = 70 + 160 = 230$\n- Tại $C(60,0)$: $F(60,0) = 3.5(60) + 2(0) = 210$\nSo sánh 4 giá trị trên, ta thấy $F(x, y)$ đạt giá trị lớn nhất là 230 tại đỉnh $B(20, 80)$."
          }
        ]
      }
    ]
  },
  {
    id: "H3_HE_THUC_LUONG",
    title: "Chương III: Hệ thức lượng trong tam giác",
    shortTitle: "Lượng giác & Tam giác",
    lessons: [
      {
        id: "bai-5",
        title: "Bài 5: Giá trị lượng giác của một góc từ 0 đến 180 độ",
        pageNumber: 33,
        summary: "Với mỗi góc $\\alpha$ ($0^\\circ \\le \\alpha \\le 180^\\circ$), ta xác định điểm $M(x_0, y_0)$ trên nửa đường tròn đơn vị sao cho góc $\\widehat{xOM} = \\alpha$. Định nghĩa:\n- $\\sin \\alpha = y_0$\n- $\\cos \\alpha = x_0$\n- $\\tan \\alpha = y_0 / x_0$ (với $\\alpha \\ne 90^\\circ$)\n- $\\cot \\alpha = x_0 / y_0$ (với $\\alpha \\ne 0^\\circ, 180^\\circ$)\nMối liên hệ giữa hai góc bù nhau (tổng bằng $180^\\circ$): Sin bằng nhau, Cos, Tan, Cot đối nhau.",
        formulas: [
          "sin(180° - α) = sin α",
          "cos(180° - α) = -cos α",
          "tan(180° - α) = -tan α (α ≠ 90°)",
          "cot(180° - α) = -cot α (0° < α < 180°)",
          "Công thức cơ bản: sin²α + cos²α = 1, 1 + tan²α = 1/cos²α, 1 + cot²α = 1/sin²α"
        ],
        solvedExamples: [
          {
            question: "Tính các giá trị lượng giác của góc $135^\\circ$ không cần dùng máy tính bỏ túi.",
            solution: "Ta biết góc $135^\\circ$ bù với góc $45^\\circ$ ($135^\\circ + 45^\\circ = 180^\\circ$).\n- $\\sin 135^\\circ = \\sin 45^\\circ = \\sqrt{2}/2$\n- $\\cos 135^\\circ = -\\cos 45^\\circ = -\\sqrt{2}/2$\n- $\\tan 135^\\circ = -\\tan 45^\\circ = -1$\n- $\\cot 135^\\circ = -\\cot 45^\\circ = -1$"
          }
        ]
      },
      {
        id: "bai-6",
        title: "Bài 6: Hệ thức lượng trong tam giác",
        pageNumber: 38,
        summary: "Các định lý quan trọng giúp giải tam giác (tìm các cạnh và góc chưa biết):\n- Định lý cô-sin: Tính một cạnh khi biết hai cạnh kề và góc xen giữa.\n- Định lý sin: Liên hệ tỷ lệ giữa độ dài cạnh với sin của góc đối diện và bán kính đường tròn ngoại tiếp $R$.\n- Các công thức tính diện tích tam giác $S$: dùng chiều cao, dùng góc kề, dùng bán kính nội tiếp $r$, ngoại tiếp $R$, đặc biệt là công thức Heron.",
        formulas: [
          "Định lý cô-sin: a² = b² + c² - 2bc.cos A (hoặc b², c² tương tự)",
          "Định lý sin: a/sin A = b/sin B = c/sin C = 2R",
          "Diện tích S = 1/2.a.h_a = 1/2.bc.sin A = abc/(4R) = p.r (với p là nửa chu vi)",
          "Công thức Heron: S = √[p(p-a)(p-b)(p-c)]"
        ],
        solvedExamples: [
          {
            question: "Cho tam giác $ABC$ có cạnh $a = 13$, $b = 14$, $c = 15$. Tính diện tích tam giác và bán kính $R$ đường tròn ngoại tiếp.",
            solution: "- Tính nửa chu vi: $p = (13 + 14 + 15)/2 = 21$.\n- Tính diện tích bằng công thức Heron:\n  $S = \\sqrt{21 \\cdot (21-13) \\cdot (21-14) \\cdot (21-15)} = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84$.\n- Tính bán kính đường tròn ngoại tiếp $R$:\n  $R = \\frac{abc}{4S} = \\frac{13 \\cdot 14 \\cdot 15}{4 \\cdot 84} = \\frac{2730}{336} = 8.125$."
          }
        ]
      }
    ]
  },
  {
    id: "H4_VECTOR",
    title: "Chương IV: Vectơ",
    shortTitle: "Vectơ hình học",
    lessons: [
      {
        id: "bai-7",
        title: "Bài 7: Các khái niệm mở đầu và định nghĩa",
        pageNumber: 46,
        summary: "Vectơ là một đoạn thẳng có hướng (đã chỉ rõ điểm đầu và điểm cuối). Kí hiệu vectơ có mũi tên trên đầu $\\vec{a}$ hoặc $\\overrightarrow{AB}$. Độ dài của vectơ là khoảng cách giữa điểm đầu và cuối, kí hiệu là $|\\vec{a}|$ hoặc $|\\overrightarrow{AB}|$. Các vectơ cùng phương nếu giá của chúng song song hoặc trùng nhau. Vectơ cùng phương có thể cùng hướng hoặc ngược hướng. Hai vectơ bằng nhau khi chúng cùng hướng và cùng độ dài.",
        formulas: [
          "|AB| thương ứng với độ dài đoạn thẳng AB.",
          "Vectơ-không (kí hiệu là 0): có điểm đầu trùng điểm cuối, độ dài bằng 0, cùng hướng với mọi vectơ.",
          "Hai vectơ bằng nhau kí hiệu: a = b."
        ],
        solvedExamples: [
          {
            question: "Cho hình vuông $ABCD$ có cạnh bằng 1. Tính độ dài các vectơ $\\overrightarrow{AC}$ và $\\overrightarrow{BD}$.",
            solution: "Ta có $|\\overrightarrow{AC}| = AC$ và $|\\overrightarrow{BD}| = BD$. Vì $ABCD$ là hình vuông cạnh bằng 1, theo định lý Pythagore trong tam giác vuông $ABC$, đường chéo:\n$AC = \\sqrt{AB^2 + BC^2} = \\sqrt{1^2 + 1^2} = \\sqrt{2}$.\nDo đó, độ dài cả hai vectơ $\\overrightarrow{AC}$ và $\\overrightarrow{BD}$ đều bằng $\\sqrt{2}$."
          }
        ]
      },
      {
        id: "bai-8",
        title: "Bài 8: Tổng và hiệu của hai vectơ",
        pageNumber: 51,
        summary: "- Tổng: Cho hai vectơ $\\vec{a}$ và $\\vec{b}$. Vẽ nối tiếp điểm cuối của $\\vec{a}$ với điểm đầu của $\\vec{b}$. Vectơ nối điểm đầu đầu tiên tới điểm cuối cuối cùng là tổng $\\vec{a} + \\vec{b}$. Quy tắc ba điểm: $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$. Quy tắc hình bình hành: Nếu $ABCD$ là hình bình hành thì $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$.\n- Hiệu: Hai vectơ đối nhau có cùng độ dài nhưng ngược hướng. Hiệu $\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})$. Quy tắc hiệu: $\\overrightarrow{OB} - \\overrightarrow{OA} = \\overrightarrow{AB}$.",
        formulas: [
          "Quy tắc ba điểm: AB + BC = AC",
          "Quy tắc hình bình hành: AB + AD = AC (ABCD là hình bình hành)",
          "Hiệu hai vectơ: OB - OA = AB"
        ],
        solvedExamples: [
          {
            question: "Chứng minh rằng với bốn điểm bất kì $A, B, C, D$, luôn có đẳng thức:\n$\\overrightarrow{AB} + \\overrightarrow{CD} = \\overrightarrow{AD} + \\overrightarrow{CB}$.",
            solution: "Biến đổi vế trái bằng cách chèn điểm:\nVP = $\\overrightarrow{AD} + \\overrightarrow{CB} = (\\overrightarrow{AB} + \\overrightarrow{BD}) + (\\overrightarrow{CD} + \\overrightarrow{DB}) = \\overrightarrow{AB} + \\overrightarrow{CD} + (\\overrightarrow{BD} + \\overrightarrow{DB}) = \\overrightarrow{AB} + \\overrightarrow{CD} + \\vec{0} = \\overrightarrow{AB} + \\overrightarrow{CD}$ = VT. (Đpcm)"
          }
        ]
      },
      {
        id: "bai-9",
        title: "Bài 9: Tích của một vectơ với một số",
        pageNumber: 55,
        summary: "Tích của một vectơ $\\vec{a} \\ne \\vec{0}$ với một số thực $k$ là một vectơ, kí hiệu là $k\\vec{a}$, có độ dài bằng $|k| \\cdot |\\vec{a}|$, cùng hướng mối với $\\vec{a}$ nếu $k \\ge 0$, ngược hướng nếu $k < 0$. \nĐặc trưng hình học: Ba điểm phân biệt $A, B, C$ thẳng hàng khi và chỉ khi có số $k$ để $\\overrightarrow{AB} = k\\overrightarrow{AC}$. Hệ thức trung điểm: $I$ là trung điểm $AB$ thì $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec{0}$. Hệ thức trọng tâm: $G$ là trọng tâm tam giác $ABC$ thì $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec{0}$.",
        formulas: [
          "|ka| = |k|.|a|",
          "I là trung điểm AB: IA + IB = 0, hoặc với điểm O bất kì: OA + OB = 2OI",
          "G là trọng tâm tam giác ABC: GA + GB + GC = 0, hoặc với điểm O: OA + OB + OC = 3OG"
        ],
        solvedExamples: [
          {
            question: "Cho tam giác $ABC$ có trung tuyến $AM$. Gọi $I$ là trung điểm của $AM$. Biểu diễn vectơ $\\overrightarrow{BI}$ theo hai vectơ $\\overrightarrow{BA}$ và $\\overrightarrow{BC}$.",
            solution: "Ta phân tích:\n- Vì $I$ là trung điểm của $AM$ nên: $\\overrightarrow{BI} = \\frac{1}{2}(\\overrightarrow{BA} + \\overrightarrow{BM})$.\n- Mà $M$ là trung điểm $BC$ nên: $\\overrightarrow{BM} = \\frac{1}{2}\\overrightarrow{BC}$.\n- Thay vào đẳng thức trên, ta có:\n  $\\overrightarrow{BI} = \\frac{1}{2}\\left(\\overrightarrow{BA} + \\frac{1}{2}\\overrightarrow{BC}\\right) = \\frac{1}{2}\\overrightarrow{BA} + \\frac{1}{4}\\overrightarrow{BC}$."
          }
        ]
      },
      {
        id: "bai-10",
        title: "Bài 10: Vectơ trong mặt phẳng tọa độ",
        pageNumber: 60,
        summary: "Gắn hệ trục tọa độ $Oxy$ với hai vectơ đơn vị $\\vec{i}, \\vec{j}$ song song tương ứng với trục $Ox, Oy$. Khi đó mọi vectơ $\\vec{u}$ đều biểu diễn duy nhất dưới dạng $\\vec{u} = x\\vec{i} + y\\vec{j}$. Ta nói cặp số $(x; y)$ là tọa độ của vectơ $\\vec{u}$, kí hiệu là $\\vec{u} = (x; y)$. Điểm $M$ có tọa độ trùng với tọa độ vectơ $\\overrightarrow{OM}$. Tọa độ vectơ khi biết hai điểm: $\\overrightarrow{AB} = (x_B - x_A; y_B - y_A)$.",
        formulas: [
          "u = (x; y) <=> u = x.i + y.j",
          "Phép toán: u + v = (x_u + x_v; y_u + y_v), k.u = (kx; ky)",
          "Tọa độ vectơ: AB = (x_B - x_A; y_B - y_A)",
          "Trung điểm I của AB: x_I = (x_A + x_B)/2, y_I = (y_A + y_B)/2",
          "Trọng tâm G của ABC: x_G = (x_A + x_B + x_C)/3, y_G = (y_A + y_B + y_C)/3"
        ],
        solvedExamples: [
          {
            question: "Cho $A(1; -2)$, $B(3; 2)$, $C(7; 4)$. Tìm tọa độ trọng tâm $G$ của tam giác $ABC$.",
            solution: "Tọa độ trọng tâm $G$ được tính bằng trung bình cộng tọa độ các đỉnh:\n$x_G = (x_A + x_B + x_C)/3 = (1 + 3 + 7)/3 = 11/3 \\approx 3.67$.\n$y_G = (y_A + y_B + y_C)/3 = (-2 + 2 + 4)/3 = 4/3 \\approx 1.33$.\nVậy tọa độ trọng tâm $G$ là $(11/3; 4/3)$."
          }
        ]
      },
      {
        id: "bai-11",
        title: "Bài 11: Tích vô hướng của hai vectơ",
        pageNumber: 66,
        summary: "Tích vô hướng của hai vectơ khác không $\\vec{u}$ và $\\vec{v}$ là một số (vô hướng), kí hiệu là $\\vec{u} \\cdot \\vec{v}$, định nghĩa bằng công thức: $\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})$. Hai vectơ vuông góc khi tích vô hướng bằng 0. Biểu thức tọa độ trong hệ trục Oxy: $\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2$. Ứng dụng: tính góc giữa hai vectơ và tính độ dài vectơ.",
        formulas: [
          "Định nghĩa: u . v = |u| . |v| . cos(u, v)",
          "Biểu thức tọa độ: u . v = x_1.x_2 + x_2.y_2 (với u = (x_1; y_1), v = (x_2; y_2))",
          "Độ dài vectơ: |u| = √(x² + y²)",
          "Cos góc giữa u và v: cos(u, v) = (x_1.x_2 + y_1.y_2) / [√(x_1² + y_1²) . √(x_2² + y_2²)]"
        ],
        solvedExamples: [
          {
            question: "Cho $\\vec{u} = (2; -3)$ và $\\vec{v} = (5; 3)$. Tính tích vô hướng $\\vec{u} \\cdot \\vec{v}$ và độ dài mỗi vectơ.",
            solution: "- Tích vô hướng: $\\vec{u} \\cdot \\vec{v} = x_u \\cdot x_v + y_u \\cdot y_v = 2 \\cdot 5 + (-3) \\cdot 3 = 10 - 9 = 1$.\n- Độ dài $\\vec{u}$: $|\\vec{u}| = \\sqrt{2^2 + (-3)^2} = \\sqrt{4 + 9} = \\sqrt{13} \\approx 3.61$.\n- Độ dài $\\vec{v}$: $|\\vec{v}| = \\sqrt{5^2 + 3^2} = \\sqrt{25 + 9} = \\sqrt{34} \\approx 5.83$."
          }
        ]
      }
    ]
  },
  {
    id: "H5_THONG_KE",
    title: "Chương V: Các số đặc trưng của mẫu số liệu không ghép nhóm",
    shortTitle: "Thống kê thực tế",
    lessons: [
      {
        id: "bai-12",
        title: "Bài 12: Số gần đúng và sai số",
        pageNumber: 73,
        summary: "Trong đo đạc thực tế, các số liệu thường chỉ gần đúng. Gọi $a$ là số gần đúng, $\\overline{a}$ là số đúng. Sai số tuyệt đối là $\\Delta_a = |a - \\overline{a}|$. Sai số tương đối là $\\delta_a = \\Delta_a / |a|$. Làm tròn số gần đúng tùy thuộc vào độ chính xác $d$ yêu cầu: nếu độ chính xác ở hàng chục, ta làm tròn số liệu tới hàng trăm. Chữ số đáng tin là chữ số mà sai số tuyệt đối không vượt quá nửa đơn vị đo của hàng tương ứng.",
        formulas: [
          "Sai số tuyệt đối: Δ_a = |a - a_đúng|",
          "Mức sai số cho phép: a - d ≤ a_đúng ≤ a + d, viết gọn là a ± d",
          "Sai số tương đối: δ_a = Δ_a / |a| ≈ d / |a|"
        ],
        solvedExamples: [
          {
            question: "Chiều cao của đỉnh núi Everest được công bố là $8\\,848.86$ m với sai số tuyệt đối không quá $0.05$ m. Hãy viết kết quả dưới dạng cận sai số và ước lượng sai số tương đối.",
            solution: "- Biểu diễn cận sai số: $8\\,848.86 \\pm 0.05$ m.\n- Ước lượng sai số tương đối:\n  $\\delta_a \\approx \\frac{d}{|a|} = \\frac{0.05}{8\\,848.86} \\approx 0.00000565 \\approx 0.00057\\%$ (quy đổi ra phần trăm)."
          }
        ]
      },
      {
        id: "bai-13",
        title: "Bài 13: Các số đặc trưng đo xu thế trung tâm",
        pageNumber: 78,
        summary: "Các số liệu giúp xác định xu thế trung bình của mẫu gồm:\n- Số trung bình cộng $\\bar{X}$: tính tổng tất cả chia cho số phần tử $n$.\n- Trung vị $M_e$: Số nằm chính giữa khi mẫu được sắp xếp tăng dần. (Nếu $n$ lẻ, là vị trí trung tâm; nếu $n$ chẵn, là trung bình cộng hai số trung tâm).\n- Tứ phân vị $Q_1, Q_2, Q_3$: Chia dữ liệu đã sắp xếp thành 4 phần bằng nhau. $Q_2$ chính là trung vị, $Q_1$ là trung vị nửa trái, $Q_3$ là trung vị nửa phải.\n- Mốt $M_o$: Điểm giá trị có tần số xuất hiện nhiều nhất.",
        formulas: [
          "Số trung bình: X_bar = (x_1 + x_2 + ... + x_n) / n",
          "Trung vị: Q_2",
          "Tứ phân vị dưới (Q_1) và Tứ phân vị trên (Q_3)",
          "Mốt: giá trị xuất hiện nhiều lần nhất trong bảng tần số."
        ],
        solvedExamples: [
          {
            question: "Cho mẫu số liệu điểm thi toán của học sinh: $4, 4, 4, 4, 20$. Tìm số trung bình và trung vị để giải thích tại sao số trung bình không phản ánh đúng xu thế trung tâm trong trường hợp này.",
            solution: "- Số trung bình: $\\bar{X} = (4 + 4 + 4 + 4 + 20)/5 = 36/5 = 7.2$.\n- Trung vị: Sắp xếp sẵn $4, 4, [4], 4, 20 \\Rightarrow M_e = 4$.\n- Nhận xét: Số 20 là một 'giá trị bất thường' quá lớn kéo số trung bình lên $7.2$ trong khi hầu hết học sinh đều chỉ có điểm $4$. Do đó, trung vị $M_e = 4$ phản ánh chính xác nhất học lực đa số học sinh hơn là số trung bình."
          }
        ]
      },
      {
        id: "bai-14",
        title: "Bài 14: Các số đặc trưng đo độ phân tán",
        pageNumber: 84,
        summary: "Đo lường mức độ biến động, lệch lạc của dữ kiện xung quanh số trung tâm:\n- Khoảng biến thiên $R$: giá trị lớn nhất trừ giá trị nhỏ nhất.\n- Khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1$: Đo độ phân tán của 50% dữ liệu ở giữa.\n- Phương sai $s^2$ và Độ lệch chuẩn $s = \\sqrt{s^2}$: Đo độ lệch bình phương trung bình của các giá trị so với số trung bình. Độ lệch chuẩn càng lớn chứng tỏ dữ liệu càng phân tán rộng mất ổn định.\n- Nhận diện số liệu bất thường bằng Box Plot: Điểm $x$ là bất thường nếu nằm ngoài dải $[Q_1 - 1.5\\Delta_Q; Q_3 + 1.5\\Delta_Q]$.",
        formulas: [
          "Khoảng biến thiên: R = X_max - X_min",
          "Khoảng tứ phân vị: Δ_Q = Q_3 - Q_1",
          "Phương sai: s² = Σ(x_i - X_bar)² / n (hoặc n-1)",
          "Độ lệch chuẩn: s = √s²",
          "Giá trị bất thường: < Q_1 - 1.5*Δ_Q hoặc > Q_3 + 1.5*Δ_Q"
        ],
        solvedExamples: [
          {
            question: "Mẫu số liệu lượng calo tiêu thụ hàng ngày của 5 ngày: $43, 45, 46, 41, 40$. Tính phương sai và độ lệch chuẩn.",
            solution: "- Số trung bình: $\\bar{X} = (43+45+46+41+40)/5 = 215/5 = 43$.\n- Tính các độ lệch bình phương:\n  $(43-43)^2 = 0$; $(45-43)^2 = 4$; $(46-43)^2 = 9$; $(41-43)^2 = 4$; $(40-43)^2 = 9$.\n- Tổng các độ lệch bình phương: $0 + 4 + 9 + 4 + 9 = 26$.\n- Phương sai mẫu: $s^2 = 26 / 5 = 5.2$.\n- Độ lệch chuẩn: $s = \\sqrt{5.2} \\approx 2.28$."
          }
        ]
      }
    ]
  }
];

export const QUIZ_QUESTIONS: Record<ChapterId, QuizQuestion[]> = {
  H1_MENH_DE_TAP_HOP: [
    {
      id: "q1-1",
      question: "Câu nào sau đây KHÔNG phải là một mệnh đề?",
      options: [
        "Tam giác đều là tam giác có ba cạnh bằng nhau.",
        "3 < 1.",
        "4 - 5 = 1.",
        "Bạn học giỏi quá!"
      ],
      correctIndex: 3,
      explanation: "Câu 'Bạn học giỏi quá!' là câu cảm thán biểu lộ tình cảm, không thể xác định tính đúng sai khách quan nên không phải là mệnh đề."
    },
    {
      id: "q1-2",
      question: "Cho mệnh đề chứa biến P(n): 'n chia hết cho 2' với n là số tự nhiên. Với giá trị n nào sau đây thì P(n) là mệnh đề đúng?",
      options: [
        "n = 5",
        "n = 7",
        "n = 10",
        "n = 15"
      ],
      correctIndex: 2,
      explanation: "Với $n=10$, mệnh đề trở thành '10 chia hết cho 2', đây là một mệnh đề đúng (vì 10 là số chẵn). Với các giá trị lẻ khác, mệnh đề là sai."
    },
    {
      id: "q1-3",
      question: "Phát biểu mệnh đề phủ định của mệnh đề P: '17 là số chính phương'.",
      options: [
        "P_phu_dinh: '17 là số nguyên tố'.",
        "P_phu_dinh: '17 không phải là số chính phương'.",
        "P_phu_dinh: 'Hình hộp không phải là hình lăng trụ'.",
        "P_phu_dinh: '17 là số chẵn'."
      ],
      correctIndex: 1,
      explanation: "Phủ định của mệnh đề chứa 'là' ta thêm từ 'không phải là'. Phủ định của '17 là số chính phương' là '17 không phải là số chính phương'."
    },
    {
      id: "q1-4",
      question: "Cho tập hợp A = {a; b; c}. Tập hợp A có tất cả bao nhiêu tập hợp con?",
      options: [
        "4",
        "6",
        "8",
        "10"
      ],
      correctIndex: 2,
      explanation: "Tập hợp có $n$ phần tử thì có $2^n$ tập con. Với $n=3$, số tập con của A là $2^3 = 8$ tập con (gồm rỗng, 3 tập đơn phần tử, 3 tập hai phần tử và chính nó)."
    }
  ],
  H2_BAT_PHUONG_TRINH: [
    {
      id: "q2-1",
      question: "Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?",
      options: [
        "2x + 3y > 6",
        "2x² + y ≤ 0",
        "2x² - y ≥ 1",
        "1/x + y < 5"
      ],
      correctIndex: 0,
      explanation: "Dạng tổng quát của bất phương trình bậc nhất hai ẩn là $ax + by \\le c$. Ở đáp án A, số lũy thừa của $x$ và $y$ đều là bậc 1, nên là bất phương trình bậc nhất hai ẩn."
    },
    {
      id: "q2-2",
      question: "Cặp số (x; y) = (100; 100) có là nghiệm của bất phương trình x + y < 200 hay không?",
      options: [
        "Có là nghiệm",
        "Không là nghiệm",
        "Chỉ là nghiệm khi x, y nghịch biến",
        "Không xác định được"
      ],
      correctIndex: 1,
      explanation: "Thế $x=100$, $y=100$ vào bất phương trình: $100 + 100 = 200 < 200$ (Vô lý). Do đó cặp số này không phải là nghiệm."
    },
    {
      id: "q2-3",
      question: "Bác An đầu tư 1.2 tỉ đồng vào ba loại quỹ lãi suất khác nhau. Đây là dạng ứng dụng của chương nào?",
      options: [
        "Chương I: Mệnh đề tập hợp",
        "Chương II: Hệ bất phương trình bậc nhất hai ẩn",
        "Chương III: Hệ thức lượng trong tam giác",
        "Chương V: Thống kê số liệu"
      ],
      correctIndex: 1,
      explanation: "Việc phân bổ vốn đầu tư có ràng buộc nguồn vốn tổng thể và kì vọng lợi nhuận luôn được biểu diễn dưới dạng hệ bất phương trình bậc nhất hai ẩn để tìm nghiệm tối ưu đa giác."
    }
  ],
  H3_HE_THUC_LUONG: [
    {
      id: "q3-1",
      question: "Cho tam giác ABC có góc B = 135°. Khẳng định nào sau đây là đúng?",
      options: [
        "S = 1/2 * ca",
        "S = - (√2 / 4) * ac",
        "S = (√2 / 4) * ac",
        "S = (√2 / 2) * ca"
      ],
      correctIndex: 2,
      explanation: "Diện tích $S = \\frac{1}{2}ac \\sin B = \\frac{1}{2}ac \\sin 135^\\circ = \\frac{1}{2}ac \\frac{\\sqrt{2}}{2} = \\frac{\\sqrt{2}}{4}ac$."
    },
    {
      id: "q3-2",
      question: "Cho tam giác ABC có các cạnh b = 8, c = 5 và góc A = 60°. Tính độ dài cạnh a bằng định lý cô-sin.",
      options: [
        "a = √129",
        "a = 7",
        "a = 10",
        "a = √49 = 7"
      ],
      correctIndex: 3,
      explanation: "Theo định lí cô-sin: $a^2 = b^2 + c^2 - 2bc \\cos A = 8^2 + 5^2 - 2 \\cdot 8 \\cdot 5 \\cos 60^\\circ = 64 + 25 - 80 \\cdot 0.5 = 89 - 40 = 49$. Do đó $a = \\sqrt{49} = 7$."
    },
    {
      id: "q3-3",
      question: "Với mọi góc α từ 0° đến 180°, công thức lượng giác cơ bản nào sau đây luôn đúng?",
      options: [
        "sin²α + cos²α = 1",
        "1 + tan²α = 1/sin²α",
        "sin α = cos(180° - α)",
        "cos α = sin(180° - α)"
      ],
      correctIndex: 0,
      explanation: "Tổng bình phương của sin và cos của cùng một góc $\\alpha$ luôn luôn bằng 1, tức là $\\sin^2\\alpha + \\cos^2\\alpha = 1$."
    }
  ],
  H4_VECTOR: [
    {
      id: "q4-1",
      question: "Tập hợp các điểm đầu trùng điểm cuối của một vectơ được gọi là gì?",
      options: [
        "Vectơ đồng phẳng",
        "Vectơ cùng hướng",
        "Vectơ-không",
        "Trục tọa độ"
      ],
      correctIndex: 2,
      explanation: "Vectơ có điểm đầu trùng với điểm cuối được đặt tên chuyên biệt là vectơ-không (kí hiệu là $\\vec{0}$), có độ dài bằng 0."
    },
    {
      id: "q4-2",
      question: "Cho hình vuông ABCD có cạnh bằng a. Khẳng định nào sau đây là ĐÚNG về độ dài hiệu vectơ |AB - AD|?",
      options: [
        "|AB - AD| = 0",
        "|AB - AD| = a",
        "|AB - AD| = a√2",
        "|AB - AD| = 2a"
      ],
      correctIndex: 2,
      explanation: "Theo quy tắc hiệu: $\\overrightarrow{AB} - \\overrightarrow{AD} = \\overrightarrow{DB}$. Độ dài của vectơ này chính là độ dài đường chéo $BD$ của hình vuông cạnh $a$, tức là $a\\sqrt{2}$."
    },
    {
      id: "q4-3",
      question: "Cho u = (x1; y1) và v = (x2; y2). Hệ thức tính tích vô hướng u · v bằng tọa độ là:",
      options: [
        "u · v = x1.x2 + y1.y2",
        "u · v = x1.y2 + x2.y1",
        "u · v = x1.x2 - y1.y2",
        "u · v = √(x1.x2 + y1.y2)"
      ],
      correctIndex: 0,
      explanation: "Trong hệ trục tọa độ vuông góc $Oxy$, tích vô hướng của hai vectơ là tổng tích của hoành độ với nhau và tung độ với nhau: $\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2$."
    }
  ],
  H5_THONG_KE: [
    {
      id: "q5-1",
      question: "Cho mẫu số liệu điểm kiểm tra: 8, 7, 10, 6, 9. Tìm số trung bình cộng của mẫu này.",
      options: [
        "7.5",
        "8.0",
        "8.2",
        "8.5"
      ],
      correctIndex: 1,
      explanation: "X_bar = $(8 + 7 + 10 + 6 + 9) / 5 = 40 / 5 = 8.0$."
    },
    {
      id: "q5-2",
      question: "Làm tròn số gần đúng a = 18,2857 với độ chính xác d = 0,01. Kết quả làm tròn tương ứng là:",
      options: [
        "18.28",
        "18.29",
        "18.3",
        "18.0"
      ],
      correctIndex: 1,
      explanation: "Yêu cầu độ chính xác $d = 0.01$ (hàng phần trăm), ta phải làm tròn đến hàng phần mười liền trước nó (hoặc quy tắc thông thường là làm tròn chữ số ở hàng phần trăm dựa trên hàng tiếp theo: chữ số thứ 3 sau dấu phẩy là 5 (>=5) nên tăng chữ số 8 thành 9), thu được $18.29$."
    },
    {
      id: "q5-3",
      question: "Giá trị nằm ngoài biên nào sau đây trong sơ đồ hộp (Box-Plot) thì được coi là giá trị bất thường (outlier)?",
      options: [
        "Hoặc < Q1 - 1.5*IQR hoặc > Q3 + 1.5*IQR",
        "Hoặc < Q1 - 3*IQR hoặc > Q3 + 3*IQR",
        "Chỉ tính các số nằm ngoài khoảng [X_min; X_max]",
        "Các số lớn hơn 2 lần số trung bình"
      ],
      correctIndex: 0,
      explanation: "Theo chuẩn sách Toán 10 Kết nối tri thức, một giá trị $x$ được xem là số liệu bất thường nếu nằm ngoài dải $[Q_1 - 1.5 \\Delta_Q; Q_3 + 1.5 \\Delta_Q]$, với $\\Delta_Q$ là khoảng tứ phân vị $IQR = Q_3 - Q_1$."
    }
  ]
};
