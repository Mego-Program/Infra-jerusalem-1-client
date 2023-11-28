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
      shared: ["jotai"],
    }),
    federation({
      name: "Projects",
      remotes: {
        // remoteSpecs: "https://specs-1-jlm.vercel.app/assets/remoteEntry.js",
        remoteSpecs: "http://localhost:4175/assets/remoteEntry.js",
        remotePro: "http://localhost:4173/assets/remoteEntry.js",
        remoteMessage: "http://localhost:4174/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom","react-router-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
