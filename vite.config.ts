import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({isSsrBuild,mode})=>({base:loadEnv(mode,'.','VITE_').VITE_BASE_PATH || '/',plugins:[react(),tailwindcss()],resolve:{alias:{'@':new URL('./src',import.meta.url).pathname}},build:{rollupOptions:{output:{manualChunks:isSsrBuild?undefined:{'motion':['framer-motion'],'scroll':['gsap','gsap/ScrollTrigger']}}}},server:{proxy:{'/api':'http://127.0.0.1:3001'}}}));



