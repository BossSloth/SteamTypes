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
          exclude: ['./tests/convert/protobufs/**/*.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'protobufs',
          include: ['./tests/convert/protobufs/**/*.test.ts'],
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
        autoUpdate: true,
        statements: 95.37,
        branches: 91.23,
        functions: 97.95,
        lines: 95.92,
      },
      watermarks: {
        statements: [90, 99],
        branches: [90, 99],
        functions: [90, 99],
        lines: [90, 99],
      },
    },
  },
});
