import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/karexpert": {
        target: "https://nirankarihealthcity.karexpert.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/karexpert/, ""),
      },
    },
  },
  preview: {
    proxy: {
      "/karexpert": {
        target: "https://nirankarihealthcity.karexpert.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/karexpert/, ""),
      },
    },
  },
});
