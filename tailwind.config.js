// tailwind.config.js
import { tailwindExtend } from "./src/theme/moonbetTheme.js";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...tailwindExtend,
      // Your existing extend properties
    },
  },
  plugins: [],
};
