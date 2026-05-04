<script>
    import { ComboBox } from "carbon-components-svelte";
    let { data } = $props();
    
    let clienteSeleccionado = $state("");

    // Filtramos los productos directamente. 
    // Asegúrate en tu +page.server.js de incluir 'medidas' y 'material' en el mapeo.
    let productosFiltrados = $derived(
    (clienteSeleccionado 
        ? (data.productos || []).filter(p => p.clienteId === clienteSeleccionado)
        : (data.productos || [])
    ).sort((a, b) => a.codigo.localeCompare(b.codigo)) // <-- ESTA ES LA LÍNEA NUEVA
);
</script>



<div class="bx--grid">
  <h3>Gestión de Productos</h3>
    <div class="bx--row" style="margin-bottom: 2rem;">
        <div class="bx--col-md-6">
            <ComboBox
                titleText="Filtrar por Cliente"
                placeholder="Seleccionar cliente..."
                items={data.clientes.map(c => ({ id: c.id, text: c.nombre }))}
                bind:selectedId={clienteSeleccionado}
            />
        </div>
    </div>

    <div class="bx--row">
        <div class="bx--col">
            {#if productosFiltrados.length > 0}
                <ul class="bx--list--unordered">
                    {#each productosFiltrados as prod}
                        <li class="bx--list__item" style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
                            <strong>Código: {prod.codigo}</strong><br/>
                            <span style="color: #525252;">
                                Medidas: {prod.medidas || 'N/A'} | Material: {prod.material || 'N/A'}
                            </span>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>Selecciona un cliente para ver sus productos o no hay productos asociados.</p>
            {/if}
        </div>
    </div>
</div>
