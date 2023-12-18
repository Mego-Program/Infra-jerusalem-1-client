import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import 'dotenv/config';

const remoteUrl = process.env.VITE_REMOTE_SPECS_URL || "https://specs-1-jlm.vercel.app/assets/remoteEntry.js";


export default defineConfig({ 
  plugins: [
    react(),
    federation({
      name: "userAtom",
      filename: "remoteEntry.js",
      exposes: {
        "./UserAtom": "./src/atoms/atomUser",
        "./AllUsers": "./src/FunctionAllUsers",
      },
      shared: ["jotai"],
    }),
    federation({
      name: "Projects",
      remotes: {
        remoteSpecs: remoteUrl,
        // remotePro: "http://localhost:4180/assets/remoteEntry.js",
        // remoteCommunication: "http://localhost:4181/assets/remoteEntry.js",
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