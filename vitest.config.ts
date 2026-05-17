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
        statements: 97.15,
        branches: 93.58,
        functions: 98.3,
        lines: 97.37,
      },
      watermarks: {
        statements: [90, 100],
        branches: [90, 100],
        functions: [90, 100],
        lines: [90, 100],
      },
    },
  },
});
