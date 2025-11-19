// vite.config.js (Đã sửa)

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// 1. Định nghĩa biên __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// (Bạn có thể giữ lại console.log để kiểm tra)

export default defineConfig({
  plugins: [react()],
  // 2. Config cấu hình Alias
  resolve: {
    alias: {
      // ✅ Sửa từ path.relative sang path.resolve
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
