import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    compilerOptions: {
        // Mantenemos tus configuraciones de runes si las necesitas para Svelte 5
        runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
    },
    kit: {
        // Cambiamos el adapter aquí
        adapter: adapter()
    }
};

export default config;
