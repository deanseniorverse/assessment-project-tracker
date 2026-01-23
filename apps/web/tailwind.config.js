/** @type {import('tailwindcss').Config} */
import config from "../../packages/ui/src/utils/tailwind.config";
import nativewindPreset from "nativewind/preset";
export default {
  ...config,
  presets: [nativewindPreset],
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/core/src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
};
