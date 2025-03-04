import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    envDir: ".",
    envPrefix: "VITE_",
    define: {
      __VITE_SOCKET_DEV_URL__: JSON.stringify(env.VITE_SOCKET_DEV_URL),
      __VITE_SOCKET_PROD_URL__: JSON.stringify(env.VITE_SOCKET_PROD_URL),
    },
  };
});
// Compare this snippet from cleint/vite.config.ts:   