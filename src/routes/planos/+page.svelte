<script>
    let { data } = $props();

    // Ordenamiento alfabético robusto
    let planosOrdenados = $derived(
        [...(data.planos || [])].sort((a, b) => 
            (a.nombre || "").localeCompare(b.nombre || "")
        )
    );
</script>

<h1>Gestión de Planos</h1>

<div class="bx--grid">
    <div class="bx--row">
        <div class="bx--col">
            <ul class="bx--list--unordered">
                {#each planosOrdenados as plano}
                    <li class="bx--list__item" style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="display: block; font-size: 1.1rem;">{plano.nombre}</strong>
                                <small style="color: #525252; font-style: italic;">
                                    {plano.productos}
                                </small>
                            </div>
                            <a href="{plano.url}" target="_blank" class="bx--link">Ver Plano</a>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>
