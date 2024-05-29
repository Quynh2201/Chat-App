# Chat-App

## Overview
Chat-App là một ứng dụng trò chuyện thời gian thực, cho phép người dùng giao tiếp với nhau thông qua tin nhắn văn bản, hình ảnh, video. Ứng dụng được thiết kế để dễ sử dụng và bảo mật, cung cấp một nền tảng để người dùng kết nối và trò chuyện một cách hiệu quả.

## Feature
- Log in / Sign up: Đăng nhập / Đăng kí tài khoản
- User information: Chỉnh sửa thông tin cá nhân bao gồm: Username và Avatar
- Search User: Tìm kiếm danh sách người dùng thông qua Username hoặc Email
- Real time message: Gửi và nhận tin nhắn tức thì
- Marking unread messages: Đánh dấu những tin nhắn chưa đọc 

## Installation
1. Clone repository từ GitHub:
2. Di chuyển đến thư mục dự án
3. Cài đặt các phụ thuộc bằng npm: npm install 
4. Cài đăt các thư viện: nodejs/expressjs, socket.io, redux, tailwindcss, nodemon
   - Phía client:
     - npm install -D tailwindcss
     - npm install -D daisyui@latest
     - npm install @reduxjs/toolkit react-redux
     - npm install socket.io-client
   - Phía server:
     - npm install express socket.io mongoose cors
     - npm install --save-dev nodemon   
5. Khởi động ứng dụng

## Usage
1. Nhấp vào nút sign up để tạo tài khoản mới hoặc nút Log in để truy cập tài khoản.
   - Log in:
     - Tài khoản 1:
         - Email: chanbaekhun22012003@gmail.com
         - Password: 1234567
     - Tài khoản 2:
         - Email: john@gmail.com
         - Password: 1234567
   - Sign up: Yêu cầu nhập tất cả các trường thông tin 
2. Sau khi đăng nhập hoặc đăng kí thành công, màn hình sẽ hiển thị trang homepage
   - AddUser:
       - Ấn vào icon AddUser góc trái màn hình: Hiển thị danh sách các tài khoản trong ứng dụng
       - Thực hiện tìm kiếm tài khoản theo username hoặc email ở ô input
       - Ấn nút X ở góc bên phải màn hình để thoát khỏi trang
   - Edit Information:
       - Ấn vào Avatar ở góc dưới bên trái màn hình
       - Thực hiện chỉnh sửa thông tin cá nhân: username hoặc avatar
       - Sau khi thay đổi, nhấn Save để lưu dữ liệu, nếu muốn thoát mà không lưu dữ liệu, nhấn Cancel
   - Log out:
       - Ấn icon Log out ở góc dưới cùng bên trái màn hình
       - Hệ thống sẽ thoát khỏi tài khoản quay về trang chủ của chương trình
   - List Conservation:
       - Hệ thống sẽ hiển thị danh sách các tin nhắn từ trước
       - Nếu có tin nhắn mới, danh sách sẽ cập nhập thông báo và đẩy đoạn chat lên đầu
   - Chat:
       - Khi ấn vào một trong những danh sách người dùng hoặc cuộc trò chuyện trước đó, màn hình sẽ hiển thị tin nhắn và tự động scroll đến tin nhắn gần nhất
       - Thực hiện gửi tin nhắn bằng văn bản ở ô input phía dưới hoặc gửi ảnh, video ở icon + bên trái input
       - Ảnh hoặc video sẽ được hiển thị trên màn hình, nếu muốn thay đổi thì ấn nút X ở góc trên bên phải
       - Sau khi nhập văn bản, ảnh, video thì ấn icon Send ở bên phải input
       - Tin nhắn sẽ được hiển thị trên đoạn chat kèm thời gian thực
       - Hệ thống sẽ cập nhật và gửi thông báo cho phía bên kia cuộc trò chuyện 

## Contributing

Tôi rất trân trọng các đóng góp từ bạn. Nếu bạn muốn đóng góp vào dự án, vui lòng tạo pull request và chúng tôi sẽ xem xét.

## Contact

Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, xin vui lòng liên hệ:

Email: nhuquynh220123@gmail.com
