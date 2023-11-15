import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "userAtom",
      filename: "remoteEntry.js",
      exposes: {
        "./UserAtom": "./src/atoms/atomUser",
      },
      shared: {
        jotai: {
          singleton: true, // Set this to true if 'jotai' is a singleton
        },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
