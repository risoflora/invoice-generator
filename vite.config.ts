import { resolve } from 'path';

import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isProduction = env.NODE_ENV === 'production';

  return {
    build: {
      sourcemap: !isProduction,
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
                    .replace('$version', env.VITE_APP_VERSION)
                    .replace(/\$name/g, env.npm_package_description)
              }
            ]
          })
        ]
      },
      assetsDir: '',
      define: {
        APP_VERSION: JSON.stringify(env.VITE_APP_VERSION)
      }
    },
    plugins: [react()]
  };
});
