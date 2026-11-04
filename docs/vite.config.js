import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const uiSource = resolve(import.meta.dirname, '../ui/src')

const uiAliases = [
    {
        find: /^disenuio\/style\.css$/,
        replacement: resolve(uiSource, 'styles/tokens.css'),
    },
    {
        find: /^disenuio$/,
        replacement: resolve(uiSource, 'index.js'),
    },
]

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: uiAliases,
        dedupe: ['react', 'react-dom'],
    },
})
