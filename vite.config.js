import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Если будете публиковать на GitHub Pages по адресу
// https://<user>.github.io/<repo>/ — впишите сюда base: "/<repo>/"
export default defineConfig({
  base: "./",
  plugins: [react()],
});
