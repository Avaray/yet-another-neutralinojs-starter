import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import type { Plugin, ResolvedConfig, UserConfig } from "vite";
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
        // type AuthFileType = { nlPort: number; nlToken: string; nlConnectToken: string };
        const authFileContent = Bun.file("../.tmp/auth_info.json");
        const { nlPort } = await authFileContent.json();
        return html.replace(
          "<neutralino>",
          `<script src="http://localhost:${nlPort}/__neutralino_globals.js"></script>`,
        );
      }
      return html.replace(
        "<neutralino>",
        '<script src="%PUBLIC_URL%/__neutralino_globals.js"></script>',
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
