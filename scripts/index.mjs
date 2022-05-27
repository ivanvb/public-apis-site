import dotnev from 'dotenv';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import fetch from 'isomorphic-fetch';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotnev.config();

const url = process.env.DATA_URL;

const req = await fetch(url);
const markdown = await req.text();

const parsed = marked.parse(markdown);

const {
    window: { document },
} = new JSDOM(parsed);

const categories = [...document.querySelectorAll('h3')].map((el) => {
    const categoryName = el.textContent;
    const categoryId = el.getAttribute('id');
    const associatedTable = document.querySelector(`#${categoryId} + table`);

    const rows = [...associatedTable.querySelectorAll('tbody tr')];
    const data = rows.map((el) => {
        const title = el.querySelector('td:nth-child(1)').textContent;
        const url = el.querySelector('td:nth-child(1) a').getAttribute('href');
        const description = el.querySelector('td:nth-child(2)').textContent;
        const auth = el.querySelector('td:nth-child(3)').textContent;
        const https =
            el.querySelector('td:nth-child(4)').textContent.toLowerCase() === 'yes' ? 1 : 0;
        const cors =
            el.querySelector('td:nth-child(5)').textContent.toLowerCase() === 'yes' ? 1 : 0;

        return {
            title,
            url,
            description,
            auth,
            https,
            cors,
        };
    });
    return {
        categoryName,
        data,
    };
});

const csv = categories
    .map((category) => {
        const name = category.categoryName;
        let columns = category.data
            .map((item) => {
                return `,"${item.title}",${item.url},"${item.description.replace(/"/g, "'")}",${
                    item.auth
                },${item.https},${item.cors}\n`;
            })
            .join('');

        return `"${name}"${columns}`;
    })
    .join('');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '../data/');
if (fs.existsSync(dataDir) === false) {
    fs.mkdirSync(dataDir);
}

fs.writeFileSync(path.resolve(__dirname, '../data/public-apis-dump.csv'), csv, 'utf-8');
