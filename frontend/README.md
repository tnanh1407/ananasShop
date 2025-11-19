components/: Chứa các component tái sử dụng (Header, Footer, Button, ProductCard…).

features/: Chứa các slice của Redux Toolkit và component đặc thù cho slice đó (ví dụ: cartSlice, productsSlice).

pages/: Chứa các page theo route, ví dụ Home, ProductDetail, Cart, Login.

routes/: Quản lý tất cả route bằng react-router-dom.

styles/: SCSS global, biến màu, mixin, font…

app/store.js: Tạo Redux store và combine slice.

api/: Nếu cần gọi API backend (mock JSON hoặc thật).

adidas-clone/
│
├─ public/
│   └─ index.html
│
├─ src/
│   ├─ api/                # Quản lý logic gọi API
│   │   ├─ axiosClient.js # Cấu hình Axios, Interceptors
│   │   └─ productApi.js    # Các hàm gọi API liên quan đến sản phẩm
│   │
│   ├─ app/                # Cấu hình Redux Store
│   │   └─ store.js
│   │
│   ├─ assets/             # Ảnh, fonts, icon SVG (không phải component)
│   │   ├─ images/
│   │   └─ fonts/
│   │
│   ├─ components/         # Component UI tái sử dụng (Dumb Components)
│   │   ├─ Button/
│   │   ├─ Header/
│   │   ├─ Footer/
│   │   ├─ ProductCard/
│   │   └─ Modal/
│   │
│   ├─ constants/          # Các hằng số (constants)
│   │   ├─ paths.js       # Hằng số cho Router path
│   │   └─ index.js       # Các hằng số chung
│   │
│   ├─ features/           # Redux Slice + Component logic (Feature Components)
│   │   ├─ cart/
│   │   │   ├─ cartSlice.js
│   │   │   ├─ CartList.jsx     # Component chứa logic giỏ hàng (kết nối Redux)
│   │   │   └─ CartItem.jsx     # Component con hiển thị 1 item trong giỏ
│   │   ├─ products/
│   │   │   ├─ productsSlice.js
│   │   │   └─ ProductList.jsx   # Component hiển thị danh sách sản phẩm
│   │   └─ auth/
│   │       ├─ authSlice.js
│   │       └─ LoginForm.jsx
│   │
│   ├─ hooks/              # Custom Hooks
│   │   ├─ useDebounce.js
│   │   └─ useClickOutside.js
│   │
│   ├─ layouts/            # Các bố cục chính của trang (Layouts)
│   │   ├─ MainLayout.jsx   # Header + Outlet + Footer
│   │   └─ AuthLayout.jsx   # Layout cho trang Login/Register
│   │
│   ├─ pages/              # Component cấp độ Route (View Containers)
│   │   ├─ Home/
│   │   ├─ ProductDetail/
│   │   ├─ CartPage/          # (Chỉ gọi Layout và Feature CartList)
│   │   ├─ LoginPage/
│   │   └─ NotFoundPage/
│   │
│   ├─ routes/             # Quản lý định tuyến
│   │   └─ AppRouter.jsx
│   │
│   ├─ styles/             # SCSS Global
│   │   ├─ \_variables.scss # (Dùng cho additionalData)
│   │   ├─ \_mixins.scss    # (Dùng cho additionalData)
│   │   ├─ \_reset.scss     # Reset/Normalize CSS
│   │   └─ main.scss       # File chính (Import \_reset.scss)
│   │
│   ├─ utils/              # Các hàm tiện ích (pure functions)
│   │   ├─ helpers.js
│   │   └─ formatters.js
│   │
│   ├─ App.jsx            # Nơi khởi tạo AppRouter
│   └─ main.jsx           # (Hoặc index.js) - Khởi tạo Redux Provider
│
├─ package.json
└─ vite.config.js
