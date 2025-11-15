import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import type { Plugin, ResolvedConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const neutralino = (): Plugin => {
  let config: ResolvedConfig;
  return {
    name: "neutralino",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async transformIndexHtml(html) {
      if (config.mode === "development") {
        const authFileContent = readFileSync("../.tmp/auth_info.json", "utf-8");
        const authInfo = JSON.parse(authFileContent) as {
          nlPort: number;
          nlToken: string;
          nlConnectToken: string;
        };
        const { nlPort } = authInfo;
        return html.replace(
          "<neutralino>",
          `<script src="http://localhost:${nlPort}/__neutralino_globals.js"></script>`,
        );
      }
      return html.replace(
        "<neutralino>",
        `<script src="%PUBLIC_URL%/__neutralino_globals.js"></script>`,
      );
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    neutralino(),
  ],
  server: {
    port: 4200,
    strictPort: true,
  },
}) as UserConfig;
