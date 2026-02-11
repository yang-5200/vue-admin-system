import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // 获取环境变量
  const env = loadEnv(
    command === "serve" ? "development" : "production",
    process.cwd(),
  );
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/styles/reset.scss";
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `,
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
