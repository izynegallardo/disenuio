import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.js'),
            formats: ['es'],
            fileName: 'disenuio',
            cssFileName: 'style',
        },
        rolldownOptions: {
            external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/],
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.js'],
        css: {
            include: [/\.module\.css$/],
            modules: { classNameStrategy: 'non-scoped' },
        },
    },
})
