import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: 'node',
    globals: true,
    pool: 'threads',
    projects: [
      {
        extends: true,
        test: {
          name: 'compare',
          include: ['./tests/compare/**/*.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'convert',
          include: ['./tests/convert/**/*.test.ts'],
          sequence: {
            concurrent: false,
          },
        },
      },
    ],
    coverage: {
      provider: 'v8',
      exclude: [
        'node_modules',
        'dist',
        'build',
        'tests',
        'src',
        '*.config.*',
        'scripts/convert-to-typescript/fill-app-data.ts',
        'scripts/convert-to-typescript/global-utils.ts',
      ],
      thresholds: {
        autoUpdate: newThreshold => Math.floor(newThreshold),
        statements: 83,
        branches: 72,
        functions: 89,
        lines: 84,
        perFile: true,
      },
      watermarks: {
        statements: [85, 99],
        branches: [85, 99],
        functions: [85, 99],
        lines: [85, 99],
      },
    },
  },
});
