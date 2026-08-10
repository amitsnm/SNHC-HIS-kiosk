import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const karexpertProxy = {
  target: "https://nirankarihealthcity.karexpert.com",
  changeOrigin: true,
  secure: true,
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/karexpert": {
        ...karexpertProxy,
        rewrite: (path) => path.replace(/^\/karexpert/, "") || "/",
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const ct = proxyRes.headers["content-type"] || "";
            if (ct.includes("text/html")) {
              // HTML rewrite is handled in Vercel edge proxy; local preview may still blank.
            }
          });
        },
      },
      "/account-management": karexpertProxy,
      "/assets": karexpertProxy,
    },
  },
  preview: {
    proxy: {
      "/karexpert": {
        ...karexpertProxy,
        rewrite: (path) => path.replace(/^\/karexpert/, "") || "/",
      },
      "/account-management": karexpertProxy,
      "/assets": karexpertProxy,
    },
  },
});
