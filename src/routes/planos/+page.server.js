import { PRIVATE_NOTION_API_KEY, PRIVATE_PLANOS_ID } from '$env/static/private';

export async function load() {
    const res = await fetch(`https://api.notion.com/v1/databases/${PRIVATE_PLANOS_ID}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PRIVATE_NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    
    const data = await res.json();
    
    return {
        planos: data.results?.map(pl => {
            const props = pl.properties;
            
            // Extraer nombres de productos desde el rollup
            const productosList = props['Nombres de Productos']?.rollup?.array || [];
            const nombresProductos = productosList
                .map(item => item.title?.[0]?.plain_text)
                .filter(Boolean)
                .join(', ');

            return {
                nombre: props['Nombre del Plano']?.title[0]?.plain_text || 'Sin nombre',
                url: props['URL_Plano']?.url || '#',
                productos: nombresProductos || 'Sin productos'
            };
        }).sort((a, b) => a.nombre.localeCompare(b.nombre)) || []
    };
}
