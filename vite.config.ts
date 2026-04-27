/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Позволяет использовать методы типа describe, it, expect без импорта в каждом файле
    globals: true,
    // Эмуляция браузерной среды (нужна для React Testing Library)
    environment: "jsdom",
    // Путь к файлу с настройками тестов (например, для подключения jest-dom)
    setupFiles: "./src/setupTests.ts",
    // Настройка css, если нужно учитывать стили в тестах
    css: true,
  },
});
