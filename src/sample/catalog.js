import {html} from '../lib.js';
import {getCatalog} from '../api/data.js';

const catalogTemplate  = (catalog) => html`
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
        ${catalog.length > 0 ? catalog.map(articleTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
        <!-- No articles message -->
        
    </section>
`;
const articleTemplate  = (article) => html`
    <a class="article-preview" href="/details/${article._id}">
        <article>
            <h3>Topic: <span>${article.title}</span></h3>
            <p>Category: <span>${article.category}</span></p>
        </article>
    </a>
`;

export async function catalogPage(context) {
    const catalog = await getCatalog();
    console.log(catalog)
    context.render(catalogTemplate(catalog));
}