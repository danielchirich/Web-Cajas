// src/routes/productos/+page.server.js
import { PRIVATE_NOTION_API_KEY, PRIVATE_PRODUCTOS_ID, PRIVATE_CLIENTES_ID } from '$env/static/private';

export async function load() {
    async function fetchNotion(id) {
        const res = await fetch(`https://api.notion.com/v1/databases/${id}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PRIVATE_NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        return await res.json();
    }

    const [prodData, cliData] = await Promise.all([fetchNotion(PRIVATE_PRODUCTOS_ID), fetchNotion(PRIVATE_CLIENTES_ID)]);

    return {
        productos: prodData.results?.map(p => ({
            id: p.id,
            codigo: p.properties['Codigo']?.title?.[0]?.plain_text || 'Sin código',
            clienteId: p.properties['Cliente']?.relation?.[0]?.id || null,
            clienteNombre: '...' // Lo resolveremos en el Svelte
        })) || [],
        clientes: cliData.results?.map(c => ({
            id: c.id,
            nombre: c.properties['Cliente']?.title?.[0]?.plain_text || 'Sin nombre'
        })) || []
    };
}
