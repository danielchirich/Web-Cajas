<script>
    import "carbon-components-svelte/css/all.css";
    let { children } = $props();
</script>

<nav style="background: #f4f4f4; padding: 1rem; border-bottom: 2px solid #ddd; display: flex; gap: 20px;">
    <a href="/" style="font-weight: bold; text-decoration: none; color: #333;">Inicio</a>
    <a href="/clientes" style="text-decoration: none; color: #0066cc;">Clientes</a>
    <a href="/productos" style="text-decoration: none; color: #0066cc;">Productos</a>
    <a href="/planos" style="text-decoration: none; color: #0066cc;">Planos</a>
</nav>

<main style="padding: 2rem;">
    {@render children()}
</main>
