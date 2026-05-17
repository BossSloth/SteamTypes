import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const idAgent = process.env.WINDSURF_CASCADE_TERMINAL === '1';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: 'node',
    globals: true,
    pool: 'threads',
    reporters: idAgent ? ['agent'] : ['default'],
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
      reporter: idAgent ? [['text', { skipFull: true }], 'text-summary', 'html'] : ['text', 'html'],
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
        statements: 97.51,
        branches: 95.04,
        functions: 98.29,
        lines: 97.76,
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
