import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const uiSource = resolve(import.meta.dirname, '../ui/src')

const devAliases = [
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
export default defineConfig(({ command }) => ({
    plugins: [react()],
    resolve: {
        alias: command === 'serve' ? devAliases : [],
        dedupe: ['react', 'react-dom'],
    },
}))
