import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@dechegaray/react-graph-network": path.resolve(
        __dirname,
        "../src/main.tsx"
      ),
    },
  },
});
