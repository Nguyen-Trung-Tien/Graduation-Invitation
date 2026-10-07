# QUY TẮC TỐI ƯU HÓA TOKEN VÀ NÂNG CAO HIỆU SUẤT CHO AGENT (TOKEN EFFICIENCY RULES)

Mục tiêu: Giảm thiểu tối đa token tiêu thụ (cả Input Context và Output Tokens) trong mọi tác vụ lập trình.

---

## 1. NGUYÊN TẮC ĐỌC FILE (VIEW_FILE & SEARCH)
- **Đọc có phạm vi (Targeted Line Ranges)**: Luôn xác định vị trí bằng `grep_search` trước khi gọi `view_file`. Sử dụng `StartLine` và `EndLine` để chỉ đọc đoạn mã liên quan (tối đa 40-80 dòng cần sửa), TUYỆT ĐỐI KHÔNG đọc toàn bộ file nếu file > 100 dòng.
- **Loại trừ file rác / file lớn**: 
  - Không bao giờ đọc: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, bundle trong `dist/`, `build/`, `.map` files, ảnh/video/binary.
  - Khi tìm kiếm với `grep_search`, luôn dùng `Includes` cụ thể (ví dụ `src/**/*.jsx`, `src/**/*.tsx`).

## 2. NGUYÊN TẮC SỬA CODE (SURGICAL CODE EDITS)
- **Ưu tiên `replace_file_content`**: Chỉ thay thế đúng đoạn mã cần sửa (khối nhỏ từ 5-30 dòng).
- **Hạn chế `write_to_file` trên file có sẵn**: Không ghi đè toàn bộ file lớn chỉ để đổi vài dòng code (điều này gây tốn hàng trăm đến hàng nghìn output token vô ích).
- Chỉ dùng `write_to_file` khi tạo mới file hoặc khi file ban đầu cực ngắn (< 30 dòng).

## 3. NGUYÊN TẮC CHẠY TERMINAL / SHELL COMMANDS
- **Kiềm chế output của lệnh**:
  - Tránh các lệnh in ra log dài bất tận. Dùng cờ lọc hoặc giới hạn output nếu có thể.
  - Khi chạy build hoặc test, kiểm tra ngắn gọn, không spam log dài.
- Không lặp lại các lệnh đã biết trạng thái hoặc chạy các lệnh thăm dò không cần thiết.

## 4. NGUYÊN TẮC PHẢN HỒI (OUTPUT TOKEN CONTROL)
- **Súc tích, đi thẳng vào vấn đề (Direct & Concise)**:
  - Không chào hỏi dài dòng, không giải thích những điều hiển nhiên.
  - Sau khi sửa code qua tool, KHÔNG copy lại toàn bộ file hay đoạn code lớn trong phần chat. Chỉ tóm tắt 1-2 câu về những gì đã thay đổi và đường dẫn file liên quan.
  - Không lặp lại nội dung đã có trong artifacts.

## 5. BẢO TRÌ CONTEXT WINDOW
- Phân tách tác vụ lớn thành các nhiệm vụ con độc lập.
- Khuyến nghị user mở phiên chat mới khi chuyển sang tính năng khác sau khi một tính năng hoàn tất để giải phóng context window cũ.
