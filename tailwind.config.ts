import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // Observando todos os arquivos na pasta app
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",  // Observando arquivos na pasta pages, se existir
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",  // Observando arquivos em components, se existir
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",  // Usando variáveis CSS para o background
        foreground: "var(--foreground)",  // Usando variáveis CSS para o foreground
      },
    },
  },
  plugins: [],
};

export default config;
