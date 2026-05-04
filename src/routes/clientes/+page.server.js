import { PRIVATE_NOTION_API_KEY, PRIVATE_CLIENTES_ID } from '$env/static/private';

export async function load() {
    const res = await fetch(`https://api.notion.com/v1/databases/${PRIVATE_CLIENTES_ID}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PRIVATE_NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    const data = await res.json();
   // src/routes/clientes/+page.server.js
return {
    clientes: data.results?.map(c => ({
        id: c.id, // Es buena práctica añadir el ID
        nombre: c.properties['Cliente']?.title[0]?.plain_text ?? "",
        contacto: c.properties['Contacto']?.rich_text[0]?.plain_text ?? "",
        correo: c.properties['Correo']?.rich_text[0]?.plain_text ?? "",
        notas: c.properties['Notas']?.rich_text[0]?.plain_text ?? ""
    })) || []
};
}
