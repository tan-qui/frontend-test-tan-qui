## Yêu cầu hệ thống

- Nodejs >= 18.19.1
- Yarn >= 1.22.19

## Cách cài đặt Nodejs và Yarn

1. **Cài đặt Nodejs**
    - Truy cập trang web chính thức của Nodejs: [https://nodejs.org/](https://nodejs.org/)
    - Tải về và cài đặt phiên bản Nodejs phù hợp với hệ điều hành của bạn.

2. **Cài đặt Yarn**
    - Sau khi cài đặt Nodejs, mở terminal và chạy lệnh sau để cài đặt Yarn:
    ```sh
    npm install --global yarn
    ```

## Cách chạy project

1. **Clone repository**
    ```sh
    git clone git@github.com:tan-qui/test-ui-soa.git
    cd test-ui-soa
    ```

2. **Cài đặt dependencies**
    ```sh
    yarn
    ```

3. **Chạy project**
    ```sh
    yarn start
    ```

4. **Mở trình duyệt và truy cập**
    ```
    http://localhost:3000
    ```

5. **Build project cho production**
    ```sh
    build:prod
    ```