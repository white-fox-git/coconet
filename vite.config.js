import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()/*, mkcert()*/],
  // server: { https: true },
  // https: {
  //   key: fs.readFileSync('./localhost-key.pem'),
  //   cert: fs.readFileSync('./localhost.pem'),
  // },
})
