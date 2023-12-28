import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import "dotenv/config";

const remoteSpecsUrl =
  process.env.VITE_REMOTE_SPECS_URL ||
  "https://specs-1-jlm.vercel.app/assets/remoteEntry.js";
const remoteProUrl =
  process.env.VITE_REMOTE_PRO_URL ||
  "https://jlm-1-pro.vercel.app/assets/remoteEntry.js";
const remoteComUrl =
  process.env.VITE_REMOTE_COM_URL ||
  "https://communication-jerusalem-1-two.vercel.app/assets/remoteEntry.js";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "users",
      filename: "remoteEntry.js",
      exposes: {
        // "./UserAtom": "./src/atoms/atomUser",
      },
      shared: ["jotai"],
    }),
    federation({
      name: "Projects",
      remotes: {
        remoteSpecs: "https://specs-1-jlm.vercel.app/assets/remoteEntry.js",
        remotePro: "http://localhost:4180/assets/remoteEntry.js",
        remoteCommunication:
          "https://communication-jerusalem-1-two.vercel.app/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
