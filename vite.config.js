import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import path from "node:path";

// While `npm run dev` is running, re-read content/*.csv and content/photos/
// whenever they change, so edits show up in the browser without restarting.
function contentWatcher() {
  return {
    name: "content-watcher",
    configureServer(server) {
      const dir = path.resolve("content");
      server.watcher.add(dir);
      let timer;
      const run = (file) => {
        if (!file.startsWith(dir)) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          try {
            if (file.includes(`${path.sep}photos${path.sep}`)) execSync("node scripts/optimize-images.mjs", { stdio: "inherit" });
            execSync("node scripts/content.mjs", { stdio: "inherit" });
            server.ws.send({ type: "full-reload" });
          } catch (e) {
            console.error("content update failed:", e.message);
          }
        }, 400);
      };
      server.watcher.on("change", run);
      server.watcher.on("add", run);
      server.watcher.on("unlink", run);
    },
  };
}

export default defineConfig({
  plugins: [react(), contentWatcher()],
  server: { port: 5173 },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Keep React in its own chunk so the lazy 3D and map chunks don't pull each other in.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react";
        },
      },
    },
  },
});
