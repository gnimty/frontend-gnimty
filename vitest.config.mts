import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    env: {
      NEXT_PUBLIC_API_BASE_URL: 'https://gnimty.kro.kr/',
    },
  },
});
