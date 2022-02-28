import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as packageData from './package.json'

function getBasename() {
  return `/${/(\w|-)+$/.exec(packageData.homepage)![0]}/`
}

// https://vitejs.dev/config/
export default defineConfig({
  base: getBasename(),
  plugins: [react()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html')
      }
    }
  }
})
