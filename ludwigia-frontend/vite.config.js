import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
    plugins: [
        react(),
        commonjs()
    ],
    resolve: {
        alias: [
            { find: '~', replacement: '/src' }
        ]
    },
    optimizeDeps: {
        include: ['ckeditor5-custom-build',]
    },
    build: {
        commonjsOptions: { 
            exclude: ['ckeditor5-custom-build'], 
            include: []
        },
    }
})