import * as fs from 'fs';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import parseArgs from 'minimist';
import copy from 'rollup-plugin-copy';
import zip from 'vite-plugin-auto-zip';

const isProduction = () => {
  /* eslint-disable
    @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-call,
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-unsafe-member-access */
  const args = parseArgs(process.argv.slice(2));

  return !args.watch && args._.includes('build');
  /* eslint-enable
    @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-call,
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-unsafe-member-access */
};

const watchedRename = (from: string, to: string) => {
  const timerId = setInterval(() => {
    const isExists = fs.existsSync(from);
    if (isExists) {
      fs.renameSync(from, to);
      clearInterval(timerId);
    }
  }, 500);
};

const compress = (fileName: string) => {
  if (!isProduction()) {
    return undefined;
  }
  /* eslint-disable
    @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-call,
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-unsafe-member-access */
  const plugin = zip();

  return {
    ...plugin,
    closeBundle() {
      plugin.closeBundle();
      watchedRename('dist/dist.production.zip', fileName);
    }
  };
  /* eslint-enable
    @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-call,
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-unsafe-member-access */
};

const getReleaseName = () => {
  const version = process.env.VERSION;

  return `dist/${process.env.npm_package_name || 'error'}-v${version || 'error'}.zip`;
};

export default defineConfig({
  build: {
    sourcemap: !isProduction(),
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        options: resolve(__dirname, 'options.html')
      },
      plugins: [
        copy({
          hook: 'writeBundle',
          targets: [
            {
              src: 'manifest.json',
              dest: 'dist',
              transform: (contents) =>
                contents
                  .toString()
                  .replace('$version', process.env.VERSION)
                  .replace(/\$name/g, process.env.npm_package_description)
            }
          ]
        })
      ]
    },
    assetsDir: ''
  },
  plugins: [react(), compress(getReleaseName())]
});
