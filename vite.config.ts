import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import ViteFonts from 'unplugin-fonts/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    Components({
      resolvers: [
        VuetifyResolver(),
      ],
    }),
    ViteFonts({
      google: {
        families: ['Roboto', 'Material+Icons'],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
});
