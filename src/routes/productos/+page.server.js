import { PRIVATE_NOTION_API_KEY, PRIVATE_PRODUCTOS_ID, PRIVATE_CLIENTES_ID } from '$env/static/private';

export async function load() {
    // 1. Fetch de productos
    const resProd = await fetch(`https://api.notion.com/v1/databases/${PRIVATE_PRODUCTOS_ID}/query`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${PRIVATE_NOTION_API_KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' }
    });
    
    // 2. Fetch de clientes (para el filtro)
    const resCli = await fetch(`https://api.notion.com/v1/databases/${PRIVATE_CLIENTES_ID}/query`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${PRIVATE_NOTION_API_KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' }
    });

    const prodData = await resProd.json();
    const cliData = await resCli.json();
//console.log("Estructura de producto:", JSON.stringify(prodData.results[0]?.properties, null, 2));
    return {
    productos: prodData.results?.map(p => ({
        codigo: p.properties['Codigo']?.title?.[0]?.plain_text ?? "Sin código",
        medidas: p.properties['Medidas']?.rich_text?.[0]?.plain_text ?? "N/A",
        material: p.properties['Material']?.rich_text?.[0]?.plain_text ?? "N/A",
        // El ID del cliente está dentro del array de 'relation'
        clienteId: p.properties['Cliente']?.relation?.[0]?.id ?? null
    })) || [],
    clientes: cliData.results?.map(c => ({
        id: c.id,
        // Según lo que vimos, el nombre del cliente en tu otra base suele estar en el título
        nombre: c.properties['Cliente']?.title?.[0]?.plain_text ?? "Sin nombre"
    })) || []
};
}
