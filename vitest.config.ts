import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const isAgent = process.env.WINDSURF_CASCADE_TERMINAL === '1';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: 'node',
    globals: true,
    pool: 'threads',
    reporters: isAgent ? ['agent'] : ['default'],
    projects: [
      {
        extends: true,
        test: {
          name: 'compare',
          include: ['./tests/compare/**/*.test.ts'],
          exclude: ['./tests/compare/snapshot-cases/compare-single.test.ts'],
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
      reporter: isAgent ? [['text', { skipFull: true }], 'text-summary', 'html'] : ['text', 'html'],
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
        statements: 97.65,
        branches: 95.9,
        functions: 98.29,
        lines: 97.81,
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
