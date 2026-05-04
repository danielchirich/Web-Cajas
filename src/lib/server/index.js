import { Client } from '@notionhq/client';
import { NOTION_API_KEY } from '$env/static/private';

const notion = new Client({ auth: NOTION_API_KEY });

export { notion };
