---
title: Thiết lập cào dữ liệu
sidebar_position: 2
---

# Quy trình Tải tài liệu & Quản lý Tác vụ ngầm

KEYWORDs được thiết kế để xử lý khối lượng lớn tài liệu PDF doanh nghiệp một cách đáng tin cậy. Module này giải thích cơ chế cào (tải) tài liệu tự động từ Google Drive và quy trình giám sát tác vụ ngầm tránh hiện tượng treo công việc (zombie jobs).

---

## 1. Cơ chế Tải file từ Google Drive siêu vững (Robust Downloads)

Việc tải các tệp báo cáo thường niên lớn từ 20 MB đến 100 MB từ Google Drive thường dễ bị gián đoạn do lỗi mạng. KEYWORDs triển khai một quy trình tải tệp an toàn 4 lớp:

*   **Tự động thử lại với độ trễ lũy thừa (Exponential Backoff):** Nếu gặp lỗi mạng (`HttpError 5xx/429` do quá tải, `socket.timeout`, `ConnectionError`), hệ thống sẽ tự động thử lại tối đa 5 lần với thời gian chờ tăng dần (2 giây → 4 giây → 8 giây → 16 giây → 32 giây).
*   **Giới hạn thời gian phân đoạn (Per-chunk Timeout):** Tệp tin được chia nhỏ thành các phân đoạn 8 MB để tải. Mỗi phân đoạn được bảo vệ bằng một bộ đếm thời gian 120 giây. Nếu phân đoạn bị nghẽn mạng quá thời gian này, kết nối sẽ tự động ngắt và thiết lập lại để tránh treo tiến trình.
*   **Xác minh tệp tin trước khi xác nhận (Verification):** Sau khi tải xong, hệ thống kiểm tra đối chiếu dung lượng file thực tế với metadata trên Drive, kiểm tra chữ ký định dạng `%PDF-` ở đầu file và đối chiếu mã MD5 checksum.
*   **Ghi tệp nguyên tử (Atomic Finalize):** Tệp tin được ghi tạm thời dưới đuôi `.part`. Chỉ khi vượt qua tất cả các bước kiểm tra xác minh, hệ thống mới tiến hành đổi tên file thành `.pdf` để ghi nhận tệp sạch vào không gian làm việc.

---

## 2. Giám sát nhịp đập tác vụ (Heartbeat Daemon)

Khi xử lý các tệp PDF quét (scan) nặng cần chạy OCR, một trang tài liệu có thể mất vài chục giây đến vài phút để nhận diện xong. Điều này dễ khiến hệ thống hiểu nhầm tác vụ bị treo (zombie) và tự động ngắt kết nối. KEYWORDs xử lý vấn đề này qua cơ chế **Heartbeat Daemon**:

*   **Luồng giám sát song song:** Một tiến trình con (daemon thread) được khởi chạy song song với mỗi tác vụ Celery. Tiến trình này chịu trách nhiệm ghi cập nhật trường `heartbeat_at` vào cơ sở dữ liệu SQLite định kỳ mỗi **30 giây**, độc lập với tiến trình OCR hoặc tải file chính.
*   **Phát hiện zombie chính xác:** Hệ thống giám sát (watchdog monitor) chạy mỗi 60 giây. Nó chỉ đánh dấu một công việc là "zombie" (bị treo) nếu quá 5 phút không có tín hiệu nhịp đập cập nhật **ĐỒNG THỜI** kiểm tra trạng thái trên Celery cho thấy ID tác vụ đó không còn nằm trong hàng đợi hoạt động.
*   **Dừng công việc hợp tác (Cooperative Stop):** Khi người dùng bấm dừng công việc (Stop) trên giao diện, daemon thread sẽ phát hiện cờ trạng thái DB thay đổi và chủ động gửi tín hiệu dừng an toàn giữa các lượt xử lý file để tránh làm hỏng cấu trúc tệp đang ghi.

---

## 3. Chính sách Quản lý Công việc độc lập (Job Control Policy)

Hệ thống áp dụng chính sách **Một công việc hoạt động duy nhất cho mỗi người dùng (Per-User Single-Active-Job Policy)** để đảm bảo công bằng tài nguyên và tránh quá tải CPU của VPS:

*   Khi bạn bấm bắt đầu (Start) hoặc tiếp tục (Resume) một job mới, backend sẽ tự động gửi lệnh thu hồi (`celery_app.control.revoke(terminate=True)`) đối với tất cả các tác vụ đang chạy khác thuộc quyền sở hữu của bạn.
*   Các công việc của người dùng khác trong hàng đợi vẫn tiếp tục được xử lý tuần tự và không bị ảnh hưởng.
*   **Tiếp tục công việc dở dang (Resume):** Nếu một công việc bị gián đoạn (do mất mạng hoặc do bạn chủ động bấm dừng), khi nhấn **Resume**, hệ thống sẽ tự động đối chiếu cơ sở dữ liệu để bỏ qua các tệp đã hoàn thành và chỉ xử lý tiếp các tệp đang chờ hoặc bị lỗi trước đó.
