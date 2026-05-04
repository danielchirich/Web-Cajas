<script>
    import { DataTable } from "carbon-components-svelte";
    let { data } = $props();

    // Definimos los encabezados para Carbon
    const headers = [
        { key: "nombre", value: "Cliente" },
        { key: "contacto", value: "Contacto" },
        { key: "correo", value: "Correo" },
        { key: "notas", value: "Notas" }
    ];
</script>



<div class="bx--grid">
<h3>Gestión de Clientes</h3>
    <div class="bx--row">
        <div class="bx--col">
            <DataTable 
                {headers} 
                rows={data.clientes} 
                sortable 
                zebra 
            />
        </div>
    </div>
</div>
