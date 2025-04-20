import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-plugin-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss()],

    build: {
        target: "es2022" //or later
    },
    esbuild: {
        target: "es2022" //or later
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "es2022" //or later
        }
    },
    resolve: {
        alias: {
            '@components': '/src/components',
            '@hooks': '/src/hooks',
            '@styles': '/src/styles',
            '@pages': '/src/pages',
            '@models': '/src/models',
            '@interfaces': '/src/interfaces',
            '@context': '/src/context',
            '@providers': '/src/providers',
            '@services': '/src/services',
            '@reducers': '/src/reducers'
        },
    },
});

