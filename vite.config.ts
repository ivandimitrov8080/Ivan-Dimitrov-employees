import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import wasm from 'vite-plugin-wasm'
import { ViteRsw } from 'vite-plugin-rsw'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait(), ViteRsw()],
  optimizeDeps: {
    force: true
  },
  build: {
    outDir: './docs'
  },
  base: "/Ivan-Dimitrov-employees/"
})
