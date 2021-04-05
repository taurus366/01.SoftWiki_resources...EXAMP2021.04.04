import {html} from '../lib.js';
import {getArticleById,deleteArticleById} from '../api/data.js';

const detailsTemplate = (article,isOwner,onDelete) => html`
    <section id="details-page" class="content details">
        <h1>${article.title}</h1>

        <div class="details-content">
            <strong>Published in category ${article.category}</strong>
            <p>${article.content}</p>

            <div class="buttons">
                ${isOwner ? html`<a @click=${onDelete} href="#" class="btn delete">Delete</a>
                <a href="/edit/${article._id}" class="btn edit">Edit</a>` : ''}
                <a href="/" class="btn edit">Back</a>
            </div>
        </div>
    </section>
`;
export async function detailsPage(context) {
    const articleId = context.params.id;
    const userId = sessionStorage.getItem('userId');
    const article = await getArticleById(articleId);

    const isOwner = userId === article._ownerId;

    context.render(detailsTemplate(article,isOwner,onDelete));

    async function onDelete(ev) {
        ev.preventDefault();
        await deleteArticleById(articleId);
        context.page.redirect('/');
    }
}