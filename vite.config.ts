import * as fs from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import parseArgs from 'minimist';
import copy from 'rollup-plugin-copy';
import zip from 'vite-plugin-auto-zip';

const isProduction = () => {
  const args = parseArgs(process.argv.slice(2));
  return !args.watch && args._.includes('build');
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
  if (isProduction()) {
    const plugin = zip();
    return {
      ...plugin,
      closeBundle() {
        plugin.closeBundle();
        watchedRename('dist/dist.production.zip', fileName);
      }
    };
  }
};

const getReleaseName = () => `dist/${process.env.npm_package_name}-v${process.env.npm_package_version}.zip`;

export default defineConfig({
  build: {
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
                  .replace('$version', process.env.npm_package_version)
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
